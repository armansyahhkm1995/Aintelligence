import React, { useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Play,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react'
import { useToast } from '../context/ToastContext'
import { useApp } from '../context/AppContext'

interface ToastDocItem {
  id: string
  module:
    | 'Impor CSV'
    | 'Kata Kunci'
    | 'Kelompok Topik'
    | 'Arahan Artikel'
    | 'Draf Berita'
    | 'Pengaturan Redaksi'
    | 'Manajemen Pengguna'
    | 'Sistem & Sesi'
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  condition: string
  actionLabel?: string
}

const TOAST_CATALOG: ToastDocItem[] = [
  // 1. Impor CSV
  {
    id: 't-csv-01',
    module: 'Impor CSV',
    type: 'success',
    title: 'Impor Berhasil',
    message: 'Berkas semrush_keywords_export_nov2026.csv berhasil diunggah. Sebanyak 842 kata kunci diproses dan 10 kata kunci baru ditambahkan.',
    condition: 'File CSV valid, struktur metadata sesuai standar, dan seluruh baris kata kunci berhasil diurai ke database.',
  },
  {
    id: 't-csv-02',
    module: 'Impor CSV',
    type: 'warning',
    title: 'Kuota Token Habis',
    message: 'Tidak dapat mengunggah berkas CSV. Kuota token analisis AI telah habis. Hubungi administrator.',
    condition: 'Admin atau editor mencoba mengunggah file CSV saat status token LLM sedang habis (isTokenExhausted === true).',
    actionLabel: 'Lihat Pengaturan',
  },
  {
    id: 't-csv-03',
    module: 'Impor CSV',
    type: 'warning',
    title: 'Berkas Duplikat Terdeteksi',
    message: 'Berkas semrush_keywords_export_nov2026.csv (420 KB) sudah pernah diimpor sebelumnya. Sistem menolak impor berulang untuk mencegah duplikasi data.',
    condition: 'File yang diunggah memiliki nama berkas dan ukuran byte yang identik dengan riwayat impor sebelumnya.',
  },
  {
    id: 't-csv-04',
    module: 'Impor CSV',
    type: 'error',
    title: 'Format Berkas Tidak Valid',
    message: 'Hanya berkas format .csv dari ekspor Semrush yang diperbolehkan. Format .xlsx atau .pdf ditolak.',
    condition: 'Pengguna mengunggah berkas selain ekstensi .csv (misalnya .xlsx, .txt, .pdf, .zip).',
  },
  {
    id: 't-csv-05',
    module: 'Impor CSV',
    type: 'error',
    title: 'Ukuran Berkas Terlalu Besar',
    message: 'Ukuran berkas melebihi batas maksimal 25 MB. Silakan pecah data CSV Anda menjadi beberapa bagian.',
    condition: 'Ukuran file yang dipilih melebihi batas kuota unggah 25 Megabytes.',
  },
  {
    id: 't-csv-07',
    module: 'Impor CSV',
    type: 'warning',
    title: 'Impor Sebagian Berhasil',
    message: '820 baris berhasil diimpor, namun terdapat 22 baris tidak ada datanya.',
    condition: 'File memiliki beberapa baris kosong / tidak ada datanya, namun baris valid lainnya tetap berhasil diproses.',
    actionLabel: 'Unduh Log Galat',
  },
  {
    id: 't-csv-08',
    module: 'Impor CSV',
    type: 'success',
    title: 'Log Galat',
    message: 'Log galat untuk semrush_keywords_export_nov2026.csv berhasil diunduh ke komputer Anda.',
    condition: 'Pengguna menekan tombol unduh log galat pada tabel riwayat impor CSV.',
  },

  // 2. Kata Kunci
  {
    id: 't-kw-01',
    module: 'Kata Kunci',
    type: 'success',
    title: 'AI Assistant',
    message: 'AI sedang mengklasifikasikan 50 kata kunci berdasarkan intent pencarian, volume, dan kaidah redaksi...',
    condition: 'Editor/Admin mengklik tombol "Klasifikasikan Kata Kunci oleh AI".',
  },
  {
    id: 't-kw-02',
    module: 'Kata Kunci',
    type: 'warning',
    title: 'Fitur Dinonaktifkan',
    message: 'Klasifikasi kata kunci AI tidak dapat dijalankan karena kuota token LLM telah habis.',
    condition: 'Pengguna mengklik tombol klasifikasi saat isTokenExhausted === true.',
  },
  {
    id: 't-kw-03',
    module: 'Kata Kunci',
    type: 'error',
    title: 'Koneksi AI Terputus',
    message: 'Gagal menghubungi server inferensi AI (Request Timeout 504). Silakan coba beberapa saat lagi.',
    condition: 'Permintaan API ke model LLM mengalami timeout atau server AI sedang sibuk.',
    actionLabel: 'Coba Lagi',
  },
  {
    id: 't-kw-04',
    module: 'Kata Kunci',
    type: 'success',
    title: 'Manajemen Kata Kunci',
    message: 'Status kelayakan kata kunci "cara daftar bansos kemensos online 2027" berhasil diubah menjadi Layak.',
    condition: 'Editor menekan tombol override kelayakan pada baris kata kunci tunggal.',
  },
  {
    id: 't-kw-05',
    module: 'Kata Kunci',
    type: 'error',
    title: 'Alasan Wajib Diisi',
    message: 'Harap masukkan catatan editorial mengapa kata kunci ini dinyatakan layak sebelum menyimpan hasil koreksi.',
    condition: 'Editor mengubah kata kunci yang semula dinilai "Tidak Layak" oleh AI tanpa mengisi form alasan pertimbangan.',
  },
  {
    id: 't-kw-06',
    module: 'Kata Kunci',
    type: 'success',
    title: 'Koreksi Massal Berhasil',
    message: 'Sebanyak 8 kata kunci terpilih berhasil diubah status kelayakannya secara massal.',
    condition: 'Editor memilih beberapa checkbox kata kunci dan mengonfirmasi override massal via modal.',
  },
  {
    id: 't-kw-07',
    module: 'Kata Kunci',
    type: 'warning',
    title: 'Pilihan Kosong',
    message: 'Pilih minimal satu kata kunci pada tabel untuk menjalankan aksi kelayakan massal.',
    condition: 'Editor membuka modal override massal tanpa mencentang satu pun baris kata kunci.',
  },

  // 3. Kelompok Topik
  {
    id: 't-cls-01',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'AI Assistant',
    message: 'AI berhasil memperbarui kelompok topik dan menambahkan topik rekomendasi baru berlabel "Baru".',
    condition: 'Pengguna menekan tombol "Buat Kelompok dengan AI" untuk mengelompokkan kata kunci terseleksi.',
  },
  {
    id: 't-cls-02',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'Kanibalisasi Diabaikan',
    message: 'Topik "Panduan Reksadana 2026" ditandai aman dari kanibalisasi internal RRI oleh editor.',
    condition: 'Editor mengonfirmasi modal abaikan kanibalisasi setelah meninjau sudut pandang konten.',
  },
  {
    id: 't-cls-03',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'Topik Berhasil Digabung',
    message: 'Topik "Panduan Reksadana 2026" telah digabung ke artikel pilar "Cara Investasi Reksadana Uang untuk Generasi-Z". Menghitung ulang volume SEO...',
    condition: 'Editor menggabungkan topik duplikat ke dalam artikel pilar utama.',
  },
  {
    id: 't-cls-04',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'Topik Berhasil Dipecah',
    message: 'Topik majemuk berhasil dipecah menjadi 2 topik terpisah dengan kata kunci pilar mandiri.',
    condition: 'Editor memecah kata kunci turunan yang memiliki search intent berbeda menjadi topik baru.',
  },
  {
    id: 't-cls-05',
    module: 'Kelompok Topik',
    type: 'warning',
    title: 'Topik Ditolak',
    message: 'Kelompok topik "Panduan Reksadana 2026" berhasil ditolak dan dicoret dari antrean produksi naskah.',
    condition: 'Editor menolak topik berisiko/tidak relevan dan mencantumkan alasan penolakan redaksional.',
  },
  {
    id: 't-cls-06',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'Topik Berhasil Dipulihkan',
    message: 'Kelompok topik "Panduan Reksadana 2026" telah berhasil dipulihkan dari status ditolak.',
    condition: 'Editor menekan tombol "Pulihkan Topik" pada kartu topik yang sebelumnya dicoret.',
  },
  {
    id: 't-cls-07',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'Peringatan Kanibalisasi Dipulihkan',
    message: 'Kelompok topik "Panduan Reksadana 2026" kembali ke status Butuh Resolusi.',
    condition: 'Editor membatalkan status abaikan kanibalisasi agar tim redaksi dapat meninjau ulang resolusi.',
  },
  {
    id: 't-cls-09',
    module: 'Kelompok Topik',
    type: 'success',
    title: 'Arahan Dibuat',
    message: 'Kelompok topik disetujui untuk diteruskan ke antrean penyusunan Arahan Artikel (Brief Berita).',
    condition: 'Editor menekan tombol "Buat Arahan" pada kartu klaster yang aman dari kanibalisasi.',
  },

  // 4. Arahan Artikel (Brief)
  {
    id: 't-brf-01',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Arahan Artikel Disetujui',
    message: 'Arahan artikel berhasil disetujui oleh Budi Santoso dan dialirkan ke antrean penulisan Draf AI.',
    condition: 'Editor memeriksa dan menyetujui struktur brief liputan di halaman detail.',
  },
  {
    id: 't-brf-02',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Perubahan Tersimpan',
    message: 'Seluruh suntingan inline pada naskah arahan artikel berhasil disimpan ke sistem.',
    condition: 'Editor menekan tombol secondary "Simpan Perubahan" setelah mengedit outline/sudut pandang.',
  },
  {
    id: 't-brf-03',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Arahan Artikel Dibuat Ulang',
    message: 'Arahan artikel berhasil dibuat ulang',
    condition: 'Editor menekan tombol "Buat Ulang Arahan dengan AI" saat token tersedia.',
  },
  {
    id: 't-brf-04',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Naskah Terkunci',
    message: 'Naskah arahan artikel berhasil diambil dan dikunci atas nama Siti Rahmawati.',
    condition: 'Editor membuka naskah yang berstatus "Tersedia" untuk mulai mengerjakan verifikasi.',
  },
  {
    id: 't-brf-06',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Naskah Dilepas',
    message: 'Kunci editorial dilepas. Naskah kini kembali berstatus "Tersedia" untuk seluruh tim redaksi.',
    condition: 'Pemilik naskah menekan tombol "Lepas Arahan Artikel".',
  },
  {
    id: 't-brf-07',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Proses Dimuat Ulang',
    message: 'Status arahan artikel berhasil dikembalikan ke antrean pemrosesan AI.',
    condition: 'Admin menekan tombol "Muat Ulang" pada baris naskah yang gagal terproses.',
  },
  {
    id: 't-brf-08',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Ekspor Dokumen',
    message: 'Arahan artikel berhasil diekspor sebagai dokumen Docs (.doc).',
    condition: 'Pengguna menekan opsi ekspor dokumen Microsoft Word pada dropdown aksi naskah.',
  },
  {
    id: 't-brf-09',
    module: 'Arahan Artikel',
    type: 'success',
    title: 'Ekspor PDF',
    message: 'Membuka jendela cetak peramban untuk menyimpan Arahan Artikel sebagai PDF.',
    condition: 'Pengguna memilih opsi ekspor PDF.',
  },

  // 5. Draf Berita (Draft)
  {
    id: 't-dft-03',
    module: 'Draf Berita',
    type: 'success',
    title: 'Naskah Terkunci',
    message: 'Draf berita berhasil diambil dan dikunci atas nama Siti Rahmawati.',
    condition: 'Editor mengambil naskah draft berstatus "Tersedia".',
  },
  {
    id: 't-dft-05',
    module: 'Draf Berita',
    type: 'success',
    title: 'Salin Berhasil',
    message: 'Seluruh naskah draf berita (Judul, Lead, Isi, dan Metadata) telah disalin ke clipboard.',
    condition: 'Editor mengklik tombol "Salin Semua".',
  },
  {
    id: 't-dft-06',
    module: 'Draf Berita',
    type: 'success',
    title: 'Salin Berhasil',
    message: 'Paket Metadata SEO (Meta Title, Description, Keyword Density) telah disalin ke clipboard.',
    condition: 'Editor mengklik tombol "Salin Paket Metadata SEO".',
  },
  {
    id: 't-dft-07',
    module: 'Draf Berita',
    type: 'success',
    title: 'Salin Berhasil',
    message: 'Rekomendasi Prompt Gambar Dari AI telah disalin ke clipboard untuk generator visual.',
    condition: 'Editor mengklik tombol "Salin Rekomendasi Prompt Gambar Dari AI".',
  },

  // 6. Pengaturan Redaksi
  {
    id: 't-set-01',
    module: 'Pengaturan Redaksi',
    type: 'success',
    title: 'Pengaturan Redaksi',
    message: 'Aturan filter kata kunci baru "Larangan Judi Online & Slot" berhasil ditambahkan.',
    condition: 'Admin menyimpan modal pembuatan aturan filter baru.',
  },
  {
    id: 't-set-02',
    module: 'Pengaturan Redaksi',
    type: 'error',
    title: 'Validasi Gagal',
    message: 'Nama aturan wajib diisi dan tidak boleh sama dengan aturan yang sudah terdaftar.',
    condition: 'Admin mengosongkan nama aturan atau memasukkan nama yang sudah pernah ada.',
  },
  {
    id: 't-set-03',
    module: 'Pengaturan Redaksi',
    type: 'success',
    title: 'Status Aturan',
    message: 'Status aturan filter kata kunci berhasil diubah menjadi Nonaktif.',
    condition: 'Admin mengklik switch toggle status aktif/nonaktif pada tabel aturan.',
  },
  {
    id: 't-set-04',
    module: 'Pengaturan Redaksi',
    type: 'warning',
    title: 'Pengaturan Redaksi',
    message: 'Aturan filter kata kunci berhasil dihapus dari sistem redaksi.',
    condition: 'Admin mengonfirmasi modal hapus aturan filter.',
  },
  {
    id: 't-set-05',
    module: 'Pengaturan Redaksi',
    type: 'success',
    title: 'Buku Gaya Redaksi',
    message: 'Pedoman Buku Gaya Editorial berhasil disimpan dan diterapkan pada generasi draf AI.',
    condition: 'Admin menekan tombol "Simpan Pengaturan Buku Gaya".',
  },
  {
    id: 't-set-06',
    module: 'Pengaturan Redaksi',
    type: 'success',
    title: 'Retensi Berkas CSV',
    message: 'Kebijakan retensi CSV berhasil diperbarui: Berkas akan dihapus otomatis setelah 7 hari.',
    condition: 'Admin memperbarui dropdown durasi retensi file CSV.',
  },

  // 7. Manajemen Pengguna
  {
    id: 't-usr-01',
    module: 'Manajemen Pengguna',
    type: 'success',
    title: 'Manajemen Pengguna',
    message: 'Pengguna Siti Rahmawati (siti.rahmawati@rri.co.id) berhasil didaftarkan ke sistem.',
    condition: 'Admin mengisi form tambah pengguna dan mengonfirmasi pembuatan akun.',
  },
  {
    id: 't-usr-02',
    module: 'Manajemen Pengguna',
    type: 'error',
    title: 'Format Email Salah',
    message: 'Harap masukkan alamat email resmi yang valid (contoh: nama@rri.co.id).',
    condition: 'Admin memasukkan format email yang salah atau tanpa domain valid.',
  },
  {
    id: 't-usr-03',
    module: 'Manajemen Pengguna',
    type: 'warning',
    title: 'Manajemen Pengguna',
    message: 'Akun pengguna Dewi Lestari telah dinonaktifkan.',
    condition: 'Admin menonaktifkan akun editor melalui tombol toggle status.',
  },
  {
    id: 't-usr-04',
    module: 'Manajemen Pengguna',
    type: 'error',
    title: 'Aksi Ditolak',
    message: 'Anda tidak dapat menonaktifkan akun Anda sendiri yang sedang aktif digunakan.',
    condition: 'Admin mencoba menonaktifkan akun yang sedang digunakan saat ini (self-deactivation).',
  },
  {
    id: 't-usr-05',
    module: 'Manajemen Pengguna',
    type: 'warning',
    title: 'Manajemen Pengguna',
    message: 'Pengguna Rian Pratama berhasil dihapus dari sistem redaksi.',
    condition: 'Admin mengonfirmasi modal hapus pengguna.',
  },

  // 8. Sistem & Sesi
  {
    id: 't-sys-01',
    module: 'Sistem & Sesi',
    type: 'warning',
    title: 'Kuota Token Habis',
    message: 'Simulasi: Kuota token LLM telah habis. Seluruh fitur pemrosesan dan generasi AI dinonaktifkan.',
    condition: 'Administrator menyalakan sakelar simulasi kuota token habis pada halaman konfigurasi.',
  },
  {
    id: 't-sys-02',
    module: 'Sistem & Sesi',
    type: 'success',
    title: 'Kuota Token Aktif',
    message: 'Simulasi: Kuota token LLM telah dipulihkan (Aktif). Fitur AI dapat digunakan kembali secara normal.',
    condition: 'Administrator memulihkan kuota token ke status normal.',
  },
  {
    id: 't-sys-03',
    module: 'Sistem & Sesi',
    type: 'error',
    title: 'Koneksi Terputus',
    message: 'Koneksi internet Anda terputus. Beberapa aksi perubahan mungkin belum tersimpan ke server.',
    condition: 'Peramban mendeteksi status offline (navigator.onLine === false).',
    actionLabel: 'Muat Ulang',
  },
]

export const ToastDocPage: React.FC = () => {
  const { setCurrentPage } = useApp()
  const { showSuccess, showWarning, showError, showInfo } = useToast()

  const [selectedModule, setSelectedModule] = useState<string>('Semua')
  const [selectedType, setSelectedType] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const modules = [
    'Semua',
    'Impor CSV',
    'Kata Kunci',
    'Kelompok Topik',
    'Arahan Artikel',
    'Draf Berita',
    'Pengaturan Redaksi',
    'Manajemen Pengguna',
    'Sistem & Sesi',
  ]

  const filteredToasts = TOAST_CATALOG.filter((item) => {
    const matchModule = selectedModule === 'Semua' || item.module === selectedModule
    const matchType = selectedType === 'Semua' || item.type === selectedType
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condition.toLowerCase().includes(searchQuery.toLowerCase())
    return matchModule && matchType && matchSearch
  })

  // Trigger the actual live toast in UI
  const handleTriggerToast = (item: ToastDocItem) => {
    if (item.type === 'success') {
      showSuccess(item.title, item.message, item.actionLabel)
    } else if (item.type === 'warning') {
      showWarning(item.title, item.message, item.actionLabel)
    } else if (item.type === 'error') {
      showError(item.title, item.message, item.actionLabel)
    } else {
      showInfo(item.title, item.message, item.actionLabel)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <button
            type="button"
            onClick={() => setCurrentPage('konfigurasi')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1866EF] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Konfigurasi</span>
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Katalog & Dokumentasi Toast Notifikasi
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#1866EF] border border-blue-200">
              {TOAST_CATALOG.length} Skenario
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Spesifikasi interaktif seluruh notifikasi sistem (Success, Warning, Error) untuk seluruh alur kerja redaksi dan edge case aplikasi. Tim developer dapat menguji langsung (*live test*) notifikasi pada layar.
          </p>
        </div>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan judul toast, pesan, atau skenario pemicu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
            />
          </div>

          {/* Filter by Type */}
          <div className="flex items-center gap-1.5 shrink-0 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Tipe:</span>
            </span>
            {[
              { label: 'Semua', value: 'Semua' },
              { label: 'Success', value: 'success' },
              { label: 'Warning', value: 'warning' },
              { label: 'Error', value: 'error' },
            ].map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setSelectedType(t.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedType === t.value
                    ? 'bg-[#1866EF] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Module (Pill tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
          <span className="text-xs font-medium text-slate-500 shrink-0 mr-1">Modul:</span>
          {modules.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedModule(m)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
                selectedModule === m
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Grid of Toast Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Menampilkan <strong>{filteredToasts.length}</strong> dari <strong>{TOAST_CATALOG.length}</strong> template notifikasi
          </span>
          <span className="text-slate-400">
            Klik tombol <strong>Uji Toast Ini</strong> untuk memicu popup notifikasi secara real-time.
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredToasts.map((item) => {
            const isSuccess = item.type === 'success'
            const isWarning = item.type === 'warning'
            const isError = item.type === 'error'

            return (
              <div
                key={item.id}
                className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all space-y-4"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {item.module}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isSuccess
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isWarning
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : isError
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live Test Button */}
                    <button
                      type="button"
                      onClick={() => handleTriggerToast(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs ${
                        isSuccess
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : isWarning
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : isError
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Uji Toast Ini</span>
                    </button>
                  </div>
                </div>

                {/* Edge Case Description */}
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">Kondisi / Skenario Pemicu: </span>
                  <span className="leading-relaxed">{item.condition}</span>
                </div>

                {/* Visual Toast Preview (Exact Same Styling as ToastContext.tsx) */}
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Tampilan Visual Toast (Preview):
                  </div>
                  <div
                    className={`flex items-start gap-3.5 p-4 rounded-xl border shadow-sm ${
                      isSuccess
                        ? 'bg-emerald-50/95 border-emerald-200 text-emerald-950'
                        : isWarning
                        ? 'bg-amber-50/95 border-amber-200 text-amber-950'
                        : isError
                        ? 'bg-rose-50/95 border-rose-200 text-rose-950'
                        : 'bg-blue-50/95 border-blue-200 text-blue-950'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                      {isError && <XCircle className="w-5 h-5 text-rose-600" />}
                      {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-blue-600" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold tracking-wider uppercase mb-0.5 opacity-75">
                        {item.title}
                      </div>
                      <div className="text-sm font-medium leading-relaxed break-words">
                        {item.message}
                      </div>
                    </div>

                    {item.actionLabel && (
                      <div className="shrink-0 ml-2">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                            isSuccess
                              ? 'text-emerald-800 bg-emerald-200/50 border-emerald-300'
                              : isWarning
                              ? 'text-amber-800 bg-amber-200/50 border-amber-300'
                              : isError
                              ? 'text-rose-800 bg-rose-200/50 border-rose-300'
                              : 'text-blue-800 bg-blue-200/50 border-blue-300'
                          }`}
                        >
                          {item.actionLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {filteredToasts.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-600">Tidak ada toast yang cocok dengan filter pencarian.</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian atau modul yang lain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
