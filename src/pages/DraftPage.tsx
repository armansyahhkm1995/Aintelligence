import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Search,
  ArrowLeft,
  FileEdit,
  Copy,
  Trash2,
  ExternalLink,
  Download,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

interface DraftTableRow {
  id: string
  title: string
  seoScore: number
  version: string
  wordCount: string
  status: 'Siap Review' | 'Telah Terbit' | 'Ditolak'
}

const INITIAL_DRAFT_TABLE: DraftTableRow[] = [
  {
    id: 'DFT-001',
    title: 'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z',
    seoScore: 94,
    version: 'Versi 2',
    wordCount: '920 kata',
    status: 'Siap Review',
  },
  {
    id: 'DFT-002',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    seoScore: 94,
    version: 'Versi 2',
    wordCount: '850 kata',
    status: 'Siap Review',
  },
  {
    id: 'DFT-003',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    seoScore: 88,
    version: 'Versi 1',
    wordCount: '1.100 kata',
    status: 'Siap Review',
  },
  {
    id: 'DFT-004',
    title: 'Panduan Lengkap Memilih Reksadana Pasar Uang',
    seoScore: 91,
    version: 'Versi 3',
    wordCount: '980 kata',
    status: 'Telah Terbit',
  },
  {
    id: 'DFT-005',
    title: 'Langkah Praktis Cek APERD Berizin OJK',
    seoScore: 86,
    version: 'Versi 1',
    wordCount: '740 kata',
    status: 'Siap Review',
  },
]

