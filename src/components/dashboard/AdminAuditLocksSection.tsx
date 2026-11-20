import React from 'react'
import { ChevronRight, User, Clock } from 'lucide-react'

interface AdminAuditLocksSectionProps {
  onNavigateBrief: () => void
  onNavigateDraft: () => void
}

export const AdminAuditLocksSection: React.FC<AdminAuditLocksSectionProps> = ({
  onNavigateBrief,
  onNavigateDraft,
}) => {
  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Audit Kepemilikan Naskah & Status Kunci Editor
          </h2>
          <p className="text-xs text-slate-500 max-w-4xl leading-relaxed mt-1">
            Setiap kali editor masuk ke tampilan detail suatu Arahan Artikel atau Draf Berita, sistem secara otomatis mengunci naskah tersebut atas nama editor yang bersangkutan. Naskah yang terkunci tidak dapat dibuka atau diubah oleh editor lain sampai pemilik naskah menekan tombol Lepas Arahan / Draft Artikel.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-blue-50 text-[#1866EF] text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            6 Naskah Dikunci
          </span>
        </div>
      </div>

      {/* Dual Grid: Arahan Artikel vs Draf Artikel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        {/* Kolom 1: Arahan Artikel (Brief) */}
        <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50/40">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1866EF]"></span>
              <span className="text-xs font-bold text-slate-900">Arahan Artikel Terkini</span>
            </div>
            <button
              type="button"
              onClick={onNavigateBrief}
              className="text-[11px] font-semibold text-[#1866EF] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'BRF-001',
                title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
                editor: 'Budi Santoso',
                status: 'Disetujui oleh Budi Santoso',
                statusType: 'approved',
                time: '10 menit lalu',
              },
              {
                id: 'BRF-003',
                title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik 2026',
                editor: 'Siti Rahmawati',
                status: 'Diambil oleh Siti Rahmawati',
                statusType: 'claimed',
                time: '25 menit lalu',
              },
              {
                id: 'BRF-005',
                title: 'Strategi Investasi Reksadana Saham bagi Pemula',
                editor: 'Ahmad Fauzi',
                status: 'Dibuat ulang oleh Ahmad Fauzi',
                statusType: 'regen',
                time: '45 menit lalu',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={onNavigateBrief}
                className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:border-blue-300 hover:shadow-2xs transition-all cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    {item.editor !== '-' ? (
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <User className="w-3 h-3 text-slate-400" />
                        {item.editor}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Belum ada editor</span>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${
                    item.statusType === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : item.statusType === 'approved'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : item.statusType === 'regen'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom 2: Draf Artikel (Draft) */}
        <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50/40">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-900">Draf Artikel Terkini</span>
            </div>
            <button
              type="button"
              onClick={onNavigateDraft}
              className="text-[11px] font-semibold text-[#1866EF] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                id: 'DFT-001',
                title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
                editor: 'Siti Rahmawati',
                status: 'Diambil oleh Siti Rahmawati',
                statusType: 'claimed',
                time: '15 menit lalu',
              },
              {
                id: 'DFT-003',
                title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
                editor: 'Dewi Lestari',
                status: 'Diambil oleh Dewi Lestari',
                statusType: 'claimed',
                time: '30 menit lalu',
              },
              {
                id: 'DFT-005',
                title: 'Strategi Investasi Reksadana Saham bagi Pemula',
                editor: 'Ahmad Fauzi',
                status: 'Diambil oleh Ahmad Fauzi',
                statusType: 'claimed',
                time: '50 menit lalu',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={onNavigateDraft}
                className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:border-emerald-300 hover:shadow-2xs transition-all cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    {item.editor !== '-' ? (
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <User className="w-3 h-3 text-slate-400" />
                        {item.editor}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Belum ada editor</span>
                    )}
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${
                    item.statusType === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
