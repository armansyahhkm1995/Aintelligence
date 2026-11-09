import React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

export const NotifikasiPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">100 Notifikasi</h1>
        <p className="text-xs text-slate-500 mt-1">
          Lihat dan kelola aktivitas sustem
        </p>
      </div>

      {/* Notifications Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Section: Hari Ini */}
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Hari Ini</h2>
          <div className="space-y-3">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-800">
                  Aturan kelayakan berhasil disimpan
                </span>
              </div>
              <span className="text-[11px] text-slate-400">2 menit lalu</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-800">
                  Cluster berhasil digabung. Menghitung ulang volume SEO...
                </span>
              </div>
              <span className="text-[11px] text-slate-400">2 menit lalu</span>
            </div>
          </div>
        </div>

        {/* Section: Kemarin */}
        <div className="p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Kemarin</h2>
          <div className="space-y-3">
            {/* Item 3 */}
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-800">
                  Brief disetujui! Draf sedang ditulis oleh AI
                </span>
              </div>
              <span className="text-[11px] text-slate-400">12 Okt 2026, 14:00</span>
            </div>

            {/* Item 4 */}
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-xs font-medium text-slate-800">
                  Format tidak didukung. Harap pastikan Anda mengunggah file berekstensi .csv (bukan .xlsx)
                </span>
              </div>
              <span className="text-[11px] text-slate-400">12 Okt 2026, 14:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
