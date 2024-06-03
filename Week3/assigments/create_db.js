const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL server.');
  createOrResetDatabase();
});

function createOrResetDatabase() {
  connection.query('DROP DATABASE IF EXISTS sql_transactions', (err) => {
    if (err) throw err;
    console.log('Database dropped (if existed).');
    connection.query('CREATE DATABASE sql_transactions', (err) => {
      if (err) throw err;
      console.log('Database created.');
      connection.end(); 
    });
  });
}