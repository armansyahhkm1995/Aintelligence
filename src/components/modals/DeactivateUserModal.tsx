import React from 'react'
import { useApp } from '../../context/AppContext'
import { UserX, X } from 'lucide-react'

export const DeactivateUserModal: React.FC = () => {
  const {
    isNonaktifkanPenggunaOpen,
    setIsNonaktifkanPenggunaOpen,
    userToDeactivate,
    deactivateUser,
  } = useApp()

  if (!isNonaktifkanPenggunaOpen || !userToDeactivate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <UserX className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Nonaktifkan Pengguna</h2>
          </div>
          <button
            onClick={() => setIsNonaktifkanPenggunaOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Apa Anda yakin ingin menonaktifkan pengguna{' '}
            <strong className="text-slate-900">{userToDeactivate.name}</strong>? Pengguna tidak akan bisa mengakses dasbor Riset & Produksi Berita sampai Anda aktifkan kembali akunnya
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsNonaktifkanPenggunaOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => deactivateUser(userToDeactivate.id)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Ya, Nonaktifkan Pengguna
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
