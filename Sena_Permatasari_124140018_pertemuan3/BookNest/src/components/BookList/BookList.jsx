import './BookList.css';
import PropTypes from 'prop-types';
import BookCard from '../BookCard/BookCard.jsx';
export default function BookList({ books, onEdit, onDelete, emptyMessage = 'Belum ada buku di sini.' }) {
  if (!books.length) return <div className="empty-state"><span>📚</span><h3>Oops, masih kosong!</h3><p>{emptyMessage}</p></div>;
  return <div className="books-grid">{books.map((book, index) => <BookCard key={book.id} book={book} index={index} onEdit={onEdit} onDelete={onDelete} />)}</div>;
}
BookList.propTypes = { books: PropTypes.arrayOf(PropTypes.object).isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired, emptyMessage: PropTypes.string };

