# Praktikum 6 – Pyramid Framework dan PostgreSQL

**Nama:** Sena Permatasari  
**NIM:** 124140018  
**Program Studi:** Teknik Informatika  
**Institusi:** Institut Teknologi Sumatera (ITERA)

## Deskripsi

Praktikum ini membahas pengembangan aplikasi web menggunakan **Pyramid Framework** dengan integrasi database **PostgreSQL**. Aplikasi ini menerapkan pengelolaan data menggunakan SQLAlchemy dan Alembic serta menyediakan fitur CRUD (Create, Read, Update, Delete) untuk data mahasiswa dan mata kuliah.

## Tujuan Praktikum

- Memahami penggunaan Pyramid Framework untuk membangun aplikasi web.
- Menghubungkan aplikasi Pyramid dengan database PostgreSQL.
- Memahami penggunaan SQLAlchemy untuk pemetaan objek ke database.
- Mengelola perubahan struktur database menggunakan Alembic.
- Mengimplementasikan operasi CRUD pada data mahasiswa dan mata kuliah.

## Struktur Folder

```text
senapermatasari_124140018_pertemuan6/
│
├── pyramid_mahasiswa/
│   ├── alembic/
│   │   ├── versions/
│   │   │   ├── 20261121_82f0e399804b.py
│   │   │   ├── 20261121_9b01de7a7e29.py
│   │   │   └── README.txt
│   │   ├── env.py
│   │   └── script.py.mako
│   │
│   ├── models/
│   │   ├── mahasiswa.py
│   │   ├── matakuliah.py
│   │   ├── meta.py
│   │   ├── mymodel.py
│   │   └── __init__.py
│   │
│   ├── scripts/
│   │   ├── initialize_db.py
│   │   └── __init__.py
│   │
│   ├── static/
│   │   ├── pyramid-16x16.png
│   │   ├── pyramid.png
│   │   └── theme.css
│   │
│   ├── templates/
│   │   ├── 404.jinja2
│   │   ├── layout.jinja2
│   │   └── mytemplate.jinja2
│   │
│   ├── views/
│   │   ├── default.py
│   │   ├── mahasiswa.py
│   │   ├── matakuliah.py
│   │   ├── notfound.py
│   │   └── __init__.py
│   │
│   ├── pshell.py
│   ├── routes.py
│   ├── tests.py
│   └── __init__.py
│
├── screenshot/
│   ├── 01-struktur-project.png
│   ├── 02-model-mahasiswa.png
│   ├── 03-model-matakuliah.png
│   ├── 04-migration-mahasiswa.png
│   ├── 05-migration-matakuliah.png
│   ├── 06a-crud-mahasiswa-create-read.png
│   ├── 06b-crud-mahasiswa-update-delete.png
│   ├── 07a-crud-matakuliah-create-read.png
│   └── 07b-crud-matakuliah-update-delete.png
│
├── .coveragerc
├── .gitignore
├── CHANGES.txt
├── MANIFEST.in
├── production.ini
├── pytest.ini
├── README.md
└── setup.py
```

## Penjelasan Struktur Folder

| Folder/File | Keterangan |
|---|---|
| `pyramid_mahasiswa/` | Direktori utama aplikasi Pyramid. |
| `alembic/` | Konfigurasi dan pengelolaan migrasi database. |
| `alembic/versions/` | Menyimpan file migrasi database. |
| `models/` | Mendefinisikan model data Mahasiswa dan Matakuliah. |
| `scripts/` | Berisi script untuk inisialisasi database. |
| `static/` | Menyimpan file statis seperti CSS dan gambar. |
| `templates/` | Menyimpan template halaman menggunakan Jinja2. |
| `views/` | Mengatur fungsi view dan endpoint aplikasi. |
| `routes.py` | Mendefinisikan route aplikasi. |
| `tests.py` | Berisi pengujian aplikasi. |
| `screenshot/` | Menyimpan dokumentasi hasil praktikum. |
| `development.ini` | Konfigurasi lingkungan pengembangan lokal. File ini tidak disertakan dalam repository. |
| `production.ini` | Konfigurasi lingkungan produksi. |
| `setup.py` | Konfigurasi instalasi package Python. |
| `.gitignore` | Mengatur file yang tidak disertakan dalam Git. |

## Fitur Aplikasi

### 1. CRUD Data Mahasiswa

Aplikasi menyediakan operasi:
- **Create:** Menambahkan data mahasiswa.
- **Read:** Menampilkan daftar dan detail mahasiswa.
- **Update:** Memperbarui data mahasiswa.
- **Delete:** Menghapus data mahasiswa.

Data mahasiswa meliputi NIM, nama, jurusan, tanggal lahir, dan alamat.

### 2. CRUD Data Matakuliah

Aplikasi menyediakan operasi:
- **Create:** Menambahkan data mata kuliah.
- **Read:** Menampilkan daftar dan detail mata kuliah.
- **Update:** Memperbarui data mata kuliah.
- **Delete:** Menghapus data mata kuliah.

Data mata kuliah meliputi kode mata kuliah, nama mata kuliah, SKS, dan semester.

## Daftar Endpoint API

### Mahasiswa

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/mahasiswa` | Menampilkan seluruh data mahasiswa |
| GET | `/api/mahasiswa/{id}` | Menampilkan detail mahasiswa |
| POST | `/api/mahasiswa` | Menambahkan mahasiswa |
| PUT | `/api/mahasiswa/{id}` | Memperbarui mahasiswa |
| DELETE | `/api/mahasiswa/{id}` | Menghapus mahasiswa |

### Matakuliah

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/matakuliah` | Menampilkan seluruh data mata kuliah |
| GET | `/api/matakuliah/{id}` | Menampilkan detail mata kuliah |
| POST | `/api/matakuliah` | Menambahkan mata kuliah |
| PUT | `/api/matakuliah/{id}` | Memperbarui mata kuliah |
| DELETE | `/api/matakuliah/{id}` | Menghapus mata kuliah |

## Teknologi yang Digunakan

- Python
- Pyramid Framework
- PostgreSQL
- SQLAlchemy
- Alembic
- Jinja2
- PowerShell

## Cara Menjalankan Aplikasi

1. Pastikan Python dan PostgreSQL sudah terpasang.
2. Siapkan virtual environment dan instal dependensi project.
3. Siapkan database PostgreSQL dan konfigurasi koneksi lokal pada `development.ini`.
4. Aktifkan virtual environment.
5. Jalankan aplikasi melalui terminal:

```powershell
python -m pyramid.scripts.pserve development.ini --reload
```

6. Buka browser dan akses:

```text
http://localhost:6543
```

## Dokumentasi Praktikum

Dokumentasi pelaksanaan praktikum tersedia di folder `screenshot/`, mulai dari struktur project, model, migrasi database, hingga pengujian operasi CRUD Mahasiswa dan Matakuliah.

---

**Institut Teknologi Sumatera (ITERA)**  
**Program Studi Teknik Informatika**