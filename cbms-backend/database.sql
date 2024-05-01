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
    meeting_id   INT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    start_time   DATETIME     NOT NULL,
    end_time     DATETIME     NOT NULL,
    room_id      INT REFERENCES Rooms (room_id) ON DELETE SET NULL ON UPDATE CASCADE,
    notes        TEXT,
    is_published BOOLEAN   DEFAULT FALSE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Attendees
(
    meeting_id   INT NOT NULL REFERENCES Meetings (meeting_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id      INT NOT NULL REFERENCES Users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_presenter BOOLEAN   DEFAULT FALSE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (meeting_id, user_id),
    PRIMARY KEY (meeting_id, user_id)
);

GRANT ALL PRIVILEGES ON cbms_database.Users TO backend_server;
GRANT ALL PRIVILEGES ON cbms_database.Rooms TO backend_server;
GRANT ALL PRIVILEGES ON cbms_database.Meetings TO backend_server;
GRANT ALL PRIVILEGES ON cbms_database.Attendees TO backend_server;

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

INSERT INTO Meetings (title, start_time, end_time, room_id, notes)
VALUES ('Project meeting', '2024-05-01 09:00:00', '2024-05-01 10:00:00', 1, 'Discuss project progress'),
       ('Team meeting', '2024-05-02 10:00:00', '2024-05-02 11:00:00', 2, 'Discuss team progress'),
       ('Training session', '2024-05-03 11:00:00', '2024-05-03 12:00:00', 3, 'Training session for new employees'),
       ('Client meeting', '2024-05-04 12:00:00', '2024-05-04 13:00:00', 4,
        'Meeting with client to discuss project requirements'),
       ('Board meeting', '2024-05-05 13:00:00', '2024-05-05 14:00:00', 5,
        'Board meeting to discuss government strategy'),
       ('Video conference', '2024-05-06 14:00:00', '2024-05-06 15:00:00', 6,
        'Video conference with international partners'),
       ('Workshop', '2024-05-07 15:00:00', '2024-05-07 16:00:00', 7, 'Workshop on new technologies');

INSERT INTO Attendees (meeting_id, user_id, is_presenter)
VALUES (1, 1, TRUE),
       (1, 2, FALSE),
       (2, 1, TRUE),
       (2, 2, FALSE),
       (2, 3, FALSE),
       (3, 1, TRUE),
       (3, 2, FALSE),
       (3, 3, FALSE),
       (4, 1, TRUE),
       (4, 2, FALSE),
       (4, 3, FALSE),
       (4, 4, FALSE),
       (5, 1, TRUE),
       (5, 2, FALSE),
       (5, 3, FALSE),
       (5, 4, FALSE),
       (6, 1, TRUE),
       (6, 2, FALSE),
       (6, 3, FALSE),
       (6, 4, FALSE),
       (7, 1, TRUE),
       (7, 2, FALSE),
       (7, 3, FALSE),
       (7, 4, FALSE);