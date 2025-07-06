/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTagDTO } from '../models/CreateTagDTO';
import type { TagResponse } from '../models/TagResponse';
import type { TagUpdate } from '../models/TagUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagsService {
    /**
     * Get tag by id
     * @param tagId
     * @returns TagResponse Successful Response
     * @throws ApiError
     */
    public static getTagByIdTagsTagIdGet(
        tagId: string,
    ): CancelablePromise<TagResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tags/{tag_id}',
            path: {
                'tag_id': tagId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update tag
     * @param tagId
     * @param requestBody
     * @returns TagResponse Successful Response
     * @throws ApiError
     */
    public static updateTagTagsTagIdPatch(
        tagId: string,
        requestBody: TagUpdate,
    ): CancelablePromise<TagResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tags/{tag_id}',
            path: {
                'tag_id': tagId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete tag
     * @param tagId
     * @returns void
     * @throws ApiError
     */
    public static deleteTagTagsTagIdDelete(
        tagId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tags/{tag_id}',
            path: {
                'tag_id': tagId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get all tags
     * @returns TagResponse Successful Response
     * @throws ApiError
     */
    public static getAllTagsTagsGet(): CancelablePromise<Array<TagResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tags/',
        });
    }
    /**
     * Create tag
     * @param requestBody
     * @returns TagResponse Successful Response
     * @throws ApiError
     */
    public static createTagTagsPost(
        requestBody: CreateTagDTO,
    ): CancelablePromise<TagResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tags/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
