const getData = require("../controllers/books.controllers")
const homeData = require("../controllers/books.controllers")
const router = require('express').Router();



//home route
router.get('/', homeData);
//Products Route
router.post("/products", getData);
module.exports = router;