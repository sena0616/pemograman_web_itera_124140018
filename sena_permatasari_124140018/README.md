# Mini POS — Aplikasi Kasir Sederhana

Tugas Praktikum Pengembangan Aplikasi Web (PAW) — Pertemuan 1: JavaScript Dasar.

## Identitas

| | |
| --- | --- |
| Nama Lengkap | Sena Permatasari |
| NIM | 124140018 |
| Angkatan | 2024 |
| Kelas Praktikum | RA |

## Deskripsi Aplikasi

Mini POS adalah aplikasi kasir berbasis web untuk studi kasus kantin atau toko kampus. Kasir memasukkan barang ke keranjang, aplikasi menghitung subtotal, diskon, total, dan kembalian secara otomatis, dan isi keranjang tetap tersimpan setelah halaman dimuat ulang. Aplikasi dibuat dengan HTML5, CSS3, dan JavaScript murni tanpa framework, backend, maupun database eksternal.

## Panduan Menjalankan

1. Unduh atau clone repository ini.
2. Buka folder `sena_permatasari_124140018_pertemuan1` di VS Code.
3. Instal ekstensi **Live Server**, klik kanan `index.html`, lalu pilih **Open with Live Server**.
4. Alternatif: buka `index.html` langsung di browser (double-click).

## Daftar Fitur

- [x] Form tambah barang (nama, harga satuan, jumlah)
- [x] Validasi: nama minimal 3 karakter, harga minimal Rp500, jumlah bilangan bulat minimal 1
- [x] Pesan error berwarna merah di bawah input yang salah; barang tidak masuk keranjang jika tidak valid
- [x] Form otomatis di-reset dan fokus kembali ke nama barang setelah berhasil
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Jumlah, Subtotal, Aksi)
- [x] Subtotal per barang = harga satuan × jumlah
- [x] Tombol Hapus per barang dengan perhitungan ulang otomatis
- [x] Ringkasan: subtotal, diskon 10% untuk subtotal minimal Rp50.000, total pembayaran
- [x] Uang bayar, kembalian otomatis, dan pesan jika uang tidak mencukupi
- [x] Penyimpanan keranjang di LocalStorage (kunci `miniPOS_124140018`)
- [x] Penanganan data LocalStorage yang rusak
- [x] Reset Transaksi dengan konfirmasi
- [x] Tampilan responsif (laptop, tablet, ponsel)


## Penjelasan Teknis Singkat

**Validasi input.** Fungsi `validasiForm()` membaca ketiga input, mengubahnya menjadi angka dengan `Number()`, lalu memeriksa aturan satu per satu: nama minimal 3 karakter, harga minimal 500, jumlah bilangan bulat minimal 1. Setiap pelanggaran ditampilkan lewat `setError()` di bawah input terkait. Barang hanya ditambahkan jika semua input valid.

**Perhitungan.** `hitungRingkasan()` menjumlahkan `harga × qty` setiap item memakai `reduce()`. Jika subtotal minimal Rp50.000, diskon dihitung 10% dari subtotal; total = subtotal − diskon. Semua perhitungan memakai tipe angka, dan `formatRupiah()` hanya dipakai saat menampilkan hasil. Kembalian = uang bayar − total, dan hanya ditampilkan jika uang bayar valid dan mencukupi.

**LocalStorage.** Keranjang berupa array objek `{ nama, harga, qty }`. `saveCart()` menyerialisasi array dengan `JSON.stringify()` ke kunci `miniPOS_124140018` setiap kali barang ditambah, dihapus, atau direset. `loadCart()` membaca dengan `JSON.parse()` di dalam `try...catch`, memastikan hasilnya array, dan menyaring item yang tidak valid, sehingga data rusak tidak menghentikan aplikasi.

**Keamanan tampilan.** Nama barang ditampilkan dengan `textContent` melalui DOM API, bukan `innerHTML`.

## Struktur Folder

```text
sena_permatasari_124140018_pertemuan1/
├── index.html
├── style.css
├── script.js
├── README.md
└── modul/
    └── README.md
```