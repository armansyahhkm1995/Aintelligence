import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { AlertTriangle, Lock, X, ExternalLink } from 'lucide-react'

export const ResolusiBentrokModal: React.FC = () => {
  const {
    isResolusiBentrokOpen,
    setIsResolusiBentrokOpen,
    activeCluster,
    resolveCMSConflict,
  } = useApp()

  const [reason, setReason] = useState(
    'Meskipun kata kunci bermiripan, cluster ini memiliki fokus target waktu dan instrumen yang berbeda (edisi tahun 2026 dengan regulasi OJK terbaru). Berita ini tidak akan memicu kanibalisasi SEO di portal RRI.'
  )

  if (!isResolusiBentrokOpen || !activeCluster) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resolveCMSConflict(activeCluster.id, reason)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-700" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Konfirmasi Pembuatan Artikel Serupa
            </h2>
          </div>
          <button
            onClick={() => setIsResolusiBentrokOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Danger Warning Banner: text-red-700, bg-red-50, border-red-200 */}
          <p className="text-xs text-red-700 leading-relaxed bg-red-50 p-3 rounded-lg border border-red-200">
            Sistem mendeteksi topik ini sudah pernah dibahas di portal CMS RRI. Pastikan artikel baru ini memiliki sudut pandang yang berbeda.
          </p>

          {/* Comparison Box: bg-red-50, border-red-200, text-red-700 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-red-50/50 border border-red-200 rounded-lg p-3.5">
            {/* Left: Usulan Topik Baru */}
            <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-red-200 pb-3 sm:pb-0 sm:pr-3">
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                Usulan Topik Baru
              </span>
              <div className="text-xs font-bold text-slate-900">
                {activeCluster.name}
              </div>
              <div className="text-[11px] text-slate-700 space-y-0.5 pt-1">
                <div>
                  <span className="font-semibold text-slate-900">Pilar:</span>{' '}
                  {typeof activeCluster.pillarKeyword === 'object' && activeCluster.pillarKeyword !== null
                    ? activeCluster.pillarKeyword.text
                    : String(activeCluster.pillarKeyword || '')}
                </div>
                <div className="text-slate-600 text-[10px]">
                  Pendukung:{' '}
                  {Array.isArray(activeCluster.supportingKeywords)
                    ? activeCluster.supportingKeywords
                        .map((k) => (typeof k === 'object' && k !== null ? k.text : String(k)))
                        .join(', ')
                    : ''}
                </div>
              </div>
            </div>

            {/* Right: Artikel Terbit di CMS RRI */}
            <div className="space-y-1.5 sm:pl-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                  Artikel Terbit di CMS RRI
                </span>
                <span className="text-[10px] text-red-700 hover:underline flex items-center gap-0.5 cursor-pointer font-medium">
                  <span>Lihat sumber</span>
                  <ExternalLink className="w-2.5 h-2.5 text-red-700" />
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900">
                {activeCluster.cmsArticleTitle || 'Mulai Investasi Reksadana'}
              </div>
              <div className="text-[11px] text-slate-600">
                Terbit: {activeCluster.cmsPublishDate || '12 Jan 2026'}
              </div>
            </div>
          </div>

          {/* Reason Textarea (Mandatory) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-800">
                Alasan Pembuatan Artikel Baru (Wajib Diisi) <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">Minimal 15 karakter</span>
            </div>
            <textarea
              required
              minLength={15}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Artikel lama adalah edisi 2024, sementara cluster ini khusus untuk update regulasi tahun 2027..."
              className="w-full p-2.5 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans leading-relaxed"
            />
          </div>

          {/* Audit Log Transparency Message */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Tindakan pemaksaan (override) ini beserta alasan Anda akan dicatat secara permanen di Log Audit terenkripsi untuk evaluasi kualitas konten.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsResolusiBentrokOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={reason.trim().length < 15}
              className="px-4 py-2 bg-[#B91C1C] hover:bg-rose-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Tetap Lanjutkan Pembuatan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
