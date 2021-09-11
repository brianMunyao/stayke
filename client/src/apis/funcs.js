import md5 from 'md5';

export const capitalize = (str = '') => {
    return str
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
};

export const money = (str = '') => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const encrypt = (str = '') => {
    return md5(str);
};