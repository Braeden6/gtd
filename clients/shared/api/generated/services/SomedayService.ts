/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchSomeday } from '../models/SearchSomeday';
import type { SomedayCreate } from '../models/SomedayCreate';
import type { SomedayMaybe } from '../models/SomedayMaybe';
import type { SomedayUpdate } from '../models/SomedayUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SomedayService {
    /**
     * Get all someday items for the current user
     * @returns SomedayMaybe Successful Response
     * @throws ApiError
     */
    public static getUserSomedaySomedayGet(): CancelablePromise<Array<SomedayMaybe>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/someday/',
        });
    }
    /**
     * Create a new someday item for the current user
     * @param requestBody
     * @returns SomedayMaybe Successful Response
     * @throws ApiError
     */
    public static createSomedaySomedayPost(
        requestBody: SomedayCreate,
    ): CancelablePromise<SomedayMaybe> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/someday/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search for someday items for the current user
     * @param requestBody
     * @returns SomedayMaybe Successful Response
     * @throws ApiError
     */
    public static searchSomedaySomedaySearchPost(
        requestBody: SearchSomeday,
    ): CancelablePromise<Array<SomedayMaybe>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/someday/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update a someday item for the current user
     * @param somedayId
     * @param requestBody
     * @returns SomedayMaybe Successful Response
     * @throws ApiError
     */
    public static updateSomedaySomedaySomedayIdPatch(
        somedayId: string,
        requestBody: SomedayUpdate,
    ): CancelablePromise<SomedayMaybe> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/someday/{someday_id}',
            path: {
                'someday_id': somedayId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete a someday item for the current user
     * @param somedayId
     * @returns void
     * @throws ApiError
     */
    public static deleteSomedaySomedaySomedayIdDelete(
        somedayId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/someday/{someday_id}',
            path: {
                'someday_id': somedayId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
