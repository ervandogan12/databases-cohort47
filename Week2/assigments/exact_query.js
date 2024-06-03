import util  from "util";
import connection from "./connection.js";

const execQuery = util.promisify(connection.query.bind(connection));

export default execQuery;