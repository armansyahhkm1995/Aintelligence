import React from 'react'

interface BriefLockAlertModalProps {
  isOpen: boolean
  lockedInfo: { title: string; editor: string } | null
  onClose: () => void
}

export const BriefLockAlertModal: React.FC<BriefLockAlertModalProps> = ({
  isOpen,
  lockedInfo,
  onClose,
}) => {
  if (!isOpen || !lockedInfo) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Arahan Artikel Sudah Diambil
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Arahan artikel <strong className="text-slate-800 font-semibold">"{lockedInfo.title}"</strong> saat ini telah diambil dan dikunci oleh:
          </p>
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-xs">
              {lockedInfo.editor.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{lockedInfo.editor}</p>
              <p className="text-[10px] text-amber-700 font-medium">Sedang meninjau / membuat ulang arahan artikel</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mb-5 leading-relaxed">
            Anda baru dapat mengambil atau melihat arahan artikel ini setelah editor tersebut melepaskannya.
          </p>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-xs font-bold text-white bg-[#1866EF] hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
