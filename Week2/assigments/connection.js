import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "library",
  });

  export default connection;