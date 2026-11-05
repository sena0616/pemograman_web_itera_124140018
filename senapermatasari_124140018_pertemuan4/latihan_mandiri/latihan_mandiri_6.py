import password_gen

print("--- UJI MODUL PASSWORD GENERATOR ---")
print("Panjang default (8) :", password_gen.buat_password_acak())
print("Panjang 12          :", password_gen.buat_password_acak(12))
print("Panjang 16          :", password_gen.buat_password_acak(panjang=16))