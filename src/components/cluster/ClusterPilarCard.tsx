import React from 'react'
import { Sparkles } from 'lucide-react'

interface ClusterPilarCardProps {
  title: string
  intent: string
  volume: string
  kd: string
  isMerged: boolean
  isAiRegenerated: boolean
  onReject: () => void
  onEdit: () => void
  onCreateBrief: () => void
}

export const ClusterPilarCard: React.FC<ClusterPilarCardProps> = ({
  title,
  intent,
  volume,
  kd,
  isMerged,
  isAiRegenerated,
  onReject,
  onEdit,
  onCreateBrief,
}) => {
  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-6 shadow-xs space-y-4">
      {/* Header Row: Badges & Right Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {isAiRegenerated && (
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-300 text-[#1866EF] text-xs font-bold inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Baru
            </span>
          )}
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              isMerged
                ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]'
                : 'bg-[#ECFDF5] border-[#A7F3D0] text-[#15803D]'
            }`}
          >
            {isMerged ? 'Topik Pilar (Digabungkan)' : 'Aman'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
            {intent}
          </span>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          <span className="font-bold text-slate-800">
            Total Vol: {isMerged ? '90.000 / bln' : volume}
          </span>
          <span className="mx-2 text-slate-300">|</span>
          <span>
            Rata-rata KD: {kd} • ({isMerged ? '6 Keyword' : '4 Keyword'})
          </span>
        </div>
      </div>

      {/* Cluster Title */}
      <div>
        <h2 className="text-lg font-bold text-[#1866EF] leading-snug">
          {title}
        </h2>
      </div>

      {/* Content Box with Pilar & Supporting Keywords */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
        {/* Kata Kunci Pilar */}
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Pilar:
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium">
            cara investasi reksadana (Vol 22.000) (KD 28%)
          </span>
        </div>

        {/* Kata Kunci Pendukung */}
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Pendukung:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'reksadana pemula (Vol 22.000) (KD 28%)',
              'modal kecil (Vol 22.000) (KD 28%)',
              'keuntungan reksadana (Vol 22.000) (KD 28%)',
              ...(isMerged
                ? [
                    'panduan reksadana 2026 (Vol 22.000) (KD 28%) [Dari Peleburan]',
                    'belajar reksadana online (Vol 22.000) [Dari Peleburan]',
                  ]
                : []),
            ].map((kw, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-medium shadow-2xs ${
                  kw.includes('[Dari Peleburan]')
                    ? 'bg-blue-50 border border-blue-200 text-[#1866EF]'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-end gap-2.5 pt-1">
        <button
          type="button"
          onClick={onReject}
          className="h-9 px-4 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          Tolak
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
        >
          Perbarui Topik
        </button>
        <button
          type="button"
          onClick={onCreateBrief}
          className="h-9 px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          Buat Arahan
        </button>
      </div>
    </div>
  )
}
