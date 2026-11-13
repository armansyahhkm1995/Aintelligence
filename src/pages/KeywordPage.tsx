import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { KeywordItem } from '../types'
import {
  Search,
  ChevronDown,
  Edit3,
} from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

export const KeywordPage: React.FC = () => {
  const {
    selectedKeywordIds,
    toggleKeywordSelect,
    selectAllKeywords,
    clearKeywordSelect,
    setIsBulkOverrideOpen,
    setIsSingleOverrideOpen,
    setTargetKeywordForOverride,
  } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterUnggahan, setFilterUnggahan] = useState('')
  const [filterIntensi, setFilterIntensi] = useState('')
  const [filterAturan, setFilterAturan] = useState('')
  const [filterKelayakan, setFilterKelayakan] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Dummy items exactly as shown in user screenshot
  const displayKeywords: KeywordItem[] = [
    {
      id: 'KWD-101',
      keyword: 'cara daftar bansos kemensos online 2027',
      aturan: 'Kata kunci tentang judi',
      sourceFile: 'semrush_export_nov.csv',
      volume: 18200,
      kd: 35,
      intent: 'Informational' as const,
      aiTopic: 'Bansos & Sosial',
      evergreenScore: 92,
      kelayakanAI: 'Layak' as const,
      aiReason: 'Alasan AI: Terkena aturan filter risiko penghentian program',
      status: 'Dikelompokkan' as const,
    },
    {
      id: 'KWD-102',
      keyword: 'bantuan subsidi upah pekerja kemnaker',
      aturan: 'Kata kunci tentang judi',
      sourceFile: 'semrush_export_nov.csv',
      volume: 18200,
      kd: 35,
      intent: 'Transactional' as const,
      aiTopic: 'Ketenagakerjaan',
      evergreenScore: 65,
      kelayakanAI: 'Tidak Layak' as const,
      aiReason: 'Alasan AI: Terkena aturan filter risiko penghentian program',
      status: 'Baru' as const,
    },
    {
      id: 'KWD-103',
      keyword: 'cek desil bansos dtks jateng online',
      aturan: 'Kata kunci tentang judi',
      sourceFile: 'semrush_export_nov.csv',
      volume: 22800,
      kd: 58,
      intent: 'Commercial' as const,
      aiTopic: 'Perbankan & Fintech',
      evergreenScore: 25,
      kelayakanAI: 'Tidak Layak' as const,
      aiReason: 'Alasan AI: Terkena aturan filter risiko penghentian program',
      status: 'Baru' as const,
    },
  ]

  const filteredKeywords = displayKeywords.filter((kw) => {
    if (searchQuery.trim() && !kw.keyword.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
      return false
    }
    if (filterUnggahan && kw.sourceFile !== filterUnggahan) return false
    if (filterIntensi && kw.intent !== filterIntensi) return false
    if (filterAturan && !kw.aturan.toLowerCase().includes(filterAturan.toLowerCase())) return false
    if (filterKelayakan && kw.kelayakanAI !== filterKelayakan) return false
    if (filterStatus && kw.status !== filterStatus) return false
    return true
  })

  const isAllSelected =
    filteredKeywords.length > 0 &&
    filteredKeywords.every((k) => (selectedKeywordIds || []).includes(k.id))

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterUnggahan('')
    setFilterIntensi('')
    setFilterAturan('')
    setFilterKelayakan('')
    setFilterStatus('')
  }

  const handleOpenSingleOverride = (kw: KeywordItem) => {
    setTargetKeywordForOverride(kw)
    setIsSingleOverrideOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400">
        <span>Riset & Produksi Berita</span>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#1866EF] font-semibold">Saring Kata Kunci</span>
      </div>

      {/* 1. Milestone Stepper: Step 2 Active */}
      <MilestoneStepper currentStep={2} />

      {/* Title and description */}
      <div>
        <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
          50 Daftar Keyword & Klasifikasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Tinjau kelayakan kata kunci dari Semrush, filter topik liputan, dan lakukan koreksi manual (override) redaksional.
        </p>
      </div>

      {/* 2. Next Step Banner */}
      <NextStepBanner currentStep={2} />

      {/* COMP-TodoList-Editor: 949px Standard Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
        {/* Bulk Actions Banner if selected */}
        {(selectedKeywordIds || []).length > 0 && (
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[6px] p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#1D4ED8] font-semibold">
              <span>{(selectedKeywordIds || []).length} Kata Kunci Dipilih</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBulkOverrideOpen(true)}
                className="h-[32px] px-3.5 bg-[#1866EF] hover:bg-blue-600 text-white font-semibold rounded-[4px] transition-colors shadow-xs"
              >
                Koreksi Massal (Bulk Override)
              </button>
              <button
                onClick={clearKeywordSelect}
                className="h-[32px] px-3 border border-[#DBEAFE] hover:bg-white text-slate-600 rounded-[4px] transition-colors"
              >
                Batalkan
              </button>
            </div>
          </div>
        )}

        {/* Filter Controls matching screenshot: Search + 2 rows of 3 columns */}
        <div className="space-y-3">
          {/* Search Box */}
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

          {/* Row 1: 3 Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Dropdown 1: Unggahan Asal */}
            <div className="relative">
              <select
                value={filterUnggahan}
                onChange={(e) => setFilterUnggahan(e.target.value)}
                className={`w-full h-[40px] px-3 pr-7 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate ${
                  filterUnggahan ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Pilih: Unggahan Asal</option>
                <option value="semrush_export_nov.csv">semrush_export_nov.csv</option>
                <option value="semrush_finansial_q4.csv">semrush_finansial_q4.csv</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: Intensi */}
            <div className="relative">
              <select
                value={filterIntensi}
                onChange={(e) => setFilterIntensi(e.target.value)}
                className={`w-full h-[40px] px-3 pr-7 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate ${
                  filterIntensi ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Pilih: Intensi</option>
                <option value="Informational">Informasional</option>
                <option value="Commercial">Komersial</option>
                <option value="Transactional">Transaksional</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 3: Aturan Filter */}
            <div className="relative">
              <select
                value={filterAturan}
                onChange={(e) => setFilterAturan(e.target.value)}
                className={`w-full h-[40px] px-3 pr-7 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate ${
                  filterAturan ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Pilih: Aturan Filter</option>
                <option value="Judi">Kata kunci tentang judi</option>
                <option value="Musiman">Filter Musiman</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Row 2: 2 Dropdowns + Hug Content Bersihkan Filter Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Dropdown 4: Kelayakan */}
            <div className="relative flex-1 w-full">
              <select
                value={filterKelayakan}
                onChange={(e) => setFilterKelayakan(e.target.value)}
                className={`w-full h-[40px] px-3 pr-7 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate ${
                  filterKelayakan ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Pilih: Kelayakan</option>
                <option value="Layak">Layak</option>
                <option value="Tidak Layak">Tidak Layak</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 5: Status */}
            <div className="relative flex-1 w-full">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full h-[40px] px-3 pr-7 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer truncate ${
                  filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Pilih: Status</option>
                <option value="Dikelompokkan">Dikelompokkan</option>
                <option value="Baru">Baru</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Bersihkan Filter Button (Hug Content) */}
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-auto h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors flex items-center justify-center shrink-0 whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

        {/* Keywords Table matching user screenshot */}
        <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[950px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                  <th className="py-3 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => selectAllKeywords(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="py-3 px-3 font-semibold">^ Kata Kunci</th>
                  <th className="py-3 px-3 font-semibold">Aturan</th>
                  <th className="py-3 px-3 font-semibold">Unggahan Asal</th>
                  <th className="py-3 px-3 font-semibold">Volume | KD</th>
                  <th className="py-3 px-3 font-semibold">Intensi</th>
                  <th className="py-3 px-3 font-semibold">Topik AI</th>
                  <th className="py-3 px-3 font-semibold">Evergreen</th>
                  <th className="py-3 px-3 font-semibold">Kelayakan AI</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-3 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredKeywords.map((kw, idx) => {
                  const isSelected = (selectedKeywordIds || []).includes(kw.id)
                  const isLayak = kw.kelayakanAI === 'Layak'

                  // Intent pill colors
                  const intentClass =
                    kw.intent === 'Informational'
                      ? 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]'
                      : kw.intent === 'Transactional'
                      ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                      : 'bg-[#FDF4FF] text-[#A21CAF] border-[#F5D0FE]'

                  // Evergreen color
                  const evergreenColor =
                    kw.evergreenScore >= 80
                      ? 'text-[#15803D]'
                      : kw.evergreenScore >= 50
                      ? 'text-[#B45309]'
                      : 'text-[#B91C1C]'

                  return (
                    <tr
                      key={kw.id || idx}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleKeywordSelect(kw.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-3.5 px-3 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                            judi
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                            slot gacor
                          </span>
                        </div>
                        <div className="text-[11px] font-medium text-[#B91C1C] leading-snug">
                          {kw.aiReason}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-900 text-xs">
                        {kw.aturan}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 text-xs font-mono">
                        {kw.sourceFile}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">
                          {(kw.volume || 0).toLocaleString('id-ID')}
                        </div>
                        <div className="text-[11px] text-slate-400">KD: {kw.kd}%</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${intentClass}`}
                        >
                          {kw.intent === 'Informational'
                            ? 'Informasional'
                            : kw.intent === 'Transactional'
                            ? 'Transaksional'
                            : 'Komersial'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 text-xs font-medium">
                        {kw.aiTopic}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`font-bold text-xs ${evergreenColor}`}>
                          {kw.evergreenScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                            isLayak
                              ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                              : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                          }`}
                        >
                          {kw.kelayakanAI}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                          {kw.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleOpenSingleOverride(kw)}
                          className="p-1.5 border border-[#DBEAFE] hover:bg-slate-50 text-slate-700 rounded transition-colors"
                          title="Koreksi"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {filteredKeywords.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-8 text-center text-xs text-slate-400">
                      Tidak ada kata kunci yang cocok dengan pencarian atau filter yang dipilih.
                    </td>
                  </tr>
                )}
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
