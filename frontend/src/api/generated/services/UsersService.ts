/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRead } from '../models/UserRead';
import type { UserUpdate } from '../models/UserUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Users:Current User
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static usersCurrentUserUsersMeGet(): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
            errors: {
                401: `Missing token or inactive user.`,
            },
        });
    }
    /**
     * Users:Patch Current User
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static usersPatchCurrentUserUsersMePatch(
        requestBody: UserUpdate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Missing token or inactive user.`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Users:User
     * @param id
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static usersUserUsersIdGet(
        id: string,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing token or inactive user.`,
                403: `Not a superuser.`,
                404: `The user does not exist.`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Users:Patch User
     * @param id
     * @param requestBody
     * @returns UserRead Successful Response
     * @throws ApiError
     */
    public static usersPatchUserUsersIdPatch(
        id: string,
        requestBody: UserUpdate,
    ): CancelablePromise<UserRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Missing token or inactive user.`,
                403: `Not a superuser.`,
                404: `The user does not exist.`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Users:Delete User
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static usersDeleteUserUsersIdDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Missing token or inactive user.`,
                403: `Not a superuser.`,
                404: `The user does not exist.`,
                422: `Validation Error`,
            },
        });
    }
}
