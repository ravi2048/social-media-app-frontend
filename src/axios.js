import axios from 'axios';

export const makeRequest = axios.create({
    baseUrl: "/",
    withCredentials: true
});