kontak = {
    "Budi": "081234567890",
    "Sena": "082345678901",
}


def tambah_kontak(nama, nomor):
    kontak[nama] = nomor
    print(f"Kontak {nama} berhasil ditambahkan.")


def cari_kontak(nama):
    nomor = kontak.get(nama, "tidak ditemukan")
    print(f"Nomor {nama}: {nomor}")


def tampilkan_semua():
    print("\n--- DAFTAR KONTAK ---")
    for nomor_urut, (nama, nomor) in enumerate(kontak.items(), start=1):
        print(f"{nomor_urut}. {nama:<10} : {nomor}")


while True:
    print("\n=== KATALOG KONTAK ===")
    print("1. Tambah kontak")
    print("2. Cari kontak")
    print("3. Tampilkan semua kontak")
    print("4. Keluar")
    pilihan = input("Pilih menu (1-4): ")

    if pilihan == "1":
        nama_baru = input("Nama   : ")
        nomor_baru = input("Nomor  : ")
        tambah_kontak(nama_baru, nomor_baru)
    elif pilihan == "2":
        nama_dicari = input("Cari nama: ")
        cari_kontak(nama_dicari)
    elif pilihan == "3":
        tampilkan_semua()
    elif pilihan == "4":
        print("Terima kasih!")
        break
    else:
        print("Pilihan tidak valid.")