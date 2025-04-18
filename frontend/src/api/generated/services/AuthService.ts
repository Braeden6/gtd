/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OAuth2AuthorizeResponse } from '../models/OAuth2AuthorizeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Oauth:Oauth2.Session.Authorize
     * @param scopes
     * @returns OAuth2AuthorizeResponse Successful Response
     * @throws ApiError
     */
    public static oauthOauth2SessionAuthorizeAuthOauthAuthentikAuthorizeGet(
        scopes?: Array<string>,
    ): CancelablePromise<OAuth2AuthorizeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/authentik/authorize',
            query: {
                'scopes': scopes,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Oauth:Oauth2.Session.Callback
     * The response varies based on the authentication backend used.
     * @param code
     * @param codeVerifier
     * @param state
     * @param error
     * @returns any Successful Response
     * @throws ApiError
     */
    public static oauthOauth2SessionCallbackAuthOauthAuthentikCallbackGet(
        code?: (string | null),
        codeVerifier?: (string | null),
        state?: (string | null),
        error?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/authentik/callback',
            query: {
                'code': code,
                'code_verifier': codeVerifier,
                'state': state,
                'error': error,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Oauth:Google.Session.Authorize
     * @param scopes
     * @returns OAuth2AuthorizeResponse Successful Response
     * @throws ApiError
     */
    public static oauthGoogleSessionAuthorizeAuthOauthGoogleAuthorizeGet(
        scopes?: Array<string>,
    ): CancelablePromise<OAuth2AuthorizeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/google/authorize',
            query: {
                'scopes': scopes,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Oauth:Google.Session.Callback
     * The response varies based on the authentication backend used.
     * @param code
     * @param codeVerifier
     * @param state
     * @param error
     * @returns any Successful Response
     * @throws ApiError
     */
    public static oauthGoogleSessionCallbackAuthOauthGoogleCallbackGet(
        code?: (string | null),
        codeVerifier?: (string | null),
        state?: (string | null),
        error?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/google/callback',
            query: {
                'code': code,
                'code_verifier': codeVerifier,
                'state': state,
                'error': error,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Oauth:Oauth2.Session.Authorize
     * @param scopes
     * @returns OAuth2AuthorizeResponse Successful Response
     * @throws ApiError
     */
    public static oauthOauth2SessionAuthorizeAuthOauthMobileAuthentikAuthorizeGet(
        scopes?: Array<string>,
    ): CancelablePromise<OAuth2AuthorizeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/mobile/authentik/authorize',
            query: {
                'scopes': scopes,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Oauth:Oauth2.Session.Callback
     * The response varies based on the authentication backend used.
     * @param code
     * @param codeVerifier
     * @param state
     * @param error
     * @returns any Successful Response
     * @throws ApiError
     */
    public static oauthOauth2SessionCallbackAuthOauthMobileAuthentikCallbackGet(
        code?: (string | null),
        codeVerifier?: (string | null),
        state?: (string | null),
        error?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/mobile/authentik/callback',
            query: {
                'code': code,
                'code_verifier': codeVerifier,
                'state': state,
                'error': error,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static logoutAuthLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Get Authorization Url
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getAuthorizationUrlAuthOauthMobileGoogleAuthorizeGet(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/mobile/google/authorize',
        });
    }
    /**
     * Auth Callback
     * Process OAuth callback with PKCE
     * @param code
     * @param state
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authCallbackAuthOauthMobileGoogleCallbackGet(
        code: string,
        state: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/oauth/mobile/google/callback',
            query: {
                'code': code,
                'state': state,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
