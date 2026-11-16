class NotifikasiEmail:
    def kirim(self, pesan, penerima):
        print(f"[EMAIL] -> {penerima} | Subjek: DARURAT | {pesan}")
        return True


class NotifikasiSMS:
    def kirim(self, pesan, penerima):
        print(f"[SMS]   -> {penerima} | {pesan[:40]}")
        return True


class NotifikasiWhatsApp:
    def kirim(self, pesan, penerima):
        print(f"[WA]    -> {penerima} | *{pesan}*")
        return True


def broadcast_pengumuman(daftar_channel, pesan):
    """daftar_channel: list of (objek_channel, penerima)."""
    terkirim = 0
    for channel, penerima in daftar_channel:
        if channel.kirim(pesan, penerima):
            terkirim += 1
    print(f"\nTotal terkirim: {terkirim}/{len(daftar_channel)} kanal")


if __name__ == "__main__":
    kanal = [
        (NotifikasiEmail(), "mahasiswa@itera.ac.id"),
        (NotifikasiSMS(), "0812-0000-1111"),
        (NotifikasiWhatsApp(), "0857-2222-3333"),
    ]
    broadcast_pengumuman(kanal, "Kuliah hari ini ditiadakan karena banjir.")