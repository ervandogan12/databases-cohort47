export const CREATE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS recipes_db.Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL
);`;

export const CREATE_RECIPES_TABLE = `
CREATE TABLE IF NOT EXISTS recipes_db.Recipes (
    RecipeID INT AUTO_INCREMENT PRIMARY KEY,
    RecipeName VARCHAR(100) NOT NULL
);`;
export const CREATE_RECIPE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS recipes_db.RecipeCategories (
    RecipeID INT,
    CategoryID INT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);`;
export const CREATE_INGREDIENTS_TABLE = `
CREATE TABLE IF NOT EXISTS recipes_db.Ingredients (
    IngredientID INT AUTO_INCREMENT PRIMARY KEY,
    IngredientName VARCHAR(50) NOT NULL
);`;

export const CREATE_RECIPES_INGREDIENTS_TABLE = `
CREATE TABLE IF NOT EXISTS recipes_db.RecipeIngredients (
    RecipeID INT,
    IngredientID INT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);`;

export const CREATE_RECIPES_STEPS_TABLE = `
CREATE TABLE IF NOT EXISTS recipes_db.RecipeSteps (
    StepID INT AUTO_INCREMENT PRIMARY KEY,
    RecipeID INT,
    StepDescription TEXT NOT NULL,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);`;
export const INSERT_CATEGORIES_SET = "INSERT INTO Categories SET ?";
export const INSERT_RECIPES_SET = "INSERT INTO Recipes SET ?";
export const INSERT_INGREDIENTS_SET = "INSERT INTO Ingredients SET ?";
export const INSERT_RECIPE_CATEGORIES_SET =
  "INSERT INTO RecipeCategories SET ?";
export const INSERT_RECIPE_INGREDIENTS_SET =
  "INSERT INTO RecipeIngredients SET ?";
export const INSERT_RECIPE_STEPS_SET = "INSERT INTO RecipeSteps SET ?";

export const NONBAKED_CAKE_GET = `SELECT
r.RecipeName
FROM
recipes_db.Recipes r
JOIN
recipes_db.RecipeCategories rc ON r.RecipeID = rc.RecipeID
JOIN
recipes_db.Categories c ON rc.CategoryID = c.CategoryID
WHERE
c.CategoryName = 'No-Bake';`;
export const RECIPE_WITH_POTATO = `SELECT
r.RecipeName
FROM
recipes_db.Recipes r
JOIN
recipes_db.RecipeCategories rc ON r.RecipeID = rc.RecipeID
JOIN
recipes_db.Categories c ON rc.CategoryID = c.CategoryID
JOIN
recipes_db.RecipeIngredients ri ON r.RecipeID = ri.RecipeID
JOIN
recipes_db.Ingredients i ON ri.IngredientID = i.IngredientID
WHERE
c.CategoryName = 'Vegetarian'
AND i.IngredientName = 'Eggs';`;

export const VEGAN_JAPAN_RECIPES = `SELECT
r.RecipeName,
c.CategoryName
FROM
recipes_db.Recipes r
JOIN
recipes_db.RecipeCategories rc ON r.RecipeID = rc.RecipeID
JOIN
recipes_db.Categories c ON rc.CategoryID = c.CategoryID WHERE c.CategoryName IN ('Vegan', 'Japanese');`;

export const categories = [
  {
    CategoryID: 1,
    CategoryName: "Cake",
  },
  {
    CategoryID: 2,
    CategoryName: "No-Bake",
  },
  {
    CategoryID: 3,
    CategoryName: "Vegetarian",
  },
  {
    CategoryID: 4,
    CategoryName: "Vegan",
  },
  {
    CategoryID: 5,
    CategoryName: "Gluten-Free",
  },
  {
    CategoryID: 6,
    CategoryName: "Japanese",
  },
];

export const recipes = [
  {
    RecipeID: 1,
    RecipeName: "No-Bake Cheesecake",
  },
  {
    RecipeID: 2,
    RecipeName: "Roasted Brussels Sprouts",
  },
  {
    RecipeID: 3,
    RecipeName: "Mac & Cheese",
  },
  {
    RecipeID: 4,
    RecipeName: "Tamagoyaki Japanese Omelette",
  },
];
export const ingredients = [
  {
    IngredientID: 1,
    IngredientName: "Condensed milk",
  },
  {
    IngredientID: 2,
    IngredientName: "Cream Cheese",
  },
  {
    IngredientID: 3,
    IngredientName: "Lemon Juice",
  },
  {
    IngredientID: 4,
    IngredientName: "Pie Crust",
  },
  {
    IngredientID: 5,
    IngredientName: "Cherry Jam",
  },
  {
    IngredientID: 6,
    IngredientName: "Brussels Sprouts",
  },
  {
    IngredientID: 7,
    IngredientName: "Lemon juice",
  },
  {
    IngredientID: 8,
    IngredientName: "Sesame seeds",
  },
  {
    IngredientID: 9,
    IngredientName: "Pepper",
  },
  {
    IngredientID: 10,
    IngredientName: "Salt",
  },
  {
    IngredientID: 11,
    IngredientName: "Olive oil",
  },
  {
    IngredientID: 12,
    IngredientName: "Macaroni",
  },
  {
    IngredientID: 13,
    IngredientName: "Butter",
  },
  {
    IngredientID: 14,
    IngredientName: "Flour",
  },
  {
    IngredientID: 15,
    IngredientName: "Milk",
  },
  {
    IngredientID: 16,
    IngredientName: "Shredded Cheddar cheese",
  },
  {
    IngredientID: 17,
    IngredientName: "Eggs",
  },
  {
    IngredientID: 18,
    IngredientName: "Soy sauce",
  },
  {
    IngredientID: 19,
    IngredientName: "Sugar",
  },
];

