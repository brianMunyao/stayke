const axios = require('axios');

const DB_URL = 'http://localhost:5000';

export const registerUser = async(user) => {
    const { data } = await axios.post(`${DB_URL}/user/signup`, user);
    return data;
};

export const loginUser = async(user) => {
    const { data } = await axios.post(`${DB_URL}/user/login`, user);
    return data;
};

export const isLoggedIn = (cookies) => {
    if (cookies.user === undefined || typeof cookies.user === 'string') {
        return false;
    }
    return true;
};