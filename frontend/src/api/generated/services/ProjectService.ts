/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Project } from '../models/Project';
import type { ProjectCreate } from '../models/ProjectCreate';
import type { ProjectResponse } from '../models/ProjectResponse';
import type { ProjectUpdate } from '../models/ProjectUpdate';
import type { SearchProject } from '../models/SearchProject';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectService {
    /**
     * Get all projects for the current user
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
     * Search for projects for the current user
     * @param requestBody
     * @returns ProjectResponse Successful Response
     * @throws ApiError
     */
    public static searchProjectsProjectSearchPost(
        requestBody: SearchProject,
    ): CancelablePromise<Array<ProjectResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/search',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update an project for the current user
     * @param projectId
     * @param requestBody
     * @returns Project Successful Response
     * @throws ApiError
     */
    public static updateProjectProjectProjectIdPut(
        projectId: string,
        requestBody: ProjectUpdate,
    ): CancelablePromise<Project> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/project/{project_id}',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete an project for the current user
     * @param projectId
     * @returns void
     * @throws ApiError
     */
    public static deleteProjectProjectProjectIdDelete(
        projectId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/project/{project_id}',
            path: {
                'project_id': projectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
