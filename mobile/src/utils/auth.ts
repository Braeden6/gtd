import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest as expoAuthRequest, ResponseType } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens, UserInfo } from '../types/auth';
import { OAUTH_CLIENT_ID as CLIENT_ID, AUTH_BASE_URL, OAUTH_REDIRECT_SCHEME } from '@env';

const TOKENS_KEY = 'auth_tokens';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = makeRedirectUri({
  scheme: OAUTH_REDIRECT_SCHEME
});

const discovery = {
  authorizationEndpoint: `${AUTH_BASE_URL}/application/o/authorize/`,
  tokenEndpoint: `${AUTH_BASE_URL}/application/o/token/`,
  revocationEndpoint: `${AUTH_BASE_URL}/application/o/revoke/`,
};

const config = {
  clientId: CLIENT_ID,
  scopes: ['openid', 'profile', 'email', 'identity', 'offline_access'],
  redirectUri,
  responseType: ResponseType.Code,
  extraParams: {
    code_challenge_method: 'S256',
  },
};

export const useAuthRequest = () => {
  const [request, response, promptAsync] = expoAuthRequest({
    ...config,
    usePKCE: true,
  }, discovery);

  const handleAuthRequest = async () => {
    try {
      console.log('Starting auth request with PKCE...');
      const result = await promptAsync();
      if (result?.type === 'success' && result.params.code) {
        const codeVerifier = request?.codeVerifier;
        if (!codeVerifier) {
          throw new Error('No code verifier available');
        }
        
        const tokens = await exchangeCodeForTokens(result.params.code, codeVerifier);
        return tokens;
      }
      return null;
    } catch (error) {
      console.error('Auth request error:', error);
      return null;
    }
  };

  return {
    isLoading: !request,
    startAuth: handleAuthRequest
  };
};

export async function getUserInfo(accessToken: string): Promise<UserInfo> {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/application/o/userinfo/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function exchangeCodeForTokens(code: string, codeVerifier: string): Promise<AuthTokens | null> {
  try {
    const response = await fetch(discovery.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }).toString()
    });

    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    const newTokens: AuthTokens = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
      refreshToken: data.refresh_token,
    };
    return newTokens;
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }
}

export const tokenStorage = {
  async save(tokens: AuthTokens) {
    await AsyncStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  },

  async isLoggedIn(): Promise<boolean> {
    const tokens = await this.get();
    return !!tokens;
  },

  async get(): Promise<AuthTokens | null> {
    const tokens = await AsyncStorage.getItem(TOKENS_KEY);
    return tokens ? JSON.parse(tokens) : null;
  },

  async clear() {
    await AsyncStorage.removeItem(TOKENS_KEY);
  },

  async refreshToken(tokens: AuthTokens, setLoggedOut: (loggedOut: boolean) => void): Promise<AuthTokens | null> {
    try {
      console.log('refreshing token...');
      const response = await fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'refresh_token',
          refresh_token: tokens.refreshToken,
        }).toString()
      });
  
      const responseBody = await response.json();
      if (!response.ok) {
        setLoggedOut(true);
        await this.clear();
        return null;
      }
  
      const newTokens: AuthTokens = {
        accessToken: responseBody.access_token,
        expiresAt: Date.now() + (responseBody.expires_in * 1000),
        refreshToken: responseBody.refresh_token || tokens.refreshToken,
      };
      await this.save(newTokens);
      return newTokens;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  },

  async getValidToken(setLoggedOut: (loggedOut: boolean) => void): Promise<string | null> {
    try {
      let tokens = await this.get();
      if (!tokens) return null;


      if (tokens.expiresAt <= Date.now()) {
        tokens = await this.refreshToken(tokens, setLoggedOut);
        if (!tokens) return null;
      }

      return tokens.accessToken;
    } catch (error) {
      console.error('Get valid token error:', error);
      return null;
    }
  }
};

export { redirectUri, discovery };