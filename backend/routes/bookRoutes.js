const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// POST /api/books/:id/reviews
router.post('/:id/reviews', auth, async (req, res) => {
  const { rating, comment } = req.body;

  const review = new Review({
    bookId: req.params.id,
    userName: req.user.name,
    rating,
    comment,
  });

  await review.save();

  // Update average rating for the book
  const reviews = await Review.find({ bookId: req.params.id });
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Book.findByIdAndUpdate(req.params.id, { averageRating: avg });

  res.status(201).json({ message: 'Review added successfully' });
});

module.exports = router;
