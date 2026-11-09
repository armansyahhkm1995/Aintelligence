import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import {
  Search,
  ChevronDown,
} from 'lucide-react'

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterTime, setFilterTime] = useState('')

  const safeLogs = Array.isArray(auditLogs) && auditLogs.length > 0
    ? auditLogs
    : [
        {
          id: 'LOG-01',
          timestamp: '06 Nov 2026 14:15',
          timezone: 'Asia/Jakarta (WIB)',
          user: 'Budi Prasetyo (Anda)',
          role: 'Admin',
          category: 'Koreksi Keyword',
          details: "Mengubah kelayakan keyword 'saham' menjadi 'Tidak Layak'. Alasan: Terlalu luas untuk audiens RRI.",
        },
        {
          id: 'LOG-02',
          timestamp: '06 Nov 2026 14:15',
          timezone: 'Asia/Jakarta (WIB)',
          user: 'Budi Prasetyo (Anda)',
          role: 'Editor',
          category: 'Aktivitas Sistem AI',
          details: "Menghasilkan Draf Artikel untuk cluster 'Reksadana'. (Model: Claude-3.5-Sonnet, Aturan Filter: v2.1).",
        },
        {
          id: 'LOG-03',
          timestamp: '06 Nov 2026 14:15',
          timezone: 'Asia/Jakarta (WIB)',
          user: 'Budi Prasetyo (Anda)',
          role: 'Editor',
          category: 'Persetujuan',
          details: "Menyetujui Brief Artikel ID-B449 untuk dilanjutkan ke antrean Draf AI.",
        },
        {
          id: 'LOG-04',
          timestamp: '06 Nov 2026 14:15',
          timezone: 'Asia/Jakarta (WIB)',
          user: 'Budi Prasetyo (Anda)',
          role: 'Editor',
          category: 'Perubahan Aturan',
          details: "Menambahkan aturan filter keyword baru: 'piala dunia' (Kategori: Musiman).",
        },
        {
          id: 'LOG-05',
          timestamp: '06 Nov 2026 14:15',
          timezone: 'Asia/Jakarta (WIB)',
          user: 'Budi Prasetyo (Anda)',
          role: 'Editor',
          category: 'Unggah CSV',
          details: "Mengimpor file 'semrush_finansial_q4.csv' (1.250 keyword diproses, 18 tereliminasi otomatis).",
        },
      ]

  const filteredLogs = safeLogs.filter((log) => {
    if (!log) return false
    const matchSearch =
      (log.details || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = !filterCategory || log.category === filterCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="space-y-6">
      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Log Audit & Keamanan
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Buku catatan permanen (append-only) untuk akuntabilitas sistem dan penelusuran model AI.
        </p>
      </div>

      {/* COMP-TodoList-Editor: 949px Standard Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
        {/* Filter Controls: Search Box placed ABOVE filters */}
        <div className="space-y-3">
          {/* Search Box on Top */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci ..."
              className="w-full h-[40px] pl-10 pr-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filters Row: 2 Dropdowns + Hug Content Clear Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Dropdown 1: Kategori */}
            <div className="relative flex-1 w-full">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterCategory ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Semua Kategori Aktivitas</option>
                <option value="Koreksi Keyword">Koreksi Keyword</option>
                <option value="Aktivitas Sistem AI">Aktivitas Sistem AI</option>
                <option value="Persetujuan">Persetujuan</option>
                <option value="Perubahan Aturan">Perubahan Aturan</option>
                <option value="Unggah CSV">Unggah CSV</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: Waktu */}
            <div className="relative flex-1 w-full">
              <select
                value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterTime ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>7 Hari Terakhir</option>
                <option value="7_hari">7 Hari Terakhir</option>
                <option value="30_hari">30 Hari Terakhir</option>
                <option value="semua">Semua Waktu</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Hug Content Clear Button */}
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setFilterCategory('')
                setFilterTime('')
              }}
              className="w-auto h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                <th className="py-3 px-4 font-semibold w-40">Waktu (WIB)</th>
                <th className="py-3 px-4 font-semibold w-48">Pengguna & Peran</th>
                <th className="py-3 px-4 font-semibold w-40">Kategori</th>
                <th className="py-3 px-4 font-semibold">Detail Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredLogs.map((log, idx) => (
                <tr key={log.id || idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-semibold text-slate-900">{log.timestamp}</div>
                    <div className="text-[10px] text-slate-400">{log.timezone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{log.user}</div>
                    {/* Plain text role without pill/tag */}
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      {log.role}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {/* Plain text category without pill/tag */}
                    <div className="text-xs text-slate-800 font-normal">
                      {log.category}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* Pagination Bar */}
          <div className="p-3.5 bg-white border-t border-[#DBEAFE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <span>Menampilkan 1-5 dari 42 data</span>
              <div className="relative">
                <select className="h-[28px] pl-2 pr-6 bg-white border border-[#DBEAFE] rounded text-xs text-slate-700 appearance-none cursor-pointer">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
              <button className="h-[28px] px-2.5 sm:px-3 rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs shrink-0">
                Sebelumnya
              </button>
              <button className="h-[28px] w-[28px] rounded bg-[#1866EF] text-white font-bold text-xs flex items-center justify-center shrink-0">
                1
              </button>
              <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center shrink-0">
                2
              </button>
              <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center shrink-0">
                3
              </button>
              <span className="px-1 text-slate-400 shrink-0">...</span>
              <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center shrink-0">
                10
              </button>
              <button className="h-[28px] px-2.5 sm:px-3 rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs shrink-0">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
