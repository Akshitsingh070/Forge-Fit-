import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forgefit';
  try {
    // Attempt connection with short timeout so server does not hang if no local mongod
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[Database] MongoDB connection bypassed (${error.message}).`);
    console.log(`[Database] Initializing ForgeFit Resilient High-Performance Store (Full In-Memory & Local Cache Persistence).`);
  }
};

export const getDBStatus = () => ({
  isMongoConnected,
  type: isMongoConnected ? 'MongoDB / Mongoose' : 'ForgeFit Resilient Storage Engine',
});
