import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookPage.css';

function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(res => {
        setBook(res.data);
        setReviews(res.data.reviews || []);
      })
      .catch(console.error);
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/books/${id}/reviews`, newReview);
      setReviews(prev => [...prev, res.data]);
      setNewReview({ userName: '', rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>

      <h2>Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}
      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review._id} className="review-item">
            <strong>{review.userName}</strong> rated it {review.rating} / 5
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>

      <h3>Add a Review</h3>
      <form onSubmit={submitReview} className="review-form">
        <input
          type="text"
          name="userName"
          placeholder="Your name"
          value={newReview.userName}
          onChange={handleChange}
          required
        />
        <select name="rating" value={newReview.rating} onChange={handleChange}>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <textarea
          name="comment"
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default BookPage;
