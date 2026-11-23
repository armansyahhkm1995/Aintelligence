import React from 'react'
import { X, AlertCircle } from 'lucide-react'

interface ClusterTolakModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  topicName?: string
  reason: string
  onReasonChange: (val: string) => void
}

export const ClusterTolakModal: React.FC<ClusterTolakModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  topicName = 'Panduan Reksadana 2026',
  reason,
  onReasonChange,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Tolak Kelompok Topik</h2>
            <p className="text-[11px] text-slate-400">
              Tolak kelompok topik agar tidak dilanjutkan ke tahap pembuatan arahan artikel
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-rose-50/80 border border-rose-200 rounded-lg p-3 text-xs text-rose-800 leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              Kelompok topik <strong className="text-rose-950 font-bold">{topicName}</strong> akan ditandai sebagai <strong>Ditolak</strong>, judul topik dicoret, dan beroutline merah. Anda dapat memulihkannya kapan saja melalui tombol <strong>Kembalikan Topik</strong>.
            </div>
          </div>

          {/* Rincian Topik */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs text-slate-700">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Kelompok Topik:</span>
            <div className="font-bold text-slate-900 text-sm">{topicName}</div>
          </div>

          {/* Alasan Penolakan */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Alasan Redaksional Penolakan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-rose-500 leading-relaxed resize-y"
              placeholder="Contoh: Topik tidak relevan dengan prioritas redaksi triwulan ini / duplikasi mendalam dengan arsip lama..."
            />
          </div>

          {/* Action Buttons */}
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
              disabled={!reason.trim()}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Konfirmasi Tolak Topik
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
