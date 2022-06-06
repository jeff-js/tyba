import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(`${process.env.DB_PORT || 5432}`),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrationsRun: process.env.NODE_ENV === 'production',
  synchronize: false,
  logging: ['error'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
});
