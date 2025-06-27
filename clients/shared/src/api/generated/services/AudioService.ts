/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Audio } from '../models/Audio';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AudioService {
    /**
     * Get audio by id
     * @param audioId
     * @returns Audio Successful Response
     * @throws ApiError
     */
    public static getAudioByIdAudioAudioIdGet(
        audioId: string,
    ): CancelablePromise<Audio> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audio/{audio_id}',
            path: {
                'audio_id': audioId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get audio file by id
     * @param audioId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAudioFileByIdAudioAudioIdFileGet(
        audioId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audio/{audio_id}/file',
            path: {
                'audio_id': audioId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get all audio
     * @returns Audio Successful Response
     * @throws ApiError
     */
    public static getAllAudioAudioGet(): CancelablePromise<Array<Audio>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/audio/',
        });
    }
}
