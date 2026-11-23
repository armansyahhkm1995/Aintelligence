import React, { useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'
import { ClusterFilterBar } from '../components/cluster/ClusterFilterBar'
import { ClusterPagination } from '../components/cluster/ClusterPagination'
import { ClusterPilarCard } from '../components/cluster/ClusterPilarCard'
import { ClusterConflictedCard } from '../components/cluster/ClusterConflictedCard'
import { ClusterSplitCard } from '../components/cluster/ClusterSplitCard'
import { ClusterNewAiCard } from '../components/cluster/ClusterNewAiCard'
import { ClusterAbaikanModal } from '../components/cluster/ClusterAbaikanModal'
import { ClusterMergeModal } from '../components/cluster/ClusterMergeModal'
import { ClusterSplitModal } from '../components/cluster/ClusterSplitModal'
import { ClusterTolakModal } from '../components/cluster/ClusterTolakModal'
import { ClusterMetricsCards } from '../components/cluster/ClusterMetricsCards'

export const ClusterPage: React.FC = () => {
  const {
    clusters,
    setActiveCluster,
    setIsEditClusterDrawerOpen,
    setIsResolusiBentrokOpen,
    setCurrentPage,
    setActiveClusterForBrief,
  } = useApp()
  const { showSuccess, showWarning } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterIntent, setFilterIntent] = useState('')
  const [filterTopic, setFilterTopic] = useState('')

  // State untuk penolakan topik (Tolak Topik)
  const [isCard1Rejected, setIsCard1Rejected] = useState(false)
  const [isCard2Rejected, setIsCard2Rejected] = useState(false)
  const [isTolakModalOpen, setIsTolakModalOpen] = useState(false)
  const [selectedRejectTopic, setSelectedRejectTopic] = useState('Panduan Reksadana 2026')
  const [rejectReason, setRejectReason] = useState(
    'Fokus topik ini tidak sejalan dengan prioritas editorial redaksi triwulan ini.'
  )

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
  const [isSplitActionOpen, setIsSplitActionOpen] = useState(false)
  const [isSplitted, setIsSplitted] = useState(false)
  const [selectedSplitKeywords, setSelectedSplitKeywords] = useState<string[]>([])
  const [newSplitTopicTitle, setNewSplitTopicTitle] = useState('')
  const [splitReason, setSplitReason] = useState(
    'Memecah kata kunci spesifik transaksional menjadi artikel panduan mandiri.'
  )

  // State untuk Topic Card 1 (Pilar)
  const [card1Title, setCard1Title] = useState('Cara Investasi Reksadana Pemula')
  const [card1Intent, setCard1Intent] = useState('Informasional')
  const [card1Vol, setCard1Vol] = useState('45.000 / bln')
  const [card1Kd, setCard1Kd] = useState('28%')
  const [isAiRegenerated, setIsAiRegenerated] = useState(false)
  const [aiNewsletter, setAiNewsletter] = useState<{ title: string; message: string } | null>(null)

  // Supporting keywords Card 2
  const [card2Supporting, setCard2Supporting] = useState<string[]>([
    'reksadana bibit 2026 (Vol 15.000) (KD 34%)',
    'reksadana online terpercaya (Vol 8.000) (KD 30%)',
  ])

  // Metric counts (Total Topik AI, Topik Aman, Flag Kanibalisasi)
  const totalTopicCount = isAiRegenerated ? 46 : 50
  const cannibalismCount = isCard2Ignored || isMerged || isCard2Rejected ? 3 : 4
  const safeTopicCount = isCard2Ignored
    ? (isAiRegenerated ? 40 : 43)
    : (isAiRegenerated ? 39 : 42)

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
    setSelectedRejectTopic(name)
    setIsTolakModalOpen(true)
  }

  const handleConfirmReject = () => {
    if (selectedRejectTopic.includes('Cara Investasi') || selectedRejectTopic === card1Title) {
      setIsCard1Rejected(true)
    } else {
      setIsCard2Rejected(true)
    }
    setIsTolakModalOpen(false)
    showWarning('Topik Ditolak', `Kelompok topik '${selectedRejectTopic}' berhasil ditolak dan dicoret.`)
  }

  const handleRestoreRejectedTopic = (name: string) => {
    if (name.includes('Cara Investasi') || name === card1Title) {
      setIsCard1Rejected(false)
    } else {
      setIsCard2Rejected(false)
    }
    showSuccess('Topik Berhasil Dipulihkan', `Kelompok topik '${name}' telah berhasil dipulihkan dari status ditolak.`)
  }

  const handleRestoreIgnoredTopic = () => {
    setIsCard2Ignored(false)
    showSuccess('Peringatan Kanibalisasi Dipulihkan', 'Kelompok topik "Panduan Reksadana 2026" kembali ke status Butuh Resolusi.')
  }

  const handleCreateBrief = (topicData: {
    title: string
    mainKeyword: string
    supportingKeywords: string[]
    volume?: string
    intent?: string
  }) => {
    setActiveClusterForBrief(topicData)
    setCurrentPage('brief')
  }

  const handleGenerateClustersWithAI = () => {
    setCard1Title('Cara Investasi Reksadana Uang untuk Generasi-Z')
    setCard1Intent('Komersial')
    setCard1Vol('60.000 / bln')
    setCard1Kd('26%')
    setIsAiRegenerated(true)
    setAiNewsletter({
      title: 'Hasil Pengelompokan Topik Otomatis oleh AI',
      message:
        'AI berhasil memetakan kata kunci menjadi 46 kelompok topik terstruktur: 39 kelompok aman untuk diproduksi (termasuk topik rekomendasi baru yang ditandai badge "Baru") dan 4 kelompok terdeteksi kanibalisasi internal.',
    })
    showSuccess('AI Assistant', 'AI berhasil memperbarui kelompok topik dan menambahkan topik rekomendasi baru berlabel "Baru".')
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

  const handleRestoreMergedTopic = () => {
    setIsMerged(false)
    showSuccess(
      'Topik Berhasil Dikembalikan',
      'Kelompok topik "Panduan Reksadana 2026" telah dipulihkan. Seluruh kata kunci dan volume pencarian telah dikembalikan.'
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

  const handleUndoSplit = () => {
    setIsSplitted(false)
    setCard2Supporting((prev) => Array.from(new Set([...prev, ...selectedSplitKeywords])))
    showSuccess(
      'Pecahan Dibatalkan (Undo)',
      'Kata kunci pecahan berhasil dikembalikan ke kelompok topik induk Panduan Reksadana 2026.'
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

      {/* Flag / Newsletter Banner AI */}
      {aiNewsletter && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50 border border-blue-200 rounded-xl p-4 shadow-xs relative flex items-start justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs font-bold text-slate-900">
                {aiNewsletter.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {aiNewsletter.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAiNewsletter(null)}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer shrink-0"
            title="Tutup Pesan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. Filter Bar */}
      <ClusterFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterIntent={filterIntent}
        onIntentChange={setFilterIntent}
        filterTopic={filterTopic}
        onTopicChange={setFilterTopic}
        onClearFilters={handleClearFilters}
      />

      {/* 5. Information Cards matching KeywordPage style (Total AI, Topik Aman, Flag Kanibalisasi) */}
      <ClusterMetricsCards
        totalCount={totalTopicCount}
        safeCount={safeTopicCount}
        cannibalismCount={cannibalismCount}
        activeFilter={filterStatus}
        onFilterSelect={(status) => setFilterStatus(status)}
      />

      {/* 5. Cluster Cards List */}
      <div className="space-y-5">
        {/* Card 1: Pilar Topic */}
        <ClusterPilarCard
          title={card1Title}
          intent={card1Intent}
          volume={card1Vol}
          kd={card1Kd}
          isMerged={isMerged}
          isAiRegenerated={isAiRegenerated}
          isRejected={isCard1Rejected}
          rejectReason={rejectReason}
          onRestoreRejected={() => handleRestoreRejectedTopic(card1Title)}
          onReject={() => handleOpenRejectModal(card1Title)}
          onEdit={() => handleOpenEditDrawer('Cara Investasi Reksadana Pemula')}
          onCreateBrief={() =>
            handleCreateBrief({
              title: card1Title,
              mainKeyword: 'cara investasi reksadana',
              supportingKeywords: [
                'reksadana pemula',
                'modal kecil',
                'keuntungan reksadana',
                ...(isMerged
                  ? ['panduan reksadana 2026', 'belajar reksadana online']
                  : []),
              ],
              volume: isMerged ? '90.000 / bln' : card1Vol,
              intent: card1Intent,
            })
          }
        />

        {/* Card 2: Conflicted Topic */}
        <ClusterConflictedCard
          isMerged={isMerged}
          isCard2Ignored={isCard2Ignored}
          isRejected={isCard2Rejected}
          rejectReason={rejectReason}
          abaikanReason={abaikanReason}
          card2Supporting={card2Supporting}
          isSplitActionOpen={isSplitActionOpen}
          onToggleSplitAction={() => setIsSplitActionOpen(!isSplitActionOpen)}
          onOpenConflictModal={() => handleOpenConflictModal('Panduan Reksadana 2026')}
          onOpenAbaikanModal={() => setIsAbaikanModalOpen(true)}
          onOpenMergeModal={() => setIsMergeModalOpen(true)}
          onOpenSplitModal={() => setIsSplitModalOpen(true)}
          onRestoreMergedTopic={handleRestoreMergedTopic}
          onRestoreRejectedTopic={() => handleRestoreRejectedTopic('Panduan Reksadana 2026')}
          onRestoreIgnoredTopic={handleRestoreIgnoredTopic}
          onReject={() => handleOpenRejectModal('Panduan Reksadana 2026')}
          onEdit={() => handleOpenEditDrawer('Panduan Reksadana 2026')}
          onCreateBrief={() =>
            handleCreateBrief({
              title: 'Panduan Reksadana 2026',
              mainKeyword: 'panduan reksadana 2026',
              supportingKeywords: card2Supporting,
              volume: '45.000 / bln',
              intent: 'Informasional',
            })
          }
        />

        {/* Card 3: Split Topic Result */}
        {isSplitted && (
          <ClusterSplitCard
            title={newSplitTopicTitle}
            selectedSplitKeywords={selectedSplitKeywords}
            onUndoSplit={handleUndoSplit}
            onReject={() => handleOpenRejectModal(newSplitTopicTitle)}
            onEdit={() => handleOpenEditDrawer(newSplitTopicTitle)}
            onCreateBrief={() =>
              handleCreateBrief({
                title: newSplitTopicTitle,
                mainKeyword: selectedSplitKeywords[0]?.split('(')[0]?.trim() || 'reksadana bibit',
                supportingKeywords: selectedSplitKeywords.map((k) => k.split('(')[0].trim()),
                volume: '22.000 / bln',
                intent: 'Transaksional',
              })
            }
          />
        )}

        {/* Card 4: Newly AI Regenerated Topic */}
        {isAiRegenerated && (
          <ClusterNewAiCard
            onReject={() =>
              handleOpenRejectModal('Reksadana Syariah dan Tren Keuangan Berkelanjutan 2026')
            }
            onEdit={() =>
              handleOpenEditDrawer('Reksadana Syariah dan Tren Keuangan Berkelanjutan 2026')
            }
            onCreateBrief={() =>
              handleCreateBrief({
                title: 'Reksadana Syariah dan Tren Keuangan Berkelanjutan 2026',
                mainKeyword: 'reksadana syariah terbaik',
                supportingKeywords: [
                  'keuntungan reksadana syariah',
                  'reksadana syariah vs konvensional',
                  'investasi esg ojk 2026',
                ],
                volume: '38.000 / bln',
                intent: 'Informasional',
              })
            }
          />
        )}

        {/* Pagination Bar */}
        <ClusterPagination />
      </div>

      {/* Modals */}
      <ClusterAbaikanModal
        isOpen={isAbaikanModalOpen}
        onClose={() => setIsAbaikanModalOpen(false)}
        onConfirm={handleConfirmAbaikan}
        reason={abaikanReason}
        onReasonChange={setAbaikanReason}
      />

      <ClusterMergeModal
        isOpen={isMergeModalOpen}
        onClose={() => setIsMergeModalOpen(false)}
        onConfirm={handleConfirmMerge}
        targetTopic={targetMergeTopic}
        onTargetTopicChange={setTargetMergeTopic}
        reason={mergeReason}
        onReasonChange={setMergeReason}
      />

      <ClusterSplitModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        onConfirm={handleConfirmSplit}
        card2Supporting={card2Supporting}
        selectedSplitKeywords={selectedSplitKeywords}
        onToggleSplitKeyword={handleToggleSplitKeyword}
        newSplitTopicTitle={newSplitTopicTitle}
        splitReason={splitReason}
        onSplitReasonChange={setSplitReason}
      />

      <ClusterTolakModal
        isOpen={isTolakModalOpen}
        onClose={() => setIsTolakModalOpen(false)}
        onConfirm={handleConfirmReject}
        topicName={selectedRejectTopic}
        reason={rejectReason}
        onReasonChange={setRejectReason}
      />
    </div>
  )
}
