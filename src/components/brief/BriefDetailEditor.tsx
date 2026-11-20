import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronDown,
  Sparkles,
  History,
  Plus,
  Trash2,
  GripVertical,
  X,
  ExternalLink,
  FileText,
  FileCode,
  FileType,
  LogOut,
} from 'lucide-react'
import { MilestoneStepper } from '../common/MilestoneStepper'
import { NextStepBanner } from '../common/NextStepBanner'
import type { BriefHeading, BriefVersionItem, InternalLinkItem } from './types'

interface BriefDetailEditorProps {
  activeItemTitle: string
  activeIntent: string
  activeMainKeyword: string
  activeSupportingKeywords: string[]
  activeVolume: string
  isApproved: boolean
  activeBriefVersion: BriefVersionItem
  briefTitle: string
  setBriefTitle: (v: string) => void
  targetAudience: string
  setTargetAudience: (v: string) => void
  mainQuestions: string[]
  setMainQuestions: React.Dispatch<React.SetStateAction<string[]>>
  angleJournalistic: string
  setAngleJournalistic: (v: string) => void
  headings: BriefHeading[]
  setHeadings: React.Dispatch<React.SetStateAction<BriefHeading[]>>
  supportingSources: string[]
  setSupportingSources: React.Dispatch<React.SetStateAction<string[]>>
  internalLinks: InternalLinkItem[]
  setInternalLinks: React.Dispatch<React.SetStateAction<InternalLinkItem[]>>
  onBackToTable: () => void
  onOpenVersions: () => void
  onRegenerateWithAI: () => void
  onApprove: () => void
  onRequestRelease: () => void
  onExport: (format: 'docs' | 'markdown' | 'pdf') => void
}

