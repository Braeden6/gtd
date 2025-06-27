/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComparisonSearch } from './ComparisonSearch';
import type { StringComparison } from './StringComparison';
export type SearchSomeday = {
    offset?: number;
    limit?: (number | null);
    page?: (number | null);
    created_at?: (ComparisonSearch | null);
    updated_at?: (ComparisonSearch | null);
    review_date?: (StringComparison | null);
    notes?: (StringComparison | null);
    inbox_id?: (ComparisonSearch | null);
};

