const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;
console.log(uri);
const client = new MongoClient(uri);
const dbName = "assignment_week4Db";
async function createCountryInfoDb() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    await dropCollectionIfExists(db, "country_info");
    await insertCsvData(db, "population_pyramid_1950-2022.csv");
    console.log("Insertion completed");
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

async function insertCsvData(db, fileName) {
  const collectionName = "countries_population";
  const collection = db.collection(collectionName);
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (row) => {
        data.push({
          Country: row.Country,
          Year: parseInt(row.Year),
          Age: row.Age,
          M: parseInt(row.M),
          F: parseInt(row.F),
        });
      })
      .on("end", async () => {
        try {
          await collection.insertMany(data);
          console.log(
            `Inserted ${data.length} documents into collection: ${collectionName}`
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function main() {
  createCountryInfoDb();
}

main();
