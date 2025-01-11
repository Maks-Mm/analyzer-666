import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log('MONGODB_URI:', MONGODB_URI);

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');  // Erfolgreiche Verbindung
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);  // Fehler bei der Verbindung
        throw error;  // Fehler weiterwerfen, um den Fehler zu behandeln
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
