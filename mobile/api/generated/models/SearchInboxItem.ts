/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanSearch } from './BooleanSearch';
import type { ComparisonSearch } from './ComparisonSearch';
import type { StringComparison } from './StringComparison';
export type SearchInboxItem = {
    offset?: number;
    limit?: (number | null);
    page?: (number | null);
    created_at?: (ComparisonSearch | null);
    updated_at?: (ComparisonSearch | null);
    content?: (StringComparison | null);
    image_id?: (ComparisonSearch | null);
    processed?: (BooleanSearch | null);
    is_new?: (BooleanSearch | null);
    action_id?: (ComparisonSearch | null);
    project_id?: (ComparisonSearch | null);
};

