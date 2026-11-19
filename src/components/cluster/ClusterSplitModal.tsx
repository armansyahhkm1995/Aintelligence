import React from 'react'
import { X } from 'lucide-react'

interface ClusterSplitModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  card2Supporting: string[]
  selectedSplitKeywords: string[]
  onToggleSplitKeyword: (kw: string) => void
  newSplitTopicTitle: string
  splitReason: string
  onSplitReasonChange: (val: string) => void
}

export const ClusterSplitModal: React.FC<ClusterSplitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  card2Supporting,
  selectedSplitKeywords,
  onToggleSplitKeyword,
  newSplitTopicTitle,
  splitReason,
  onSplitReasonChange,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pemecahan Kelompok Topik</h2>
            <p className="text-[11px] text-slate-400">Pecah kata kunci dengan intent berbeda menjadi calon artikel mandiri</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Pilih kata kunci dari topik <strong className="text-slate-900">Panduan Reksadana 2026</strong> yang ingin dipisahkan untuk dijadikan calon artikel baru mandiri:
          </p>

          {/* Checklist Keyword */}
          <div className="space-y-2 border border-slate-200 rounded-lg p-3 bg-slate-50/50">
            <span className="text-[11px] font-semibold text-slate-500 block uppercase">
              Daftar Kata Kunci Topik:
            </span>

            {/* Pilar Keyword */}
            <label className="flex items-center justify-between text-xs text-slate-800 bg-white p-2.5 rounded-md border border-slate-200 cursor-pointer hover:bg-blue-50/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selectedSplitKeywords.includes('panduan reksadana 2026 (Vol 22.000) (KD 28%)')}
                  onChange={() => onToggleSplitKeyword('panduan reksadana 2026 (Vol 22.000) (KD 28%)')}
                  className="rounded border-slate-300 text-[#1866EF] focus:ring-[#1866EF] cursor-pointer"
                />
                <span className="font-medium">panduan reksadana 2026 (Vol 22.000) (KD 28%)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] shrink-0">
                Kata Kunci Pilar
              </span>
            </label>

            {/* Supporting Keywords */}
            {card2Supporting.map((kw, i) => (
              <label
                key={i}
                className="flex items-center justify-between text-xs text-slate-800 bg-white p-2.5 rounded-md border border-slate-200 cursor-pointer hover:bg-blue-50/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedSplitKeywords.includes(kw)}
                    onChange={() => onToggleSplitKeyword(kw)}
                    className="rounded border-slate-300 text-[#1866EF] focus:ring-[#1866EF] cursor-pointer"
                  />
                  <span className="font-medium">{kw}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 border border-slate-200 text-slate-600 shrink-0">
                  Kata Kunci Pendukung
                </span>
              </label>
            ))}
          </div>

          {/* Judul Topik Baru (Digenerate AI) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 block">
                Judul Kelompok Topik Baru (Rekomendasi AI)
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1866EF] font-semibold border border-[#BFDBFE]">
                Digenerate Otomatis
              </span>
            </div>
            <div className="w-full px-3.5 py-2.5 text-xs font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg leading-relaxed min-h-[40px] flex items-center">
              {newSplitTopicTitle ? (
                <span>{newSplitTopicTitle}</span>
              ) : (
                <span className="text-slate-400 font-normal italic">
                  Pilih minimal satu kata kunci di atas untuk menghasilkan judul topik baru otomatis...
                </span>
              )}
            </div>
          </div>

          {/* Alasan Pemecahan */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Alasan Redaksional Pemecahan Topik <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={splitReason}
              onChange={(e) => onSplitReasonChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
              placeholder="Masukkan alasan pemecahan topik..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={selectedSplitKeywords.length === 0}
              className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Pecahkan Menjadi Topik Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
