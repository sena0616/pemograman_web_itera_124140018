class Buku:
    """Buku dengan harga, diskon, dan jumlah halaman."""

    def __init__(self, judul, penulis, harga_asli, jumlah_halaman):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen):
        if not 0 <= persen <= 100:
            raise ValueError("Diskon harus 0-100%")
        return self.harga_asli * (100 - persen) / 100

    def estimasi_hari_baca(self, halaman_per_hari=20):
        return -(-self.jumlah_halaman // halaman_per_hari)  # bulat ke atas

    def __str__(self):
        return (f"+---------- KARTU BUKU ----------+\n"
                f" Judul   : {self.judul}\n"
                f" Penulis : {self.penulis}\n"
                f" Harga   : Rp {self.harga_asli:,}\n"
                f" Halaman : {self.jumlah_halaman}\n"
                f"+--------------------------------+")

    def __len__(self):
        return self.jumlah_halaman


if __name__ == "__main__":
    b = Buku("Belajar Python", "Andi Wijaya", 120000, 250)
    print(b)
    print("Harga diskon 25%  : Rp", f"{b.hitung_harga_diskon(25):,.0f}")
    print("len(b)            :", len(b))
    print("Estimasi baca     :", b.estimasi_hari_baca(), "hari")