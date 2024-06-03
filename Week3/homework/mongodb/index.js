const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(collectionDb) {
  const episodeData = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDUOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };
  const result = await collectionDb.insertOne(episodeData);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(collectionDb) {
  const episode2Season2 = await collectionDb.findOne({ episode: "S02E02" });
  if (!episode2Season2) {
    throw new Error(`Cannot find the episode ${episode2Season2}`);
  }
  console.log(`The title of episode 2 in season 2 is ${episode2Season2.title}`);

  const blackRiverEpisode = await collectionDb.findOne({
    title: "BLACK RIVER",
  });
  if (!blackRiverEpisode) {
    throw new Error(`Cannot find the episode ${blackRiverEpisode}`);
  }
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`
  );

  const cliffEpisodes = await collectionDb
    .find({ elements: "CLIFF" })
    .toArray();
  if (cliffEpisodes.length === 0) {
    throw new Error(`There is no "CLIFF" painting`);
  }
  const cliffEpisodesTitles = cliffEpisodes.map((episode) => episode.title);
  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodesTitles.join(
      ", "
    )}`
  );

  const cliffAndLighthouseEpisodes = await collectionDb
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .toArray();
  if (cliffAndLighthouseEpisodes.length === 0) {
    throw new Error(`There is no "CLIFF and a LIGHTHOUSE" painting`);
  }
  const cliffAndLighthouseEpisodesTitles = cliffAndLighthouseEpisodes.map(
    (episode) => episode.title
  );
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE is ${cliffAndLighthouseEpisodesTitles.join(
      ", "
    )}`
  );
}

async function updateEpisodeExercises(collectionDb) {
  const result = await collectionDb.updateOne(
    { episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`
  );

  const updateResult = await collectionDb.updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } }
  );
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateResult.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(collectionDb) {
  const result = await collectionDb.deleteOne({ episode: "S31E14" });
  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collectionDb = await collectionData(client);
    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(collectionDb);

    // READ
    await findEpisodesExercises(collectionDb);

    // // UPDATE
    await updateEpisodeExercises(collectionDb);

    // // DELETE
    await deleteEpisodeExercise(collectionDb);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

const collectionData = async (client) => {
  const hasCollection = await client
    .db("databaseWeek3")
    .listCollections({ name: "bob_ross_episodes" })
    .hasNext();

  if (hasCollection) {
    const collectionData = await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes");

    return collectionData;
  } else {
    throw Error("The collection `bob_ross_episodes` does not exist!");
  }
};

main();
