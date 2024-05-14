const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL server.');
  createDatabase();
});

function createDatabase() {
  connection.query('DROP DATABASE IF EXISTS library', (err) => {
    if (err) throw err;
    console.log('Database dropped (if existed).');
    connection.query('CREATE DATABASE library', (err) => {
      if (err) throw err;
      console.log('Database created.');
      connection.end(); 
    });
  });
}