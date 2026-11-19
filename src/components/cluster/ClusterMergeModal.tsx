import React from 'react'
import { X } from 'lucide-react'

interface ClusterMergeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  sourceTopic?: string
  targetTopic: string
  onTargetTopicChange: (val: string) => void
  reason: string
  onReasonChange: (val: string) => void
}

export const ClusterMergeModal: React.FC<ClusterMergeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  sourceTopic = 'Panduan Reksadana 2026',
  targetTopic,
  onTargetTopicChange,
  reason,
  onReasonChange,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Gabungkan Kelompok Topik</h2>
            <p className="text-[11px] text-slate-400">Satukan kelompok topik untuk eliminasi kanibalisasi internal</p>
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
          <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
            Topik asal <strong className="text-[#1866EF]">{sourceTopic}</strong> akan dilebur masuk ke dalam topik target pilihan. Seluruh kata kunci dan traffic akan disatukan ke artikel pilar.
          </div>

          {/* Pilih Topik Target */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Pilih Kelompok Topik Target (Tujuan Peleburan)
            </label>
            <select
              value={targetTopic}
              onChange={(e) => onTargetTopicChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] cursor-pointer"
            >
              <option value="Cara Investasi Reksadana Pemula">
                Cara Investasi Reksadana Pemula (Aman, Vol: 45.000/bln)
              </option>
              <option value="Katalog Investasi Pasar Modal OJK">
                Katalog Investasi Pasar Modal OJK (Vol: 32.000/bln)
              </option>
            </select>
          </div>

          {/* Rincian Akumulasi */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Estimasi Total Volume Setelah Digabung:</span>
              <span className="font-bold text-[#1866EF]">90.000 Pencarian / Bulan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Kata Kunci Terakumulasi:</span>
              <span className="font-bold text-slate-800">6 Keyword (Pilar & Pendukung)</span>
            </div>
          </div>

          {/* Alasan Penggabungan */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Alasan Redaksional Penggabungan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus:outline-none focus:border-[#1866EF] leading-relaxed resize-y"
              placeholder="Masukkan alasan penggabungan..."
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
              className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Konfirmasi Penggabungan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
