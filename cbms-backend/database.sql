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

CREATE TABLE Rooms
(
    room_id    INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    location   VARCHAR(255) NOT NULL,
    capacity   INT          NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Meetings
(
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    date       DATE         NOT NULL,
    start_time TIME         NOT NULL,
    end_time   TIME         NOT NULL,
    room_id    INT          NOT NULL,
    created_by INT          NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

GRANT ALL PRIVILEGES ON cbms_database.Users TO backend_server;
GRANT ALL PRIVILEGES ON cbms_database.Rooms TO backend_server;
GRANT ALL PRIVILEGES ON cbms_database.Meetings TO backend_server;

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

INSERT INTO Rooms (name, location, capacity)
VALUES ('Theatre 1 - G42', 'Tonsley', 160),
       ('Theatre 2 – G32', 'Tonsley', 80),
       ('Exhibition space', 'Tonsley', 70),
       ('Meeting room – 2.32', 'Adelaide CBD', 4),
       ('Meeting room – 2.33', 'Adelaide CBD', 6),
       ('Videoconferencing meeting room - 3.30', 'Adelaide CBD', 14),
       ('Conference space - 5.29', 'Adelaide CBD', 40);

       INSERT INTO Meetings (title, date, start_time, end_time, room_id, created_by)
VALUES ('Meeting 1', '2023-03-01', '10:00:00', '11:30:00', 1, 1),
       ('Meeting 2', '2023-03-02', '14:00:00', '15:30:00', 2, 2),
       ('Meeting 3', '2023-03-03', '09:00:00', '10:30:00', 3, 3),
       ('Meeting 4', '2023-03-04', '11:00:00', '12:30:00', 4, 4),
       ('Meeting 5', '2023-03-05', '13:00:00', '14:30:00', 5, 5),
       ('Meeting 6', '2023-03-06', '15:00:00', '16:30:00', 6, 6),
       ('Meeting 7', '2023-03-07', '10:00:00', '11:30:00', 7, 7);