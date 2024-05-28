const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;
const dbName = "assignment_week4Db";


async function getTotalPopulationByYear(countryName) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('countries_population');
        const pipeline = [
            {
                $match: { Country: countryName }
            },
            {
                $group: {
                    _id: '$Year',
                    countPopulation: { $sum: { $add: ['$M', '$F'] } }
                }
            },
            {
                $project: {
                    _id: 1,
                    countPopulation: 1
                }
            },
            {
                $sort: { _id: 1 }
            }
        ];
        const result = await collection.aggregate(pipeline).toArray();
        return result;
    } catch (err) {
        console.error('Error:', err);
        return [];
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

getTotalPopulationByYear('Netherlands').then((result) => {
    console.log(result);
}).catch((err) => {
    console.error('Error:', err);
});

async function getContinentPopulationByYearAndAge(year, ageRange) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('countries_population');
        const continents = ['AFRICA', 'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA'];
        const pipeline = [
            {
                $match: { Year: year, Age: ageRange, Country: { $in: continents } }
            },
            {
                $group: {
                    _id:  '$_id',
                    Country:{ $first: '$Country'},
                    Year: { $first: '$Year' },
                    Age: { $first: '$Age' },
                    M: { $sum: '$M' },
                    F: { $sum: '$F' },
                    TotalPopulation: { $sum: { $add: ['$M', '$F'] } }
                }
            }
        ];
        const result = await collection.aggregate(pipeline).toArray();
        return result;
    } catch (err) {
        console.error('Error:', err);
        return [];
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

getContinentPopulationByYearAndAge(2020, '100+').then((result) => {
    console.log(result);
}).catch((err) => {
    console.error('Error:', err);
});