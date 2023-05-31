const Router = require('express').Router();
const {forProducts, SpecificProducts, onlyProducts, deletProducts, update_Products} = require('../Controllers/data.controllers');


Router.get("/products", forProducts);
Router.get("/products/:id", SpecificProducts);
Router.post("/products", onlyProducts);
Router.delete("/products/:id", deletProducts);
Router.put("/products/:id", update_Products);


module.exports = Router;