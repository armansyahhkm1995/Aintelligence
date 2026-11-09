# RRI AInteligence — Frontend Prototype (Code-First Interactive System)

Aplikasi antarmuka interaktif **RRI AInteligence** yang dibangun berbasis **React 19 + TypeScript + Vite + Tailwind CSS + Shadcn UI (Radix Primitives) + Lucide Icons** tanpa memerlukan server backend (100% *Client-Side Reactive State* dengan persistensi *LocalStorage*).

Proyek ini merefleksikan seluruh spesifikasi dari dokumen PRD dan file desain Figma:
- **File Figma:** `2026 RRI Digital` (`HBVffDiia71uG6piCK9FTW`)
- **Canvas Node:** `RRI Aintelligence (Arman)` (`945:16009`)
- **Design System:** Falah One (Primary `#0066FF`, Font Inter + Oxanium, Slate Neutrals)
- **Pedoman Rekayasa:** `Arman Universal Engineering Rules 22 September 2026.md`

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

Pastikan Anda berada di direktori proyek:
```bash
cd "D:\ARMAN\PROJECT\RRI DIGITAL\Aitelligence\code"
```

Jalankan server pengembangan (*Vite Dev Server*):
```bash
npm run dev
```

Buka peramban Anda di alamat yang tertera (biasanya `http://localhost:5173`).

Untuk melakukan uji kompilasi produksi (*production build*):
```bash
npm run build
npm run preview
```

---

## 🖥️ Daftar Layar & Fitur Interaktif Lengkap

### 1. Otentikasi & Kendali Hak Akses (RBAC)
- **Login (`SCR-AUTH-01`):** Form login dengan validasi email `@rri.co.id` dan tombol pintas demo akun (*Budi Pratama - Editor* vs *Ahmad Fauzi - Admin*).
- **Verifikasi 2FA (`SCR-AUTH-02`):** Simulasi input 6-digit OTP Google Authenticator (kode default: `123456`).
- **Quick Role Switcher di Header:** Beralih peran antara **Admin** dan **Editor** secara instan dengan 1 klik untuk menguji pembatasan halaman.

### 2. Beranda & Dashboard (`SCR-DSB-01`)
- Ringkasan metrik real-time: Total Kata Kunci, Topik Cluster Siap, Bentrok Kanibalisasi, dan Draf Review.
- Filter rentang waktu dinamis (7 Hari, 30 Hari, Bulan Ini).
- Spanduk darurat peringatan bentrok kanibalisasi konten dengan tautan cepat ke resolusi.
- Antrean cluster terbaru & widget fokus pengerjaan brief aktif.

### 3. Impor CSV Semrush (`SCR-IMP-01`)
- Area *Drag-and-Drop* file CSV dengan simulasi animasi progress bar (0% &rarr; 100%).
- Pemetaan 4 skema kolom utama (*Keyword, Volume, KD, Search Intent*).
- Tabel pratinjau 5 baris data teratas sebelum disimpan.
- Validasi tipe file (menolak selain `.csv` dengan memicu *Error Toast*).

### 4. Manajemen Daftar Keyword (`SCR-KWD-01`)
- Pencarian instan (*instant search filter*) pada ribuan kata kunci.
- Filter dropdown status kelayakan (*Layak, Kurang Layak, Tidak Layak*) dan intent pencarian.
- Pengurutan kolom (*Sorting*) berdasarkan Volume & KD.
- Paginasi interaktif (10 baris per halaman, navigasi halaman).
- Multi-select checkbox per baris & *Select All* pada halaman aktif.
- **Floating Bulk Action Bar:** Muncul mengambang di bawah saat item dicentang dengan tombol **"Ubah Kelayakan (Override)"**.

### 5. Modal Koreksi Kelayakan Massal (`SCR-KWD-02`)
- Menampilkan *Chips* daftar keyword terpilih (`bantuan subsidi upah...`, `pinjol legal ojk...`).
- Pilihan status baru (*Radio tiles* Layak / Kurang Layak / Tidak Layak).
- Input alasan editorial manual yang otomatis dicatat ke riwayat audit.

