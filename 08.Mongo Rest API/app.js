const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./Routers/user.route');
app.use(cors());
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(userRouter);






app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


//Route Not Found
app.get((req, res, next) => {
    res.status(404).json({
        message: "404 !! Content not found"
    });
});
//Server Error
app.get((error, req, res, next) => {
    res.status(500).json({
        message: " Something went wrong"
    });
});






module.exports = app;