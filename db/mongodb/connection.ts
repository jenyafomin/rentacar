import mongoose from 'mongoose';

// const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017`
const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@localhost:27017/${process.env.MONGO_DB}`
// console.log(MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
globalThis as any;

let cached = (globalThis as any).mongoose;

if (!cached) {
  // @ts-ignore
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  // cached.conn.
  return cached.conn;
}

dbConnect().then().catch(err => console.log("Failed connect to DB", err))

export {
  
}

export default dbConnect;
