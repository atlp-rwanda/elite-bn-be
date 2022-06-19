require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    }
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    logging: false,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    }
  }
}
