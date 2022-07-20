// require MySQL2 
const mysql = require('mysql2');

require('dotenv').config();

// create connection to our database
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

module.exports = dbConnection;