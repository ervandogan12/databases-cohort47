const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URL;

const dbName = "recipes_db";

const categories = [
  {
    id: "new-id-001",
    cat_name: "Cake",
  },
  {
    id: "new-id-002",
    cat_name: "No-Bake",
  },
  {
    id: "new-id-003",
    cat_name: "Vegetarian",
  },
  {
    id: "new-id-004",
    cat_name: "Vegan",
  },
  {
    id: "new-id-005",
    cat_name: "Gluten-Free",
  },
  {
    id: "new-id-006",
    cat_name: "Japanese",
  },
];

const ingredients = [
  {
    id: "new-id-007",
    ing_name: "Condensed milk",
  },
  {
    id: "new-id-008",
    ing_name: "Cream Cheese",
  },
  {
    id: "new-id-009",
    ing_name: "Lemon Juice",
  },
  {
    id: "new-id-010",
    ing_name: "Pie Crust",
  },
  {
    id: "new-id-011",
    ing_name: "Cherry Jam",
  },
  {
    id: "new-id-012",
    ing_name: "Brussels Sprouts",
  },
  {
    id: "new-id-013",
    ing_name: "Lemon juice",
  },
  {
    id: "new-id-014",
    ing_name: "Sesame seeds",
  },
  {
    id: "new-id-015",
    ing_name: "Pepper",
  },
  {
    id: "new-id-016",
    ing_name: "Salt",
  },
  {
    id: "new-id-017",
    ing_name: "Olive oil",
  },
  {
    id: "new-id-018",
    ing_name: "Macaroni",
  },
  {
    id: "new-id-019",
    ing_name: "Butter",
  },
  {
    id: "new-id-020",
    ing_name: "Flour",
  },
  {
    id: "new-id-021",
    ing_name: "Milk",
  },
  {
    id: "new-id-022",
    ing_name: "Shredded Cheddar cheese",
  },
  {
    id: "new-id-023",
    ing_name: "Eggs",
  },
  {
    id: "new-id-024",
    ing_name: "Soy sauce",
  },
  {
    id: "new-id-025",
    ing_name: "Sugar",
  },
];

const steps = [
  {
    id: "new-id-026",
    description: "Beat Cream Cheese",
  },
  {
    id: "new-id-027",
    description: "Add condensed Milk and blend",
  },
  {
    id: "new-id-028",
    description: "Add Lemon Juice and blend",
  },
  {
    id: "new-id-029",
    description: "Add the mix to the pie crust",
  },
  {
    id: "new-id-030",
    description: "Spread the Cherry Jam",
  },
  {
    id: "new-id-031",
    description: "Place in refrigerator for 3h.",
  },
  {
    id: "new-id-032",
    description: "Preheat the oven",
  },
  {
    id: "new-id-033",
    description: "Mix the ingredients in a bowl",
  },
  {
    id: "new-id-034",
    description: "Spread the mix on baking sheet",
  },
  {
    id: "new-id-035",
    description: "Bake for 30'",
  },
  {
    id: "new-id-036",
    description: "Cook Macaroni for 8'",
  },
  {
    id: "new-id-037",
    description: "Melt butter in a saucepan",
  },
  {
    id: "new-id-038",
    description: "Add flour, salt, pepper and mix",
  },
  {
    id: "new-id-039",
    description: "Add Milk and mix",
  },
  {
    id: "new-id-040",
    description: "Cook until mix is smooth",
  },
  {
    id: "new-id-041",
    description: "Add cheddar cheese",
  },
  {
    id: "new-id-042",
    description: "Add the macaroni",
  },
  {
    id: "new-id-043",
    description: "Beat the eggs",
  },
  {
    id: "new-id-044",
    description: "Add soya sauce, sugar and salt",
  },
  {
    id: "new-id-045",
    description: "Add oil to a sauce pan",
  },
  {
    id: "new-id-046",
    description: "Bring to medium heat",
  },
  {
    id: "new-id-047",
    description: "Add some mix to the sauce pan",
  },
  {
    id: "new-id-048",
    description: "Let is cook for 1'",
  },
  {
    id: "new-id-049",
    description: "Remove pan from fire",
  },
];

const recipes = [
  {
    recipe_name: "Roasted Brussels Sprouts",
    categories: ["new-id-003"],
    ingredients: ["new-id-012", "new-id-013", "new-id-014", "new-id-015"],
    steps: ["new-id-032", "new-id-033", "new-id-034", "new-id-035"],
  },
  {
    recipe_name: "Mac & Cheese",
    categories: ["new-id-003"],
    ingredients: [
      "new-id-015",
      "new-id-016",
      "new-id-017",
      "new-id-018",
      "new-id-019",
      "new-id-020",
      "new-id-021",
      "new-id-022",
    ],
    steps: [
      "new-id-036",
      "new-id-037",
      "new-id-038",
      "new-id-039",
      "new-id-040",
      "new-id-041",
      "new-id-042",
    ],
  },
  {
    recipe_name: "Tamagoyaki Japanese Omelette",
    categories: ["new-id-006"],
    ingredients: [
      "new-id-023",
      "new-id-024",
      "new-id-025",
      "new-id-032",
      "new-id-033",
      "new-id-034",
      "new-id-035",
      "new-id-036",
    ],
    steps: [
      "new-id-043",
      "new-id-044",
      "new-id-045",
      "new-id-046",
      "new-id-047",
      "new-id-048",
      "new-id-049",
    ],
  },
];

async function createRecipesDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    await Promise.all([
      dropCollectionIfExists(db, "categories"),
      dropCollectionIfExists(db, "ingredients"),
      dropCollectionIfExists(db, "steps"),
      dropCollectionIfExists(db, "recipes"),
    ]);

    console.log("Existing collections dropped");

    await Promise.all([
      createCollectionAndInsertData(db, "categories", categories),
      createCollectionAndInsertData(db, "ingredients", ingredients),
      createCollectionAndInsertData(db, "steps", steps),
      createCollectionAndInsertData(db, "recipes", recipes),
    ]);

    console.log("Data insertion complete");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

async function dropCollectionIfExists(db, collectionName) {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();
  if (collections.length > 0) {
    await db.collection(collectionName).drop();
    console.log(`Dropped collection: ${collectionName}`);
  }
}
async function createCollectionAndInsertData(db, collectionName, data) {
  const collection = db.collection(collectionName);
  await collection.insertMany(data);
  console.log(
    `Inserted ${data.length} documents into collection: ${collectionName}`
  );
}

createRecipesDatabase();
