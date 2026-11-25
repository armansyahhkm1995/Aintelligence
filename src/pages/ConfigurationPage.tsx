import React from 'react'
import {
  Clock,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
  Bell,
  ArrowRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const ConfigurationPage: React.FC = () => {
  const { isTokenExhausted, toggleTokenExhausted, setCurrentPage } = useApp()

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
            <span className={`p-1.5 rounded-lg ${isTokenExhausted ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold ${isTokenExhausted ? 'text-red-600' : 'text-emerald-600'}`}>
                {isTokenExhausted ? '0.0%' : '71.5%'}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  isTokenExhausted
                    ? 'text-red-700 bg-red-50 border-red-200'
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}
              >
                {isTokenExhausted ? 'Habis' : 'Aman'}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${isTokenExhausted ? 'bg-red-500' : 'bg-emerald-500'}`}
                style={{ width: isTokenExhausted ? '0%' : '71.5%' }}
              />
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
            <span className={`p-1.5 rounded-lg ${isTokenExhausted ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-extrabold ${isTokenExhausted ? 'text-red-600' : 'text-indigo-600'}`}>
                {isTokenExhausted ? '0.0%' : '36.0%'}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {isTokenExhausted ? 'Batas Terlampaui (0 Token)' : 'Sisa Kuota Bulanan'}
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${isTokenExhausted ? 'bg-red-500' : 'bg-indigo-600'}`}
                style={{ width: isTokenExhausted ? '100%' : '64%' }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Akan direset otomatis setiap tanggal 1 di tiap awal bulan.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Panel Uji Simulasi Status Token Habis */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Simulasi Pengujian Kuota Token AI</span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                isTokenExhausted
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              Status: {isTokenExhausted ? 'Token Habis' : 'Token Tersedia'}
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Aktifkan simulasi token habis untuk memverifikasi penonaktifan tombol unggah berkas CSV, klasifikasi kata kunci AI, pembuatan kelompok topik AI, dan pembuatan ulang arahan/draf berita.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleTokenExhausted}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs shrink-0 ${
            isTokenExhausted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isTokenExhausted ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pulihkan Token (Token Tersedia)</span>
            </>
          ) : (
            <>
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Simulasikan Token Habis</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Panel Dokumentasi & Katalog Toast Notifikasi */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Dokumentasi Toast Notifikasi Sistem</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#1866EF] border border-blue-200">
              Developer Tool
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Daftar lengkap seluruh notifikasi toast (Success, Warning, Error) untuk semua modul dan skenario edge case. Dilengkapi tombol pengujian langsung dan cuplikan kode implementasi untuk tim pengembang.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage('toast_doc')}
          className="px-4 py-2.5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs shrink-0"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Lihat Daftar Toast</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
