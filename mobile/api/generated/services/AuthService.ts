/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_auth_session_login_auth_jwt_login_post } from '../models/Body_auth_session_login_auth_jwt_login_post';
import type { OAuth2AuthorizeResponse } from '../models/OAuth2AuthorizeResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Auth:Session.Login
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authSessionLoginAuthJwtLoginPost(
        formData: Body_auth_session_login_auth_jwt_login_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/jwt/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth:Session.Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authSessionLogoutAuthJwtLogoutPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/jwt/logout',
            errors: {
                401: `Missing token or inactive user.`,
            },
        });
    }
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
}
