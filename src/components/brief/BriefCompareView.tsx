import React from 'react'
import { ChevronLeft, FileText } from 'lucide-react'
import { MilestoneStepper } from '../common/MilestoneStepper'
import { useToast } from '../../context/ToastContext'
import type { BriefVersionItem } from './types'

interface BriefCompareViewProps {
  latest: BriefVersionItem
  compareTarget: BriefVersionItem
  onBackToVersions: () => void
}

export const BriefCompareView: React.FC<BriefCompareViewProps> = ({
  latest,
  compareTarget,
  onBackToVersions,
}) => {
  const { showSuccess } = useToast()

  const handleCopyBrief = (version: string, title: string) => {
    navigator.clipboard.writeText(title)
    showSuccess('Salin Berhasil', `Konten ${version} disalin`)
  }

  return (
    <div className="space-y-6">
      {/* Milestone Stepper */}
      <MilestoneStepper currentStep={4} />

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
            Perbandingan Versi Arahan Artikel
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
              {compareTarget.version} | {compareTarget.createdAt}
            </span>
            <button
              type="button"
              onClick={() => handleCopyBrief(compareTarget.version, compareTarget.title)}
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

        {/* Column 2: Versi Saat Ini (Latest / Active) */}
        <div className="bg-white border-2 border-emerald-300 rounded-xl p-6 shadow-sm space-y-5 relative">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
                {latest.version} (Versi Saat Ini)
              </span>
              <span className="text-[11px] text-slate-500">{latest.createdAt}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopyBrief(latest.version, latest.title)}
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
    </div>
  )
}
