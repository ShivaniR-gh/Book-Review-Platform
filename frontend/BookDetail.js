import axios from 'axios';

const token = localStorage.getItem('token');

await axios.post(
  `http://localhost:5000/api/books/${bookId}/reviews`,
  {
    rating,
    comment,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
