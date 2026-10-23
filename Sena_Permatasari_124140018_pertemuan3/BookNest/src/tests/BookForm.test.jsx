import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm.jsx';
const setup = (initialBook = null) => { const onSave = vi.fn(); const onClose = vi.fn(); render(<BookForm initialBook={initialBook} onSave={onSave} onClose={onClose} />); return { onSave, onClose }; };
describe('BookForm', () => {
  it('menampilkan validasi ketika judul dan penulis kosong', () => { const { onSave } = setup(); fireEvent.click(screen.getByRole('button', { name: /tambah buku/i })); expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument(); expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument(); expect(onSave).not.toHaveBeenCalled(); });
  it('menyimpan buku dengan data valid', () => { const { onSave } = setup(); fireEvent.change(screen.getByLabelText(/judul buku/i), { target: { value: 'Laut Bercerita' } }); fireEvent.change(screen.getByLabelText(/penulis/i), { target: { value: 'Leila S. Chudori' } }); fireEvent.click(screen.getByRole('button', { name: /tambah buku/i })); expect(onSave).toHaveBeenCalledWith({ title: 'Laut Bercerita', author: 'Leila S. Chudori', status: 'milik', cover: '' }); });
  it('mengisi form edit dengan data buku yang dipilih', () => { setup({ id: '1', title: 'Atomic Habits', author: 'James Clear', status: 'baca', cover: '' }); expect(screen.getByDisplayValue('Atomic Habits')).toBeInTheDocument(); expect(screen.getByDisplayValue('James Clear')).toBeInTheDocument(); expect(screen.getByDisplayValue('Baca — sedang dibaca')).toBeInTheDocument(); });
  it('memanggil onClose ketika tombol batal ditekan', () => { const { onClose } = setup(); fireEvent.click(screen.getByRole('button', { name: 'Batal' })); expect(onClose).toHaveBeenCalledOnce(); });
});
