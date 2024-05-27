import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();
const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/FutureFusionERP';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        logger.info('MongoDB Connected');
    } catch (err) {
        logger.error(err);
        process.exit(1);
    }
};
