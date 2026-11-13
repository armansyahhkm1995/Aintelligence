import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { Upload, ChevronDown } from 'lucide-react'
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
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [pageSize, setPageSize] = useState<number>(10)
  const [activePage, setActivePage] = useState<number>(1)

  const handleSimulateFilePick = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      showSuccess('Impor CSV', 'Berkas semrush_export_nov.csv berhasil diproses oleh sistem AI.')
    }, 800)
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

      {/* 4. Drag & Drop Upload Zone */}
      <div className="bg-[#EFF6FF] border-2 border-dashed border-[#BFDBFE] rounded-xl p-8 sm:p-10 text-center transition-colors">
        <div className="flex justify-center mb-3">
          <Upload className="w-6 h-6 text-slate-700" />
        </div>
        <h2 className="text-sm font-bold text-slate-900 mb-1">
          Tarik dan seret file CSV Semrush di sini, atau klik tombol di bawah
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-5">
          Hanya format .CSV yang didukung. Maksimal 50.000 baris / 25 MB.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleSimulateFilePick}
            disabled={isUploading}
            className="h-10 px-6 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
          >
            {isUploading ? 'Memproses Berkas...' : 'Pilih File CSV dari Komputer'}
          </button>
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
            <p className="text-xs text-slate-400 mt-0.5">
              4 dari 842 baris pertama
            </p>
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
