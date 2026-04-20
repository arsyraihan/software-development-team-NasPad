import axios from 'axios';

const api = axios.create({
    // URL backend Laravel Anda
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // Wajib diaktifkan agar Laravel Sanctum bisa mengenali token/sesi login
    withCredentials: true,
});

// Interceptor untuk menyisipkan Token akses di setiap request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;