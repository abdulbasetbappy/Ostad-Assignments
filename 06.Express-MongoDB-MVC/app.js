const express = require('express');
const app = express();
const dataRouter = require('./Routes/data.routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//home Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/', dataRouter);
module.exports = app;