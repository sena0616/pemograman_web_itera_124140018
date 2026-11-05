angka_rahasia = 18

print("--- GAME TEBAK ANGKA ---")
while True:
    tebakan = int(input("Masukkan tebakanmu: "))
    if tebakan < angka_rahasia:
        print("Terlalu kecil!")
    elif tebakan > angka_rahasia:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
    9