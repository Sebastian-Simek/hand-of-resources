-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS instruments;

CREATE TABLE instruments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    range VARCHAR NOT NULL
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
('Piano', 'Percussion', 'All')
