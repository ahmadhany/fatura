module.exports = app => {
    const products = require("../controllers/porducts.controller.js");
    const paginate = require("../middleware/pagination.js");
    const db = require("../models");

    var router = require("express").Router();
    
    router.get("/", paginate(db.products, {}), products.findAll);
    
    router.put("/:id", products.update);
  
    app.use("/api/products", router);
  };
  