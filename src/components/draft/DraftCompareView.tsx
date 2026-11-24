import React from 'react'
import { ChevronLeft, FileText } from 'lucide-react'
import { MilestoneStepper } from '../common/MilestoneStepper'
import { useToast } from '../../context/ToastContext'
import { useApp } from '../../context/AppContext'
import type { DraftVersionItem } from './types'

interface DraftCompareViewProps {
  latest: DraftVersionItem
  compareTarget: DraftVersionItem
  onBackToVersions: () => void
}

export const DraftCompareView: React.FC<DraftCompareViewProps> = ({
  latest,
  compareTarget,
  onBackToVersions,
}) => {
  const { currentUser } = useApp()
  const { showSuccess } = useToast()

  const handleCopyDraft = (version: string, item: DraftVersionItem) => {
    navigator.clipboard.writeText(
      item.lead +
        '\n\n' +
        item.sections.map((s) => s.heading + '\n' + s.content).join('\n\n')
    )
    showSuccess('Salin Berhasil', `Naskah ${version} disalin`)
  }

  return (
    <div className="space-y-6">
      {/* Milestone Stepper */}
      {currentUser?.role !== 'editor' && <MilestoneStepper currentStep={5} />}

      {/* Back Link & Header */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onBackToVersions}
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
            Membandingkan <strong className="text-slate-800">{compareTarget.version}</strong> dengan{' '}
            <strong className="text-slate-800">{latest.version} (Versi Saat Ini)</strong>. Bagian yang disunting atau disempurnakan disorot dengan warna khusus.
          </p>
        </div>
      </div>

      {/* Side-by-Side 2 Column Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Column 1: Versi Pilihan (Target Compare) */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              Artikel Siap Rilis | {compareTarget.version} | {compareTarget.wordCount.toLocaleString('id-ID')} kata
            </span>
            <button
              type="button"
              onClick={() => handleCopyDraft(compareTarget.version, compareTarget)}
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
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1866EF] text-xs font-bold">
              Artikel Siap Rilis | {latest.version} (Saat Ini) | {latest.wordCount.toLocaleString('id-ID')} kata
            </span>
            <button
              type="button"
              onClick={() => handleCopyDraft(latest.version, latest)}
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
