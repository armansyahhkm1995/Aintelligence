import React from 'react'
import { LogOut } from 'lucide-react'

interface DraftReleaseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DraftReleaseModal: React.FC<DraftReleaseModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Lepas Draft Artikel?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Apakah Anda yakin ingin melepas draft artikel ini? Jika Anda melepasnya, draft artikel ini akan berstatus <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Tersedia</span> kembali dan dapat dipakai serta dikerjakan oleh editor lain.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
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
              className="px-4 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Ya, Lepas Draft Artikel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