export const recipeCategories = [
  {
    RecipeID: 1,
    CategoryID: 1,
  },
  {
    RecipeID: 1,
    CategoryID: 2,
  },
  {
    RecipeID: 1,
    CategoryID: 3,
  },
  {
    RecipeID: 2,
    CategoryID: 4,
  },
  {
    RecipeID: 2,
    CategoryID: 5,
  },
  {
    RecipeID: 3,
    CategoryID: 3,
  },
  {
    RecipeID: 4,
    CategoryID: 3,
  },
  {
    RecipeID: 4,
    CategoryID: 6,
  },
];

export const recipeIngredients = [
  // No-Bake Cheesecake
  { RecipeID: 1, IngredientID: 1 },
  { RecipeID: 1, IngredientID: 2 },
  { RecipeID: 1, IngredientID: 3 },
  { RecipeID: 1, IngredientID: 4 },
  { RecipeID: 1, IngredientID: 5 },

  // Roasted Brussels Sprouts
  { RecipeID: 2, IngredientID: 6 },
  { RecipeID: 2, IngredientID: 7 },
  { RecipeID: 2, IngredientID: 8 },
  { RecipeID: 2, IngredientID: 9 },
  { RecipeID: 2, IngredientID: 10 },
  { RecipeID: 2, IngredientID: 11 },

  // Mac & Cheese
  { RecipeID: 3, IngredientID: 12 },
  { RecipeID: 3, IngredientID: 13 },
  { RecipeID: 3, IngredientID: 14 },
  { RecipeID: 3, IngredientID: 15 },
  { RecipeID: 3, IngredientID: 16 },
  { RecipeID: 3, IngredientID: 17 },
  { RecipeID: 3, IngredientID: 18 },

  // Tamagoyaki Japanese Omelette
  { RecipeID: 4, IngredientID: 18 },
  { RecipeID: 4, IngredientID: 19 },
];

export const recipeSteps = [
  // No-Bake Cheesecake
  { RecipeID: 1, StepDescription: "Beat Cream Cheese" },
  { RecipeID: 1, StepDescription: "Add condensed Milk and blend" },
  { RecipeID: 1, StepDescription: "Add Lemon Juice and blend" },
  { RecipeID: 1, StepDescription: "Add the mix to the pie crust" },
  { RecipeID: 1, StepDescription: "Spread the Cherry Jam" },
  { RecipeID: 1, StepDescription: "Place in refrigerator for 3h." },

  // Roasted Brussels Sprouts
  { RecipeID: 2, StepDescription: "Preheat the oven" },
  { RecipeID: 2, StepDescription: "Mix the ingredients in a bowl" },
  { RecipeID: 2, StepDescription: "Spread the mix on baking sheet" },
  { RecipeID: 2, StepDescription: "Bake for 30'" },

  // Mac & Cheese
  { RecipeID: 3, StepDescription: "Cook Macaroni for 8''" },
  { RecipeID: 3, StepDescription: "Melt butter in a saucepan" },
  { RecipeID: 3, StepDescription: "Add flour, salt, pepper and mix" },
  { RecipeID: 3, StepDescription: "Add Milk and mix" },
  { RecipeID: 3, StepDescription: "Cook until mix is smooth" },
  { RecipeID: 3, StepDescription: "Add cheddar cheese" },
  { RecipeID: 3, StepDescription: "Add the macaroni" },

  // Tamagoyaki Japanese Omelette
  { RecipeID: 4, StepDescription: "Beat the eggs" },
  { RecipeID: 4, StepDescription: "Add soya sauce, sugar and salt" },
  { RecipeID: 4, StepDescription: "Add oil to a sauce pan" },
  { RecipeID: 4, StepDescription: "Bring to medium heat" },
  { RecipeID: 4, StepDescription: "Add some mix to the sauce pan" },
  { RecipeID: 4, StepDescription: "Let is cook for 1'" },
  { RecipeID: 4, StepDescription: "Add oil to a sauce pan" },
  { RecipeID: 4, StepDescription: "Add some mix to the sauce pan" },
  { RecipeID: 4, StepDescription: "Let is cook for 1'" },
  { RecipeID: 4, StepDescription: "Remove pan from fire" },
];
