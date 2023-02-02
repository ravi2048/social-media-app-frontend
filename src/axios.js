const axios = require("axios");

export const makeRequest = axios.create({
    baseUrl: "http://localhost:8800/api/",
    withCredentials: true
});