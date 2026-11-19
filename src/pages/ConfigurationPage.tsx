import React, { useState } from 'react'
import {
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'

interface MonthQuotaItem {
  month: string
  fullName: string
  annualShare: string // e.g. "8.33%"
  usedPercent: number // 0-100% of the monthly allocation
  status: 'passed' | 'current' | 'upcoming'
}

export const ConfigurationPage: React.FC = () => {
  // Monthly breakdown: 12 months with 8.33% annual quota allocation each
  const [monthlyQuotas] = useState<MonthQuotaItem[]>([
    { month: 'Jan', fullName: 'Januari 2026', annualShare: '8.33%', usedPercent: 72, status: 'passed' },
    { month: 'Feb', fullName: 'Februari 2026', annualShare: '8.33%', usedPercent: 81, status: 'passed' },
    { month: 'Mar', fullName: 'Maret 2026', annualShare: '8.33%', usedPercent: 65, status: 'passed' },
    { month: 'Apr', fullName: 'April 2026', annualShare: '8.33%', usedPercent: 78, status: 'passed' },
    { month: 'Mei', fullName: 'Mei 2026', annualShare: '8.33%', usedPercent: 84, status: 'passed' },
    { month: 'Jun', fullName: 'Juni 2026', annualShare: '8.33%', usedPercent: 69, status: 'passed' },
    { month: 'Jul', fullName: 'Juli 2026', annualShare: '8.33%', usedPercent: 74, status: 'passed' },
    { month: 'Agu', fullName: 'Agustus 2026', annualShare: '8.33%', usedPercent: 88, status: 'passed' },
    { month: 'Sep', fullName: 'September 2026', annualShare: '8.33%', usedPercent: 62, status: 'passed' },
    { month: 'Okt', fullName: 'Oktober 2026', annualShare: '8.33%', usedPercent: 76, status: 'passed' },
    { month: 'Nov', fullName: 'November 2026 (Bulan Berjalan)', annualShare: '8.33%', usedPercent: 64, status: 'current' },
    { month: 'Des', fullName: 'Desember 2026', annualShare: '8.33%', usedPercent: 0, status: 'upcoming' },
  ])

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

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Status Kuota: Normal (71.5% Tersedia)</span>
        </div>
      </div>

      {/* 2. Visual Metric Cards: Sisa Kuota Tahunan & Kuota Bulan Berjalan */}
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

        {/* Card 2: Bulan Berjalan (November) */}
        <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Batas Bulan Ini (Nov 2026)</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-600">36.0%</span>
              <span className="text-xs font-medium text-slate-500">Sisa Kuota Bulan Ini</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '64%' }} />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Terpakai 64.0% dari alokasi proporsional bulan November
            </p>
          </div>
        </div>
      </div>

      {/* 3. Monthly Quota Allocation Grid (12 Bulan / 8.33% Per Bulan) */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Pembagian Limit Kuota Bulanan (12 Bulan)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Setiap bulan memiliki alokasi proporsional sebesar 8.33% dari total kuota tahunan (dinormalisasi 100% per batas bulanan).
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-auto border border-slate-200">
            12 Bulan Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {monthlyQuotas.map((item) => {
            const isCurrent = item.status === 'current'
            const isPassed = item.status === 'passed'
            const remainingPercent = 100 - item.usedPercent

            return (
              <div
                key={item.month}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'border-[#1866EF] bg-blue-50/40 ring-2 ring-[#1866EF]/20 shadow-xs'
                    : isPassed
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-dashed border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">{item.month}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({item.annualShare})</span>
                  </div>
                  {isCurrent ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1866EF] text-white">
                      Bulan Ini
                    </span>
                  ) : isPassed ? (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      Selesai
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Cadangan
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-slate-500">Terpakai:</span>
                    <span className="font-bold text-slate-900">{item.usedPercent}%</span>
                  </div>

                  <div className="mt-1.5 w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${
                        isCurrent
                          ? 'bg-[#1866EF]'
                          : item.usedPercent > 80
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.usedPercent}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Sisa batas:</span>
                    <span className="font-semibold text-slate-700">{remainingPercent}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
