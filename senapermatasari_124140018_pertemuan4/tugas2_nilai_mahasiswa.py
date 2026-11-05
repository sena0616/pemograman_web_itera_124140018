"""
Berkas : tugas2_nilai_mahasiswa.py
Nama   : Sena Permatasari
NIM    : 124140018
Tugas  : Program Pengelolaan Data Nilai Mahasiswa
"""

BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

DATA_MAHASISWA = [
    {"nama": "Sena Permatasari", "nim": "124140018",
     "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Budi Santoso", "nim": "123450127",
     "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Siti Aminah", "nim": "121130246",
     "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Andi Pratama", "nim": "122160389",
     "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 58},
    {"nama": "Dewi Lestari", "nim": "124350471",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 42},
    {"nama": "Rian Saputra", "nim": "123160563",
     "nilai_uts": 78, "nilai_uas": 72, "nilai_tugas": 75},
]


def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir berdasarkan bobot UTS, UAS, dan tugas.

    Parameter:
        uts (float): nilai UTS.
        uas (float): nilai UAS.
        tugas (float): nilai tugas.

    Mengembalikan:
        float: nilai akhir = 30% UTS + 40% UAS + 30% tugas.
    """
    return (BOBOT_UTS * uts) + (BOBOT_UAS * uas) + (BOBOT_TUGAS * tugas)


def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa.

    Mengembalikan:
        str: grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar_mahasiswa):
    """Menambahkan nilai akhir dan grade ke setiap data mahasiswa.

    Parameter:
        daftar_mahasiswa (list): list berisi dictionary data mahasiswa.

    Mengembalikan:
        None: dictionary di dalam list diperbarui langsung.
    """
    for mhs in daftar_mahasiswa:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])


def tampilkan_tabel(daftar_mahasiswa):
    """Menampilkan data mahasiswa dalam bentuk tabel di terminal.

    Parameter:
        daftar_mahasiswa (list): list dictionary yang sudah diproses.
    """
    garis = "=" * 62
    print(garis)
    print(f"{'No':<4}{'Nama':<20}{'NIM':<13}{'Nilai Akhir':>12}{'Grade':>9}")
    print(garis)
    for nomor, mhs in enumerate(daftar_mahasiswa, start=1):
        print(
            f"{nomor:<4}{mhs['nama']:<20}{mhs['nim']:<13}"
            f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>9}"
        )
    print(garis)


def cari_tertinggi_terendah(daftar_mahasiswa):
    """Mencari mahasiswa dengan nilai akhir tertinggi dan terendah.

    Parameter:
        daftar_mahasiswa (list): list dictionary yang sudah diproses.

    Mengembalikan:
        tuple: (dictionary nilai tertinggi, dictionary nilai terendah).
    """
    tertinggi = max(daftar_mahasiswa, key=lambda m: m["nilai_akhir"])
    terendah = min(daftar_mahasiswa, key=lambda m: m["nilai_akhir"])
    return tertinggi, terendah


def main():
    """Menjalankan program pengelolaan data nilai mahasiswa."""
    proses_data(DATA_MAHASISWA)

    print("\nDATA NILAI MAHASISWA")
    tampilkan_tabel(DATA_MAHASISWA)

    tertinggi, terendah = cari_tertinggi_terendah(DATA_MAHASISWA)

    print("\nNilai Akhir Tertinggi")
    print(f"  Nama        : {tertinggi['nama']}")
    print(f"  NIM         : {tertinggi['nim']}")
    print(f"  Nilai Akhir : {tertinggi['nilai_akhir']:.2f}")
    print(f"  Grade       : {tertinggi['grade']}")

    print("\nNilai Akhir Terendah")
    print(f"  Nama        : {terendah['nama']}")
    print(f"  NIM         : {terendah['nim']}")
    print(f"  Nilai Akhir : {terendah['nilai_akhir']:.2f}")
    print(f"  Grade       : {terendah['grade']}")


if __name__ == "__main__":
    main()
