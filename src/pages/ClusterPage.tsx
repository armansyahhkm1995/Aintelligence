import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { ClusterItem } from '../types'
import { Search, ChevronDown, Sparkles, X, AlertTriangle } from 'lucide-react'
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

  return (
    <div className="space-y-6">
      {/* Breadcrumb matching Image 2 */}
      <div className="text-xs text-slate-400">
        <span>Riset & Produksi Berita</span>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#1866EF] font-semibold">Kelompok Topik</span>
      </div>

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

        {/* 4 Stat Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#1D4ED8]">45 Cluster Total</span>
          </div>
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#15803D]">38 Aman (Siap Brief)</span>
          </div>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#B45309]">4 Kanibalisasi Internal</span>
          </div>
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg py-2.5 px-3 text-center">
            <span className="text-xs font-bold text-[#B91C1C]">3 Bentrok Artikel Lama</span>
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
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
                Baru
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
                Informasional
              </span>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-800">Total Vol: 45.000 / bln</span>
              <span className="mx-2 text-slate-300">|</span>
              <span>Rata-rata KD: 32% • (4 Keyword)</span>
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
                ].map((kw, i) => (
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
              Buat Brief
            </button>
          </div>
        </div>

        {/* Card 2: Panduan Reksadana 2026 */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-4">
          {/* Header Row: Badges & Right Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
                Brief Dibuat
              </span>
              {!isCard2Ignored ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-semibold">
                  Butuh Resolusi
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-semibold">
                  Aman (Override)
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
                Informasional
              </span>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-800">Total Vol: 45.000 / bln</span>
              <span className="mx-2 text-slate-300">|</span>
              <span>Rata-rata KD: 32% • (3 Keyword)</span>
            </div>
          </div>

          {/* Cluster Title */}
          <div>
            <h2
              className={`text-lg font-bold leading-snug ${
                isCard2Ignored ? 'text-[#1866EF]' : 'text-[#92400E]'
              }`}
            >
              Panduan Reksadana 2026
            </h2>
          </div>

          {/* Yellow Warning Callout (Hidden when resolved/ignored) */}
          {!isCard2Ignored && (
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 text-xs font-medium text-[#B45309]">
              Kanibalisasi Terdeteksi: Cluster ini bersaing di maksud pencarian yang sama dengan cluster 'Cara Investasi Reksadana Pemula'.
            </div>
          )}

          {/* Content Box with Pilar & Supporting Keywords */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
            {/* Kata Kunci Pilar */}
            <div>
              <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                Kata Kunci Pilar:
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                  isCard2Ignored
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
          {!isCard2Ignored ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <span className="text-xs text-[#92400E] font-normal leading-relaxed">
                Tindakan diperlukan agar tidak membuat dua artikel yang bersaing di mesin pencari.
              </span>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleOpenRejectModal('Panduan Reksadana 2026')}
                  className="h-9 px-4 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Tolak
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenConflictModal('Panduan Reksadana 2026')}
                  className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Pisahkan Kata Kunci
                </button>
                <button
                  type="button"
                  onClick={() => setIsAbaikanModalOpen(true)}
                  className="h-9 px-5 bg-[#B45309] hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
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
                Buat Brief
              </button>
            </div>
          )}
        </div>
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
    </div>
  )
}
