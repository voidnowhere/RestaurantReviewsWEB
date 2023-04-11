import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosInstance;