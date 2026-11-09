import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { AlertCircle, Lock, X } from 'lucide-react'

export const TolakClusterModal: React.FC = () => {
  const {
    isTolakClusterOpen,
    setIsTolakClusterOpen,
    activeCluster,
    rejectCluster,
  } = useApp()

  const [reason, setReason] = useState(
    'Meskipun kata kunci bermiripan, cluster ini memiliki fokus target waktu dan instrumen yang berbeda (edisi tahun 2026 dengan regulasi OJK terbaru). Berita ini tidak akan memicu kanibalisasi SEO di portal RRI.'
  )

  if (!isTolakClusterOpen || !activeCluster) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    rejectCluster(activeCluster.id, reason)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Tolak Cluster</h2>
          </div>
          <button
            onClick={() => setIsTolakClusterOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Cluster
            </span>
            <div className="text-sm font-bold text-slate-900">{activeCluster.name}</div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">
              Alasan Penolakan (Wajib Diisi) <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Keputusan ini akan tercatat di Audit Log.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsTolakClusterOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!reason.trim()}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Ya, Tolak Cluster
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
