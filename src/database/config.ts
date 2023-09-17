const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        sslmode: true,
      },
    },
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    autoLoadModels: true,
  },
  test: {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "roku",
    password: "roku",
    database: "test",
  },
  production: {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "roku",
    password: "roku",
    database: "prod",
  },
};

console.log(process.env.MYSQL_HOST);
