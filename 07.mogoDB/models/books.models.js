const mongoose = require("mongoose");
const {app , express} = require('../app')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create product Schema
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date
    }
});

// Create product Model
 const product = mongoose.model('Product', ProductSchema);

const ConnectedDB =async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/testProductDB');;
        console.log("MongoDB Connected");
    } catch(error){
        console.log("MongoDB Connection Failed");
        console.log(error);
        process.exit(1);
    }
};
module.exports = product;