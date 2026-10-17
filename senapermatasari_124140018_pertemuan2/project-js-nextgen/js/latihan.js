// js/latihan.js
// Latihan mandiri, dibagi per materi. Tiap materi tampil di kartu sendiri.

import { sampleUsers, sampleProducts } from './modules/data.js';
import { formatRupiah, capitalize } from './modules/utils.js';

const tunggu = (ms) => new Promise((res) => setTimeout(res, ms));

function latihanDasar(log) {
  const tetap = 10;
  try {
    tetap = 20; // sengaja salah
  } catch (e) {
    log("1. Error const:", e.message);
  }

  {
    var dalamBlok = "var bocor keluar blok";
    let hanyaDiBlok = "let tidak bocor";
  }
  log("2.", dalamBlok, typeof hanyaDiBlok);

  const tambah = (a, b) => a + b;
  const kuadrat = x => x * x;
  const sapa = () => "Halo!";
  const buatUser = (nama, umur) => ({ nama, umur });
  log("3.", tambah(2, 3), kuadrat(4), sapa(), buatUser("Sena", 20));

  const kartuHtml = (judul, isi) => `<div class="kartu"><h3>${judul}</h3><p>${isi}</p></div>`;
  log("4.", kartuHtml("Tugas", "Kerjakan PAW"));
}

function latihanDestructuring(log) {
  const data = { a: { b: { c: "level 3" } } };
  const { a: { b: { c } } } = data;
  log("5.", c);

  const statistik = (...angka) => ({
    min: Math.min(...angka),
    max: Math.max(...angka),
    rata2: angka.reduce((t, n) => t + n, 0) / angka.length
  });
  log("6.", statistik(4, 8, 15, 16, 23, 42));

  const o1 = { nama: "A", umur: 20 };
  const o2 = { kota: "Lampung", umur: 21 };
  const o3 = { hobi: "coding", kota: "Bandar Lampung" };
  log("7.", { ...o1, ...o2, ...o3 });

  const mahasiswa = [
    { nama: "Sena", nim: "124140018" },
    { nama: "Fajar", nim: "124140012" }
  ];
  for (const { nama, nim } of mahasiswa) {
    log("8.", `${nama} - ${nim}`);
  }
}

function latihanClass(log) {
  class Product {
    constructor(nama, harga) {
      this.nama = nama;
      this._harga = harga;
    }
    get harga() { return this._harga; }
    set harga(nilai) {
      if (nilai < 0) throw new Error("Harga tidak boleh negatif");
      this._harga = nilai;
    }
    info() { return `${this.nama}: Rp${this._harga.toLocaleString("id-ID")}`; }
  }
  class DigitalProduct extends Product {
    constructor(nama, harga, ukuranMB) {
      super(nama, harga);
      this.ukuranMB = ukuranMB;
    }
    info() { return `${super.info()} (${this.ukuranMB} MB)`; }
  }
  class PhysicalProduct extends Product {
    constructor(nama, harga, beratKg) {
      super(nama, harga);
      this.beratKg = beratKg;
    }
    info() { return `${super.info()} (${this.beratKg} kg)`; }
  }
  log("9.", new DigitalProduct("E-book JS", 50000, 12).info());
  log("9.", new PhysicalProduct("Keyboard", 850000, 0.9).info());

  const kunci = "matkul";
  const objDinamis = { [`${kunci}_1`]: "PAW", [`${kunci}_2`]: "Basis Data" };
  log("10.", objDinamis);

  const sapaUser = ({ nama = "Tamu", peran = "user" } = {}) => `Halo ${nama} (${peran})`;
  log("11.", sapaUser(), sapaUser({ nama: "Sena" }));
}

