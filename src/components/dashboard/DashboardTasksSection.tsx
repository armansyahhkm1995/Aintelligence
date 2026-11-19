import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface DashboardTasksSectionProps {
  onNavigateBrief: () => void
  onNavigateDraft: () => void
}

export const DashboardTasksSection: React.FC<DashboardTasksSectionProps> = ({
  onNavigateBrief,
  onNavigateDraft,
}) => {
  return (
    <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-5">
      {/* Header Row */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Daftar Tugas
          </h2>
          <span className="bg-[#FFFBEB] text-[#B45309] text-xs font-medium px-2 py-0.5 rounded border border-amber-200">
            7 Butuh Tindakan
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Daftar tugas yang belum diambil dan memerlukan tinjauan Anda.
        </p>
      </div>

      {/* Section 1: Arahan Artikel Menunggu Persetujuan */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              1. Arahan Artikel Menunggu Persetujuan
            </span>
            <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
              4 Menunggu
            </span>
          </div>
          <span className="text-xs sm:text-sm text-slate-400">Target produksi artikel</span>
        </div>

        {/* Brief Items List */}
        <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
          {/* Brief Row 1 */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Panduan Lengkap Mudik Lebaran 2027 Rute Tol Trans-Jawa
              </h3>
              <div className="space-y-1 text-xs pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-medium">Kata Kunci Utama:</span>
                  <span className="font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                    mudik lebaran 2027
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-medium">Kata Kunci Pendukung:</span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    tol trans jawa
                  </span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    tarif tol mudik
                  </span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    tips mudik aman
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateBrief}
              className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
            >
              Tinjau Arahan
            </button>
          </div>

          {/* Brief Row 2 */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Kompilasi Bansos Cair November 2026: Syarat & Cara Cek NIK
              </h3>
              <div className="space-y-1 text-xs pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-medium">Kata Kunci Utama:</span>
                  <span className="font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                    bansos cair november 2026
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-medium">Kata Kunci Pendukung:</span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    syarat bansos 2026
                  </span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    cara cek nik bansos
                  </span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    daftar penerima bansos
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateBrief}
              className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
            >
              Tinjau Arahan
            </button>
          </div>

          {/* Brief Row 3 */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Update Harga Emas Antam Hari Ini dan Tips Investasi Pemula
              </h3>
              <div className="space-y-1 text-xs pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-medium">Kata Kunci Utama:</span>
                  <span className="font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                    harga emas antam hari ini
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-medium">Kata Kunci Pendukung:</span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    tips investasi emas
                  </span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    prediksi harga emas
                  </span>
                  <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    beli emas antam
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateBrief}
              className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
            >
              Tinjau Arahan
            </button>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="border-t border-[#DBEAFE]" />

      {/* Section 2: Draft Artikel Siap Diperiksa */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-900">
              2. Draft Artikel Siap Diperiksa
            </span>
            <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded border border-green-200">
              3 Siap Salin
            </span>
          </div>
          <span className="text-xs sm:text-sm text-slate-400">Naskah AI siap verifikasi editor</span>
        </div>

        {/* Draf Items List */}
        <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
          {/* Draf Row 1 */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini
              </h3>
              <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
                  Skor SEO: 96/100
                </span>
                <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                  Versi Draft: Versi 2
                </span>
                <span className="bg-slate-50 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                  Jumlah Kata: 920 Kata
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                  <span>Butuh Verifikasi Fakta: Konfirmasi nilai statistik resmi OJK terbaru</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                  <span>Kutipan Narasumber Dibutuhkan</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateDraft}
              className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
            >
              Tinjau Draft
            </button>
          </div>

          {/* Draf Row 2 */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027
              </h3>
              <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
                  Skor SEO: 91/100
                </span>
                <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                  Versi Draft: Versi 1
                </span>
                <span className="bg-slate-50 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                  Jumlah Kata: 900 Kata
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                  <span>Kutipan Narasumber Dibutuhkan</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateDraft}
              className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
            >
              Tinjau Draft
            </button>
          </div>

          {/* Draf Row 3 */}
          <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                Katalog Wisata Hidden Gem Dieng Terbaru Pasca Revitalisasi
              </h3>
              <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
                  Skor SEO: 94/100
                </span>
                <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                  Versi Draft: Versi 2
                </span>
                <span className="bg-slate-50 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                  Jumlah Kata: 800 Kata
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                  <span>Butuh Verifikasi Fakta: Konfirmasi nilai statistik resmi OJK terbaru</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onNavigateDraft}
              className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
            >
              Tinjau Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
