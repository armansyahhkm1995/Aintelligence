import React from 'react'

interface ClusterSplitCardProps {
  title: string
  selectedSplitKeywords: string[]
  onUndoSplit: () => void
  onReject: () => void
  onEdit: () => void
  onCreateBrief: () => void
}

export const ClusterSplitCard: React.FC<ClusterSplitCardProps> = ({
  title,
  selectedSplitKeywords,
  onUndoSplit,
  onReject,
  onEdit,
  onCreateBrief,
}) => {
  return (
    <div className="bg-white border-2 border-[#1866EF]/30 rounded-xl p-6 shadow-xs space-y-4 animate-in fade-in slide-in-from-top-2">
      {/* Header Row: Badges & Right Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-semibold">
            Hasil Pemecahan (Aman)
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
            Transaksional
          </span>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          <span className="font-bold text-slate-800">Total Vol: 22.000 / bln</span>
          <span className="mx-2 text-slate-300">|</span>
          <span>Rata-rata KD: 28% • ({selectedSplitKeywords.length} Kata Kunci)</span>
        </div>
      </div>

      {/* Cluster Title */}
      <div>
        <h2 className="text-lg font-bold text-[#1866EF] leading-snug">
          {title}
        </h2>
      </div>

      {/* Content Box with Pilar Keyword */}
      <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/20 space-y-3">
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Dipisahkan dari Panduan Reksadana 2026:
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedSplitKeywords.map((kw, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-medium"
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
          onClick={onUndoSplit}
          className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          title="Batalkan pemecahan dan kembalikan kata kunci ke kelompok topik induk"
        >
          Kembalikan Topik
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
