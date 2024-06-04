import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.MONGO_URI === undefined) {
    console.error('MONGO_URI is not defined in the environment');
    process.exit(1);
  }

export const dbName = process.env.DB_NAME || 'CollectionDB';
export const mongoUri: string = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

export const connect = async () => {
  try {
    await mongoose.connect(mongoUri, { dbName });
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};