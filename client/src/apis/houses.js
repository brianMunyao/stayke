import axios from 'axios';

export const createApartment = async(property) => {
    const { data } = await axios.post(`/api/general`, property);
    return data;
};

export const searchHouse = async(params) => {
    const { data } = await axios.get(`/api/search`, { params });
    return data;
};

export const getProperty = async(id) => {
    const { data } = await axios.get(`/api/property/${id}`);
    return data;
};

export const getRelatedProperties = async(
    town,
    county,
    bedrooms,
    bathrooms
) => {
    const { data } = await axios.get(`/api/search`, {
        params: { term: '', town, county, bedrooms, bathrooms },
    });
    return data;
};

export const getProperties = async() => {
    const { data } = await axios.get('/api/general');
    return data;
};

export const getNewestPropeties = async() => {
    const { data } = await axios.get(`/api/newest`);
    return data;
};

export const getMyProperties = async(id) => {
    const { data } = await axios.get(`/api/properties/${id}`);
    return data;
};

export const deleteImage = async(id, label) => {
    const { data } = await axios.put(`/api/property/update/${id}`, {
        label,
    });
    return data;
};

export const updateProperty = async(property) => {
    const { data } = await axios.put(`/api/property/${property.id}`, property);
    return data;
};

export const deleteProperty = async(id) => {
    const { data } = await axios.delete(`/api/property/${id}`);
    return data;
};