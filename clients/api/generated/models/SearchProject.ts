/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComparisonSearch } from './ComparisonSearch';
import type { PriorityComparison } from './PriorityComparison';
import type { ProjectStatusComparison } from './ProjectStatusComparison';
import type { StringComparison } from './StringComparison';
export type SearchProject = {
    offset?: number;
    limit?: (number | null);
    page?: (number | null);
    created_at?: (ComparisonSearch | null);
    updated_at?: (ComparisonSearch | null);
    title?: (StringComparison | null);
    description?: (StringComparison | null);
    priority?: (PriorityComparison | null);
    status?: (ProjectStatusComparison | null);
};

