import React from 'react'

export const CsvMetricsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Jumlah Baris */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
        <div className="text-xs font-medium text-slate-500 mb-1">
          Jumlah Baris
        </div>
        <div className="text-xl font-bold text-slate-900">842 Baris</div>
        <div className="text-[11px] text-slate-400 mt-1">Total baris data terbaca dari berkas CSV</div>
      </div>

      {/* Card 2: Data yang Terduplikat */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
        <div className="text-xs font-medium text-slate-500 mb-1">
          Data yang Terduplikat
        </div>
        <div className="text-xl font-bold text-[#D97706]">14 Baris</div>
        <div className="text-[11px] text-slate-400 mt-1">Ditemukan query berulang & otomatis difilter</div>
      </div>

      {/* Card 3: Baris yang Tidak Ada Datanya */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
        <div className="text-xs font-medium text-slate-500 mb-1">
          Baris yang Tidak Ada Datanya
        </div>
        <div className="text-xl font-bold text-[#DC2626]">5 Baris</div>
        <div className="text-[11px] text-slate-400 mt-1">Nilai kolom kosong atau tidak lengkap</div>
      </div>
    </div>
  )
}
