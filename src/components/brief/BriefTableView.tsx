import React, { useState } from 'react'
import { Search, ChevronDown, Lock, Eye, Edit, RefreshCw } from 'lucide-react'
import { MilestoneStepper } from '../common/MilestoneStepper'
import { NextStepBanner } from '../common/NextStepBanner'
import { BriefTableRow } from './types'

interface BriefTableViewProps {
  briefList: BriefTableRow[]
  currentUser: { name?: string; role?: string } | null
  onRowClick: (item: BriefTableRow) => void
  onRetryProcess: (id: string, e: React.MouseEvent) => void
}

export const BriefTableView: React.FC<BriefTableViewProps> = ({
  briefList,
  currentUser,
  onRowClick,
  onRetryProcess,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Tersedia' | 'Diambil' | 'Disetujui' | 'Dibuat ulang'>('Semua')
  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const filteredBriefs = briefList.filter((row) => {
    const matchSearch =
      row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.mainKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.editor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus =
      statusFilter === 'Semua'
        ? true
        : row.status.toLowerCase().includes(statusFilter.toLowerCase())
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 4 Active (Hanya untuk Admin, disembunyikan untuk Editor) */}
      {currentUser?.role !== 'editor' && <MilestoneStepper currentStep={4} />}

      {/* 2. Page Title and Description */}
      <div>
        <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
          50 Daftar Arahan Artikel
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Tinjau sudut pandang liputan, struktur heading H2/H3, entitas wajib, dan setujui brief sebelum diteruskan ke penulisan draf AI.
        </p>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={4} />

      {/* 4. Table Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        {/* Search & Filter Header Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul artikel ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
            />
          </div>

          <div className="relative w-full sm:w-[180px] shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-10 px-3.5 pr-8 text-xs bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-[#1866EF] text-slate-700 cursor-pointer"
            >
              <option value="Semua">Pilih: Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Diambil">Diambil Editor</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Dibuat ulang">Dibuat Ulang</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold w-[24%]">Judul Artikel</th>
                  <th className="py-3 px-4 font-semibold w-[16%]">Kata Kunci Utama</th>
                  <th className="py-3 px-4 font-semibold w-[18%]">Kata Kunci Pendukung</th>
                  <th className="py-3 px-4 font-semibold w-[13%]">Status Proses</th>
                  <th className="py-3 px-4 font-semibold w-[12%]">Editor</th>
                  <th className="py-3 px-4 font-semibold w-[11%]">Ketersediaan</th>
                  <th className="py-3 px-4 font-semibold text-center w-[6%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredBriefs.map((item) => {
                  const isApprovedItem = item.status.toLowerCase().includes('disetujui')
                  const isLockedByOther =
                    !isApprovedItem &&
                    item.processStatus === 'selesai' &&
                    item.editor !== '-' &&
                    (item.id === 'BRF-008' ||
                      (!item.editor.toLowerCase().includes((currentUser?.name || '').toLowerCase()) &&
                       !(currentUser?.name || '').toLowerCase().includes(item.editor.toLowerCase())))

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onRowClick(item)}
                      className={`transition-colors cursor-pointer group ${
                        item.processStatus !== 'selesai'
                          ? 'bg-slate-50/40 hover:bg-slate-50'
                          : isLockedByOther
                          ? 'bg-amber-50/30 hover:bg-amber-50/60'
                          : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#1866EF] transition-colors leading-relaxed">
                        <div className="flex items-center gap-2">
                          {isLockedByOther && (
                            <span title={`Sedang dikunci oleh ${item.editor}`}>
                              <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            </span>
                          )}
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-medium text-slate-800">
                          {item.mainKeyword}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.supportingKeywords.join(', ')}
                        </p>
                      </td>

                      {/* Kolom Status Proses */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.processStatus === 'selesai' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Selesai
                          </span>
                        ) : item.processStatus === 'diproses' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            Diproses
                          </span>
                        ) : item.processStatus === 'antre' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            Antre
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              Gagal
                            </span>
                            {currentUser?.role === 'admin' && (
                              <button
                                type="button"
                                onClick={(e) => onRetryProcess(item.id, e)}
                                className="p-1 px-1.5 rounded-md text-slate-600 hover:text-[#1866EF] hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                                title="Muat ulang proses (kembalikan ke antrean)"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Muat Ulang</span>
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Kolom Editor */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.processStatus !== 'selesai' ? (
                          <span className="text-slate-400 font-normal italic">-</span>
                        ) : item.editor !== '-' ? (
                          <span className="font-medium text-slate-800 text-xs">
                            {item.editor}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal italic">-</span>
                        )}
                      </td>

                      {/* Kolom Ketersediaan */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.processStatus !== 'selesai' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-rose-50 text-rose-700 border-rose-200">
                            Belum Tersedia
                          </span>
                        ) : item.status === 'Tersedia' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]">
                            Tersedia
                          </span>
                        ) : item.status.startsWith('Diambil') ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-amber-50 text-amber-700 border-amber-200">
                            <Lock className="w-3 h-3 shrink-0" />
                            <span>{item.status}</span>
                          </span>
                        ) : (
                          <span className="text-slate-700 font-medium text-xs">
                            {item.status}
                          </span>
                        )}
                      </td>

                      {/* Kolom Aksi */}
                      <td className="py-3.5 px-4 text-center">
                        {item.processStatus !== 'selesai' ? (
                          <span className="text-slate-400 font-normal italic">-</span>
                        ) : isApprovedItem ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onRowClick(item)
                            }}
                            className="p-1.5 border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Lihat Arahan Artikel (Disetujui)"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onRowClick(item)
                            }}
                            className={`p-1.5 border rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center ${
                              isLockedByOther
                                ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                            }`}
                            title={isLockedByOther ? `Sedang dikerjakan oleh ${item.editor}` : 'Buka Arahan Artikel'}
                          >
                            {isLockedByOther ? <Lock className="w-3.5 h-3.5" /> : <Edit className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {filteredBriefs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Tidak ada arahan artikel yang cocok dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Menampilkan 1-{Math.min(pageSize, filteredBriefs.length)} dari 50 data</span>
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
              type="button"
              onClick={() => setActivePage(Math.max(1, activePage - 1))}
              disabled={activePage === 1}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-[#1866EF] text-white font-bold flex items-center justify-center cursor-pointer"
            >
              {activePage}
            </button>
            <button
              type="button"
              onClick={() => setActivePage(activePage + 1)}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
