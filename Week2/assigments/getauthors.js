import execQuery from './exact_query.js';

import {
  AUTHOR_NAME_MENTOR,
  AUTHOR_NUM_PAPERS,
  AUTHOR_PULISHED_TITLE,
  AVERAGE_INDEX_PER_UNI,
  SUM_PAPERS_AUTH_PER_UNI,
  TOTAL_PAPERS_BY_FEMALE_AUTHORS,
  MIN_MAX_H_INDEX_ALL_AUTHORS_PER_UNI,
} from "../assigments/data/sql_commands.js";
import connection from "../assigments/connection.js";


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");
  getQueries();
});
async function getQueries() {

  try {
    const result = await Promise.all([
      execQuery(AUTHOR_NAME_MENTOR),
      execQuery(AUTHOR_PULISHED_TITLE),
      execQuery(AUTHOR_NUM_PAPERS),
      execQuery(TOTAL_PAPERS_BY_FEMALE_AUTHORS),
      execQuery(AVERAGE_INDEX_PER_UNI),
      execQuery(SUM_PAPERS_AUTH_PER_UNI),
      execQuery(MIN_MAX_H_INDEX_ALL_AUTHORS_PER_UNI),
    ]);
    console.log("Query result:", result);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
