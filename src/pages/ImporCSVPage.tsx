import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'
import {
  Upload,
  ChevronDown,
} from 'lucide-react'

interface PreviewItem {
  id: string
  keyword: string
  volumeText: string
  volumeNum: number
  kd: number
  intent: 'Informational' | 'Transactional' | 'Commercial'
  status: 'Valid' | 'Tidak Valid' | 'Duplikat'
  note: string
}

const INITIAL_PREVIEW_ITEMS: PreviewItem[] = [
  {
    id: 'prv-1',
    keyword: 'cara daftar bansos kemensos online 2027',
    volumeText: '33.100',
    volumeNum: 33100,
    kd: 48,
    intent: 'Informational',
    status: 'Valid',
    note: 'Format data lengkap & siap diimpor',
  },
  {
    id: 'prv-2',
    keyword: 'bantuan subsidi upah pekerja kemnaker',
    volumeText: 'Teks: N/A',
    volumeNum: 0,
    kd: 35,
    intent: 'Transactional',
    status: 'Tidak Valid',
    note: 'Kolom volume bukan angka',
  },
  {
    id: 'prv-3',
    keyword: 'cek desil bansos dtks jateng online',
    volumeText: '14.200',
    volumeNum: 14200,
    kd: 42,
    intent: 'Commercial',
    status: 'Duplikat',
    note: 'Update volume/difficulty',
  },
]

