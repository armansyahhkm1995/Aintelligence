import React from 'react'
import { Sparkles } from 'lucide-react'

interface ClusterNewAiCardProps {
  onReject: () => void
  onEdit: () => void
  onCreateBrief: () => void
}

export const ClusterNewAiCard: React.FC<ClusterNewAiCardProps> = ({
  onReject,
  onEdit,
  onCreateBrief,
}) => {
  return (
    <div className="bg-white border-2 border-[#1866EF] ring-4 ring-blue-500/20 rounded-xl p-6 shadow-md space-y-4 animate-in fade-in slide-in-from-top-2">
      {/* Header Row: Badges & Right Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-300 text-[#1866EF] text-xs font-bold inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Baru
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-[#ECFDF5] border-[#A7F3D0] text-[#15803D]">
            Aman
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
            Informasional
          </span>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          <span className="font-bold text-slate-800">Total Vol: 38.000 / bln</span>
          <span className="mx-2 text-slate-300">|</span>
          <span>Rata-rata KD: 24% • (4 Keyword)</span>
        </div>
      </div>

      {/* Cluster Title */}
      <div>
        <h2 className="text-lg font-bold text-[#1866EF] leading-snug">
          Reksadana Syariah dan Tren Keuangan Berkelanjutan 2026
        </h2>
      </div>

      {/* Content Box with Pilar & Supporting Keywords */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Pilar:
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium">
            reksadana syariah terbaik (Vol 18.000) (KD 24%)
          </span>
        </div>

        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Pendukung:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'keuntungan reksadana syariah (Vol 10.000) (KD 22%)',
              'reksadana syariah vs konvensional (Vol 6.000) (KD 25%)',
              'investasi esg ojk 2026 (Vol 4.000) (KD 26%)',
            ].map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium shadow-2xs bg-white border border-slate-200 text-slate-700"
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
