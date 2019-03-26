var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tbrackett',
    password: '5243924tjb',
    database: 'test'
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;
