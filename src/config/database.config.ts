import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  schema: process.env.DATABASE_SCHEMA || 'public',
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT || 5432),
  migrationsTableName: 'migration',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
  migrations: [__dirname + '/../migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  logging: ['error'],
};

export = typeOrmConfig;
