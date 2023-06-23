import axios from 'axios';
import { useContext } from 'react';
import { AuthUserContext } from './context/authUserContext';

// const { token } = useContext(AuthUserContext)

export const makeRequest = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    // headers: `Bearer ${token}`
    // withCredentials: true
});
