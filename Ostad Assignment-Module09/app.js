const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bookRouter = require('./Routes/book.route');



//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home Route
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/home.html');
});
app.use("/",bookRouter);

//Invalid Route
app.use((req, res, next) =>{
    res.status(404).json({message: 'Invalid Route!! Route Not Found'});
});
//Server Error
app.use((error, req, res, next) => {
    res.status(500).json({message: 'Internal Server Error !! Something Broke'});
});
module.exports = app;