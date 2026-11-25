import React, { useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Copy,
  Check,
  Play,
  Search,
  Filter,
  Code2,
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
  eventHandler: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  condition: string
  actionLabel?: string
  codeSnippet: string
}

const TOAST_CATALOG: ToastDocItem[] = [
  // 1. Impor CSV
  {
    id: 't-csv-01',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'success',
    title: 'Impor Berhasil',
    message: 'Berkas semrush_keywords_export_nov2026.csv berhasil diunggah. Sebanyak 842 kata kunci diproses dan 10 kata kunci baru ditambahkan.',
    condition: 'File CSV valid, struktur metadata sesuai standar, dan seluruh baris kata kunci berhasil diurai ke database.',
    codeSnippet: `showSuccess('Impor Berhasil', 'Berkas \${fileName} berhasil diunggah. Sebanyak \${total} kata kunci diproses dan \${newCount} kata kunci baru ditambahkan.')`,
  },
  {
    id: 't-csv-02',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'warning',
    title: 'Kuota Token Habis',
    message: 'Tidak dapat mengunggah berkas CSV. Kuota token analisis AI telah habis. Hubungi administrator.',
    condition: 'Admin atau editor mencoba mengunggah file CSV saat status token LLM sedang habis (isTokenExhausted === true).',
    actionLabel: 'Lihat Pengaturan',
    codeSnippet: `showWarning('Kuota Token Habis', 'Tidak dapat mengunggah berkas CSV. Kuota token analisis AI telah habis. Hubungi administrator.', 'Lihat Pengaturan', () => setCurrentPage('konfigurasi'))`,
  },
  {
    id: 't-csv-03',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'warning',
    title: 'Berkas Duplikat Terdeteksi',
    message: 'Berkas semrush_keywords_export_nov2026.csv (420 KB) sudah pernah diimpor sebelumnya. Sistem menolak impor berulang untuk mencegah duplikasi data.',
    condition: 'File yang diunggah memiliki nama berkas dan ukuran byte yang identik dengan riwayat impor sebelumnya.',
    codeSnippet: `showWarning('Berkas Duplikat Terdeteksi', 'Berkas \${file.name} (\${sizeKB} KB) sudah pernah diimpor sebelumnya. Sistem menolak impor berulang untuk mencegah duplikasi data.')`,
  },
  {
    id: 't-csv-04',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'error',
    title: 'Format Berkas Tidak Valid',
    message: 'Hanya berkas format .csv dari ekspor Semrush yang diperbolehkan. Format .xlsx atau .pdf ditolak.',
    condition: 'Pengguna mengunggah berkas selain ekstensi .csv (misalnya .xlsx, .txt, .pdf, .zip).',
    codeSnippet: `showError('Format Berkas Tidak Valid', 'Hanya berkas format .csv dari ekspor Semrush yang diperbolehkan.')`,
  },
  {
    id: 't-csv-05',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'error',
    title: 'Ukuran Berkas Terlalu Besar',
    message: 'Ukuran berkas melebihi batas maksimal 25 MB. Silakan pecah data CSV Anda menjadi beberapa bagian.',
    condition: 'Ukuran file yang dipilih melebihi batas kuota unggah 25 Megabytes.',
    codeSnippet: `showError('Ukuran Berkas Terlalu Besar', 'Ukuran berkas melebihi batas maksimal 25 MB. Silakan pecah data CSV Anda.')`,
  },
  {
    id: 't-csv-06',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'error',
    title: 'Struktur Kolom CSV Rusak',
    message: 'Kolom wajib (Keyword, Volume, Keyword Difficulty) tidak ditemukan pada berkas CSV. Pastikan format ekspor Semrush asli.',
    condition: 'Header CSV tidak memiliki salah satu kolom wajib yang diperlukan parser sistem.',
    actionLabel: 'Unduh Format',
    codeSnippet: `showError('Struktur Kolom CSV Rusak', 'Kolom wajib (Keyword, Volume, Keyword Difficulty) tidak ditemukan pada berkas CSV.', 'Unduh Format', () => downloadTemplate())`,
  },
  {
    id: 't-csv-07',
    module: 'Impor CSV',
    eventHandler: 'handleUploadCsv',
    type: 'warning',
    title: 'Impor Sebagian Berhasil',
    message: '820 baris berhasil diimpor, namun terdapat 22 baris data korup yang dilewati oleh parser.',
    condition: 'File memiliki beberapa baris rusak/karakter aneh, namun baris lainnya tetap berhasil diproses.',
    actionLabel: 'Unduh Log Galat',
    codeSnippet: `showWarning('Impor Sebagian Berhasil', '\${validCount} baris berhasil diimpor, namun terdapat \${errorCount} baris data korup yang dilewati.', 'Unduh Log Galat', () => downloadErrorLog())`,
  },
  {
    id: 't-csv-08',
    module: 'Impor CSV',
    eventHandler: 'handleDownloadErrorLog',
    type: 'success',
    title: 'Log Galat',
    message: 'Log galat untuk semrush_keywords_export_nov2026.csv berhasil diunduh ke komputer Anda.',
    condition: 'Pengguna menekan tombol unduh log galat pada tabel riwayat impor CSV.',
    codeSnippet: `showSuccess('Log Galat', 'Log galat untuk \${fileName} berhasil diunduh.')`,
  },

  // 2. Kata Kunci
  {
    id: 't-kw-01',
    module: 'Kata Kunci',
    eventHandler: 'handleClassifyWithAI',
    type: 'success',
    title: 'AI Assistant',
    message: 'AI sedang mengklasifikasikan 50 kata kunci berdasarkan intent pencarian, volume, dan kaidah redaksi...',
    condition: 'Editor/Admin mengklik tombol "Klasifikasikan Kata Kunci oleh AI".',
    codeSnippet: `showSuccess('AI Assistant', 'AI sedang mengklasifikasikan 50 kata kunci berdasarkan intent & kelayakan...')`,
  },
  {
    id: 't-kw-02',
    module: 'Kata Kunci',
    eventHandler: 'handleClassifyWithAI',
    type: 'warning',
    title: 'Fitur Dinonaktifkan',
    message: 'Klasifikasi kata kunci AI tidak dapat dijalankan karena kuota token LLM telah habis.',
    condition: 'Pengguna mengklik tombol klasifikasi saat isTokenExhausted === true.',
    codeSnippet: `showWarning('Fitur Dinonaktifkan', 'Klasifikasi kata kunci AI tidak dapat dijalankan karena kuota token LLM telah habis.')`,
  },
  {
    id: 't-kw-03',
    module: 'Kata Kunci',
    eventHandler: 'handleClassifyWithAI',
    type: 'error',
    title: 'Koneksi AI Terputus',
    message: 'Gagal menghubungi server inferensi AI (Request Timeout 504). Silakan coba beberapa saat lagi.',
    condition: 'Permintaan API ke model LLM mengalami timeout atau server AI sedang sibuk.',
    actionLabel: 'Coba Lagi',
    codeSnippet: `showError('Koneksi AI Terputus', 'Gagal menghubungi server inferensi AI. Silakan coba beberapa saat lagi.', 'Coba Lagi', () => retryClassification())`,
  },
  {
    id: 't-kw-04',
    module: 'Kata Kunci',
    eventHandler: 'handleSingleOverride',
    type: 'success',
    title: 'Manajemen Kata Kunci',
    message: 'Status kelayakan kata kunci "cara daftar bansos kemensos online 2027" berhasil diubah menjadi Layak.',
    condition: 'Editor menekan tombol override kelayakan pada baris kata kunci tunggal.',
    codeSnippet: `showSuccess('Manajemen Kata Kunci', 'Aturan kelayakan berhasil disimpan')`,
  },
  {
    id: 't-kw-05',
    module: 'Kata Kunci',
    eventHandler: 'handleSingleOverride',
    type: 'error',
    title: 'Alasan Wajib Diisi',
    message: 'Harap masukkan catatan editorial mengapa kata kunci ini dinyatakan layak sebelum menyimpan override.',
    condition: 'Editor mengubah kata kunci yang semula dinilai "Tidak Layak" oleh AI tanpa mengisi form alasan pertimbangan.',
    codeSnippet: `showError('Alasan Wajib Diisi', 'Harap masukkan catatan editorial mengapa kata kunci ini dinyatakan layak.')`,
  },
  {
    id: 't-kw-06',
    module: 'Kata Kunci',
    eventHandler: 'handleBulkOverride',
    type: 'success',
    title: 'Override Massal Berhasil',
    message: 'Sebanyak 8 kata kunci terpilih berhasil diubah status kelayakannya secara massal.',
    condition: 'Editor memilih beberapa checkbox kata kunci dan mengonfirmasi override massal via modal.',
    codeSnippet: `showSuccess('Override Massal Berhasil', 'Sebanyak \${selectedCount} kata kunci berhasil diperbarui statusnya.')`,
  },
  {
    id: 't-kw-07',
    module: 'Kata Kunci',
    eventHandler: 'handleBulkOverride',
    type: 'warning',
    title: 'Pilihan Kosong',
    message: 'Pilih minimal satu kata kunci pada tabel untuk menjalankan aksi kelayakan massal.',
    condition: 'Editor membuka modal override massal tanpa mencentang satu pun baris kata kunci.',
    codeSnippet: `showWarning('Pilihan Kosong', 'Pilih minimal satu kata kunci pada tabel untuk menjalankan aksi kelayakan massal.')`,
  },

  // 3. Kelompok Topik
  {
    id: 't-cls-01',
    module: 'Kelompok Topik',
    eventHandler: 'handleGenerateClustersWithAI',
    type: 'success',
    title: 'AI Assistant',
    message: 'AI berhasil memperbarui kelompok topik dan menambahkan topik rekomendasi baru berlabel "Baru".',
    condition: 'Pengguna menekan tombol "Buat Kelompok dengan AI" untuk mengelompokkan kata kunci terseleksi.',
    codeSnippet: `showSuccess('AI Assistant', 'AI berhasil memperbarui kelompok topik dan menambahkan topik rekomendasi baru berlabel "Baru".')`,
  },
  {
    id: 't-cls-02',
    module: 'Kelompok Topik',
    eventHandler: 'handleResolveAbaikan',
    type: 'success',
    title: 'Kanibalisasi Diabaikan',
    message: 'Topik "Panduan Reksadana 2026" ditandai aman dari kanibalisasi internal RRI oleh editor.',
    condition: 'Editor mengonfirmasi modal abaikan kanibalisasi setelah meninjau sudut pandang konten.',
    codeSnippet: `showSuccess('Kanibalisasi Diabaikan', 'Topik "\${topicName}" ditandai aman dari kanibalisasi internal RRI.')`,
  },
  {
    id: 't-cls-03',
    module: 'Kelompok Topik',
    eventHandler: 'handleResolveMerge',
    type: 'success',
    title: 'Topik Berhasil Digabung',
    message: 'Topik "Panduan Reksadana 2026" telah digabung ke artikel pilar "Cara Investasi Reksadana Uang untuk Generasi-Z". Menghitung ulang volume SEO...',
    condition: 'Editor menggabungkan topik duplikat ke dalam artikel pilar utama.',
    codeSnippet: `showSuccess('Cluster Topik', 'Cluster berhasil digabung. Menghitung ulang volume SEO...')`,
  },
  {
    id: 't-cls-04',
    module: 'Kelompok Topik',
    eventHandler: 'handleResolveSplit',
    type: 'success',
    title: 'Topik Berhasil Dipecah',
    message: 'Topik majemuk berhasil dipecah menjadi 2 topik terpisah dengan kata kunci pilar mandiri.',
    condition: 'Editor memecah kata kunci turunan yang memiliki search intent berbeda menjadi topik baru.',
    codeSnippet: `showSuccess('Topik Berhasil Dipecah', 'Topik majemuk berhasil dipecah menjadi \${newCount} topik terpisah.')`,
  },
  {
    id: 't-cls-05',
    module: 'Kelompok Topik',
    eventHandler: 'handleResolveReject',
    type: 'warning',
    title: 'Topik Ditolak',
    message: 'Kelompok topik "Panduan Reksadana 2026" berhasil ditolak dan dicoret dari antrean produksi naskah.',
    condition: 'Editor menolak topik berisiko/tidak relevan dan mencantumkan alasan penolakan redaksional.',
    codeSnippet: `showWarning('Topik Ditolak', 'Kelompok topik "\${topicName}" berhasil ditolak dan dicoret.')`,
  },
  {
    id: 't-cls-06',
    module: 'Kelompok Topik',
    eventHandler: 'handleRestoreTopic',
    type: 'success',
    title: 'Topik Berhasil Dipulihkan',
    message: 'Kelompok topik "Panduan Reksadana 2026" telah berhasil dipulihkan dari status ditolak.',
    condition: 'Editor menekan tombol "Pulihkan Topik" pada kartu topik yang sebelumnya dicoret.',
    codeSnippet: `showSuccess('Topik Berhasil Dipulihkan', 'Kelompok topik "\${topicName}" telah berhasil dipulihkan dari status ditolak.')`,
  },
  {
    id: 't-cls-07',
    module: 'Kelompok Topik',
    eventHandler: 'handleRestoreKanibalisasi',
    type: 'success',
    title: 'Peringatan Kanibalisasi Dipulihkan',
    message: 'Kelompok topik "Panduan Reksadana 2026" kembali ke status Butuh Resolusi.',
    condition: 'Editor membatalkan status abaikan kanibalisasi agar tim redaksi dapat meninjau ulang resolusi.',
    codeSnippet: `showSuccess('Peringatan Kanibalisasi Dipulihkan', 'Kelompok topik "\${topicName}" kembali ke status Butuh Resolusi.')`,
  },
  {
    id: 't-cls-08',
    module: 'Kelompok Topik',
    eventHandler: 'handleEditCluster',
    type: 'error',
    title: 'Validasi Gagal',
    message: 'Kelompok topik wajib memiliki minimal satu kata kunci pendukung sebelum disimpan.',
    condition: 'Editor membuang seluruh keyword pendukung di dalam drawer sunting klaster.',
    codeSnippet: `showError('Validasi Gagal', 'Kelompok topik wajib memiliki minimal satu kata kunci pendukung.')`,
  },
  {
    id: 't-cls-09',
    module: 'Kelompok Topik',
    eventHandler: 'handleCreateBrief',
    type: 'success',
    title: 'Arahan Dibuat',
    message: 'Kelompok topik disetujui untuk diteruskan ke antrean penyusunan Arahan Artikel (Brief Berita).',
    condition: 'Editor menekan tombol "Buat Arahan" pada kartu klaster yang aman dari kanibalisasi.',
    codeSnippet: `showSuccess('Cluster Topik', 'Cluster disetujui untuk diteruskan ke pembuatan Brief Berita')`,
  },

  // 4. Arahan Artikel (Brief)
  {
    id: 't-brf-01',
    module: 'Arahan Artikel',
    eventHandler: 'handleApproveBrief',
    type: 'success',
    title: 'Arahan Artikel Disetujui',
    message: 'Arahan artikel berhasil disetujui oleh Budi Santoso dan dialirkan ke antrean penulisan Draf AI.',
    condition: 'Editor memeriksa dan menyetujui struktur brief liputan di halaman detail.',
    codeSnippet: `showSuccess('Arahan Artikel', 'Arahan artikel berhasil disetujui oleh \${userName} dan dialirkan ke antrean Draf AI.')`,
  },
  {
    id: 't-brf-02',
    module: 'Arahan Artikel',
    eventHandler: 'handleSaveInlineBrief',
    type: 'success',
    title: 'Perubahan Tersimpan',
    message: 'Seluruh suntingan inline pada naskah arahan artikel berhasil disimpan ke sistem.',
    condition: 'Editor menekan tombol secondary "Simpan Perubahan" setelah mengedit outline/sudut pandang.',
    codeSnippet: `showSuccess('Perubahan Tersimpan', 'Seluruh suntingan inline pada naskah arahan artikel berhasil disimpan.')`,
  },
  {
    id: 't-brf-03',
    module: 'Arahan Artikel',
    eventHandler: 'handleRegenerateBriefAI',
    type: 'success',
    title: 'Arahan Artikel Dibuat Ulang',
    message: 'Arahan artikel berhasil dibuat ulang dengan formulasi AI dan sudut pandang liputan terbaru.',
    condition: 'Editor menekan tombol "Buat Ulang Arahan dengan AI" saat token tersedia.',
    codeSnippet: `showSuccess('Arahan Artikel', 'Arahan artikel berhasil dibuat ulang dengan AI.')`,
  },
  {
    id: 't-brf-04',
    module: 'Arahan Artikel',
    eventHandler: 'handleClaimBrief',
    type: 'success',
    title: 'Naskah Terkunci',
    message: 'Naskah arahan artikel berhasil diambil dan dikunci atas nama Siti Rahmawati.',
    condition: 'Editor membuka naskah yang berstatus "Tersedia" untuk mulai mengerjakan verifikasi.',
    codeSnippet: `showSuccess('Naskah Terkunci', 'Naskah arahan artikel berhasil diambil dan dikunci atas nama \${userName}.')`,
  },
  {
    id: 't-brf-05',
    module: 'Arahan Artikel',
    eventHandler: 'handleLockConflict',
    type: 'warning',
    title: 'Akses Naskah Terbatas',
    message: 'Naskah ini sedang dikunci dan dikerjakan oleh Ahmad Fauzi. Kolom input beralih ke mode baca saja.',
    condition: 'Editor lain mencoba membuka naskah yang sudah dikunci oleh editor yang berbeda.',
    actionLabel: 'Minta Akses',
    codeSnippet: `showWarning('Akses Naskah Terbatas', 'Naskah ini sedang dikunci dan dikerjakan oleh \${lockedBy}. Anda hanya memiliki izin baca.', 'Minta Akses', () => requestAccess())`,
  },
  {
    id: 't-brf-06',
    module: 'Arahan Artikel',
    eventHandler: 'handleReleaseBrief',
    type: 'success',
    title: 'Naskah Dilepas',
    message: 'Kunci editorial dilepas. Naskah kini kembali berstatus "Tersedia" untuk seluruh tim redaksi.',
    condition: 'Pemilik naskah menekan tombol "Lepas Arahan Artikel".',
    codeSnippet: `showSuccess('Naskah Dilepas', 'Kunci editorial dilepas. Naskah kini kembali berstatus "Tersedia".')`,
  },
  {
    id: 't-brf-07',
    module: 'Arahan Artikel',
    eventHandler: 'handleRetryProcess',
    type: 'success',
    title: 'Proses Dimuat Ulang',
    message: 'Status arahan artikel berhasil dikembalikan ke antrean pemrosesan AI.',
    condition: 'Admin menekan tombol "Muat Ulang" pada baris naskah yang gagal terproses.',
    codeSnippet: `showSuccess('Proses Dimuat Ulang', 'Status arahan artikel berhasil dikembalikan ke antre.')`,
  },
  {
    id: 't-brf-08',
    module: 'Arahan Artikel',
    eventHandler: 'handleExportBriefDocs',
    type: 'success',
    title: 'Ekspor Dokumen',
    message: 'Arahan artikel berhasil diekspor sebagai dokumen Docs (.doc) siap unduh.',
    condition: 'Pengguna menekan opsi ekspor dokumen Microsoft Word pada dropdown aksi naskah.',
    codeSnippet: `showSuccess('Ekspor Docs', 'Arahan artikel berhasil diekspor sebagai dokumen Docs (.doc)')`,
  },
  {
    id: 't-brf-09',
    module: 'Arahan Artikel',
    eventHandler: 'handleExportBriefPDF',
    type: 'success',
    title: 'Ekspor PDF',
    message: 'Membuka jendela cetak peramban untuk menyimpan Arahan Artikel sebagai PDF.',
    condition: 'Pengguna memilih opsi ekspor PDF.',
    codeSnippet: `showSuccess('Ekspor PDF', 'Membuka jendela cetak untuk menyimpan Arahan Artikel sebagai PDF.')`,
  },

  // 5. Draf Berita (Draft)
  {
    id: 't-dft-01',
    module: 'Draf Berita',
    eventHandler: 'handleSendToCMS',
    type: 'success',
    title: 'Penyuntingan Draf',
    message: 'Draf berita berhasil dikirim ke portal CMS RRI untuk persiapan terbit.',
    condition: 'Editor menekan tombol "Kirim ke CMS RRI" setelah menyelesaikan pemeriksaan akhir.',
    actionLabel: 'Buka CMS',
    codeSnippet: `showSuccess('Penyuntingan Draf', 'Draf berhasil dikirim ke Editools CMS RRI.', 'Buka CMS', () => window.open('https://cms.rri.co.id'))`,
  },
  {
    id: 't-dft-02',
    module: 'Draf Berita',
    eventHandler: 'handleSaveDraftEdit',
    type: 'success',
    title: 'Naskah Tersimpan',
    message: 'Perubahan teks naskah dan catatan redaksional berhasil disimpan ke versi draf.',
    condition: 'Editor menekan tombol simpan perubahan naskah berita.',
    codeSnippet: `showSuccess('Naskah Tersimpan', 'Perubahan pada isi naskah draf berita berhasil disimpan ke sistem.')`,
  },
  {
    id: 't-dft-03',
    module: 'Draf Berita',
    eventHandler: 'handleClaimDraft',
    type: 'success',
    title: 'Naskah Terkunci',
    message: 'Draf berita berhasil diambil dan dikunci atas nama Siti Rahmawati.',
    condition: 'Editor mengambil naskah draft berstatus "Tersedia".',
    codeSnippet: `showSuccess('Naskah Terkunci', 'Draf artikel berhasil diambil dan dikunci atas nama \${userName}.')`,
  },
  {
    id: 't-dft-04',
    module: 'Draf Berita',
    eventHandler: 'handleDeleteDraft',
    type: 'warning',
    title: 'Draf Dihapus',
    message: 'Draf berita "Tol Probowangi Seksi 1" berhasil dihapus dari sistem redaksi.',
    condition: 'Editor mengonfirmasi modal hapus draf berita.',
    codeSnippet: `showWarning('Penyuntingan Draf', 'Draf artikel berhasil dihapus.')`,
  },
  {
    id: 't-dft-05',
    module: 'Draf Berita',
    eventHandler: 'handleCopyAllDraft',
    type: 'success',
    title: 'Salin Berhasil',
    message: 'Seluruh naskah draf berita (Judul, Lead, Isi, dan Metadata) telah disalin ke clipboard.',
    condition: 'Editor mengklik tombol "Salin Semua".',
    codeSnippet: `showSuccess('Salin Berhasil', 'Seluruh naskah draf berita telah disalin ke clipboard.')`,
  },
  {
    id: 't-dft-06',
    module: 'Draf Berita',
    eventHandler: 'handleCopySeoMetadata',
    type: 'success',
    title: 'Salin Berhasil',
    message: 'Paket Metadata SEO (Meta Title, Description, Keyword Density) telah disalin ke clipboard.',
    condition: 'Editor mengklik tombol "Salin Paket Metadata SEO".',
    codeSnippet: `showSuccess('Salin Berhasil', 'Paket metadata SEO telah disalin ke clipboard.')`,
  },
  {
    id: 't-dft-07',
    module: 'Draf Berita',
    eventHandler: 'handleCopyImagePrompt',
    type: 'success',
    title: 'Salin Berhasil',
    message: 'Rekomendasi Prompt Gambar Dari AI telah disalin ke clipboard untuk generator visual.',
    condition: 'Editor mengklik tombol "Salin Rekomendasi Prompt Gambar Dari AI".',
    codeSnippet: `showSuccess('Salin Berhasil', 'Rekomendasi Prompt Gambar Dari AI telah disalin ke clipboard.')`,
  },

  // 6. Pengaturan Redaksi
  {
    id: 't-set-01',
    module: 'Pengaturan Redaksi',
    eventHandler: 'handleAddFilterRule',
    type: 'success',
    title: 'Pengaturan Redaksi',
    message: 'Aturan filter kata kunci baru "Larangan Judi Online & Slot" berhasil ditambahkan.',
    condition: 'Admin menyimpan modal pembuatan aturan filter baru.',
    codeSnippet: `showSuccess('Pengaturan Redaksi', 'Aturan filter berhasil ditambahkan')`,
  },
  {
    id: 't-set-02',
    module: 'Pengaturan Redaksi',
    eventHandler: 'handleAddFilterRule',
    type: 'error',
    title: 'Validasi Gagal',
    message: 'Nama aturan wajib diisi dan tidak boleh sama dengan aturan yang sudah terdaftar.',
    condition: 'Admin mengosongkan nama aturan atau memasukkan nama yang sudah pernah ada.',
    codeSnippet: `showError('Validasi Gagal', 'Nama aturan wajib diisi dan tidak boleh duplikat.')`,
  },
  {
    id: 't-set-03',
    module: 'Pengaturan Redaksi',
    eventHandler: 'handleToggleRuleStatus',
    type: 'success',
    title: 'Status Aturan',
    message: 'Status aturan filter kata kunci berhasil diubah menjadi Nonaktif.',
    condition: 'Admin mengklik switch toggle status aktif/nonaktif pada tabel aturan.',
    codeSnippet: `showSuccess('Status Aturan', 'Status aturan filter berhasil diperbarui.')`,
  },
  {
    id: 't-set-04',
    module: 'Pengaturan Redaksi',
    eventHandler: 'handleDeleteFilterRule',
    type: 'warning',
    title: 'Pengaturan Redaksi',
    message: 'Aturan filter kata kunci berhasil dihapus dari sistem redaksi.',
    condition: 'Admin mengonfirmasi modal hapus aturan filter.',
    codeSnippet: `showWarning('Pengaturan Redaksi', 'Aturan filter berhasil dihapus')`,
  },
  {
    id: 't-set-05',
    module: 'Pengaturan Redaksi',
    eventHandler: 'handleSaveBukuGaya',
    type: 'success',
    title: 'Buku Gaya Redaksi',
    message: 'Pedoman Buku Gaya Editorial berhasil disimpan dan diterapkan pada generasi draf AI.',
    condition: 'Admin menekan tombol "Simpan Pengaturan Buku Gaya".',
    codeSnippet: `showSuccess('Pengaturan Redaksi', 'Perubahan Buku Gaya berhasil disimpan.')`,
  },
  {
    id: 't-set-06',
    module: 'Pengaturan Redaksi',
    eventHandler: 'handleSaveCsvRetention',
    type: 'success',
    title: 'Retensi Berkas CSV',
    message: 'Kebijakan retensi CSV berhasil diperbarui: Berkas akan dihapus otomatis setelah 7 hari.',
    condition: 'Admin memperbarui dropdown durasi retensi file CSV.',
    codeSnippet: `showSuccess('Pengaturan Redaksi', 'Kebijakan retensi CSV berhasil diperbarui: Berkas akan dihapus otomatis setelah \${days} hari.')`,
  },

  // 7. Manajemen Pengguna
  {
    id: 't-usr-01',
    module: 'Manajemen Pengguna',
    eventHandler: 'handleAddUser',
    type: 'success',
    title: 'Manajemen Pengguna',
    message: 'Pengguna Siti Rahmawati (siti.rahmawati@rri.co.id) berhasil didaftarkan ke sistem.',
    condition: 'Admin mengisi form tambah pengguna dan mengonfirmasi pembuatan akun.',
    codeSnippet: `showSuccess('Manajemen Pengguna', 'Pengguna \${newUser.name} berhasil ditambahkan')`,
  },
  {
    id: 't-usr-02',
    module: 'Manajemen Pengguna',
    eventHandler: 'handleAddUser',
    type: 'error',
    title: 'Format Email Salah',
    message: 'Harap masukkan alamat email resmi yang valid (contoh: nama@rri.co.id).',
    condition: 'Admin memasukkan format email yang salah atau tanpa domain valid.',
    codeSnippet: `showError('Format Email Salah', 'Harap masukkan alamat email resmi yang valid.')`,
  },
  {
    id: 't-usr-03',
    module: 'Manajemen Pengguna',
    eventHandler: 'handleToggleUserStatus',
    type: 'warning',
    title: 'Manajemen Pengguna',
    message: 'Akun pengguna Dewi Lestari telah dinonaktifkan.',
    condition: 'Admin menonaktifkan akun editor melalui tombol toggle status.',
    codeSnippet: `showWarning('Manajemen Pengguna', 'Pengguna \${u.name} telah dinonaktifkan')`,
  },
  {
    id: 't-usr-04',
    module: 'Manajemen Pengguna',
    eventHandler: 'handleToggleUserStatus',
    type: 'error',
    title: 'Aksi Ditolak',
    message: 'Anda tidak dapat menonaktifkan akun Anda sendiri yang sedang aktif digunakan.',
    condition: 'Admin mencoba menonaktifkan akun yang sedang digunakan saat ini (self-deactivation).',
    codeSnippet: `showError('Aksi Ditolak', 'Anda tidak dapat menonaktifkan akun Anda sendiri yang sedang aktif digunakan.')`,
  },
  {
    id: 't-usr-05',
    module: 'Manajemen Pengguna',
    eventHandler: 'handleDeleteUser',
    type: 'warning',
    title: 'Manajemen Pengguna',
    message: 'Pengguna Rian Pratama berhasil dihapus dari sistem redaksi.',
    condition: 'Admin mengonfirmasi modal hapus pengguna.',
    codeSnippet: `showWarning('Manajemen Pengguna', 'Pengguna \${target.name} berhasil dihapus')`,
  },

  // 8. Sistem & Sesi
  {
    id: 't-sys-01',
    module: 'Sistem & Sesi',
    eventHandler: 'toggleTokenExhausted',
    type: 'warning',
    title: 'Kuota Token Habis',
    message: 'Simulasi: Kuota token LLM telah habis. Seluruh fitur pemrosesan dan generasi AI dinonaktifkan.',
    condition: 'Administrator menyalakan sakelar simulasi kuota token habis pada halaman konfigurasi.',
    codeSnippet: `showWarning('Kuota Token Habis', 'Simulasi: Kuota token LLM telah habis. Fitur AI dinonaktifkan.')`,
  },
  {
    id: 't-sys-02',
    module: 'Sistem & Sesi',
    eventHandler: 'toggleTokenExhausted',
    type: 'success',
    title: 'Kuota Token Aktif',
    message: 'Simulasi: Kuota token LLM telah dipulihkan (Aktif). Fitur AI dapat digunakan kembali secara normal.',
    condition: 'Administrator memulihkan kuota token ke status normal.',
    codeSnippet: `showSuccess('Kuota Token Aktif', 'Simulasi: Kuota token LLM telah dipulihkan (Aktif).')`,
  },
  {
    id: 't-sys-03',
    module: 'Sistem & Sesi',
    eventHandler: 'handleNetworkOffline',
    type: 'error',
    title: 'Koneksi Terputus',
    message: 'Koneksi internet Anda terputus. Beberapa aksi perubahan mungkin belum tersimpan ke server.',
    condition: 'Peramban mendeteksi status offline (navigator.onLine === false).',
    actionLabel: 'Muat Ulang',
    codeSnippet: `showError('Koneksi Terputus', 'Koneksi internet Anda terputus.', 'Muat Ulang', () => window.location.reload())`,
  },
  {
    id: 't-sys-04',
    module: 'Sistem & Sesi',
    eventHandler: 'handleSessionExpired',
    type: 'error',
    title: 'Sesi Berakhir',
    message: 'Sesi masuk Anda telah berakhir demi keamanan data redaksi. Silakan masuk kembali.',
    condition: 'Server mengembalikan kode status 401 Unauthorized karena token JWT kedaluwarsa.',
    actionLabel: 'Masuk Ulang',
    codeSnippet: `showError('Sesi Berakhir', 'Sesi masuk Anda telah berakhir demi keamanan.', 'Masuk Ulang', () => window.location.href = '/login')`,
  },
  {
    id: 't-sys-05',
    module: 'Sistem & Sesi',
    eventHandler: 'handleForbiddenAccess',
    type: 'error',
    title: 'Akses Ditolak',
    message: 'Anda tidak memiliki izin akses administratif untuk halaman ini.',
    condition: 'Editor mencoba mengakses endpoint atau halaman khusus administrator (403 Forbidden).',
    actionLabel: 'Ke Beranda',
    codeSnippet: `showError('Akses Ditolak', 'Anda tidak memiliki izin akses administratif.', 'Ke Beranda', () => setCurrentPage('dashboard'))`,
  },
]

