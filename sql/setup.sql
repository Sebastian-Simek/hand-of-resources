-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS dogs;

CREATE TABLE instruments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    range VARCHAR NOT NULL
);

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    manufacturer VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    year INT
);

CREATE TABLE fruits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    is_healthy BOOLEAN
);

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    age INT
);

INSERT INTO instruments (
    name,
    category,
    range
)
VALUES 
('Violin', 'Strings', 'Treble'),
('Viola', 'Strings', 'Alto'),
('Cello', 'Strings', 'Tenor'),
('Bass', 'Strings', 'Bass'),
('Trumpet', 'Brass', 'Treble'),
('Bassoon', 'Woodwinds', 'Tenor'),
('Piano', 'Percussion', 'All');

INSERT INTO cars (
    name,
    manufacturer,
    country, 
    year
)
VALUES 
('Outback', 'Subaru', 'Japan', 2003),
('Corolla', 'Toyota', 'Japan', 2020),
('M3', 'BMW', 'Germany', 1997),
('911', 'Porsche', 'Germany', 2022),
('Mustang', 'Ford', 'USA', 1967);

INSERT INTO fruits (
    name,
    type,
    is_healthy
)
VALUES 
('Apple', 'Tree Based', true),
('Orange', 'Citrus', true),
('Fig', 'Flower', false);

INSERT INTO dogs (
    name,
    type,
    age
)
VALUES
('Spot', 'Poodle', 6),
('Jeep', 'Mutt', 3),
('Benny', 'Terrier', 5)