export const BriefDetailEditor: React.FC<BriefDetailEditorProps> = ({
  activeItemTitle,
  activeIntent,
  activeMainKeyword,
  activeSupportingKeywords,
  activeVolume,
  isApproved,
  activeBriefVersion,
  briefTitle,
  setBriefTitle,
  targetAudience,
  setTargetAudience,
  mainQuestions,
  setMainQuestions,
  angleJournalistic,
  setAngleJournalistic,
  headings,
  setHeadings,
  supportingSources,
  setSupportingSources,
  internalLinks,
  setInternalLinks,
  onBackToTable,
  onOpenVersions,
  onRegenerateWithAI,
  onApprove,
  onRequestRelease,
  onExport,
}) => {
  const [openLevelId, setOpenLevelId] = useState<string | null>(null)
  const [draggedHeadingIdx, setDraggedHeadingIdx] = useState<number | null>(null)
  const [isAddingSource, setIsAddingSource] = useState(false)
  const [newSourceTitle, setNewSourceTitle] = useState('')
  const [newSourceUrl, setNewSourceUrl] = useState('')
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false)

  // Drag and drop for headings
  const handleDragStart = (idx: number) => {
    setDraggedHeadingIdx(idx)
  }

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (draggedHeadingIdx === null || draggedHeadingIdx === idx) return
    const reordered = [...headings]
    const [draggedItem] = reordered.splice(draggedHeadingIdx, 1)
    reordered.splice(idx, 0, draggedItem)
    setDraggedHeadingIdx(idx)
    setHeadings(reordered)
  }

  const handleDragEnd = () => {
    setDraggedHeadingIdx(null)
  }

  const handleAddHeading = () => {
    const newId = `h-${Date.now()}`
    setHeadings([...headings, { id: newId, level: 'H2', text: 'Subtopik Baru' }])
  }

  const handleDeleteHeading = (id: string) => {
    if (headings.length <= 1) return
    setHeadings(headings.filter((h) => h.id !== id))
  }

  const handleLevelChange = (id: string, newLevel: string) => {
    setHeadings(headings.map((h) => (h.id === id ? { ...h, level: newLevel } : h)))
    setOpenLevelId(null)
  }

  const handleTextChange = (id: string, text: string) => {
    setHeadings(headings.map((h) => (h.id === id ? { ...h, text } : h)))
  }

  const handleAddQuestion = () => {
    if (mainQuestions.length >= 10) return
    setMainQuestions([...mainQuestions, 'Pertanyaan pembaca baru yang perlu dijawab...'])
  }

  const handleDeleteQuestion = (idx: number) => {
    if (mainQuestions.length <= 1) return
    setMainQuestions(mainQuestions.filter((_, i) => i !== idx))
  }

  const handleQuestionChange = (idx: number, val: string) => {
    const updated = [...mainQuestions]
    updated[idx] = val
    setMainQuestions(updated)
  }

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 4 Active */}
      <MilestoneStepper currentStep={4} />

      {/* 2. Top Title Row with Back Link and Action Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onBackToTable}
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
            <button
              type="button"
              onClick={onOpenVersions}
              className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex flex-col items-start justify-center text-left"
              title="Lihat Riwayat Versi Arahan Artikel"
            >
              <div className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#1866EF]" />
                <span className="text-xs font-bold text-slate-900">{activeBriefVersion.version}</span>
                <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">Aktif</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal leading-tight">
                {activeBriefVersion.isAI
                  ? 'Dibuat oleh AI Assistant'
                  : `Disunting oleh ${activeBriefVersion.createdBy.split(' (')[0]} (${activeBriefVersion.createdAt.split(' WIB')[0]})`}
              </span>
            </button>

            <button
              type="button"
              onClick={onRegenerateWithAI}
              disabled={isApproved}
              className={`h-10 px-4 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs ${
                isApproved
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-[#1866EF] hover:bg-blue-600 text-white cursor-pointer'
              }`}
              title={isApproved ? 'Arahan artikel telah disetujui, tombol ini dinonaktifkan' : 'Buat ulang arahan dengan AI'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buat Ulang Arahan dengan AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={4} />

      {/* 4. Two-Column Layout */}
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
              readOnly={isApproved}
              disabled={isApproved}
              value={briefTitle}
              onChange={(e) => setBriefTitle(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-lg border transition-colors ${
                isApproved
                  ? 'bg-slate-50 text-slate-800 border-slate-200 cursor-default font-medium'
                  : 'bg-white text-slate-800 border-slate-200 focus:outline-none focus:border-[#1866EF]'
              }`}
            />
          </div>

          {/* Card 2: Sasaran Pembaca */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-900 block">
              Sasaran Pembaca
            </label>
            <input
              type="text"
              readOnly={isApproved}
              disabled={isApproved}
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Masukkan sasaran pembaca..."
              className={`w-full px-3.5 py-2.5 text-xs rounded-lg border transition-colors ${
                isApproved
                  ? 'bg-slate-50 text-slate-800 border-slate-200 cursor-default font-medium'
                  : 'bg-white text-slate-800 border-slate-200 focus:outline-none focus:border-[#1866EF] font-medium'
              }`}
            />
          </div>

          {/* Card 3: Pertanyaan Utama */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900 block">
                  Pertanyaan Utama ({mainQuestions.length}/10)
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Daftar pertanyaan yang harus terjawab secara lugas di dalam isi artikel naskah akhir
                </p>
              </div>
              {!isApproved && mainQuestions.length < 10 && (
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tambah Pertanyaan dengan AI</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {mainQuestions.map((q, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-bold text-slate-400 shrink-0">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    readOnly={isApproved}
                    disabled={isApproved}
                    value={q}
                    onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    className={`flex-1 px-3 py-2 text-xs rounded-lg border ${
                      isApproved
                        ? 'bg-slate-50 text-slate-800 border-slate-200 cursor-default'
                        : 'bg-slate-50/70 text-slate-800 border-slate-200 focus:outline-none focus:bg-white focus:border-[#1866EF]'
                    }`}
                  />
                  {!isApproved && mainQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
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
              readOnly={isApproved}
              disabled={isApproved}
              value={angleJournalistic}
              onChange={(e) => setAngleJournalistic(e.target.value)}
              className={`w-full px-3.5 py-2.5 text-xs rounded-lg border leading-relaxed resize-y ${
                isApproved
                  ? 'bg-slate-50 text-slate-800 border-slate-200 cursor-default'
                  : 'bg-white text-slate-800 border-slate-200 focus:outline-none focus:border-[#1866EF]'
              }`}
            />
          </div>

          {/* Card 5: Kerangka Naskah */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 block">
                Kerangka Naskah
              </label>
              {!isApproved && (
                <button
                  type="button"
                  onClick={handleAddHeading}
                  className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              {headings.map((item, idx) => (
                <div
                  key={item.id}
                  draggable={!isApproved && item.level !== 'H1'}
                  onDragStart={() => !isApproved && handleDragStart(idx)}
                  onDragOver={(e) => !isApproved && handleDragOver(e, idx)}
                  onDragEnd={() => !isApproved && handleDragEnd()}
                  className={`flex items-center gap-2 p-2 border rounded-lg transition-colors group ${
                    item.level === 'H1'
                      ? 'bg-blue-50/50 border-blue-200/90'
                      : isApproved
                      ? 'bg-slate-50/70 border-slate-200/80'
                      : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  {/* Drag Handle: Hidden for H1 or when isApproved */}
                  {!isApproved && item.level !== 'H1' ? (
                    <div className="cursor-grab text-slate-400 hover:text-slate-600 px-1">
                      <GripVertical className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 px-1" title={item.level === 'H1' ? 'H1 Baku Permanen' : 'Terkunci'} />
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
                    readOnly={isApproved}
                    disabled={isApproved}
                    value={item.text}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    className={`flex-1 text-xs text-slate-800 font-medium px-2 py-1 rounded ${
                      isApproved ? 'bg-transparent cursor-default' : 'bg-transparent focus:outline-none focus:bg-white'
                    }`}
                  />

                  {/* Level Dropdown Toggle */}
                  {!isApproved && item.level !== 'H1' && (
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

                  {/* Delete Button: Hidden for H1 or when isApproved */}
                  {!isApproved && item.level !== 'H1' && (
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
              {!isApproved && (
                <button
                  type="button"
                  onClick={() => setIsAddingSource(true)}
                  className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {supportingSources.map((ent, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium"
                >
                  <span>{ent}</span>
                  {!isApproved && (
                    <button
                      type="button"
                      onClick={() => setSupportingSources(supportingSources.filter((_, idx) => idx !== i))}
                      className="hover:text-rose-600 transition-colors cursor-pointer"
                      title="Hapus sumber"
                    >
                      <X className="w-3 h-3 text-[#1D4ED8] hover:text-rose-600" />
                    </button>
                  )}
                </span>
              ))}

              {!isApproved && (
                isAddingSource ? (
                  <div className="flex flex-wrap items-center gap-1.5 bg-blue-50/60 p-1.5 rounded-lg border border-blue-200">
                    <input
                      type="text"
                      autoFocus
                      value={newSourceTitle}
                      onChange={(e) => setNewSourceTitle(e.target.value)}
                      placeholder="Nama URL / Judul Sumber..."
                      className="h-[28px] px-2.5 text-xs bg-white border border-blue-300 rounded focus:outline-none w-44"
                    />
                    <input
                      type="text"
                      value={newSourceUrl}
                      onChange={(e) => setNewSourceUrl(e.target.value)}
                      placeholder="URL (contoh: ojk.go.id/pasar-modal)"
                      className="h-[28px] px-2.5 text-xs bg-white border border-blue-300 rounded focus:outline-none w-52"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSourceTitle.trim() || newSourceUrl.trim()) {
                          const itemText = newSourceUrl.trim()
                            ? `${newSourceTitle.trim() || 'Sumber'} (${newSourceUrl.trim()})`
                            : newSourceTitle.trim()
                          setSupportingSources([...supportingSources, itemText])
                          setNewSourceTitle('')
                          setNewSourceUrl('')
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
                        setNewSourceTitle('')
                        setNewSourceUrl('')
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
                )
              )}
            </div>
          </div>

          {/* Card 7: Rekomendasi Tautan Internal Portal RRI */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 block">
                Rekomendasi Tautan Internal Portal RRI
              </label>
              {!isApproved && (
                <button
                  type="button"
                  onClick={() => setIsAddingLink(true)}
                  className="text-xs font-semibold text-[#1866EF] hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              )}
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
                  {!isApproved && (
                    <button
                      type="button"
                      onClick={() => setInternalLinks(internalLinks.filter((l) => l.id !== link.id))}
                      className="hover:text-rose-600 transition-colors cursor-pointer ml-1"
                      title="Hapus tautan internal"
                    >
                      <X className="w-3 h-3 text-[#1D4ED8] hover:text-rose-600" />
                    </button>
                  )}
                </div>
              ))}

              {!isApproved && (
                isAddingLink ? (
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
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Sidebar Action Cards */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card Info Parameter Topik & Kata Kunci dari Cluster */}
          <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Parameter Topik & Kata Kunci</h3>
              {activeIntent && (
                <span className="px-2 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-[10px] font-semibold">
                  {activeIntent}
                </span>
              )}
            </div>
            <div className="space-y-2.5">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Kata Kunci Pilar:</span>
                <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium">
                  {activeMainKeyword}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">Kata Kunci Pendukung:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSupportingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full border border-slate-200 text-slate-600 text-[11px] bg-slate-50"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              {activeVolume && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Estimasi Volume SEO:</span>
                  <strong className="text-slate-800">{activeVolume}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Card: Keputusan Redaksi */}
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
                    className="fixed inset-0 z-10"
                    onClick={() => setIsExportDropdownOpen(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-20 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsExportDropdownOpen(false)
                        onExport('docs')
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 flex items-center justify-between font-medium text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ekspor sebagai Google Docs (.docx)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">DOCX</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsExportDropdownOpen(false)
                        onExport('markdown')
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 flex items-center justify-between font-medium text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FileCode className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Ekspor sebagai Markdown (.md)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">MD</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsExportDropdownOpen(false)
                        onExport('pdf')
                      }}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 flex items-center justify-between font-medium text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FileType className="w-3.5 h-3.5 text-rose-600" />
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
              onClick={onApprove}
              disabled={isApproved}
              className={`w-full h-10 text-xs font-bold rounded-lg transition-colors shadow-xs ${
                isApproved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed flex items-center justify-center gap-1.5'
                  : 'bg-[#1866EF] hover:bg-blue-600 text-white cursor-pointer'
              }`}
              title={isApproved ? 'Arahan artikel ini sudah disetujui' : 'Setujui Arahan Artikel'}
            >
              {isApproved ? 'Arahan Artikel Telah Disetujui' : 'Setujui Arahan Artikel'}
            </button>

            {/* Lepas Arahan Button */}
            {!isApproved && (
              <button
                type="button"
                onClick={onRequestRelease}
                className="w-full h-10 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Lepas Arahan Artikel</span>
              </button>
            )}

            <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
              Brief yang disetujui akan otomatis masuk antrean produksi Draf AI Claude 3.5 Sonnet
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
