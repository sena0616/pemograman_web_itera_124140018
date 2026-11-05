"""
Berkas : main.py
Nama   : Sena Permatasari
NIM    : 124140018
Tugas  : Program utama yang menggunakan modul math_operations
"""

import math_operations
from math_operations import (
    luas_persegi,
    keliling_persegi,
    luas_persegi_panjang,
    keliling_persegi_panjang,
    luas_lingkaran,
    keliling_lingkaran,
)


def tampilkan_geometri():
    """Menampilkan hasil luas dan keliling tiga bentuk geometri."""
    print("=== GEOMETRI ===")
    print(f"Konstanta PI = {math_operations.PI}\n")

    print("Persegi")
    for sisi in (4, 7.5, 10):
        print(
            f"  sisi = {sisi:<5} | luas = {luas_persegi(sisi):>8.2f}"
            f" | keliling = {keliling_persegi(sisi):>7.2f}"
        )

    print("\nPersegi Panjang")
    for panjang, lebar in ((8, 5), (12.5, 4), (20, 15)):
        ukuran = f"{panjang} x {lebar}"
        print(
            f"  {ukuran:<10} | "
            f"luas = {luas_persegi_panjang(panjang, lebar):>8.2f}"
            f" | keliling = {keliling_persegi_panjang(panjang, lebar):>7.2f}"
        )

    print("\nLingkaran")
    for jari_jari in (3, 7, 10.5):
        print(
            f"  r = {jari_jari:<5} | luas = {luas_lingkaran(jari_jari):>8.2f}"
            f" | keliling = {keliling_lingkaran(jari_jari):>7.2f}"
        )


def tampilkan_suhu():
    """Menampilkan hasil konversi suhu dari Celsius."""
    print("\n=== KONVERSI SUHU ===")
    print(f"{'Celsius':>9}{'Fahrenheit':>14}{'Kelvin':>10}")
    for celsius in (0, 25, 36.6, 100):
        fahrenheit = math_operations.celsius_ke_fahrenheit(celsius)
        kelvin = math_operations.celsius_ke_kelvin(celsius)
        print(f"{celsius:>9.1f}{fahrenheit:>14.2f}{kelvin:>10.2f}")


def main():
    """Menjalankan seluruh pengujian fungsi dari modul math_operations."""
    tampilkan_geometri()
    tampilkan_suhu()


if __name__ == "__main__":
    main()
