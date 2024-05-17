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
  RecipeID INT,
  StepID INT,
  StepNumber INT,
  PRIMARY KEY (RecipeID, StepNumber),
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
  FOREIGN KEY (StepID) REFERENCES Steps(StepID));`;

export const CREATE_STEPS_TABLE = `
CREATE TABLE IF NOT EXISTS Steps (
  StepID INT PRIMARY KEY AUTO_INCREMENT,
  StepDescription TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

export const INSERT_CATEGORIES_SET = "INSERT INTO Categories SET ?";
export const INSERT_RECIPES_SET = "INSERT INTO Recipes SET ?";
export const INSERT_STEPS_SET = "INSERT INTO Steps SET ?";
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
  { RecipeID: 1, StepID: 1, StepNumber: 1 },
  { RecipeID: 1, StepID: 2, StepNumber: 2 },
  { RecipeID: 1, StepID: 3, StepNumber: 3 },
  { RecipeID: 1, StepID: 4, StepNumber: 4 },
  { RecipeID: 1, StepID: 5, StepNumber: 5 },
  { RecipeID: 1, StepID: 6, StepNumber: 6 },
  { RecipeID: 2, StepID: 7, StepNumber: 7 },
  { RecipeID: 2, StepID: 8, StepNumber: 8 },
  { RecipeID: 2, StepID: 9, StepNumber: 9 },
  { RecipeID: 2, StepID: 10, StepNumber: 10 },
  { RecipeID: 3, StepID: 11, StepNumber: 11 },
  { RecipeID: 3, StepID: 12, StepNumber: 12 },
  { RecipeID: 3, StepID: 13, StepNumber: 13 },
  { RecipeID: 3, StepID: 14, StepNumber: 14 },
  { RecipeID: 3, StepID: 15, StepNumber: 15 },
  { RecipeID: 3, StepID: 16, StepNumber: 16 },
  { RecipeID: 3, StepID: 17, StepNumber: 17 },
  { RecipeID: 4, StepID: 18, StepNumber: 18 },
  { RecipeID: 4, StepID: 19, StepNumber: 19 },
  { RecipeID: 4, StepID: 20, StepNumber: 20 },
  { RecipeID: 4, StepID: 20, StepNumber: 24 },
  { RecipeID: 4, StepID: 21, StepNumber: 21 },
  { RecipeID: 4, StepID: 22, StepNumber: 22 },
  { RecipeID: 4, StepID: 22, StepNumber: 25 },
  { RecipeID: 4, StepID: 23, StepNumber: 23 },
  { RecipeID: 4, StepID: 23, StepNumber: 26 },
  { RecipeID: 4, StepID: 24, StepNumber: 27 }
];

export const steps = [
  { StepID: 1, StepDescription: "Beat Cream Cheese" },
  { StepID: 2, StepDescription: "Add condensed Milk and blend" },
  { StepID: 3, StepDescription: "Add Lemon Juice and blend" },
  { StepID: 4, StepDescription: "Add the mix to the pie crust" },
  { StepID: 5, StepDescription: "Spread the Cherry Jam" },
  { StepID: 6, StepDescription: "Place in refrigerator for 3h." },
  { StepID: 7, StepDescription: "Preheat the oven" },
  { StepID: 8, StepDescription: "Mix the ingredients in a bowl" },
  { StepID: 9, StepDescription: "Spread the mix on baking sheet" },
  { StepID: 10, StepDescription: "Bake for 30'" },
  { StepID: 11, StepDescription: "Cook Macaroni for 8''" },
  { StepID: 12, StepDescription: "Melt butter in a saucepan" },
  { StepID: 13, StepDescription: "Add flour, salt, pepper and mix" },
  { StepID: 14, StepDescription: "Add Milk and mix" },
  { StepID: 15, StepDescription: "Cook until mix is smooth" },
  { StepID: 16, StepDescription: "Add cheddar cheese" },
  { StepID: 17, StepDescription: "Add the macaroni" },
  { StepID: 18, StepDescription: "Beat the eggs" },
  { StepID: 19, StepDescription: "Add soya sauce, sugar and salt" },
  { StepID: 20, StepDescription: "Add oil to a sauce pan" },
  { StepID: 21, StepDescription: "Bring to medium heat" },
  { StepID: 22, StepDescription: "Add some mix to the sauce pan" },
  { StepID: 23, StepDescription: "Let is cook for 1'" },
  { StepID: 24, StepDescription: "Remove pan from fire" }
];
