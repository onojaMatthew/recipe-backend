import mongoose from 'mongoose';
import { ENV } from './env.js';


export const db = async () => {
  try {
    await mongoose.connect(ENV.DATABASE_URL);
    console.log(`Successfully Connected to MongoDB`);
  } catch (error) {
    console.log(`Failed to connect to database: ${error.message}`);
  }
  
}