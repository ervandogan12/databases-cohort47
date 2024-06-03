import execQuery from './exact_query.js';
import {
  authorsData,
  researchPapersData,
  authorPaperData,
  mentors,
} from "../assigments/data/author_data.js";
import connection from "../assigments/connection.js";


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");
  insertIntoTables();
});

  async function insertIntoTables() {
 
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
