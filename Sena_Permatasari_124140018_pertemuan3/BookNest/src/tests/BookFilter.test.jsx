import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BookFilter from '../components/BookFilter/BookFilter.jsx';
describe('BookFilter', () => {
  it('mengirim kata pencarian saat input berubah', () => { const onSearch = vi.fn(); render(<BookFilter search="" onSearch={onSearch} status="all" onStatus={vi.fn()} />); fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Andrea' } }); expect(onSearch).toHaveBeenCalledWith('Andrea'); });
  it('mengubah filter status ketika tombol Baca diklik', () => { const onStatus = vi.fn(); render(<BookFilter search="" onSearch={vi.fn()} status="all" onStatus={onStatus} />); fireEvent.click(screen.getByRole('button', { name: /baca/i })); expect(onStatus).toHaveBeenCalledWith('baca'); });
});
