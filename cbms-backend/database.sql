SET @@AUTOCOMMIT = 1;

DROP DATABASE IF EXISTS cbms;
DROP USER backend;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS cbms;
CREATE USER IF NOT EXISTS 'backend'@'%' IDENTIFIED BY 'x9Jfh3tegfcZVe3WP4Nza8BoAghqr2iG' ;
USE cbms;

CREATE TABLE User (
                      user_id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      role ENUM('admin', 'member') NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON cbms.User TO backend;

INSERT INTO User (username, password, email, role) VALUES
                                                       ('Zhang San', 'admin123', 'zhang@sa.gov.au', 'admin'),
                                                       ('Li Si', 'member123', 'li@sa.gov.au', 'member'),
                                                       ('Wang Wu', 'pass123', 'wang@sa.gov.au', 'member'),
                                                       ('Zhao Liu', 'word123', 'zhao@sa.gov.au', 'member');
