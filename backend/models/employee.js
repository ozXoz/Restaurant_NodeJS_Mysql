const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Azr2010q+',
  database: 'restaurant_schema'
});

module.exports = connection;
