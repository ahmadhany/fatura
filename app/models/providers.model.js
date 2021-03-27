module.exports = (sequelize, Sequelize) => {
    const Provider = sequelize.define("provider", {
      name: {
        type: Sequelize.STRING
      }
    });
    return Provider;
};
