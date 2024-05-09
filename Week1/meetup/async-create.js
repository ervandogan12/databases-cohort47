import util from "util";

import mysql from "mysql";

import {
  CREATE_INVITEE_TABLE,
  CREATE_ROOM_TABLE,
  CREATE_MEETING_TABLE,
  CREATE_MEETING_INVITEE_TABLE,
  INSERT_INVITEE_SET,
  INSERT_ROOM_SET,
  INSERT_MEETING_SET,
  invitees,
  meetings,
  rooms,
} from "./data.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the server.");
  createDatabase();
});

const promisifiedQuery = util.promisify(connection.query).bind(connection);

async function createDatabase() {
  try {
    await promisifiedQuery("DROP DATABASE IF EXISTS meetup");
    console.log("Database dropped (if existed).");

    await promisifiedQuery("CREATE DATABASE meetup");
    console.log("Database created.");

    await promisifiedQuery("USE meetup");
    console.log("Database selected.");

    await createTables();
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

async function createTables() {
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await Promise.all[
      (execQuery(CREATE_INVITEE_TABLE),
      execQuery(CREATE_ROOM_TABLE),
      execQuery(CREATE_MEETING_TABLE),
      execQuery(CREATE_MEETING_INVITEE_TABLE))
    ];

    await Promise.all(
      invitees.map((invitee) => {
        execQuery(INSERT_INVITEE_SET, invitee);
      }),
      rooms.map((room) => {
        execQuery(INSERT_ROOM_SET, room);
      }),
      meetings.map((meeting) => {
        execQuery(INSERT_MEETING_SET, meeting);
      })
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}
