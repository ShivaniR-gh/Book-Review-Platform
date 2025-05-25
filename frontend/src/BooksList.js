import React, { useEffect, useState } from 'react';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/books')  // fetch data from backend
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div>
      <h2>Books List</h2>
      {books.length === 0 ? <p>No books found.</p> : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} - Rating: {book.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BooksList;
