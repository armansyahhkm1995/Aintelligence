import React from 'react'
import { AlertTriangle, X } from 'lucide-react'
import type { DuplicateFileInfo } from './types'

interface CsvDuplicateModalProps {
  isOpen: boolean
  info: DuplicateFileInfo | null
  cooldownMonths: number
  onClose: () => void
}

export const CsvDuplicateModal: React.FC<CsvDuplicateModalProps> = ({
  isOpen,
  info,
  cooldownMonths,
  onClose,
}) => {
  if (!isOpen || !info) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-red-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 bg-red-50/80 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-900">
                Peringatan: Berkas CSV Terdeteksi Duplikat!
              </h3>
              <p className="text-[11px] text-red-600">
                Sistem mendeteksi kumpulan kata kunci telah diunggah sebelumnya.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-red-50/40 border border-red-100 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Berkas yang diunggah:</span>
              <strong className="text-slate-900 font-mono">{info.fileName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kecocokan 20 Kata Kunci Pertama:</span>
              <span className="font-bold text-red-700">{info.similarity}% Identik</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Riwayat Berkas Sebelumnya:</span>
              <span className="font-semibold text-slate-800">Dataset {info.previousDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Aturan Jeda Kedaluwarsa:</span>
              <span className="font-semibold text-[#1866EF]">{cooldownMonths} Bulan</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-900 block mb-1.5">
              Sampel Kata Kunci yang Cocok (Duplikat):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
              {info.matchedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-red-100/60 text-red-800 border border-red-200 rounded text-[11px] font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-slate-700 font-semibold">Alasan Penolakan:</strong> Berkas ini berisi kumpulan kata kunci yang pernah diproses dalam rentang kurang dari {cooldownMonths} bulan. Untuk menjaga viralitas dan relevansi berita di portal RRI, silakan gunakan berkas CSV hasil riset tren Semrush terbaru.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Paham & Pilih Berkas Lain
          </button>
        </div>
      </div>
    </div>
  )
}
