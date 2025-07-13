/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Image } from '../models/Image';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImageService {
    /**
     * Get image by id
     * @param imageId
     * @returns Image Successful Response
     * @throws ApiError
     */
    public static getImageByIdImageImageIdGet(
        imageId: string,
    ): CancelablePromise<Image> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/image/{image_id}',
            path: {
                'image_id': imageId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get image file by id
     * @param imageId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getImageFileByIdImageImageIdFileGet(
        imageId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/image/{image_id}/file',
            path: {
                'image_id': imageId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get all images
     * @returns Image Successful Response
     * @throws ApiError
     */
    public static getAllImagesImageGet(): CancelablePromise<Array<Image>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/image/',
        });
    }
}
