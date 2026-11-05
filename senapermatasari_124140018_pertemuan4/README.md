# Praktikum Pengembangan Aplikasi Web
## Pertemuan 4 – Python Dasar

### Identitas Mahasiswa
- **Nama:** Sena Permatasari
- **NIM:** 124140018
- **Program Studi:** Teknik Informatika
- **Institusi:** Institut Teknologi Sumatera (ITERA)

### Deskripsi Praktikum
Praktikum ini membahas dasar pemrograman Python, meliputi penggunaan fungsi, percabangan, struktur data, modularitas, dan penggunaan modul.

### Tugas Praktikum

#### 1. Menghitung BMI
Program menghitung Body Mass Index (BMI) berdasarkan berat dan tinggi badan. Hasil perhitungan digunakan untuk menentukan kategori BMI menggunakan percabangan `if`, `elif`, dan `else`.

#### 2. Nilai Mahasiswa
Program mengolah data nilai mahasiswa menggunakan list dan dictionary. Nilai akhir dihitung dari UTS (30%), UAS (40%), dan tugas (30%). Program menentukan nilai huruf serta mahasiswa dengan nilai tertinggi dan terendah.

#### 3. Modularitas dan Fungsi
Program menggunakan modul `math_operations.py` yang berisi fungsi perhitungan luas dan keliling bangun datar serta konversi suhu Celsius ke Fahrenheit dan Kelvin. Fungsi dipanggil melalui `main.py` menggunakan teknik import modul.

### Struktur Project
```text
senapermatasari_124140018_pertemuan4/
├── .gitignore
├── README.md
├── main.py
├── math_operations.py
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── latihan_mandiri/
├── modul/
└── Screenshot/
```

### Cara Menjalankan Program

Jalankan terminal pada folder project.

**1. Tugas BMI**
```bash
python tugas1_bmi.py
```

**2. Tugas Nilai Mahasiswa**
```bash
python tugas2_nilai_mahasiswa.py
```

**3. Tugas Modularitas**
```bash
python main.py
```

**4. Pengujian Modul Langsung**
```bash
python math_operations.py
```

### Pengecekan PEP 8
Pengecekan standar penulisan kode Python dilakukan menggunakan `pycodestyle`.

```bash
python -m pycodestyle main.py math_operations.py tugas1_bmi.py tugas2_nilai_mahasiswa.py
```

Hasil pengecekan menunjukkan bahwa keempat file utama telah lolos pemeriksaan PEP 8.

### Bukti Screenshot

#### Tugas 1 – Menghitung BMI

![BMI Normal](Screenshot/01-tugas1-bmi-normal.png)

![BMI Berlebih](Screenshot/02-tugas1-bmi-berlebih.png)

![Validasi Input](Screenshot/03-tugas1-bmi-validasi-input.png)

![BMI Kurang](Screenshot/04-tugas1-bmi-kurang.png)

#### Tugas 2 – Nilai Mahasiswa

![Tabel Nilai Mahasiswa](Screenshot/06-tugas2-tabel-nilai-mahasiswa.png)

#### Tugas 3 – Modularitas

![Eksekusi Main](Screenshot/07-tugas3-main.png)

![Pengujian Modul](Screenshot/09-tugas3-uji-modul-langsung.png)

#### Pengecekan PEP 8

![Hasil Pycodestyle](Screenshot/08-cek-pep8-pycodestyle.png)