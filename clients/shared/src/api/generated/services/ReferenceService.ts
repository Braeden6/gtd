/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reference } from '../models/Reference';
import type { ReferenceCreate } from '../models/ReferenceCreate';
import type { ReferenceUpdate } from '../models/ReferenceUpdate';
import type { SearchReference } from '../models/SearchReference';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReferenceService {
    /**
     * Get all references for the current user
     * @returns Reference Successful Response
     * @throws ApiError
     */
    public static getUserReferencesReferenceGet(): CancelablePromise<Array<Reference>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reference/',
        });
    }
    /**
     * Create a new reference for the current user
     * @param requestBody
     * @returns Reference Successful Response
     * @throws ApiError
     */
    public static createReferenceReferencePost(
        requestBody: ReferenceCreate,
    ): CancelablePromise<Reference> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/reference/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search for references for the current user
     * @param requestBody
     * @returns Reference Successful Response
     * @throws ApiError
     */
    public static searchReferenceReferenceSearchPost(
        requestBody: SearchReference,
    ): CancelablePromise<Array<Reference>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/reference/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update a reference for the current user
     * @param referenceId
     * @param requestBody
     * @returns Reference Successful Response
     * @throws ApiError
     */
    public static updateReferenceReferenceReferenceIdPatch(
        referenceId: string,
        requestBody: ReferenceUpdate,
    ): CancelablePromise<Reference> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/reference/{reference_id}',
            path: {
                'reference_id': referenceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete a reference for the current user
     * @param referenceId
     * @returns void
     * @throws ApiError
     */
    public static deleteReferenceReferenceReferenceIdDelete(
        referenceId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/reference/{reference_id}',
            path: {
                'reference_id': referenceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
