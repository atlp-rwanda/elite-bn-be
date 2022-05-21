import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
import { dbConnect } from "../config/db.config.js";


const env = process.env.NODE_ENV || "development";
const config = dbConnect[ env ];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}



Object.keys(db).forEach((modelName) => {
  if (db[ modelName ].associate) {
    db[ modelName ].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;