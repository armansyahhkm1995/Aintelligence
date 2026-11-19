import React from 'react'
import { UserRole } from '../../types'

interface DashboardRecentActivitySectionProps {
  userRole?: UserRole
}

export const DashboardRecentActivitySection: React.FC<DashboardRecentActivitySectionProps> = ({
  userRole = 'admin',
}) => {
  return (
    <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-4">
      {/* Header Row */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Aktivitas Terbaru
          </h2>
          <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
            4 Aktivitas Redaksi
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {userRole === 'editor'
            ? 'Riwayat pengerjaan, persetujuan arahan, dan penyalinan draf berita oleh tim editor.'
            : 'Riwayat pengerjaan, persetujuan arahan, penyalinan draf, dan intervensi editorial terkini.'}
        </p>
      </div>

      {/* List of recent activities */}
      <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
        {/* Item 1: Salin Draf Berita */}
        <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                Salin Draf Berita
              </span>
              <span className="text-xs text-slate-400">12 menit yang lalu</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 leading-snug">
              Menyalin Draf Berita: Panduan Aman Memulai Investasi Reksadana untuk Gen-Z
            </h3>
            <p className="text-xs text-slate-500">
              Teks naskah berita berhasil disalin ke clipboard untuk siap dipublikasikan ke CMS portal berita RRI.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-semibold text-slate-800">Ahmad Fauzi</div>
            <div className="text-[11px] text-slate-400">Role: Editor</div>
          </div>
        </div>

        {/* Item 2: Persetujuan Arahan */}
        <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                Persetujuan Arahan
              </span>
              <span className="text-xs text-slate-400">25 menit yang lalu</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 leading-snug">
              Menyetujui Arahan Artikel: Cara Mengurus Kartu Keluarga dan Persyaratannya
            </h3>
            <p className="text-xs text-slate-500">
              Disetujui untuk lanjut ke proses pembuatan draf otomatis AI tanpa perubahan outline.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-semibold text-slate-800">Budi Santoso</div>
            <div className="text-[11px] text-slate-400">Role: Editor</div>
          </div>
        </div>

        {/* Item 3: Buat Ulang Arahan */}
        <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFFBEB] text-[#B45309] border border-amber-200">
                Buat Ulang Arahan
              </span>
              <span className="text-xs text-slate-400">45 menit yang lalu</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 leading-snug">
              Meminta Buat Ulang Arahan: Strategi Investasi Reksadana Saham bagi Pemula
            </h3>
            <p className="text-xs text-slate-500">
              Meminta regenerasi outline arahan editorial dengan fokus pengayaan sudut pandang literasi keuangan daerah.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-semibold text-slate-800">Siti Rahmawati</div>
            <div className="text-[11px] text-slate-400">Role: Editor</div>
          </div>
        </div>

        {/* Item 4: Tambah Pertanyaan Utama dengan AI */}
        <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                Pertanyaan Utama AI
              </span>
              <span className="text-xs text-slate-400">1 jam yang lalu</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900 leading-snug">
              Menambah Pertanyaan Utama dengan AI: Syarat dan Dokumen Pembuatan Paspor 2026
            </h3>
            <p className="text-xs text-slate-500">
              Menambahkan 2 pertanyaan investigasi baru menggunakan asisten AI (total 8/10 pertanyaan terpasang).
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-semibold text-slate-800">Dewi Lestari</div>
            <div className="text-[11px] text-slate-400">Role: Editor</div>
          </div>
        </div>
      </div>
    </div>
  )
}
