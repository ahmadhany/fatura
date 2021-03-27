module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      name: {
        type: Sequelize.STRING
      },
      imageURI: {
        type: Sequelize.STRING
      },
      featured: {
        type: Sequelize.BOOLEAN
      }
    });
    return Product;
};
