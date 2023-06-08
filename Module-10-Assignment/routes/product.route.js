const Router = require('express').Router();
const {allProducts, postProData} = require('../controllers/product.controller');
const { authenticate } = require('../middlewares/jwtauth');

Router.get("/products",authenticate, allProducts);
Router.post("/products",authenticate, postProData);



module.exports = Router;