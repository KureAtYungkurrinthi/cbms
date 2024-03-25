// Get the client
const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'p@ssw0rd',
    database: process.env.DB_DATABASE || 'cbms',
    port: 3306
});

module.exports = connection;