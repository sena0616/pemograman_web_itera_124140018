import './BookForm.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const empty = { title: '', author: '', status: 'milik', cover: '' };
export default function BookForm({ initialBook = null, onSave, onClose }) {
  const [form, setForm] = useState(() => initialBook ? { title: initialBook.title, author: initialBook.author, status: initialBook.status, cover: initialBook.cover || '' } : empty);
  const [errors, setErrors] = useState({});
  useEffect(() => { setForm(initialBook ? { title: initialBook.title, author: initialBook.author, status: initialBook.status, cover: initialBook.cover || '' } : empty); setErrors({}); }, [initialBook]);
  const change = (event) => { const { name, value } = event.target; setForm((prev) => ({ ...prev, [name]: value })); setErrors((prev) => ({ ...prev, [name]: '' })); };
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.title.trim()) next.title = 'Judul buku wajib diisi.';
    if (!form.author.trim()) next.author = 'Nama penulis wajib diisi.';
    if (!['milik', 'baca', 'beli'].includes(form.status)) next.status = 'Pilih status yang valid.';
    if (Object.keys(next).length) { setErrors(next); return; }
    onSave({ title: form.title.trim(), author: form.author.trim(), status: form.status, cover: form.cover.trim() });
  };
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-heading">
      <button type="button" className="modal-close" aria-label="Tutup form" onClick={onClose}>×</button>
      <div className="modal-sticker">✿ BOOK NOTE</div>
      <h2 id="form-heading">{initialBook ? 'Edit your book ✎' : 'Tambah Buku Baru ♡'}</h2>
      <p className="muted">Yuk, lengkapi detail bukumu!</p>
      <form onSubmit={submit} noValidate>
        <label htmlFor="book-title">Judul Buku <span>*</span></label><input id="book-title" name="title" value={form.title} onChange={change} placeholder="Contoh: The Midnight Library" aria-invalid={Boolean(errors.title)} />{errors.title && <p className="field-error" role="alert">{errors.title}</p>}
        <label htmlFor="book-author">Penulis <span>*</span></label><input id="book-author" name="author" value={form.author} onChange={change} placeholder="Contoh: Matt Haig" aria-invalid={Boolean(errors.author)} />{errors.author && <p className="field-error" role="alert">{errors.author}</p>}
        <label htmlFor="book-status">Status Buku <span>*</span></label><select id="book-status" name="status" value={form.status} onChange={change}><option value="milik">Milik — sudah punya</option><option value="baca">Baca — sedang dibaca</option><option value="beli">Beli — wishlist</option></select>
        <label htmlFor="book-cover">URL Sampul Buku <span className="optional">(opsional)</span></label><input id="book-cover" name="cover" type="url" value={form.cover} onChange={change} placeholder="https://contoh.com/cover.jpg" /><small className="input-hint">Kosongkan jika tidak punya URL sampul.</small>
        <div className="form-actions"><button type="button" className="button secondary" onClick={onClose}>Batal</button><button type="submit" className="button primary">{initialBook ? 'Simpan Perubahan' : '+ Tambah Buku'}</button></div>
      </form>
    </section>
  </div>;
}
BookForm.propTypes = { initialBook: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired, cover: PropTypes.string }), onSave: PropTypes.func.isRequired, onClose: PropTypes.func.isRequired };

