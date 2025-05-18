/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionStatus } from './ActionStatus';
import type { Priority } from './Priority';
export type Action = {
    id?: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: (string | null);
    title: string;
    description: (string | null);
    priority: (Priority | null);
    due_date: (string | null);
    status?: (ActionStatus | null);
    project_id?: (string | null);
};

