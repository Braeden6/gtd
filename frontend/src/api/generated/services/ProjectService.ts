/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectCreate } from '../models/ProjectCreate';
import type { ProjectResponse } from '../models/ProjectResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectService {
    /**
     * Get all projects for the current user
     * Retrieve all actions for the current user.
     *
     * Returns a list of actions ordered by creation date (newest first).
     * @returns ProjectResponse Successful Response
     * @throws ApiError
     */
    public static getUserProjectsProjectGet(): CancelablePromise<Array<ProjectResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/',
        });
    }
    /**
     * Create a new project for the current user
     * Create a new action for the current user.
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createProjectProjectPost(
        requestBody: ProjectCreate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete an action for the current user
     * Delete an action for the current user.
     * @param projectId
     * @returns void
     * @throws ApiError
     */
    public static deleteProjectProjectActionIdDelete(
        projectId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/project/{action_id}',
            query: {
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
