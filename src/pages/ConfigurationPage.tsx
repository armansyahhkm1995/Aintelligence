import React from 'react'
import {
  Clock,
  Sparkles,
} from 'lucide-react'

export const ConfigurationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Header Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            Konfigurasi & Penggunaan Kuota LLM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Pemantauan sisa alokasi kuota komputasi AI tahunan dan pembagian batas kuota bulanan redaksi secara proporsional.
          </p>
        </div>
      </div>

      {/* 2. Visual Metric Cards: Sisa Kuota Tahunan & Kuota Bulanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Sisa Kuota Tahunan */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Sisa Kuota Tahunan</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600">71.5%</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Aman
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '71.5%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Periode aktif: 1 Januari 2026 – 31 Desember 2026
            </p>
          </div>
        </div>

        {/* Card 2: Batas Bulanan */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Batas Bulanan</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-600">36.0%</span>
              <span className="text-xs font-medium text-slate-500">Sisa Kuota Bulanan</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '64%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Akan direset otomatis setiap tanggal 1 di tiap awal bulan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