### 6. Cluster Topik & Kanibalisasi (`SCR-CLS-01`)
- Tab filter: *Semua Cluster*, *Butuh Resolusi (Bentrok Merah)*, dan *Siap Dibuat Brief*.
- Kartu accordion horizontal yang dapat di-*expand* untuk melihat rincian kata kunci anggota dan volume masing-masing.
- Kartu bentrok kanibalisasi (merah) dengan skor kemiripan 87% terhadap artikel terbit RRI CMS.
- Tombol aksi: **"Edit Cluster"**, **"Tetap Lanjutkan (Alasan Wajib)"**, dan **"Buat Brief AI"**.

### 7. Panel Geser "Edit Cluster" (`SCR-CLS-02`)
- *Right-Side Drawer* dengan animasi geser masuk (*slide-in*) mulus dari sisi kanan.
- Form penyuntingan nama cluster dan pemilihan intent pencarian.
- Pengaturan kata kunci anggota: tombol *Jadikan Pilar*, penambahan keyword baru, dan tombol hapus dari cluster.

### 8. Modal Resolusi Bentrok CMS - Force Bypass (`SCR-CLS-03`)
- Kotak komparasi data usulan AI vs artikel lama terbitan RRI CMS.
- Validasi wajib: Textarea alasan editorial harus diisi minimal 15 karakter (tombol konfirmasi terkunci sebelum valid).
- Checkbox persetujuan tanggung jawab redaksional.
- Eksekusi *bypass* yang otomatis mengubah status cluster menjadi 🟡 *Bypass Diterapkan* dan mencatatnya ke Log Audit.

### 9. Tinjauan Brief Artikel & Editor Kerangka (`SCR-BRF-01`)
- Tata letak asimetris 2 kolom (70% Editor Kerangka, 30% Parameter & Aksi).
- Penyuntingan langsung usulan judul artikel (H1).
- Struktur kerangka pohon heading H2/H3: teks dapat disunting langsung, penambahan subtopik baru, dan penghapusan subtopik.
- Simulasi tombol *Regenerate Kerangka AI* dengan indikator loading.
- Input tag keyword sekunder (*LSI chips*).
- Aksi persetujuan yang otomatis mengalirkan data ke lembar kerja draf artikel.

### 10. Penyuntingan Draf Naskah Final (`SCR-DRF-01`)
- Lembar kerja teks (*word processor canvas*) bebas distraksi dengan penghitung kata dan estimasi waktu baca otomatis.
- Kartu anotasi cerdas AI: sorotan kuning untuk verifikasi fakta dan rekomendasi optimasi SEO.
- Panel kanan SEO: skor optimasi AI (92/100) dan *Checklist Kepatuhan Redaksi*.
- Aksi: Salin HTML ke clipboard, Simpan Draf, dan Kirim ke Redaktur Pelaksana.

### 11. Pengaturan Sistem & Kebijakan Redaksi (`SCR-SET-01` - Khusus Admin)
- Tata letak *Master-Detail Vertical Tabs*:
  - **Tab 1:** Aturan Filter Keyword (tabel aturan, switch toggle aktif/nonaktif, modal tambah aturan baru, dan hapus aturan).
  - **Tab 2:** Buku Gaya & Template (versi pedoman redaksi v2.2, batasan judul, tone of voice).
  - **Tab 3:** Konfigurasi API & AI (pemilihan model Gemini 2.5, slider temperature kreativitas, dan notifikasi peringatan kuota token 90%).

### 12. Log Audit & Keamanan Redaksi (`SCR-LOG-01`)
- Tabel padat informasi (*high information density*) yang bersifat *read-only*.
- Pencarian instan dan filter berdasarkan modul.
- Tombol **Ekspor Log (CSV)** yang menghasilkan file unduhan nyata di browser.
- Modal penampil detail payload & metadata mentah (JSON).

