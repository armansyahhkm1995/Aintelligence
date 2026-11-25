import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { INITIAL_DRAFT_TABLE, DRAFT_VERSIONS } from '../components/draft/draftData'
import type { DraftTableRow, DraftVersionItem, DraftImageRec } from '../components/draft/types'
import { DraftTableView } from '../components/draft/DraftTableView'
import { DraftVersionsView } from '../components/draft/DraftVersionsView'
import { DraftCompareView } from '../components/draft/DraftCompareView'
import { DraftDetailEditor } from '../components/draft/DraftDetailEditor'
import { DraftClaimModal } from '../components/draft/DraftClaimModal'
import { DraftLockAlertModal } from '../components/draft/DraftLockAlertModal'
import { DraftReleaseModal } from '../components/draft/DraftReleaseModal'

export const DraftPage: React.FC = () => {
  const { currentUser } = useApp()
  const { showSuccess, showWarning } = useToast()

  // View Mode: 'table' | 'detail' | 'versions' | 'compare'
  const [viewMode, setViewMode] = useState<'table' | 'detail' | 'versions' | 'compare'>('table')
  const [draftVersions, _setDraftVersions] = useState<DraftVersionItem[]>(DRAFT_VERSIONS)
  const [activeDraftVersionId, setActiveDraftVersionId] = useState<string>('dv-3')
  const [selectedCompareDraftVersion, setSelectedCompareDraftVersion] = useState<DraftVersionItem>(DRAFT_VERSIONS[1])

  // War Ticket / Lock system states
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const [itemToClaim, setItemToClaim] = useState<DraftTableRow | null>(null)
  const [isLockAlertOpen, setIsLockAlertOpen] = useState(false)
  const [lockedItemInfo, setLockedItemInfo] = useState<{ title: string; editor: string } | null>(null)
  const [isReleaseConfirmOpen, setIsReleaseConfirmOpen] = useState(false)

  // Table state
  const [draftList, setDraftList] = useState<DraftTableRow[]>(INITIAL_DRAFT_TABLE)
  const [activeDraftId, setActiveDraftId] = useState<string>('DFT-004')
  const [activeItemTitle, setActiveItemTitle] = useState(
    'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )

  // Detail view content states
  const [articleHeadline, setArticleHeadline] = useState(
    'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )
  const [leadText] = useState(
    'JAKARTA — Menghadapi dinamika ekonomi digital dan tekanan inflasi, minat generasi muda terhadap instrumen investasi legal kian meningkat. Reksadana kini menjadi salah satu pintu masuk paling diminati bagi kalangan pemula karena modal awal yang sangat terjangkau serta dikelola langsung oleh manajer investasi berizin resmi.'
  )
  const [section1Heading] = useState(
    'Apa Itu Reksadana dan Mengapa Ramah Pemula?'
  )
  const [section1Callout1] = useState(
    'Butuh Verifikasi Fakta: Konfirmasi nilai statistik resmi OJK terbaru'
  )
  const [section1Content] = useState(
    'Berdasarkan rilis statistik Otoritas Jasa Keuangan (OJK), akumulasi dana kelolaan reksadana nasional tercatat menembus angka pertumbuhan signifikan di kuartal kedua. Fleksibilitas serta transparansi laporan bulanan manajer investasi menjadi daya tarik utama bagi investor pemula berpenghasilan pertama.'
  )
  const [section1Callout2] = useState(
    'Kutipan Narasumber Dibutuhkan'
  )
  const [section2Heading] = useState(
    'Langkah Praktis Memilih Agen Penjual (APERD) Resmi'
  )
  const [section2Content1] = useState(
    'Calon investor wajib memastikan platform Agen Penjual Efek Reksa Dana (APERD) telah terdaftar di OJK. Jangan tergiur promosi return tidak wajar yang menjanjikan keuntungan pasti di media sosial tanpa memahami profil risiko.'
  )
  const [section2Content2] = useState(
    'Dengan pemahaman risiko yang baik dan kedisiplinan alokasi dana darurat, generasi muda dapat mengoptimalkan reksadana sebagai benteng ketahanan finansial masa depan tanpa terjebak investasi bodong.'
  )

  // SEO Metadata
  const [primaryKeyword] = useState('cara investasi reksadana')
  const [secondaryKeywords] = useState([
    'reksadana pemula',
    'modal kecil',
    'keuntungan reksadana',
  ])
  const [seoTitle] = useState('Panduan Aman Investasi Reksadana Gen-Z: Tips OJK')
  const [metaDesc] = useState(
    'Pelajari cara memulai investasi reksadana aman untuk pemula dan Gen-Z. Panduan legalitas OJK, modal Rp10.000, serta tips pencairan.'
  )
  const [slugUrl] = useState('cara-investasi-reksadana-pemula')
  const [category] = useState('Layanan Publik')
  const [tags] = useState(['Kartu Keluarga', 'Disdukcapil', 'Administrasi Kependudukan'])

  // AI Image Recommendation states
  const aiImageRec: DraftImageRec = {
    subject: 'Warga sedang berkonsultasi di loket layanan administrasi kependudukan',
    format: 'Foto horizontal 16:9, dokumenter, tanpa teks pada gambar',
    altText: 'Warga berkonsultasi mengenai pengurusan Kartu Keluarga di layanan administrasi kependudukan',
    caption: 'Ilustrasi layanan pengurusan Kartu Keluarga',
    fileName: 'layanan-pengurusan-kartu-keluarga.jpg',
  }

  const articleBodyText = `${leadText}\n\n${section1Heading}\n${section1Content}\n\n${section2Heading}\n${section2Content1}\n\n${section2Content2}`
  const wordCount = (articleHeadline + ' ' + articleBodyText).trim().split(/\s+/).filter(Boolean).length

  // Handlers
  const handleToggleDraftVersion = (versionId: string) => {
    if (activeDraftVersionId === versionId) {
      showWarning(
        'Versi Draf Artikel',
        'Harus ada minimal 1 versi draf artikel yang aktif atau pilih versi yang lain.'
      )
      return
    }
    setActiveDraftVersionId(versionId)
    const target = draftVersions.find((v) => v.id === versionId)
    showSuccess(
      'Versi Draf Artikel',
      `${target?.version || 'Versi'} berhasil diaktifkan sebagai draf artikel utama.`
    )
  }

  const handleRowClick = (item: DraftTableRow) => {
    if (item.processStatus !== 'selesai') {
      showWarning(
        'Naskah Belum Tersedia',
        `Draf artikel "${item.title}" saat ini masih dalam antrean (${item.processStatus.toUpperCase()}) dan belum siap dikerjakan oleh editor.`
      )
      return
    }

    const currentUserName = currentUser?.name || 'Budi Santoso'
    if (
      item.editor !== '-' &&
      (item.id === 'DFT-001' ||
        (!item.editor.toLowerCase().includes(currentUserName.toLowerCase()) &&
         !currentUserName.toLowerCase().includes(item.editor.toLowerCase())))
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
    setActiveDraftId(item.id)
    setActiveItemTitle(item.title)
    setArticleHeadline(item.title)
    setViewMode('detail')
  }

  const handleConfirmClaim = () => {
    if (!itemToClaim) return
    const currentUserName = currentUser?.name || 'Budi Santoso (Editor)'
    setDraftList((prev) =>
      prev.map((d) =>
        d.id === itemToClaim.id
          ? {
              ...d,
              editor: currentUserName,
              status: `Diambil oleh ${currentUserName}`,
            }
          : d
      )
    )
    setActiveDraftId(itemToClaim.id)
    setActiveItemTitle(itemToClaim.title)
    setArticleHeadline(itemToClaim.title)
    setIsClaimModalOpen(false)
    setItemToClaim(null)
    setViewMode('detail')
    showSuccess(
      'Draf Artikel Diklaim',
      `Anda berhasil mengunci draf artikel ini (${currentUserName}). Editor lain tidak dapat mengambilnya.`
    )
  }

  const handleReleaseDraft = () => {
    setDraftList((prev) =>
      prev.map((d) =>
        d.id === activeDraftId || d.title === activeItemTitle
          ? { ...d, editor: '-', status: 'Tersedia' }
          : d
      )
    )
    setIsReleaseConfirmOpen(false)
    setViewMode('table')
    showSuccess(
      'Draf Artikel Dilepas',
      'Draf artikel berhasil dilepas kembali ke antrean untuk editor lain.'
    )
  }

  const handleRetryProcess = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDraftList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, processStatus: 'antre' as const } : b))
    )
    showSuccess('Proses Dimuat Ulang', 'Status draf artikel berhasil dikembalikan ke antre.')
  }

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    showSuccess('Salin Berhasil', `${label} telah disalin ke clipboard.`)
  }

  const handleCopyOption = (option: 1 | 2 | 3 | 4 | 5) => {
    if (option === 1) {
      const allText = `JUDUL ARTIKEL:\n${articleHeadline}\n\nISI ARTIKEL:\n${articleBodyText}\n\nPAKET METADATA SEO:\nFokus Kata Kunci:\n- Utama: ${primaryKeyword}\n- Pendukung: ${secondaryKeywords.join(', ')}\nJudul SEO: ${seoTitle}\nDeskripsi Meta: ${metaDesc}\nSlug URL: rri.co.id/bisnis/${slugUrl}\nKategori: ${category}\nTag: ${tags.join(', ')}\n\nREKOMENDASI PROMPT GAMBAR DARI AI:\nSubjek: ${aiImageRec.subject}\nFormat: ${aiImageRec.format}\nAlt text: ${aiImageRec.altText}\nCaption: ${aiImageRec.caption}\nNama file saran: ${aiImageRec.fileName}`
      handleCopyText(allText, 'Semua Konten (Judul, Isi, SEO, & Rekomendasi Gambar)')
    } else if (option === 2) {
      handleCopyText(articleHeadline, 'Judul Artikel')
    } else if (option === 3) {
      handleCopyText(articleBodyText, 'Isi Artikel')
    } else if (option === 4) {
      const seoText = `Fokus Kata Kunci:\n- Utama: ${primaryKeyword}\n- Pendukung: ${secondaryKeywords.join(', ')}\nJudul SEO: ${seoTitle}\nDeskripsi Meta: ${metaDesc}\nSlug URL: rri.co.id/bisnis/${slugUrl}\nKategori: ${category}\nTag: ${tags.join(', ')}`
      handleCopyText(seoText, 'Paket Metadata SEO')
    } else if (option === 5) {
      const imgText = `Subjek: ${aiImageRec.subject}\nFormat: ${aiImageRec.format}\nAlt text: ${aiImageRec.altText}\nCaption: ${aiImageRec.caption}\nNama file saran: ${aiImageRec.fileName}`
      handleCopyText(imgText, 'Rekomendasi Prompt Gambar dari AI')
    }
  }

  const handleExportDraftDocs = () => {
    const contentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${articleHeadline}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 24px; }
        h1 { color: #1866EF; }
        h2, h3 { color: #0f172a; margin-top: 18px; }
        .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; margin: 12px 0; font-size: 13px; }
      </style>
      </head>
      <body>
        <h1>${articleHeadline}</h1>
        <p>${articleBodyText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>
        <hr/>
        <h3>Paket Metadata SEO:</h3>
        <div class="meta-box">
          <p><strong>Fokus Kata Kunci:</strong><br/>
          - <strong>Utama:</strong> ${primaryKeyword}<br/>
          - <strong>Pendukung:</strong> ${secondaryKeywords.join(', ')}</p>
          <p><strong>Judul SEO:</strong> ${seoTitle}</p>
          <p><strong>Deskripsi Meta:</strong> ${metaDesc}</p>
          <p><strong>Slug URL:</strong> rri.co.id/bisnis/${slugUrl}</p>
          <p><strong>Kategori:</strong> ${category}</p>
          <p><strong>Tag:</strong> ${tags.join(', ')}</p>
        </div>
        <h3>Rekomendasi Prompt Gambar Dari AI:</h3>
        <div class="meta-box">
          <p><strong>Subjek:</strong> ${aiImageRec.subject}</p>
          <p><strong>Format:</strong> ${aiImageRec.format}</p>
          <p><strong>Alt text:</strong> ${aiImageRec.altText}</p>
          <p><strong>Caption:</strong> ${aiImageRec.caption}</p>
          <p><strong>Nama file saran:</strong> ${aiImageRec.fileName}</p>
        </div>
      </body>
      </html>
    `
    const blob = new Blob(['\ufeff' + contentHtml], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draft-${activeItemTitle.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}.doc`
    a.click()
    showSuccess('Ekspor Docs', 'Draf artikel berhasil diekspor sebagai dokumen Docs (.doc)')
  }

  const handleExportDraftPDF = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
        <head>
          <title>${articleHeadline} - Draf Berita</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #1866EF; margin-bottom: 12px; font-size: 24px; }
            h2, h3 { color: #0f172a; margin-top: 20px; }
            p { font-size: 13px; line-height: 1.7; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-top: 16px; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>${articleHeadline}</h1>
          <p>${articleBodyText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>
          <div class="box">
            <h3 style="margin-top:0;">Paket Metadata SEO</h3>
            <p><strong>Fokus Kata Kunci Utama:</strong> ${primaryKeyword}<br/>
            <strong>Fokus Kata Kunci Pendukung:</strong> ${secondaryKeywords.join(', ')}<br/>
            <strong>Judul SEO:</strong> ${seoTitle}<br/>
            <strong>Deskripsi Meta:</strong> ${metaDesc}<br/>
            <strong>Slug:</strong> rri.co.id/bisnis/${slugUrl}<br/>
            <strong>Kategori:</strong> ${category}<br/>
            <strong>Tag:</strong> ${tags.join(', ')}</p>
          </div>
          <div class="box">
            <h3 style="margin-top:0;">Rekomendasi Prompt Gambar Dari AI</h3>
            <p><strong>Subjek:</strong> ${aiImageRec.subject}<br/>
            <strong>Format:</strong> ${aiImageRec.format}<br/>
            <strong>Alt Text:</strong> ${aiImageRec.altText}<br/>
            <strong>Caption:</strong> ${aiImageRec.caption}<br/>
            <strong>Nama File:</strong> ${aiImageRec.fileName}</p>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 300)
    }
    showSuccess('Ekspor PDF', 'Membuka jendela cetak untuk menyimpan Draf Berita sebagai PDF.')
  }

  const activeDraftVersion = draftVersions.find((v) => v.id === activeDraftVersionId) || draftVersions[0]

  return (
    <>
      {/* 1. TABLE VIEW */}
      {viewMode === 'table' && (
        <DraftTableView
          draftList={draftList}
          currentUser={currentUser}
          onRowClick={handleRowClick}
          onRetryProcess={handleRetryProcess}
        />
      )}

      {/* 2. VERSIONS VIEW */}
      {viewMode === 'versions' && (
        <DraftVersionsView
          activeItemTitle={activeItemTitle}
          versions={draftVersions}
          activeDraftVersionId={activeDraftVersionId}
          onBackToDetail={() => setViewMode('detail')}
          onToggleVersion={handleToggleDraftVersion}
          onSelectCompare={(v) => {
            setSelectedCompareDraftVersion(v)
            setViewMode('compare')
          }}
        />
      )}

      {/* 3. COMPARE VIEW */}
      {viewMode === 'compare' && (
        <DraftCompareView
          latest={activeDraftVersion}
          compareTarget={selectedCompareDraftVersion}
          onBackToVersions={() => setViewMode('versions')}
        />
      )}

      {/* 4. DETAIL VIEW */}
      {viewMode === 'detail' && (
        <DraftDetailEditor
          activeItemTitle={activeItemTitle}
          activeDraftVersion={activeDraftVersion}
          articleHeadline={articleHeadline}
          leadText={leadText}
          section1Heading={section1Heading}
          section1Callout1={section1Callout1}
          section1Content={section1Content}
          section1Callout2={section1Callout2}
          section2Heading={section2Heading}
          section2Content1={section2Content1}
          section2Content2={section2Content2}
          wordCount={wordCount}
          primaryKeyword={primaryKeyword}
          secondaryKeywords={secondaryKeywords}
          seoTitle={seoTitle}
          metaDesc={metaDesc}
          slugUrl={slugUrl}
          category={category}
          tags={tags}
          aiImageRec={aiImageRec}
          onBackToTable={() => setViewMode('table')}
          onOpenVersions={() => setViewMode('versions')}
          onRegenerateWithAI={() => showSuccess('AI Assistant', 'AI sedang menyusun ulang draf artikel...')}
          onCopyOption={handleCopyOption}
          onExportDocs={handleExportDraftDocs}
          onExportPDF={handleExportDraftPDF}
          onRequestRelease={() => setIsReleaseConfirmOpen(true)}
        />
      )}

      {/* Modals */}
      <DraftClaimModal
        isOpen={isClaimModalOpen}
        item={itemToClaim}
        currentUserName={currentUser?.name || 'Budi Prasetyo (Anda)'}
        onClose={() => {
          setIsClaimModalOpen(false)
          setItemToClaim(null)
        }}
        onConfirm={handleConfirmClaim}
      />

      <DraftLockAlertModal
        isOpen={isLockAlertOpen}
        lockedInfo={lockedItemInfo}
        onClose={() => {
          setIsLockAlertOpen(false)
          setLockedItemInfo(null)
        }}
      />

      <DraftReleaseModal
        isOpen={isReleaseConfirmOpen}
        onClose={() => setIsReleaseConfirmOpen(false)}
        onConfirm={handleReleaseDraft}
      />
    </>
  )
}
