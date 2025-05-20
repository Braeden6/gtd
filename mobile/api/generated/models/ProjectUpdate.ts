/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
import type { ProjectStatus } from './ProjectStatus';
export type ProjectUpdate = {
    deleted_at?: (string | null);
    title?: (string | null);
    description?: (string | null);
    priority?: (Priority | null);
    due_date?: (string | null);
    status?: (ProjectStatus | null);
};

