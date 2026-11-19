import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Copy,
  Sparkles,
  Edit,
  FileText,
  Download,
  Eye,
  History,
  Lock,
  ShieldAlert,
  LogOut,
  User,
} from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

interface DraftTableRow {
  id: string
  title: string
  seoScore: number
  version: string
  editor: string
  status: string
}

interface DraftVersionItem {
  id: string
  version: string
  title: string
  createdAt: string
  createdBy: string
  isAI: boolean
  wordCount: number
  seoScore: number
  changeSummary: string
  angle: string
  lead: string
  sections: { heading: string; content: string; isNew?: boolean }[]
}

const DRAFT_VERSIONS: DraftVersionItem[] = [
  {
    id: 'dv-3',
    version: 'Versi 2.0',
    title: 'Cara Investasi Reksadana Pemula: Panduan Aman Modal Rp10.000 Legal OJK',
    createdAt: '14 Nov 2026, 16:45 WIB',
    createdBy: 'Budi Santoso (Editor)',
    isAI: false,
    wordCount: 2110,
    seoScore: 94,
    changeSummary: 'Penambahan konfirmasi izin APERD OJK, data SID KSEI, serta penyesuaian regulasi UU P2SK.',
    angle: 'Edukasi finansial praktis dan komprehensif bagi investor pemula untuk memahami instrumen reksadana, diversifikasi portofolio, dan regulasi OJK terbaru tahun 2026.',
    lead: 'JAKARTA — Memulai investasi sering kali dipandang membutuhkan modal jutaan rupiah dan pengetahuan analisis pasar yang rumit. Namun, kehadiran instrumen reksadana yang diawasi Otoritas Jasa Keuangan (OJK) membuka jalan bagi masyarakat awam untuk berinvestasi mulai dari Rp10.000 secara aman dan transparan.',
    sections: [
      {
        heading: 'Mengenal Mekanisme Kerja Reksadana dan Perlindungan Konsumen OJK',
        content: 'Reksadana menghimpun dana dari masyarakat pemodal untuk selanjutnya diinvestasikan dalam portofolio efek oleh Manajer Investasi (MI) berizin resmi. Dana nasabah tidak disimpan oleh manajer investasi, melainkan di Bank Kustodian independen.',
      },
      {
        heading: '4 Jenis Reksadana untuk Menyesuaikan Profil Risiko Pemula',
        content: 'Bagi pemula, Reksadana Pasar Uang (RPU) merupakan opsi paling konservatif dengan risiko fluktuasi minimal, ideal sebagai sarana penyimpanan dana darurat. Reksadana Pendapatan Tetap menempatkan minimal 80% aset pada obligasi pemerintah, sementara Reksadana Saham ditujukan untuk tujuan jangka panjang di atas lima tahun.',
      },
      {
        heading: 'Panduan Verifikasi Legalitas APERD melalui Portal Sipena OJK',
        content: 'Sebelum mentransfer dana, investor wajib memastikan aplikasi Agen Penjual Efek Reksa Dana (APERD) telah mengantongi izin resmi OJK. Menurut data Kustodian Sentral Efek Indonesia (KSEI), pertumbuhan investor ritel pasar modal pada 2026 telah menembus 14 juta Single Investor Identification (SID).',
        isNew: true,
      },
      {
        heading: 'Langkah Praktis Pembelian Pertama Kali dan Strategi Dollar Cost Averaging',
        content: 'Lakukan registrasi secara online dengan menyiapkan e-KTP. Manfaatkan strategi Dollar Cost Averaging (DCA), yaitu menyisihkan dana secara konsisten setiap bulan tanpa perlu memusingkan naik-turunnya harga harian pasar modal.',
        isNew: true,
      },
    ],
  },
  {
    id: 'dv-2',
    version: 'Versi 1.5',
    title: 'Cara Investasi Reksadana Online bagi Pemula',
    createdAt: '13 Nov 2026, 11:30 WIB',
    createdBy: 'Siti Rahmawati (Editor)',
    isAI: false,
    wordCount: 1980,
    seoScore: 90,
    changeSummary: 'Penyempurnaan lead paragraph dan penambahan penjelasan mengenai Bank Kustodian.',
    angle: 'Panduan langkah demi langkah investasi reksadana online bagi masyarakat pemula dengan fokus efisiensi transaksi perbankan.',
    lead: 'JAKARTA — Investasi reksadana kini semakin diminati generasi muda. Dengan modal puluhan ribu rupiah melalui ponsel cerdas, siapa saja bisa mulai menabung untuk masa depan dengan diversifikasi otomatis.',
    sections: [
      {
        heading: 'Apa Itu Reksadana dan Bagaimana Uang Anda Dikelola',
        content: 'Reksadana adalah wadah yang digunakan untuk menghimpun dana pemodal. Dana tersebut dikelola oleh manajer investasi ke dalam instrumen pasar uang, obligasi, maupun saham.',
      },
      {
        heading: 'Memilih Jenis Reksadana yang Tepat Sesuai Kebutuhan',
        content: 'Terdapat reksadana pasar uang, reksadana pendapatan tetap, campuran, dan saham. Pilihlah yang sesuai dengan jangka waktu investasi dan toleransi terhadap penurunan harga.',
      },
      {
        heading: 'Cara Membuka Akun Investasi Reksadana di Platform Digital',
        content: 'Proses pembukaan rekening kini dilakukan sepenuhnya online menggunakan e-KTP dan verifikasi biometrik wajah. Dalam hitungan jam, rekening efek siap digunakan untuk bertransaksi.',
      },
    ],
  },
  {
    id: 'dv-1',
    version: 'Versi 1.0',
    title: 'Draf Awal: Investasi Reksadana Dasar',
    createdAt: '12 Nov 2026, 14:10 WIB',
    createdBy: 'AI Assistant (Claude 3.5 Sonnet)',
    isAI: true,
    wordCount: 1850,
    seoScore: 86,
    changeSummary: 'Generasi draf artikel pertama otomatis dari outline arahan artikel.',
    angle: 'Tinjauan dasar instrumen reksadana pasar uang dan saham untuk pembaca awam.',
    lead: 'Investasi reksadana adalah instrumen populer bagi pemula karena modal awal yang terjangkau dan pengelolaan profesional oleh manajer investasi.',
    sections: [
      {
        heading: 'Pengertian Reksadana',
        content: 'Reksadana merupakan wadah investasi kolektif di mana manajer investasi mengalokasikan modal ke berbagai surat berharga.',
      },
      {
        heading: 'Pilihan Reksadana untuk Pemula',
        content: 'Pasar uang menawarkan stabilitas tertinggi, sedangkan saham memberikan imbal hasil lebih besar dalam jangka panjang namun dengan risiko penurunan nilai yang lebih tinggi.',
      },
    ],
  },
]

