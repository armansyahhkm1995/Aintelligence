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
} from 'lucide-react'

export const BriefPage: React.FC = () => {
  const {
    brief,
    updateBrief,
    approveBrief,
    setIsTolakBriefOpen,
  } = useApp()
  const { showSuccess } = useToast()

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

  const handleRemoveHeading = (id: string) => {
    setHeadings((prev) => prev.filter((h) => h.id !== id))
  }

  const handleAddHeading = () => {
    const newId = `bh-${Date.now()}`
    setHeadings((prev) => [
      ...prev,
      { id: newId, level: 'H2', text: 'Subtopik Baru Pembahasan' },
    ])
    setOpenLevelId(newId)
  }

  const handleSelectLevel = (id: string, lvl: string) => {
    setHeadings((prev) =>
      prev.map((h) => (h.id === id ? { ...h, level: lvl } : h))
    )
    setOpenLevelId(null)
  }

  const entityAnchors = [
    'OJK (Otoritas Jasa Keuangan)',
    'Inflasi Tahunan BI',
    'Bursa Efek Indonesia (BEI)',
    'UU P2SK No. 4/2023',
  ]

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(JSON.stringify(brief || {}, null, 2))
    showSuccess('Tinjauan Brief', 'Brief berhasil disalin ke clipboard.')
  }

  const handleExportMd = () => {
    const headingsText = headings.map((h) => `${h.level === 'H2' ? '##' : '###'} ${h.text}`).join('\n')
    const mdContent = `# ${briefTitle}\n\n**Sudut Pandang:** ${angle}\n\n## Struktur Heading\n${headingsText}`
    const blob = new Blob([mdContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `brief-${brief?.id || 'rri'}.md`
    a.click()
    showSuccess('Tinjauan Brief', 'Brief berhasil diekspor ke file Markdown (.md)')
  }

  return (
    <div className="space-y-6">
      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Tinjauan Brief Artikel
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Tinjau sudut pandang liputan, struktur heading H2/H3, entitas wajib, dan setujui brief sebelum diteruskan ke penulisan draf AI.
        </p>
      </div>

      {/* Frame 427318766: 2-Column Split matching user screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (lg:col-span-7 or 8) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card 1: Judul Usulan Artikel (H2/H3) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2">
            <label className="text-xs font-semibold text-slate-900 block">
              Judul Usulan Artikel (H2/H3)
            </label>
            <input
              type="text"
              value={briefTitle}
              onChange={(e) => setBriefTitle(e.target.value)}
              className="w-full h-[40px] px-3.5 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Card 2: Sudut Pandang Jurnalistik (Angle) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2">
            <label className="text-xs font-semibold text-slate-900 block">
              Sudut Pandang Jurnalistik (Angle)
            </label>
            <textarea
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              rows={3}
              className="w-full p-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Card 3: Kerangka Naskah (Heading H2 & H3) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-xs font-semibold text-slate-900">
                Kerangka Naskah (Heading H2 & H3)
              </h2>
              <button
                type="button"
                onClick={handleAddHeading}
                className="h-[32px] px-3 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
              >
                Tambah Heading
              </button>
            </div>

            <div className="space-y-2">
              {headings.map((h, i) => {
                const isH2 = h.level === 'H2'
                const isH1 = h.level === 'H1'
                return (
                  <div
                    key={h.id}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-2 p-2 rounded-[6px] border border-[#DBEAFE] bg-white text-xs transition-shadow ${
                      draggedIdx === i ? 'opacity-50 border-blue-400 shadow-md' : ''
                    }`}
                  >
                    <div className="cursor-grab p-1 text-slate-300 hover:text-slate-500">
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenLevelId(openLevelId === h.id ? null : h.id)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 hover:ring-1 hover:ring-blue-400 transition-all ${
                        isH1
                          ? 'bg-[#1866EF] text-white'
                          : isH2
                          ? 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {h.level}
                    </button>

                    <span className="flex-1 font-medium text-slate-800 leading-snug">
                      {h.text}
                    </span>

                    {/* Level Selector Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenLevelId(openLevelId === h.id ? null : h.id)}
                        className="h-[28px] px-2.5 bg-white border border-[#DBEAFE] rounded text-xs font-medium text-slate-700 flex items-center gap-1 hover:bg-slate-50 shrink-0"
                      >
                        <span>{h.level}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      {openLevelId === h.id && (
                        <div className="absolute right-0 top-full mt-1 w-20 bg-white border border-[#DBEAFE] rounded-[6px] shadow-lg z-20 py-1">
                          {['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleSelectLevel(h.id, lvl)}
                              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition-colors ${
                                h.level === lvl ? 'text-[#1866EF] font-bold bg-blue-50/50' : 'text-slate-700'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveHeading(h.id)}
                      className="p-1 rounded border border-[#FECACA] hover:bg-rose-50 text-[#B91C1C] transition-colors shrink-0"
                      title="Hapus heading"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Card 4: Data & Entitas Wajib Dikutip (Entity Anchors) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2.5">
            <h2 className="text-xs font-semibold text-slate-900">
              Data & Entitas Wajib Dikutip (Entity Anchors)
            </h2>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {entityAnchors.map((ea, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]"
                >
                  {ea}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5: Pertanyaan Pembaca Terjawab (Search Intent Coverage) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2.5">
            <h2 className="text-xs font-semibold text-slate-900">
              Pertanyaan Pembaca Terjawab (Search Intent Coverage)
            </h2>
            <div className="p-3 bg-white border border-[#DBEAFE] rounded-[6px] text-xs text-slate-800 space-y-1.5">
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Berapa modal awal paling sedikit untuk mulai reksadana di Indonesia?</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Apakah investasi reksadana dijamin LPS seperti halnya tabungan deposito?</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Berapa hari kerja proses pencairan saldo reksadana ke rekening bank?</span>
              </div>
            </div>
          </div>

          {/* Card 6: Rekomendasi Tautan Internal Portal RRI */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-2.5">
            <h2 className="text-xs font-semibold text-slate-900">
              Rekomendasi Tautan Internal Portal RRI
            </h2>
            <div className="space-y-2 pt-0.5">
              <a
                href="https://rri.co.id/bisnis/512"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] hover:underline"
              >
                <span>Mengenal Perbedaan Saham dan ORI025 (rri.co.id/bisnis/512)</span>
                <ExternalLink className="w-3 h-3 text-[#1866EF]" />
              </a>
              <br />
              <a
                href="https://rri.co.id/lifestyle/481"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] hover:underline"
              >
                <span>Tips Alokasi Gaji 50/30/20 (rri.co.id/lifestyle/481)</span>
                <ExternalLink className="w-3 h-3 text-[#1866EF]" />
              </a>
            </div>
          </div>

          {/* Card 7: Beri Arahan Tambahan ke AI (Iterasi Brief) */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-semibold text-slate-900">
                  Beri Arahan Tambahan ke AI (Iterasi Brief)
                </h2>
                <div className="text-[11px] text-slate-400 mt-0.5">Worker Claude 3.5 Sonnet</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                Aktif Normal
              </span>
            </div>
            <textarea
              value={aiNotes}
              onChange={(e) => setAiNotes(e.target.value)}
              rows={3}
              placeholder="Ubah gaya bahasa agar lebih santai dan tambahkan H2 tentang risiko psikologis FOMO..."
              className="w-full p-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  updateBrief({ aiNotes })
                  showSuccess('Tinjauan Brief', 'Permintaan iterasi brief dikirim ke AI.')
                }}
                className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
              >
                Buat Ulang Brief
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Status Brief Saat Ini */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Status Brief Saat Ini
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-[#64748B]">Perkiraan Panjang Naskah:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                  600 - 800 kata
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50 gap-2">
                <span className="text-[#64748B] shrink-0">Cluster Asal:</span>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {clustersList.map((cl, idx) => (
                    <span
                      key={cl}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]"
                    >
                      <span>{cl}</span>
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCluster(cl)}
                          className="hover:text-red-600 transition-colors ml-0.5"
                          title="Hapus Cluster"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}

                  {/* Autocomplete Input or Plus Pill Button */}
                  {isAddingCluster ? (
                    <div className="relative inline-block">
                      <input
                        type="text"
                        autoFocus
                        value={clusterInput}
                        onChange={(e) => setClusterInput(e.target.value)}
                        placeholder="Ketik cluster..."
                        className="h-[24px] px-2.5 text-xs bg-white border border-[#1866EF] rounded-full text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[140px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            if (filteredClusterSuggestions.length > 0) {
                              handleAddCluster(filteredClusterSuggestions[0])
                            } else if (clusterInput.trim()) {
                              handleAddCluster(clusterInput.trim())
                            }
                          } else if (e.key === 'Escape') {
                            setIsAddingCluster(false)
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => setIsAddingCluster(false), 200)
                        }}
                      />
                      {/* Autocomplete Dropdown */}
                      {filteredClusterSuggestions.length > 0 && (
                        <div className="absolute right-0 top-[28px] w-[210px] bg-white border border-[#DBEAFE] rounded-[6px] shadow-lg py-1 z-30 max-h-[160px] overflow-y-auto">
                          {filteredClusterSuggestions.map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onMouseDown={() => handleAddCluster(sug)}
                              className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 text-slate-800 flex items-center justify-between transition-colors"
                            >
                              <span>{sug}</span>
                              <Plus className="w-3 h-3 text-[#1866EF]" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingCluster(true)}
                      className="inline-flex items-center justify-center h-[22px] w-[22px] rounded-full bg-[#EFF6FF] text-[#1866EF] border border-[#BFDBFE] hover:bg-blue-100 transition-colors"
                      title="Tambah Cluster Lain"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-[#64748B]">Tingkat Kesulitan (KD):</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                  32% (Mudah Bersaing)
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-[#64748B]">Intensi:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]">
                  Informasional
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-[#64748B]">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                  Menunggu Persetujuan
                </span>
              </div>
            </div>

            {/* Keyword Meta */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs">
              <div>
                <span className="text-[#64748B] block mb-1">Kata Kunci Pilar:</span>
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
              {/* Versi 2 (Saat Ini) */}
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

              {/* Versi 1 */}
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
