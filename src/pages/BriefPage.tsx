import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  GripVertical,
  Trash2,
  Plus,
  ExternalLink,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Edit,
  CheckCircle2,
  FileText,
  Download,
  Eye,
  History,
  X,
  Lock,
  ShieldAlert,
  LogOut,
  User,
  Clock,
} from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

interface BriefTableRow {
  id: string
  title: string
  mainKeyword: string
  supportingKeywords: string[]
  processStatus: 'antre' | 'diproses' | 'selesai' | 'gagal'
  editor: string
  status: string
}

interface BriefVersionItem {
  id: string
  version: string
  title: string
  createdAt: string
  createdBy: string
  isAI: boolean
  changeSummary: string
  angle: string
  targetAudience: string
  h2List: string[]
  primaryKeyword: string
  supportingKeywords: string[]
}

const BRIEF_VERSIONS: BriefVersionItem[] = [
  {
    id: 'bv-3',
    version: 'Versi 1.2',
    title: 'Cara Investasi Reksadana Pemula: Panduan Aman Modal Rp10.000 Legal OJK',
    createdAt: '12 Nov 2026, 14:30 WIB',
    createdBy: 'Budi Santoso (Editor)',
    isAI: false,
    changeSummary: 'Penambahan H2 kepatuhan regulasi OJK & penajaman sudut pandang perlindungan konsumen.',
    angle: 'Edukasi finansial praktis dan komprehensif bagi investor pemula untuk memahami instrumen reksadana, diversifikasi portofolio, dan regulasi OJK terbaru tahun 2026.',
    targetAudience: 'Generasi muda dan masyarakat umum yang baru pertama kali ingin berinvestasi dengan modal terjangkau.',
    h2List: [
      'Apa Itu Reksadana dan Cara Kerjanya untuk Pemula',
      'Mengenal 4 Jenis Reksadana: Pasar Uang, Pendapatan Tetap, Campuran, dan Saham',
      'Panduan Memilih Platform APERD Legal Terdaftar dan Berizin OJK',
      'Langkah Praktis Beli Reksadana Pertama Kali Mulai Modal Rp10.000',
      'Strategi Diversifikasi Portofolio dan Manajemen Risiko Investasi',
    ],
    primaryKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana', 'legal ojk'],
  },
  {
    id: 'bv-2',
    version: 'Versi 1.1',
    title: 'Cara Investasi Reksadana Online Praktis',
    createdAt: '11 Nov 2026, 10:15 WIB',
    createdBy: 'Siti Rahmawati (Editor)',
    isAI: false,
    changeSummary: 'Penyesuaian kata kunci pendukung modal Rp10.000 dan platform resmi APERD.',
    angle: 'Panduan langkah demi langkah investasi reksadana online bagi masyarakat pemula dengan fokus efisiensi transaksi perbankan.',
    targetAudience: 'Masyarakat umum usia 20-40 tahun pengguna smartphone aktif.',
    h2List: [
      'Apa Itu Reksadana dan Keuntungannya',
      'Jenis-jenis Reksadana yang Cocok untuk Modal Kecil',
      'Cara Membuka Rekening Reksadana secara Online',
      'Tips Memilih Manajer Investasi Terpercaya',
    ],
    primaryKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
  },
  {
    id: 'bv-1',
    version: 'Versi 1.0',
    title: 'Panduan Investasi Reksadana Dasar',
    createdAt: '10 Nov 2026, 09:00 WIB',
    createdBy: 'AI Assistant (Claude 3.5 Sonnet)',
    isAI: true,
    changeSummary: 'Draf arahan artikel awal otomatis dari agregasi data riset Semrush.',
    angle: 'Tinjauan dasar instrumen reksadana pasar uang dan saham untuk pembaca awam.',
    targetAudience: 'Pemula yang belum pernah berinvestasi.',
    h2List: [
      'Pengertian Reksadana',
      'Jenis Reksadana di Pasar Modal',
      'Cara Membeli Reksadana',
    ],
    primaryKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'belajar reksadana'],
  },
]

