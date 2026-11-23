import React from 'react'
import { X, CheckCircle2 } from 'lucide-react'

interface ClusterAbaikanModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  reason: string
  onReasonChange: (val: string) => void
  topicName?: string
}

export const ClusterAbaikanModal: React.FC<ClusterAbaikanModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  reason,
  onReasonChange,
  topicName = 'Panduan Reksadana 2026',
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Abaikan Peringatan Kanibalisasi</h2>
            <p className="text-[11px] text-slate-400">
              Abaikan potensi kanibalisasi dan jadikan kelompok topik ini aman untuk diproduksi
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
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              Kelompok topik <strong className="text-emerald-950 font-bold">{topicName}</strong> akan diubah statusnya menjadi <strong>Aman (Override)</strong>. Peringatan kanibalisasi akan dinonaktifkan sehingga topik siap dibuatkan arahan artikel.
            </div>
          </div>

          {/* Rincian Topik */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 text-xs text-slate-700">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Kelompok Topik:</span>
            <div className="font-bold text-slate-900 text-sm">{topicName}</div>
          </div>

          {/* Alasan Pengabaian */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Alasan Redaksional Pengabaian <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
              placeholder="Contoh: Fokus pada pembaruan regulasi tahun 2026 dengan sudut pandang analitis, bukan tutorial dasar pemula..."
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
              className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Konfirmasi Abaikan & Jadikan Aman
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
