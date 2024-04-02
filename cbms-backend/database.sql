SET @@AUTOCOMMIT = 1;

DROP DATABASE IF EXISTS cbms_database;
DROP USER IF EXISTS backend_server;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS cbms_database;
CREATE USER IF NOT EXISTS 'backend_server'@'%' IDENTIFIED BY 'x9Jfh3tegfcZVe3WP4Nza8BoAghqr2iG';
USE cbms_database;

CREATE TABLE Users
(
    user_id    INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255)             NOT NULL,
    email      VARCHAR(255)             NOT NULL,
    role       ENUM ('admin', 'member') NOT NULL,
    hash       CHAR(128)                NOT NULL,
    salt       CHAR(32)                 NOT NULL,
    token      CHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON cbms_database.Users TO backend_server;

CREATE TABLE Rooms
(
    room_id    INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255)             NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON cbms_database.Rooms TO backend_server;


-- Passwords are 'admin123', 'member123', 'pass123', 'word123'
INSERT INTO Users (name, email, role, hash, salt)
VALUES ('Zhang San', 'zhang@sa.gov.au', 'admin',
        '1e7bc74e3f5662ab90740b16d3f4e9e60478f0e96c49a3d114ec17a4442f9e7c0dd63d38cffa8720e4e0fa8048b9c3af04617401f5886540706fb63da622bfd0',
        '1ab38f76de38aba85672c886abda652b'),
       ('Li Si', 'li@sa.gov.au', 'member',
        '0d42ff3265186504cf930311f3cac31e89ec87ecc65c48ceefdf2b03f7bdd0e8e2ad1072fbf5e3c2ea7d10f4f26f52b854732913a21c67ac61a0613d95802cdc',
        '0b6105844931b4547652fea4028f23e6'),
       ('Wang Wu', 'wang@sa.gov.au', 'member',
        '0ca6c1035701a924bc2e6ff978ea50d7eef4a1bbb738bd4cc08e1e0aa10c21cc829f719cb127563a84bc3c9e7e471bda0ece44a3b65d852bb05a9f1ca0f6bcad',
        'f7c03da274e20b7886a1e893931654c2'),
       ('Zhao Liu', 'zhao@sa.gov.au', 'member',
        'a9fdf3166deaa760362637e816f546d0a7796ea1ac34b1100d45539f7c1d28ea6757cda34b93b586779ddb0f3be8497090ae07ffc7dda146b05f5c9e24c87357',
        '85952d970baa9b8717caa6cff208c944');
