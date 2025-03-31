import { OpenAPI } from '@/api/generated/core/OpenAPI';
import axios from 'axios';

export function initializeApi() {
    if (!process.env.EXPO_PUBLIC_API_URL) throw new Error("EXPO_PUBLIC_API_URL is not set");
    OpenAPI.BASE = (process.env.EXPO_PUBLIC_API_URL);
    OpenAPI.WITH_CREDENTIALS = true;
    axios.defaults.withCredentials = true;
}