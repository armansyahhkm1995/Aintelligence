import React from 'react'
import { BriefTableRow } from './types'

interface BriefClaimModalProps {
  isOpen: boolean
  item: BriefTableRow | null
  currentUserName: string
  onClose: () => void
  onConfirm: () => void
}

export const BriefClaimModal: React.FC<BriefClaimModalProps> = ({
  isOpen,
  item,
  currentUserName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Ambil & Kunci Arahan Artikel?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Arahan artikel <strong className="text-slate-800 font-semibold">"{item.title}"</strong> saat ini berstatus <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Tersedia</span>.
          </p>
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl mb-5 text-xs text-blue-900 leading-relaxed">
            Ketika Anda mengambil arahan artikel ini, sistem akan menguncinya atas nama Anda (<span className="font-bold">{currentUserName}</span>). Editor lain tidak dapat masuk atau mengeditnya sampai Anda mengklik tombol <strong>Lepas Arahan Artikel</strong>.
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
              className="px-4 py-2 text-xs font-bold text-white bg-[#1866EF] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Ambil & Kunci Arahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
