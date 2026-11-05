import random
import string


def buat_password_acak(panjang=8):
    karakter = string.ascii_letters + string.digits
    hasil = ""
    for _ in range(panjang):
        hasil += random.choice(karakter)
    return hasil