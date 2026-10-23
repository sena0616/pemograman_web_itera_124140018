import { useEffect, useState } from 'react';

// Lazy initialization agar data yang sudah disimpan dibaca saat pertama kali render.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.error('Tidak bisa menyimpan buku:', error); }
  }, [key, value]);
  return [value, setValue];
}
