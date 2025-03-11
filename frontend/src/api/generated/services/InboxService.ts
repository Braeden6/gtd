/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_inbox_item_inbox__post } from '../models/Body_create_inbox_item_inbox__post';
import type { InboxItemResponse } from '../models/InboxItemResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InboxService {
    /**
     * Create a new inbox item with optional files
     * Create a new inbox item with optional audio and image attachments.
     *
     * - **content**: Text content for the inbox item
     * - **audio**: Optional audio file attachment (MP3, WAV, etc.)
     * - **image**: Optional image file attachment (JPG, PNG, etc.)
     *
     * Returns the created inbox item.
     * @param formData
     * @returns InboxItemResponse Successful Response
     * @throws ApiError
     */
    public static createInboxItemInboxPost(
        formData: Body_create_inbox_item_inbox__post,
    ): CancelablePromise<InboxItemResponse> {
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
     * Retrieve all inbox items for the current user.
     *
     * - **processed**: Optional filter for processed status (True/False)
     *
     * Returns a list of inbox items ordered by creation date (newest first).
     * @param processed
     * @returns InboxItemResponse Successful Response
     * @throws ApiError
     */
    public static getUserInboxItemsInboxGet(
        processed?: (boolean | null),
    ): CancelablePromise<Array<InboxItemResponse>> {
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
}