export const DraftPage: React.FC = () => {
  const {
    draft,
    updateDraft,
    publishDraftToEditools,
    setIsHapusDraftOpen,
  } = useApp()
  const { showSuccess } = useToast()

  // View Mode: 'table' (Daftar Draf Artikel) vs 'detail' (Editor Naskah & SEO Split-View)
  const [viewMode, setViewMode] = useState<'table' | 'detail'>('table')

  // Table filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [draftList, setDraftList] = useState<DraftTableRow[]>(INITIAL_DRAFT_TABLE)
  const [activeDraftItem, setActiveDraftItem] = useState<DraftTableRow>(INITIAL_DRAFT_TABLE[0])

  // Detail view states
  const [content, setContent] = useState(draft?.content || '')
  const [aiRewritePrompt, setAiRewritePrompt] = useState(
    'Ubah gaya bahasa agar lebih santai dan tambahkan H2 tentang risiko psikologis FOMO...'
  )

  // Interactive WYSIWYG Toolbar states
  const [selectedHeading, setSelectedHeading] = useState('Heading 1')
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false)
  const [isBold, setIsBold] = useState(true)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [activeAlign, setActiveAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left')

  const handleCopyDraft = () => {
    const textToCopy = `${activeDraftItem.title}\n\n${content}`
    navigator.clipboard.writeText(textToCopy)
    showSuccess('Penyuntingan Draf', 'Naskah draf berhasil disalin ke clipboard.')
  }

  const handleExportMd = () => {
    const md = `# ${activeDraftItem.title}\n\n${content}`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draft-${activeDraftItem.title.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    showSuccess('Penyuntingan Draf', 'Draf berhasil diekspor ke file Markdown (.md)')
  }

  // Filtered rows for table view
  const filteredDrafts = draftList.filter((row) =>
    row.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Milestone Progress bar component
  const renderMilestone = () => (
    <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2 overflow-x-auto text-xs">
        {[
          { num: '1', title: 'Impor CSV Semrush', active: false, done: true },
          { num: '2', title: 'Kata Kunci', active: false, done: true },
          { num: '3', title: 'Kelompok Kata Kunci', active: false, done: true },
          { num: '4', title: 'Arahan Artikel', active: false, done: true },
          { num: '5', title: 'Draf Artikel', active: true, done: false },
        ].map((st, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
                st.active
                  ? 'bg-[#1866EF] text-white shadow-xs'
                  : st.done
                  ? 'bg-blue-50 text-[#1866EF] border border-[#BFDBFE]'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {st.num}
            </span>
            <span
              className={`font-semibold ${
                st.active
                  ? 'text-[#1866EF]'
                  : st.done
                  ? 'text-slate-800'
                  : 'text-slate-400'
              }`}
            >
              {st.title}
            </span>
            {i < 4 && <span className="text-slate-300 ml-2">→</span>}
          </div>
        ))}
      </div>
    </div>
  )

  // 1. TABLE VIEW: DAFTAR DRAF ARTIKEL (Figma 1221:37651)
  if (viewMode === 'table') {
    return (
      <div className="space-y-6">
        {/* Milestone Indicator */}
        {renderMilestone()}

        {/* Title and description */}
        <div className="max-w-[500px]">
          <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
            Daftar Draf Artikel
          </h1>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Kelola naskah artikel berita hasil kecerdasan buatan sebelum diverifikasi dan diterbitkan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-3.5 shadow-xs flex items-center justify-between gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul artikel ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-[6px] focus:outline-none focus:border-[#1866EF] text-slate-800"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-[420px]">Judul Artikel</th>
                  <th className="py-3.5 px-4 w-[220px]">Skor SEO</th>
                  <th className="py-3.5 px-4 w-[160px]">Versi Draft</th>
                  <th className="py-3.5 px-4 text-right w-[180px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDrafts.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => {
                      setActiveDraftItem(item)
                      setViewMode('detail')
                    }}
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#1866EF] transition-colors leading-relaxed">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Skor SEO: {item.seoScore}/100</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                        {item.version}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setActiveDraftItem(item)
                            setViewMode('detail')
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-[#DBEAFE] hover:bg-blue-50 text-[#1866EF] rounded-[4px] transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                          <span>Buka Editor</span>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.title)
                            showSuccess('Draf Artikel', 'Judul draf disalin.')
                          }}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                          title="Salin"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setIsHapusDraftOpen(true)}
                          className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDrafts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      Tidak ada draf artikel yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // 2. DETAIL VIEW: WYSIWYG MARKDOWN EDITOR & SEO PANEL (Figma 1221:37298)
  return (
    <div className="space-y-6">
      {/* Back button to Table view */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setViewMode('table')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer bg-white border border-[#DBEAFE] px-3 py-1.5 rounded-[6px] shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Kembali ke Daftar Draf Artikel</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Mode Split-View Editor & Verifikasi SEO
        </span>
      </div>

      {/* Milestone Indicator */}
      {renderMilestone()}

      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Penyuntingan Draf Artikel
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Verifikasi data faktual, sunting naskah AI, tinjau paket metadata SEO, dan teruskan ke Editools atau CMS RRI.
        </p>
      </div>

      {/* 2-Column Split matching user screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Rich Text Toolbar */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-2 flex items-center gap-1.5 shadow-xs overflow-x-auto max-w-full">
            {/* Heading Selector */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsHeadingDropdownOpen(!isHeadingDropdownOpen)}
                className="h-[32px] px-3 bg-white border border-[#DBEAFE] rounded text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedHeading}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isHeadingDropdownOpen && (
                <div className="absolute left-0 top-[36px] w-[140px] bg-white border border-[#DBEAFE] rounded-[6px] shadow-lg py-1 z-30">
                  {['Heading 1', 'Heading 2', 'Heading 3', 'Paragraf Normal'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setSelectedHeading(lvl)
                        setIsHeadingDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-blue-50 cursor-pointer ${
                        selectedHeading === lvl
                          ? 'text-[#1866EF] font-bold bg-blue-50/50'
                          : 'text-slate-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-slate-200 mx-1 shrink-0" />

            {/* Formatting B, I, U Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsBold(!isBold)}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                  isBold
                    ? 'bg-[#1866EF] text-white shadow-2xs'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Tebal (Bold)"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => setIsItalic(!isItalic)}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center italic font-semibold text-xs transition-colors cursor-pointer ${
                  isItalic
                    ? 'bg-[#1866EF] text-white shadow-2xs'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Miring (Italic)"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => setIsUnderline(!isUnderline)}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center underline font-semibold text-xs transition-colors cursor-pointer ${
                  isUnderline
                    ? 'bg-[#1866EF] text-white shadow-2xs'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Garis Bawah (Underline)"
              >
                U
              </button>
            </div>

            <div className="h-5 w-px bg-slate-200 mx-1 shrink-0" />

            {/* Text Alignment Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setActiveAlign('left')}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center transition-colors cursor-pointer ${
                  activeAlign === 'left'
                    ? 'bg-[#1866EF] text-white'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Rata Kiri"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveAlign('center')}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center transition-colors cursor-pointer ${
                  activeAlign === 'center'
                    ? 'bg-[#1866EF] text-white'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Rata Tengah"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveAlign('right')}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center transition-colors cursor-pointer ${
                  activeAlign === 'right'
                    ? 'bg-[#1866EF] text-white'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Rata Kanan"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveAlign('justify')}
                className={`w-[32px] h-[32px] rounded flex items-center justify-center transition-colors cursor-pointer ${
                  activeAlign === 'justify'
                    ? 'bg-[#1866EF] text-white'
                    : 'bg-white border border-[#DBEAFE] text-slate-700 hover:bg-slate-50'
                }`}
                title="Rata Kiri-Kanan"
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Markdown Content Area */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3">
            <input
              type="text"
              value={activeDraftItem.title}
              onChange={(e) => {
                setActiveDraftItem({ ...activeDraftItem, title: e.target.value })
              }}
              className="w-full text-base font-bold text-slate-900 border-b border-slate-200 pb-2 focus:outline-none focus:border-[#1866EF]"
            />
            <textarea
              rows={16}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                updateDraft(e.target.value)
              }}
              className="w-full text-xs text-slate-800 bg-white focus:outline-none resize-none leading-relaxed font-sans"
              placeholder="Tulis atau sunting naskah draf berita di sini..."
            />
          </div>

          {/* AI Re-write Assist box */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1866EF]">
              <Sparkles className="w-4 h-4 text-[#1866EF]" />
              <span>Instruksi Revisi Otomatis dengan AI</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiRewritePrompt}
                onChange={(e) => setAiRewritePrompt(e.target.value)}
                className="flex-1 text-xs border border-slate-200 rounded-[6px] px-3 py-2 text-slate-800 focus:outline-none focus:border-[#1866EF]"
                placeholder="Tulis instruksi revisi..."
              />
              <button
                onClick={() => showSuccess('Revisi AI', 'Naskah draf sedang disunting ulang oleh AI.')}
                className="px-3.5 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors cursor-pointer shrink-0"
              >
                Jalankan Revisi AI
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Paket Metadata SEO */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-slate-900">Paket Metadata SEO</h3>
              <span className="px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] font-bold text-[11px]">
                Skor SEO: {activeDraftItem.seoScore}/100
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[#64748B] block font-medium">Meta Title (Judul Search Engine):</span>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[6px] text-slate-800 font-semibold leading-relaxed">
                Panduan Aman Investasi Reksadana Gen-Z: Tips OJK
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[#64748B] block font-medium">Meta Description:</span>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-[6px] text-slate-700 leading-relaxed text-[11px]">
                Pelajari cara aman investasi reksadana untuk pemula dengan modal Rp10.000. Tips memilih manajer investasi legal berizin OJK terbaru.
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[#64748B] block font-medium">Slug URL (Permanen):</span>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-[6px] text-[#1866EF] font-mono text-[11px] truncate">
                https://rri.co.id/ekonomi/panduan-investasi-reksadana-pemula
              </div>
            </div>
          </div>

          {/* Card 2: Uji Plagiarisme & Buku Gaya Editools */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-1">
              Uji Plagiarisme & Buku Gaya Editools
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded bg-emerald-50/50 border border-emerald-200">
                <span className="text-slate-700">Kesesuaian EYD & Buku Gaya:</span>
                <span className="font-bold text-emerald-700">98% Sesuai</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-emerald-50/50 border border-emerald-200">
                <span className="text-slate-700">Tingkat Kemiripan (Plagiarisme):</span>
                <span className="font-bold text-emerald-700">2.1% (Sangat Aman)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Aksi & Distribusi */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyDraft}
                className="h-[36px] border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Naskah</span>
              </button>
              <button
                onClick={handleExportMd}
                className="h-[36px] border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor .MD</span>
              </button>
            </div>

            <button
              onClick={publishDraftToEditools}
              className="w-full h-[40px] bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Teruskan ke Editools</span>
            </button>

            <button
              onClick={() => setIsHapusDraftOpen(true)}
              className="w-full h-[36px] bg-[#FEF2F2] border border-[#FECACA] hover:bg-rose-100 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Draf Artikel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
