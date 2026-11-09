import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { X } from 'lucide-react'

export const SingleOverrideModal: React.FC = () => {
  const {
    isSingleOverrideOpen,
    setIsSingleOverrideOpen,
    targetKeywordForOverride,
    overrideSingleKeyword,
  } = useApp()

  const [newStatus, setNewStatus] = useState<'Layak' | 'Tidak Layak'>('Layak')
  const [reason, setReason] = useState(
    'Topik ini memiliki urgensi publik tinggi dan volume pencarian melonjak di akhir tahun. Layak diangkat menjadi materi liputan mendalam RRI.'
  )

  useEffect(() => {
    if (targetKeywordForOverride) {
      setNewStatus(targetKeywordForOverride.kelayakanAI === 'Layak' ? 'Tidak Layak' : 'Layak')
    }
  }, [targetKeywordForOverride])

  if (!isSingleOverrideOpen || !targetKeywordForOverride) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    overrideSingleKeyword(targetKeywordForOverride.id, newStatus, reason)
  }

  const isCurrentLayak = targetKeywordForOverride.kelayakanAI === 'Layak'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header matching image */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Koreksi Kelayakan Kata Kunci
          </h2>
          <button
            onClick={() => setIsSingleOverrideOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form matching image */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Field 1: Kata kunci */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-900 block">
              Kata kunci
            </label>
            <div className="h-[44px] px-3.5 bg-white border border-[#DBEAFE] rounded-[6px] flex items-center justify-between gap-2">
              <span className="text-xs text-slate-900 font-medium truncate">
                {targetKeywordForOverride.keyword}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border shrink-0 ${
                  isCurrentLayak
                    ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                    : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                }`}
              >
                {targetKeywordForOverride.kelayakanAI}
              </span>
            </div>
          </div>

          {/* Field 2: Pilih Status Kelayakan Baru (Two Big Radio Cards) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-900 block">
              Pilih Status Kelayakan Baru
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Card Layak */}
              <div
                onClick={() => setNewStatus('Layak')}
                className={`h-[48px] px-4 rounded-[6px] border flex items-center gap-2.5 cursor-pointer transition-all ${
                  newStatus === 'Layak'
                    ? 'border-[#10B981] bg-[#ECFDF5]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    newStatus === 'Layak'
                      ? 'border-[#10B981] bg-[#10B981]'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {newStatus === 'Layak' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    newStatus === 'Layak' ? 'text-[#047857]' : 'text-slate-700'
                  }`}
                >
                  Layak
                </span>
              </div>

              {/* Card Tidak Layak */}
              <div
                onClick={() => setNewStatus('Tidak Layak')}
                className={`h-[48px] px-4 rounded-[6px] border flex items-center gap-2.5 cursor-pointer transition-all ${
                  newStatus === 'Tidak Layak'
                    ? 'border-[#EF4444] bg-[#FEF2F2]'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    newStatus === 'Tidak Layak'
                      ? 'border-[#EF4444] bg-[#EF4444]'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {newStatus === 'Tidak Layak' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    newStatus === 'Tidak Layak' ? 'text-[#B91C1C]' : 'text-slate-700'
                  }`}
                >
                  Tidak Layak
                </span>
              </div>
            </div>
          </div>

          {/* Field 3: Alasan Koreksi (Wajib Diisi) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-900 block">
              Alasan Koreksi (Wajib Diisi)
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Topik ini memiliki urgensi publik tinggi dan volume pencarian melonjak di akhir tahun. Layak diangkat menjadi materi liputan mendalam RRI."
              className="w-full p-3 text-xs border border-[#DBEAFE] rounded-[6px] text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
            />
            <p className="text-xs text-slate-400 pt-0.5">
              Keputusan ini akan tercatat di Audit Log.
            </p>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsSingleOverrideOpen(false)}
              className="h-[36px] px-5 border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
