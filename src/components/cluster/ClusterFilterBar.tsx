import React from 'react'
import { Search, ChevronDown } from 'lucide-react'

interface ClusterFilterBarProps {
  searchQuery: string
  onSearchChange: (val: string) => void
  filterStatus: string
  onStatusChange: (val: string) => void
  filterIntent: string
  onIntentChange: (val: string) => void
  filterTopic: string
  onTopicChange: (val: string) => void
  onClearFilters: () => void
}

export const ClusterFilterBar: React.FC<ClusterFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterIntent,
  onIntentChange,
  filterTopic,
  onTopicChange,
  onClearFilters,
}) => {
  const hasActiveFilters = Boolean(searchQuery || filterStatus || filterIntent || filterTopic)

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-4 shadow-xs space-y-3">
      {/* Search Input on Top */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari kelompok topik atau kata kunci..."
          className="w-full h-[40px] pl-10 pr-3 text-xs bg-white border border-[#DBEAFE] rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Dropdowns Row + Clear Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Filter Status */}
        <div className="relative flex-1 w-full">
          <select
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
              filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
            }`}
          >
            <option value="">Semua Status</option>
            <option value="Aman">Aman (Siap Brief)</option>
            <option value="Butuh Resolusi">Butuh Resolusi (Kanibalisasi)</option>
            <option value="Bentrok CMS RRI">Bentrok CMS RRI</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Filter Intent */}
        <div className="relative flex-1 w-full">
          <select
            value={filterIntent}
            onChange={(e) => onIntentChange(e.target.value)}
            className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
              filterIntent ? 'text-slate-900 font-medium' : 'text-slate-500'
            }`}
          >
            <option value="">Semua Intent</option>
            <option value="Informasional">Informasional</option>
            <option value="Komersial">Komersial</option>
            <option value="Transaksional">Transaksional</option>
            <option value="Navigasional">Navigasional</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Filter Topik Induk */}
        <div className="relative flex-1 w-full">
          <select
            value={filterTopic}
            onChange={(e) => onTopicChange(e.target.value)}
            className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
              filterTopic ? 'text-slate-900 font-medium' : 'text-slate-500'
            }`}
          >
            <option value="">Semua Topik Induk</option>
            <option value="Investasi & Keuangan">Investasi & Keuangan</option>
            <option value="Layanan Publik">Layanan Publik</option>
            <option value="Ekonomi Makro">Ekonomi Makro</option>
          </select>
          <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Bersihkan Filter Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full sm:w-auto h-[40px] px-4 border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  )
}
