import React, { useState } from 'react'
import writeXlsxFile, { type SheetData, type Row } from 'write-excel-file/browser'
import { useToast } from '../context/ToastContext'
import { useApp } from '../context/AppContext'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'
import {
  PREVIEW_DATA,
  KEYWORD_GAP_PREVIEW_DATA,
  HISTORY_DATA,
} from '../components/import-csv/importCsvData'
import type { DuplicateFileInfo } from '../components/import-csv/types'
import { CsvRetentionBanner } from '../components/import-csv/CsvRetentionBanner'
import { CsvDropzone } from '../components/import-csv/CsvDropzone'
import { CsvDuplicateModal } from '../components/import-csv/CsvDuplicateModal'
import { CsvMetricsCards } from '../components/import-csv/CsvMetricsCards'
import { CsvPreviewTable } from '../components/import-csv/CsvPreviewTable'
import { CsvHistoryTable } from '../components/import-csv/CsvHistoryTable'

export const ImporCSVPage: React.FC = () => {
  const { showSuccess, showWarning } = useToast()
  const {
    csvCooldownMonths,
    setNewKeywordsBadgeCount,
    setNewKeywordGapBadgeCount,
    isTokenExhausted,
  } = useApp()

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false)
  const [duplicateFileInfo, setDuplicateFileInfo] = useState<DuplicateFileInfo | null>(null)
  const [isUploadDropdownOpen, setIsUploadDropdownOpen] = useState(false)
  const [selectedImportType, setSelectedImportType] = useState<'keyword' | 'keyword_gap'>('keyword')
  const [previewFileName, setPreviewFileName] = useState<string>('semrush_keywords_export_nov2026.csv')
  const [showRetentionBanner, setShowRetentionBanner] = useState<boolean>(true)

  // Tracking metadata berkas yang pernah diimpor untuk mencegah impor berulang kali
  const [importedFileRegistry, setImportedFileRegistry] = useState<
    Array<{ fileName: string; sizeBytes: number; uploadDate: string }>
  >([
    {
      fileName: 'semrush_keywords_export_nov2026.csv',
      sizeBytes: 1420580,
      uploadDate: '3 Jul 2026, 09:31',
    },
    {
      fileName: 'semrush_keyword_gap_detik_liputan6.csv',
      sizeBytes: 984500,
      uploadDate: '3 Jul 2026, 09:31',
    },
  ])

  const handleSelectImportType = (type: 'keyword' | 'keyword_gap', forceNewFile: boolean = false) => {
    setIsUploadDropdownOpen(false)

    // 1. Validasi Token Quota
    if (isTokenExhausted) {
      showWarning(
        'Unggah Ditolak (Token Habis)',
        'Kuota token LLM telah habis. Anda tidak dapat mengunggah berkas CSV hingga kuota token dipulihkan.'
      )
      return
    }

    const targetFileName = forceNewFile
      ? type === 'keyword'
        ? `semrush_keywords_update_${Date.now().toString().slice(-4)}.csv`
        : `semrush_gap_update_${Date.now().toString().slice(-4)}.csv`
      : type === 'keyword'
      ? 'semrush_keywords_export_nov2026.csv'
      : 'semrush_keyword_gap_detik_liputan6.csv'

    const targetFileSize = forceNewFile ? 1520100 : type === 'keyword' ? 1420580 : 984500

    // 2. Validasi Duplikasi Berdasarkan Metadata (Nama Berkas & Ukuran Berkas)
    const isDuplicate = !forceNewFile && importedFileRegistry.some(
      (item) => item.fileName.toLowerCase() === targetFileName.toLowerCase() && item.sizeBytes === targetFileSize
    )

    if (isDuplicate) {
      setDuplicateFileInfo({
        fileName: targetFileName,
        previousDate: '3 Jul 2026, 09:31 (Ukuran: ' + (targetFileSize / 1000000).toFixed(2) + ' MB)',
        similarity: 100,
        matchedKeywords:
          type === 'keyword'
            ? [
                'cara daftar bansos kemensos online 2027',
                'bantuan subsidi upah pekerja kemnaker',
                'cek desil bansos dtks jateng online',
                'panduan reksadana 2026',
                'syarat buat paspor online 2026',
              ]
            : ['ligue 1', 'klasemen liga 1', 'piala dunia', 'google gemini', 'la liga'],
      })
      setIsDuplicateAlertOpen(true)
      showWarning(
        'Berkas Duplikat Terdeteksi',
        `Berkas '${targetFileName}' dengan metadata yang sama sudah pernah diimpor sebelumnya.`
      )
      return
    }

    // Jika bukan duplikat, lakukan proses impor
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setSelectedImportType(type)
      setPreviewFileName(targetFileName)
      setImportedFileRegistry((prev) => [
        ...prev,
        {
          fileName: targetFileName,
          sizeBytes: targetFileSize,
          uploadDate: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])

      if (type === 'keyword') {
        setNewKeywordsBadgeCount(10)
        showSuccess(
          'Impor CSV Kata Kunci Selesai',
          `Berkas ${targetFileName} berhasil divalidasi. 10 kata kunci baru siap ditinjau di menu Kata Kunci (+10).`
        )
      } else {
        setNewKeywordGapBadgeCount(10)
        showSuccess(
          'Impor CSV Perbandingan Kata Kunci Selesai',
          `Berkas ${targetFileName} berhasil divalidasi. 10 data gap kata kunci siap ditinjau di menu Perbandingan Kata Kunci (+10).`
        )
      }
    }, 600)
  }

  const handleDownloadErrorLog = async (fileName: string) => {
    const cleanFileName = fileName.replace(/\.[^/.]+$/, '')

    const HEADER_ROW: Row = [
      {
        value: 'Nomor Baris',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'center' as const,
        alignVertical: 'center' as const,
      },
      {
        value: 'Kata Kunci Terbaca',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'left' as const,
        alignVertical: 'center' as const,
      },
      {
        value: 'Kolom Bermasalah',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'left' as const,
        alignVertical: 'center' as const,
      },
      {
        value: 'Nilai Mentah',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'center' as const,
        alignVertical: 'center' as const,
      },
      {
        value: 'Kategori Galat',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'center' as const,
        alignVertical: 'center' as const,
      },
      {
        value: 'Pesan Galat & Alasan Penolakan',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'left' as const,
        alignVertical: 'center' as const,
      },
      {
        value: 'Rekomendasi Tindakan',
        fontWeight: 'bold' as const,
        textColor: '#FFFFFF',
        backgroundColor: '#1866EF',
        align: 'left' as const,
        alignVertical: 'center' as const,
      },
    ]

    const errorDataRows: Row[] = [
      [
        { value: 14, type: Number, align: 'center' as const },
        { value: '(Baris Kosong)', type: String, fontStyle: 'italic' as const, textColor: '#94A3B8' },
        { value: 'Keyword', type: String },
        { value: '-', type: String, align: 'center' as const, textColor: '#94A3B8' },
        {
          value: 'Baris Kosong',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value: 'Kolom kata kunci kosong atau tidak memiliki karakter valid.',
          type: String,
          wrap: true,
        },
        { value: 'Hapus baris kosong ini dari berkas.', type: String, wrap: true },
      ],
      [
        { value: 28, type: Number, align: 'center' as const },
        { value: 'cek bansos kemensos 2026', type: String },
        { value: 'Search Volume', type: String },
        { value: 'N/A', type: String, align: 'center' as const, textColor: '#B91C1C' },
        {
          value: 'Format Numerik Tidak Valid',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value: "Nilai volume pencarian 'N/A' bukan format angka integer valid.",
          type: String,
          wrap: true,
        },
        {
          value: "Ganti nilai 'N/A' dengan estimasi volume angka bulat atau 0.",
          type: String,
          wrap: true,
        },
      ],
      [
        { value: 45, type: Number, align: 'center' as const },
        { value: 'syarat perpanjang sim online', type: String },
        { value: 'Keyword Difficulty', type: String },
        { value: '145', type: String, align: 'center' as const, textColor: '#B91C1C' },
        {
          value: 'Di Luar Batas Indeks',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value: 'Skor Keyword Difficulty (145) melebihi batas maksimal valid 100.',
          type: String,
          wrap: true,
        },
        {
          value: 'Koreksi nilai KD agar berada dalam rentang skor 0-100.',
          type: String,
          wrap: true,
        },
      ],
      [
        { value: 67, type: Number, align: 'center' as const },
        { value: 'pendaftaran cpns 2026 kemenkumham', type: String },
        { value: 'Keyword', type: String },
        { value: 'pendaftaran cpns 2026 kemenkumham', type: String },
        {
          value: 'Karakter Rusak (Encoding)',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value: 'Ditemukan karakter byte korup (bukan standar encoding UTF-8).',
          type: String,
          wrap: true,
        },
        {
          value: "Simpan ulang berkas dengan pilihan encoding 'CSV UTF-8 (Comma delimited)'.",
          type: String,
          wrap: true,
        },
      ],
      [
        { value: 82, type: Number, align: 'center' as const },
        { value: 'jadwal imsakiyah ramadhan rri', type: String },
        { value: 'Search Intent', type: String },
        { value: 'UNKNOWN_XYZ', type: String, align: 'center' as const, textColor: '#B91C1C' },
        {
          value: 'Format Intent Tidak Valid',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value: "Intent 'UNKNOWN_XYZ' tidak sesuai standar SEO baku.",
          type: String,
          wrap: true,
        },
        {
          value:
            'Gunakan intent standar: Informational, Navigational, Commercial, atau Transactional.',
          type: String,
          wrap: true,
        },
      ],
      [
        { value: 103, type: Number, align: 'center' as const },
        { value: 'cara daftar bansos kemensos online 2027', type: String },
        { value: 'Keyword', type: String },
        { value: 'cara daftar bansos kemensos online 2027', type: String },
        {
          value: 'Duplikasi Internal Berkas',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value:
            'Kata kunci duplikat ditemukan lebih dari 1 kali di berkas yang sama (sebelumnya di Baris 8).',
          type: String,
          wrap: true,
        },
        {
          value: 'Hapus baris duplikat agar kata kunci tidak diproses ganda.',
          type: String,
          wrap: true,
        },
      ],
      [
        { value: 119, type: Number, align: 'center' as const },
        { value: 'bantuan subsidi upah pekerja', type: String },
        { value: 'Cost Per Click (CPC)', type: String },
        { value: '$1.25', type: String, align: 'center' as const, textColor: '#B91C1C' },
        {
          value: 'Format Simbol Mata Uang',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value:
            "Nilai CPC mengandung simbol '$', parser memerlukan format desimal angka murni.",
          type: String,
          wrap: true,
        },
        {
          value:
            'Hapus simbol mata uang dan gunakan format desimal angka murni (contoh: 1.25).',
          type: String,
          wrap: true,
        },
      ],
      [
        { value: 142, type: Number, align: 'center' as const },
        { value: '(Baris Kosong)', type: String, fontStyle: 'italic' as const, textColor: '#94A3B8' },
        { value: 'Volume', type: String },
        { value: '-', type: String, align: 'center' as const, textColor: '#94A3B8' },
        {
          value: 'Baris Tanpa Data',
          type: String,
          textColor: '#B91C1C',
          backgroundColor: '#FEF2F2',
          align: 'center' as const,
        },
        {
          value: 'Seluruh kolom pada baris ini kosong / whitespace.',
          type: String,
          wrap: true,
        },
        { value: 'Hapus baris kosong di akhir berkas.', type: String, wrap: true },
      ],
    ]

    const data: SheetData = [HEADER_ROW, ...errorDataRows]

    await writeXlsxFile(data, {
      sheet: 'Log Galat Impor',
      columns: [
        { width: 14 },
        { width: 34 },
        { width: 22 },
        { width: 16 },
        { width: 26 },
        { width: 50 },
        { width: 44 },
      ],
    }).toFile(`log_galat_${cleanFileName}.xlsx`)

    showSuccess('Log Galat', `Log galat untuk ${fileName} berhasil diunduh dalam format Excel (.xlsx).`)
  }

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 1 Active */}
      <MilestoneStepper currentStep={1} />

      {/* 2. Page Title and Description */}
      <div>
        <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
          Impor file Semrush CSV
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Unggah berkas CSV hasil riset Semrush, lakukan pemetaan kolom, dan validasi sebelum diproses oleh AI.
        </p>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={1} />

      {/* Full-width 100% Alert Banner / Flag Retensi CSV */}
      <CsvRetentionBanner
        isVisible={showRetentionBanner}
        daysSinceLastUpload={9}
        retentionDays={7}
        onUploadClick={() => {
          if (isTokenExhausted) {
            showWarning(
              'Unggah Ditolak (Token Habis)',
              'Kuota token LLM telah habis. Anda tidak dapat mengunggah berkas CSV hingga kuota token dipulihkan.'
            )
          } else {
            setIsUploadDropdownOpen(true)
          }
        }}
        onDismiss={() => setShowRetentionBanner(false)}
      />

      {/* 4. Drag & Drop Upload Zone */}
      <CsvDropzone
        isUploading={isUploading}
        isDropdownOpen={isUploadDropdownOpen}
        setIsDropdownOpen={setIsUploadDropdownOpen}
        onSelectImportType={(type) => handleSelectImportType(type, false)}
        isTokenExhausted={isTokenExhausted}
      />

      {/* Duplicate Alert Modal */}
      <CsvDuplicateModal
        isOpen={isDuplicateAlertOpen}
        info={duplicateFileInfo}
        cooldownMonths={csvCooldownMonths}
        onClose={() => setIsDuplicateAlertOpen(false)}
      />

      {/* Metrics Row: 3 Cards Informasi CSV */}
      <CsvMetricsCards />

      {/* 5. Table 1: Pratinjau Berkas CSV Terpilih */}
      <CsvPreviewTable
        previewFileName={previewFileName}
        selectedImportType={selectedImportType}
        previewData={PREVIEW_DATA}
        keywordGapPreviewData={KEYWORD_GAP_PREVIEW_DATA}
      />

      {/* 6. Table 2: Riwayat Impor Data */}
      <CsvHistoryTable
        historyData={HISTORY_DATA}
        onDownloadErrorLog={handleDownloadErrorLog}
      />
    </div>
  )
}
