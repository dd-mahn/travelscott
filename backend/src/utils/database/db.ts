import mongoose from 'mongoose';
import config from 'src/config/config';
import dotenv from 'dotenv';
        
dotenv.config();

if (!config.database.uri) {
    throw new Error('MONGO_URI is not defined in the environment');
}

export const dbName = process.env.DB_NAME || 'CollectionDB';

mongoose.set('strictQuery', false);

export const connect = async () => {
    try {
        const uri = process.env.NODE_ENV === 'production' 
            ? config.database.production || config.database.uri
            : process.env.NODE_ENV === 'test'
                ? config.database.test || config.database.uri
                : config.database.development || config.database.uri;

        await mongoose.connect(uri, {
            dbName: config.database.name,
            serverSelectionTimeoutMS: 5000,
            autoIndex: false,
            maxPoolSize: 10,
            socketTimeoutMS: 45000,
            family: 4
        });
        console.log(`Database connected to ${process.env.NODE_ENV} environment`);
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', connect);