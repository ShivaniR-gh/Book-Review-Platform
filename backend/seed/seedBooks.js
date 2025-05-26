const mongoose = require('mongoose');
const Book = require('../models/Book');  // adjust relative path
const booksData = require('./data/booksSeed.json');  // relative path to JSON file

mongoose.connect('mongodb://127.0.0.1:27017/bookreview')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Book.deleteMany({});
    console.log('🗑️ Cleared old books');
    await Book.insertMany(booksData);
    console.log('🌱 Seeded books successfully');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
  

  