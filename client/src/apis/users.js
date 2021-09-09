const axios = require('axios');

export const registerUser = async(user) => {
    const { data } = await axios.post(`/user/signup`, user);
    return data;
};

export const loginUser = async(user) => {
    const { data } = await axios.post(`/user/login`, user);
    return data;
};

export const isLoggedIn = (cookies) => {
    if (cookies.user === undefined || typeof cookies.user === 'string') {
        return false;
    }
    return true;
};