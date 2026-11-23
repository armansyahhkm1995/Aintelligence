import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { INITIAL_BRIEF_TABLE, BRIEF_VERSIONS } from '../components/brief/briefData'
import type { BriefTableRow, BriefVersionItem, BriefHeading, InternalLinkItem } from '../components/brief/types'
import { BriefTableView } from '../components/brief/BriefTableView'
import { BriefVersionsView } from '../components/brief/BriefVersionsView'
import { BriefCompareView } from '../components/brief/BriefCompareView'
import { BriefDetailEditor } from '../components/brief/BriefDetailEditor'
import { BriefClaimModal } from '../components/brief/BriefClaimModal'
import { BriefLockAlertModal } from '../components/brief/BriefLockAlertModal'
import { BriefReleaseModal } from '../components/brief/BriefReleaseModal'

export const BriefPage: React.FC = () => {
  const {
    currentUser,
    approveBrief,
    activeClusterForBrief,
    setActiveClusterForBrief,
  } = useApp()
  const { showSuccess, showWarning } = useToast()

  // View Mode: 'table' | 'detail' | 'versions' | 'compare'
  const [viewMode, setViewMode] = useState<'table' | 'detail' | 'versions' | 'compare'>('table')
  const [activeBriefVersionId, setActiveBriefVersionId] = useState<string>('bv-3')
  const [selectedCompareBriefVersion, setSelectedCompareBriefVersion] = useState<BriefVersionItem>(BRIEF_VERSIONS[1])
  const [activeBriefId, setActiveBriefId] = useState<string>('BRF-001')

  // War Ticket / Lock states
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const [itemToClaim, setItemToClaim] = useState<BriefTableRow | null>(null)
  const [isLockAlertOpen, setIsLockAlertOpen] = useState(false)
  const [lockedItemInfo, setLockedItemInfo] = useState<{ title: string; editor: string } | null>(null)
  const [isReleaseConfirmOpen, setIsReleaseConfirmOpen] = useState(false)

  // Table state
  const [briefList, setBriefList] = useState<BriefTableRow[]>(INITIAL_BRIEF_TABLE)

  // Detail view states
  const [activeItemTitle, setActiveItemTitle] = useState(
    'Cara Mengurus Kartu Keluarga dan Persyaratannya'
  )
  const [briefTitle, setBriefTitle] = useState(
    'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )
  const [angleJournalistic, setAngleJournalistic] = useState(
    'Fokus pada keamanan modal, regulasi perlindungan konsumen OJK, dan kemudahan pencairan untuk pemula berpenghasilan pertama.'
  )
  const [targetAudience, setTargetAudience] = useState(
    'Masyarakat yang mengurus dokumen kependudukan'
  )
  const [mainQuestions, setMainQuestions] = useState<string[]>([
    'Berapa modal awal paling sedikit untuk mulai reksadana di Indonesia?',
    'Apakah investasi reksadana dijamin LPS seperti halnya tabungan deposito?',
    'Berapa hari kerja proses pencairan saldo reksadana ke rekening bank?',
  ])
  const [supportingSources, setSupportingSources] = useState<string[]>([
    'OJK (Otoritas Jasa Keuangan)',
    'Inflasi Tahunan BI',
    'Bursa Efek Indonesia (BEI)',
    'UU P2SK No. 4/2023',
  ])

  const [internalLinks, setInternalLinks] = useState<InternalLinkItem[]>([
    { id: 'il-1', title: 'Mengenal Perbedaan Saham dan ORI025', url: 'rri.co.id/bisnis/512' },
    { id: 'il-2', title: 'Tips Alokasi Gaji 50/30/20', url: 'rri.co.id/lifestyle/481' },
  ])

  const [headings, setHeadings] = useState<BriefHeading[]>([
    { id: 'bh-0', level: 'H1', text: 'Panduan Lengkap Memulai Investasi Reksadana bagi Pemula' },
    { id: 'bh-1', level: 'H2', text: 'Apa Itu Reksadana dan Mengapa Cocok untuk Pemula?' },
    { id: 'bh-2', level: 'H3', text: 'Mekanisme Kerja Manajer Investasi (MI) Berizin OJK' },
    { id: 'bh-3', level: 'H3', text: 'Modal Minimal: Mulai dari Rp10.000 Lewat Aplikasi Resmi' },
    { id: 'bh-4', level: 'H2', text: 'Perbedaan Reksadana Pasar Uang, Pendapatan Tetap, dan Saham' },
    { id: 'bh-5', level: 'H3', text: 'Reksadana Pasar Uang (RPU) untuk Dana Darurat Likuid' },
    { id: 'bh-6', level: 'H3', text: 'Reksadana Saham untuk Pertumbuhan Jangka Panjang' },
    { id: 'bh-7', level: 'H2', text: 'Langkah Praktis Memulai Investasi Tanpa Takut Bodong' },
    { id: 'bh-8', level: 'H3', text: 'Cara Cek Izin Agen Penjual (APERD) di Portal Sipena OJK' },
    { id: 'bh-9', level: 'H2', text: 'Kesimpulan: Menumbuhkan Kebiasaan Finansial Positif Gen-Z' },
  ])

  // Topic parameter states from Cluster
  const [activeMainKeyword, setActiveMainKeyword] = useState<string>('cara investasi reksadana')
  const [activeSupportingKeywords, setActiveSupportingKeywords] = useState<string[]>([
    'reksadana pemula',
    'modal kecil',
    'keuntungan reksadana',
  ])
  const [activeVolume, setActiveVolume] = useState<string>('45.000 / bln')
  const [activeIntent, setActiveIntent] = useState<string>('Informasional')

  // Handle transition when user clicks "Buat Arahan" on Kelompok Topik (ClusterPage)
  useEffect(() => {
    if (activeClusterForBrief) {
      const data = activeClusterForBrief
      const currentUserName = currentUser?.name || 'Budi Prasetyo (Admin)'
      const newBriefId = `BRF-${Date.now().toString().slice(-3)}`

      setBriefList((prev) => {
        const existing = prev.find((b) => b.title.toLowerCase() === data.title.toLowerCase())
        if (existing) {
          return prev.map((b) =>
            b.id === existing.id
              ? { ...b, editor: currentUserName, status: `Diambil oleh ${currentUserName}` }
              : b
          )
        }
        const newRow: BriefTableRow = {
          id: newBriefId,
          title: data.title,
          mainKeyword: data.mainKeyword,
          supportingKeywords: data.supportingKeywords,
          processStatus: 'selesai',
          editor: currentUserName,
          status: `Diambil oleh ${currentUserName}`,
        }
        return [newRow, ...prev]
      })

      setActiveBriefId(newBriefId)
      setActiveItemTitle(data.title)
      setBriefTitle(`Panduan Lengkap: ${data.title}`)
      setActiveMainKeyword(data.mainKeyword)
      setActiveSupportingKeywords(data.supportingKeywords)
      if (data.volume) setActiveVolume(data.volume)
      if (data.intent) setActiveIntent(data.intent)
      setTargetAudience(`Masyarakat dan pembaca yang mencari panduan terpercaya seputar ${data.title.toLowerCase()}`)
      setAngleJournalistic(
        `Fokus liputan mendalam mengenai ${data.title.toLowerCase()}, regulasi resmi, serta panduan praktis dan terpercaya bagi masyarakat.`
      )
      setMainQuestions([
        `Apa saja syarat dan ketentuan mendasar seputar ${data.mainKeyword}?`,
        `Bagaimana langkah-langkah pelaksanaan dan prosedur resmi terbaru 2026?`,
        `Apa saja tips mitigasi risiko dan rujukan kebijakan resmi yang berlaku?`,
      ])
      setHeadings([
        { id: 'bh-0', level: 'H1', text: `Panduan Lengkap: ${data.title}` },
        { id: 'bh-1', level: 'H2', text: `Mengenal ${data.title} dan Urgensinya` },
        { id: 'bh-2', level: 'H3', text: 'Regulasi dan Dasar Kebijakan Resmi Terkini' },
        { id: 'bh-3', level: 'H3', text: 'Syarat dan Persiapan Awal yang Wajib Dipenuhi' },
        { id: 'bh-4', level: 'H2', text: 'Langkah Praktis dan Tahapan Pelaksanaan Lengkap' },
        { id: 'bh-5', level: 'H3', text: 'Tips Mitigasi Risiko dan Solusi Kendala di Lapangan' },
        { id: 'bh-6', level: 'H2', text: 'Kesimpulan dan Rekomendasi Redaksi RRI' },
      ])
      setViewMode('detail')
      showSuccess('Arahan Baru Dimuat', `Arahan artikel untuk kelompok topik "${data.title}" berhasil dimuat dan siap ditinjau.`)
      setActiveClusterForBrief(null)
    }
  }, [activeClusterForBrief, currentUser, setActiveClusterForBrief, showSuccess])

  // Version toggling
  const handleToggleBriefVersion = (versionId: string) => {
    if (activeBriefVersionId === versionId) {
      showWarning(
        'Versi Arahan Artikel',
        'Harus ada minimal 1 versi arahan artikel yang aktif atau pilih versi yang lain.'
      )
      return
    }
    setActiveBriefVersionId(versionId)
    const target = BRIEF_VERSIONS.find((v) => v.id === versionId)
    showSuccess(
      'Versi Arahan Artikel',
      `${target?.version || 'Versi'} berhasil diaktifkan sebagai arahan artikel utama.`
    )
  }

  // Row click logic with ownership / lock checks
  const handleRowClick = (item: BriefTableRow) => {
    if (item.processStatus !== 'selesai') {
      showWarning(
        'Naskah Belum Tersedia',
        `Arahan artikel "${item.title}" saat ini masih dalam antrean (${item.processStatus.toUpperCase()}) dan belum siap dikerjakan oleh editor.`
      )
      return
    }

    const isApprovedItem = item.status.toLowerCase().includes('disetujui')

    // Jika arahan artikel sudah disetujui, semua editor dapat langsung membuka dan membacanya tanpa dikunci
    if (isApprovedItem) {
      setActiveBriefId(item.id)
      setActiveItemTitle(item.title)
      setBriefTitle(`Panduan Lengkap: ${item.title}`)
      setActiveMainKeyword(item.mainKeyword)
      setActiveSupportingKeywords(item.supportingKeywords)
      setViewMode('detail')
      return
    }

    const currentUserName = currentUser?.name || 'Budi Santoso'
    if (
      item.editor !== '-' &&
      !item.editor.toLowerCase().includes(currentUserName.toLowerCase()) &&
      !currentUserName.toLowerCase().includes(item.editor.toLowerCase())
    ) {
      setLockedItemInfo({ title: item.title, editor: item.editor })
      setIsLockAlertOpen(true)
      return
    }

    if (item.editor === '-') {
      setItemToClaim(item)
      setIsClaimModalOpen(true)
      return
    }

    // Already owned by currentUser
    setActiveBriefId(item.id)
    setActiveItemTitle(item.title)
    setBriefTitle(`Panduan Lengkap: ${item.title}`)
    setActiveMainKeyword(item.mainKeyword)
    setActiveSupportingKeywords(item.supportingKeywords)
    setViewMode('detail')
  }

  // Claim modal confirm
  const handleConfirmClaim = () => {
    if (!itemToClaim) return
    const currentUserName = currentUser?.name || 'Budi Santoso (Editor)'
    setBriefList((prev) =>
      prev.map((b) =>
        b.id === itemToClaim.id
          ? {
              ...b,
              editor: currentUserName,
              status: `Diambil oleh ${currentUserName}`,
            }
          : b
      )
    )
    setActiveBriefId(itemToClaim.id)
    setActiveItemTitle(itemToClaim.title)
    setBriefTitle(`Panduan Lengkap: ${itemToClaim.title}`)
    setActiveMainKeyword(itemToClaim.mainKeyword)
    setActiveSupportingKeywords(itemToClaim.supportingKeywords)
    setIsClaimModalOpen(false)
    setItemToClaim(null)
    setViewMode('detail')
    showSuccess(
      'Arahan Artikel Diklaim',
      `Anda berhasil mengunci arahan artikel ini (${currentUserName}). Editor lain tidak dapat mengambilnya.`
    )
  }

  // Release brief
  const handleReleaseBrief = () => {
    setBriefList((prev) =>
      prev.map((b) =>
        b.id === activeBriefId || b.title === activeItemTitle
          ? { ...b, editor: '-', status: 'Tersedia' }
          : b
      )
    )
    setIsReleaseConfirmOpen(false)
    setViewMode('table')
    showSuccess(
      'Arahan Artikel Dilepas',
      'Arahan artikel berhasil dilepas kembali ke antrean untuk editor lain.'
    )
  }

  // Approve brief
  const handleApprove = () => {
    approveBrief()
    const currentUserName = currentUser?.name || 'Budi Santoso (Editor)'
    setBriefList((prev) =>
      prev.map((b) =>
        b.id === activeBriefId || b.title === activeItemTitle
          ? { ...b, status: `Disetujui oleh ${currentUserName}` }
          : b
      )
    )
    showSuccess('Arahan Artikel', `Arahan artikel berhasil disetujui oleh ${currentUserName} dan dialirkan ke antrean Draf AI.`)
  }

  // Regenerate with AI
  const handleRegenerateWithAI = () => {
    const currentUserName = currentUser?.name || 'Budi Santoso (Editor)'
    setBriefList((prev) =>
      prev.map((b) =>
        b.id === activeBriefId || b.title === activeItemTitle
          ? { ...b, status: `Dibuat ulang oleh ${currentUserName}` }
          : b
      )
    )
    showSuccess('Arahan Artikel', 'Arahan artikel berhasil dibuat ulang dengan AI.')
  }

  // Retry process
  const handleRetryProcess = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setBriefList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, processStatus: 'antre' as const } : b))
    )
    showSuccess('Proses Dimuat Ulang', 'Status arahan artikel berhasil dikembalikan ke antre.')
  }

  // Exports
  const handleExport = (format: 'docs' | 'pdf') => {
    if (format === 'docs') {
      const contentHtml = `
        <html>
        <head><meta charset="utf-8"><title>${briefTitle}</title></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1>${briefTitle}</h1>
          <p><strong>Sasaran Pembaca:</strong> ${targetAudience}</p>
          <div>
            <p><strong>Pertanyaan Utama:</strong></p>
            <ul>${mainQuestions.map((q) => `<li>${q}</li>`).join('')}</ul>
          </div>
          <p><strong>Sudut Pandang Jurnalistik (Angle):</strong></p>
          <p>${angleJournalistic}</p>
          <h3>Kerangka Naskah (Heading H2 & H3):</h3>
          <ul>${headings.map((h) => `<li><strong>${h.level}:</strong> ${h.text}</li>`).join('')}</ul>
          <h3>Data & Entitas Wajib Dikutip:</h3>
          <p>${supportingSources.join(', ')}</p>
        </body>
        </html>
      `
      const blob = new Blob(['\ufeff' + contentHtml], { type: 'application/msword' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `arahan-${briefTitle.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}.doc`
      a.click()
      showSuccess('Ekspor Docs', 'Arahan artikel berhasil diekspor sebagai dokumen Docs (.doc)')
    } else if (format === 'pdf') {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>${briefTitle} - Arahan Artikel</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
              h1 { color: #1866EF; margin-bottom: 8px; font-size: 24px; }
              h2, h3 { color: #0f172a; margin-top: 20px; }
              .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; }
              ul { margin-top: 6px; padding-left: 20px; }
              li { margin-bottom: 4px; }
            </style>
          </head>
          <body>
            <h1>${briefTitle}</h1>
            <div class="box"><strong>Sasaran Pembaca:</strong> ${targetAudience}</div>
            <div class="box"><strong>Pertanyaan Utama:</strong><ul>${mainQuestions.map((q) => `<li>${q}</li>`).join('')}</ul></div>
            <h3>Sudut Pandang Jurnalistik (Angle):</h3>
            <p style="font-size: 13px;">${angleJournalistic}</p>
            <h3>Kerangka Naskah:</h3>
            <ul style="font-size: 13px;">${headings.map((h) => `<li><strong>${h.level}:</strong> ${h.text}</li>`).join('')}</ul>
            <h3>Data & Entitas Wajib Dikutip:</h3>
            <p style="font-size: 13px;">${supportingSources.join(', ')}</p>
          </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
          printWindow.print()
        }, 300)
      }
      showSuccess('Ekspor PDF', 'Membuka jendela cetak untuk menyimpan Arahan Artikel sebagai PDF.')
    }
  }

  // Active brief status
  const currentActiveItem = briefList.find((b) => b.id === activeBriefId || b.title === activeItemTitle)
  const isApproved = Boolean(currentActiveItem?.status?.toLowerCase().includes('disetujui'))
  const activeBriefVersion = BRIEF_VERSIONS.find((v) => v.id === activeBriefVersionId) || BRIEF_VERSIONS[0]

  return (
    <>
      {/* 1. TABLE VIEW */}
      {viewMode === 'table' && (
        <BriefTableView
          briefList={briefList}
          currentUser={currentUser}
          onRowClick={handleRowClick}
          onRetryProcess={handleRetryProcess}
        />
      )}

      {/* 2. VERSIONS VIEW */}
      {viewMode === 'versions' && (
        <BriefVersionsView
          activeItemTitle={activeItemTitle}
          versions={BRIEF_VERSIONS}
          activeBriefVersionId={activeBriefVersionId}
          onBackToDetail={() => setViewMode('detail')}
          onToggleVersion={handleToggleBriefVersion}
          onSelectCompare={(v) => {
            setSelectedCompareBriefVersion(v)
            setViewMode('compare')
          }}
        />
      )}

      {/* 3. COMPARE VIEW */}
      {viewMode === 'compare' && (
        <BriefCompareView
          latest={activeBriefVersion}
          compareTarget={selectedCompareBriefVersion}
          onBackToVersions={() => setViewMode('versions')}
        />
      )}

      {/* 4. DETAIL VIEW */}
      {viewMode === 'detail' && (
        <BriefDetailEditor
          activeItemTitle={activeItemTitle}
          activeIntent={activeIntent}
          activeMainKeyword={activeMainKeyword}
          activeSupportingKeywords={activeSupportingKeywords}
          activeVolume={activeVolume}
          isApproved={isApproved}
          activeBriefVersion={activeBriefVersion}
          briefTitle={briefTitle}
          setBriefTitle={setBriefTitle}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          mainQuestions={mainQuestions}
          setMainQuestions={setMainQuestions}
          angleJournalistic={angleJournalistic}
          setAngleJournalistic={setAngleJournalistic}
          headings={headings}
          setHeadings={setHeadings}
          supportingSources={supportingSources}
          setSupportingSources={setSupportingSources}
          internalLinks={internalLinks}
          setInternalLinks={setInternalLinks}
          onBackToTable={() => setViewMode('table')}
          onOpenVersions={() => setViewMode('versions')}
          onRegenerateWithAI={handleRegenerateWithAI}
          onApprove={handleApprove}
          onRequestRelease={() => setIsReleaseConfirmOpen(true)}
          onExport={handleExport}
        />
      )}

      {/* Modals */}
      <BriefClaimModal
        isOpen={isClaimModalOpen}
        item={itemToClaim}
        currentUserName={currentUser?.name || 'Budi Prasetyo (Anda)'}
        onClose={() => {
          setIsClaimModalOpen(false)
          setItemToClaim(null)
        }}
        onConfirm={handleConfirmClaim}
      />

      <BriefLockAlertModal
        isOpen={isLockAlertOpen}
        lockedInfo={lockedItemInfo}
        onClose={() => {
          setIsLockAlertOpen(false)
          setLockedItemInfo(null)
        }}
      />

      <BriefReleaseModal
        isOpen={isReleaseConfirmOpen}
        title={activeItemTitle}
        onClose={() => setIsReleaseConfirmOpen(false)}
        onConfirm={handleReleaseBrief}
      />
    </>
  )
}
