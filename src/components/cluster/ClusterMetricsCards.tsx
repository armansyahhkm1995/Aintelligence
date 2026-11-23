import React from 'react'
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react'

interface ClusterMetricsCardsProps {
  totalCount: number
  safeCount: number
  cannibalismCount: number
  activeFilter?: string
  onFilterSelect?: (status: string) => void
}

export const ClusterMetricsCards: React.FC<ClusterMetricsCardsProps> = ({
  totalCount,
  safeCount,
  cannibalismCount,
  activeFilter = '',
  onFilterSelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Card 1: Total Topik Tergenerate AI */}
      <div
        onClick={() => onFilterSelect && onFilterSelect('')}
        className={`bg-white border rounded-xl p-4 shadow-xs transition-all ${
          onFilterSelect ? 'cursor-pointer hover:shadow-sm' : ''
        } ${
          activeFilter === ''
            ? 'border-blue-300 ring-2 ring-blue-500/10'
            : 'border-[#DBEAFE] hover:border-blue-200'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-600">Total Topik Tergenerate AI</span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1866EF]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          {totalCount}{' '}
          <span className="text-xs font-medium text-slate-400">Kelompok Topik</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          Dipetakan otomatis dari dataset kata kunci riset
        </div>
      </div>

      {/* Card 2: Topik Aman (Siap Brief) */}
      <div
        onClick={() => onFilterSelect && onFilterSelect(activeFilter === 'Aman' ? '' : 'Aman')}
        className={`bg-white border rounded-xl p-4 shadow-xs transition-all ${
          onFilterSelect ? 'cursor-pointer hover:shadow-sm' : ''
        } ${
          activeFilter === 'Aman'
            ? 'border-emerald-400 ring-2 ring-emerald-500/10'
            : 'border-[#A7F3D0] hover:border-emerald-300'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-[#15803D]">Topik Aman (Siap Brief)</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#15803D]">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl font-bold text-[#15803D] tracking-tight">
          {safeCount}{' '}
          <span className="text-xs font-medium text-emerald-600/70">Topik</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          Bebas risiko kanibalisasi & siap diproduksi redaksi
        </div>
      </div>

      {/* Card 3: Butuh Resolusi (Kanibalisasi) */}
      <div
        onClick={() =>
          onFilterSelect &&
          onFilterSelect(activeFilter === 'Butuh Resolusi' ? '' : 'Butuh Resolusi')
        }
        className={`bg-white border rounded-xl p-4 shadow-xs transition-all ${
          onFilterSelect ? 'cursor-pointer hover:shadow-sm' : ''
        } ${
          activeFilter === 'Butuh Resolusi'
            ? 'border-amber-400 ring-2 ring-amber-500/10'
            : 'border-[#FDE68A] hover:border-amber-300'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-[#B45309]">Flag Kanibalisasi Internal</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#B45309]">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-2xl font-bold text-[#B45309] tracking-tight">
          {cannibalismCount}{' '}
          <span className="text-xs font-medium text-amber-600/70">Topik</span>
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          Maksud pencarian bersaing & butuh tindakan resolusi
        </div>
      </div>
    </div>
  )
}
