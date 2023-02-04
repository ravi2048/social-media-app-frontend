import axios from 'axios';

export const makeRequest = axios.create({
    baseUrl: "http://localhost:8800",
    withCredentials: true
});