const INITIAL_BRIEF_TABLE: BriefTableRow[] = [
  {
    id: 'BRF-001',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    processStatus: 'selesai',
    editor: 'Budi Santoso',
    status: 'Disetujui oleh Budi Santoso',
  },
  {
    id: 'BRF-002',
    title: 'Panduan Registrasi IKD Secara Online',
    mainKeyword: 'registrasi ikd online',
    supportingKeywords: ['ikd kemendagri', 'syarat ktp digital', 'aktivasi e-ktp'],
    processStatus: 'selesai',
    editor: '-',
    status: 'Tersedia',
  },
  {
    id: 'BRF-003',
    title: 'Update Harga Emas Antam Hari Ini dan Proyeksi Pasar',
    mainKeyword: 'harga emas hari ini',
    supportingKeywords: ['emas antam 2026', 'prediksi harga emas', 'jual beli emas'],
    processStatus: 'diproses',
    editor: '-',
    status: 'Belum Tersedia',
  },
  {
    id: 'BRF-004',
    title: 'Strategi Ketahanan Pangan Nasional Berkelanjutan',
    mainKeyword: 'ketahanan pangan 2027',
    supportingKeywords: ['program pangan rri', 'swasembada beras', 'distribusi pupuk'],
    processStatus: 'antre',
    editor: '-',
    status: 'Belum Tersedia',
  },
  {
    id: 'BRF-005',
    title: 'Regulasi Insentif Kendaraan Listrik dan Subsidi Energi',
    mainKeyword: 'subsidi motor listrik',
    supportingKeywords: ['insentif ev 2026', 'konversi listrik', 'tarif daya pln'],
    processStatus: 'gagal',
    editor: '-',
    status: 'Belum Tersedia',
  },
  {
    id: 'BRF-006',
    title: 'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    processStatus: 'selesai',
    editor: 'Siti Rahmawati',
    status: 'Diambil oleh Siti Rahmawati',
  },
  {
    id: 'BRF-007',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    mainKeyword: 'reksadana saham tips',
    supportingKeywords: ['risiko reksadana saham', 'top reksadana', 'investasi saham'],
    processStatus: 'selesai',
    editor: 'Ahmad Fauzi',
    status: 'Dibuat ulang oleh Ahmad Fauzi',
  },
]

