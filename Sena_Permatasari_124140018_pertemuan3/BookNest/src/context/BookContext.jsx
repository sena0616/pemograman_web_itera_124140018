import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage.js';
import useBookStats from '../hooks/useBookStats.js';

const BookContext = createContext(null);
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('booknest_books_v1', []);
  const stats = useBookStats(books);
  const addBook = (book) => setBooks((prev) => [{ ...book, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...prev]);
  const editBook = (id, changes) => setBooks((prev) => prev.map((book) => book.id === id ? { ...book, ...changes } : book));
  const deleteBook = (id) => setBooks((prev) => prev.filter((book) => book.id !== id));
  return <BookContext.Provider value={{ books, stats, addBook, editBook, deleteBook }}>{children}</BookContext.Provider>;
}
BookProvider.propTypes = { children: PropTypes.node.isRequired };
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks harus digunakan di dalam BookProvider');
  return context;
}
