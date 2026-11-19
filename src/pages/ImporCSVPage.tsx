import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { useApp } from '../context/AppContext'
import {
  Upload,
  ChevronDown,
  AlertTriangle,
  X,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Search,
  GitCompare,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

interface PreviewItem {
  id: string
  keyword: string
  volumeText: string
  isVolumeError?: boolean
  kd: number
  intent: 'Informational' | 'Transaksional' | 'Komersial'
}

interface ImportHistoryItem {
  id: string
  fileName: string
  uploadDate: string
  status: 'Selesai' | 'Diproses'
  rowCount: number
  validCount: number
  isValidError?: boolean
  invalidCount: number
  isInvalidError?: boolean
  hasErrorLog: boolean
}

const PREVIEW_DATA: PreviewItem[] = [
  {
    id: 'prv-1',
    keyword: 'cara daftar bansos kemensos online 2027',
    volumeText: '33.100',
    kd: 48,
    intent: 'Informational',
  },
  {
    id: 'prv-2',
    keyword: 'bantuan subsidi upah pekerja kemnaker',
    volumeText: 'Teks: N/A',
    isVolumeError: true,
    kd: 35,
    intent: 'Transaksional',
  },
  {
    id: 'prv-3',
    keyword: 'cek desil bansos dtks jateng online',
    volumeText: '14.200',
    kd: 42,
    intent: 'Komersial',
  },
]

const KEYWORD_GAP_PREVIEW_DATA = [
  { id: 'kg-prv-1', keyword: 'ligue 1', intent: ['n/a'], detikRank: 25, liputan6Rank: 12, volume: '6.1M', kd: 76, cpc: '0.08', com: '0', results: '10' },
  { id: 'kg-prv-2', keyword: 'klasemen liga 1', intent: ['n/a'], detikRank: 9, liputan6Rank: 24, volume: '5M', kd: 43, cpc: '0.40', com: '0.33', results: '10' },
  { id: 'kg-prv-3', keyword: 'piala dunia', intent: ['I', 'T'], detikRank: 13, liputan6Rank: 24, volume: '4.1M', kd: 52, cpc: '0.07', com: '0.33', results: '10' },
  { id: 'kg-prv-4', keyword: 'google gemini', intent: ['N', 'T'], detikRank: 51, liputan6Rank: 25, volume: '3.4M', kd: 52, cpc: '0.01', com: '0.08', results: '553K' },
  { id: 'kg-prv-5', keyword: 'la liga', intent: ['I', 'T'], detikRank: 18, liputan6Rank: 68, volume: '3.4M', kd: 59, cpc: '0.03', com: '0.33', results: '6K' },
]

const HISTORY_DATA: ImportHistoryItem[] = [
  {
    id: 'hist-1',
    fileName: 'semrush_export_nov.csv',
    uploadDate: '3 Jul 2026, 09:31',
    status: 'Selesai',
    rowCount: 842,
    validCount: 842,
    isValidError: false,
    invalidCount: 842,
    isInvalidError: true,
    hasErrorLog: true,
  },
  {
    id: 'hist-2',
    fileName: 'semrush_export_nov.csv',
    uploadDate: '3 Jul 2026, 09:31',
    status: 'Diproses',
    rowCount: 842,
    validCount: 842,
    isValidError: true,
    invalidCount: 842,
    isInvalidError: false,
    hasErrorLog: true,
  },
  {
    id: 'hist-3',
    fileName: 'semrush_export_nov.csv',
    uploadDate: '3 Jul 2026, 09:31',
    status: 'Diproses',
    rowCount: 842,
    validCount: 842,
    isValidError: true,
    invalidCount: 842,
    isInvalidError: false,
    hasErrorLog: false,
  },
]

export const ImporCSVPage: React.FC = () => {
  const { showSuccess } = useToast()
  const {
    csvCooldownMonths,
    csvRetentionDays,
    lastCsvUploadDate,
    setLastCsvUploadDate,
    setNewKeywordsBadgeCount,
    setNewKeywordGapBadgeCount,
  } = useApp()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [activePage, setActivePage] = useState<number>(1)
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false)
  const [duplicateFileInfo, setDuplicateFileInfo] = useState<{
    fileName: string
    previousDate: string
    similarity: number
    matchedKeywords: string[]
  } | null>(null)

  const calculateDaysSinceUpload = () => {
    try {
      const uploadTime = new Date(lastCsvUploadDate).getTime()
      const nowTime = new Date(2026, 10, 19).getTime() // 19 Nov 2026
      const diffTime = Math.max(0, nowTime - uploadTime)
      return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    } catch {
      return 9
    }
  }
  const daysSinceLastUpload = calculateDaysSinceUpload()
  const isRetentionExceeded = daysSinceLastUpload >= (csvRetentionDays || 7)

  // Upload Dropdown & Type Selection
  const [isUploadDropdownOpen, setIsUploadDropdownOpen] = useState(false)
  const [selectedImportType, setSelectedImportType] = useState<'keyword' | 'keyword_gap'>('keyword')
  const [previewFileName, setPreviewFileName] = useState<string>('semrush_keywords_export_nov2026.csv')

  const handleSelectImportType = (type: 'keyword' | 'keyword_gap') => {
    setIsUploadDropdownOpen(false)
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setSelectedImportType(type)
      setLastCsvUploadDate(new Date(2026, 10, 19).toISOString())
      if (type === 'keyword') {
        setPreviewFileName('semrush_keywords_export_nov2026.csv')
        setNewKeywordsBadgeCount(10)
        showSuccess(
          'Impor CSV Kata Kunci Selesai',
          'Berkas semrush_keywords_export_nov2026.csv berhasil divalidasi. 10 kata kunci baru siap ditinjau di menu Kata Kunci (+10).'
        )
      } else {
        setPreviewFileName('semrush_keyword_gap_detik_liputan6.csv')
        setNewKeywordGapBadgeCount(10)
        showSuccess(
          'Impor CSV Perbandingan Kata Kunci Selesai',
          'Berkas semrush_keyword_gap_detik_liputan6.csv berhasil divalidasi. 10 data gap kata kunci siap ditinjau di menu Perbandingan Kata Kunci (+10).'
        )
      }
    }, 600)
  }

  const handleSimulateFilePick = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setLastCsvUploadDate(new Date(2026, 10, 19).toISOString())
      showSuccess(
        'Impor CSV Selesai',
        'Berkas semrush_keywords_export_nov2026.csv (842 kata kunci) berhasil divalidasi & diproses oleh AI.'
      )
    }, 800)
  }

  const handleSimulateDuplicatePick = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setDuplicateFileInfo({
        fileName: 'semrush_export_januari_reupload.csv',
        previousDate: 'Januari 2026',
        similarity: 95,
        matchedKeywords: [
          'cara investasi reksadana pemula',
          'reksadana modal kecil',
          'keuntungan reksadana ojk',
          'reksadana pasar uang tips',
          'cara daftar bansos online kemensos',
          'syarat buka rekening efek',
        ],
      })
      setIsDuplicateAlertOpen(true)
    }, 600)
  }

  const handleDownloadErrorLog = (fileName: string) => {
    const text = `Log Galat Impor CSV: ${fileName}\nTanggal: 3 Jul 2026, 09:31\nBaris 2: Kolom volume 'Teks: N/A' bukan format numerik.`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `error-log-${fileName}.txt`
    a.click()
    showSuccess('Log Galat', `Log galat untuk ${fileName} berhasil diunduh.`)
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
      {isRetentionExceeded && (
        <div className="w-full bg-amber-50/90 border border-amber-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div>
            <h3 className="text-sm font-bold text-amber-950">
              Pemberitahuan Retensi: Perlu Unggah Dataset Kata Kunci Terbaru
            </h3>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              Anda belum mengunggah data kata kunci dari SEMrush dalam waktu <strong>{daysSinceLastUpload} hari terakhir</strong> (batas retensi redaksi: <strong>{csvRetentionDays || 7} hari</strong>). Perbarui dataset riset secara berkala agar arahan editorial dan tren topik tetap relevan serta akurat.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsUploadDropdownOpen(true)}
            className="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Unggah Sekarang
          </button>
        </div>
      )}

      {/* 4. Drag & Drop Upload Zone */}
      <div className="bg-[#EFF6FF] border-2 border-dashed border-[#BFDBFE] rounded-xl p-8 sm:p-10 text-center transition-colors space-y-4">
        <div className="flex justify-center">
          <Upload className="w-7 h-7 text-[#1866EF]" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">
            Tarik dan seret file CSV Semrush di sini, atau klik tombol di bawah
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Hanya format .CSV yang didukung. Maksimal 50.000 baris / 25 MB.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setIsUploadDropdownOpen(!isUploadDropdownOpen)}
              disabled={isUploading}
              className="h-10 px-6 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {isUploading ? (
                'Memproses Berkas...'
              ) : (
                <>
                  <span>Pilih File CSV dari Komputer</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUploadDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </>
              )}
            </button>

            {isUploadDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden text-left py-1.5 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Pilih Format Impor
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectImportType('keyword')}
                  className="w-full px-4 py-3 hover:bg-blue-50/70 text-slate-800 flex items-start gap-3 transition-colors cursor-pointer group text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1866EF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1866EF] group-hover:text-white transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#1866EF]">
                      Impor CSV Kata Kunci
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      Format standar riset kata kunci: Volume, KD%, dan Intensi
                    </div>
                  </div>
                </button>

                <div className="h-px bg-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => handleSelectImportType('keyword_gap')}
                  className="w-full px-4 py-3 hover:bg-blue-50/70 text-slate-800 flex items-start gap-3 transition-colors cursor-pointer group text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <GitCompare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                      Impor CSV Perbandingan Kata Kunci (Keyword Gap)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      Format perbandingan peringkat domain kompetitor (detik.com vs liputan6.com)
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Duplicate Alert Modal */}
      {isDuplicateAlertOpen && duplicateFileInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-xl border border-red-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="px-6 py-4 bg-red-50/80 border-b border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-900">
                    Peringatan: Berkas CSV Terdeteksi Duplikat!
                  </h3>
                  <p className="text-[11px] text-red-600">
                    Sistem mendeteksi kumpulan kata kunci telah diunggah sebelumnya.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDuplicateAlertOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-3 bg-red-50/40 border border-red-100 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Berkas yang diunggah:</span>
                  <strong className="text-slate-900 font-mono">{duplicateFileInfo.fileName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kecocokan 20 Kata Kunci Pertama:</span>
                  <span className="font-bold text-red-700">{duplicateFileInfo.similarity}% Identik</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Riwayat Berkas Sebelumnya:</span>
                  <span className="font-semibold text-slate-800">Dataset {duplicateFileInfo.previousDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Aturan Jeda Kedaluwarsa:</span>
                  <span className="font-semibold text-[#1866EF]">{csvCooldownMonths} Bulan</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1.5">
                  Sampel Kata Kunci yang Cocok (Duplikat):
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  {duplicateFileInfo.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-red-100/60 text-red-800 border border-red-200 rounded text-[11px] font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                <strong className="text-slate-700 font-semibold">Alasan Penolakan:</strong> Berkas ini berisi kumpulan kata kunci yang pernah diproses dalam rentang kurang dari {csvCooldownMonths} bulan. Untuk menjaga viralitas dan relevansi berita di portal RRI, silakan gunakan berkas CSV hasil riset tren Semrush terbaru.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDuplicateAlertOpen(false)}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Paham & Pilih Berkas Lain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row: 3 Cards Informasi CSV (Gaya Manajemen Pengguna) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Jumlah Baris */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Jumlah Baris
          </div>
          <div className="text-xl font-bold text-slate-900">842 Baris</div>
          <div className="text-[11px] text-slate-400 mt-1">Total baris data terbaca dari berkas CSV</div>
        </div>

        {/* Card 2: Data yang Terduplikat */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Data yang Terduplikat
          </div>
          <div className="text-xl font-bold text-[#D97706]">14 Baris</div>
          <div className="text-[11px] text-slate-400 mt-1">Ditemukan query berulang & otomatis difilter</div>
        </div>

        {/* Card 3: Baris yang Tidak Ada Datanya */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Baris yang Tidak Ada Datanya
          </div>
          <div className="text-xl font-bold text-[#DC2626]">5 Baris</div>
          <div className="text-[11px] text-slate-400 mt-1">Nilai kolom kosong atau tidak lengkap</div>
        </div>
      </div>

      {/* 5. Table 1: Pratinjau Berkas CSV Terpilih */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        {/* Table Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Pratinjau file {previewFileName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Format data:{' '}
              <strong className="text-slate-700">
                {selectedImportType === 'keyword'
                  ? 'Riset Kata Kunci Standar (Volume, KD%, Intent)'
                  : 'Perbandingan Kata Kunci (Keyword Gap - Domain Matriks)'}
              </strong>
            </p>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF] flex items-center">
            {selectedImportType === 'keyword' ? 'Simulasi 3 Baris Teratas' : 'Simulasi 5 Baris Teratas'}
          </span>
        </div>

        {/* Clean Table 1 without extra filters */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            {selectedImportType === 'keyword' ? (
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold w-[40%]">Kata Kunci</th>
                    <th className="py-3 px-4 font-semibold w-[20%]">Volume</th>
                    <th className="py-3 px-4 font-semibold w-[20%]">KD%</th>
                    <th className="py-3 px-4 font-semibold w-[20%]">Intensi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {PREVIEW_DATA.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        {item.keyword}
                      </td>
                      <td
                        className={`py-3.5 px-4 font-mono font-medium ${
                          item.isVolumeError ? 'text-[#EF4444]' : 'text-slate-900'
                        }`}
                      >
                        {item.volumeText}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-900">
                        {item.kd}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {item.intent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs min-w-[850px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold min-w-[180px]">Keyword</th>
                    <th className="py-3 px-4 font-semibold min-w-[80px]">Intent</th>
                    <th className="py-3 px-4 font-semibold text-center min-w-[90px]">
                      <span className="inline-flex items-center gap-1.5 justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        detik.com
                      </span>
                    </th>
                    <th className="py-3 px-4 font-semibold text-center min-w-[95px]">
                      <span className="inline-flex items-center gap-1.5 justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        liputan6.com
                      </span>
                    </th>
                    <th className="py-3 px-4 font-semibold text-right min-w-[80px]">Volume</th>
                    <th className="py-3 px-4 font-semibold text-right min-w-[70px]">KD %</th>
                    <th className="py-3 px-4 font-semibold text-right min-w-[70px]">CPC</th>
                    <th className="py-3 px-4 font-semibold text-right min-w-[70px]">Com.</th>
                    <th className="py-3 px-4 font-semibold text-right min-w-[75px]">Results</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {KEYWORD_GAP_PREVIEW_DATA.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {row.keyword}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          {row.intent.map((it, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center justify-center font-bold rounded text-[10px] uppercase ${
                                it === 'n/a'
                                  ? 'text-slate-400 font-normal lowercase'
                                  : it === 'I'
                                  ? 'w-4 h-4 bg-sky-100 text-sky-800 border border-sky-300'
                                  : it === 'T'
                                  ? 'w-4 h-4 bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : it === 'N'
                                  ? 'w-4 h-4 bg-purple-100 text-purple-800 border border-purple-300'
                                  : 'w-4 h-4 bg-amber-100 text-amber-800 border border-amber-300'
                              }`}
                            >
                              {it}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold font-mono text-slate-700 bg-blue-50/20">
                        {row.detikRank}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold font-mono text-slate-700 bg-emerald-50/20">
                        {row.liputan6Rank}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                        {row.volume}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <span className="font-mono font-medium text-slate-800">{row.kd}</span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              row.kd >= 70
                                ? 'bg-rose-500'
                                : row.kd >= 50
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                        {row.cpc}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                        {row.com}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                        {row.results}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* 6. Table 2: Riwayat Impor Data */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            Riwayat Impor Data
          </h2>
        </div>

        {/* Table 2 matching Image 8 */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold w-[28%]">Nama CSV</th>
                  <th className="py-3 px-4 font-semibold w-[14%]">Status</th>
                  <th className="py-3 px-4 font-semibold w-[12%]">Baris</th>
                  <th className="py-3 px-4 font-semibold w-[14%]">Valid</th>
                  <th className="py-3 px-4 font-semibold w-[14%]">Tidak Valid</th>
                  <th className="py-3 px-4 font-semibold w-[18%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {HISTORY_DATA.map((hist) => (
                  <tr key={hist.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{hist.fileName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{hist.uploadDate}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold border ${
                          hist.status === 'Selesai'
                            ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                            : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                        }`}
                      >
                        {hist.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {hist.rowCount}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          hist.isValidError
                            ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                            : 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                        }`}
                      >
                        {hist.validCount}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          hist.isInvalidError
                            ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                            : 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                        }`}
                      >
                        {hist.invalidCount}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {hist.hasErrorLog ? (
                        <button
                          onClick={() => handleDownloadErrorLog(hist.fileName)}
                          className="h-[34px] px-3.5 border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Unduh Log Galat
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs font-normal">
                          Tidak ada galat
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer inside Riwayat Impor Data */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Menampilkan 1-5 dari 42 data</span>
            <div className="relative inline-block">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActivePage(Math.max(1, activePage - 1))}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setActivePage(1)}
              className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                activePage === 1
                  ? 'bg-[#1866EF] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setActivePage(2)}
              className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                activePage === 2
                  ? 'bg-[#1866EF] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setActivePage(3)}
              className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                activePage === 3
                  ? 'bg-[#1866EF] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              onClick={() => setActivePage(10)}
              className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                activePage === 10
                  ? 'bg-[#1866EF] text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              10
            </button>
            <button
              onClick={() => setActivePage(Math.min(10, activePage + 1))}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
