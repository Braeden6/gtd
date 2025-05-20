/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionStatusComparison } from './ActionStatusComparison';
import type { ComparisonSearch } from './ComparisonSearch';
import type { StringComparison } from './StringComparison';
export type SearchAction = {
    offset?: number;
    limit?: (number | null);
    page?: (number | null);
    created_at?: (ComparisonSearch | null);
    updated_at?: (ComparisonSearch | null);
    title?: (StringComparison | null);
    description?: (StringComparison | null);
    priority?: (ComparisonSearch | null);
    due_date?: (ComparisonSearch | null);
    status?: (ActionStatusComparison | null);
    project_id?: (ComparisonSearch | null);
};

