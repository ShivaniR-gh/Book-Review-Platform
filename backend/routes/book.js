const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // ✅ Use model here

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new book
router.post('/', async (req, res) => {
  const { title, author, genre, description, coverImage } = req.body;
  const newBook = new Book({ title, author, genre, description, coverImage });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

