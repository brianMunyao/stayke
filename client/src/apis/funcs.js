import md5 from 'md5';
import emailjs, { init } from 'emailjs-com';
const templateID = 'template_te5f2op';
const userID = 'user_m2P4mR4cGzSB9kkedTF8R';
const serviceID = 'service_8x0tj8v';

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

export const sendEmail = async(params, template = { templateID }) => {
    try {
        init(userID);
        emailjs.send(serviceID, template, params, userID).then(
            (res) => {
                console.log('email sent');
            },
            (err) => {
                console.log('code not sent');
            }
        );
    } catch (e) {
        console.log(e);
    }
};

export const randomGen = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const counties = [
    'Baringo',
    'Bomet',
    'Bungoma',
    'Busia',
    'Elgeyo-Marakwet',
    'Embu',
    'Garissa',
    'Homa-bay',
    'Isiolo',
    'Kajiado',
    'Kakamega',
    'Kericho',
    'Kiambu',
    'Kilifi',
    'Kirinyaga',
    'Kisii',
    'Kisumu',
    'Kitui',
    'Kwale',
    'Laikipia',
    'Lamu',
    'Machakos',
    'Makueni',
    'Mandera',
    'Marsabit',
    'Meru',
    'Migori',
    'Mombasa',
    'Muranga',
    'Nairobi',
    'Nakuru',
    'Nandi',
    'Narok',
    'Nyamira',
    'Nyandarua',
    'Nyeri',
    'Samburu',
    'Siaya',
    'Taita-Taveta',
    'Tana River',
    'Tharaka-Nithi',
    'Trans-Nzoia',
    'Turkana',
    'Uasin Gishu',
    'Vihiga',
    'Wajir',
    'West Pokot',
];