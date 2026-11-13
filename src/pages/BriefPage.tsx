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
  Sparkles,
  Edit,
  CheckCircle2,
  FileText,
  Download,
} from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

interface BriefTableRow {
  id: string
  title: string
  mainKeyword: string
  supportingKeywords: string[]
  status: 'Disetujui' | 'Draf' | 'Ditolak'
}

const INITIAL_BRIEF_TABLE: BriefTableRow[] = [
  {
    id: 'BRF-001',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    status: 'Disetujui',
  },
  {
    id: 'BRF-002',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    status: 'Draf',
  },
  {
    id: 'BRF-003',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    status: 'Disetujui',
  },
  {
    id: 'BRF-004',
    title: 'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    status: 'Draf',
  },
  {
    id: 'BRF-005',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    mainKeyword: 'reksadana saham tips',
    supportingKeywords: ['risiko reksadana saham', 'top reksadana', 'investasi saham'],
    status: 'Disetujui',
  },
]

export const BriefPage: React.FC = () => {
  const {
    brief,
    updateBrief,
    approveBrief,
    setIsTolakBriefOpen,
    setCurrentPage,
  } = useApp()
  const { showSuccess } = useToast()

  // View Mode: 'table' (50 Daftar Arahan Artikel) vs 'detail' (Detail Editor)
  const [viewMode, setViewMode] = useState<'table' | 'detail'>('table')

  // Table filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Disetujui' | 'Draf' | 'Ditolak'>('Semua')
  const [briefList, setBriefList] = useState<BriefTableRow[]>(INITIAL_BRIEF_TABLE)

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

  const [headings, setHeadings] = useState([
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
    setDraggedIdx(idx)
  }

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (draggedIdx === null || draggedIdx === idx) return
    const updated = [...headings]
    const item = updated[draggedIdx]
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
    showSuccess('Arahan Artikel', 'Arahan artikel berhasil disetujui dan dialirkan ke antrean Draf AI.')
  }

  const handleCancelApproval = () => {
    showSuccess('Arahan Artikel', 'Persetujuan arahan artikel telah dibatalkan.')
  }

  const handleRegenerateWithAI = () => {
    showSuccess('AI Assistant', 'AI sedang menyusun ulang arahan artikel...')
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
          <p><strong>Sasaran Pembaca:</strong> Masyarakat yang mengurus dokumen kependudukan</p>
        </div>
        <div class="meta-box">
          <p><strong>Pertanyaan Utama:</strong></p>
          <ul>
            <li>Berapa modal awal paling sedikit untuk mulai reksadana di Indonesia?</li>
            <li>Apakah investasi reksadana dijamin LPS seperti halnya tabungan deposito?</li>
            <li>Berapa hari kerja proses pencairan saldo reksadana ke rekening bank?</li>
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
    const md = `# ${briefTitle}\n\n**Sasaran Pembaca:**\nMasyarakat yang mengurus dokumen kependudukan\n\n**Pertanyaan Utama:**\n- Berapa modal awal paling sedikit untuk mulai reksadana di Indonesia?\n- Apakah investasi reksadana dijamin LPS seperti halnya tabungan deposito?\n- Berapa hari kerja proses pencairan saldo reksadana ke rekening bank?\n\n**Sudut Pandang Jurnalistik (Angle):**\n${angle}\n\n## Struktur Kerangka Naskah:\n${headings
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
            <strong>Sasaran Pembaca:</strong> Masyarakat yang mengurus dokumen kependudukan
          </div>
          <div class="box">
            <strong>Pertanyaan Utama:</strong>
            <ul>
              <li>Berapa modal awal paling sedikit untuk mulai reksadana di Indonesia?</li>
              <li>Apakah investasi reksadana dijamin LPS seperti halnya tabungan deposito?</li>
              <li>Berapa hari kerja proses pencairan saldo reksadana ke rekening bank?</li>
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

  // Filtered rows for table view
  const filteredBriefs = briefList.filter((row) => {
    const matchSearch =
      row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.mainKeyword.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus =
      statusFilter === 'Semua' ? true : row.status === statusFilter
    return matchSearch && matchStatus
  })

  // =========================================================================
  // 1. TABLE VIEW: 50 DAFTAR ARAHAN ARTIKEL (Matching Image 9)
  // =========================================================================
  if (viewMode === 'table') {
    return (
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-400">
          <span>Riset & Produksi Berita</span>
          <span className="mx-1.5 text-slate-300">/</span>
          <span className="text-[#1866EF] font-semibold">Tinjauan Brief</span>
        </div>

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
          {/* Search & Filter Header Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-[320px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul artikel ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full sm:w-auto px-3.5 py-2 pr-8 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-700 bg-white cursor-pointer appearance-none"
              >
                <option value="Semua">Status</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Draf">Draf</option>
                <option value="Ditolak">Ditolak</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold w-[32%]">Judul Artikel</th>
                    <th className="py-3 px-4 font-semibold w-[22%]">Kata Kunci Utama</th>
                    <th className="py-3 px-4 font-semibold w-[24%]">Kata Kunci Pendukung</th>
                    <th className="py-3 px-4 font-semibold w-[12%]">Status</th>
                    <th className="py-3 px-4 font-semibold text-center w-[10%]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredBriefs.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setActiveItemTitle(item.title)
                        setViewMode('detail')
                      }}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#1866EF] transition-colors leading-relaxed">
                        {item.title}
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
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold border ${
                            item.status === 'Disetujui'
                              ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                              : item.status === 'Draf'
                              ? 'bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveItemTitle(item.title)
                            setViewMode('detail')
                          }}
                          className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Sunting Arahan Artikel"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredBriefs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        Tidak ada arahan artikel yang cocok dengan pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================================
  // 2. DETAIL VIEW: EDIT ARAHAN ARTIKEL (Matching Image 11)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-xs text-slate-400">
        <span>Riset & Produksi Berita</span>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#1866EF] font-semibold">Tinjauan Brief</span>
      </div>

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
            <button
              type="button"
              onClick={handleCancelApproval}
              className="h-10 px-4 bg-[#EF4444] hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Batalkan Persetujuan
            </button>
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
          {/* Card 1: Judul Usulan Artikel (H2/H3) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Judul Usulan Artikel (H2/H3)
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
            <div className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium">
              Masyarakat yang mengurus dokumen kependudukan
            </div>
          </div>

          {/* Card 3: Pertanyaan Utama (Sebelumnya: Pertanyaan Pembaca Terjawab, dipindahkan ke bawah Sasaran Pembaca) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <label className="text-xs font-bold text-slate-900 block">
              Pertanyaan Utama
            </label>
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Berapa modal awal paling sedikit untuk mulai reksadana di Indonesia?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Apakah investasi reksadana dijamin LPS seperti halnya tabungan deposito?</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Berapa hari kerja proses pencairan saldo reksadana ke rekening bank?</span>
              </div>
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

          {/* Card 5: Kerangka Naskah (Heading H2 & H3) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 block">
                Kerangka Naskah (Heading H2 & H3)
              </label>
              <button
                type="button"
                onClick={handleAddHeading}
                className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Heading</span>
              </button>
            </div>

            <div className="space-y-2">
              {headings.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className="flex items-center gap-2 p-2 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-lg transition-colors group"
                >
                  {/* Drag Handle */}
                  <div className="cursor-grab text-slate-400 hover:text-slate-600 px-1">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Level Pill */}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.level === 'H2'
                        ? 'bg-blue-100 text-[#1866EF]'
                        : 'bg-slate-200 text-slate-700'
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
                        <button
                          type="button"
                          onClick={() => handleLevelChange(item.id, 'H2')}
                          className="w-full text-left px-3 py-1 text-xs hover:bg-slate-50 font-medium"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLevelChange(item.id, 'H3')}
                          className="w-full text-left px-3 py-1 text-xs hover:bg-slate-50 font-medium"
                        >
                          H3
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteHeading(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Data & Entitas Wajib Dikutip (Entity Anchors) */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <label className="text-xs font-bold text-slate-900 block">
              Data & Entitas Wajib Dikutip (Entity Anchors)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'OJK (Otoritas Jasa Keuangan)',
                'Inflasi Tahunan BI',
                'Bursa Efek Indonesia (BEI)',
                'UU P2SK No. 4/2023',
              ].map((ent, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium"
                >
                  {ent}
                </span>
              ))}
            </div>
          </div>


          {/* Card 6: Rekomendasi Tautan Internal Portal RRI */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <label className="text-xs font-bold text-slate-900 block">
              Rekomendasi Tautan Internal Portal RRI
            </label>
            <div className="flex flex-wrap gap-2">
              <a
                href="#internal-link"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                <span>Mengenal Perbedaan Saham dan ORI025 (rri.co.id/bisnis/512)</span>
                <ExternalLink className="w-3 h-3 text-[#1D4ED8]" />
              </a>
              <a
                href="#internal-link"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                <span>Tips Alokasi Gaji 50/30/20 (rri.co.id/lifestyle/481)</span>
                <ExternalLink className="w-3 h-3 text-[#1D4ED8]" />
              </a>
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
                      onClick={handleExportMD}
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

            {/* Tolak Button */}
            <button
              type="button"
              onClick={() => setIsTolakBriefOpen(true)}
              className="w-full h-10 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Tolak Brief
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
              Brief yang disetujui akan otomatis masuk antrean produksi Draf AI Claude 3.5 Sonnet
            </p>
          </div>

          {/* Card 2: Riwayat Versi Brief */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Riwayat Versi Brief</h3>

            {/* Versi 2 (Selected) */}
            <div
              onClick={() => setSelectedVersion('v2')}
              className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                selectedVersion === 'v2'
                  ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedVersion === 'v2'
                        ? 'border-[#10B981] bg-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedVersion === 'v2' && (
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    Versi 2 (Saat Ini)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#15803D] text-[10px] font-bold">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-slate-800 font-medium mt-1.5 ml-6">
                Perubahan: Menambahkan H3 verifikasi izin OJK.
              </p>
              <p className="text-[11px] text-slate-500 mt-1 ml-6">
                Disunting oleh Editor Cameron • Hari ini, 14:15 WIB
              </p>
            </div>

            {/* Versi 1 */}
            <div
              onClick={() => setSelectedVersion('v1')}
              className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                selectedVersion === 'v1'
                  ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedVersion === 'v1'
                      ? 'border-[#10B981] bg-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedVersion === 'v1' && (
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-900">
                  Versi 1
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 ml-6">
                Dihasilkan Claude 3.5 Sonnet • Hari ini, 14:10 WIB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
