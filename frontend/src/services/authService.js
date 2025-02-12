// src/utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Match your backend port
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authAPI = {
    signup: async (userData) => {
        try {
            const response = await api.post('/auth/signup', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};