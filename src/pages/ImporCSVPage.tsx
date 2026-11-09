import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  Upload,
  ChevronDown,
} from 'lucide-react'

export const ImporCSVPage: React.FC = () => {
  const { setCurrentPage } = useApp()
  const { showSuccess } = useToast()
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const handleSimulateFilePick = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      showSuccess('Impor CSV (Sukses Parsial)', '1.200 baris diimpor. 5 baris diabaikan karena format kolom tidak sesuai.')
    }, 800)
  }

  const handleImportSubmit = () => {
    showSuccess('Manajemen kata kunci', 'Aturan kelayakan berhasil disimpan.')
    setCurrentPage('keyword')
  }

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
              className="h-[40px] px-6 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
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

          {/* Filter Row: 4 Dropdowns + Bersihkan Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="relative">
              <select className="w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <option>Status Validasi</option>
                <option>Valid</option>
                <option>Tidak Valid</option>
                <option>Duplikat</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <option>Volume</option>
                <option>&gt; 10.000</option>
                <option>&lt; 10.000</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <option>Kesulitan Kata Kunci</option>
                <option>&lt; 30%</option>
                <option>30% - 60%</option>
                <option>&gt; 60%</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select className="w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                <option>Intensi</option>
                <option>Informational</option>
                <option>Transactional</option>
                <option>Commercial</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <button
              type="button"
              className="w-full h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors flex items-center justify-center"
            >
              Bersihkan Filter
            </button>
          </div>

          {/* Preview Table */}
          <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
            <table className="w-full text-left text-xs">
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
                {/* Row 1: Valid */}
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    cara daftar bansos kemensos online 2027
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-900">33.100</td>
                  <td className="py-3.5 px-4 font-mono text-slate-900">48%</td>
                  <td className="py-3.5 px-4 text-slate-700">Informational</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                      Valid
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    Format data lengkap & siap diimpor
                  </td>
                </tr>

                {/* Row 2: Tidak Valid */}
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    bantuan subsidi upah pekerja kemnaker
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-[#EF4444]">Teks: N/A</td>
                  <td className="py-3.5 px-4 font-mono text-slate-900">35%</td>
                  <td className="py-3.5 px-4 text-slate-700">Transaksional</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                      Tidak Valid
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    Kolom volume bukan angka
                  </td>
                </tr>

                {/* Row 3: Duplikat */}
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    cek desil bansos dtks jateng online
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-900">14.200</td>
                  <td className="py-3.5 px-4 font-mono text-slate-900">42%</td>
                  <td className="py-3.5 px-4 text-slate-700">Komersial</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                      Duplikat
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    Update volume/difficulty
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => {}}
              className="h-[40px] px-5 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
            >
              Ganti CSV
            </button>
            <button
              onClick={handleImportSubmit}
              className="h-[40px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
            >
              Import Kata Kunci
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
          <table className="w-full text-left text-xs">
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
                    className="h-[36px] px-4 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
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
                    className="h-[36px] px-4 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
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
  )
}
