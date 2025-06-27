/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComparisonSearch } from './ComparisonSearch';
import type { StringComparison } from './StringComparison';
export type SearchReference = {
    offset?: number;
    limit?: (number | null);
    page?: (number | null);
    created_at?: (ComparisonSearch | null);
    updated_at?: (ComparisonSearch | null);
    title?: (StringComparison | null);
    content?: (StringComparison | null);
    ai_summary?: (StringComparison | null);
    inbox_item_id?: (ComparisonSearch | null);
};

