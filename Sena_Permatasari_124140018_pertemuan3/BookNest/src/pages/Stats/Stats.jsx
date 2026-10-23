import './Stats.css';
import { useBooks } from '../../context/BookContext.jsx';
const rows = [{ key: 'milik', name: 'Sudah Milik', color: 'blue', icon: '✓' }, { key: 'baca', name: 'Sedang Baca', color: 'mint', icon: '◉' }, { key: 'beli', name: 'Wishlist / Beli', color: 'pink', icon: '♡' }];
export default function Stats() {
  const { stats } = useBooks();
  return <div className="page"><div className="eyebrow">✦ YOUR READING JOURNEY</div><div className="page-header"><div><h1>Book Stats <span>✳</span></h1><p>Little numbers, big stories!</p></div></div>
    <div className="stats-grid"><div className="stat-card yellow"><span className="stat-icon">▤</span><strong>{stats.total}</strong><span>Total Books</span></div><div className="stat-card blue"><span className="stat-icon">✓</span><strong>{stats.milik}</strong><span>Sudah Milik</span></div><div className="stat-card mint"><span className="stat-icon">◉</span><strong>{stats.baca}</strong><span>Sedang Baca</span></div><div className="stat-card pink"><span className="stat-icon">♡</span><strong>{stats.beli}</strong><span>Wishlist</span></div></div>
    <div className="chart-card"><div className="chart-title"><h2>Your bookshelf breakdown ✿</h2><p>Lihat pembagian koleksi berdasarkan status.</p></div>{rows.map((row) => <div className="chart-row" key={row.key}><div className="chart-meta"><span>{row.icon} {row.name}</span><strong>{stats[row.key]} buku</strong></div><div className="chart-track"><div className={`chart-fill ${row.color}`} style={{ width: `${stats.total ? stats[row.key] / stats.total * 100 : 0}%` }} /></div></div>)}<div className="chart-footnote">{stats.total ? `Yeay! Kamu punya ${stats.total} buku di BookNest ♡` : 'Rakmu masih kosong. Yuk, tambahkan buku pertamamu! ♡'}</div></div>
  </div>;
}

