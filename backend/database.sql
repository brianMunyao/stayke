-- CREATE DATABASE stayke IF NOT EXISTS;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    date_joined date NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE properties(
    id SERIAL PRIMARY KEY,
    apt_name VARCHAR(255) NOT NULL,
    county VARCHAR(255) NOT NULL,
    town VARCHAR(255) NOT NULL,
    no_of_bedrooms smallint NOT NULL,
    no_of_bathrooms smallint NOT NULL,
    rent integer NOT NULL,
    apt_desc text,
    user_id integer NOT NULL,
    date_created date NOT NULL DEFAULT CURRENT_DATE,
    promoted boolean NOT NULL DEFAULT false,
    img1 text,
    img2 text
);
