import React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface ClusterPaginationProps {
  totalItems?: number
  currentPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export const ClusterPagination: React.FC<ClusterPaginationProps> = ({
  totalItems = 45,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="p-3.5 bg-white border border-[#DBEAFE] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shadow-xs">
      <div className="flex items-center justify-between w-full sm:w-auto gap-2">
        <span>
          Menampilkan 1-{Math.min(pageSize, totalItems)} dari {totalItems} kelompok topik
        </span>
        <div className="relative">
          <select
            value={`${pageSize} / hal`}
            onChange={(e) => onPageSizeChange?.(parseInt(e.target.value) || 10)}
            className="h-[28px] pl-2 pr-6 bg-white border border-[#DBEAFE] rounded text-xs text-slate-700 appearance-none cursor-pointer"
          >
            <option value="10 / hal">10 / hal</option>
            <option value="25 / hal">25 / hal</option>
            <option value="50 / hal">50 / hal</option>
          </select>
          <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
          className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-500 cursor-pointer disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center bg-[#1866EF] text-white font-semibold rounded cursor-pointer"
        >
          1
        </button>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
        >
          2
        </button>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
        >
          3
        </button>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
        >
          4
        </button>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
        >
          5
        </button>
        <button
          type="button"
          onClick={() => onPageChange?.(currentPage + 1)}
          className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-500 cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
