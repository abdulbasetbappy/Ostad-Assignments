const mongoose = require("mongoose");


// Create product Schema
const booksSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    author:{
        type:'string',
        required: true
    },
    description: {
        type: 'String',
        optional: true
    },
    publishedYear: {
        type:  'string',
        optional: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});
//create Books Model
const books = mongoose.model('Books', booksSchema);



//-----------------------------------------Books Routes--------------------------------------------

//In Books Route Show All Data
const allBooks = async (req, res ) => {
    try {
        const allBooks = await books.find();
        const bookNumbers = await books.find().countDocuments();
        if(allBooks  && bookNumbers ){
            res.status(200).send({
                success: true,
                message: "Returns Single Book",
                dataNumber: bookNumbers,
                data: allBooks
            });
        }else{
            res.status(404).send({message : "All Books not found"})
        }; 
    } catch (error) {
        res.status(500).send({message : error.message})
    }
}
//In Books/:id Route Show Specific Data
const SpecificBooks = async (req,res)=>{
    try {
        const id = req.params.id;
        const singleBook = await books.findOne({ _id: id });
        res.send(singleBook);
    if(books){
        res.status(200).send({
            success: true,
            message: "Returns Single Book",
            data: singleBook
        });
    }else{
        success = false;
        res.status(404).send({message : "Book not found"})
    };       
    } catch (error) {
        res.status(500).send({message : error.message})
    }
};

//In Books Route Post a book Data
const postBookData = async (req,res)=>{
    try {
        const newBook = new books({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            publishedYear: req.body.publishedYear
        });
        const finalBookData = await newBook.save();
        res.status(201).send(finalBookData);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
};
//select a book by id and Update it
const updateBooks = async(req, res) => {
    try {
        const id = req.params.id;
        const updatedBooks = await books.updateOne(
            {_id: id}, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                publishedYear: req.body.publishedYear
            }
        });
        if(updatedBooks){
            res.status(200).send({
                success: true,
                message: "Updated Single Book",
                data: updatedBooks
            });
        }else{
            success = false;
            res.status(404).send({message : "Book not found"})
        };
    } catch (error) {
        res.status(500).send({message :error.message});
    }
};
//delete a book from database
const deleteBooks = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteBook = await books.findByIdAndDelete({_id: id});
        if(deleteBook){
            res.status(200).send({
                success: true,
                message: "deleted Single Book",
                data: deleteBook
            });
        }else{
            success = false;
            res.status(404).send({message : "Book not found"})
        };
    } catch (error) {
        res.status(500).send({message :error.message});
    }
};
module.exports = {allBooks, postBookData, SpecificBooks, updateBooks, deleteBooks};