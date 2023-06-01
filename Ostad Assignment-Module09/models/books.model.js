const mongoose = require("mongoose");
const {app , express} = require('../app');



//Connected to MongoDB
const ConnectedDB = async() => {
    try {
         await mongoose.connect('mongodb://127.0.0.1:27017/books')
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Failed");
        console.log(error);
        process.exit(1);
    }
};
module.exports = ConnectedDB;