export const ImporCSVPage: React.FC = () => {
  const { showSuccess } = useToast()
  const [isUploading, setIsUploading] = useState<boolean>(false)

  // Filter States (empty string displays the placeholder)
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterVolume, setFilterVolume] = useState<string>('')
  const [filterKd, setFilterKd] = useState<string>('')
  const [filterIntent, setFilterIntent] = useState<string>('')

  const handleSimulateFilePick = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      showSuccess('Impor CSV (Sukses Parsial)', '1.200 baris diimpor. 5 baris diabaikan karena format kolom tidak sesuai.')
    }, 800)
  }

  const handleClearFilters = () => {
    setFilterStatus('')
    setFilterVolume('')
    setFilterKd('')
    setFilterIntent('')
  }

  // Filter logic
  const filteredPreviewItems = INITIAL_PREVIEW_ITEMS.filter((item) => {
    if (filterStatus && item.status !== filterStatus) return false
    if (filterVolume) {
      if (filterVolume === '> 10.000' && item.volumeNum <= 10000) return false
      if (filterVolume === '< 10.000' && (item.volumeNum >= 10000 || item.volumeNum === 0)) return false
    }
    if (filterKd) {
      if (filterKd === '< 30%' && item.kd >= 30) return false
      if (filterKd === '30% - 60%' && (item.kd < 30 || item.kd > 60)) return false
      if (filterKd === '> 60%' && item.kd <= 60) return false
    }
    if (filterIntent && item.intent !== filterIntent) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Impor Data Keyword Semrush
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Unggah berkas CSV hasil riset Semrush, lakukan pemetaan kolom, dan validasi sebelum diproses oleh AI.
        </p>
      </div>

      {/* COMP-TodoList-Editor: 949px Main Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-6">
        {/* Dropzone with Light Blue Background & Dashed Border */}
        <div className="bg-[#EFF6FF] border-2 border-dashed border-[#BFDBFE] rounded-[6px] p-8 text-center transition-colors">
          <div className="flex justify-center mb-3">
            <Upload className="w-6 h-6 text-slate-700" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            Tarik dan seret file CSV Semrush di sini, atau klik tombol di bawah
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Hanya format .CSV yang didukung. Maksimal 50.000 baris / 25 MB.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleSimulateFilePick}
              disabled={isUploading}
              className="h-[40px] px-6 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs cursor-pointer"
            >
              {isUploading ? 'Memproses Berkas...' : 'Pilih File CSV dari Komputer'}
            </button>
          </div>
        </div>

        {/* Tabel Pratinjau Data & Hasil Validasi Otomatis */}
        <div className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                Tabel Pratinjau Data & Hasil Validasi Otomatis
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Hasil validasi awal: 3.418 baris valid, 1 baris tidak valid, 1 baris duplikat.
              </p>
            </div>
            <span className="self-start sm:self-center h-[26px] px-3 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8] flex items-center">
              Simulasi 3 Baris Teratas
            </span>
          </div>

          {/* Filter Row: 4 Dropdowns + Hug Content Clear Filter */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
            {/* Dropdown 1: Status Validasi */}
            <div className="relative flex-1 min-w-[140px] w-full sm:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Status Validasi</option>
                <option value="Valid">Valid</option>
                <option value="Tidak Valid">Tidak Valid</option>
                <option value="Duplikat">Duplikat</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: Volume */}
            <div className="relative flex-1 min-w-[120px] w-full sm:w-auto">
              <select
                value={filterVolume}
                onChange={(e) => setFilterVolume(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterVolume ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Volume</option>
                <option value="> 10.000">&gt; 10.000</option>
                <option value="< 10.000">&lt; 10.000</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 3: Kesulitan Kata Kunci */}
            <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
              <select
                value={filterKd}
                onChange={(e) => setFilterKd(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterKd ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Kesulitan Kata Kunci</option>
                <option value="< 30%">&lt; 30%</option>
                <option value="30% - 60%">30% - 60%</option>
                <option value="> 60%">&gt; 60%</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 4: Intensi */}
            <div className="relative flex-1 min-w-[130px] w-full sm:w-auto">
              <select
                value={filterIntent}
                onChange={(e) => setFilterIntent(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterIntent ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Intensi</option>
                <option value="Informational">Informational</option>
                <option value="Transactional">Transactional</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Bersihkan Filter Button (Hug content) */}
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-auto h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors flex items-center justify-center shrink-0 whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              Bersihkan Filter
            </button>
          </div>

          {/* Preview Table */}
          <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold">Kata Kunci</th>
                    <th className="py-3 px-4 font-semibold">Volume</th>
                    <th className="py-3 px-4 font-semibold">Kesulitan Kata Kunci</th>
                    <th className="py-3 px-4 font-semibold">Intensi</th>
                    <th className="py-3 px-4 font-semibold">Status Validasi</th>
                    <th className="py-3 px-4 font-semibold">Keterangan Validasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredPreviewItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        {item.keyword}
                      </td>
                      <td className={`py-3.5 px-4 font-mono ${item.status === 'Tidak Valid' ? 'font-medium text-[#EF4444]' : 'text-slate-900'}`}>
                        {item.volumeText}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-900">{item.kd}%</td>
                      <td className="py-3.5 px-4 text-slate-700">{item.intent}</td>
                      <td className="py-3.5 px-4">
                        {item.status === 'Valid' && (
                          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                            Valid
                          </span>
                        )}
                        {item.status === 'Tidak Valid' && (
                          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                            Tidak Valid
                          </span>
                        )}
                        {item.status === 'Duplikat' && (
                          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                            Duplikat
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                  {filteredPreviewItems.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                        Tidak ada baris data pratinjau yang cocok dengan filter yang dipilih.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons: ONLY Ganti CSV (Import Kata Kunci removed per user request) */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleSimulateFilePick}
              className="w-full sm:w-auto h-[40px] px-5 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
            >
              Ganti CSV
            </button>
          </div>
        </div>
      </div>

      {/* PANEL-Riwayat-Impor: 949px Standard Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
        {/* Header with 3 Berkas Tersimpan Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Riwayat Impor Data
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Rekam jejak seluruh berkas CSV yang diunggah beserta statistik hasil impor.
            </p>
          </div>
          <span className="self-start sm:self-center h-[26px] px-3 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8] flex items-center">
            3 Berkas Tersimpan
          </span>
        </div>

        {/* Table matching Figma */}
        <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold">Nama CSV</th>
                  <th className="py-3 px-4 font-semibold">Pengunggah</th>
                  <th className="py-3 px-4 font-semibold">Statistik Hasil Impor</th>
                  <th className="py-3 px-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                    semrush_export_nov.csv
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">Budi Prasetyo (Editor)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">06 Nov 2026, 14:00 WIB</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                          5.000 Total
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                          4.800 Berhasil
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                          150 Duplikat
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                          50 Gagal
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {}}
                      className="h-[36px] px-4 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
                    >
                      Unduh Log Galat
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                    semrush_mudik_transjawa_2027.csv
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">Cameron Newton (Editor)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">06 Nov 2026, 14:00 WIB</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                          5.000 Total
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                          4.800 Berhasil
                        </span>
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                          150 Duplikat
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => {}}
                      className="h-[36px] px-4 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
                    >
                      Unduh Log Galat
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                    semrush_bansos_nasional_batch1.csv
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">Siti Rahma (Editor)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">06 Nov 2026, 14:00 WIB</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                        5.000 Total
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                        4.800 Berhasil
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    Tidak ada galat
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
