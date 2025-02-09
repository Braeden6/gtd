/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { domain_InboxItem } from '../models/domain_InboxItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InboxService {
    /**
     * List inbox items
     * Get all inbox items for the user
     * @returns domain_InboxItem OK
     * @throws ApiError
     */
    public static getInbox(): CancelablePromise<Array<domain_InboxItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inbox',
        });
    }
    /**
     * Create inbox item
     * Create a new inbox item
     * @param item Inbox Item
     * @returns domain_InboxItem Created
     * @throws ApiError
     */
    public static postInbox(
        item: domain_InboxItem,
    ): CancelablePromise<domain_InboxItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/inbox',
            body: item,
        });
    }
    /**
     * Get inbox item by ID
     * Get a single inbox item by its ID
     * @param id Inbox Item ID
     * @returns domain_InboxItem OK
     * @throws ApiError
     */
    public static getInbox1(
        id: string,
    ): CancelablePromise<domain_InboxItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inbox/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update inbox item
     * Update an existing inbox item
     * @param id Inbox Item ID
     * @param item Inbox Item
     * @returns domain_InboxItem OK
     * @throws ApiError
     */
    public static putInbox(
        id: string,
        item: domain_InboxItem,
    ): CancelablePromise<domain_InboxItem> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/inbox/{id}',
            path: {
                'id': id,
            },
            body: item,
        });
    }
    /**
     * Delete inbox item
     * Delete an inbox item
     * @param id Inbox Item ID
     * @returns void
     * @throws ApiError
     */
    public static deleteInbox(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/inbox/{id}',
            path: {
                'id': id,
            },
        });
    }
}
