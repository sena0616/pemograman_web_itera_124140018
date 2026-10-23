import { useState } from 'react';
import PropTypes from 'prop-types';
const labels = { milik: '✓ Milik', baca: '◉ Baca', beli: '♡ Beli' };
const tones = ['pink', 'blue', 'yellow', 'mint', 'lavender'];
export default function BookCard({ book, onEdit, onDelete, index = 0 }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasCover = book.cover?.trim() && !imageFailed;
  return <article className="book-card">
    <div className={`book-cover cover-${tones[index % tones.length]}`}>
      {hasCover ? <img src={book.cover} alt={`Sampul ${book.title}`} onError={() => setImageFailed(true)} /> : <div className="cover-placeholder"><span className="placeholder-sparkle">✦</span><span className="placeholder-book">▤</span><small>your next favorite</small></div>}
      <span className={`status-badge status-${book.status}`}>{labels[book.status]}</span>
    </div>
    <div className="book-info"><h3 title={book.title}>{book.title}</h3><p title={book.author}>{book.author}</p></div>
    <div className="book-actions"><button className="small-button edit" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}>✎ Edit</button><button className="small-button delete" onClick={() => onDelete(book)} aria-label={`Hapus ${book.title}`}>♲ Hapus</button></div>
  </article>;
}
BookCard.propTypes = { book: PropTypes.shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired, cover: PropTypes.string }).isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired, index: PropTypes.number };
