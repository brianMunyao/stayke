import axios from 'axios';

export const createApartment = async(property) => {
    const { data } = await axios.post(`/api`, property);
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
    try {
        const { data } = await axios.get(`/api/search`, {
            params: { term: '', town, county, bedrooms, bathrooms },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const getProperties = async() => {
    const { data } = await axios.get(`/api`);
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