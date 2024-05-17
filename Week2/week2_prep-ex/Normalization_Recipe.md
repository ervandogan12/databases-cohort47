

#2NF (Second Normal Form):

    All tables of recipes_db adhere to 1NF, all columns of a table are fully dependent on the primary key Therefore, 2NF is satisfied.

3NF (Third Normal Form):

    There are no transitive dependencies in any tables of the recipes_db. All columns in any table are directly dependent on the primary key. So, 3NF is satisfied.But my RecipeSteps table can be more logically structured by dropping StepDescription from RecipeSteps and addind to the newly created table named Steps for clarity and maintenance. In addition to this i need to add StepNumber to the RecipeSteps table while making (RecipeID,StepNumber) as primary key. To achieve these goals i followed the steps at the below. 

-- Step 1: Create the new Steps table with AUTO_INCREMENT

-- Step 2: Populate the Steps table with data from the existing RecipeSteps table


-- Step 3: Create the new RecipeSteps table


-- Step 4: Populate the new RecipeSteps table with data from the existing RecipeSteps table


-- Step 5: Drop the old RecipeSteps table


-- Step 6: Rename the new RecipeSteps table to the original name

and finally i updated all my files (data.js, recipe_create.js) respectivly for the normalization. 