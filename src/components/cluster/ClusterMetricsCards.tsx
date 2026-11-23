import React from 'react'

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
      {/* Total Topik Card */}
      <div
        onClick={() => onFilterSelect && onFilterSelect('')}
        className={`bg-[#EFF6FF]/50 border border-[#BFDBFE] rounded-xl p-4 flex items-center justify-between shadow-2xs transition-all ${
          onFilterSelect ? 'cursor-pointer hover:bg-[#EFF6FF]/80' : ''
        } ${activeFilter === '' ? 'ring-2 ring-[#1866EF]/30' : ''}`}
      >
        <span className="text-xs font-bold text-[#1D4ED8]">Total Topik AI</span>
        <span className="text-2xl font-extrabold text-[#1D4ED8]">{totalCount}</span>
      </div>

      {/* Topik Aman Card (Sama persis seperti card Layak) */}
      <div
        onClick={() => onFilterSelect && onFilterSelect(activeFilter === 'Aman' ? '' : 'Aman')}
        className={`bg-[#ECFDF5]/50 border border-[#A7F3D0] rounded-xl p-4 flex items-center justify-between shadow-2xs transition-all ${
          onFilterSelect ? 'cursor-pointer hover:bg-[#ECFDF5]/80' : ''
        } ${activeFilter === 'Aman' ? 'ring-2 ring-[#15803D]/30' : ''}`}
      >
        <span className="text-xs font-bold text-[#15803D]">Topik Aman (Siap Brief)</span>
        <span className="text-2xl font-extrabold text-[#15803D]">{safeCount}</span>
      </div>

      {/* Kanibalisasi Card (Sama persis seperti card Perlu Ditinjau) */}
      <div
        onClick={() =>
          onFilterSelect &&
          onFilterSelect(activeFilter === 'Butuh Resolusi' ? '' : 'Butuh Resolusi')
        }
        className={`bg-[#FFFBEB]/50 border border-[#FDE68A] rounded-xl p-4 flex items-center justify-between shadow-2xs transition-all ${
          onFilterSelect ? 'cursor-pointer hover:bg-[#FFFBEB]/80' : ''
        } ${activeFilter === 'Butuh Resolusi' ? 'ring-2 ring-[#B45309]/30' : ''}`}
      >
        <span className="text-xs font-bold text-[#B45309]">Butuh Resolusi (Kanibalisasi)</span>
        <span className="text-2xl font-extrabold text-[#B45309]">{cannibalismCount}</span>
      </div>
    </div>
  )
}
