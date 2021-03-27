module.exports = app => {
    const products = require("../controllers/porducts.controller.js");
  
    var router = require("express").Router();
      
    router.get("/:categoryId/products", products.findByCategory);

  
    app.use("/api/categories", router);
  };
  