/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionStatus } from './ActionStatus';
import type { Priority } from './Priority';
export type ActionUpdate = {
    deleted_at?: (string | null);
    title?: (string | null);
    description?: (string | null);
    priority?: (Priority | null);
    due_date?: (string | null);
    status?: (ActionStatus | null);
    project_id?: (string | null);
};

