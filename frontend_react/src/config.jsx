
import axios from 'axios';

// const env = 'local'
const env = 'docker'

export const API_URL = env === 'local' ? `http://127.0.0.1:8000/api` : `http://localhost:8081/api`

// axios instance

export const AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});
