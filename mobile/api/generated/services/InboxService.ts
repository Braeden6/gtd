/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_inbox_item_inbox__post } from '../models/Body_create_inbox_item_inbox__post';
import type { InboxItemResponseDTO } from '../models/InboxItemResponseDTO';
import type { InboxItemUpdateDTO } from '../models/InboxItemUpdateDTO';
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
     * Retrieve all inbox items for the current user.
     *
     * - **processed**: Optional filter for processed status (True/False)
     *
     * Returns a list of inbox items ordered by creation date (newest first).
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
     * @param content
     * @param actionId
     * @param projectId
     * @param processed
     * @param hasImage
     * @param hasAudio
     * @param isNew
     * @param orderBy
     * @param orderDirection
     * @returns InboxItemResponseDTO Successful Response
     * @throws ApiError
     */
    public static searchInboxItemsInboxSearchGet(
        content?: (string | null),
        actionId?: (string | boolean | null),
        projectId?: (string | boolean | null),
        processed?: (boolean | null),
        hasImage?: (boolean | null),
        hasAudio?: (boolean | null),
        isNew?: (boolean | null),
        orderBy?: ('created_at' | 'due_date' | 'priority' | null),
        orderDirection?: ('asc' | 'desc' | null),
    ): CancelablePromise<Array<InboxItemResponseDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inbox/search',
            query: {
                'content': content,
                'action_id': actionId,
                'project_id': projectId,
                'processed': processed,
                'has_image': hasImage,
                'has_audio': hasAudio,
                'is_new': isNew,
                'order_by': orderBy,
                'order_direction': orderDirection,
            },
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
        requestBody: InboxItemUpdateDTO,
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
     * Delete an inbox item and its associated files.
     *
     * - **item_id**: UUID of the inbox item to delete
     *
     * Returns no content on successful deletion.
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
