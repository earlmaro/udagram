import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';


const c = config.dev;

export const sequelize = new Sequelize({
  database: c.database,
  username: c.username,
  password: c.password,
  host: c.host,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
});

