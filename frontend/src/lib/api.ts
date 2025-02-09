import { OpenAPI } from '@/api/generated/core/OpenAPI';

export function initializeApi() {
    OpenAPI.BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';
}