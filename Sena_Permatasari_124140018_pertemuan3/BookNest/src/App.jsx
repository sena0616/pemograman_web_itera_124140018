import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import BookForm from './components/BookForm/BookForm.jsx';
import Home from './pages/Home/Home.jsx';
import MyBooks from './pages/MyBooks/MyBooks.jsx';
import Stats from './pages/Stats/Stats.jsx';
import { useBooks } from './context/BookContext.jsx';
export default function App() {
  const { addBook, editBook, deleteBook } = useBooks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const location = useLocation();
  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (book) => { setEditing(book); setModalOpen(true); };
  const close = () => { setModalOpen(false); setEditing(null); };
  const save = (data) => { if (editing) { editBook(editing.id, data); setToast('Buku berhasil diperbarui! ✨'); } else { addBook(data); setToast('Buku berhasil ditambahkan! ♡'); } close(); };
  const remove = (book) => { if (window.confirm(`Hapus buku "${book.title}" dari koleksi?`)) { deleteBook(book.id); setToast('Buku berhasil dihapus.'); } };
  return <div className="app-shell"><Sidebar /><main className="main-content"><header className="topbar"><span className="topbar-breadcrumb">booknest / <strong>{location.pathname === '/' ? 'home' : location.pathname === '/books' ? 'my books' : 'stats'}</strong></span><span className="topbar-right">✿ your cozy book corner</span></header><Routes><Route path="/" element={<Home onAdd={openAdd} onEdit={openEdit} onDelete={remove} />} /><Route path="/books" element={<MyBooks onAdd={openAdd} onEdit={openEdit} onDelete={remove} />} /><Route path="/stats" element={<Stats />} /><Route path="*" element={<Home onAdd={openAdd} onEdit={openEdit} onDelete={remove} />} /></Routes><footer className="main-footer">BookNest © 2026 · a home for your books ♡</footer></main>{modalOpen && <BookForm initialBook={editing} onSave={save} onClose={close} />}{toast && <div className="toast" role="status">{toast}<button aria-label="Tutup notifikasi" onClick={() => setToast('')}>×</button></div>}</div>;
}