const INITIAL_DRAFT_TABLE: DraftTableRow[] = [
  {
    id: 'DFT-001',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    seoScore: 94,
    version: 'Versi 2',
    editor: 'Siti Rahmawati',
    status: 'Diambil oleh Siti Rahmawati',
  },
  {
    id: 'DFT-002',
    title: 'Panduan Registrasi Identitas Kependudukan Digital (IKD)',
    seoScore: 91,
    version: 'Versi 2',
    editor: '-',
    status: 'Tersedia',
  },
  {
    id: 'DFT-003',
    title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
    seoScore: 89,
    version: 'Versi 1',
    editor: 'Dewi Lestari',
    status: 'Diambil oleh Dewi Lestari',
  },
  {
    id: 'DFT-004',
    title: 'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z',
    seoScore: 94,
    version: 'Versi 2',
    editor: '-',
    status: 'Tersedia',
  },
  {
    id: 'DFT-005',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    seoScore: 88,
    version: 'Versi 1',
    editor: 'Ahmad Fauzi',
    status: 'Diambil oleh Ahmad Fauzi',
  },
]

export const DraftPage: React.FC = () => {
  const {
    draft,
    updateDraft,
    publishDraftToEditools,
    setIsHapusDraftOpen,
    setCurrentPage,
    currentUser,
  } = useApp()
  const { showSuccess, showWarning } = useToast()

  // View Mode: 'table' | 'detail' | 'versions' | 'compare'
  const [viewMode, setViewMode] = useState<'table' | 'detail' | 'versions' | 'compare'>('table')
  const [draftVersions, setDraftVersions] = useState<DraftVersionItem[]>(DRAFT_VERSIONS)
  const [activeDraftVersionId, setActiveDraftVersionId] = useState<string>('dv-3')
  const [selectedCompareDraftVersion, setSelectedCompareDraftVersion] = useState<DraftVersionItem>(DRAFT_VERSIONS[1])

  // War Ticket / Lock system states
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const [itemToClaim, setItemToClaim] = useState<DraftTableRow | null>(null)
  const [isLockAlertOpen, setIsLockAlertOpen] = useState(false)
  const [lockedItemInfo, setLockedItemInfo] = useState<{ title: string; editor: string } | null>(null)

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

  // Table filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Tersedia' | 'Diambil'>('Semua')
  const [draftList, setDraftList] = useState<DraftTableRow[]>(INITIAL_DRAFT_TABLE)
  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [activeDraftId, setActiveDraftId] = useState<string>('DFT-004')
  const [activeItemTitle, setActiveItemTitle] = useState(
    'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )

  const handleRowClick = (item: DraftTableRow) => {
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
    setViewMode('table')
    showSuccess(
      'Draf Artikel Dilepas',
      'Draf artikel berhasil dilepas kembali ke antrean untuk editor lain.'
    )
  }

  // Detail view states
  const [selectedVersion, setSelectedVersion] = useState<'v2' | 'v1'>('v2')

  // Metadata SEO states
  const [primaryKeyword, setPrimaryKeyword] = useState('cara investasi reksadana')
  const [secondaryKeywords, setSecondaryKeywords] = useState([
    'reksadana pemula',
    'modal kecil',
    'keuntungan reksadana',
  ])
  const [seoTitle, setSeoTitle] = useState('Panduan Aman Investasi Reksadana Gen-Z: Tips OJK')
  const [metaDesc, setMetaDesc] = useState(
    'Pelajari cara memulai investasi reksadana aman untuk pemula dan Gen-Z. Panduan legalitas OJK, modal Rp10.000, serta tips pencairan.'
  )
  const [slugUrl, setSlugUrl] = useState('cara-investasi-reksadana-pemula')
  const [category, setCategory] = useState('Layanan Publik')
  const [tags, setTags] = useState(['Kartu Keluarga', 'Disdukcapil', 'Administrasi Kependudukan'])

  // AI Image Recommendation states
  const aiImageRec = {
    subject: 'Warga sedang berkonsultasi di loket layanan administrasi kependudukan',
    format: 'Foto horizontal 16:9, dokumenter, tanpa teks pada gambar',
    altText: 'Warga berkonsultasi mengenai pengurusan Kartu Keluarga di layanan administrasi kependudukan',
    caption: 'Ilustrasi layanan pengurusan Kartu Keluarga',
    fileName: 'layanan-pengurusan-kartu-keluarga.jpg',
  }

  // Copy dropdown menu state & handlers
  const [isCopyDropdownOpen, setIsCopyDropdownOpen] = useState(false)

  // Article content states for inline editing
  const [articleHeadline, setArticleHeadline] = useState(
    'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )
  const [leadText, setLeadText] = useState(
    'JAKARTA — Menghadapi dinamika ekonomi digital dan tekanan inflasi, minat generasi muda terhadap instrumen investasi legal kian meningkat. Reksadana kini menjadi salah satu pintu masuk paling diminati bagi kalangan pemula karena modal awal yang sangat terjangkau serta dikelola langsung oleh manajer investasi berizin resmi.'
  )
  const [section1Heading, setSection1Heading] = useState(
    'Apa Itu Reksadana dan Mengapa Ramah Pemula?'
  )
  const [section1Callout1] = useState(
    'Butuh Verifikasi Fakta: Konfirmasi nilai statistik resmi OJK terbaru'
  )
  const [section1Content, setSection1Content] = useState(
    'Berdasarkan rilis statistik Otoritas Jasa Keuangan (OJK), akumulasi dana kelolaan reksadana nasional tercatat menembus angka pertumbuhan signifikan di kuartal kedua. Fleksibilitas serta transparansi laporan bulanan manajer investasi menjadi daya tarik utama bagi investor pemula berpenghasilan pertama.'
  )
  const [section1Callout2] = useState(
    'Kutipan Narasumber Dibutuhkan'
  )
  const [section2Heading, setSection2Heading] = useState(
    'Langkah Praktis Memilih Agen Penjual (APERD) Resmi'
  )
  const [section2Content1, setSection2Content1] = useState(
    'Calon investor wajib memastikan platform Agen Penjual Efek Reksa Dana (APERD) telah terdaftar di OJK. Jangan tergiur promosi return tidak wajar yang menjanjikan keuntungan pasti di media sosial tanpa memahami profil risiko.'
  )
  const [section2Content2, setSection2Content2] = useState(
    'Dengan pemahaman risiko yang baik dan kedisiplinan alokasi dana darurat, generasi muda dapat mengoptimalkan reksadana sebagai benteng ketahanan finansial masa depan tanpa terjebak investasi bodong.'
  )

  const articleBodyText = `${leadText}\n\n${section1Heading}\n${section1Content}\n\n${section2Heading}\n${section2Content1}\n\n${section2Content2}`
  const wordCount = (articleHeadline + ' ' + articleBodyText).trim().split(/\s+/).filter(Boolean).length

  const handleCopyOption = (option: 1 | 2 | 3 | 4 | 5) => {
    setIsCopyDropdownOpen(false)
    if (option === 1) {
      // 1. Salin semua
      const allText = `JUDUL ARTIKEL:\n${articleHeadline}\n\nISI ARTIKEL:\n${articleBodyText}\n\nPAKET METADATA SEO:\nFokus Kata Kunci:\n- Utama: ${primaryKeyword}\n- Pendukung: ${secondaryKeywords.join(', ')}\nJudul SEO: ${seoTitle}\nDeskripsi Meta: ${metaDesc}\nSlug URL: rri.co.id/bisnis/${slugUrl}\nKategori: ${category}\nTag: ${tags.join(', ')}\n\nREKOMENDASI PROMPT GAMBAR DARI AI:\nSubjek: ${aiImageRec.subject}\nFormat: ${aiImageRec.format}\nAlt text: ${aiImageRec.altText}\nCaption: ${aiImageRec.caption}\nNama file saran: ${aiImageRec.fileName}`
      handleCopyText(allText, 'Semua Konten (Judul, Isi, SEO, & Rekomendasi Gambar)')
    } else if (option === 2) {
      // 2. Salin judul artikel
      handleCopyText(articleHeadline, 'Judul Artikel')
    } else if (option === 3) {
      // 3. Salin isi artikel
      handleCopyText(articleBodyText, 'Isi Artikel')
    } else if (option === 4) {
      // 4. Salin paket metadata SEO
      const seoText = `Fokus Kata Kunci:\n- Utama: ${primaryKeyword}\n- Pendukung: ${secondaryKeywords.join(', ')}\nJudul SEO: ${seoTitle}\nDeskripsi Meta: ${metaDesc}\nSlug URL: rri.co.id/bisnis/${slugUrl}\nKategori: ${category}\nTag: ${tags.join(', ')}`
      handleCopyText(seoText, 'Paket Metadata SEO')
    } else if (option === 5) {
      // 5. Salin rekomendasi prompt gambar dari AI
      const imgText = `Subjek: ${aiImageRec.subject}\nFormat: ${aiImageRec.format}\nAlt text: ${aiImageRec.altText}\nCaption: ${aiImageRec.caption}\nNama file saran: ${aiImageRec.fileName}`
      handleCopyText(imgText, 'Rekomendasi Prompt Gambar dari AI')
    }
  }

  const [isExportDraftDropdownOpen, setIsExportDraftDropdownOpen] = useState(false)

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    showSuccess('Salin Berhasil', `${label} telah disalin ke clipboard.`)
  }

  const handleSaveDraft = () => {
    setDraftList((prev) =>
      prev.map((item) =>
        item.id === activeDraftId || item.title === activeItemTitle
          ? { ...item, title: articleHeadline }
          : item
      )
    )
    setActiveItemTitle(articleHeadline)
    setDraftVersions((prev) =>
      prev.map((v) =>
        v.id === activeDraftVersionId
          ? {
              ...v,
              title: articleHeadline,
              wordCount,
              lead: leadText,
              sections: [
                { heading: section1Heading, content: section1Content },
                { heading: section2Heading, content: `${section2Content1}\n\n${section2Content2}` },
              ],
            }
          : v
      )
    )
    showSuccess('Draf Tersimpan', `Perubahan judul "${articleHeadline}" dan isi artikel berhasil disimpan.`)
  }

  const handleExportDraftDocs = () => {
    setIsExportDraftDropdownOpen(false)
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

  const handleExportDraftMD = () => {
    setIsExportDraftDropdownOpen(false)
    const md = `# ${articleHeadline}\n\n${articleBodyText}\n\n---\n\n## Paket Metadata SEO:\n- **Fokus Kata Kunci (Utama):** ${primaryKeyword}\n- **Fokus Kata Kunci (Pendukung):** ${secondaryKeywords.join(', ')}\n- **Judul SEO:** ${seoTitle}\n- **Deskripsi Meta:** ${metaDesc}\n- **Slug URL:** rri.co.id/bisnis/${slugUrl}\n- **Kategori:** ${category}\n- **Tag:** ${tags.join(', ')}\n\n## Rekomendasi Prompt Gambar Dari AI:\n- **Subjek:** ${aiImageRec.subject}\n- **Format:** ${aiImageRec.format}\n- **Alt text:** ${aiImageRec.altText}\n- **Caption:** ${aiImageRec.caption}\n- **Nama file saran:** ${aiImageRec.fileName}`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draft-${activeItemTitle.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    showSuccess('Ekspor MD', 'Draf artikel berhasil diekspor ke file Markdown (.md)')
  }

  const handleExportDraftPDF = () => {
    setIsExportDraftDropdownOpen(false)
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
            <strong>Kategori:</strong> ${category} | <strong>Tag:</strong> ${tags.join(', ')}</p>
          </div>
          <div class="box">
            <h3 style="margin-top:0;">Rekomendasi Prompt Gambar Dari AI</h3>
            <p><strong>Subjek:</strong> ${aiImageRec.subject}<br/>
            <strong>Format:</strong> ${aiImageRec.format}<br/>
            <strong>Alt text:</strong> ${aiImageRec.altText}<br/>
            <strong>Caption:</strong> ${aiImageRec.caption}</p>
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
    showSuccess('Ekspor PDF', 'Membuka jendela cetak untuk menyimpan Draf Artikel sebagai PDF.')
  }

  const handleRegenerateWithAI = () => {
    showSuccess('AI Assistant', 'AI sedang menyusun ulang draf artikel...')
  }

  const renderClaimModal = () => {
    if (!isClaimModalOpen || !itemToClaim) return null
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Ambil & Kunci Draf Artikel?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Draf artikel <strong className="text-slate-800 font-semibold">"{itemToClaim.title}"</strong> saat ini berstatus <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Tersedia</span>.
            </p>
            <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl mb-5 text-xs text-blue-900 leading-relaxed">
              Ketika Anda mengambil draf artikel ini, sistem akan menguncinya atas nama Anda (<span className="font-bold">{currentUser?.name || 'Budi Prasetyo (Anda)'}</span>). Editor lain tidak dapat masuk atau mengeditnya sampai Anda mengklik tombol <strong>Lepas Draft Artikel</strong>.
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
                <span>Ambil & Kunci Draf</span>
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
              Draft Artikel Sudah Diambil
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Draf <strong className="text-slate-800 font-semibold">"{lockedItemInfo.title}"</strong> saat ini telah diambil dan dikunci oleh:
            </p>
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-xs">
                {lockedItemInfo.editor.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{lockedItemInfo.editor}</p>
                <p className="text-[10px] text-amber-700 font-medium">Sedang meninjau / menyunting naskah</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Anda baru dapat mengambil atau melihat draf ini setelah editor tersebut melepaskannya.
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

  const filteredDrafts = draftList.filter((row) => {
    const matchesSearch =
      row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.editor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'Semua'
        ? true
        : statusFilter === 'Tersedia'
        ? row.status === 'Tersedia'
        : row.status.startsWith('Diambil')
    return matchesSearch && matchesStatus
  })

  // =========================================================================
  // 1. TABLE VIEW: 50 DAFTAR DRAFT ARTIKEL (Matching Image 10)
  // =========================================================================
  if (viewMode === 'table') {
    return (
      <div className="space-y-6">
        {/* 1. Milestone Stepper: Step 5 Active */}
        <MilestoneStepper currentStep={5} />

        {/* 2. Page Title and Description */}
        <div>
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            50 Daftar Draft Artikel
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Tinjau sudut pandang liputan, struktur heading H2/H3, entitas wajib, dan setujui brief sebelum diteruskan ke penulisan draf AI.
          </p>
        </div>

        {/* 3. Next Step Banner */}
        <NextStepBanner currentStep={5} />

        {/* 4. Table Container matching Image 10 */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
          {/* Search Header Row & Status Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul artikel atau editor..."
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
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[750px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold w-[36%]">Judul Artikel</th>
                    <th className="py-3 px-4 font-semibold w-[16%]">Skor SEO</th>
                    <th className="py-3 px-4 font-semibold w-[12%]">Versi Draft</th>
                    <th className="py-3 px-4 font-semibold w-[18%]">Editor</th>
                    <th className="py-3 px-4 font-semibold w-[10%]">Status</th>
                    <th className="py-3 px-4 font-semibold text-center w-[8%]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredDrafts.map((item) => {
                    const currentUserName = currentUser?.name || 'Budi Santoso'
                    const isLockedByOther =
                      item.editor !== '-' &&
                      !item.editor.toLowerCase().includes(currentUserName.toLowerCase()) &&
                      !currentUserName.toLowerCase().includes(item.editor.toLowerCase())

                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleRowClick(item)}
                        className={`transition-colors cursor-pointer group ${
                          isLockedByOther
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
                          <span className="inline-block px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-semibold">
                            Skor SEO: {item.seoScore}/100
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {item.version}
                        </td>
                        <td className="py-3.5 px-4">
                          {item.editor !== '-' ? (
                            <div className="flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">
                                {item.editor.charAt(0)}
                              </span>
                              <span className="text-slate-800 font-medium text-xs">
                                {item.editor}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {item.status === 'Tersedia' ? (
                            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                              Tersedia
                            </span>
                          ) : (
                            <span className="text-slate-700 font-medium text-xs">
                              {item.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRowClick(item)
                            }}
                            className={`p-1.5 border rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center ${
                              isLockedByOther
                                ? 'border-amber-200 hover:bg-amber-100 text-amber-700'
                                : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                            }`}
                            title={isLockedByOther ? `Sedang dikerjakan oleh ${item.editor}` : 'Buka Draf Artikel'}
                          >
                            {isLockedByOther ? <Lock className="w-3.5 h-3.5" /> : <Edit className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {filteredDrafts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Tidak ada draf artikel yang cocok dengan pencarian.
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
  // 3. VERSIONS TABLE VIEW: RIWAYAT VERSI DRAFT ARTIKEL
  // =========================================================================
  if (viewMode === 'versions') {
    return (
      <div className="space-y-6">
        {/* Milestone Stepper */}
        <MilestoneStepper currentStep={5} />

        {/* Back Link & Header */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setViewMode('detail')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Detail Draft Artikel</span>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
              {activeItemTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-4xl leading-relaxed">
              <strong className="text-slate-700 font-semibold">Sudut Pandang Jurnalistik (Angle):</strong> Edukasi finansial praktis dan komprehensif bagi investor pemula untuk memahami instrumen reksadana, diversifikasi portofolio, dan regulasi OJK terbaru tahun 2026.
            </p>
          </div>
        </div>

        {/* Versions Table Card */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Daftar Riwayat Versi Draft Artikel
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF]">
              {draftVersions.length} Versi Tersimpan
            </span>
          </div>

          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold">Versi Draft Artikel</th>
                    <th className="py-3 px-4 font-semibold">Dibuat Oleh</th>
                    <th className="py-3 px-4 font-semibold">Statistik Naskah</th>
                    <th className="py-3 px-4 font-semibold">Ringkasan Perubahan</th>
                    <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {draftVersions.map((v) => {
                    const isActive = v.id === activeDraftVersionId
                    return (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {/* Toggle Switch */}
                            <button
                              type="button"
                              onClick={() => handleToggleDraftVersion(v.id)}
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
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1866EF] border border-blue-200 text-[10px] font-semibold">
                            {v.wordCount.toLocaleString('id-ID')} kata
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 text-[10px] font-semibold">
                            SEO: {v.seoScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">{v.changeSummary}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCompareDraftVersion(v)
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
      </div>
    )
  }

  // =========================================================================
  // 4. COMPARE VIEW: PERBANDINGAN BERDAMPINGAN DUA DRAF (SIDE-BY-SIDE)
  // =========================================================================
  if (viewMode === 'compare') {
    const latest = draftVersions.find((v) => v.id === activeDraftVersionId) || draftVersions[0]
    const compareTarget =
      selectedCompareDraftVersion ||
      (activeDraftVersionId === 'dv-1' ? draftVersions[0] : draftVersions[1])

    return (
      <div className="space-y-6">
        {/* Milestone Stepper */}
        <MilestoneStepper currentStep={5} />

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
              Perbandingan Versi Draft Artikel
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
                Artikel Siap Rilis | {compareTarget.version} | {compareTarget.wordCount.toLocaleString('id-ID')} kata
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(compareTarget.lead + '\n\n' + compareTarget.sections.map(s => s.heading + '\n' + s.content).join('\n\n'))
                  showSuccess('Salin Berhasil', `Naskah ${compareTarget.version} disalin`)
                }}
                className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Salin Draft</span>
              </button>
            </div>

            {/* Sub-header meta */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Pembuat: <strong className="text-slate-800">{compareTarget.createdBy}</strong></span>
              <span>Waktu: {compareTarget.createdAt}</span>
            </div>

            {/* Judul Artikel */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Judul Naskah</div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {compareTarget.title}
              </h2>
            </div>

            {/* Paragraf Lead */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lead Paragraf</div>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed text-justify">
                {compareTarget.lead}
              </p>
            </div>

            {/* Isi Tubuh Berita */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Batang Tubuh Naskah</div>
              {compareTarget.sections.map((sec, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {sec.heading}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Versi Terbaru (Versi 2.0 Saat Ini) */}
          <div className="bg-white border-2 border-[#1866EF]/40 rounded-xl p-6 shadow-sm space-y-5">
            {/* Header styled like draft detail */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1866EF] text-xs font-bold">
                Artikel Siap Rilis | {latest.version} (Saat Ini) | {latest.wordCount.toLocaleString('id-ID')} kata
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(latest.lead + '\n\n' + latest.sections.map(s => s.heading + '\n' + s.content).join('\n\n'))
                  showSuccess('Salin Berhasil', `Naskah ${latest.version} disalin`)
                }}
                className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Salin Draft</span>
              </button>
            </div>

            {/* Sub-header meta */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Pembuat: <strong className="text-slate-800">{latest.createdBy}</strong></span>
              <span>Waktu: {latest.createdAt}</span>
            </div>

            {/* Judul Artikel (Highlighted) */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Judul Naskah</div>
              <h2 className="text-base font-bold text-slate-900 leading-snug p-2.5 bg-emerald-50/70 border border-emerald-300 rounded-lg text-emerald-950">
                {latest.title}
              </h2>
            </div>

            {/* Paragraf Lead (Highlighted) */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lead Paragraf</div>
              <p className="p-3 bg-emerald-50/70 border border-emerald-300 rounded-lg text-xs text-emerald-950 leading-relaxed text-justify">
                {latest.lead}
                <span className="block text-[10px] text-emerald-700 font-semibold mt-1.5">
                  ✓ Penyempurnaan Lead: Menegaskan modal Rp10.000 dan regulasi perlindungan konsumen OJK.
                </span>
              </p>
            </div>

            {/* Isi Tubuh Berita */}
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Batang Tubuh Naskah</div>
              {latest.sections.map((sec, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg space-y-1.5 border ${
                    sec.isNew
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xs font-bold leading-snug ${sec.isNew ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {sec.heading}
                    </h3>
                    {sec.isNew && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-white/90 px-2 py-0.5 rounded border border-emerald-300">
                        Paragraf Baru Disetujui
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed text-justify">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 2. DETAIL VIEW: PENYUNTINGAN DRAF (Matching Image 12)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 5 Active */}
      <MilestoneStepper currentStep={5} />

      {/* 2. Top Title Row with Back Link and Action Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setViewMode('table')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Kembali Daftar Draft Artikel</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            {activeItemTitle}
          </h1>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Button Tertiary: Versioning info & shortcut to versions page */}
            {(() => {
              const currentActiveVer =
                draftVersions.find((v) => v.id === activeDraftVersionId) || draftVersions[0]
              return (
                <button
                  type="button"
                  onClick={() => setViewMode('versions')}
                  className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex flex-col items-start justify-center text-left"
                  title="Lihat Riwayat Versi Draf Artikel"
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
              <span>Buat Ulang Draft dengan AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={5} />

      {/* 4. Two-Column Layout matching Image 12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (lg:col-span-7): Article Reader / Editor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-5">
            {/* Top Bar inside Article Card */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
                Artikel Siap Rilis | Versi 2 | {wordCount.toLocaleString('id-ID')} kata
              </span>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCopyDropdownOpen(!isCopyDropdownOpen)}
                  className="h-8 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <span>Salin</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu: 5 Options per user request */}
                {isCopyDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsCopyDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 divide-y divide-slate-100 text-xs animate-in fade-in zoom-in-95 duration-100">
                      {/* Option 1: Salin semua */}
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => handleCopyOption(1)}
                          className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-[#1866EF] font-bold flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 shrink-0" />
                          <span>Salin semua</span>
                        </button>
                      </div>

                      {/* Options 2-5 */}
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => handleCopyOption(2)}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin judul artikel</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyOption(3)}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin isi artikel</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyOption(4)}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin paket metadata SEO</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyOption(5)}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin rekomendasi prompt gambar dari AI</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Category / Type */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Artikel (Naskah Read Only)
              </span>
            </div>

            {/* Article Headline */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {articleHeadline}
              </h2>
            </div>

            {/* Lead Paragraph */}
            <div>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {leadText}
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3 pt-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {section1Heading}
                </h3>
              </div>

              {/* Yellow Callout 1 */}
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-medium">
                  {section1Callout1}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {section1Content}
                </p>
              </div>

              {/* Yellow Callout 2 */}
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-medium">
                  {section1Callout2}
                </span>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-3 pt-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {section2Heading}
                </h3>
              </div>

              <div>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {section2Content1}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {section2Content2}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-5): Sidebar Action Panels */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Status Draf */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Status Draf</h3>
            <p className="text-[11px] text-slate-400">
              Draf AI dibuat 14:10 WIB • Terakhir diperbarui 14:15 WIB
            </p>

            {/* Dropdown Ekspor Draft (Docs, MD, PDF) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExportDraftDropdownOpen(!isExportDraftDropdownOpen)}
                className="w-full h-10 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
              >
                <span>Ekspor Draft</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {isExportDraftDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsExportDraftDropdownOpen(false)}
                  />
                  <div className="absolute right-0 left-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-30 divide-y divide-slate-100 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={handleExportDraftDocs}
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
                      onClick={handleExportDraftMD}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-800 font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-slate-500" />
                        <span>Ekspor sebagai MD (.md)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Markdown</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportDraftPDF}
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

            {/* Kirim ke Editool Button */}
            <button
              type="button"
              onClick={publishDraftToEditools}
              className="w-full h-10 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Kirim ke Editool
            </button>

            {/* Lepas Draft Button */}
            <button
              type="button"
              onClick={handleReleaseDraft}
              className="w-full h-10 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Lepas Draft Artikel</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
              Draf akan otomatis masuk ke antrean uji plagiarisme & buku gaya Editorial.
            </p>
          </div>

          {/* Card 2: Paket Metadata SEO */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Paket Metadata SEO</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-[11px] font-bold">
                Skor SEO: 94/100
              </span>
            </div>

            {/* Fokus Kata Kunci */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-700 block">Fokus Kata Kunci</label>
              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50/70 space-y-2.5">
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 mb-1">Kata Kunci Utama:</div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium">
                    {primaryKeyword}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 mb-1">Kata Kunci Pendukung:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {secondaryKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Judul SEO (Disabled / Non-editable) */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Judul SEO</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-700 leading-relaxed">
                {seoTitle}
              </div>
            </div>

            {/* Deskripsi Meta (Disabled / Non-editable) */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Deskripsi Meta</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-700 leading-relaxed">
                {metaDesc}
              </div>
            </div>

            {/* Slug URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Slug URL</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-600 font-mono">
                <span>rri.co.id/bisnis/</span>
                <span className="text-[#1866EF] font-bold">{slugUrl}</span>
              </div>
            </div>

            {/* Kategori (Disabled / Non-editable) */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Kategori</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-700">
                {category}
              </div>
            </div>

            {/* Tag */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Tag</label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Rekomendasi Prompt Gambar Dari AI */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3.5">
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Rekomendasi Prompt Gambar Dari AI
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Editor memilih atau mencari gambar final. AI hanya memberi arahan visual dan metadata.
              </p>
            </div>

            {/* Subjek */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Subjek</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-800 leading-relaxed">
                {aiImageRec.subject}
              </div>
            </div>

            {/* Format */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Format</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-800 leading-relaxed">
                {aiImageRec.format}
              </div>
            </div>

            {/* Alt text */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Alt text</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-800 leading-relaxed">
                {aiImageRec.altText}
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Caption</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-800 leading-relaxed">
                {aiImageRec.caption}
              </div>
            </div>

            {/* Nama file saran */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Nama file saran</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-800 font-mono">
                {aiImageRec.fileName}
              </div>
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
