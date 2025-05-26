import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const BookList = ({ books }) => {
  return (
    <div className={styles.bookList}>
      {books.map(book => (
        <div className={styles.bookCard} key={book._id}>
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className={styles.coverImage}
          />
          <Link to={`/book/${book._id}`} className={styles.bookTitle}>
            {book.title}
          </Link>
          <p className={styles.author}>by {book.author}</p>
          <p className={styles.genre}>Genre: {book.genre}</p>
          <p className={styles.description}>{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
