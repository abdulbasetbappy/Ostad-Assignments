const products = require('../models/books.models')
//For Product Routed
const getData = async (req,res)=>{
    try {
        const newProduct = new product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        const productFinalData = await newProduct.save();
    
        res.status(201).send(productFinalData);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
};
//For Home Route
const homeData = (req, res) => {
    res.sendFile(__dirname + "../views/home.html");
}


module.exports = {getData,homeData};