export const ToastDocPage: React.FC = () => {
  const { setCurrentPage } = useApp()
  const { showSuccess, showWarning, showError, showInfo } = useToast()

  const [selectedModule, setSelectedModule] = useState<string>('Semua')
  const [selectedType, setSelectedType] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null)

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
      item.eventHandler.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condition.toLowerCase().includes(searchQuery.toLowerCase())
    return matchModule && matchType && matchSearch
  })

  // Trigger the actual live toast in UI
  const handleTriggerToast = (item: ToastDocItem) => {
    if (item.type === 'success') {
      showSuccess(item.title, item.message, item.actionLabel, () => {})
    } else if (item.type === 'warning') {
      showWarning(item.title, item.message, item.actionLabel, () => {})
    } else if (item.type === 'error') {
      showError(item.title, item.message, item.actionLabel, () => {})
    } else {
      showInfo(item.title, item.message, item.actionLabel, () => {})
    }
  }

  // Copy code snippet to clipboard
  const handleCopySnippet = (item: ToastDocItem) => {
    navigator.clipboard.writeText(item.codeSnippet)
    setCopiedSnippetId(item.id)
    setTimeout(() => {
      setCopiedSnippetId(null)
    }, 2000)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <button
            type="button"
            onClick={() => setCurrentPage('konfigurasi')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1866EF] hover:text-blue-700 transition-colors cursor-pointer mb-2 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Konfigurasi</span>
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Katalog & Dokumentasi Toast Notifikasi
            </h1>
            <span className="bg-blue-50 text-[#1866EF] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 shrink-0">
              {TOAST_CATALOG.length} Toast Terpetakan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Spesifikasi interaktif seluruh notifikasi sistem (Success, Warning, Error) untuk seluruh event handler dan edge case aplikasi. Tim developer dapat menguji langsung (*live test*) serta menyalin kode siap pakai.
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
              placeholder="Cari berdasarkan judul toast, pesan, event handler, atau edge case..."
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
            const isCopied = copiedSnippetId === item.id

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
                    <span className="font-mono text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {item.eventHandler}()
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

                {/* Developer Implementation Code Snippet */}
                <div className="bg-slate-900 rounded-lg p-3 text-slate-100 flex items-center justify-between gap-3 overflow-hidden">
                  <div className="flex items-center gap-2 font-mono text-[11px] overflow-x-auto min-w-0 py-0.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="text-slate-300 truncate">{item.codeSnippet}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopySnippet(item)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                    title="Salin kode pemanggilan toast"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-semibold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-[10px]">Salin</span>
                      </>
                    )}
                  </button>
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
