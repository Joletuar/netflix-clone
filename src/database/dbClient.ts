import { MongoClient } from 'mongodb';

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.DATABASE_URL || '';
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

declare const global: {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise
  .then(() => {
    console.log('MongoDB connection successful!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export { clientPromise };
