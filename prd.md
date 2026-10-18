# PRD — UMARYAM
## Product Requirements Document

**Versi:** 1.0.0  
**Status:** Draft — MVP  
**Produk:** Website penjualan telur, DOC, dan ayam kampung  
**Platform:** Responsive Web Application  
**Bahasa:** Indonesia  
**Arsitektur awal:** Static Frontend Application  
**Database:** Tidak diperlukan pada MVP

---

# 1. Product Overview

## 1.1 Deskripsi Produk

Umaryam adalah website katalog dan pemesanan yang berfokus pada **ayam kampung**, memungkinkan pelanggan menemukan produk, menentukan jumlah pembelian, mengelola keranjang, dan melanjutkan pemesanan melalui WhatsApp.

Website dirancang dengan pengalaman belanja yang sederhana, modern, cepat, dan nyaman digunakan, terutama melalui perangkat mobile.

Seluruh produk yang dijual berasal dari ayam kampung. Tidak ada produk dari jenis ayam lain.

Produk utama Umaryam terdiri dari tiga kategori:

1. **Telur** — telur ayam kampung dengan satuan penjualan yang jelas.
2. **DOC** — Day-Old Chick atau anak ayam kampung umur sehari.
3. **Ayam Kampung** — ayam kampung yang dijual siap potong untuk kebutuhan konsumsi.

MVP berfokus pada pengalaman frontend tanpa backend dan database. Data produk dikelola secara statis, sedangkan keranjang dikelola melalui Pinia dan dapat disimpan secara lokal menggunakan `localStorage`.

## 1.2 Visi Produk

Menjadikan Umaryam sebagai tempat yang memudahkan pelanggan menemukan dan memesan kebutuhan ayam serta telur melalui pengalaman belanja digital yang praktis.

## 1.3 Tujuan Utama

- Menampilkan produk dengan informasi yang jelas.
- Membuat pelanggan mudah menemukan kategori produk.
- Memungkinkan pelanggan memilih beberapa produk sekaligus.
- Menyediakan keranjang interaktif dengan perhitungan harga otomatis.
- Menyediakan floating cart bar yang selalu mudah dijangkau.
- Menghasilkan ringkasan pesanan secara otomatis.
- Mempermudah pelanggan melakukan checkout melalui WhatsApp.
- Membangun fondasi frontend yang mudah dikembangkan menjadi aplikasi yang lebih besar.

## 1.4 Prinsip Produk

- **Simple:** pengguna tidak membutuhkan banyak langkah.
- **Clear:** harga, satuan, dan jumlah produk mudah dipahami.
- **Responsive:** nyaman digunakan di mobile maupun desktop dengan pendekatan mobile-first.
- **Interactive:** perubahan kuantitas dan keranjang langsung terlihat.
- **Maintainable:** komponen dan state terorganisasi dengan baik.
- **Scalable:** struktur frontend siap dihubungkan ke backend pada masa depan.

---

# 2. Target Pengguna

## 2.1 Pengguna Utama

Pelanggan yang membutuhkan telur, DOC, dan ayam kampung, termasuk pembeli yang ingin melakukan pemesanan dalam jumlah besar.

Contoh kebutuhan pengguna:

- Melihat produk yang tersedia.
- Membandingkan harga dan satuan.
- Membeli beberapa jenis produk dalam satu pesanan.
- Mengatur kuantitas tanpa harus menghubungi penjual satu per satu.
- Mengirimkan daftar belanja kepada penjual melalui WhatsApp.

## 2.2 Masalah Pengguna

- Informasi produk dan harga sering tersebar.
- Pemesanan melalui chat secara manual membutuhkan banyak komunikasi.
- Pelanggan harus menyebutkan nama produk dan kuantitas satu per satu.
- Penjual perlu menyusun ulang daftar pesanan secara manual.
- Pelanggan membutuhkan cara sederhana untuk melihat jumlah barang dan total sementara.

## 2.3 Solusi

