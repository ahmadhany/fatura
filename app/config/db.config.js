module.exports = {
  development: {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "P@ssw0rd",
    DB: "faturadb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};