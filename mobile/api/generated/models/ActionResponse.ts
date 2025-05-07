/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionStatus } from './ActionStatus';
import type { Priority } from './Priority';
/**
 * Schema for action response.
 */
export type ActionResponse = {
    id: string;
    title: string;
    description?: (string | null);
    priority?: (Priority | null);
    due_date?: (string | null);
    status?: (ActionStatus | null);
    created_at: string;
    project_id?: (string | null);
};

