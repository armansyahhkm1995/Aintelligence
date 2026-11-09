import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { X, Trash2 } from 'lucide-react'

export const BulkOverrideModal: React.FC = () => {
  const {
    isBulkOverrideOpen,
    setIsBulkOverrideOpen,
    selectedKeywordIds,
    toggleKeywordSelect,
    keywords,
    bulkOverrideKeywords,
  } = useApp()

  const [newStatus, setNewStatus] = useState<'Layak' | 'Tidak Layak'>('Layak')
  const [reason, setReason] = useState(
    'Topik ini memiliki urgensi publik tinggi dan volume pencarian melonjak di akhir tahun. Layak diangkat menjadi materi liputan mendalam RRI.'
  )

  if (!isBulkOverrideOpen) return null

  // Resolve selected keyword objects
  const selectedKeywords = keywords.filter((k) =>
    (selectedKeywordIds || []).includes(k.id)
  )

  // Fallback demo keywords if none selected
  const displayList =
    selectedKeywords.length > 0
      ? selectedKeywords
      : [
          {
            id: 'KWD-102',
            keyword: 'bantuan subsidi upah pekerja kemnaker',
            kelayakanAI: 'Tidak Layak' as const,
          },
          {
            id: 'KWD-101-demo',
            keyword: 'cara daftar bansos kemensos',
            kelayakanAI: 'Tidak Layak' as const,
          },
        ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    bulkOverrideKeywords(newStatus, reason)
  }

  const handleRemoveKeyword = (id: string) => {
    toggleKeywordSelect(id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 max-h-[95vh] flex flex-col justify-between">
        {/* Header matching figma image */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-slate-900">
            Koreksi Kelayakan Kata Kunci Massal
          </h2>
          <button
            onClick={() => setIsBulkOverrideOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form matching figma screenshot */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Section: List of Keywords */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 block">
              {displayList.length} Kata kunci
            </label>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5">
              {displayList.map((kw) => (
                <div key={kw.id} className="flex items-center gap-2">
                  {/* Left Keyword Box */}
                  <div className="flex-1 h-[44px] px-3.5 bg-white border border-[#DBEAFE] rounded-[6px] flex items-center justify-between gap-2 overflow-hidden">
                    <span className="text-xs text-slate-900 font-medium truncate">
                      {kw.keyword}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 border ${
                        kw.kelayakanAI === 'Layak'
                          ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                          : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                      }`}
                    >
                      {kw.kelayakanAI}
                    </span>
                  </div>

                  {/* Right Red Trash Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw.id)}
                    className="h-[44px] w-[44px] rounded-[6px] border border-[#FEE2E2] bg-white hover:bg-rose-50 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                    title="Hapus kata kunci dari seleksi massal"
                  >
                    <Trash2 className="w-4 h-4 text-[#B91C1C]" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pilih Status Kelayakan Baru (Two Big Radio Cards) */}
          <div className="space-y-1.5 pt-1">
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
                    newStatus === 'Layak' ? 'text-[#15803D]' : 'text-slate-700'
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

          {/* Alasan Koreksi (Wajib Diisi) */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-slate-900 block">
              Alasan Koreksi (Wajib Diisi)
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Masukkan alasan koreksi..."
              className="w-full p-3 text-xs border border-[#DBEAFE] rounded-[6px] text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
            />
            <p className="text-xs text-slate-400 pt-0.5">
              Keputusan ini akan tercatat di Audit Log.
            </p>
          </div>

          {/* Footer Action Buttons matching figma image */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsBulkOverrideOpen(false)}
              className="h-[40px] px-5 border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-[40px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs cursor-pointer"
            >
              Terapkan ke {displayList.length} Kata Kunci
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
