import axios from 'axios';

export const createApartment = async (property) => {
	const { data } = await axios.post(
		`http://localhost:5000/api/general`,
		property
	);
	return data;
};

export const searchHouse = async (params) => {
	const { data } = await axios.post(
		`http://localhost:5000/api/search/properties`,
		{ params }
	);
	return data;
};

export const getProperty = async (id, userID = 0) => {
	const { data } = await axios.get(
		`http://localhost:5000/api/property/${id}`
	);
	return data;
};

export const getRelatedProperties = async (
	town,
	county,
	bedrooms,
	bathrooms
) => {
	const { data } = await axios.get(`http://localhost:5000/api/search`, {
		params: { term: '', town, county, bedrooms, bathrooms },
	});
	return data;
};

export const getProperties = async () => {
	const { data } = await axios.get('http://localhost:5000/api/general');
	return data;
};

export const getNewestPropeties = async () => {
	const { data } = await axios.get(`http://localhost:5000/api/newest`);
	return data;
};

export const getMyProperties = async (id) => {
	const { data } = await axios.get(
		`http://localhost:5000/api/properties/${id}`
	);
	return data;
};

export const updateInfo = async (obj, id) => {
	const { data } = await axios.put(
		`http://localhost:5000/api/update/property/${id}`,
		obj
	);
	return data;
};

export const deleteProperty = async (id) => {
	const { data } = await axios.delete(
		`http://localhost:5000/api/property/${id}`
	);
	return data;
};

export const likeProperty = async (obj) => {
	const { data } = await axios.post(
		'http://localhost:5000/api/property/save/like',
		obj
	);
	return data;
};
export const dislikeProperty = async (obj) => {
	const { data } = await axios.post(
		'http://localhost:5000/api/property/save/dislike',
		obj
	);
	return data;
};
