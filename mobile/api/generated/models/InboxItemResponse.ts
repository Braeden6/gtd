/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Schema for inbox item response.
 */
export type InboxItemResponse = {
    id: string;
    user_id: string;
    content: string;
    audio_path?: (string | null);
    image_path?: (string | null);
    processed: boolean;
    created_at: string;
};

