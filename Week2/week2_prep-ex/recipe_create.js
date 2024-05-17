import util from "util";
import mysql from "mysql";
import {
  CREATE_CATEGORIES_TABLE,
  CREATE_RECIPES_TABLE,
  CREATE_RECIPE_CATEGORIES_TABLE,
  CREATE_INGREDIENTS_TABLE,
  CREATE_RECIPES_INGREDIENTS_TABLE,
  CREATE_RECIPES_STEPS_TABLE,
  CREATE_STEPS_TABLE,
  INSERT_CATEGORIES_SET,
  INSERT_RECIPES_SET,
  INSERT_INGREDIENTS_SET,
  INSERT_RECIPE_CATEGORIES_SET,
  INSERT_RECIPE_INGREDIENTS_SET,
  INSERT_RECIPE_STEPS_SET,
  INSERT_STEPS_SET,
  NONBAKED_CAKE_GET,
  RECIPE_WITH_POTATO,
  VEGAN_JAPAN_RECIPES,
  categories,
  recipes,
  ingredients,
  recipeCategories,
  recipeIngredients,
  recipeSteps,
  steps,
} from "./data.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "recipes_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the server.");
  createDatabase();
});

const promisifiedQuery = util.promisify(connection.query).bind(connection);

async function createDatabase() {
  try {
    await promisifiedQuery("DROP DATABASE IF EXISTS recipes_db");
    console.log("Database dropped (if existed).");

    await promisifiedQuery("CREATE DATABASE recipes_db");
    console.log("Database created.");

    await promisifiedQuery("USE recipes_db");
    console.log("Database selected.");

    await createTables();
    await getQueries();
    connection.end(); // Close connection after all queries are executed
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

async function createTables() {
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    await Promise.all([
      execQuery(CREATE_CATEGORIES_TABLE),
      execQuery(CREATE_RECIPES_TABLE),
      execQuery(CREATE_STEPS_TABLE),
      execQuery(CREATE_INGREDIENTS_TABLE),
      execQuery(CREATE_RECIPE_CATEGORIES_TABLE),

      execQuery(CREATE_RECIPES_INGREDIENTS_TABLE),
      execQuery(CREATE_RECIPES_STEPS_TABLE),
    ]);

    await Promise.all(
      categories.map((category) => {
        execQuery(INSERT_CATEGORIES_SET, category);
      }),
      recipes.map((recipe) => {
        execQuery(INSERT_RECIPES_SET, recipe);
      }),
      ingredients.map((ingredient) => {
        execQuery(INSERT_INGREDIENTS_SET, ingredient);
      }),
      steps.map((step) => {
        execQuery(INSERT_STEPS_SET, step);
      }),
      recipeCategories.map((recipeCategory) => {
        execQuery(INSERT_RECIPE_CATEGORIES_SET, recipeCategory);
      }),
      recipeIngredients.map((recipeingredient) => {
        execQuery(INSERT_RECIPE_INGREDIENTS_SET, recipeingredient);
      }),
      recipeSteps.map((recipeStep) => {
        execQuery(INSERT_RECIPE_STEPS_SET, recipeStep);
      })
    );
  } catch (error) {
    console.error(error);
  }
}

async function getQueries() {
  const execQuery = util.promisify(connection.query.bind(connection));
  try {
    const result1 = await Promise.all([
      execQuery(NONBAKED_CAKE_GET),
      execQuery(RECIPE_WITH_POTATO),
      execQuery(VEGAN_JAPAN_RECIPES),
    ]);
    console.log("Query result:", result1);
  } catch (error) {
    console.error(error);
  }
}
