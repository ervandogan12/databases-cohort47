const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'sql_transactions',
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL server.');
  createTables();
});

  const queries = {
    createTables: [
      "CREATE TABLE IF NOT EXISTS account (account_number INT PRIMARY KEY, balance DECIMAL(10, 2));",
      "CREATE TABLE IF NOT EXISTS account_changes (change_number SERIAL PRIMARY KEY, account_number INT, amount DECIMAL(10, 2), changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, remark TEXT);"
    ]
  };

  async function createTables() {
  
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
      await Promise.all[queries.createTables.forEach(query => execQuery(query))];   
    } catch (error) {
      console.error(error);
    }
    connection.end();
  }