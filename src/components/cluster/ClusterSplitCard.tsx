import React from 'react'
import { Split } from 'lucide-react'

interface ClusterSplitCardProps {
  title: string
  selectedSplitKeywords: string[]
  splitReason?: string
  onUndoSplit: () => void
  onReject: () => void
  onEdit: () => void
  onCreateBrief: () => void
}

export const ClusterSplitCard: React.FC<ClusterSplitCardProps> = ({
  title,
  selectedSplitKeywords,
  splitReason = 'Memecah kata kunci spesifik transaksional menjadi artikel panduan mandiri.',
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

      {/* Callout Banner with Reasoning for Splitting */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
        <div className="flex items-center gap-2 font-bold text-[#1866EF]">
          <Split className="w-4 h-4" />
          <span>Hasil Pemecahan Topik Mandiri</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Alasan dipecah: <strong>{splitReason}</strong>
        </p>
      </div>

      {/* Content Box with Pilar Keyword and Reasons per Keyword */}
      <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/20 space-y-3">
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-2">
            Kata Kunci yang Dipecah Menjadi Topik Mandiri Beserta Alasannya:
          </div>
          <div className="space-y-2">
            {selectedSplitKeywords.map((kw, i) => (
              <div key={i} className="p-2.5 bg-white border border-blue-200 rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1866EF]">{kw}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#1866EF] font-semibold">
                    Topik Baru
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  <strong className="text-slate-700">Alasan dipecah:</strong> Kata kunci memiliki intent spesifik untuk panduan aplikasi yang memerlukan outline terpisah dari artikel pilar.
                </p>
              </div>
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
