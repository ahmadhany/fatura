module.exports = (sequelize, Sequelize) => {
  const Provider_Products = sequelize.define("provider_products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
      type: Sequelize.DOUBLE
    },
    available: {
      type: Sequelize.BOOLEAN
    }
  }, {
    indexes: [{
      name: 'price_index',
      fields: ['price'], // order is ASC by default
    }]
  });
  return Provider_Products;
};