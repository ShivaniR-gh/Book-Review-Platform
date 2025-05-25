const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET /api/reviews?bookId=xxx
router.get('/', async (req, res) => {
  const reviews = await Review.find({ bookId: req.query.bookId });
  res.json(reviews);
});

// POST /api/reviews
router.post('/', async (req, res) => {
  const { bookId, userName, rating, comment } = req.body;
  const review = new Review({ bookId, userName, rating, comment });
  await review.save();
  res.status(201).json(review);
});

module.exports = router;
