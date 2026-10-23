import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext.jsx';
import BookFilter from '../../components/BookFilter/BookFilter.jsx';
import BookList from '../../components/BookList/BookList.jsx';
export default function MyBooks({ onAdd, onEdit, onDelete }) {
  const { books } = useBooks();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const filtered = useMemo(() => books.filter((book) => (status === 'all' || book.status === status) && `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase().trim())), [books, search, status]);
  return <div className="page"><div className="page-header"><div><div className="eyebrow">✦ YOUR COLLECTION</div><h1>My Books <span>✿</span></h1><p>Semua cerita favoritmu ada di sini.</p></div><button className="button primary" onClick={onAdd}>＋ Tambah Buku</button></div>
    <BookFilter search={search} onSearch={setSearch} status={status} onStatus={setStatus} />
    <div className="results-label">Menampilkan <strong>{filtered.length}</strong> dari {books.length} buku</div>
    <BookList books={filtered} onEdit={onEdit} onDelete={onDelete} emptyMessage={books.length ? 'Coba kata kunci atau filter lainnya, ya!' : 'Klik Tambah Buku untuk mulai mengisi rakmu.'} />
  </div>;
}
MyBooks.propTypes = { onAdd: PropTypes.func.isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired };
