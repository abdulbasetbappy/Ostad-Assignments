const mongoose = require ('mongoose');
require('dotenv').config();

//Connected to MongoDB
const ConnectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Failed");
        console.log(error);
        process.exit(1);
    }
};

module.exports = ConnectedDB;