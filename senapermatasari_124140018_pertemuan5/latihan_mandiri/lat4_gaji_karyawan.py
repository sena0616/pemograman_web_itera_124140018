class Karyawan:
    UMR = 3_200_000

    def __init__(self, nama, jabatan, gaji_pokok, tunjangan=0):
        self.nama = nama
        self.jabatan = jabatan
        self.tunjangan = tunjangan
        self.gaji_pokok = gaji_pokok      # lewat setter

    @property
    def gaji_pokok(self):
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nilai):
        if nilai < Karyawan.UMR:
            raise ValueError(f"Gaji pokok minimal Rp {Karyawan.UMR:,}")
        self.__gaji_pokok = nilai

    def hitung_gaji_bersih(self, pajak_persen):
        kotor = self.__gaji_pokok + self.tunjangan
        return kotor * (100 - pajak_persen) / 100


if __name__ == "__main__":
    k = Karyawan("Sari", "Programmer", 5_000_000, tunjangan=750_000)
    print(f"{k.nama} ({k.jabatan})")
    print(f"Gaji bersih (pajak 5%): Rp {k.hitung_gaji_bersih(5):,.0f}")
    try:
        k.gaji_pokok = 2_000_000
    except ValueError as e:
        print("Ditolak:", e)
    try:
        print(k.__gaji_pokok)
    except AttributeError:
        print("Atribut private tidak bisa diakses langsung")