export const BriefPage: React.FC = () => {
  const {
    brief,
    updateBrief,
    approveBrief,
    setIsTolakBriefOpen,
    setCurrentPage,
    currentUser,
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

  // Table filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Tersedia' | 'Diambil' | 'Disetujui' | 'Dibuat ulang'>('Semua')
  const [briefList, setBriefList] = useState<BriefTableRow[]>(INITIAL_BRIEF_TABLE)
  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // Detail view states
  const [activeItemTitle, setActiveItemTitle] = useState(
    'Cara Mengurus Kartu Keluarga dan Persyaratannya'
  )
  const [briefTitle, setBriefTitle] = useState(
    'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )
  const [angle, setAngle] = useState(
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
  const [newSourceInput, setNewSourceInput] = useState('')
  const [isAddingSource, setIsAddingSource] = useState(false)

  const [internalLinks, setInternalLinks] = useState<{ id: string; title: string; url: string }[]>([
    { id: 'il-1', title: 'Mengenal Perbedaan Saham dan ORI025', url: 'rri.co.id/bisnis/512' },
    { id: 'il-2', title: 'Tips Alokasi Gaji 50/30/20', url: 'rri.co.id/lifestyle/481' },
  ])
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')

  const [headings, setHeadings] = useState([
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
  const [openLevelId, setOpenLevelId] = useState<string | null>(null)
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<'v2' | 'v1'>('v2')

  const handleDragStart = (idx: number) => {
    if (headings[idx]?.level === 'H1') return
    setDraggedIdx(idx)
  }

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (draggedIdx === null || draggedIdx === idx) return
    if (idx === 0) return // Posisi H1 permanen paling atas
    const updated = [...headings]
    const item = updated[draggedIdx]
    if (item?.level === 'H1') return
    updated.splice(draggedIdx, 1)
    updated.splice(idx, 0, item)
    setDraggedIdx(idx)
    setHeadings(updated)
  }

  const handleDragEnd = () => {
    setDraggedIdx(null)
  }

  const handleLevelChange = (id: string, newLevel: string) => {
    setHeadings((prev) =>
      prev.map((h) => (h.id === id ? { ...h, level: newLevel } : h))
    )
    setOpenLevelId(null)
  }

  const handleTextChange = (id: string, newText: string) => {
    setHeadings((prev) =>
      prev.map((h) => (h.id === id ? { ...h, text: newText } : h))
    )
  }

  const handleDeleteHeading = (id: string) => {
    if (id === 'bh-0') return
    setHeadings((prev) => prev.filter((h) => h.id !== id))
  }

  const handleAddHeading = () => {
    const newId = `bh-${Date.now()}`
    setHeadings((prev) => [
      ...prev,
      { id: newId, level: 'H2', text: 'Subtopik Baru' },
    ])
  }

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

  const handleCancelApproval = () => {
    showSuccess('Arahan Artikel', 'Persetujuan arahan artikel telah dibatalkan.')
  }

  const handleRegenerateWithAI = () => {
    const currentUserName = currentUser?.name || 'Budi Santoso (Editor)'
    setBriefList((prev) =>
      prev.map((b) =>
        b.id === activeBriefId || b.title === activeItemTitle
          ? { ...b, status: `Dibuat ulang oleh ${currentUserName}` }
          : b
      )
    )
    showSuccess('AI Assistant', `Arahan artikel berhasil dibuat ulang oleh ${currentUserName}.`)
  }

  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false)

  const handleExportDocs = () => {
    setIsExportDropdownOpen(false)
    const contentHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${briefTitle}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 24px; }
        h1 { color: #1866EF; }
        h2, h3 { color: #0f172a; }
        .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; margin: 12px 0; }
      </style>
      </head>
      <body>
        <h1>${briefTitle}</h1>
        <div class="meta-box">
          <p><strong>Sasaran Pembaca:</strong> ${targetAudience}</p>
        </div>
        <div class="meta-box">
          <p><strong>Pertanyaan Utama:</strong></p>
          <ul>
            ${mainQuestions.map((q) => `<li>${q}</li>`).join('')}
          </ul>
        </div>
        <p><strong>Sudut Pandang Jurnalistik (Angle):</strong></p>
        <p>${angle}</p>
        <h3>Kerangka Naskah (Heading H2 & H3):</h3>
        <ul>
          ${headings.map(h => `<li><strong>${h.level}:</strong> ${h.text}</li>`).join('')}
        </ul>
        <h3>Data & Entitas Wajib Dikutip:</h3>
        <p>OJK (Otoritas Jasa Keuangan), Inflasi Tahunan BI, Bursa Efek Indonesia (BEI), UU P2SK No. 4/2023</p>
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
  }

  const handleExportMD = () => {
    setIsExportDropdownOpen(false)
    const md = `# ${briefTitle}\n\n**Sasaran Pembaca:**\n${targetAudience}\n\n**Pertanyaan Utama:**\n${mainQuestions
      .map((q) => `- ${q}`)
      .join('\n')}\n\n**Sudut Pandang Jurnalistik (Angle):**\n${angle}\n\n## Struktur Kerangka Naskah:\n${headings
      .map((h) => `${h.level === 'H2' ? '##' : '###'} ${h.text}`)
      .join('\n')}\n\n## Data & Entitas Wajib Dikutip:\n- OJK (Otoritas Jasa Keuangan)\n- Inflasi Tahunan BI\n- Bursa Efek Indonesia (BEI)\n- UU P2SK No. 4/2023`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `arahan-${briefTitle.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    showSuccess('Ekspor MD', 'Arahan artikel berhasil diekspor ke file Markdown (.md)')
  }

  const handleExportPDF = () => {
    setIsExportDropdownOpen(false)
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
          <div class="box">
            <strong>Sasaran Pembaca:</strong> ${targetAudience}
          </div>
          <div class="box">
            <strong>Pertanyaan Utama:</strong>
            <ul>
              ${mainQuestions.map((q) => `<li>${q}</li>`).join('')}
            </ul>
          </div>
          <h3>Sudut Pandang Jurnalistik (Angle):</h3>
          <p style="font-size: 13px;">${angle}</p>
          <h3>Kerangka Naskah:</h3>
          <ul style="font-size: 13px;">
            ${headings.map(h => `<li><strong>${h.level}:</strong> ${h.text}</li>`).join('')}
          </ul>
          <h3>Data & Entitas Wajib Dikutip:</h3>
          <p style="font-size: 13px;">OJK (Otoritas Jasa Keuangan), Inflasi Tahunan BI, Bursa Efek Indonesia (BEI), UU P2SK No. 4/2023</p>
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

  const AI_QUESTION_POOL = [
    'Bagaimana tahapan verifikasi izin manajer investasi dan APERD resmi di portal OJK?',
    'Berapa batas saldo minimal untuk memulai diversifikasi portofolio reksadana pasar uang?',
    'Apa konsekuensi risiko fluktuasi NAB harian terhadap modal awal investor pemula?',
    'Berapa lama proses penyelesaian transaksi pencairan (T+1 hingga T+7) ke rekening bank nasabah?',
    'Bagaimana perhitungan pengenaan pajak imbal hasil reksadana sesuai UU P2SK terbaru?',
  ]

  const handleAddAIQuestion = () => {
    if (mainQuestions.length >= 10) {
      showWarning(
        'Batas Maksimal Tercapai',
        'Anda hanya dapat menambahkan maksimal 10 pertanyaan utama. Hapus salah satu pertanyaan jika ingin menambah yang baru.'
      )
      return
    }
    const nextQ =
      AI_QUESTION_POOL.find((q) => !mainQuestions.includes(q)) ||
      `Bagaimana mitigasi risiko investasi reksadana pada volatilitas pasar ${mainQuestions.length + 1}?`
    setMainQuestions((prev) => [...prev, nextQ])
    showSuccess('Pertanyaan Utama AI', 'AI berhasil merumuskan pertanyaan pembaca baru berdasarkan kelompok topik.')
  }

  const handleRowClick = (item: BriefTableRow) => {
    if (item.processStatus !== 'selesai') {
      showWarning(
        'Naskah Belum Tersedia',
        `Arahan artikel "${item.title}" saat ini masih dalam antrean (${item.processStatus.toUpperCase()}) dan belum siap dikerjakan oleh editor.`
      )
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
    setViewMode('detail')
  }

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
    setIsClaimModalOpen(false)
    setItemToClaim(null)
    setViewMode('detail')
    showSuccess(
      'Arahan Artikel Diklaim',
      `Anda berhasil mengunci arahan artikel ini (${currentUserName}). Editor lain tidak dapat mengambilnya.`
    )
  }

  const handleReleaseBrief = () => {
    setBriefList((prev) =>
      prev.map((b) =>
        b.id === activeBriefId || b.title === activeItemTitle
          ? { ...b, editor: '-', status: 'Tersedia' }
          : b
      )
    )
    setViewMode('table')
    showSuccess(
      'Arahan Artikel Dilepas',
      'Arahan artikel berhasil dilepas kembali ke antrean untuk editor lain.'
    )
  }

  const renderClaimModal = () => {
    if (!isClaimModalOpen || !itemToClaim) return null
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Ambil & Kunci Arahan Artikel?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Arahan artikel <strong className="text-slate-800 font-semibold">"{itemToClaim.title}"</strong> saat ini berstatus <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Tersedia</span>.
            </p>
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl mb-5 text-xs text-blue-900 leading-relaxed">
              Ketika Anda mengambil arahan artikel ini, sistem akan menguncinya atas nama Anda (<span className="font-bold">{currentUser?.name || 'Budi Prasetyo (Anda)'}</span>). Editor lain tidak dapat masuk atau mengeditnya sampai Anda mengklik tombol <strong>Lepas Arahan Artikel</strong>.
            </div>
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsClaimModalOpen(false)
                  setItemToClaim(null)
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmClaim}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1866EF] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Ambil & Kunci Arahan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderLockAlertModal = () => {
    if (!isLockAlertOpen || !lockedItemInfo) return null
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Arahan Artikel Sudah Diambil
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Arahan artikel <strong className="text-slate-800 font-semibold">"{lockedItemInfo.title}"</strong> saat ini telah diambil dan dikunci oleh:
            </p>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-xs">
                {lockedItemInfo.editor.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{lockedItemInfo.editor}</p>
                <p className="text-[10px] text-amber-700 font-medium">Sedang meninjau / membuat ulang arahan artikel</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Anda baru dapat mengambil atau melihat arahan artikel ini setelah editor tersebut melepaskannya.
            </p>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsLockAlertOpen(false)
                  setLockedItemInfo(null)
                }}
                className="px-6 py-2 text-xs font-bold text-white bg-[#1866EF] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderReleaseConfirmModal = () => {
    if (!isReleaseConfirmOpen) return null
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Lepas Arahan Artikel?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Apakah Anda yakin ingin melepas arahan artikel ini? Jika Anda melepasnya, arahan artikel ini akan berstatus <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Tersedia</span> kembali dan dapat dipakai serta dikerjakan oleh editor lain.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsReleaseConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsReleaseConfirmOpen(false)
                  handleReleaseBrief()
                }}
                className="px-4 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Ya, Lepas Arahan Artikel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Filtered rows for table view
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

  // =========================================================================
  // 1. TABLE VIEW: 50 DAFTAR ARAHAN ARTIKEL (Matching Image 9)
  // =========================================================================
  if (viewMode === 'table') {
    return (
      <div className="space-y-6">
        {/* 1. Milestone Stepper: Step 4 Active */}
        <MilestoneStepper currentStep={4} />

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

        {/* 4. Table Container matching Image 9 */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
          {/* Search & Filter Header Row: Search bar stretches to status filter */}
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
                    const isLockedByOther =
                      item.processStatus === 'selesai' &&
                      item.editor !== '-' &&
                      !item.editor.toLowerCase().includes((currentUser?.name || '').toLowerCase()) &&
                      !(currentUser?.name || '').toLowerCase().includes(item.editor.toLowerCase())

                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleRowClick(item)}
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
                          <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium">
                            {item.mainKeyword}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-1 items-start">
                            {item.supportingKeywords.map((kw, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[11px] bg-slate-50"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Kolom Status Proses */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {item.processStatus === 'selesai' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Selesai
                            </span>
                          ) : item.processStatus === 'diproses' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              <Sparkles className="w-3 h-3 animate-spin text-blue-600" />
                              Diproses
                            </span>
                          ) : item.processStatus === 'antre' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              Antre
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <ShieldAlert className="w-3 h-3 text-rose-600" />
                              Gagal
                            </span>
                          )}
                        </td>

                        {/* Kolom Editor */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {item.processStatus !== 'selesai' ? (
                            <span className="text-slate-400 font-normal italic">-</span>
                          ) : item.editor !== '-' ? (
                            <div className="flex items-center gap-1.5 font-medium text-slate-800">
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1866EF] font-bold text-[10px] flex items-center justify-center shrink-0">
                                {item.editor.charAt(0)}
                              </div>
                              <span className="truncate max-w-[120px]">{item.editor}</span>
                            </div>
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
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRowClick(item)
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
                      <td colSpan={6} className="py-8 text-center text-slate-400">
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
              <span>Menampilkan 1-5 dari 50 data</span>
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
                Berikutnya
              </button>
            </div>
          </div>
        </div>

        {/* Claim & Lock Alert Modals */}
        {renderClaimModal()}
        {renderLockAlertModal()}
      </div>
    )
  }

  // =========================================================================
  // 3. VERSIONS TABLE VIEW: RIWAYAT VERSI ARAHAN ARTIKEL
  // =========================================================================
  if (viewMode === 'versions') {
    return (
      <div className="space-y-6">
        {/* Milestone Stepper */}
        <MilestoneStepper currentStep={4} />

        {/* Back Link & Header */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setViewMode('detail')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Detail Arahan Artikel</span>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
              {activeItemTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-4xl leading-relaxed">
              <strong className="text-slate-700 font-semibold">Sudut Pandang Jurnalistik (Angle):</strong> Edukasi finansial praktis dan komprehensif bagi investor pemula untuk memahami instrumen reksadana, diversifikasi portofolio, dan kepatuhan regulasi OJK terbaru tahun 2026.
            </p>
          </div>
        </div>

        {/* Versions Table Card */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Daftar Riwayat Versi Arahan Artikel
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF]">
              {BRIEF_VERSIONS.length} Versi Tersimpan
            </span>
          </div>

          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold">Versi Arahan Artikel</th>
                    <th className="py-3 px-4 font-semibold">Dibuat Oleh</th>
                    <th className="py-3 px-4 font-semibold">Ringkasan Perubahan</th>
                    <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {BRIEF_VERSIONS.map((v) => {
                    const isActive = v.id === activeBriefVersionId
                    return (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {/* Toggle Switch */}
                            <button
                              type="button"
                              onClick={() => handleToggleBriefVersion(v.id)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-hidden cursor-pointer shrink-0 ${
                                isActive ? 'bg-[#1866EF]' : 'bg-slate-300'
                              }`}
                              title={isActive ? 'Versi ini sedang aktif' : 'Klik untuk aktifkan versi ini'}
                            >
                              <span
                                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                  isActive ? 'translate-x-4.5' : 'translate-x-1'
                                }`}
                              />
                            </button>

                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900">{v.version}</span>
                              {isActive && (
                                <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-[10px] font-bold">
                                  Aktif
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className={`font-semibold ${v.isAI ? 'text-[#1866EF]' : 'text-slate-900'}`}>
                              {v.createdBy}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                              {v.createdAt}
                            </span>
                          </div>
                        </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">{v.changeSummary}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCompareBriefVersion(v)
                            setViewMode('compare')
                          }}
                          className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-blue-100 border border-[#BFDBFE] text-[#1866EF] font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          title="Bandingkan dengan Versi Terbaru"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Bandingkan</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Claim & Lock Alert Modals */}
        {renderClaimModal()}
        {renderLockAlertModal()}
      </div>
    )
  }

  // =========================================================================
  // 4. COMPARE VIEW: PERBANDINGAN BERDAMPINGAN DUA VERSI (SIDE-BY-SIDE)
  // =========================================================================
  if (viewMode === 'compare') {
    const latest = BRIEF_VERSIONS.find((v) => v.id === activeBriefVersionId) || BRIEF_VERSIONS[0]
    const compareTarget =
      selectedCompareBriefVersion ||
      (activeBriefVersionId === 'bv-1' ? BRIEF_VERSIONS[0] : BRIEF_VERSIONS[1])

    return (
      <div className="space-y-6">
        {/* Milestone Stepper */}
        <MilestoneStepper currentStep={4} />

        {/* Back Link & Header */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setViewMode('versions')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Riwayat Versi</span>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
              Perbandingan Versi Arahan Artikel
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-4xl leading-relaxed">
              Membandingkan <strong className="text-slate-800">{compareTarget.version}</strong> dengan <strong className="text-slate-800">{latest.version} (Versi Saat Ini)</strong>. Bagian yang disunting atau disempurnakan disorot dengan warna khusus.
            </p>
          </div>
        </div>

        {/* Side-by-Side 2 Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Versi Pilihan (Target Compare) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-5">
            {/* Header styled like draft detail */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                {compareTarget.version} | {compareTarget.createdAt}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(compareTarget.title)
                  showSuccess('Salin Berhasil', `Konten ${compareTarget.version} disalin`)
                }}
                className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Salin Arahan</span>
              </button>
            </div>

            {/* Author Meta */}
            <div className="text-xs text-slate-500">
              Dibuat oleh: <strong className="text-slate-800">{compareTarget.createdBy}</strong>
            </div>

            {/* Judul Artikel */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Judul Usulan Artikel</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                {compareTarget.title}
              </div>
            </div>

            {/* Sudut Pandang */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sudut Pandang Jurnalistik (Angle)</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                {compareTarget.angle}
              </div>
            </div>

            {/* Sasaran Pembaca */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target Pembaca</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                {compareTarget.targetAudience}
              </div>
            </div>

            {/* Kerangka Outline H2 */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kerangka Naskah (Outline H2)</div>
              <div className="space-y-1.5">
                {compareTarget.h2List.map((h2, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700 flex items-start gap-2">
                    <span className="font-bold text-slate-400">H2.{i + 1}</span>
                    <span>{h2}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Versi Terbaru (Versi 1.2 Saat Ini) */}
          <div className="bg-white border-2 border-[#1866EF]/40 rounded-xl p-6 shadow-sm space-y-5">
            {/* Header styled like draft detail */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1866EF] text-xs font-bold">
                {latest.version} (Saat Ini) | {latest.createdAt}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(latest.title)
                  showSuccess('Salin Berhasil', `Konten ${latest.version} disalin`)
                }}
                className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Salin Arahan</span>
              </button>
            </div>

            {/* Author Meta */}
            <div className="text-xs text-slate-500">
              Dibuat oleh: <strong className="text-slate-800">{latest.createdBy}</strong>
            </div>

            {/* Judul Artikel (Highlighted Improvement) */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Judul Usulan Artikel</div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-950">
                {latest.title}
                <span className="block text-[10px] text-emerald-700 font-normal mt-1">
                  ✓ Penajaman kata kunci: menambahkan "Legal OJK" & "Modal Rp10.000".
                </span>
              </div>
            </div>

            {/* Sudut Pandang (Highlighted Improvement) */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sudut Pandang Jurnalistik (Angle)</div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-300 rounded-lg text-xs text-emerald-950 leading-relaxed">
                {latest.angle}
                <span className="block text-[10px] text-emerald-700 font-normal mt-1">
                  ✓ Diperbarui: Penekanan regulasi OJK terbaru tahun 2026 dan perlindungan konsumen.
                </span>
              </div>
            </div>

            {/* Sasaran Pembaca */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target Pembaca</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                {latest.targetAudience}
              </div>
            </div>

            {/* Kerangka Outline H2 (Highlighted Additions) */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kerangka Naskah (Outline H2)</div>
              <div className="space-y-1.5">
                {latest.h2List.map((h2, i) => {
                  const isNew = i >= 2 && i <= 3
                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-md text-xs flex items-start gap-2 border ${
                        isNew
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className={`font-bold ${isNew ? 'text-emerald-700' : 'text-slate-400'}`}>H2.{i + 1}</span>
                      <div className="flex-1">
                        <span>{h2}</span>
                        {isNew && (
                          <span className="ml-2 text-[10px] font-semibold text-emerald-700 bg-white/80 px-1.5 py-0.2 rounded border border-emerald-300">
                            Subtopik Baru
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Claim & Lock Alert Modals */}
        {renderClaimModal()}
        {renderLockAlertModal()}
      </div>
    )
  }

  // =========================================================================
  // 2. DETAIL VIEW: EDIT ARAHAN ARTIKEL (Matching Image 11)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 4 Active */}
      <MilestoneStepper currentStep={4} />

      {/* 2. Top Title Row with Back Link and Action Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setViewMode('table')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Kembali Daftar Arahan Artikel</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            {activeItemTitle}
          </h1>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Button Tertiary: Versioning info & shortcut to versions page */}
            {(() => {
              const currentActiveVer =
                BRIEF_VERSIONS.find((v) => v.id === activeBriefVersionId) || BRIEF_VERSIONS[0]
              return (
                <button
                  type="button"
                  onClick={() => setViewMode('versions')}
                  className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex flex-col items-start justify-center text-left"
                  title="Lihat Riwayat Versi Arahan Artikel"
                >
                  <div className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#1866EF]" />
                    <span className="text-xs font-bold text-slate-900">{currentActiveVer.version}</span>
                    <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">Aktif</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal leading-tight">
                    {currentActiveVer.isAI
                      ? 'Dibuat oleh AI Assistant'
                      : `Disunting oleh ${currentActiveVer.createdBy.split(' (')[0]} (${currentActiveVer.createdAt.split(' WIB')[0]})`}
                  </span>
                </button>
              )
            })()}

            <button
              type="button"
              onClick={handleRegenerateWithAI}
              className="h-10 px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buat Ulang Arahan dengan AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={4} />

      {/* 4. Two-Column Layout matching Image 11 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (lg:col-span-8): Content Editor */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card 1: Judul Usulan Artikel */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Judul Usulan Artikel
            </label>
            <input
              type="text"
              value={briefTitle}
              onChange={(e) => setBriefTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF]"
            />
          </div>

          {/* Card 2: Sasaran Pembaca (Dipindahkan ke bawah Judul Usulan Artikel) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Sasaran Pembaca
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Masukkan sasaran pembaca..."
              className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] font-medium"
            />
          </div>

          {/* Card 3: Pertanyaan Utama (Sebelumnya: Pertanyaan Pembaca Terjawab, dipindahkan ke bawah Sasaran Pembaca) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900 block">
                  Pertanyaan Utama ({mainQuestions.length}/10)
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Anda hanya dapat menambahkan maksimal sebanyak 10 pertanyaan utama.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddAIQuestion}
                disabled={mainQuestions.length >= 10}
                className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1 disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tambah dgn AI</span>
              </button>
            </div>
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-2">
              {mainQuestions.map((q, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">•</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => {
                      const updated = [...mainQuestions]
                      updated[idx] = e.target.value
                      setMainQuestions(updated)
                    }}
                    placeholder="Ketik pertanyaan utama..."
                    className="flex-1 px-3 py-1.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF]"
                  />
                  {mainQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setMainQuestions(mainQuestions.filter((_, i) => i !== idx))}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                      title="Hapus pertanyaan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Sudut Pandang Jurnalistik (Angle) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Sudut Pandang Jurnalistik (Angle)
            </label>
            <textarea
              rows={3}
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
            />
          </div>

          {/* Card 5: Kerangka Naskah (Heading H1 Baku di atas, H2-H6 & P) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 block">
                Kerangka Naskah
              </label>
              <button
                type="button"
                onClick={handleAddHeading}
                className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>

            <div className="space-y-2">
              {headings.map((item, idx) => (
                <div
                  key={item.id}
                  draggable={item.level !== 'H1'}
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-2 p-2 border rounded-lg transition-colors group ${
                    item.level === 'H1'
                      ? 'bg-blue-50/50 border-blue-200/90'
                      : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  {/* Drag Handle: Hidden for H1 */}
                  {item.level !== 'H1' ? (
                    <div className="cursor-grab text-slate-400 hover:text-slate-600 px-1">
                      <GripVertical className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 px-1" title="H1 Baku Permanen" />
                  )}

                  {/* Level Pill */}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.level === 'H1'
                        ? 'bg-[#1866EF] text-white'
                        : item.level === 'H2'
                        ? 'bg-blue-100 text-[#1866EF]'
                        : item.level === 'H3'
                        ? 'bg-slate-200 text-slate-700'
                        : item.level === 'H4'
                        ? 'bg-indigo-100 text-indigo-700'
                        : item.level === 'H5'
                        ? 'bg-purple-100 text-purple-700'
                        : item.level === 'H6'
                        ? 'bg-cyan-100 text-cyan-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.level}
                  </span>

                  {/* Heading Title Input */}
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-800 font-medium focus:outline-none focus:bg-white px-2 py-1 rounded"
                  />

                  {/* Level Dropdown Toggle */}
                  {item.level !== 'H1' && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenLevelId(openLevelId === item.id ? null : item.id)
                        }
                        className="px-2 py-1 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-100 cursor-pointer"
                      >
                        {item.level}
                      </button>

                      {openLevelId === item.id && (
                        <div className="absolute right-0 top-full mt-1 w-20 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20">
                          {['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleLevelChange(item.id, lvl)}
                              className={`w-full text-left px-3 py-1 text-xs hover:bg-slate-50 font-medium ${
                                item.level === lvl ? 'text-[#1866EF] font-bold bg-blue-50/50' : 'text-slate-700'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Delete Button: Hidden for H1 */}
                  {item.level !== 'H1' && (
                    <button
                      type="button"
                      onClick={() => handleDeleteHeading(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                      title="Hapus heading"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Daftar URL/penerbit/sumber pendukung */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 block">
                Daftar URL/penerbit/sumber pendukung
              </label>
              <button
                type="button"
                onClick={() => setIsAddingSource(true)}
                className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {supportingSources.map((ent, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium"
                >
                  <span>{ent}</span>
                  <button
                    type="button"
                    onClick={() => setSupportingSources(supportingSources.filter((_, idx) => idx !== i))}
                    className="hover:text-rose-600 transition-colors cursor-pointer"
                    title="Hapus sumber"
                  >
                    <X className="w-3 h-3 text-[#1D4ED8] hover:text-rose-600" />
                  </button>
                </span>
              ))}

              {isAddingSource ? (
                <div className="inline-flex items-center gap-1.5 bg-blue-50/60 p-1.5 rounded-lg border border-blue-200">
                  <input
                    type="text"
                    autoFocus
                    value={newSourceInput}
                    onChange={(e) => setNewSourceInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSourceInput.trim()) {
                        e.preventDefault()
                        setSupportingSources([...supportingSources, newSourceInput.trim()])
                        setNewSourceInput('')
                        setIsAddingSource(false)
                      }
                    }}
                    placeholder="Nama sumber / URL..."
                    className="h-[28px] px-2.5 text-xs bg-white border border-blue-300 rounded focus:outline-none w-48"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSourceInput.trim()) {
                        setSupportingSources([...supportingSources, newSourceInput.trim()])
                        setNewSourceInput('')
                      }
                      setIsAddingSource(false)
                    }}
                    className="h-[28px] px-2.5 bg-[#1866EF] text-white text-xs font-semibold rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewSourceInput('')
                      setIsAddingSource(false)
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingSource(true)}
                  className="h-[28px] w-[28px] rounded-full border border-dashed border-[#BFDBFE] hover:bg-blue-50 text-[#1866EF] flex items-center justify-center transition-colors cursor-pointer"
                  title="Tambah Sumber Pendukung"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Card 7: Rekomendasi Tautan Internal Portal RRI */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 block">
                Rekomendasi Tautan Internal Portal RRI
              </label>
              <button
                type="button"
                onClick={() => setIsAddingLink(true)}
                className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {internalLinks.map((link) => (
                <div
                  key={link.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium group"
                >
                  <a
                    href={`#${link.url}`}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <span>{link.title} ({link.url})</span>
                    <ExternalLink className="w-3 h-3 text-[#1D4ED8]" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setInternalLinks(internalLinks.filter((l) => l.id !== link.id))}
                    className="hover:text-rose-600 transition-colors cursor-pointer ml-1"
                    title="Hapus tautan internal"
                  >
                    <X className="w-3 h-3 text-[#1D4ED8] hover:text-rose-600" />
                  </button>
                </div>
              ))}

              {isAddingLink ? (
                <div className="flex flex-wrap items-center gap-1.5 bg-blue-50/60 p-1.5 rounded-lg border border-blue-200">
                  <input
                    type="text"
                    autoFocus
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    placeholder="Judul artikel internal..."
                    className="h-[28px] px-2.5 text-xs bg-white border border-blue-300 rounded focus:outline-none w-44"
                  />
                  <input
                    type="text"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="URL (contoh: rri.co.id/bisnis/512)"
                    className="h-[28px] px-2.5 text-xs bg-white border border-blue-300 rounded focus:outline-none w-48"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newLinkTitle.trim()) {
                        setInternalLinks([
                          ...internalLinks,
                          {
                            id: `il-${Date.now()}`,
                            title: newLinkTitle.trim(),
                            url: newLinkUrl.trim() || 'rri.co.id/berita/artikel',
                          },
                        ])
                        setNewLinkTitle('')
                        setNewLinkUrl('')
                      }
                      setIsAddingLink(false)
                    }}
                    className="h-[28px] px-2.5 bg-[#1866EF] text-white text-xs font-semibold rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewLinkTitle('')
                      setNewLinkUrl('')
                      setIsAddingLink(false)
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingLink(true)}
                  className="h-[28px] w-[28px] rounded-full border border-dashed border-[#BFDBFE] hover:bg-blue-50 text-[#1866EF] flex items-center justify-center transition-colors cursor-pointer"
                  title="Tambah Tautan Internal"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Sidebar Action Cards */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card 1: Keputusan Redaksi */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Keputusan Redaksi</h3>

            {/* Dropdown Ekspor Arahan (Docs, MD, PDF) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                className="w-full h-10 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
              >
                <span>Ekspor Arahan</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isExportDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsExportDropdownOpen(false)}
                  />
                  <div className="absolute right-0 left-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 divide-y divide-slate-100 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={handleExportDocs}
                      className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-slate-800 font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#1866EF]" />
                        <span>Ekspor sebagai Docs (.doc)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Word</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportPDF}
                      className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-slate-800 font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-600" />
                        <span>Ekspor sebagai PDF (.pdf)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">PDF</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Setujui Button */}
            <button
              type="button"
              onClick={handleApprove}
              className="w-full h-10 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Setujui Arahan Artikel
            </button>

            {/* Lepas Arahan Button */}
            <button
              type="button"
              onClick={() => setIsReleaseConfirmOpen(true)}
              className="w-full h-10 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Lepas Arahan Artikel</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
              Brief yang disetujui akan otomatis masuk antrean produksi Draf AI Claude 3.5 Sonnet
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {renderClaimModal()}
      {renderLockAlertModal()}
      {renderReleaseConfirmModal()}
    </div>
  )
}
