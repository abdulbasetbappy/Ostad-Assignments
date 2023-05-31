let books = require("../models/books.model");
const { v4: uuidv4 } = require("uuid");

// get books
const getAllbooks = (req, res) => {
    res.status(200).json({ books });
};

// Create Book
const createBooks = (req, res) => {
    const { title, author } = req.body;
        if (!title || !author) {
          return res.status(400).json({ error: 'Title and author are required fields' });
        }
        const newBooks = {
          id: uuidv4(),
          title,
          author,
          publishedDate: req.body.publishedDate,
        };
    books.push(newBooks);
    res.status(201).json(books);
};

// Update Book
const updatebooks = (req, res) => {
  const bookid = req.params.id;
  const { title, author, publishedDate } = req.body;
  books
    .filter((book) => book.id === bookid)
    .map((selectedbook) => {
      selectedbook.title = title;
      selectedbook.author = author;
      selectedbook.publishedDate = publishedDate;
    });
  res.status(200).json(books);
};

// Delete Book
const deleteBooks = (req, res) => {
  const bookid = req.params.id;
    books = books.filter((book) => book.id!== bookid);
    res.status(200).json({ message: "Book successfully deleted" });
};
  
module.exports = { getAllbooks, createBooks, updatebooks,deleteBooks };