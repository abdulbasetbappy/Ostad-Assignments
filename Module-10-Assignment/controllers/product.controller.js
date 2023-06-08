const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    price:{
        type: 'number',
        required: true
    },
    description: {
        type: 'string',
        optional: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

//Create Product Model
const products = mongoose.model('Product', productSchema)

//-----------------------------------------Product Routes--------------------------------------------
const allProducts = async (req, res ) => {
    try {
        const allProducts = await products.find({}, 'name price');
        const allProductsNumber = await products.find().countDocuments();
        if(allProducts  && allProductsNumber ){
            res.status(200).send({
                success: true,
                message: "Returns Single Book",
                dataNumber: allProductsNumber,
                data: allProducts
            });
        }else{
            res.status(404).send({message : "Products not found"})
        }; 
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}


 const postProData = async (req,res)=>{
    try {
        const newPro = new products({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        });
        const finalProData = await newPro.save();
        res.status(201).send(finalProData);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
};

module.exports = {allProducts, postProData};