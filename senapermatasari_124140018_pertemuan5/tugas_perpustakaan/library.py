from datetime import date

from library_item import LibraryItem, format_rupiah
from member import Member


class Library:
    """Mengelola koleksi item dan anggota perpustakaan."""

    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = {}
        self.__anggota = {}

    @property
    def jumlah_koleksi(self):
        """Jumlah seluruh item."""
        return len(self.__koleksi)

    @property
    def jumlah_tersedia(self):
        """Jumlah item yang tidak sedang dipinjam."""
        return sum(1 for i in self.__koleksi.values() if i.tersedia)

    def tambah_item(self, item):
        """Menambah item, menolak ID ganda dan objek bukan LibraryItem."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Hanya LibraryItem yang dapat ditambahkan")
        if item.item_id in self.__koleksi:
            raise ValueError(f"ID {item.item_id} sudah terdaftar")
        self.__koleksi[item.item_id] = item

    def daftarkan_anggota(self, anggota):
        """Mendaftarkan anggota baru."""
        if not isinstance(anggota, Member):
            raise TypeError("Hanya Member yang dapat didaftarkan")
        if anggota.member_id in self.__anggota:
            raise ValueError(f"ID anggota {anggota.member_id} sudah terdaftar")
        self.__anggota[anggota.member_id] = anggota

    def daftar_anggota(self):
        """Daftar seluruh anggota."""
        return list(self.__anggota.values())

    def cari_berdasarkan_id(self, item_id):
        """Mencari satu item lewat ID, None jika tidak ada."""
        return self.__koleksi.get(item_id.strip().upper())

    def cari_item(self, kata_kunci):
        """Mencari lewat ID atau potongan judul tanpa membedakan huruf besar/kecil."""
        kunci = kata_kunci.strip().lower()
        if not kunci:
            return []
        return [i for i in self.__koleksi.values()
                if kunci == i.item_id.lower() or kunci in i.judul.lower()]

    def tampilkan_katalog(self, hanya_tersedia=False):
        """Mencetak katalog; detail diambil lewat get_detail() tiap jenis item."""
        daftar = [i for i in self.__koleksi.values() if i.tersedia or not hanya_tersedia]
        label = "ITEM TERSEDIA" if hanya_tersedia else "SELURUH KATALOG"
        print(f"\n  {label} ({len(daftar)} item)")
        for no, item in enumerate(daftar, start=1):
            print(f"  {no}. {item}")
            print(f"     {item.get_detail()}")

    def _ambil(self, item_id, anggota_id):
        item = self.cari_berdasarkan_id(item_id)
        anggota = self.__anggota.get(anggota_id.strip().upper())
        if item is None:
            raise ValueError(f"Item {item_id} tidak ditemukan")
        if anggota is None:
            raise ValueError(f"Anggota {anggota_id} tidak ditemukan")
        return item, anggota

    def pinjam_item(self, item_id, anggota_id, tanggal=None):
        """Memproses peminjaman item oleh anggota."""
        tanggal = tanggal or date.today()
        item, anggota = self._ambil(item_id, anggota_id)
        if not item.tersedia:
            raise ValueError(f"'{item.judul}' sedang dipinjam")
        anggota.catat_pinjam(item.item_id, tanggal)
        item.tandai_dipinjam()
        batas = tanggal.toordinal() + item.masa_pinjam
        print(f"  {anggota.nama} meminjam '{item.judul}' | "
              f"batas kembali {date.fromordinal(batas):%d-%m-%Y}")

    def kembalikan_item(self, item_id, anggota_id, tanggal=None):
        """Memproses pengembalian dan mengembalikan total denda."""
        tanggal = tanggal or date.today()
        item, anggota = self._ambil(item_id, anggota_id)
        if item_id.strip().upper() not in anggota.sedang_dipinjam:
            raise ValueError(f"{anggota.nama} tidak meminjam '{item.judul}'")
        tgl_pinjam = anggota.sedang_dipinjam[item.item_id]
        terlambat = (tanggal - tgl_pinjam).days - item.masa_pinjam
        denda = item.hitung_denda(terlambat)
        anggota.catat_kembali(item.item_id, denda)
        item.tandai_kembali()
        info = f"terlambat {terlambat} hari, denda {format_rupiah(denda)}" if denda else "tepat waktu"
        print(f"  {anggota.nama} mengembalikan '{item.judul}' | {info}")
        return denda