import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  key: process.env.JWT_KEY || 'secretKey',
  expiresIn: process.env.JWT_EXPIRES_IN || '15m',
};
