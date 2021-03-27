const env = process.env.NODE_ENV || 'development';

const dbConfig = require("../config/db.config.js")[env];

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./products.model.js")(sequelize, Sequelize);
db.providers = require("./providers.model.js")(sequelize, Sequelize);
db.categories = require("./categories.model.js")(sequelize, Sequelize);


db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});

db.categories.belongsTo(db.categories, {
  foreignKey: "parentId",
  as: "parent",
})

db.providerProducts = require("./provider_products")(sequelize, Sequelize);
db.products.belongsToMany(db.providers, { through: db.providerProducts, as: 'providers' });
db.providers.belongsToMany(db.products, { through: db.providerProducts, as: 'products' });


module.exports = db;
