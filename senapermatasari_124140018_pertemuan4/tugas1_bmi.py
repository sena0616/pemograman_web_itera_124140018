"""
Berkas : tugas1_bmi.py
Nama   : Sena Permatasari
NIM    : 124140018
Tugas  : Program Penghitung BMI (Body Mass Index) Sederhana
"""

DAFTAR_KATEGORI = [
    ("< 18.5", "Berat badan kurang"),
    ("18.5 - 24.9", "Berat badan normal"),
    ("25.0 - 29.9", "Berat badan berlebih"),
    (">= 30", "Obesitas"),
]


def minta_angka(pesan, minimum, maksimum):
    """Meminta input angka dari pengguna sampai nilainya valid.

    Parameter:
        pesan (str): teks permintaan yang ditampilkan ke pengguna.
        minimum (float): batas bawah nilai yang diterima (tidak termasuk).
        maksimum (float): batas atas nilai yang diterima (termasuk).

    Mengembalikan:
        float: angka valid yang dimasukkan pengguna.
    """
    while True:
        teks = input(pesan).strip().replace(",", ".")
        try:
            angka = float(teks)
        except ValueError:
            print("Input tidak valid, masukkan angka saja.\n")
            continue

        if minimum < angka <= maksimum:
            return angka
        print(f"Nilai harus lebih dari {minimum} dan maksimal {maksimum}.\n")


def hitung_bmi(berat, tinggi):
    """Menghitung nilai BMI.

    Parameter:
        berat (float): berat badan dalam kilogram.
        tinggi (float): tinggi badan dalam meter.

    Mengembalikan:
        float: nilai BMI = berat / (tinggi * tinggi).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi):
    """Menentukan kategori berat badan berdasarkan nilai BMI.

    Parameter:
        bmi (float): nilai BMI yang sudah dihitung.

    Mengembalikan:
        str: kategori berat badan.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def tampilkan_tabel_kategori(kategori_anda):
    """Menampilkan tabel lengkap kategori BMI dan menandai kategori pengguna.

    Parameter:
        kategori_anda (str): kategori hasil perhitungan BMI pengguna.
    """
    print("\n--- TABEL KATEGORI BMI ---")
    print(f"{'Rentang BMI':<14}{'Kategori'}")
    for rentang, nama_kategori in DAFTAR_KATEGORI:
        tanda = "  <-- Anda" if nama_kategori == kategori_anda else ""
        print(f"{rentang:<14}{nama_kategori}{tanda}")


def main():
    """Menjalankan program penghitung BMI."""
    print("=== PENGHITUNG BMI ===")
    berat = minta_angka("Berat badan (kg)  : ", 0, 500)
    tinggi = minta_angka("Tinggi badan (m)  : ", 0, 3)

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print("\n--- HASIL ---")
    print(f"Berat badan : {berat:.1f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")
    tampilkan_tabel_kategori(kategori)


if __name__ == "__main__":
    main()
