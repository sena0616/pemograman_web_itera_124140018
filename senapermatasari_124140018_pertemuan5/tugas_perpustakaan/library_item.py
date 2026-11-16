from abc import ABC, abstractmethod
from datetime import date


def format_rupiah(nominal):
    """Mengubah angka menjadi format Rp dengan pemisah titik."""
    return "Rp " + f"{nominal:,}".replace(",", ".")


class LibraryItem(ABC):
    """Abstract class dasar semua item perpustakaan."""

    TAHUN_MINIMAL = 1400

    def __init__(self, item_id, judul, tahun_terbit):
        self._item_id = item_id
        self.judul = judul
        self.tahun_terbit = tahun_terbit
        self.__tersedia = True

    @property
    def item_id(self):
        """ID item, hanya bisa dibaca."""
        return self._item_id

    @property
    def judul(self):
        """Judul item."""
        return self._judul

    @judul.setter
    def judul(self, nilai):
        if not isinstance(nilai, str) or not nilai.strip():
            raise ValueError("Judul tidak boleh kosong")
        self._judul = nilai.strip()

    @property
    def tahun_terbit(self):
        """Tahun terbit, divalidasi saat diubah."""
        return self._tahun_terbit

    @tahun_terbit.setter
    def tahun_terbit(self, nilai):
        if not isinstance(nilai, int) or not self.TAHUN_MINIMAL <= nilai <= date.today().year:
            raise ValueError(f"Tahun terbit tidak valid: {nilai}")
        self._tahun_terbit = nilai

    @property
    def tersedia(self):
        """Status ketersediaan, hanya bisa dibaca."""
        return self.__tersedia

    def tandai_dipinjam(self):
        """Mengubah status menjadi dipinjam."""
        if not self.__tersedia:
            raise ValueError(f"'{self._judul}' sedang dipinjam")
        self.__tersedia = False

    def tandai_kembali(self):
        """Mengubah status menjadi tersedia."""
        self.__tersedia = True

    @property
    @abstractmethod
    def jenis(self):
        """Nama jenis item."""

    @property
    @abstractmethod
    def masa_pinjam(self):
        """Lama peminjaman maksimal dalam hari."""

    @abstractmethod
    def get_detail(self):
        """Detail lengkap item."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Denda untuk sejumlah hari keterlambatan."""

    def __str__(self):
        status = "Tersedia" if self.__tersedia else "Dipinjam"
        return f"[{self._item_id}] {self.jenis:<7} | {self._judul} ({self._tahun_terbit}) | {status}"


class Book(LibraryItem):
    """Buku dengan denda Rp 1.000 per hari."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, tahun_terbit, penulis, isbn, jumlah_halaman):
        super().__init__(item_id, judul, tahun_terbit)
        self._penulis = penulis
        self.__isbn = isbn
        self.jumlah_halaman = jumlah_halaman

    @property
    def isbn(self):
        """ISBN buku, hanya bisa dibaca."""
        return self.__isbn

    @property
    def jumlah_halaman(self):
        """Jumlah halaman, harus positif."""
        return self._jumlah_halaman

    @jumlah_halaman.setter
    def jumlah_halaman(self, nilai):
        if not isinstance(nilai, int) or nilai <= 0:
            raise ValueError("Jumlah halaman harus bilangan positif")
        self._jumlah_halaman = nilai

    @property
    def jenis(self):
        return "Buku"

    @property
    def masa_pinjam(self):
        return 7

    def get_detail(self):
        return (f"Buku: {self._judul} | Penulis: {self._penulis} | ISBN: {self.__isbn} | "
                f"{self._jumlah_halaman} hlm | Terbit {self._tahun_terbit}")

    def hitung_denda(self, hari_terlambat):
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah dengan denda Rp 2.000 per hari dan masa pinjam lebih singkat."""

    DENDA_PER_HARI = 2000

    def __init__(self, item_id, judul, tahun_terbit, edisi, penerbit):
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    @property
    def jenis(self):
        return "Majalah"

    @property
    def masa_pinjam(self):
        return 3

    def get_detail(self):
        return (f"Majalah: {self._judul} | Edisi: {self._edisi} | "
                f"Penerbit: {self._penerbit} | Terbit {self._tahun_terbit}")

    def hitung_denda(self, hari_terlambat):
        return max(0, hari_terlambat) * self.DENDA_PER_HARI