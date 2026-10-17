"use strict";

const STORAGE_KEY = "miniPOS_124140018";
const MIN_DISKON = 50000;
const PERSEN_DISKON = 0.1;
const MIN_NAMA = 3;
const MIN_HARGA = 500;

let cart = loadCart();

const $ = (id) => document.getElementById(id);
const form = $("form-barang");
const inputs = { nama: $("nama"), harga: $("harga"), qty: $("qty") };
const bayarInput = $("bayar");
const rupiahFormat = new Intl.NumberFormat("id-ID");

/* ---------- Utilitas ---------- */

function formatRupiah(angka) {
  return "Rp" + rupiahFormat.format(angka);
}

function parseAngka(teks) {
  const bersih = String(teks).trim();
  return bersih === "" ? NaN : Number(bersih);
}

function buatElemen(tag, teks, atribut = {}) {
  const el = document.createElement(tag);
  if (teks !== undefined) el.textContent = teks;
  Object.entries(atribut).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function tampilkanStatus(pesan) {
  $("status").textContent = pesan;
}

/* ---------- LocalStorage ---------- */

function itemValid(item) {
  return item && typeof item.nama === "string" && item.nama.trim() !== "" &&
    Number.isFinite(item.harga) && item.harga > 0 &&
    Number.isInteger(item.qty) && item.qty > 0;
}

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data.filter(itemValid) : [];
  } catch (error) {
    console.warn("Data keranjang rusak, keranjang dikosongkan.", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Gagal menyimpan keranjang.", error);
    tampilkanStatus("Keranjang tidak dapat disimpan di browser ini.");
  }
}

/* ---------- Validasi ---------- */

function setError(field, pesan) {
  $("error-" + field).textContent = pesan;
  inputs[field].classList.toggle("invalid", pesan !== "");
}

function validasiForm() {
  const nama = inputs.nama.value.trim();
  const harga = parseAngka(inputs.harga.value);
  const qty = parseAngka(inputs.qty.value);
  const pesan = { nama: "", harga: "", qty: "" };

  if (nama === "") pesan.nama = "Nama barang wajib diisi.";
  else if (nama.length < MIN_NAMA) pesan.nama = `Nama barang minimal ${MIN_NAMA} karakter.`;

  if (Number.isNaN(harga)) pesan.harga = "Harga satuan wajib diisi dengan angka.";
  else if (harga < MIN_HARGA) pesan.harga = `Harga satuan minimal ${formatRupiah(MIN_HARGA)}.`;

  if (Number.isNaN(qty)) pesan.qty = "Jumlah wajib diisi dengan angka.";
  else if (!Number.isInteger(qty) || qty < 1) pesan.qty = "Jumlah harus bilangan bulat minimal 1.";

  Object.keys(pesan).forEach((field) => setError(field, pesan[field]));
  const valid = Object.values(pesan).every((p) => p === "");
  return { valid, nama, harga, qty };
}

/* ---------- Perhitungan ---------- */

function hitungRingkasan() {
  const subtotal = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
  const diskon = subtotal >= MIN_DISKON ? subtotal * PERSEN_DISKON : 0;
  return { subtotal, diskon, total: subtotal - diskon };
}

/* ---------- Tampilan ---------- */

function renderKeranjang() {
  const tbody = $("isi-keranjang");
  tbody.replaceChildren();

  cart.forEach((item, index) => {
    const tr = document.createElement("tr");
    const kolom = [
      ["No", index + 1],
      ["Nama barang", item.nama],
      ["Harga satuan", formatRupiah(item.harga)],
      ["Jumlah", item.qty],
      ["Subtotal", formatRupiah(item.harga * item.qty)],
    ];
    kolom.forEach(([label, isi]) => {
      tr.appendChild(buatElemen("td", String(isi), { "data-label": label }));
    });

    const tdAksi = buatElemen("td", undefined, { "data-label": "Aksi" });
    const tombol = buatElemen("button", "Hapus", { type: "button", class: "btn btn-hapus" });
    tombol.setAttribute("aria-label", "Hapus " + item.nama);
    tombol.addEventListener("click", () => hapusBarang(index));
    tdAksi.appendChild(tombol);
    tr.appendChild(tdAksi);
    tbody.appendChild(tr);
  });

  $("keranjang-kosong").hidden = cart.length > 0;
  $("tabel-keranjang").hidden = cart.length === 0;
}

function renderPembayaran() {
  const { total } = hitungRingkasan();
  const pesan = $("pesan-bayar");
  const kembalian = $("kembalian");
  const setPesan = (teks, kelas) => {
    pesan.textContent = teks;
    pesan.className = "payment-message " + kelas;
    kembalian.textContent = "-";
  };

  bayarInput.disabled = cart.length === 0;

  if (cart.length === 0) return setPesan("Tambahkan barang terlebih dahulu sebelum membayar.", "");

  const bayar = parseAngka(bayarInput.value);
  if (bayarInput.value.trim() === "") return setPesan("Masukkan uang bayar untuk menghitung kembalian.", "");
  if (Number.isNaN(bayar) || bayar < 0) return setPesan("Uang bayar tidak valid.", "error-text");
  if (bayar < total) {
    return setPesan(`Uang pembayaran tidak mencukupi, kurang ${formatRupiah(total - bayar)}.`, "error-text");
  }

  pesan.textContent = "Uang pembayaran mencukupi.";
  pesan.className = "payment-message ok-text";
  kembalian.textContent = formatRupiah(bayar - total);
}

function renderRingkasan() {
  const { subtotal, diskon, total } = hitungRingkasan();
  $("subtotal").textContent = formatRupiah(subtotal);
  $("diskon").textContent = formatRupiah(diskon);
  $("total").textContent = formatRupiah(total);
  renderPembayaran();
}

function render() {
  renderKeranjang();
  renderRingkasan();
}

/* ---------- Aksi ---------- */

function tambahBarang(event) {
  event.preventDefault();
  const { valid, nama, harga, qty } = validasiForm();
  if (!valid) return;

  cart.push({ nama, harga, qty });
  saveCart();
  render();
  form.reset();
  inputs.nama.focus();
  tampilkanStatus(`${nama} ditambahkan ke keranjang.`);
}

function hapusBarang(index) {
  const [dihapus] = cart.splice(index, 1);
  saveCart();
  render();
  tampilkanStatus(`${dihapus.nama} dihapus dari keranjang.`);
}

function resetTransaksi() {
  if (!window.confirm("Reset transaksi? Seluruh barang di keranjang akan dihapus.")) return;
  cart = [];
  saveCart();
  form.reset();
  Object.keys(inputs).forEach((field) => setError(field, ""));
  bayarInput.value = "";
  render();
  tampilkanStatus("Transaksi telah direset.");
}

/* ---------- Event listener ---------- */

form.addEventListener("submit", tambahBarang);
bayarInput.addEventListener("input", renderPembayaran);
$("btn-reset").addEventListener("click", resetTransaksi);

render();