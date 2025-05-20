/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
import type { ProjectStatus } from './ProjectStatus';
export type Project = {
    id?: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: (string | null);
    title: string;
    description: (string | null);
    priority: (Priority | null);
    due_date: (string | null);
    status?: (ProjectStatus | null);
};

