const express = require('express');
const app = express();
const booksRouter = require('./routers/books.routes');


app.use(booksRouter);
// For Invalid Route
app.use((req,res,next)=>{
    res.status(404).send("404! Invalid Route.");
});
// server error
app.use((err, req, res, next) => {
    res.status(500).send("something broke");
});
  module.exports = app;