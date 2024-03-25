SET @@AUTOCOMMIT = 1;

DROP DATABASE IF EXISTS cbms_database;
DROP USER IF EXISTS backend_server;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS cbms_database;
CREATE USER IF NOT EXISTS 'backend_server'@'%' IDENTIFIED BY 'x9Jfh3tegfcZVe3WP4Nza8BoAghqr2iG' ;
USE cbms_database;

CREATE TABLE Users (
                      user_id INT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      role ENUM('admin', 'member') NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON cbms_database.Users TO backend_server;

INSERT INTO Users (name, email, password, role) VALUES
                                                       ('Zhang San', 'zhang@sa.gov.au', 'admin123', 'admin'),
                                                       ('Li Si', 'li@sa.gov.au', 'member123', 'member'),
                                                       ('Wang Wu', 'wang@sa.gov.au', 'pass123', 'member'),
                                                       ('Zhao Liu', 'zhao@sa.gov.au', 'word123', 'member');
