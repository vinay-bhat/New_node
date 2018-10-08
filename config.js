var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'purchase',
  multipleStatements: true
});

module.exports = connection;
