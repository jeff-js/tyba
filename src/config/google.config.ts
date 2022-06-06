import * as dotenv from 'dotenv';
dotenv.config();

export const googleConstants = {
  apiKey: process.env.GOOGLE_API_KEY || '',
};
