/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_inbox_item_inbox__post } from '../models/Body_create_inbox_item_inbox__post';
import type { InboxItemResponseDTO } from '../models/InboxItemResponseDTO';
import type { InboxItemUpdate } from '../models/InboxItemUpdate';
import type { SearchInboxItem } from '../models/SearchInboxItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InboxService {
    /**
     * Create a new inbox item with optional files
     * @param formData
     * @returns InboxItemResponseDTO Successful Response
     * @throws ApiError
     */
    public static createInboxItemInboxPost(
        formData: Body_create_inbox_item_inbox__post,
    ): CancelablePromise<InboxItemResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inbox/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get all inbox items for the current user
     * @param processed
     * @returns InboxItemResponseDTO Successful Response
     * @throws ApiError
     */
    public static getUserInboxItemsInboxGet(
        processed?: (boolean | null),
    ): CancelablePromise<Array<InboxItemResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inbox/',
            query: {
                'processed': processed,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search for inbox items
     * @param requestBody
     * @returns InboxItemResponseDTO Successful Response
     * @throws ApiError
     */
    public static searchInboxItemsInboxSearchPost(
        requestBody: SearchInboxItem,
    ): CancelablePromise<Array<InboxItemResponseDTO>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inbox/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update an inbox item
     * @param itemId
     * @param requestBody
     * @returns InboxItemResponseDTO Successful Response
     * @throws ApiError
     */
    public static updateInboxItemInboxItemIdPut(
        itemId: string,
        requestBody: InboxItemUpdate,
    ): CancelablePromise<InboxItemResponseDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/inbox/{item_id}',
            path: {
                'item_id': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete an inbox item
     * @param itemId
     * @returns void
     * @throws ApiError
     */
    public static deleteInboxItemInboxItemIdDelete(
        itemId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/inbox/{item_id}',
            path: {
                'item_id': itemId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
