import React from 'react'
import { useApp } from '../../context/AppContext'
import { Trash2, X } from 'lucide-react'

export const HapusDraftModal: React.FC = () => {
  const { isHapusDraftOpen, setIsHapusDraftOpen, draft, deleteDraft } = useApp()

  if (!isHapusDraftOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Hapus Draft</h2>
          </div>
          <button
            onClick={() => setIsHapusDraftOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Apakah Anda yakin ingin menghapus draft artikel{' '}
            <strong className="text-slate-900">{draft.title}</strong> ini? Proses tidak dapat dibatalkan dan Anda akan dikembalikan ke laman Cluster topik
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsHapusDraftOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={deleteDraft}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Ya, Hapus Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
