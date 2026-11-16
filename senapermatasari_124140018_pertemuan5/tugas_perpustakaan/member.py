class Member:
    """Anggota perpustakaan beserta daftar pinjamannya."""

    BATAS_PINJAM = 3

    def __init__(self, member_id, nama):
        self._member_id = member_id
        self.nama = nama.title()
        self.__pinjaman = {}
        self.__total_denda = 0

    @property
    def member_id(self):
        """ID anggota, hanya bisa dibaca."""
        return self._member_id

    @property
    def total_denda(self):
        """Akumulasi denda anggota."""
        return self.__total_denda

    @property
    def sedang_dipinjam(self):
        """Salinan dict {id_item: tanggal_pinjam}."""
        return dict(self.__pinjaman)

    def catat_pinjam(self, item_id, tanggal):
        """Mencatat peminjaman baru."""
        if len(self.__pinjaman) >= self.BATAS_PINJAM:
            raise ValueError(f"{self.nama} sudah mencapai batas {self.BATAS_PINJAM} pinjaman")
        self.__pinjaman[item_id] = tanggal

    def catat_kembali(self, item_id, denda):
        """Menghapus pinjaman dan menambah denda, mengembalikan tanggal pinjam."""
        if item_id not in self.__pinjaman:
            raise ValueError(f"{self.nama} tidak meminjam item {item_id}")
        self.__total_denda += denda
        return self.__pinjaman.pop(item_id)

    def __str__(self):
        return (f"{self._member_id} | {self.nama} | pinjaman aktif: {len(self.__pinjaman)} "
                f"| total denda: Rp {self.__total_denda:,}".replace(",", "."))