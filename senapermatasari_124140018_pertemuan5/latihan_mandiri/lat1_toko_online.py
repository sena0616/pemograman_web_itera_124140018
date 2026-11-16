# Pemodelan entitas toko online: Produk, Keranjang, Pengguna

class Produk:
    def __init__(self, nama, harga, stok):
        self.nama = nama
        self.harga = harga
        self.stok = stok

    def kurangi_stok(self, jumlah):
        if jumlah > self.stok:
            raise ValueError(f"Stok {self.nama} tidak cukup (sisa {self.stok})")
        self.stok -= jumlah

    def info(self):
        return f"{self.nama} - Rp {self.harga:,} (stok {self.stok})"


class Keranjang:
    def __init__(self):
        self.isi = []   # list of (produk, jumlah)

    def tambah(self, produk, jumlah):
        self.isi.append((produk, jumlah))

    def total(self):
        return sum(p.harga * j for p, j in self.isi)

    def kosongkan(self):
        self.isi.clear()


class Pengguna:
    def __init__(self, nama, email):
        self.nama = nama
        self.email = email
        self.keranjang = Keranjang()

    def checkout(self):
        try:
            for p, j in self.keranjang.isi:
                p.kurangi_stok(j)
        except ValueError as e:
            print("Checkout gagal:", e)
            return
        print(f"{self.nama} checkout: Rp {self.keranjang.total():,}")
        self.keranjang.kosongkan()


if __name__ == "__main__":
    hp = Produk("Headphone", 250000, 5)
    mouse = Produk("Mouse", 90000, 1)
    budi = Pengguna("Budi", "budi@mail.com")
    budi.keranjang.tambah(hp, 2)
    budi.keranjang.tambah(mouse, 1)
    budi.checkout()
    print(hp.info())
    print(mouse.info())
    budi.keranjang.tambah(mouse, 1)
    budi.checkout()   # gagal, stok habis