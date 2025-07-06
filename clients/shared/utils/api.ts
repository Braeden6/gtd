
import axios from 'axios';
import { OpenAPI } from '../api/generated';

export function initializeApi(API_URL?: string) {
    OpenAPI.BASE = (API_URL || 'http://localhost:3000');
    OpenAPI.WITH_CREDENTIALS = true;
    axios.defaults.withCredentials = true;
}