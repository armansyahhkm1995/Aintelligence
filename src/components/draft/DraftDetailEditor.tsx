import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronDown,
  Sparkles,
  History,
  Copy,
  FileText,
  LogOut,
} from 'lucide-react'
import { MilestoneStepper } from '../common/MilestoneStepper'
import { NextStepBanner } from '../common/NextStepBanner'
import { useApp } from '../../context/AppContext'
import type { DraftImageRec, DraftVersionItem } from './types'

interface DraftDetailEditorProps {
  activeItemTitle: string
  activeDraftVersion: DraftVersionItem
  articleHeadline: string
  leadText: string
  section1Heading: string
  section1Callout1: string
  section1Content: string
  section1Callout2: string
  section2Heading: string
  section2Content1: string
  section2Content2: string
  wordCount: number
  primaryKeyword: string
  secondaryKeywords: string[]
  seoTitle: string
  metaDesc: string
  slugUrl: string
  category: string
  tags: string[]
  aiImageRec: DraftImageRec
  onBackToTable: () => void
  onOpenVersions: () => void
  onRegenerateWithAI: () => void
  onCopyOption: (option: 1 | 2 | 3 | 4 | 5) => void
  onExportDocs: () => void
  onExportPDF: () => void
  onRequestRelease: () => void
}

export const DraftDetailEditor: React.FC<DraftDetailEditorProps> = ({
  activeItemTitle,
  activeDraftVersion,
  articleHeadline,
  leadText,
  section1Heading,
  section1Callout1,
  section1Content,
  section1Callout2,
  section2Heading,
  section2Content1,
  section2Content2,
  wordCount,
  primaryKeyword,
  secondaryKeywords,
  seoTitle,
  metaDesc,
  slugUrl,
  category,
  tags,
  aiImageRec,
  onBackToTable,
  onOpenVersions,
  onRegenerateWithAI,
  onCopyOption,
  onExportDocs,
  onExportPDF,
  onRequestRelease,
}) => {
  const { currentUser, isTokenExhausted } = useApp()
  const [isCopyDropdownOpen, setIsCopyDropdownOpen] = useState(false)
  const [isExportDraftDropdownOpen, setIsExportDraftDropdownOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 5 Active (Hanya untuk Admin, disembunyikan untuk Editor) */}
      {currentUser?.role !== 'editor' && <MilestoneStepper currentStep={5} />}

      {/* 2. Top Title Row with Back Link and Action Buttons */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onBackToTable}
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
            <button
              type="button"
              onClick={onOpenVersions}
              className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs flex flex-col items-start justify-center text-left"
              title="Lihat Riwayat Versi Draf Artikel"
            >
              <div className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#1866EF]" />
                <span className="text-xs font-bold text-slate-900">{activeDraftVersion.version}</span>
                <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-semibold">Aktif</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal leading-tight">
                {activeDraftVersion.isAI
                  ? 'Dibuat oleh AI Assistant'
                  : `Disunting oleh ${activeDraftVersion.createdBy.split(' (')[0]} (${activeDraftVersion.createdAt.split(' WIB')[0]})`}
              </span>
            </button>

            <button
              type="button"
              onClick={onRegenerateWithAI}
              disabled={isTokenExhausted}
              className={`h-10 px-4 text-xs font-semibold rounded-lg transition-colors shadow-xs inline-flex items-center gap-1.5 ${
                isTokenExhausted
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                  : 'bg-[#1866EF] hover:bg-blue-600 text-white cursor-pointer'
              }`}
              title={
                isTokenExhausted
                  ? 'Kuota token LLM telah habis. Tidak dapat membuat ulang draf dengan AI.'
                  : 'Buat Ulang Draft dengan AI'
              }
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buat Ulang Draft dengan AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={5} />

      {/* 4. Two-Column Layout */}
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

                {/* Dropdown Menu: 5 Options */}
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
                          onClick={() => {
                            setIsCopyDropdownOpen(false)
                            onCopyOption(1)
                          }}
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
                          onClick={() => {
                            setIsCopyDropdownOpen(false)
                            onCopyOption(2)
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin judul artikel</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsCopyDropdownOpen(false)
                            onCopyOption(3)
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin isi artikel</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsCopyDropdownOpen(false)
                            onCopyOption(4)
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Salin paket metadata SEO</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsCopyDropdownOpen(false)
                            onCopyOption(5)
                          }}
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

            {/* Dropdown Ekspor Draft (Docs, PDF) */}
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
                      onClick={() => {
                        setIsExportDraftDropdownOpen(false)
                        onExportDocs()
                      }}
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
                      onClick={() => {
                        setIsExportDraftDropdownOpen(false)
                        onExportPDF()
                      }}
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

            {/* Lepas Draft Button */}
            <button
              type="button"
              onClick={onRequestRelease}
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

            {/* Judul SEO */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">Judul SEO</label>
              <div className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/70 text-slate-700 leading-relaxed">
                {seoTitle}
              </div>
            </div>

            {/* Deskripsi Meta */}
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

            {/* Kategori */}
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
    </div>
  )
}
