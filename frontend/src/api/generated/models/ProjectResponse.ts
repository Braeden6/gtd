/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
import type { ProjectStatus } from './ProjectStatus';
export type ProjectResponse = {
    id: string;
    title: string;
    description?: (string | null);
    priority?: (Priority | null);
    due_date?: (string | null);
    status?: (ProjectStatus | null);
    created_at: string;
};

