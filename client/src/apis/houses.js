import axios from 'axios';

export const createApartment = async(property) => {
    const { data } = await axios.post(`/`, property);
    return data;
};

export const searchHouse = async(params) => {
    const { data } = await axios.get(`/search`, { params });
    return data;
};

export const getProperty = async(id) => {
    const { data } = await axios.get(`/property/${id}`);
    return data;
};

export const getRelatedProperties = async(
    town,
    county,
    bedrooms,
    bathrooms
) => {
    try {
        const { data } = await axios.get(`/search`, {
            params: { term: '', town, county, bedrooms, bathrooms },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const getProperties = async() => {
    const { data } = await axios.get(`/`);
    return data;
};

export const getMyProperties = async(id) => {
    const { data } = await axios.get(`/properties/${id}`);
    return data;
};

export const deleteImage = async(id, label) => {
    const { data } = await axios.put(`/property/update/${id}`, {
        label,
    });
    return data;
};

export const updateProperty = async(property) => {
    const { data } = await axios.put(`/property/${property.id}`, property);
    return data;
};

export const deleteProperty = async(id) => {
    const { data } = await axios.delete(`/property/${id}`);
    return data;
};