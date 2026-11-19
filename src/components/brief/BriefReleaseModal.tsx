import React from 'react'

interface BriefReleaseModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  onConfirm: () => void
}

export const BriefReleaseModal: React.FC<BriefReleaseModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Lepas Arahan Artikel?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Apakah Anda yakin ingin melepas arahan artikel <strong className="text-slate-800 font-semibold">"{title}"</strong>?
          </p>
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl mb-5 text-xs text-amber-900 leading-relaxed">
            Status naskah akan dikembalikan menjadi <span className="font-bold text-emerald-700">Tersedia</span>. Gembok kepemilikan Anda akan dicabut dan arahan artikel ini dapat diambil kembali oleh editor lain.
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Ya, Lepas Naskah
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
