import mongoose from 'mongoose';
import config from 'src/config/config';
import dotenv from 'dotenv';

dotenv.config();

if (!config.dbUri) {
    throw new Error('MONGO_URI is not defined in the environment');
}

export const dbName = process.env.DB_NAME || 'CollectionDB';
export const mongoUri: string = config.dbUri;

mongoose.set('strictQuery', false);

export const connect = async () => {
    try {
        await mongoose.connect(mongoUri, { 
            dbName,
            serverSelectionTimeoutMS: 5000,
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', connect);