import React, { useState } from 'react'
import {
  ArrowLeft,
  ShieldAlert,
  ShieldOff,
  FileQuestion,
  ServerCrash,
  UploadCloud,
  FileClock,
  KeyRound,
  SearchX,
  Split,
  Network,
  FolderSearch,
  FileText,
  Newspaper,
  FileSearch,
  Inbox,
  Cpu,
  Users,
  Edit3,
  Activity,
  SlidersHorizontal,
  BookOpen,
  UserX,
  Filter,
  Search,
  Sparkles,
  RefreshCw,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export interface ErrorEmptyItem {
  id: string
  category: 'error' | 'empty'
  module:
    | 'Autentikasi & Sistem'
    | 'Impor CSV'
    | 'Kata Kunci'
    | 'Keyword Gap'
    | 'Kelompok Topik'
    | 'Arahan Artikel'
    | 'Draf Berita'
    | 'Ringkasan'
    | 'Pengaturan Redaksi'
    | 'Manajemen Pengguna'
    | 'Audit Log'
  role: 'Semua Role' | 'Khusus Editor' | 'Khusus Admin'
  httpCode?: string
  title: string
  description: string
  triggerCondition: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  primaryActionLabel?: string
  primaryActionIcon?: React.ElementType
  secondaryActionLabel?: string
  technicalNotes: string
}

const ERROR_EMPTY_CATALOG: ErrorEmptyItem[] = [
  // ==========================================
  // BAGIAN 1: ERROR PAGES (FULL-PAGE LEVEL)
  // ==========================================
  {
    id: 'ERR-401',
    category: 'error',
    module: 'Autentikasi & Sistem',
    role: 'Semua Role',
    httpCode: 'HTTP 401: Unauthorized',
    title: 'Sesi Anda Telah Berakhir',
    description:
      'Untuk menjaga keamanan akun dan data redaksi RRI Digital, silakan masuk kembali dengan kredensial resmi Anda.',
    triggerCondition:
      'Token otentikasi JWT kedaluwarsa, sesi tidak valid di peramban, atau pengguna mencoba mengakses endpoint tanpa login.',
    icon: ShieldAlert,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50 border-amber-200',
    primaryActionLabel: 'Masuk Kembali ke Akun',
    technicalNotes:
      'Lakukan clear storage/cookie, redirect pengguna ke rute login (/login) dengan parameter ?redirect=<url_saat_ini> agar otomatis kembali setelah login.',
  },
  {
    id: 'ERR-403-ROLE',
    category: 'error',
    module: 'Autentikasi & Sistem',
    role: 'Khusus Editor',
    httpCode: 'HTTP 403: Forbidden',
    title: 'Akses Terbatas: Khusus Administrator',
    description:
      'Halaman ini memerlukan hak akses tingkat Administrator. Akun Editor Anda saat ini tidak memiliki wewenang untuk melihat atau memodifikasi modul ini.',
    triggerCondition:
      'Pengguna berstatus Editor mencoba mengakses menu/rute khusus Admin (seperti Manajemen Pengguna, Pengaturan Redaksi, atau Konfigurasi Token).',
    icon: ShieldOff,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50 border-rose-200',
    primaryActionLabel: 'Kembali ke Ringkasan Editor',
    secondaryActionLabel: 'Hubungi Admin Redaksi',
    technicalNotes:
      'Ditangani secara presisi oleh Route Guard di sisi router React sebelum komponen halaman dipasang.',
  },
  {
    id: 'ERR-404',
    category: 'error',
    module: 'Autentikasi & Sistem',
    role: 'Semua Role',
    httpCode: 'HTTP 404: Not Found',
    title: 'Halaman atau Data Tidak Ditemukan',
    description:
      'Tautan yang Anda tuju mungkin salah ketik, telah dipindahkan, atau naskah tersebut sudah tidak tersedia di sistem redaksi RRI Digital.',
    triggerCondition:
      'URL tidak terdaftar di router (* wildcard fallback), atau ID naskah pada parameter URL tidak ditemukan pada database.',
    icon: FileQuestion,
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-100 border-slate-200',
    primaryActionLabel: 'Kembali ke Ringkasan',
    secondaryActionLabel: 'Periksa Daftar Naskah',
    technicalNotes:
      'Fallback route universal untuk seluruh tautan naskah atau sub-halaman yang tidak valid.',
  },
  {
    id: 'ERR-500',
    category: 'error',
    module: 'Autentikasi & Sistem',
    role: 'Semua Role',
    httpCode: 'HTTP 500: Internal Server Error',
    title: 'Terjadi Gangguan pada Server AI',
    description:
      'Sistem kecerdasan buatan sedang mengalami kendala komunikasi atau beban server tinggi. Data Anda aman dan tidak ada perubahan yang hilang.',
    triggerCondition:
      'API gateway LLM gagal merespons, server backend mengalami crash runtime, atau koneksi basis data terputus di sisi server.',
    icon: ServerCrash,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50 border-rose-200',
    primaryActionLabel: 'Coba Lagi (Retry)',
    primaryActionIcon: RefreshCw,
    secondaryActionLabel: 'Laporkan Kendala Sistem',
    technicalNotes:
      'Sertakan tombol coba lagi (retry function) serta tampilkan Transaction/Error Reference ID unik untuk investigasi log server.',
  },

  // ==========================================
  // BAGIAN 2: EMPTY STATES (IN-PAGE / TABULAR)
  // ==========================================

  // 1. Impor CSV
  {
    id: 'EMP-IMP-01',
    category: 'empty',
    module: 'Impor CSV',
    role: 'Khusus Admin',
    title: 'Tarik & Lepas Berkas CSV SEMrush Anda di Sini',
    description:
      'Mendukung format berkas .csv dari ekspor Semrush Keyword Magic Tool atau Organic Research (Maksimal ukuran 15 MB).',
    triggerCondition:
      'Area dropzone unggah berkas CSV saat pertama kali dibuka sebelum pengguna memilih atau menyeret berkas.',
    icon: UploadCloud,
    iconColor: 'text-[#1866EF]',
    iconBg: 'bg-blue-50 border-blue-200',
    primaryActionLabel: 'Pilih Berkas dari Komputer',
    technicalNotes:
      'Komponen Dropzone interaktif dengan event drag-and-drop dan input type="file" berfilter accept=".csv".',
  },
  {
    id: 'EMP-IMP-02',
    category: 'empty',
    module: 'Impor CSV',
    role: 'Khusus Admin',
    title: 'Belum Ada Riwayat Impor Berkas',
    description:
      'Seluruh berkas CSV kata kunci yang berhasil diproses akan tercatat otomatis di tabel ini beserta metadata, jumlah baris, dan statusnya.',
    triggerCondition:
      'Tabel riwayat unggah berkas CSV saat database sistem masih baru dan belum pernah ada berkas yang diimpor.',
    icon: FileClock,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    technicalNotes:
      'State informasional pada kontainer tabel riwayat; tidak memerlukan aksi tombol klik.',
  },

  // 2. Kata Kunci
  {
    id: 'EMP-KW-01',
    category: 'empty',
    module: 'Kata Kunci',
    role: 'Semua Role',
    title: 'Bank Kata Kunci Masih Kosong',
    description:
      'Belum ada data kata kunci yang tersimpan. Silakan impor berkas CSV dari Semrush untuk mulai mengolah kata kunci dengan AI.',
    triggerCondition:
      'Halaman Kata Kunci dibuka ketika belum ada satu pun data kata kunci yang diimpor ke sistem.',
    icon: KeyRound,
    iconColor: 'text-[#1866EF]',
    iconBg: 'bg-blue-50 border-blue-200',
    primaryActionLabel: 'Impor Berkas CSV Semrush',
    technicalNotes:
      'Mengarahkan langsung pengguna ke halaman Impor CSV saat tombol aksi diklik.',
  },
  {
    id: 'EMP-KW-02',
    category: 'empty',
    module: 'Kata Kunci',
    role: 'Semua Role',
    title: 'Tidak Ada Kata Kunci yang Cocok',
    description:
      'Pencarian kata kunci dengan filter volume, intent, atau status yang Anda pilih tidak membuahkan hasil. Coba ubah ejaan atau reset filter pencarian.',
    triggerCondition:
      'Pengguna memasukkan kata pencarian atau filter kombinasi yang tidak menghasilkan baris data pada tabel kata kunci.',
    icon: SearchX,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Filter & Pencarian',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mengembalikan state search query menjadi string kosong dan mereset seluruh filter dropdown ke opsi default (Semua).',
  },

  // 3. Keyword Gap
  {
    id: 'EMP-GAP-01',
    category: 'empty',
    module: 'Keyword Gap',
    role: 'Semua Role',
    title: 'Belum Ada Data Keyword Gap',
    description:
      'Analisis peluang kata kunci kompetitor belum tersedia. Unggah berkas ekspor Keyword Gap untuk melihat kata kunci yang belum digarap redaksi RRI.',
    triggerCondition:
      'Halaman Perbandingan Kata Kunci (Keyword Gap) saat belum ada data kompetitor yang diunggah.',
    icon: Split,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50 border-indigo-200',
    primaryActionLabel: 'Unggah CSV Keyword Gap',
    technicalNotes:
      'Menampilkan modal atau membuka form pengunggahan berkas pembanding kompetitor.',
  },
  {
    id: 'EMP-GAP-02',
    category: 'empty',
    module: 'Keyword Gap',
    role: 'Semua Role',
    title: 'Tidak Ada Peluang Kata Kunci yang Cocok',
    description:
      'Filter pencarian atau batasan volume Anda saat ini tidak menampilkan peluang kata kunci. Cobalah melonggarkan batas volume atau kata kunci target.',
    triggerCondition:
      'Filter atau pencarian pada tabel Keyword Gap menghasilkan 0 baris perbandingan.',
    icon: SearchX,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Filter Gap',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset filter range volume dan keyword gap ke kondisi default.',
  },

  // 4. Kelompok Topik
  {
    id: 'EMP-CLS-01',
    category: 'empty',
    module: 'Kelompok Topik',
    role: 'Semua Role',
    title: 'Belum Ada Kelompok Topik yang Dibuat',
    description:
      'Kelompokkan ratusan kata kunci yang layak menjadi gugus topik terstruktur agar naskah artikel tidak saling tumpang tindih.',
    triggerCondition:
      'Halaman Kelompok Topik saat kata kunci sudah ada tetapi pengguna belum pernah menjalankan pembuatan kelompok dengan AI.',
    icon: Network,
    iconColor: 'text-[#1866EF]',
    iconBg: 'bg-blue-50 border-blue-200',
    primaryActionLabel: 'Buat Kelompok dengan AI',
    primaryActionIcon: Sparkles,
    technicalNotes:
      'Memicu fungsi generate clusters AI. Jika status isTokenExhausted === true, tombol ini wajib dalam status disabled dengan tooltip kuota habis.',
  },
  {
    id: 'EMP-CLS-02',
    category: 'empty',
    module: 'Kelompok Topik',
    role: 'Semua Role',
    title: 'Kelompok Topik Tidak Ditemukan',
    description:
      'Tidak ada kelompok topik yang sesuai dengan filter intent, status kanibalisasi, atau kata kunci pencarian yang Anda masukkan.',
    triggerCondition:
      'Pencarian nama topik atau penyaringan filter status kelompok topik menghasilkan 0 kartu klaster.',
    icon: FolderSearch,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Pencarian Topik',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset input pencarian nama topik dan mengembalikan filter intent ke Semua.',
  },

  // 5. Arahan Artikel
  {
    id: 'EMP-BRF-01',
    category: 'empty',
    module: 'Arahan Artikel',
    role: 'Semua Role',
    title: 'Belum Ada Arahan Artikel yang Dibuat',
    description:
      'Arahan artikel berfungsi sebagai panduan penulisan terstruktur bagi jurnalis dan editor. Mulai buat arahan dari kelompok topik yang telah siap.',
    triggerCondition:
      'Tabel Arahan Artikel saat belum ada satu pun arahan artikel yang dialirkan dari kelompok topik.',
    icon: FileText,
    iconColor: 'text-[#1866EF]',
    iconBg: 'bg-blue-50 border-blue-200',
    primaryActionLabel: 'Pilih dari Kelompok Topik',
    technicalNotes:
      'Mengarahkan pengguna ke menu Kelompok Topik untuk memilih klaster yang siap dibuatkan arahan.',
  },
  {
    id: 'EMP-BRF-02',
    category: 'empty',
    module: 'Arahan Artikel',
    role: 'Semua Role',
    title: 'Arahan Artikel Tidak Ditemukan',
    description:
      'Tidak ada arahan artikel yang memenuhi kriteria kata pencarian judul naskah atau filter status persetujuan yang Anda pilih.',
    triggerCondition:
      'Pencarian judul arahan atau filter status pada tabel arahan artikel menghasilkan 0 baris.',
    icon: SearchX,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Filter Arahan',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset filter status persetujuan dan input pencarian judul naskah arahan artikel.',
  },

  // 6. Draf Berita
  {
    id: 'EMP-DFT-01',
    category: 'empty',
    module: 'Draf Berita',
    role: 'Semua Role',
    title: 'Belum Ada Draf Artikel yang Siap Diperiksa',
    description:
      'Draf naskah lengkap dibuat otomatis setelah arahan artikel disetujui oleh editor. Setujui arahan artikel terlebih dahulu untuk membuat draf.',
    triggerCondition:
      'Tabel Draf Artikel saat belum ada arahan artikel yang disetujui atau draf yang digenerate AI.',
    icon: Newspaper,
    iconColor: 'text-[#1866EF]',
    iconBg: 'bg-blue-50 border-blue-200',
    primaryActionLabel: 'Buka Arahan Artikel',
    technicalNotes:
      'Mengarahkan pengguna ke menu Arahan Artikel untuk meninjau dan menyetujui naskah.',
  },
  {
    id: 'EMP-DFT-02',
    category: 'empty',
    module: 'Draf Berita',
    role: 'Semua Role',
    title: 'Draf Artikel Tidak Ditemukan',
    description:
      'Tidak ada draf artikel yang cocok dengan kata pencarian atau filter status kepemilikan yang Anda pilih saat ini.',
    triggerCondition:
      'Pencarian judul naskah berita atau filter status pada tabel draf artikel menghasilkan 0 baris.',
    icon: FileSearch,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Filter Draf',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset pencarian judul draf dan mengembalikan status filter ke seluruh naskah.',
  },

  // 7. Ringkasan (Dashboard)
  {
    id: 'EMP-SUM-01',
    category: 'empty',
    module: 'Ringkasan',
    role: 'Semua Role',
    title: 'Semua Tugas Redaksi Selesai',
    description:
      'Bagus sekali! Tidak ada arahan artikel baru yang menunggu persetujuan dan tidak ada draf artikel yang menunggu diperiksa.',
    triggerCondition:
      'Komponen Daftar Tugas pada halaman Ringkasan saat antrean naskah berstatus Tersedia bernilai 0.',
    icon: Inbox,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50 border-emerald-200',
    primaryActionLabel: 'Lihat Semua Arahan',
    technicalNotes:
      'Menampilkan banner apresiasi bahwa antrean tugas naskah telah bersih.',
  },
  {
    id: 'EMP-SUM-02',
    category: 'empty',
    module: 'Ringkasan',
    role: 'Semua Role',
    title: 'Belum Ada Catatan Keputusan AI',
    description:
      'AI belum mencatat evaluasi kelayakan atau alasan formulasi naskah untuk kategori yang dipilih saat ini.',
    triggerCondition:
      'Tab pada tabel Daftar Keputusan AI di menu Ringkasan dibuka saat modul terkait belum memiliki data keputusan.',
    icon: Cpu,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Mulai Alur AI',
    technicalNotes:
      'Mengarahkan pengguna ke modul terkait untuk memulai inferensi AI.',
  },
  {
    id: 'EMP-SUM-03',
    category: 'empty',
    module: 'Ringkasan',
    role: 'Semua Role',
    title: 'Tidak Ada Naskah yang Terkunci',
    description:
      'Saat ini seluruh naskah artikel berstatus bebas dan tidak ada yang sedang dikunci aktif oleh editor manapun.',
    triggerCondition:
      'Komponen Audit Kepemilikan Naskah & Status Kunci Editor saat tidak ada naskah yang berstatus Terkunci.',
    icon: Users,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    technicalNotes:
      'State informasional pada card audit kepemilikan naskah.',
  },
  {
    id: 'EMP-SUM-04',
    category: 'empty',
    module: 'Ringkasan',
    role: 'Semua Role',
    title: 'Belum Ada Tindakan Koreksi atau Salin Konten',
    description:
      'Belum ada data editor yang melakukan persetujuan arahan atau penyalinan paket konten pada tab modul ini.',
    triggerCondition:
      'Tab pada tabel Daftar Koreksi oleh Editor di menu Ringkasan belum memiliki rekaman tindakan.',
    icon: Edit3,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    technicalNotes:
      'State informasional di dalam container tabel koreksi editor.',
  },
  {
    id: 'EMP-SUM-05',
    category: 'empty',
    module: 'Ringkasan',
    role: 'Semua Role',
    title: 'Belum Ada Aktivitas Editor Tercatat',
    description:
      'Seluruh aktivitas persetujuan, inline editing, dan penyalinan artikel akan muncul otomatis di sini.',
    triggerCondition:
      'Komponen Aktivitas Terbaru di menu Ringkasan saat belum ada log aktivitas yang tercatat dari editor.',
    icon: Activity,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    technicalNotes:
      'State informasional pada feed riwayat aktivitas editor.',
  },

  // 8. Pengaturan Redaksi & Buku Gaya
  {
    id: 'EMP-SET-01',
    category: 'empty',
    module: 'Pengaturan Redaksi',
    role: 'Khusus Admin',
    title: 'Belum Ada Aturan Redaksi Tambahan',
    description:
      'Sistem saat ini menggunakan standar baku redaksi RRI Digital. Anda dapat menambahkan aturan khusus seperti kata terlarang atau pedoman ejaan.',
    triggerCondition:
      'Tab Aturan Redaksi saat seluruh aturan khusus dinonaktifkan atau belum dibuat.',
    icon: SlidersHorizontal,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Tambah Aturan Baru',
    primaryActionIcon: Plus,
    technicalNotes:
      'Membuka modal penambahan aturan filter kata kunci baru.',
  },
  {
    id: 'EMP-SET-02',
    category: 'empty',
    module: 'Pengaturan Redaksi',
    role: 'Khusus Admin',
    title: 'Daftar Buku Gaya Masih Kosong',
    description:
      'Belum ada entri pedoman kata baku, singkatan resmi, atau istilah khusus jurnalistik yang didaftarkan ke sistem.',
    triggerCondition:
      'Tab Buku Gaya saat daftar entri kata baku/istilah kosong.',
    icon: BookOpen,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Tambah Entri Buku Gaya',
    primaryActionIcon: Plus,
    technicalNotes:
      'Membuka form penambahan lema kata buku gaya.',
  },
  {
    id: 'EMP-SET-03',
    category: 'empty',
    module: 'Pengaturan Redaksi',
    role: 'Khusus Admin',
    title: 'Aturan Redaksi Tidak Ditemukan',
    description:
      'Tidak ada aturan redaksi atau entri buku gaya yang sesuai dengan kata kunci pencarian Anda.',
    triggerCondition:
      'Pencarian nama aturan atau kata lema pada menu Pengaturan Redaksi menghasilkan 0 hasil.',
    icon: SearchX,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Pencarian',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset input pencarian aturan redaksi.',
  },

  // 9. Manajemen Pengguna
  {
    id: 'EMP-USR-01',
    category: 'empty',
    module: 'Manajemen Pengguna',
    role: 'Khusus Admin',
    title: 'Pengguna Tidak Ditemukan',
    description:
      'Tidak ada staf redaksi atau akun yang cocok dengan nama atau filter role yang Anda pilih.',
    triggerCondition:
      'Pencarian nama atau email pengguna pada tabel Manajemen Pengguna tidak menemukan kecocokan.',
    icon: UserX,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Reset Pencarian Pengguna',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset input pencarian nama/email pengguna dan filter role.',
  },
  {
    id: 'EMP-USR-02',
    category: 'empty',
    module: 'Manajemen Pengguna',
    role: 'Khusus Admin',
    title: 'Belum Ada Anggota Tim Redaksi Lain',
    description:
      'Undang atau daftarkan Editor Redaksi RRI Digital untuk mulai berkolaborasi dalam mengelola dan menyetujui naskah.',
    triggerCondition:
      'Tabel pengguna hanya berisi satu akun superadmin tanpa anggota editor lainnya.',
    icon: Users,
    iconColor: 'text-[#1866EF]',
    iconBg: 'bg-blue-50 border-blue-200',
    primaryActionLabel: 'Tambah Pengguna Baru',
    primaryActionIcon: Plus,
    technicalNotes:
      'Membuka modal pendaftaran pengguna baru.',
  },

  // 10. Audit Log
  {
    id: 'EMP-LOG-01',
    category: 'empty',
    module: 'Audit Log',
    role: 'Khusus Admin',
    title: 'Tidak Ada Rekaman Log pada Periode Ini',
    description:
      'Tidak ditemukan aktivitas sistem atau riwayat perubahan data pada filter tanggal dan kategori yang Anda tentukan.',
    triggerCondition:
      'Penyaringan tanggal atau kategori tindakan pada tabel Audit Log menghasilkan 0 rekaman.',
    icon: FileClock,
    iconColor: 'text-slate-400',
    iconBg: 'bg-slate-50 border-slate-200',
    primaryActionLabel: 'Kembalikan ke Semua Log',
    primaryActionIcon: RotateCcw,
    technicalNotes:
      'Mereset filter rentang tanggal dan modul aksi ke opsi Semua.',
  },
]

export const ErrorEmptyDocPage: React.FC = () => {
  const { setCurrentPage } = useApp()

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua')
  const [selectedModule, setSelectedModule] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const modules = [
    'Semua',
    'Autentikasi & Sistem',
    'Impor CSV',
    'Kata Kunci',
    'Keyword Gap',
    'Kelompok Topik',
    'Arahan Artikel',
    'Draf Berita',
    'Ringkasan',
    'Pengaturan Redaksi',
    'Manajemen Pengguna',
    'Audit Log',
  ]

  const filteredItems = ERROR_EMPTY_CATALOG.filter((item) => {
    const matchCategory =
      selectedCategory === 'Semua' ||
      (selectedCategory === 'error' && item.category === 'error') ||
      (selectedCategory === 'empty' && item.category === 'empty')

    const matchModule = selectedModule === 'Semua' || item.module === selectedModule

    const matchSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.triggerCondition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.httpCode && item.httpCode.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchCategory && matchModule && matchSearch
  })

  const errorCount = ERROR_EMPTY_CATALOG.filter((i) => i.category === 'error').length
  const emptyCount = ERROR_EMPTY_CATALOG.filter((i) => i.category === 'empty').length

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
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Katalog & Dokumentasi Error & Empty Page
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                {errorCount} Error Pages
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#1866EF] border border-blue-200">
                {emptyCount} Empty States
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Spesifikasi visual dan interaktif untuk seluruh Error Page sistem (401, 403, 404, 500) serta variasi Empty State pada tabel dan modul. Dirancang sesuai desain sistem RRI Digital dengan icon resmi Lucide dan standar UX redaksi.
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
              placeholder="Cari berdasarkan ID (ERR-401, EMP-KW-01), judul, modul, pemicu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
            />
          </div>

          {/* Filter by Category */}
          <div className="flex items-center gap-1.5 shrink-0 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Kategori:</span>
            </span>
            {[
              { label: 'Semua', value: 'Semua' },
              { label: 'Error Pages (4)', value: 'error' },
              { label: 'Empty States (19)', value: 'empty' },
            ].map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedCategory(c.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === c.value
                    ? 'bg-[#1866EF] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.label}
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

      {/* 3. Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Menampilkan <strong>{filteredItems.length}</strong> dari <strong>{ERROR_EMPTY_CATALOG.length}</strong> spesifikasi antarmuka
          </span>
          <span className="text-slate-400">
            Seluruh komponen disajikan dengan pratinjau visual langsung (*exact layout*).
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => {
            const isError = item.category === 'error'
            const IconComponent = item.icon
            const ActionIconComponent = item.primaryActionIcon

            return (
              <div
                key={item.id}
                className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all space-y-4"
              >
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                        isError
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-blue-50 text-[#1866EF] border-blue-200'
                      }`}
                    >
                      {item.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {item.module}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isError
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isError ? 'Error Page (Full-Page)' : 'Empty State (In-Page)'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                      {item.role}
                    </span>
                    {item.httpCode && (
                      <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {item.httpCode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Trigger Condition */}
                <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-200/70">
                  <span className="font-bold text-slate-800">Kondisi / Pemicu Kejadian: </span>
                  <span className="leading-relaxed">{item.triggerCondition}</span>
                </div>

                {/* Visual Preview Container */}
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Tampilan Visual Antarmuka (Preview):
                  </div>

                  {isError ? (
                    // Preview for Error Page (Centered Card Layout)
                    <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-xl mx-auto shadow-2xs">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border ${item.iconBg}`}
                      >
                        <IconComponent className={`w-7 h-7 ${item.iconColor}`} />
                      </div>

                      {item.httpCode && (
                        <span className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase mb-1">
                          {item.httpCode}
                        </span>
                      )}

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-2.5">
                        {item.primaryActionLabel && (
                          <button
                            type="button"
                            className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                          >
                            {ActionIconComponent && <ActionIconComponent className="w-3.5 h-3.5" />}
                            <span>{item.primaryActionLabel}</span>
                          </button>
                        )}
                        {item.secondaryActionLabel && (
                          <button
                            type="button"
                            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            {item.secondaryActionLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Preview for Empty State (In-table / Box Layout)
                    <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${item.iconBg}`}
                      >
                        <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        {item.description}
                      </p>

                      {item.primaryActionLabel && (
                        <button
                          type="button"
                          className="mt-4 px-3.5 py-1.5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                        >
                          {ActionIconComponent && <ActionIconComponent className="w-3.5 h-3.5" />}
                          <span>{item.primaryActionLabel}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Technical / Implementation Notes */}
                <div className="text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="font-semibold text-slate-700">Catatan Implementasi Developer: </span>
                  <span>{item.technicalNotes}</span>
                </div>
              </div>
            )
          })}

          {filteredItems.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-600">Tidak ada item yang cocok dengan filter pencarian.</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian atau modul yang lain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