Umaryam menyediakan katalog produk terpusat, keranjang belanja interaktif, serta fitur checkout yang menyusun daftar pesanan secara otomatis.

---

# 3. Product Scope

## 3.1 Fitur yang Termasuk MVP

- Landing page responsif.
- Navbar dengan navigasi kategori.
- Hero section.
- Section Telur.
- Section DOC.
- Section Ayam Kampung.
- Kartu produk interaktif.
- Kontrol kuantitas.
- Tambah ke keranjang.
- Pinia cart store.
- Persistensi keranjang menggunakan `localStorage`.
- Floating cart bar.
- Modal keranjang (popup).
- Ringkasan subtotal dan total.
- Formulir informasi pemesan.
- Checkout melalui WhatsApp.
- Empty state dan validasi.
- Animasi menggunakan Motion for Vue dengan transisi yang lebih kompleks.
- Desain responsive dengan Tailwind CSS (default mobile, `md` tablet, `lg` laptop).

## 3.2 Fitur di Luar MVP

- Login dan registrasi.
- Database produk.
- Dashboard admin.
- Pengelolaan stok real-time.
- Payment gateway.
- Pembayaran otomatis.
- Pengelolaan pesanan terpusat.
- Sinkronisasi keranjang antarperangkat.
- Sistem kupon dan diskon.
- Sistem pengiriman otomatis.
- Notifikasi pesanan otomatis dari server.

Fitur tersebut dapat dipertimbangkan setelah kebutuhan bisnis tervalidasi.

---

# 4. Brand Identity dan Design Direction

## 4.1 Identitas Brand

**Nama:** Umaryam

**Posisi:** Spesialis ayam kampung — telur, DOC, dan ayam kampung siap potong.

Karakter brand:

- Terpercaya.
- Bersih.
- Ramah.
- Profesional.
- Praktis.
- Berorientasi pada kebutuhan pelanggan.

Website tidak boleh terlihat seperti katalog mentah atau halaman HTML sederhana. Walaupun menggunakan data statis, tampilannya harus terasa seperti storefront e-commerce yang dirancang dengan baik.

Komunikasi produk harus konsisten menegaskan bahwa semua produk adalah ayam kampung. Hindari menampilkan produk dari jenis ayam lain.

## 4.2 Visual Direction

Gunakan pendekatan modern dengan whitespace yang cukup, foto produk berkualitas, tipografi tegas, dan hierarki informasi yang jelas.

Arah visual menggunakan kombinasi warna putih dan hijau sebagai identitas utama.

Palet warna:

| Elemen | Arahan |
|---|---|
| Primary | Hijau (hijau tua untuk tombol dan aksen utama) |
| Primary hover | Hijau lebih gelap |
| Background | Putih |
| Surface | Putih |
| Text | Abu-abu sangat gelap |
| Secondary text | Abu-abu netral |
| Accent | Hijau muda sebagai highlight |
| Border | Abu-abu muda |

Putih menjadi warna dominan untuk ruang dan kartu produk, sedangkan hijau digunakan sebagai warna aksi, penanda aktif, dan aksen brand.

Warna akhir dapat disesuaikan saat implementasi desain.

## 4.3 Tipografi

Gunakan tipografi sans-serif yang mudah dibaca, misalnya Inter atau font sejenis.

Hierarki:

- Heading hero: besar, tegas, dan mudah dipindai.
- Heading section: konsisten dan jelas.
- Nama produk: cukup menonjol.
- Harga: mudah ditemukan.
- Deskripsi: ringkas.
- Label satuan dan informasi tambahan: lebih kecil, tetapi tetap terbaca.

## 4.4 Prinsip UI/UX

- Tombol utama harus terlihat jelas.
- Harga tidak boleh tersembunyi.
- Kuantitas harus mudah diubah.
- Pengguna harus mendapatkan feedback setelah menambahkan produk.
- Keranjang harus mudah diakses dari mana saja.
- Informasi penting tidak boleh tertutup floating cart bar.
- Animasi tidak boleh menghambat proses belanja.
- Hormati preferensi `prefers-reduced-motion`.

