import React from 'react'

interface ClusterMetricsCardsProps {
  totalCount: number
  safeCount: number
  cannibalismCount: number
}

export const ClusterMetricsCards: React.FC<ClusterMetricsCardsProps> = ({
  totalCount,
  safeCount,
  cannibalismCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Topik Card */}
      <div className="bg-[#EFF6FF]/50 border border-[#BFDBFE] rounded-xl p-4 flex items-center justify-between shadow-2xs">
        <span className="text-xs font-bold text-[#1D4ED8]">Total Topik AI</span>
        <span className="text-2xl font-extrabold text-[#1D4ED8]">{totalCount}</span>
      </div>

      {/* Topik Aman Card (Sama persis seperti card Layak) */}
      <div className="bg-[#ECFDF5]/50 border border-[#A7F3D0] rounded-xl p-4 flex items-center justify-between shadow-2xs">
        <span className="text-xs font-bold text-[#15803D]">Topik Aman (Siap Brief)</span>
        <span className="text-2xl font-extrabold text-[#15803D]">{safeCount}</span>
      </div>

      {/* Kanibalisasi Card (Sama persis seperti card Perlu Ditinjau) */}
      <div className="bg-[#FFFBEB]/50 border border-[#FDE68A] rounded-xl p-4 flex items-center justify-between shadow-2xs">
        <span className="text-xs font-bold text-[#B45309]">Butuh Resolusi (Kanibalisasi)</span>
        <span className="text-2xl font-extrabold text-[#B45309]">{cannibalismCount}</span>
      </div>
    </div>
  )
}
