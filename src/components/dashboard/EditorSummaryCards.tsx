import React from 'react'

interface EditorSummaryCardsProps {
  onNavigateBrief: () => void
  onNavigateDraft: () => void
}

export const EditorSummaryCards: React.FC<EditorSummaryCardsProps> = ({
  onNavigateBrief,
  onNavigateDraft,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card 1: Arahan Artikel Diambil */}
      <div
        onClick={onNavigateBrief}
        className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[110px]"
      >
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Arahan Artikel
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">
            Sedang Anda Ambil
          </h3>
        </div>

        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            3 Naskah
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Brief yang sedang Anda tinjau dan perbaiki outline-nya.
          </p>
        </div>
      </div>

      {/* Card 2: Draf Artikel Diambil */}
      <div
        onClick={onNavigateDraft}
        className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between min-h-[110px]"
      >
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Draf Artikel
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">
            Sedang Anda Ambil
          </h3>
        </div>

        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            2 Naskah
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Draf berita yang sedang Anda sunting dan periksa kualitasnya.
          </p>
        </div>
      </div>
    </div>
  )
}
