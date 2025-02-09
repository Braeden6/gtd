/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AudioService {
    /**
     * Upload an audio file
     * Upload a new audio file
     * @param file Audio file
     * @returns string OK
     * @throws ApiError
     */
    public static postAudioUpload(
        file: Blob,
    ): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/audio/upload',
            formData: {
                'file': file,
            },
        });
    }
    /**
     * Stream audio by ID
     * Stream audio by ID
     * @param id Audio ID
     * @returns binary OK
     * @throws ApiError
     */
    public static getAudioStream(
        id: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audio/{id}/stream',
            path: {
                'id': id,
            },
        });
    }
}