### 13. Manajemen Pengguna & Hak Akses (`SCR-USR-01` - Khusus Admin)
- Daftar pengguna redaksi dengan avatar, divisi, peran (*Admin/Editor*), status akun (*Aktif/Nonaktif*), dan waktu login terakhir.
- Modal **Tambah Pengguna Baru** dengan penyimpanan instan.
- Dropdown pengubahan peran langsung di tabel dan tombol aktifkan/nonaktifkan akun.

### 14. Galeri Layar Error (`C. Error state` - Sesuai Desain Figma)
Menyediakan halaman pratinjau interaktif khusus untuk menguji visual seluruh kode status HTTP:
- **HTTP 403:** Akses Ditolak (Bukan Administrator).
- **HTTP 404:** Halaman atau ID Naskah Tidak Ditemukan.
- **HTTP 413:** Ukuran File CSV Melebihi Batas Maksimal 15MB.
- **HTTP 429:** Batas Kuota Permintaan AI Tercapai (*Rate Limit*).
- **HTTP 503:** Layanan Model Bahasa AI Sedang Pemeliharaan.
- **HTTP 504:** Waktu Tunggu Respons AI Habis (*Gateway Timeout*).

### 15. Pusat Notifikasi & Sistem Floating Toast
- **Dropdown Notifikasi Header:** Notifikasi redaksi untuk kanibalisasi, draf siap review, dan impor CSV.
- **Sistem Floating Toast (Pojok Kanan Bawah):** Sesuai spesifikasi node `1015:24010` lengkap dengan gaya visual untuk *Success*, *Warning*, *Error*, dan *Info* (termasuk tombol *Tutup / Dismiss*).

---

## 📂 Struktur Direktori Proyek

```
D:\ARMAN\PROJECT\RRI DIGITAL\Aitelligence\code\
├── index.html                  # Entry point HTML dengan font Inter & Oxanium
├── package.json                # Dependencies React 19, Tailwind, Lucide, Radix
├── vite.config.ts              # Konfigurasi Vite & Tailwind CSS v4
├── tsconfig.json               # Konfigurasi TypeScript
├── src/
│   ├── main.tsx                # Mount React root
│   ├── App.tsx                 # Root Provider (Toast + App + Layout)
│   ├── index.css               # Theme Falah One, Tailwind v4 variables
│   ├── types/                  # Domain TypeScript interfaces
│   ├── lib/                    # Helper utils (cn, formatNumber, formatTimeWIB)
│   ├── data/                   # Mock Data lengkap (User, Keyword, Cluster, Brief, Draft, Rule, Log)
│   ├── context/
│   │   ├── AppContext.tsx      # Central reactive state & localStorage sync
│   │   └── ToastContext.tsx    # Toast notification engine (Sonner/Shadcn style)
│   ├── components/
│   │   ├── ui/                 # Shadcn UI primitives (button, badge, input, card, dialog, sheet)
│   │   ├── layout/             # Master layout, Sidebar, Header, Breadcrumb, Clock
│   │   ├── modals/             # BulkOverrideModal, ResolusiBentrokModal, AddRuleModal, AddUserModal
│   │   └── drawers/            # EditClusterDrawer (Right-side slide panel)
│   └── pages/                  # Seluruh layar antarmuka aplikasi
│       ├── DashboardPage.tsx
│       ├── ImporCSVPage.tsx
│       ├── KeywordPage.tsx
│       ├── ClusterPage.tsx
│       ├── BriefPage.tsx
│       ├── DraftPage.tsx
│       ├── SettingsPage.tsx
│       ├── AuditLogPage.tsx
│       ├── UsersPage.tsx
│       ├── LoginPage.tsx
│       └── ErrorGalleryPage.tsx
```

---
*Dikembangkan dengan standar arsitektur bersih, ramah aksesibilitas, dan 100% siap dihubungkan ke API/Backend di kemudian hari.*
