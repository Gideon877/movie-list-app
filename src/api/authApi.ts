import axios from "axios";
import { User } from "../utils/interfaces";

const BASE_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/auth`;

interface LoginUser {
    username: string | null;
    password: string | null;
}

export const loginApi = async (params: LoginUser) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, params);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const signupApi = async (params: User) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, params);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};