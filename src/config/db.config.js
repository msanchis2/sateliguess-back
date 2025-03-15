import "dotenv/config";
import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_NAME || "sateliguess",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: 'mysql',
  }
);

export default db;
