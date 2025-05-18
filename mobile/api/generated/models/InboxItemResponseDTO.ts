/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Schema for inbox item response.
 */
export type InboxItemResponseDTO = {
    id: string;
    user_id: string;
    content: string;
    audio_id?: (string | null);
    image_id?: (string | null);
    processed: boolean;
    created_at: string;
    transcription?: (string | null);
    is_new: boolean;
    action_id?: (string | null);
    project_id?: (string | null);
};

