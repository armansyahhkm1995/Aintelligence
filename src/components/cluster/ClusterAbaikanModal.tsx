import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

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
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Abaikan Peringatan Kanibalisasi</h2>
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
            Anda memilih mengabaikan potensi kanibalisasi topik{' '}
            <strong className="text-slate-900">{topicName}</strong>. Masukkan pertimbangan redaksional sebelum melanjutkan:
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Alasan Redaksional Override
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
              placeholder="Contoh: Sudut pandang khusus pembaruan regulasi tahun 2026..."
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
              className="px-4 py-2 bg-[#B45309] hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Konfirmasi Abaikan & Jadikan Aman
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
