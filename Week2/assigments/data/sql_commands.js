export const AUTHOR_NAME_MENTOR = `Select author_name,mentor from library.authors;`;

export const AUTHOR_PULISHED_TITLE =
  "SELECT au.*, rp.paper_title FROM library.authors au LEFT JOIN library.author_paper ap ON au.author_id= ap.author_id LEFT JOIN library.research_papers rp ON ap.paper_id = rp.paper_id;";

export const AUTHOR_NUM_PAPERS =
  "SELECT rp.paper_title AS paper_title, COUNT(ap.author_id) AS num_authors FROM library.research_papers rp LEFT JOIN library.author_paper ap ON rp.paper_id= ap.paper_id GROUP BY rp.paper_id, rp.paper_title";
export const TOTAL_PAPERS_BY_FEMALE_AUTHORS =
  'SELECT COUNT(ap.paper_id) AS total_papers_by_female_authors FROM library.authors au INNER JOIN library.author_paper ap ON ap.author_id = au.author_id WHERE au.gender= "F";';
export const AVERAGE_INDEX_PER_UNI =
  "SELECT university, AVG(h_index) AS average_h_index FROM library.authors GROUP BY university;";
export const SUM_PAPERS_AUTH_PER_UNI =
  "SELECT au.university, au.author_name, COUNT(ap.paper_id) AS sum_papers_of_authors_per_uni FROM library.authors au INNER JOIN library.author_paper ap ON ap.author_id = au.author_id GROUP BY au.university, au.author_name;";
export const MIN_MAX_H_INDEX_ALL_AUTHORS_PER_UNI =
  "SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index FROM library.authors GROUP BY university;";
