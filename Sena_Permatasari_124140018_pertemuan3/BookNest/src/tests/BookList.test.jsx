import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BookList from '../components/BookList/BookList.jsx';
const books = [{ id: '1', title: 'Bumi', author: 'Tere Liye', status: 'milik', cover: '' }];
describe('BookList', () => {
  it('menampilkan judul dan penulis buku', () => { render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />); expect(screen.getByText('Bumi')).toBeInTheDocument(); expect(screen.getByText('Tere Liye')).toBeInTheDocument(); });
  it('memanggil edit dengan buku yang dipilih', () => { const onEdit = vi.fn(); render(<BookList books={books} onEdit={onEdit} onDelete={vi.fn()} />); fireEvent.click(screen.getByRole('button', { name: 'Edit Bumi' })); expect(onEdit).toHaveBeenCalledWith(books[0]); });
  it('memanggil hapus dengan buku yang dipilih', () => { const onDelete = vi.fn(); render(<BookList books={books} onEdit={vi.fn()} onDelete={onDelete} />); fireEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' })); expect(onDelete).toHaveBeenCalledWith(books[0]); });
  it('menampilkan empty state jika tidak ada buku', () => { render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />); expect(screen.getByText('Oops, masih kosong!')).toBeInTheDocument(); });
});
