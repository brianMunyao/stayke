import axios from 'axios';
import { DB_URL } from './funcs';

export const createApartment = async(property) => {
    const { data } = await axios.post(`${DB_URL}/`, property);
    return data;
};

export const searchHouse = async(params) => {
    const { data } = await axios.get(`${DB_URL}/search`, { params });
    return data;
};

export const getProperty = async(id) => {
    const { data } = await axios.get(`${DB_URL}/property/${id}`);
    return data;
};

export const getRelatedProperties = async(
    town,
    county,
    bedrooms,
    bathrooms
) => {
    try {
        const { data } = await axios.get(`${DB_URL}/search`, {
            params: { term: '', town, county, bedrooms, bathrooms },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const getProperties = async() => {
    const { data } = await axios.get(`${DB_URL}/`);
    return data;
};

export const getMyProperties = async(id) => {
    const { data } = await axios.get(`${DB_URL}/properties/${id}`);
    return data;
};

export const deleteImage = async(id, label) => {
    const { data } = await axios.put(`${DB_URL}/property/update/${id}`, {
        label,
    });
    return data;
};

export const updateProperty = async(property) => {
    const { data } = await axios.put(
        `${DB_URL}/property/${property.id}`,
        property
    );
    return data;
};

export const deleteProperty = async(id) => {
    const { data } = await axios.delete(`${DB_URL}/property/${id}`);
    return data;
};