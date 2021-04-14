require('dotenv').config();
const fs = require('fs');
const { MongoClient } = require('mongodb');

// Replace the following with your Atlas connection string
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@happyhaddock.e6r3s.mongodb.net/HappyHaddock?retryWrites=true&w=majority`;
const client = new MongoClient(url);

// The database to use
const dbName = 'development';

function getSeeds() {
  let DATA = [];
  fs.readFileSync('./activitySeeds.csv', 'utf8')
    .split('\n')
    .slice(1)
    .forEach((row) => {
      items = row.split(',');
      DATA.push({
        name: items[0],
        cost: items[1],
        accessibility: items[2],
        size: items[3],
        categories: items.slice(4),
      });
    });
  return DATA;
}

async function run() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection('activities');

    // Construct a document
    let activityArray = getSeeds();

    // Insert a single document, wait for promise so we can read it back
    activityArray.forEach(async (activityDocument) => {
      const promise = await col.insertOne(activityDocument);
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
