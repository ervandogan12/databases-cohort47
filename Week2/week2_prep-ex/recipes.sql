-- Create tables
DROP SCHEMA IF EXISTS recipes_db;
CREATE SCHEMA recipes_db;
USE recipes_db;
SET AUTOCOMMIT=0;

CREATE TABLE IF NOT EXISTS recipes_db.Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS recipes_db.Recipes (
    RecipeID INT AUTO_INCREMENT PRIMARY KEY,
    RecipeName VARCHAR(100) NOT NULL,
);


CREATE TABLE IF NOT EXISTS recipes_db.RecipeCategories (
    RecipeID INT,
    CategoryID INT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
CREATE TABLE IF NOT EXISTS recipes_db.Ingredients (
    IngredientID INT AUTO_INCREMENT PRIMARY KEY,
    IngredientName VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS recipes_db.RecipeIngredients (
    RecipeID INT,
    IngredientID INT,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredients(IngredientID)
);

CREATE TABLE IF NOT EXISTS recipes_db.RecipeSteps (
    StepID INT AUTO_INCREMENT PRIMARY KEY,
    RecipeID INT,
    StepDescription TEXT NOT NULL,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
);

-- Insert data into Categories table
INSERT INTO Categories (CategoryName) VALUES
('Cake'), ('No-Bake'), ('Vegetarian'), ('Vegan'), ('Gluten-Free'), ('Japanese');

-- Insert data into Ingredients table
INSERT INTO Ingredients (IngredientName) VALUES
('Condensed milk'), ('Cream Cheese'), ('Lemon Juice'), ('Pie Crust'), ('Cherry Jam'),
('Brussels Sprouts'), ('Lemon juice'), ('Sesame seeds'), ('Pepper'), ('Salt'), ('Olive oil'),
('Macaroni'), ('Butter'), ('Flour'), ('Milk'), ('Shredded Cheddar cheese'),
('Eggs'), ('Soy sauce'), ('Sugar');

-- Insert data into Recipes table
INSERT INTO Recipes (RecipeName, CategoryID) VALUES
('No-Bake Cheesecake', 1), ('Roasted Brussels Sprouts', 4), ('Mac & Cheese', 3), ('Tamagoyaki Japanese Omelette', 3), ('Tamagoyaki Japanese Omelette', 5);



-- Roasted Brussels Sprouts
INSERT INTO RecipeCategories (RecipeID, CategoryID) VALUES
(1, 1), (1, 2), (1, 3), (2, 4),(2, 5),(3, 3), (4, 3),(4,6);

INSERT INTO RecipeIngredients (RecipeID, IngredientID) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5);

-- Roasted Brussels Sprouts
INSERT INTO RecipeIngredients (RecipeID, IngredientID) VALUES
(2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11);

-- Mac & Cheese
INSERT INTO RecipeIngredients (RecipeID, IngredientID) VALUES
(3, 12), (3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18);

-- Tamagoyaki Japanese Omelette
INSERT INTO RecipeIngredients (RecipeID, IngredientID) VALUES
(4, 18), (4, 19), (4, 20), (4, 21), (4, 22);

-- Insert data into RecipeSteps table
-- No-Bake Cheesecake
INSERT INTO RecipeSteps (RecipeID, StepDescription) VALUES
(1, 'Beat Cream Cheese'), (1, 'Add condensed Milk and blend'), (1, 'Add Lemon Juice and blend'), (1, 'Add the mix to the pie crust'), (1, 'Spread the Cherry Jam'), (1, 'Place in refrigerator for 3h.');

-- Roasted Brussels Sprouts
INSERT INTO RecipeSteps (RecipeID, StepDescription) VALUES
(2, 'Preheat the oven'), (2, 'Mix the ingredients in a bowl'), (2, 'Spread the mix on baking sheet'), (2, "Bake for 30'");

-- Mac & Cheese
INSERT INTO RecipeSteps (RecipeID, StepDescription) VALUES
(3, "Cook Macaroni for 8''"), (3, 'Melt butter in a saucepan'), (3, 'Add flour, salt, pepper and mix'), (3, 'Add Milk and mix'), (3, 'Cook until mix is smooth'), (3, 'Add cheddar cheese'), (3, 'Add the macaroni');

-- Tamagoyaki Japanese Omelette
INSERT INTO RecipeSteps (RecipeID, StepDescription) VALUES
(4, 'Beat the eggs'), (4, 'Add soya sauce, sugar and salt'), (4, 'Add oil to a sauce pan'), (4, 'Bring to medium heat'), (4, 'Add some mix to the sauce pan'), (4, "Let is cook for 1'"), (4, 'Add oil to a sauce pan'), (4, 'Add some mix to the sauce pan'), (4, "Let is cook for 1'"), (4, 'Remove pan from fire');

--  All the vegan and Japanese recipes
SELECT
    r.RecipeName,
    c.CategoryName
FROM
    recipes_db.Recipes r
JOIN
    recipes_db.RecipeCategories rc ON r.RecipeID = rc.RecipeID
JOIN
    recipes_db.Categories c ON rc.CategoryID = c.CategoryID WHERE c.CategoryName IN ('Vegan', 'Japanese');

--  All the cakes that do not need baking
SELECT
    r.RecipeName
FROM
    recipes_db.Recipes r
JOIN
    recipes_db.RecipeCategories rc ON r.RecipeID = rc.RecipeID
JOIN
    recipes_db.Categories c ON rc.CategoryID = c.CategoryID
WHERE
    c.CategoryName = 'No-Bake';

-- All the vegetarian recipes with potatoes
SELECT
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
    AND i.IngredientName = 'Potatoes';

 CREATE TABLE Steps (
    StepID INT PRIMARY KEY AUTO_INCREMENT,
    StepDescription TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Steps (StepDescription)
SELECT DISTINCT StepDescription
FROM RecipeSteps;

CREATE TABLE NewRecipeSteps (
    RecipeID INT,
    StepID INT,
    StepNumber INT,
    PRIMARY KEY (RecipeID, StepNumber),
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID),
    FOREIGN KEY (StepID) REFERENCES Steps(StepID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET @stepNumber := 0;
INSERT INTO NewRecipeSteps (RecipeID, StepID, StepNumber)
SELECT 
    rs.RecipeID,
    s.StepID,
    (@stepNumber := @stepNumber + 1) AS StepNumber
FROM 
    RecipeSteps rs
JOIN 
    Steps s ON rs.StepDescription = s.StepDescription
ORDER BY 
    rs.RecipeID, rs.StepID;

ALTER TABLE NewRecipeSteps RENAME TO RecipeSteps;