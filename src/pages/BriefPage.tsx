import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  GripVertical,
  Trash2,
  Plus,
  X,
  ExternalLink,
  ChevronDown,
  Search,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

interface BriefTableRow {
  id: string
  title: string
  mainKeyword: string
  supportingKeywords: string[]
  status: 'Disetujui' | 'Menunggu' | 'Ditolak'
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
    title: 'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z',
    mainKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    status: 'Menunggu',
  },
  {
    id: 'BRF-003',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    mainKeyword: 'reksadana saham tips',
    supportingKeywords: ['risiko reksadana saham', 'top reksadana', 'investasi saham'],
    status: 'Disetujui',
  },
  {
    id: 'BRF-004',
    title: 'Langkah Praktis Cek APERD Berizin OJK',
    mainKeyword: 'cek izin aperd ojk',
    supportingKeywords: ['reksadana legal', 'portal sipena', 'daftar aperd'],
    status: 'Ditolak',
  },
  {
    id: 'BRF-005',
    title: 'Perbedaan Reksadana Pasar Uang dan Reksadana Pendapatan Tetap',
    mainKeyword: 'reksadana pasar uang vs pendapatan tetap',
    supportingKeywords: ['dana darurat likuid', 'bunga deposito', 'obligasi ritel'],
    status: 'Menunggu',
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

  // View Mode: 'table' (Daftar Arahan Artikel) vs 'detail' (Detail Brief Berita)
  const [viewMode, setViewMode] = useState<'table' | 'detail'>('table')

  // Table filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Disetujui' | 'Menunggu' | 'Ditolak'>('Semua')
  const [briefList, setBriefList] = useState<BriefTableRow[]>(INITIAL_BRIEF_TABLE)

  // Detail view states
  const [briefTitle, setBriefTitle] = useState(
    brief?.title || 'Panduan Aman Memulai Investasi Reksadana untuk Gen-Z'
  )
  const [angle, setAngle] = useState(
    brief?.angle ||
      'Fokus pada keamanan modal, regulasi perlindungan konsumen OJK, dan kemudahan pencairan untuk pemula berpenghasilan pertama.'
  )
  const [aiNotes, setAiNotes] = useState(
    brief?.aiNotes ||
      'Ubah gaya bahasa agar lebih santai dan tambahkan H2 tentang risiko psikologis FOMO...'
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

  // Cluster Asal state with autocomplete
  const [clustersList, setClustersList] = useState<string[]>([
    'Cluster #12 (Reksadana)',
  ])
  const [isAddingCluster, setIsAddingCluster] = useState(false)
  const [clusterInput, setClusterInput] = useState('')

  const allClusterSuggestions = [
    'Cluster #08 (Pasar Uang)',
    'Cluster #15 (Investasi Saham)',
    'Cluster #22 (Dana Pensiun)',
    'Cluster #04 (Obligasi Negara)',
    'Cluster #09 (IHSG Harian)',
    'Cluster #18 (Kripto & Aset Digital)',
    'Cluster #25 (Fintech & P2P)',
  ]

  const filteredClusterSuggestions = allClusterSuggestions.filter(
    (c) =>
      !clustersList.includes(c) &&
      c.toLowerCase().includes(clusterInput.toLowerCase())
  )

  const handleAddCluster = (clusterName: string) => {
    if (clusterName && !clustersList.includes(clusterName)) {
      setClustersList((prev) => [...prev, clusterName])
      showSuccess('Cluster Topik', `Berhasil menambahkan ${clusterName} ke brief.`)
    }
    setClusterInput('')
    setIsAddingCluster(false)
  }

  const handleRemoveCluster = (clusterName: string) => {
    setClustersList((prev) => prev.filter((c) => c !== clusterName))
  }

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

  const handleCopyBrief = () => {
    const textToCopy = `${briefTitle}\n\nAngle:\n${angle}\n\nOutline:\n${headings
      .map((h) => `${h.level} - ${h.text}`)
      .join('\n')}`
    navigator.clipboard.writeText(textToCopy)
    showSuccess('Arahan Artikel', 'Konten brief berhasil disalin ke clipboard.')
  }

  const handleExportMd = () => {
    const md = `# ${briefTitle}\n\n**Angle Liputan:**\n${angle}\n\n## Struktur Outline:\n${headings
      .map((h) => `${h.level === 'H2' ? '##' : '###'} ${h.text}`)
      .join('\n')}\n\n## Catatan AI:\n${aiNotes}`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `brief-${briefTitle.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    showSuccess('Arahan Artikel', 'Brief berhasil diekspor ke format Markdown (.md)')
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

  // Milestone Progress bar component
  const renderMilestone = () => (
    <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2 overflow-x-auto text-xs">
        {[
          { num: '1', title: 'Impor CSV Semrush', active: false, done: true },
          { num: '2', title: 'Kata Kunci', active: false, done: true },
          { num: '3', title: 'Kelompok Kata Kunci', active: false, done: true },
          { num: '4', title: 'Arahan Artikel', active: true, done: false },
          { num: '5', title: 'Draf Artikel', active: false, done: false },
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

  // 1. TABLE VIEW: DAFTAR ARAHAN ARTIKEL (Figma 1221:36876)
  if (viewMode === 'table') {
    return (
      <div className="space-y-6">
        {/* Milestone Indicator */}
        {renderMilestone()}

        {/* Title and description */}
        <div className="max-w-[500px]">
          <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
            Tinjauan Arahan Artikel
          </h1>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Tinjau dan kelola arahan artikel sebelum dialirkan ke penulisan draf otomatis oleh AI.
          </p>
        </div>

        {/* StatCard & CTA */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Arahan Artikel</span>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              24 <span className="text-xs font-normal text-slate-500">Arahan</span>
            </div>
            <p className="text-xs text-slate-400">
              Semua arahan siap diproses ke antrean penulisan draf AI.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('draft')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <span>Lanjut ke Draft Artikel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-3.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-[380px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul artikel ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-[6px] focus:outline-none focus:border-[#1866EF] text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium shrink-0">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-[6px] focus:outline-none focus:border-[#1866EF] text-slate-800 bg-white cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Menunggu">Menunggu Persetujuan</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 w-[280px]">Judul Artikel</th>
                  <th className="py-3.5 px-4 w-[200px]">Kata Kunci Utama</th>
                  <th className="py-3.5 px-4">Kata Kunci Pendukung</th>
                  <th className="py-3.5 px-4 w-[120px]">Status</th>
                  <th className="py-3.5 px-4 text-right w-[140px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBriefs.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => {
                      setBriefTitle(item.title)
                      setViewMode('detail')
                    }}
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#1866EF] transition-colors leading-relaxed">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px]">
                        {item.mainKeyword}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {item.supportingKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          item.status === 'Disetujui'
                            ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                            : item.status === 'Menunggu'
                            ? 'bg-[#FFFBEB] text-[#B45309] border-amber-200'
                            : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setBriefTitle(item.title)
                            setViewMode('detail')
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-[#DBEAFE] hover:bg-blue-50 text-[#1866EF] rounded-[4px] transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          onClick={() => {
                            setBriefList((prev) =>
                              prev.map((b) => (b.id === item.id ? { ...b, status: 'Disetujui' } : b))
                            )
                            showSuccess('Arahan Artikel', `Brief '${item.title}' disetujui.`)
                          }}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                          title="Setujui"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsTolakBriefOpen(true)}
                          className="p-1 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Tolak"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBriefs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      Tidak ada arahan artikel yang sesuai dengan filter pencarian.
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

  // 2. DETAIL VIEW: EDITORIAL BRIEF DETAIL (Figma 1221:36584)
  return (
    <div className="space-y-6">
      {/* Back button to Table view */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setViewMode('table')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer bg-white border border-[#DBEAFE] px-3 py-1.5 rounded-[6px] shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Kembali ke Daftar Arahan Artikel</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Mode Detail Editorial Brief
        </span>
      </div>

      {/* Milestone Indicator */}
      {renderMilestone()}

      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Detail Arahan Artikel
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Tinjau sudut pandang editorial, sesuaikan struktur outline H2/H3, dan tambahkan kata kunci pendukung sebelum draf ditulis AI.
        </p>
      </div>

      {/* 2-Column Split matching user screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card: Judul Rencana Artikel & Angle Liputan */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
            {/* Input: Judul Rencana Artikel */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block">
                Judul Rencana Artikel
              </label>
              <input
                type="text"
                value={briefTitle}
                onChange={(e) => setBriefTitle(e.target.value)}
                className="w-full text-xs font-medium text-slate-900 bg-white border border-[#DBEAFE] rounded-[6px] px-3.5 py-2.5 focus:outline-none focus:border-[#1866EF] transition-colors"
              />
            </div>

            {/* Textarea: Angle Liputan & Fokus Pembaca */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 block">
                Angle Liputan & Fokus Pembaca
              </label>
              <textarea
                rows={3}
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full text-xs font-normal text-slate-800 bg-white border border-[#DBEAFE] rounded-[6px] p-3 focus:outline-none focus:border-[#1866EF] transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Card: Struktur Outline Artikel (Heading Tree) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Struktur Outline Artikel
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tarik baris untuk mengatur urutan. Klik label H2/H3 untuk mengganti level.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddHeading}
                className="inline-flex items-center gap-1.5 text-xs text-[#1866EF] hover:underline font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Subtopik</span>
              </button>
            </div>

            {/* List of headings with Drag-and-Drop */}
            <div className="space-y-2">
              {headings.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-2 p-2 rounded-[6px] border transition-colors bg-white ${
                    draggedIdx === idx
                      ? 'border-[#1866EF] bg-blue-50/40 opacity-70'
                      : 'border-slate-200 hover:border-[#BFDBFE]'
                  } ${item.level === 'H3' ? 'ml-6' : ''}`}
                >
                  {/* Grip Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 px-1">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Level Pill Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenLevelId(openLevelId === item.id ? null : item.id)
                      }
                      className="px-2 py-1 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-bold text-[11px] flex items-center gap-1 hover:bg-blue-100 transition-colors"
                    >
                      <span>{item.level}</span>
                      <ChevronDown className="w-3 h-3 text-[#1D4ED8]" />
                    </button>

                    {openLevelId === item.id && (
                      <div className="absolute left-0 top-[28px] w-20 bg-white border border-slate-200 rounded-[6px] shadow-lg py-1 z-30">
                        {['H2', 'H3'].map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleLevelChange(item.id, lvl)}
                            className="w-full text-left px-3 py-1 text-xs hover:bg-blue-50 text-slate-700 font-semibold"
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Heading Text Input */}
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    className="flex-1 text-xs text-slate-800 bg-transparent border-0 focus:outline-none focus:ring-0 p-0 font-medium"
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteHeading(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Hapus subtopik"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Catatan Tambahan untuk AI */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Catatan Tambahan untuk AI
            </label>
            <textarea
              rows={3}
              value={aiNotes}
              onChange={(e) => setAiNotes(e.target.value)}
              className="w-full text-xs text-slate-800 bg-white border border-[#DBEAFE] rounded-[6px] p-3 focus:outline-none focus:border-[#1866EF] transition-colors resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Parameter & Target Artikel */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-1">
              Parameter & Target Artikel
            </h3>

            {/* Target Panjang Kata */}
            <div className="space-y-1">
              <span className="text-[#64748B]">Target Panjang Kata:</span>
              <div className="font-semibold text-slate-900">
                800 - 1.000 kata (Standar Liputan Mendalam)
              </div>
            </div>

            {/* Cluster Asal & Tambah Cluster */}
            <div className="space-y-2">
              <span className="text-[#64748B] block">Cluster Asal:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {clustersList.map((cl, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-medium text-[11px]"
                  >
                    <span>{cl}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCluster(cl)}
                      className="hover:text-rose-600 transition-colors"
                      title="Hapus cluster"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {!isAddingCluster ? (
                  <button
                    type="button"
                    onClick={() => setIsAddingCluster(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-[#1866EF] text-[#1866EF] hover:bg-blue-50 font-semibold text-[11px] transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah Cluster</span>
                  </button>
                ) : (
                  <div className="relative flex items-center gap-1 w-full mt-1">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Cari cluster..."
                      value={clusterInput}
                      onChange={(e) => setClusterInput(e.target.value)}
                      className="text-xs px-2.5 py-1 border border-[#1866EF] rounded-md focus:outline-none text-slate-800 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setIsAddingCluster(false)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {filteredClusterSuggestions.length > 0 && (
                      <div className="absolute left-0 top-[30px] w-full bg-white border border-slate-200 rounded-md shadow-lg py-1 z-30 max-h-36 overflow-y-auto">
                        {filteredClusterSuggestions.map((sug, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleAddCluster(sug)}
                            className="px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#1866EF] cursor-pointer"
                          >
                            {sug}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Keyword Utama & Pendukung */}
            <div className="space-y-3 pt-1 border-t border-slate-100">
              <div>
                <span className="text-[#64748B] block mb-1">Kata Kunci Utama:</span>
                <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-medium text-[11px]">
                  cara investasi reksadana (Vol 22.000) (KD 28%)
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block mb-1">Kata Kunci Pendukung:</span>
                <div className="flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#334155] text-[11px]">
                    reksadana pemula (Vol 22.000) (KD 28%)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#334155] text-[11px]">
                    modal kecil (Vol 22.000) (KD 28%)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#334155] text-[11px]">
                    keuntungan reksadana (Vol 22.000) (KD 28%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Riwayat Versi Brief */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-slate-900">Riwayat Versi Brief</h3>
              <button
                type="button"
                className="text-xs text-[#1866EF] hover:underline font-semibold"
              >
                Tambah Versi
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-[6px] bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                    <span className="font-bold text-[#15803D]">Versi 2 (Saat Ini)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                    Aktif
                  </span>
                </div>
                <p className="text-[11px] text-slate-800 pt-0.5">
                  Perubahan: Menambahkan H3 verifikasi izin OJK.
                </p>
                <div className="text-[11px] text-slate-400">
                  Disunting oleh Editor Cameron • Hari ini, 14:15 WIB
                </div>
              </div>

              <div className="p-3 rounded-[6px] bg-white border border-slate-200 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                  <span className="font-bold text-slate-700">Versi 1</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Dihasilkan Claude 3.5 Sonnet · Hari ini, 14:10 WIB
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Keputusan Redaksi */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-1">
              Keputusan Redaksi
            </h3>

            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExportMd}
                  className="h-[36px] border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
                >
                  Ekspor Brief ke MD
                </button>
                <button
                  onClick={handleCopyBrief}
                  className="h-[36px] border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
                >
                  Salin Brief
                </button>
              </div>

              <button
                onClick={approveBrief}
                className="w-full h-[40px] bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
              >
                Setujui Brief Artikel
              </button>

              <button
                onClick={() => setIsTolakBriefOpen(true)}
                className="w-full h-[40px] bg-[#FEF2F2] border border-[#FECACA] hover:bg-rose-100 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors"
              >
                Tolak Brief
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
              Brief yang disetujui akan otomatis masuk antrean produksi Draf AI Claude 3.5 Sonnet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