## 4.5 Responsive Breakpoints

Desain disusun mobile-first. Tampilan default adalah mobile, lalu ditingkatkan pada breakpoint yang lebih besar.

| Breakpoint | Target | Pendekatan Tailwind |
|---|---|---|
| Default | Mobile | Tanpa prefix |
| `md` | Tablet | `md:` |
| `lg` | Laptop | `lg:` |

Prinsip responsive:

- Grid produk menggunakan satu kolom pada mobile, dua kolom pada tablet, dan tiga atau lebih kolom pada laptop.
- Navbar ringkas pada mobile dan lengkap pada tablet ke atas.
- Modal keranjang memenuhi penuh atau hampir penuh pada mobile, dan tampil sebagai panel terpusat pada tablet dan laptop.
- Padding dan ukuran tipografi meningkat bertahap sesuai breakpoint.
- Tidak boleh ada horizontal scroll pada semua breakpoint.

## 4.6 Animasi

Gunakan Motion for Vue dengan animasi yang kaya, halus, dan tetap terarah agar mendukung pengalaman belanja.

- **Entrance:** hero, judul section, dan kartu produk muncul dengan fade dan pergeseran bertahap saat masuk viewport.
- **Stagger:** daftar kartu produk muncul berurutan dengan jeda kecil antar-item.
- **Micro-interaction:** tombol dan ikon keranjang memberikan feedback tekan/hover yang jelas.
- **Add to cart:** badge dan ikon keranjang beranimasi setiap kali produk ditambahkan.
- **Modal keranjang:** muncul dengan transisi overlay dan panel (fade plus scale atau slide).
- **Layout:** perubahan kuantitas dan item modal dianimasikan menggunakan transisi layout.
- **Scroll:** elemen dekoratif bergerak halus mengikuti scroll tanpa mengganggu keterbacaan.

Prinsip animasi:

- Animasi tidak boleh memperlambat aksi utama seperti menambah ke keranjang atau checkout.
- Durasi terjaga (umumnya 150–400 ms) dengan easing yang konsisten.
- Hormati preferensi `prefers-reduced-motion` dengan menonaktifkan atau menyederhanakan animasi.

---

# 5. Information Architecture

## 5.1 Struktur Halaman

Aplikasi memiliki satu route utama.

### `/`

Landing page yang berisi:

1. Navbar.
2. Hero section.
3. Kategori Telur.
4. Kategori DOC.
5. Kategori Ayam Kampung.
6. Section keunggulan.
7. Section cara pemesanan.
8. Footer.
9. Floating cart bar jika keranjang berisi produk.

Keranjang tidak memiliki halaman terpisah. Seluruh proses keranjang dan checkout terjadi di dalam modal keranjang yang muncul sebagai popup di atas landing page.

### Modal Keranjang

Modal keranjang berisi:

1. Header modal dengan judul dan tombol tutup.
2. Daftar produk yang dipilih.
3. Kontrol kuantitas.
4. Subtotal setiap produk.
5. Ringkasan harga.
6. Formulir informasi pemesan.
7. Tombol checkout WhatsApp.
8. Empty state jika keranjang kosong.

Modal dapat ditutup melalui tombol tutup, klik area overlay, atau tombol `Esc`. Fokus keyboard harus terperangkap di dalam modal selama modal terbuka.

## 5.2 Navigasi

Navbar mengarahkan pengguna ke section terkait pada landing page.

Navigasi kategori menggunakan anchor atau mekanisme scroll yang sesuai.

Ikon keranjang membuka modal keranjang tanpa berpindah halaman.

---

# 6. Spesifikasi Landing Page

## 6.1 Navbar

### Tujuan

Memberikan identitas brand dan akses cepat ke navigasi serta keranjang.

### Komponen

- Logo atau wordmark Umaryam.
- Link Beranda.
- Link Telur.
- Link DOC.
- Link Ayam Kampung.
- Ikon keranjang.
- Badge jumlah unit produk.

