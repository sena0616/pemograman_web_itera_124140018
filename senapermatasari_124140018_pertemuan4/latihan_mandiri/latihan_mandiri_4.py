def validasi_password(password):
    panjang_cukup = len(password) >= 8
    ada_angka = any(karakter.isdigit() for karakter in password)
    return panjang_cukup and ada_angka


daftar_uji = ["sena12345", "abcdefgh", "sena1", "12345678", "Sena2024", "pendek"]

print("--- UJI VALIDASI PASSWORD ---")
for password in daftar_uji:
    hasil = validasi_password(password)
    status = "VALID" if hasil else "TIDAK VALID"
    print(f"{password:<12} -> {hasil} ({status})")