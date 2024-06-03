import mysql from "mysql";

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
  const DB_NAME = 'library';
  connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`, (err) => {
    if (err) throw err;
    console.log('Database dropped (if existed).');
    connection.query(`CREATE DATABASE ${DB_NAME}`, (err) => {
      if (err) throw err;
      console.log('Database created.');
      connection.end(); 
    });
  });
}