### Perilaku

- Navbar harus responsif.
- Pada mobile, navigasi dapat menggunakan menu ringkas.
- Badge keranjang mengikuti state Pinia.
- Klik ikon keranjang membuka modal keranjang.
- Navigasi kategori menggulir ke section terkait.

### Kriteria

Navbar tidak boleh terlalu tinggi, terlalu padat, atau mengambil ruang berlebihan pada layar mobile.

## 6.2 Hero Section

### Tujuan

Menjelaskan penawaran Umaryam dalam beberapa detik pertama.

### Konten

Headline:

**"Kebutuhan Ayam dan Telur, Lebih Mudah dalam Satu Tempat."**

Deskripsi:

"Temukan telur, DOC, dan ayam kampung untuk kebutuhan Anda. Pilih produk, tentukan jumlahnya, lalu lanjutkan pemesanan dengan mudah."

CTA utama: **Lihat Produk**

CTA sekunder: **Pesan via WhatsApp**, jika nomor bisnis sudah tersedia dan kontak tersebut memang siap menerima pesanan.

### Elemen Visual

- Foto produk atau peternakan yang relevan.
- Layout dengan komposisi yang seimbang.
- Headline yang dominan.
- CTA yang jelas.
- Elemen dekoratif seperlunya.

### Perilaku

Klik Lihat Produk menggulirkan halaman ke katalog.

Hero harus tetap menarik dengan animasi masuk yang halus dan tetap ringan agar tidak mengganggu performa.

## 6.3 Section Telur

### Tujuan

Memperlihatkan pilihan produk telur.

### Komponen

- Judul section.
- Deskripsi singkat.
- Daftar kartu produk.
- Foto.
- Nama produk.
- Deskripsi.
- Harga dan satuan.
- Kontrol kuantitas.
- Tombol Tambah ke Keranjang.

### Perilaku

Pelanggan dapat memilih kuantitas dan menambahkan produk. Perubahan jumlah harus tercermin pada state keranjang.

## 6.4 Section DOC

### Tujuan

Menampilkan produk DOC beserta informasi pembelian yang relevan.

Informasi yang dapat ditampilkan:

- Nama atau jenis DOC.
- Foto.
- Deskripsi.
- Jenis atau strain jika tersedia.
- Harga.
- Satuan penjualan.
- Kuantitas.
- Tombol Tambah ke Keranjang.

Informasi yang belum dikonfirmasi tidak boleh dibuat seolah-olah merupakan fakta produk.

## 6.5 Section Ayam Kampung

### Tujuan

Menampilkan ayam kampung secara jelas dan profesional.

Informasi:

- Foto.
- Nama produk.
- Deskripsi.
- Harga.
- Satuan penjualan.
- Kontrol kuantitas.
- Tombol Tambah ke Keranjang.

Satuan penjualan harus eksplisit, misalnya per ekor atau per kilogram. Untuk produk dengan harga berdasarkan berat aktual, website harus menjelaskan bahwa harga akhir perlu dikonfirmasi oleh penjual.

## 6.6 Section Keunggulan

Menjelaskan manfaat yang benar-benar dapat diberikan Umaryam.

Contoh:

- Pilihan produk dalam satu tempat.
- Informasi produk yang jelas.
- Pemesanan lebih praktis.
- Komunikasi langsung melalui WhatsApp.

Hindari klaim tentang harga termurah, stok terjamin, atau kualitas tertentu sebelum ada bukti yang mendukungnya.

## 6.7 Section Cara Pemesanan

Gunakan tiga langkah visual:

1. **Pilih produk** — temukan produk yang dibutuhkan.
2. **Masukkan ke keranjang** — atur jumlah dan periksa pesanan.
3. **Checkout via WhatsApp** — kirim ringkasan pesanan untuk dikonfirmasi.

## 6.8 Footer

Berisi:

- Identitas Umaryam