function latihanArray(log) {
  const groupBy = (arr, kunciProp) =>
    arr.reduce((acc, item) => {
      (acc[item[kunciProp]] ||= []).push(item);
      return acc;
    }, {});
  const orang = [
    { nama: "A", role: "admin", umur: 20 },
    { nama: "B", role: "user", umur: 24 },
    { nama: "C", role: "admin", umur: 28 }
  ];
  log("12.", groupBy(orang, "role"));

  const rataUmur = orang.reduce((t, { umur }) => t + umur, 0) / orang.length;
  log("13.", rataUmur);

  log("14.", [1, [2, 3], [[4, 5], 6]].flat(Infinity));

  const hasil = orang
    .filter(({ umur }) => umur >= 24)
    .map(({ nama, umur }) => ({ nama, umur }))
    .reduce((t, { umur }) => t + umur, 0);
  log("15.", hasil);

  // Memakai data & utils dari js/modules/
  const perKategori = sampleProducts.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  log("15b. Jumlah produk per kategori:", perKategori);

  const totalTech = sampleProducts
    .filter(({ category }) => category === "tech")
    .reduce((t, { price }) => t + price, 0);
  log("15c. Total harga tech:", formatRupiah(totalTech));

  const userAktif = sampleUsers
    .filter(({ active }) => active)
    .map(({ name, role }) => `${name} (${capitalize(role)})`);
  log("15d. User aktif:", userAktif);
}

function latihanAsync(log) {
  const retry = async (fn, percobaan = 3) => {
    for (let i = 1; i <= percobaan; i++) {
      try {
        return await fn();
      } catch (err) {
        log(`16. Percobaan ${i} gagal: ${err.message}`);
        await tunggu(2 ** i * 100);
      }
    }
    throw new Error("Semua percobaan gagal");
  };

  const ambilBeberapa = async () => {
    try {
      const [quote, todos] = await Promise.all([
        fetch("https://dummyjson.com/quotes/random").then(r => r.json()),
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=3").then(r => r.json())
      ]);
      log("17.", quote.quote, todos.map(t => t.title));
    } catch (err) {
      log("17. Gagal fetch:", err.message);
    }
  };

  let hitung = 0;
  retry(async () => {
    hitung++;
    if (hitung < 3) throw new Error("belum berhasil");
    return "berhasil di percobaan ke-" + hitung;
  }).then(msg => log("16.", msg));

  // ---- Loading state ----
  const denganLoading = async (label, fn) => {
    log(`18. [${label}] memuat...`);
    try {
      const hasil = await fn();
      log(`18. [${label}] selesai`);
      return hasil;
    } catch (err) {
      log(`18. [${label}] gagal: ${err.message}`);
    }
  };

  // ---- Pagination ----
  const ambilHalaman = async (halaman, perHalaman = 2) => {
    await tunggu(300);
    const mulai = (halaman - 1) * perHalaman;
    return sampleUsers.slice(mulai, mulai + perHalaman);
  };

  denganLoading("Pagination", async () => {
    for (let h = 1; h <= 2; h++) {
      const data = await ambilHalaman(h);
      log(`19. Halaman ${h}:`, data.map(({ name }) => name).join(", "));
    }
  });

  // ---- Debounced search ----
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };
  const cari = debounce(async (kata) => {
    await tunggu(100);
    const hasil = sampleUsers.filter(({ name }) =>
      name.toLowerCase().includes(kata.toLowerCase()));
    log(`20. Cari "${kata}":`, hasil.map(({ name }) => name));
  }, 300);
  ["a", "al", "ali"].forEach((k) => cari(k)); // hanya "ali" yang diproses

  ambilBeberapa();
}

// Daftar latihan: tiap item = satu kartu
export const daftarLatihan = [
  { judul: "Latihan 1: Let, Const & Arrow", sub: "Nomor 1 sampai 4", jalankan: latihanDasar },
  { judul: "Latihan 2: Destructuring & Spread/Rest", sub: "Nomor 5 sampai 8", jalankan: latihanDestructuring },
  { judul: "Latihan 3: Classes & Object Literals", sub: "Nomor 9 sampai 11", jalankan: latihanClass },
  { judul: "Latihan 4: Modern Array Methods", sub: "Nomor 12 sampai 15d", jalankan: latihanArray },
  { judul: "Latihan 5: Async", sub: "Nomor 16 sampai 20, muncul belakangan", jalankan: latihanAsync }
];