/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionStatus } from './ActionStatus';
import type { Priority } from './Priority';
/**
 * Schema for creating a new action.
 */
export type ActionCreate = {
    /**
     * Title of the action
     */
    title: string;
    /**
     * Description of the action
     */
    description?: (string | null);
    /**
     * Priority of the action
     */
    priority?: (Priority | null);
    /**
     * Due date of the action
     */
    due_date?: (string | null);
    /**
     * Status of the action
     */
    status?: (ActionStatus | null);
    /**
     * Project ID of the action
     */
    project_id?: (string | null);
};

