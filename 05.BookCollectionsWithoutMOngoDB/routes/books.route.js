const router = require('express').Router();
const { getAllbooks, createBooks, updatebooks, deleteBooks } = require('../controllers/books.controller');

router.get("/", getAllbooks);
router.post("/", createBooks);
router.put("/:id", updatebooks);
router.delete("/:id", deleteBooks);

module.exports = router;