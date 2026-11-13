import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { ClusterItem } from '../types'
import { Search, ChevronDown, Sparkles, X, AlertTriangle, GitMerge } from 'lucide-react'
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

  // State untuk resolusi kanibalisasi Card 2
  const [isCard2Ignored, setIsCard2Ignored] = useState(false)
  const [isAbaikanModalOpen, setIsAbaikanModalOpen] = useState(false)
  const [abaikanReason, setAbaikanReason] = useState(
    'Fokus pada pembaruan regulasi tahun 2026, bukan tutorial dasar pemula.'
  )

  // State untuk Penggabungan Topik (Merge Topics)
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false)
  const [isMerged, setIsMerged] = useState(false)
  const [targetMergeTopic, setTargetMergeTopic] = useState('Cara Investasi Reksadana Pemula')
  const [mergeReason, setMergeReason] = useState(
    'Digabungkan ke topik Cara Investasi Reksadana Pemula agar menjadi satu panduan pilar komprehensif tanpa kanibalisasi internal.'
  )

  // State untuk Pemecahan Topik (Split Topics)
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false)
  const [isSplitted, setIsSplitted] = useState(false)
  const [selectedSplitKeywords, setSelectedSplitKeywords] = useState<string[]>([
    'cara mulai reksadana bibit (Vol 22.000) (KD 28%)',
  ])
  const [newSplitTopicTitle, setNewSplitTopicTitle] = useState('Panduan Memulai Reksadana di Aplikasi Bibit')
  const [splitReason, setSplitReason] = useState(
    'Query spesifik platform (branded APERD). Dipisahkan menjadi artikel tinjauan aplikasi resmi OJK agar tidak bercampur dengan panduan umum.'
  )

  // Supporting keywords state for Card 2 with separation mode
  const [card2Supporting, setCard2Supporting] = useState([
    'belajar reksadana online (Vol 22.000) (KD 28%)',
    'cara mulai reksadana bibit (Vol 22.000) (KD 28%)',
  ])

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterStatus('')
    setFilterIntent('')
    setFilterTopic('')
  }

  const handleOpenEditDrawer = (name: string) => {
    const found = clusters.find((c) => c.name.toLowerCase().includes(name.toLowerCase())) || clusters[0]
    if (found) {
      setActiveCluster(found)
      setIsEditClusterDrawerOpen(true)
    }
  }

  const handleOpenConflictModal = (name: string) => {
    const found = clusters.find((c) => c.name.toLowerCase().includes(name.toLowerCase())) || clusters[1] || clusters[0]
    if (found) {
      setActiveCluster(found)
      setIsResolusiBentrokOpen(true)
    }
  }

  const handleOpenRejectModal = (name: string) => {
    const found = clusters.find((c) => c.name.toLowerCase().includes(name.toLowerCase())) || clusters[0]
    if (found) {
      setActiveCluster(found)
      setIsTolakClusterOpen(true)
    }
  }

  const handleCreateBrief = () => {
    setCurrentPage('brief')
  }

  const handleGenerateClustersWithAI = () => {
    showSuccess('AI Assistant', 'AI sedang menganalisis dan mengelompokkan kata kunci baru ke dalam cluster...')
  }

  const handleConfirmAbaikan = () => {
    setIsCard2Ignored(true)
    setIsAbaikanModalOpen(false)
    showSuccess(
      'Resolusi Konflik',
      'Peringatan kanibalisasi berhasil diabaikan. Status topik diubah menjadi Aman (Siap Brief).'
    )
  }

  const handleConfirmMerge = () => {
    setIsMerged(true)
    setIsMergeModalOpen(false)
    showSuccess(
      'Penggabungan Topik Berhasil',
      `Kelompok topik 'Panduan Reksadana 2026' berhasil dilebur ke dalam '${targetMergeTopic}'. Total volume disatukan.`
    )
  }

  const handleConfirmSplit = () => {
    setIsSplitted(true)
    setCard2Supporting((prev) => prev.filter((kw) => !selectedSplitKeywords.includes(kw)))
    setIsSplitModalOpen(false)
    showSuccess(
      'Pemecahan Topik Berhasil',
      `Kelompok topik berhasil dipecah. Kelompok topik baru '${newSplitTopicTitle}' berhasil diterbitkan.`
    )
  }

  const handleToggleSplitKeyword = (kw: string) => {
    let next: string[]
    if (selectedSplitKeywords.includes(kw)) {
      next = selectedSplitKeywords.filter((item) => item !== kw)
    } else {
      next = [...selectedSplitKeywords, kw]
    }
    setSelectedSplitKeywords(next)

    // AI generate new topic title dynamically based on selected keywords
    if (next.length === 0) {
      setNewSplitTopicTitle('')
    } else if (next.some((k) => k.toLowerCase().includes('bibit'))) {
      setNewSplitTopicTitle('Panduan Memulai Reksadana di Aplikasi Bibit')
    } else if (next.some((k) => k.toLowerCase().includes('online'))) {
      setNewSplitTopicTitle('Cara Mudah Belajar Reksadana Online Terpercaya')
    } else if (next.some((k) => k.toLowerCase().includes('2026'))) {
      setNewSplitTopicTitle('Strategi Investasi Reksadana Regulasi 2026')
    } else {
      const base = next[0].split('(')[0].trim()
      setNewSplitTopicTitle(`Panduan Lengkap: ${base.charAt(0).toUpperCase() + base.slice(1)}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 3 Active */}
      <MilestoneStepper currentStep={3} />

      {/* 2. Page Title and Description with AI Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            50 Daftar Kelompok Topik
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Satu kelompok mewakili satu calon artikel dengan intent yang konsisten dan risiko artikel saling tumpang tindih yang rendah.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateClustersWithAI}
          className="h-10 px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Buat Kelompok dengan AI</span>
        </button>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={3} />

      {/* 4. Filter Container matching Image 2 */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        {/* Full width Search Box */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama cluster ..."
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
          />
        </div>

        {/* 3 Filter Dropdowns + Bersihkan Filter Button */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
          {/* Status Dropdown */}
          <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full h-10 px-3.5 pr-8 text-xs bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-[#1866EF] text-slate-700 cursor-pointer"
            >
              <option value="">Pilih: Semua Status</option>
              <option value="Baru">Baru</option>
              <option value="Aman">Aman (Siap Brief)</option>
              <option value="Konflik">Butuh Resolusi</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Intensi Dropdown */}
          <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
            <select
              value={filterIntent}
              onChange={(e) => setFilterIntent(e.target.value)}
              className="w-full h-10 px-3.5 pr-8 text-xs bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-[#1866EF] text-slate-700 cursor-pointer"
            >
              <option value="">Pilih: Semua Intensi</option>
              <option value="Informasional">Informasional</option>
              <option value="Transaksional">Transaksional</option>
              <option value="Komersial">Komersial</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Topik Dropdown */}
          <div className="relative flex-1 min-w-[160px] w-full sm:w-auto">
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="w-full h-10 px-3.5 pr-8 text-xs bg-white border border-slate-200 rounded-lg appearance-none focus:outline-none focus:border-[#1866EF] text-slate-700 cursor-pointer"
            >
              <option value="">Pilih: Semua Topik</option>
              <option value="Investasi">Investasi & Pasar Modal</option>
              <option value="Bansos">Bansos & Sosial</option>
              <option value="Ketenagakerjaan">Ketenagakerjaan</option>
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

        {/* 3 Stat Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#1D4ED8]">45 Kelompok Total</span>
          </div>
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#15803D]">38 Aman</span>
          </div>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#B45309]">4 Kanibalisasi</span>
          </div>
        </div>
      </div>

      {/* 5. Cluster Cards matching Image 2 */}
      <div className="space-y-5">
        {/* Card 1: Cara Investasi Reksadana Pemula */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-4">
          {/* Header Row: Badges & Right Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isMerged
                    ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]'
                    : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#15803D]'
                }`}
              >
                {isMerged ? 'Topik Pilar (Digabungkan)' : 'Aman'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
                Informasional
              </span>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-800">
                Total Vol: {isMerged ? '90.000 / bln' : '45.000 / bln'}
              </span>
              <span className="mx-2 text-slate-300">|</span>
              <span>
                Rata-rata KD: 32% • ({isMerged ? '6 Keyword' : '4 Keyword'})
              </span>
            </div>
          </div>

          {/* Cluster Title */}
          <div>
            <h2 className="text-lg font-bold text-[#1866EF] leading-snug">
              Cara Investasi Reksadana Pemula
            </h2>
          </div>

          {/* Content Box with Pilar & Supporting Keywords */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
            {/* Kata Kunci Pilar */}
            <div>
              <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                Kata Kunci Pilar:
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium">
                cara investasi reksadana (Vol 22.000) (KD 28%)
              </span>
            </div>

            {/* Kata Kunci Pendukung */}
            <div>
              <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                Kata Kunci Pendukung:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'reksadana pemula (Vol 22.000) (KD 28%)',
                  'modal kecil (Vol 22.000) (KD 28%)',
                  'keuntungan reksadana (Vol 22.000) (KD 28%)',
                  ...(isMerged
                    ? [
                        'panduan reksadana 2026 (Vol 22.000) (KD 28%) [Dari Peleburan]',
                        'belajar reksadana online (Vol 22.000) [Dari Peleburan]',
                      ]
                    : []),
                ].map((kw, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-medium shadow-2xs ${
                      kw.includes('[Dari Peleburan]')
                        ? 'bg-blue-50 border border-blue-200 text-[#1866EF]'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-end gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => handleOpenRejectModal('Cara Investasi Reksadana Pemula')}
              className="h-9 px-4 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Tolak
            </button>
            <button
              type="button"
              onClick={() => handleOpenEditDrawer('Cara Investasi Reksadana Pemula')}
              className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Perbarui Topik
            </button>
            <button
              type="button"
              onClick={handleCreateBrief}
              className="h-9 px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Buat Arahan
            </button>
          </div>
        </div>

        {/* Card 2: Panduan Reksadana 2026 */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-4">
          {/* Header Row: Badges & Right Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              {isMerged && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
                  Telah Digabung
                </span>
              )}
              {!isMerged && (
                !isCard2Ignored ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-semibold">
                    Butuh Resolusi
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-semibold">
                    Aman (Override)
                  </span>
                )
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
                Informasional
              </span>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-800">Total Vol: 45.000 / bln</span>
              <span className="mx-2 text-slate-300">|</span>
              <span>Rata-rata KD: 32% • ({card2Supporting.length + 1} Keyword)</span>
            </div>
          </div>

          {/* Cluster Title */}
          <div>
            <h2
              className={`text-lg font-bold leading-snug ${
                isMerged
                  ? 'text-slate-400 line-through'
                  : isCard2Ignored
                  ? 'text-[#1866EF]'
                  : 'text-[#92400E]'
              }`}
            >
              Panduan Reksadana 2026
            </h2>
          </div>

          {/* Merged Banner or Yellow Warning Callout */}
          {isMerged ? (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 text-xs font-medium text-[#15803D] flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-[#15803D] shrink-0" />
              <span>
                Kelompok topik ini telah berhasil digabungkan ke <strong>'Cara Investasi Reksadana Pemula'</strong>. Seluruh kata kunci dan potensi traffic (45.000/bln) telah disatukan ke artikel pilar tanpa risiko kanibalisasi internal.
              </span>
            </div>
          ) : !isCard2Ignored ? (
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 text-xs font-medium text-[#B45309]">
              Kanibalisasi Terdeteksi: Cluster ini bersaing di maksud pencarian yang sama dengan cluster 'Cara Investasi Reksadana Pemula'.
            </div>
          ) : null}

          {/* Content Box with Pilar & Supporting Keywords */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
            {/* Kata Kunci Pilar */}
            <div>
              <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                Kata Kunci Pilar:
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                  isMerged
                    ? 'bg-slate-100 border-slate-200 text-slate-500 line-through'
                    : isCard2Ignored
                    ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]'
                    : 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
                }`}
              >
                panduan reksadana 2026 (Vol 22.000) (KD 28%)
              </span>
            </div>

            {/* Kata Kunci Pendukung */}
            <div>
              <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                Kata Kunci Pendukung:
              </div>
              <div className="flex flex-wrap gap-2">
                {card2Supporting.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Alert & Action Buttons */}
          {isMerged ? (
            <div className="text-right pt-1">
              <span className="text-xs text-slate-400 font-medium">Status: Selesai Digabungkan</span>
            </div>
          ) : !isCard2Ignored ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <span className="text-xs text-[#92400E] font-normal leading-relaxed">
                Tindakan diperlukan agar tidak membuat dua artikel yang bersaing di mesin pencari.
              </span>

              <div className="flex items-center gap-2 flex-wrap shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleOpenRejectModal('Panduan Reksadana 2026')}
                  className="h-9 px-3.5 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Tolak
                </button>
                <button
                  type="button"
                  onClick={() => setIsSplitModalOpen(true)}
                  className="h-9 px-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Pecahkan Topik
                </button>
                <button
                  type="button"
                  onClick={() => setIsMergeModalOpen(true)}
                  className="h-9 px-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Gabungkan Topik
                </button>
                <button
                  type="button"
                  onClick={() => setIsAbaikanModalOpen(true)}
                  className="h-9 px-4 bg-[#B45309] hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Abaikan
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleOpenRejectModal('Panduan Reksadana 2026')}
                className="h-9 px-4 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Tolak
              </button>
              <button
                type="button"
                onClick={() => handleOpenEditDrawer('Panduan Reksadana 2026')}
                className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Perbarui Topik
              </button>
              <button
                type="button"
                onClick={handleCreateBrief}
                className="h-9 px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Buat Arahan
              </button>
            </div>
          )}
        </div>

        {/* Card 3: Kelompok Topik Baru Hasil Pemecahan (Split Result) */}
        {isSplitted && (
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-4 animate-in fade-in slide-in-from-top-2">
            {/* Header Row: Badges & Right Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
                  Hasil Pemecahan Topik
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
                  Transaksional
                </span>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                <span className="font-bold text-slate-800">Total Vol: 22.000 / bln</span>
                <span className="mx-2 text-slate-300">|</span>
                <span>Rata-rata KD: 28% • ({selectedSplitKeywords.length} Keyword)</span>
              </div>
            </div>

            {/* Cluster Title */}
            <div>
              <h2 className="text-lg font-bold text-[#1866EF] leading-snug">
                {newSplitTopicTitle}
              </h2>
            </div>

            {/* Content Box with Pilar Keyword */}
            <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/20 space-y-3">
              <div>
                <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                  Kata Kunci Dipisahkan dari Panduan Reksadana 2026:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSplitKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleOpenRejectModal(newSplitTopicTitle)}
                className="h-9 px-4 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Tolak
              </button>
              <button
                type="button"
                onClick={() => handleOpenEditDrawer(newSplitTopicTitle)}
                className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Perbarui Topik
              </button>
              <button
                type="button"
                onClick={handleCreateBrief}
                className="h-9 px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Buat Arahan
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Abaikan Peringatan Kanibalisasi */}
      {isAbaikanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Abaikan Peringatan Kanibalisasi</h2>
              </div>
              <button
                onClick={() => setIsAbaikanModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Anda memilih mengabaikan potensi kanibalisasi topik <strong className="text-slate-900">Panduan Reksadana 2026</strong>. Masukkan pertimbangan redaksional sebelum melanjutkan:
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Alasan Redaksional Override
                </label>
                <textarea
                  rows={3}
                  value={abaikanReason}
                  onChange={(e) => setAbaikanReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
                  placeholder="Contoh: Sudut pandang khusus pembaruan regulasi tahun 2026..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAbaikanModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAbaikan}
                  className="px-4 py-2 bg-[#B45309] hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Konfirmasi Abaikan & Jadikan Aman
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Gabungkan Kelompok Topik */}
      {isMergeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Gabungkan Kelompok Topik</h2>
                <p className="text-[11px] text-slate-400">Satukan kelompok topik untuk eliminasi kanibalisasi internal</p>
              </div>
              <button
                onClick={() => setIsMergeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
                Topik asal <strong className="text-[#1866EF]">Panduan Reksadana 2026</strong> akan dilebur masuk ke dalam topik target pilihan. Seluruh kata kunci dan traffic akan disatukan ke artikel pilar.
              </div>

              {/* Pilih Topik Target */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Pilih Kelompok Topik Target (Tujuan Peleburan)
                </label>
                <select
                  value={targetMergeTopic}
                  onChange={(e) => setTargetMergeTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] cursor-pointer"
                >
                  <option value="Cara Investasi Reksadana Pemula">
                    Cara Investasi Reksadana Pemula (Aman, Vol: 45.000/bln)
                  </option>
                  <option value="Katalog Investasi Pasar Modal OJK">
                    Katalog Investasi Pasar Modal OJK (Vol: 32.000/bln)
                  </option>
                </select>
              </div>

              {/* Rincian Akumulasi */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Total Volume Setelah Digabung:</span>
                  <span className="font-bold text-[#1866EF]">90.000 Pencarian / Bulan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Kata Kunci Terakumulasi:</span>
                  <span className="font-bold text-slate-800">6 Keyword (Pilar & Pendukung)</span>
                </div>
              </div>

              {/* Alasan Penggabungan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Alasan Redaksional Penggabungan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={mergeReason}
                  onChange={(e) => setMergeReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
                  placeholder="Masukkan alasan penggabungan..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMergeModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmMerge}
                  className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Konfirmasi Penggabungan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pemecahan Kelompok Topik */}
      {isSplitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Pemecahan Kelompok Topik</h2>
                <p className="text-[11px] text-slate-400">Pecah kata kunci dengan intent berbeda menjadi calon artikel mandiri</p>
              </div>
              <button
                onClick={() => setIsSplitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilih kata kunci dari topik <strong className="text-slate-900">Panduan Reksadana 2026</strong> yang ingin dipisahkan untuk dijadikan calon artikel baru mandiri:
              </p>

              {/* Checklist Keyword */}
              <div className="space-y-2 border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <span className="text-[11px] font-semibold text-slate-500 block uppercase">
                  Daftar Kata Kunci Topik:
                </span>
                
                {/* Pilar Keyword */}
                <label className="flex items-center justify-between text-xs text-slate-800 bg-white p-2.5 rounded-md border border-slate-200 cursor-pointer hover:bg-blue-50/40 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedSplitKeywords.includes('panduan reksadana 2026 (Vol 22.000) (KD 28%)')}
                      onChange={() => handleToggleSplitKeyword('panduan reksadana 2026 (Vol 22.000) (KD 28%)')}
                      className="rounded border-slate-300 text-[#1866EF] focus:ring-[#1866EF] cursor-pointer"
                    />
                    <span className="font-medium">panduan reksadana 2026 (Vol 22.000) (KD 28%)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] shrink-0">
                    Kata Kunci Pilar
                  </span>
                </label>

                {/* Supporting Keywords */}
                {card2Supporting.map((kw, i) => (
                  <label
                    key={i}
                    className="flex items-center justify-between text-xs text-slate-800 bg-white p-2.5 rounded-md border border-slate-200 cursor-pointer hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedSplitKeywords.includes(kw)}
                        onChange={() => handleToggleSplitKeyword(kw)}
                        className="rounded border-slate-300 text-[#1866EF] focus:ring-[#1866EF] cursor-pointer"
                      />
                      <span className="font-medium">{kw}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 border border-slate-200 text-slate-600 shrink-0">
                      Kata Kunci Pendukung
                    </span>
                  </label>
                ))}
              </div>

              {/* Judul Topik Baru (Digenerate AI) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Judul Kelompok Topik Baru (Rekomendasi AI)
                  </label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1866EF] font-semibold border border-[#BFDBFE]">
                    Digenerate Otomatis
                  </span>
                </div>
                <div className="w-full px-3.5 py-2.5 text-xs font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg leading-relaxed min-h-[40px] flex items-center">
                  {newSplitTopicTitle ? (
                    <span>{newSplitTopicTitle}</span>
                  ) : (
                    <span className="text-slate-400 font-normal italic">
                      Pilih minimal satu kata kunci di atas untuk menghasilkan judul topik baru otomatis...
                    </span>
                  )}
                </div>
              </div>

              {/* Alasan Pemecahan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Alasan Redaksional Pemecahan Topik <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={splitReason}
                  onChange={(e) => setSplitReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
                  placeholder="Masukkan alasan pemecahan topik..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSplitModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSplit}
                  disabled={selectedSplitKeywords.length === 0}
                  className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Pecahkan Menjadi Topik Baru
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
