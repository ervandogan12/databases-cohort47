const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "library",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");
  createAuthorTable();
});

const queries = {
  createTables: [
    "CREATE TABLE IF NOT EXISTS authors (author_id INT PRIMARY KEY, author_name VARCHAR(255), university VARCHAR(255), date_of_birth DATE, h_index INT, gender CHAR(5));",
    "ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)",
  ],
};

async function createAuthorTable() {
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await Promise.all[
      queries.createTables.forEach((query) => execQuery(query))
    ];
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
