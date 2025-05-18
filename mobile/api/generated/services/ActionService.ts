/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Action } from '../models/Action';
import type { ActionCreate } from '../models/ActionCreate';
import type { ActionResponse } from '../models/ActionResponse';
import type { ActionUpdate } from '../models/ActionUpdate';
import type { SearchAction } from '../models/SearchAction';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActionService {
    /**
     * Get all actions for the current user
     * @returns ActionResponse Successful Response
     * @throws ApiError
     */
    public static getUserActionsActionGet(): CancelablePromise<Array<ActionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/action/',
        });
    }
    /**
     * Create a new action for the current user
     * @param requestBody
     * @returns Action Successful Response
     * @throws ApiError
     */
    public static createActionActionPost(
        requestBody: ActionCreate,
    ): CancelablePromise<Action> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/action/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Search for actions for the current user
     * @param requestBody
     * @returns ActionResponse Successful Response
     * @throws ApiError
     */
    public static searchActionsActionSearchPost(
        requestBody: SearchAction,
    ): CancelablePromise<Array<ActionResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/action/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update an action for the current user
     * @param actionId
     * @param requestBody
     * @returns Action Successful Response
     * @throws ApiError
     */
    public static updateActionActionActionIdPut(
        actionId: string,
        requestBody: ActionUpdate,
    ): CancelablePromise<Action> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/action/{action_id}',
            path: {
                'action_id': actionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete an action for the current user
     * @param actionId
     * @returns void
     * @throws ApiError
     */
    public static deleteActionActionActionIdDelete(
        actionId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/action/{action_id}',
            path: {
                'action_id': actionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
