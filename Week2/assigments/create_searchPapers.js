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
  createSearchPaperTables();
});

const queries = {
  createTables: [
    "CREATE TABLE IF NOT EXISTS research_papers (paper_id INT PRIMARY KEY AUTO_INCREMENT, paper_title VARCHAR(255) NOT NULL, conference VARCHAR(255), publish_date DATE)",
    "CREATE TABLE IF NOT EXISTS author_paper (author_id INT, paper_id INT, PRIMARY KEY (author_id, paper_id),FOREIGN KEY (author_id) REFERENCES Authors(author_id),FOREIGN KEY (paper_id) REFERENCES Research_Papers(paper_id))",
  ],
};

async function createSearchPaperTables() {
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
//There are many-to-many relationship between authors and research papers.For that kind of relation we need to create author_paper table whcih takes primary keys of first two tables as foreing keys
