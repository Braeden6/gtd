/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Priority } from './Priority';
import type { ProjectStatus } from './ProjectStatus';
export type ProjectCreate = {
    /**
     * Title of the project
     */
    title: string;
    /**
     * Description of the project
     */
    description?: (string | null);
    /**
     * Priority of the project
     */
    priority?: (Priority | null);
    /**
     * Due date of the project
     */
    due_date?: (string | null);
    /**
     * Status of the project
     */
    status?: (ProjectStatus | null);
};

