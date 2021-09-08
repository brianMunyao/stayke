const PORT = process.env.PORT || 5000;
export const DB_URL = `http://localhost:${PORT}`;

export const capitalize = (str = '') => {
    return str
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
};

export const money = (str = '') => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};