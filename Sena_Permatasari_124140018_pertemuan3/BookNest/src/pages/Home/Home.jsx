import './Home.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext.jsx';
import BookList from '../../components/BookList/BookList.jsx';
export default function Home({ onAdd, onEdit, onDelete }) {
  const { books, stats } = useBooks();
  return <div className="page"><div className="eyebrow">✦ YOUR PERSONAL LIBRARY</div>
    <div className="hero"><div className="hero-copy"><span className="hero-tag">✿ HELLO, BOOK LOVER!</span><h1>A little space for<br /><em>all your stories.</em></h1><p>Kelola koleksi buku, susun wishlist, dan temukan cerita favoritmu di satu tempat ♡</p><button className="button hero-button" onClick={onAdd}>＋ Tambah Buku <span>↗</span></button></div><div className="hero-art" aria-hidden="true"><span className="art-star">✳</span><div className="art-book art-book-one">✦</div><div className="art-book art-book-two">♡</div><div className="art-book art-book-three">✿</div><span className="art-label">READ MORE<br/>DREAM MORE!</span></div></div>
    <div className="section-heading"><h2>Your little overview <span>✳</span></h2><p>Semua bukumu, sekilas saja!</p></div>
    <div className="stats-grid"><div className="stat-card yellow"><span className="stat-icon">▤</span><strong>{stats.total}</strong><span>Total Books</span><i>✦</i></div><div className="stat-card blue"><span className="stat-icon">✓</span><strong>{stats.milik}</strong><span>Sudah Milik</span><i>✳</i></div><div className="stat-card mint"><span className="stat-icon">◉</span><strong>{stats.baca}</strong><span>Sedang Baca</span><i>✿</i></div><div className="stat-card pink"><span className="stat-icon">♡</span><strong>{stats.beli}</strong><span>Wishlist</span><i>✧</i></div></div>
    <div className="section-heading section-heading-row"><div><h2>Recently added <span>♡</span></h2><p>Beberapa buku terbaru di rakmu</p></div><Link to="/books" className="view-all">Lihat semua ↗</Link></div>
    <BookList books={books.slice(0, 4)} onEdit={onEdit} onDelete={onDelete} emptyMessage="Mulai koleksimu dengan klik tombol Tambah Buku!" />
  </div>;
}
Home.propTypes = { onAdd: PropTypes.func.isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired };

