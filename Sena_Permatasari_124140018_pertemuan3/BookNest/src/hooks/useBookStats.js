import { useMemo } from 'react';

export default function useBookStats(books) {
  return useMemo(() => ({
    total: books.length,
    milik: books.filter((book) => book.status === 'milik').length,
    baca: books.filter((book) => book.status === 'baca').length,
    beli: books.filter((book) => book.status === 'beli').length,
  }), [books]);
}
