import util from "util";
import mysql from "mysql";
import { authorsData, researchPapersData, authorPaperData, mentors} from "./author_data.js";

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'library'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server.');
    insertIntoTables();
  });
  async function insertIntoTables() {
    const execQuery = util.promisify(connection.query.bind(connection));
    try {      
        await Promise.all(authorsData.map(async author => {
            await execQuery(`INSERT INTO Authors SET ?`, author);
        }));
        await Promise.all(researchPapersData.map(paper =>{
            execQuery('INSERT INTO Research_Papers SET ?', paper);
        }));
        await Promise.all(authorPaperData.map(authorPaper =>{
            execQuery('INSERT INTO Author_Paper SET ?', authorPaper);
        }));
        await Promise.all(mentors.map(async mentor => {
            await execQuery(`UPDATE Authors SET mentor = ? WHERE author_id = ?`, [mentor.mentor, mentor.author_id]);
        }));
    } catch (error) {
        console.error(error);
    }
    connection.end();
}




