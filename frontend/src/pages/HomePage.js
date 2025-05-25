// HomePage.js with Navbar, Footer, and Dark Mode
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';


function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={styles.appWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>📚 BookHub</div>
        <div>
          <Link className={styles.navLink} to="/">Home</Link>
          <Link className={styles.navLink} to="/login">Login</Link>
        </div>
      </nav>

      <main className={styles.container}>
        <h1 className={styles.title}>Featured Books</h1>
        {books.length === 0 ? (
          <p className={styles.message}>No books found. Add some books to the database.</p>
        ) : (
          <div className={styles.bookList}>
            {books.map(book => (
              <div className={styles.bookCard} key={book._id}>
                <Link to={`/book/${book._id}`} className={styles.bookTitle}>
                  {book.title}
                </Link>
                <p className={styles.author}>by {book.author}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 BookHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
