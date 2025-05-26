// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // Optional: Dark Mode toggle

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${styles.appWrapper} ${darkMode ? styles.dark : ''}`}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>📚 BookHub</div>
        <div className={styles.navLinks}>
          <Link className={styles.navLink} to="/">Home</Link>
          <Link className={styles.navLink} to="/login">Login</Link>
          <button onClick={toggleDarkMode} className={styles.toggleButton}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
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
