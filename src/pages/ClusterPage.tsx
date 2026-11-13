import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { ClusterItem } from '../types'
import { Search, ChevronDown, X } from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

export const ClusterPage: React.FC = () => {
  const {
    clusters,
    setActiveCluster,
    setIsEditClusterDrawerOpen,
    setIsResolusiBentrokOpen,
    setIsTolakClusterOpen,
    setCurrentPage,
  } = useApp()
  const { showSuccess } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterIntent, setFilterIntent] = useState('')
  const [filterTopic, setFilterTopic] = useState('')

  // Supporting keywords state for Card 2 with separation mode
  const [isSeparatingKeywords, setIsSeparatingKeywords] = useState(false)
  const [card2Supporting, setCard2Supporting] = useState([
    'belajar reksadana online (Vol 22.000) (KD 28%)',
    'cara mulai reksadana bibit (Vol 22.000) (KD 28%)',
  ])

  const handleRemoveSupportingCard2 = (kw: string) => {
    setCard2Supporting((prev) => prev.filter((k) => k !== kw))
    showSuccess('Cluster Topik', `Kata kunci '${kw.split('(')[0].trim()}' berhasil dipisahkan dari cluster.`)
  }

  const handleOpenDrawer = (cl: ClusterItem) => {
    setActiveCluster(cl)
    setIsEditClusterDrawerOpen(true)
  }

  const handleOpenConflictModal = (cl: ClusterItem) => {
    setActiveCluster(cl)
    setIsResolusiBentrokOpen(true)
  }

  const handleOpenRejectModal = (cl: ClusterItem) => {
    setActiveCluster(cl)
    setIsTolakClusterOpen(true)
  }

  const handleCreateBrief = () => {
    setCurrentPage('brief')
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterStatus('')
    setFilterIntent('')
    setFilterTopic('')
  }

  // Filter checks for each card
  const q = searchQuery.toLowerCase().trim()
  const matchCard1 =
    (!q || 'cara investasi reksadana pemula'.includes(q) || 'reksadana pemula'.includes(q)) &&
    (!filterStatus || filterStatus === 'Aman') &&
    (!filterIntent || filterIntent === 'Informasional') &&
    (!filterTopic || filterTopic === 'Finansial')

  const matchCard2 =
    (!q || 'panduan reksadana 2026'.includes(q) || 'belajar reksadana'.includes(q)) &&
    (!filterStatus || filterStatus === 'Butuh Resolusi') &&
    (!filterIntent || filterIntent === 'Informasional') &&
    (!filterTopic || filterTopic === 'Finansial')

  const matchCard3 =
    (!q || 'strategi investasi reksadana saham'.includes(q) || 'reksadana saham'.includes(q)) &&
    (!filterStatus || filterStatus === 'Bentrok CMS RRI') &&
    (!filterIntent || filterIntent === 'Komersial') &&
    (!filterTopic || filterTopic === 'Finansial')

  const hasAnyMatch = matchCard1 || matchCard2 || matchCard3

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400">
        <span>Riset & Produksi Berita</span>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#1866EF] font-semibold">Kelompok Kata Kunci</span>
      </div>

      {/* 1. Milestone Stepper: Step 3 Active */}
      <MilestoneStepper currentStep={3} />

      {/* Title and description */}
      <div>
        <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
          3 Cluster Siap Ditinjau
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Kelola klasterisasi topik liputan, tinjau keyword pilar vs pendukung, dan selesaikan konflik kanibalisasi konten.
        </p>
      </div>

      {/* 2. Next Step Banner */}
      <NextStepBanner currentStep={3} />

      {/* COMP-TodoList-Editor: 949px Standard Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-5">
        {/* url-input-wrapper (Search box) */}
        <div className="relative w-full h-[44px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama cluster ..."
            className="w-full h-[44px] pl-10 pr-4 text-sm bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Frame 427318715: Filter Dropdowns + Hug Content Clear Filter */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
          {/* Filter Status */}
          <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full h-[44px] px-3 pr-8 text-sm bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                filterStatus ? 'text-[#020617] font-medium' : 'text-slate-500'
              }`}
            >
              <option value="" disabled hidden>Pilih: Semua Status</option>
              <option value="Aman">Aman (Siap Brief)</option>
              <option value="Butuh Resolusi">Butuh Resolusi</option>
              <option value="Bentrok CMS RRI">Bentrok CMS RRI</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Filter Intensi */}
          <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
            <select
              value={filterIntent}
              onChange={(e) => setFilterIntent(e.target.value)}
              className={`w-full h-[44px] px-3 pr-8 text-sm bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                filterIntent ? 'text-[#020617] font-medium' : 'text-slate-500'
              }`}
            >
              <option value="" disabled hidden>Pilih: Semua Intensi</option>
              <option value="Informasional">Informasional</option>
              <option value="Komersial">Komersial</option>
              <option value="Transaksional">Transaksional</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Filter Topik */}
          <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className={`w-full h-[44px] px-3 pr-8 text-sm bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                filterTopic ? 'text-[#020617] font-medium' : 'text-slate-500'
              }`}
            >
              <option value="" disabled hidden>Pilih: Semua Topik</option>
              <option value="Finansial">Finansial & Investasi</option>
              <option value="Sosial">Bansos & Sosial</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Bersihkan Filter Button (Hug Content) */}
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-auto h-[44px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-sm font-semibold rounded-[6px] transition-colors flex items-center justify-center shrink-0 whitespace-nowrap cursor-pointer self-start sm:self-auto"
          >
            Bersihkan Filter
          </button>
        </div>

        {/* Frame 427318723: 4 Summary Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <div className="h-[26px] px-3.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8] flex items-center">
            45 Cluster Total
          </div>
          <div className="h-[26px] px-3.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#15803D] flex items-center">
            38 Aman (Siap Brief)
          </div>
          <div className="h-[26px] px-3.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#B45309] flex items-center">
            4 Kanibalisasi Internal
          </div>
          <div className="h-[26px] px-3.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-xs font-semibold text-[#B91C1C] flex items-center">
            3 Bentrok Artikel Lama
          </div>
        </div>

        {/* CONTAINER-Cluster-List */}
        <div className="space-y-4 pt-2">
          {/* CARD 1: Cara Investasi Reksadana Pemula (Blue Border) */}
          {matchCard1 && (
            <div className="bg-white border border-[#93C5FD] rounded-[6px] p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-[#1866EF] leading-snug">
                    Cara Investasi Reksadana Pemula
                  </h2>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8] flex items-center">
                    Baru
                  </span>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-xs font-semibold text-[#6D28D9] flex items-center">
                    Informasional
                  </span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Total Vol: 45.000 / bln</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400">Rata-rata KD: 32% · (4 Keyword)</span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#DBEAFE] rounded-[6px] p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                  <span className="text-[#64748B] font-medium shrink-0 min-w-[140px]">
                    Kata Kunci Pilar:
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8]">
                    cara investasi reksadana (Vol 22.000) (KD 28%)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-xs">
                  <span className="text-[#64748B] font-medium shrink-0 min-w-[140px] pt-1">
                    Kata Kunci Pendukung:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#334155]">
                      reksadana pemula (Vol 22.000) (KD 28%)
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#334155]">
                      modal kecil (Vol 22.000) (KD 28%)
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#334155]">
                      keuntungan reksadana (Vol 22.000) (KD 28%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                <button
                  onClick={() =>
                    handleOpenRejectModal({
                      id: 'cl-1',
                      name: 'Cara Investasi Reksadana Pemula',
                      status: 'Aman',
                      intent: 'Informational',
                      totalVol: 45000,
                      avgKd: 32,
                      keywordCount: 4,
                      pillarKeyword: { text: 'cara investasi reksadana', vol: 22000, kd: 28 },
                      supportingKeywords: [],
                    })
                  }
                  className="flex-1 sm:flex-initial h-[36px] px-4 bg-[#FEF2F2] border border-[#FECACA] hover:bg-rose-100 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors"
                >
                  Tolak
                </button>
                <button
                  onClick={() =>
                    handleOpenDrawer({
                      id: 'cl-1',
                      name: 'Cara Investasi Reksadana Pemula',
                      status: 'Aman',
                      intent: 'Informational',
                      totalVol: 45000,
                      avgKd: 32,
                      keywordCount: 4,
                      pillarKeyword: { text: 'cara investasi reksadana', vol: 22000, kd: 28 },
                      supportingKeywords: [],
                    })
                  }
                  className="flex-1 sm:flex-initial h-[36px] px-4 bg-white border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-[6px] transition-colors"
                >
                  Perbarui Cluster
                </button>
                <button
                  onClick={handleCreateBrief}
                  className="w-full sm:w-auto h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
                >
                  Buat Brief
                </button>
              </div>
            </div>
          )}

          {/* CARD 2: Panduan Reksadana 2026 (Yellow Border) */}
          {matchCard2 && (
            <div className="bg-white border border-[#FDE68A] rounded-[6px] p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-[#B45309] leading-snug">
                    Panduan Reksadana 2026
                  </h2>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8] flex items-center">
                    Brief Dibuat
                  </span>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#B45309] flex items-center">
                    Butuh Resolusi
                  </span>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-xs font-semibold text-[#6D28D9] flex items-center">
                    Informasional
                  </span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Total Vol: 45.000 / bln</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400">Rata-rata KD: 32% · (3 Keyword)</span>
                </div>
              </div>

              {/* Alert Box */}
              <div className="p-3 rounded-[6px] bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#B45309] font-medium leading-relaxed">
                Kanibalisasi Terdeteksi: Cluster ini bersaing di maksud pencarian yang sama dengan cluster 'Cara Investasi Reksadana Pemula'.
              </div>

              <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-[6px] p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                  <span className="text-[#64748B] font-medium shrink-0 min-w-[140px]">
                    Kata Kunci Pilar:
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#B45309]">
                    panduan reksadana 2026 (Vol 22.000) (KD 28%)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-xs">
                  <span className="text-[#64748B] font-medium shrink-0 min-w-[140px] pt-1">
                    Kata Kunci Pendukung:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {card2Supporting.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#334155]"
                      >
                        <span>{kw}</span>
                        {isSeparatingKeywords && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSupportingCard2(kw)}
                            className="hover:text-rose-600 focus:outline-none p-0.5 rounded-full hover:bg-rose-50 text-slate-400"
                            title="Hapus kata kunci dari cluster"
                          >
                            <X className="w-3.5 h-3.5 text-[#B91C1C]" />
                          </button>
                        )}
                      </span>
                    ))}
                    {card2Supporting.length === 0 && (
                      <span className="text-xs text-slate-400 italic py-1">
                        Semua kata kunci pendukung telah dipisahkan.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-xs font-medium text-[#B45309]">
                  Tindakan diperlukan agar tidak membuat dua artikel yang bersaing di mesin pencari.
                </span>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() =>
                      handleOpenRejectModal({
                        id: 'cl-2',
                        name: 'Panduan Reksadana 2026',
                        status: 'Butuh Resolusi',
                        intent: 'Informational',
                        totalVol: 45000,
                        avgKd: 32,
                        keywordCount: 3,
                        pillarKeyword: { text: 'panduan reksadana 2026', vol: 22000, kd: 28 },
                        supportingKeywords: [],
                      })
                    }
                    className="flex-1 sm:flex-initial h-[36px] px-4 bg-[#FEF2F2] border border-[#FECACA] hover:bg-rose-100 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() => setIsSeparatingKeywords(!isSeparatingKeywords)}
                    className={`flex-1 sm:flex-initial h-[36px] px-4 border rounded-[6px] text-xs font-medium transition-colors ${
                      isSeparatingKeywords
                        ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                        : 'bg-white border-[#DBEAFE] hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    {isSeparatingKeywords ? 'Selesai Memisahkan' : 'Pisahkan Kata Kunci'}
                  </button>
                  <button
                    onClick={() => {}}
                    className="w-full sm:w-auto h-[36px] px-4 bg-[#9A3412] hover:bg-[#7C2D12] text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
                  >
                    Abaikan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CARD 3: Strategi Investasi Reksadana Saham (Red Border) */}
          {matchCard3 && (
            <div className="bg-white border border-[#FECACA] rounded-[6px] p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-[#B91C1C] leading-snug">
                    Strategi Investasi Reksadana Saham
                  </h2>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8] flex items-center">
                    Draft Dibuat
                  </span>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-xs font-semibold text-[#B91C1C] flex items-center">
                    Bentrok CMS RRI
                  </span>
                  <span className="h-[22px] px-2.5 rounded-full bg-[#FDF4FF] border border-[#F5D0FE] text-xs font-semibold text-[#A21CAF] flex items-center">
                    Komersial
                  </span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Total Vol: 29.500 / bln</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400">Rata-rata KD: 32% · (4 Keyword)</span>
                </div>
              </div>

              {/* Alert Box */}
              <div className="p-3 rounded-[6px] bg-[#FEE2E2] border border-[#FECACA] text-xs text-[#B91C1C] font-medium leading-relaxed">
                Topik Sudah Terbit: Keyword pilar di cluster ini sudah tertutup oleh artikel 'Mulai Investasi Reksadana' yang terbit pada 12 Jan 2026 di CMS.
              </div>

              <div className="bg-[#FFF8F8] border border-[#FECACA] rounded-[6px] p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                  <span className="text-[#64748B] font-medium shrink-0 min-w-[140px]">
                    Kata Kunci  Pilar:
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-xs font-semibold text-[#B91C1C]">
                    investasi reksadana saham tips (Vol 22.000) (KD 28%)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 text-xs">
                  <span className="text-[#64748B] font-medium shrink-0 min-w-[140px] pt-1">
                    Kata Kunci Pendukung:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#334155]">
                      risiko reksadana saham (Vol 22.000) (KD 28%)
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-medium text-[#334155]">
                      top reksadana (Vol 22.000) (KD 28%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <span className="text-xs font-medium text-[#B91C1C]">
                  Saran AI: Tolak cluster ini atau perbarui artikel lama di CMS RRI.
                </span>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() =>
                      handleOpenRejectModal({
                        id: 'cl-3',
                        name: 'Strategi Investasi Reksadana Saham',
                        status: 'Bentrok CMS RRI',
                        intent: 'Commercial',
                        totalVol: 29500,
                        avgKd: 32,
                        keywordCount: 4,
                        pillarKeyword: { text: 'investasi reksadana saham tips', vol: 22000, kd: 28 },
                        supportingKeywords: [],
                      })
                    }
                    className="flex-1 sm:flex-initial h-[36px] px-4 bg-[#FEF2F2] border border-[#FECACA] hover:bg-rose-100 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() =>
                      handleOpenConflictModal({
                        id: 'cl-3',
                        name: 'Strategi Investasi Reksadana Saham',
                        status: 'Bentrok CMS RRI',
                        intent: 'Commercial',
                        totalVol: 29500,
                        avgKd: 32,
                        keywordCount: 4,
                        pillarKeyword: { text: 'investasi reksadana saham tips', vol: 22000, kd: 28 },
                        supportingKeywords: [],
                        cmsArticleTitle: 'Mulai Investasi Reksadana',
                        cmsPublishDate: '12 Jan 2026',
                      })
                    }
                    className="flex-1 sm:flex-initial h-[36px] px-4 bg-[#B91C1C] hover:bg-rose-800 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
                  >
                    Tetap Lanjutkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {!hasAnyMatch && (
            <div className="py-12 text-center text-xs text-slate-400 bg-white border border-[#DBEAFE] rounded-[6px]">
              Tidak ada cluster topik yang cocok dengan kata kunci pencarian atau filter yang dipilih.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
