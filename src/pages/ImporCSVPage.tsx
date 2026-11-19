import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { useApp } from '../context/AppContext'
import { Upload, ChevronDown, AlertTriangle, X, ShieldAlert, CheckCircle2, Clock } from 'lucide-react'
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
  const { csvCooldownMonths } = useApp()
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

  const handleSimulateFilePick = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      showSuccess(
        'Impor CSV Selesai',
        'Berkas semrush_export_desember_2026.csv (842 kata kunci) berhasil divalidasi & diproses oleh AI.'
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

      {/* 4. Drag & Drop Upload Zone with Revalidation Status */}
      <div className="bg-[#EFF6FF] border-2 border-dashed border-[#BFDBFE] rounded-xl p-8 sm:p-10 text-center transition-colors space-y-4">
        {/* Policy pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#BFDBFE] rounded-full text-[11px] text-[#1866EF] font-semibold shadow-2xs">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            Batas Kedaluwarsa: Jeda {csvCooldownMonths} Bulan • Validasi Otomatis Sampel 20 Kata Kunci Pertama
          </span>
        </div>

        <div className="flex justify-center">
          <Upload className="w-7 h-7 text-[#1866EF]" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">
            Tarik dan seret file CSV Semrush di sini, atau klik tombol di bawah
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Hanya format .CSV yang didukung. Maksimal 50.000 baris / 25 MB. Sistem otomatis memvalidasi 20 kata kunci teratas.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSimulateFilePick}
            disabled={isUploading}
            className="h-10 px-6 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
          >
            {isUploading ? 'Memproses Berkas...' : 'Pilih File CSV dari Komputer'}
          </button>

          <button
            onClick={handleSimulateDuplicatePick}
            disabled={isUploading}
            className="h-10 px-4 bg-white hover:bg-amber-50 text-[#B45309] border border-[#FDE68A] text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            title="Klik untuk mensimulasikan upload berkas yang isinya sama dengan data lampau"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Simulasikan Berkas Duplikat</span>
          </button>
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

      {/* 5. Table 1: Pratinjau file semrush CSV */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        {/* Table Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Pratinjau file semrush CSV
            </h2>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF] flex items-center">
            Simulasi 3 Baris Teratas
          </span>
        </div>

        {/* Clean Table 1 without extra filters */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
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
