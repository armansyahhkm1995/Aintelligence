import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  Search,
  ChevronDown,
  Sparkles,
  Edit,
  ChevronUp,
} from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

interface KeywordRow {
  id: string
  keywordName: string
  vol: string
  kd: number
  intent: 'Informasional' | 'Transaksional' | 'Komersial'
  topic: string
  contentType: string
  keywordRisk: 'Musiman' | 'Berisiko' | 'Non-evergreen'
  evergreenScore: number
  overlapScore: number
  decision: 'Layak' | 'Tidak Layak' | 'Perlu Ditinjau'
  decisionReason: string
}

const INITIAL_KEYWORDS: KeywordRow[] = [
  {
    id: 'KWD-01',
    keywordName: 'Kata kunci tentang judi',
    vol: '8.100',
    kd: 32,
    intent: 'Informasional',
    topic: 'Bansos & Sosial',
    contentType: 'Panduan layanan',
    keywordRisk: 'Berisiko',
    evergreenScore: 92,
    overlapScore: 92,
    decision: 'Layak',
    decisionReason: 'intent stabil',
  },
  {
    id: 'KWD-02',
    keywordName: 'Kata kunci tentang judi',
    vol: '8.100',
    kd: 32,
    intent: 'Transaksional',
    topic: 'Ketenagakerjaan',
    contentType: 'Panduan layanan',
    keywordRisk: 'Berisiko',
    evergreenScore: 65,
    overlapScore: 65,
    decision: 'Tidak Layak',
    decisionReason: 'topik perlu tinjauan',
  },
  {
    id: 'KWD-03',
    keywordName: 'Kata kunci tentang judi',
    vol: '8.100',
    kd: 32,
    intent: 'Komersial',
    topic: 'Perbankan & Fintech',
    contentType: 'Panduan layanan',
    keywordRisk: 'Non-evergreen',
    evergreenScore: 25,
    overlapScore: 25,
    decision: 'Perlu Ditinjau',
    decisionReason: 'layak evergreen',
  },
  {
    id: 'KWD-04',
    keywordName: 'cara daftar bansos kemensos online 2027',
    vol: '33.100',
    kd: 48,
    intent: 'Informasional',
    topic: 'Bansos & Sosial',
    contentType: 'Panduan layanan',
    keywordRisk: 'Musiman',
    evergreenScore: 94,
    overlapScore: 12,
    decision: 'Layak',
    decisionReason: 'intent stabil',
  },
  {
    id: 'KWD-05',
    keywordName: 'cek desil bansos dtks jateng online',
    vol: '14.200',
    kd: 42,
    intent: 'Komersial',
    topic: 'Bansos & Sosial',
    contentType: 'Panduan layanan',
    keywordRisk: 'Non-evergreen',
    evergreenScore: 40,
    overlapScore: 68,
    decision: 'Perlu Ditinjau',
    decisionReason: 'topik perlu tinjauan',
  },
]

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
  const { showSuccess } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterRule, setFilterRule] = useState<'Semua' | 'Musiman' | 'Berisiko' | 'Non-evergreen'>('Semua')
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Layak' | 'Tidak Layak' | 'Perlu Ditinjau'>('Semua')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [activePage, setActivePage] = useState<number>(1)

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterRule('Semua')
    setFilterStatus('Semua')
  }

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredKeywords.length) {
      setSelectedIds([])
      clearKeywordSelect()
    } else {
      const allIds = filteredKeywords.map((k) => k.id)
      setSelectedIds(allIds)
      selectAllKeywords(true)
    }
  }

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
    toggleKeywordSelect(id)
  }

  const handleOpenBulkOverride = () => {
    setIsBulkOverrideOpen(true)
  }

  const handleClassifyWithAI = () => {
    showSuccess('AI Assistant', 'AI sedang mengklasifikasikan 50 kata kunci berdasarkan intent & kelayakan...')
  }

  const handleOpenEdit = (kw: KeywordRow) => {
    // Adapter for AppContext modal
    setTargetKeywordForOverride({
      id: kw.id,
      keyword: kw.keywordName,
      aturan: 'Kata kunci tentang judi',
      sourceFile: 'semrush_export_nov.csv',
      volume: parseInt(kw.vol.replace('.', '')) || 8100,
      kd: kw.kd,
      intent: kw.intent === 'Informasional' ? 'Informational' : kw.intent === 'Transaksional' ? 'Transactional' : 'Commercial',
      aiTopic: kw.topic,
      evergreenScore: kw.evergreenScore,
      kelayakanAI: kw.decision === 'Layak' ? 'Layak' : 'Tidak Layak',
      aiReason: kw.decisionReason,
      status: 'Baru',
    })
    setIsSingleOverrideOpen(true)
  }

  const filteredKeywords = INITIAL_KEYWORDS.filter((row) => {
    const matchSearch =
      row.keywordName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.topic.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus =
      filterStatus === 'Semua' ? true : row.decision === filterStatus
    const matchRule =
      filterRule === 'Semua' ? true : row.keywordRisk === filterRule
    return matchSearch && matchStatus && matchRule
  })

  const isHeaderChecked =
    filteredKeywords.length > 0 && selectedIds.length === filteredKeywords.length
  const showBulkAction = selectedIds.length > 1 || isHeaderChecked

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 2 Active */}
      <MilestoneStepper currentStep={2} />

      {/* 2. Page Title and Description with AI Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            50 Daftar Kata Kunci
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Tinjau kelayakan kata kunci dari Semrush, filter topik liputan, dan lakukan koreksi manual (override) redaksional.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClassifyWithAI}
          className="h-10 px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Klasifikasikan Kata Kunci dengan AI</span>
        </button>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={2} />

      {/* 4. Three Summary Stat Cards matching Image 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Layak Card */}
        <div className="bg-[#ECFDF5]/50 border border-[#A7F3D0] rounded-xl p-4 flex items-center justify-between shadow-2xs">
          <span className="text-xs font-bold text-[#15803D]">Layak</span>
          <span className="text-2xl font-extrabold text-[#15803D]">486</span>
        </div>

        {/* Perlu Ditinjau Card */}
        <div className="bg-[#FFFBEB]/50 border border-[#FDE68A] rounded-xl p-4 flex items-center justify-between shadow-2xs">
          <span className="text-xs font-bold text-[#B45309]">Perlu Ditinjau</span>
          <span className="text-2xl font-extrabold text-[#B45309]">486</span>
        </div>

        {/* Tidak Layak Card */}
        <div className="bg-[#FEF2F2]/50 border border-[#FECACA] rounded-xl p-4 flex items-center justify-between shadow-2xs">
          <span className="text-xs font-bold text-[#B91C1C]">Tidak Layak</span>
          <span className="text-2xl font-extrabold text-[#B91C1C]">486</span>
        </div>
      </div>

      {/* 5. Main Table Container matching Image 1 */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        {/* Full width Search Box (100% mengikuti parent div) */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kata kunci ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
          />
        </div>

        {/* Filter Dropdowns + Bersihkan Filter Button (Layout persis seperti Kelompok Topik) */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
          {/* Filter Aturan Kata Kunci */}
          <div className="relative flex-1 min-w-[180px] w-full sm:w-auto">
            <select
              value={filterRule}
              onChange={(e) => setFilterRule(e.target.value as any)}
              className="w-full h-10 px-3.5 pr-8 text-xs bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-[#1866EF] text-slate-700 cursor-pointer"
            >
              <option value="Semua">Pilih: Semua Aturan Kata Kunci</option>
              <option value="Musiman">Musiman</option>
              <option value="Berisiko">Berisiko</option>
              <option value="Non-evergreen">Non-evergreen</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Status */}
          <div className="relative flex-1 min-w-[180px] w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full h-10 px-3.5 pr-8 text-xs bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-[#1866EF] text-slate-700 cursor-pointer"
            >
              <option value="Semua">Pilih: Semua Status</option>
              <option value="Layak">Layak</option>
              <option value="Tidak Layak">Tidak Layak</option>
              <option value="Perlu Ditinjau">Perlu Ditinjau</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Bersihkan Filter Button */}
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full sm:w-auto h-10 px-4 border border-[#FECACA] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Bersihkan Filter
          </button>
        </div>

        {/* Action Row: Koreksi Massal (Hanya muncul jika diceklis > 1 item atau ceklis induk) */}
        {showBulkAction && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 animate-in fade-in">
            <div className="text-xs text-slate-500 font-medium">
              <span className="text-[#1866EF] font-semibold bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-1 rounded-md inline-block">
                {selectedIds.length} kata kunci dipilih
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedIds([])
                  clearKeywordSelect()
                }}
                className="h-9 px-3.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Batal Pilih
              </button>
              <button
                type="button"
                onClick={handleOpenBulkOverride}
                className="h-9 px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Koreksi Massal</span>
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[950px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold w-[26%]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={
                          filteredKeywords.length > 0 &&
                          selectedIds.length === filteredKeywords.length
                        }
                        onChange={handleToggleSelectAll}
                        className="rounded border-slate-300 text-[#1866EF] focus:ring-blue-500 cursor-pointer"
                      />
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                      <span>Kata Kunci</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold w-[14%]">Topik</th>
                  <th className="py-3 px-4 font-semibold w-[13%]">Jenis Konten</th>
                  <th className="py-3 px-4 font-semibold w-[12%]">Risiko Kata Kunci</th>
                  <th className="py-3 px-4 font-semibold w-[9%]">Evergreen</th>
                  <th className="py-3 px-4 font-semibold w-[9%]">Tumpang Tindih</th>
                  <th className="py-3 px-4 font-semibold w-[9%]">Keputusan</th>
                  <th className="py-3 px-4 font-semibold w-[11%]">Keputusan</th>
                  <th className="py-3 px-4 font-semibold text-center w-[5%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredKeywords.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Kata Kunci with sub-meta */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleToggleSelectRow(item.id)}
                          className="mt-0.5 rounded border-slate-300 text-[#1866EF] focus:ring-blue-500 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-slate-900 leading-snug">
                            {item.keywordName}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                            Vol: {item.vol} | KD: {item.kd} | {item.intent}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Topik */}
                    <td className="py-3.5 px-4 text-slate-800 font-medium">
                      {item.topic}
                    </td>

                    {/* Jenis Konten */}
                    <td className="py-3.5 px-4 text-slate-700">
                      {item.contentType}
                    </td>

                    {/* Risiko Kata Kunci */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          item.keywordRisk === 'Berisiko'
                            ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                            : item.keywordRisk === 'Musiman'
                            ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                            : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                        }`}
                      >
                        {item.keywordRisk}
                      </span>
                    </td>

                    {/* Evergreen (green score) */}
                    <td className="py-3.5 px-4 font-bold text-[#15803D]">
                      {item.evergreenScore}
                    </td>

                    {/* Tumpang Tindih (red score) */}
                    <td className="py-3.5 px-4 font-bold text-[#EF4444]">
                      {item.overlapScore}
                    </td>

                    {/* Keputusan Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          item.decision === 'Layak'
                            ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                            : item.decision === 'Tidak Layak'
                            ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                            : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                        }`}
                      >
                        {item.decision}
                      </span>
                    </td>

                    {/* Keputusan Reason / Alasan */}
                    <td className="py-3.5 px-4 text-slate-700 font-normal">
                      {item.decisionReason}
                    </td>

                    {/* Aksi Pencil Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                        title="Koreksi Redaksional (Override)"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredKeywords.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">
                      Tidak ada kata kunci yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Pagination Footer matching Image 1 */}
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
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
