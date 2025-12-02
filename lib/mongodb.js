import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!uri) throw new Error("Please define MONGO_URI in .env.local");

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
