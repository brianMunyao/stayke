const axios = require('axios');

export const registerUser = async (user) => {
	const { data } = await axios.post(
		`http://localhost:5000/api/user/signup`,
		user
	);
	return data;
};

export const loginUser = async (user) => {
	const { data } = await axios.post(
		`http://localhost:5000/api/user/login`,
		user
	);
	return data;
};

export const updateUser = async (obj, id) => {
	const { data } = await axios.put(
		`http://localhost:5000/api/update/user/${id}`,
		obj
	);
	return data;
};

export const isLoggedIn = (cookies) => {
	if (cookies.user === undefined || typeof cookies.user === 'string') {
		return false;
	}
	return true;
};
export const isSubscribed = (cookies) => {
	if (cookies.sub === undefined || typeof cookies.sub === 'string') {
		return false;
	}
	return true;
};
