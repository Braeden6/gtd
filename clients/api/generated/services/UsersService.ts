/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserReadDTO } from '../models/UserReadDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get current user
     * @returns UserReadDTO Successful Response
     * @throws ApiError
     */
    public static getCurrentUserUsersMeGet(): CancelablePromise<UserReadDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * Create user
     * @param requestBody
     * @returns UserReadDTO Successful Response
     * @throws ApiError
     */
    public static createUserUsersCreatePost(
        requestBody: UserCreate,
    ): CancelablePromise<UserReadDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
