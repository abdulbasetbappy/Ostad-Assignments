const Router = require('express').Router();
const {allBooks, postBookData, SpecificBooks, updateBooks, deleteBooks} = require('../controllers/book.controller');


Router.get("/books", allBooks);
Router.get("/books/:id", SpecificBooks);
Router.post("/books", postBookData);
Router.put("/books/:id", updateBooks);
Router.delete("/books/:id", deleteBooks);



module.exports = Router;