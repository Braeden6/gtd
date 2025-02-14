export interface AuthTokens {
    accessToken: string;
    expiresAt: number;
    refreshToken: string;
}

export interface UserInfo {
  email?: string;
  email_verified?: boolean;
  given_name?: string;
  groups?: string[];
  name?: string;
  nickname?: string;
  preferred_username?: string;
  sub?: string;
}
