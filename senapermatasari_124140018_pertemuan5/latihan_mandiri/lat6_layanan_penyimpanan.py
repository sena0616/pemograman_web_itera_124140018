from abc import ABC, abstractmethod


class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        """Menyimpan file."""

    @abstractmethod
    def download_file(self, nama_file):
        """Mengambil isi file."""

    def daftar_file(self):          # concrete method
        return sorted(self._data.keys())


class LocalDiskStorage(FileStorage):
    def __init__(self, folder="./uploads"):
        self.folder = folder
        self._data = {}

    def upload_file(self, nama_file, data_bytes):
        self._data[nama_file] = data_bytes
        print(f"[LOCAL {self.folder}] {nama_file} disimpan ({len(data_bytes)} byte)")

    def download_file(self, nama_file):
        print(f"[LOCAL] membaca {nama_file}")
        return self._data.get(nama_file)


class CloudStorage(FileStorage):
    def __init__(self, bucket):
        self.bucket = bucket
        self._data = {}

    def upload_file(self, nama_file, data_bytes):
        self._data[nama_file] = data_bytes
        print(f"[CLOUD s3://{self.bucket}] {nama_file} diunggah")

    def download_file(self, nama_file):
        print(f"[CLOUD] mengunduh {nama_file}")
        return self._data.get(nama_file)


if __name__ == "__main__":
    try:
        FileStorage()
    except TypeError as e:
        print("Ditolak:", e, "\n")

    for storage in (LocalDiskStorage(), CloudStorage("paw-itera")):
        storage.upload_file("catatan.txt", b"belajar abstract class")
        storage.upload_file("data.csv", b"a,b,c")
        print("Isi   :", storage.download_file("catatan.txt"))
        print("Daftar:", storage.daftar_file(), "\n")