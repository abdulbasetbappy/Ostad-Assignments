const mongoose = require("mongoose");

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
    },
    rating:{
        type: Number,
        required: true
    }
});

// Create product Model
 const product = mongoose.model('Product', ProductSchema);


 //Products Route
 const forProducts = async (req,res)=>{
    try {
        //const price =   req.query.price;
        //const rating = req.query.rating;
        const products = await product.find(/*{$and:[{price:{$gt: price}}, {rating:{$gt: rating}}]}*/) /*.sort({price: 1})/////// .select({title: 1})*/;
        const poductNumbers = await product.find(/*{$and:[{price:{$gt: price}}, {rating:{$gt: rating}}]}*/).countDocuments();
    if(products  && poductNumbers ){
        res.status(200).send({
            success: true,
            message: "Returns Single Products",
            dataNumber: poductNumbers,
            data: products
        });
    }else{
        res.status(404).send({message : "All Products not found"})
    };        
    } catch (error) {
        res.status(500).send({message : error.message})
    }
};
//Products Specific Route
const SpecificProducts = async (req,res)=>{
    try {
        const id = req.params.id;
        const singleProduct = await product.findOne();
        res.send(singleProduct);
    if(products){
        res.status(200).send({
            success: true,
            message: "Returns Single Products",
            data: singleProduct
        });
    }else{
        success = false;
        res.status(404).send({message : "Product not found"})
    };       
    } catch (error) {
        res.status(500).send({message : error.message})
    }
};
//Product post Route
const onlyProducts = async (req,res)=>{
    try {
        const newProduct = new product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating
        });
        const productFinalData = await newProduct.save();
    
        res.status(201).send(productFinalData);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
    };

//Delete Products
const deletProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const dlelteProduct = await product.findByIdAndDelete({_id: id});
        if(dlelteProduct){
            res.status(200).send({
                success: true,
                message: "deleted Single Products",
                data: dlelteProduct
            });
        }else{
            success = false;
            res.status(404).send({message : "Product not found"})
        };
    } catch (error) {
        res.status(500).send({message :error.message});
    }
};


//update product
const update_Products = async(req, res) => {
    try {
        const id = req.params.id;
        const updatedproduct = await product.updateOne(
            {_id: id}, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                rating: req.body.rating,
                price: req.body.price
            }
        },
        {
            new : true,
        });
        if(updatedproduct){
            res.status(200).send({
                success: true,
                message: "Updated Single Products",
                data: updatedproduct
            });
        }else{
            success = false;
            res.status(404).send({message : "Product not found"})
        };
    } catch (error) {
        res.status(500).send({message :error.message});
    }
};

module.exports = {forProducts, SpecificProducts, onlyProducts, deletProducts, update_Products};