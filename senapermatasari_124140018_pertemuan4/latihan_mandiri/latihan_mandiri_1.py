nama = "Sena Permatasari"
nim = 124140018
angkatan = 2024
minat_penelitian = "Rekayasa perangkat lunak"

print("--- PROFIL DIRI ---")
print("Nama:", nama)
print("NIM:", nim)
print("Angkatan:", angkatan)
print("Minat Penelitian:", minat_penelitian)

print("\n--- EKSPERIMEN sep=' | ' ---")
print(nama, nim, angkatan, minat_penelitian, sep=" | ")

lebar = 46
garis = "#" * lebar
kosong = "#" + " " * (lebar - 2) + "#"


def baris_kartu(teks):
    return "# " + teks.ljust(lebar - 4) + " #"


print("\n--- KARTU IDENTITAS ---")
kartu = "\n".join([
    garis,
    baris_kartu("KARTU IDENTITAS MAHASISWA".center(lebar - 4)),
    garis,
    kosong,
    baris_kartu(f"Nama      : {nama}"),
    baris_kartu(f"NIM       : {nim}"),
    baris_kartu(f"Angkatan  : {angkatan}"),
    baris_kartu(f"Minat     : {minat_penelitian}"),
    kosong,
    garis,
])
print("\t" + kartu.replace("\n", "\n\t"))