class Kendaraan:
    def __init__(self, merek, model, tahun):
        self.merek = merek
        self.model = model
        self.tahun = tahun

    def deskripsi(self):
        return f"{self.merek} {self.model} ({self.tahun})"


class Truk(Kendaraan):
    def __init__(self, merek, model, tahun, kapasitas_maksimal_ton):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0

    @property
    def sisa_kapasitas(self):
        return self.kapasitas_maksimal_ton - self.muatan_saat_ini

    def muat_barang(self, berat_ton):
        if berat_ton <= 0:
            print("Berat harus lebih dari 0!")
        elif berat_ton > self.sisa_kapasitas:
            print(f"Gagal: {berat_ton} ton melebihi sisa kapasitas {self.sisa_kapasitas} ton")
        else:
            self.muatan_saat_ini += berat_ton
            print(f"Memuat {berat_ton} ton. Muatan sekarang {self.muatan_saat_ini} ton")

    def bongkar_semua(self):
        print(f"Membongkar {self.muatan_saat_ini} ton muatan")
        self.muatan_saat_ini = 0

    def deskripsi(self):
        return (f"{super().deskripsi()} [Truk | muatan "
                f"{self.muatan_saat_ini}/{self.kapasitas_maksimal_ton} ton]")


if __name__ == "__main__":
    t = Truk("Hino", "Dutro", 2021, 8)
    print(t.deskripsi())
    t.muat_barang(5)
    t.muat_barang(4)   # gagal
    t.muat_barang(3)
    print(t.deskripsi())
    t.bongkar_semua()
    print(t.deskripsi())