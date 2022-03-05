import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const AuthAxios = axios.create({
    timeout: 6000
})

const accessToken = localStorage.getItem('accessToken') as string

AuthAxios.defaults.headers.common['authorization'] = accessToken

AuthAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            window.location.href = '/login';
        } 
        if (error.response.status === 403 ) {
            window.location.href = '/login';
        } 
    }
);