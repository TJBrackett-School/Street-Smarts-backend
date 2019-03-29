var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'final',
    password: '290',
    database: 'test'
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;
