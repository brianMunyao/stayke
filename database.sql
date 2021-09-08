CREATE DATABASE stayke IF NOT EXISTS;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255)
)

CREATE TABLE properties(
    id SERIAL PRIMARY KEY,
    apt_name VARCHAR(255),
    county VARCHAR(255),
    town VARCHAR(255),
    no_of_bedrooms smallint,
    no_of_bathrooms smallint,
    rent int,
    apt_desc text,
)