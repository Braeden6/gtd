import { OpenAPI } from '@/api/generated/core/OpenAPI';
import axios from 'axios';

export function initializeApi() {
    OpenAPI.BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000');
    OpenAPI.WITH_CREDENTIALS = true;
    axios.defaults.withCredentials = true;
}