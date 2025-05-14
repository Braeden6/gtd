/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchTest } from '../models/SearchTest';
import type { UpdateTest } from '../models/UpdateTest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestService {
    /**
     * Test All
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testAllTestGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/',
        });
    }
    /**
     * Test
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testTestPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/',
        });
    }
    /**
     * Test By Id
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testByIdTestIdGet(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/test/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test Delete
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testDeleteTestIdDelete(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/test/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test Update
     * @param id
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testUpdateTestIdPut(
        id: string,
        requestBody: UpdateTest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/test/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test Search
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static testSearchTestSearchPost(
        requestBody: SearchTest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
