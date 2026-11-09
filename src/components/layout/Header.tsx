import React from 'react'
import { useApp, AppPage } from '../../context/AppContext'
import { Bell } from 'lucide-react'

const PAGE_NAMES: Record<AppPage, string> = {
  dashboard: 'Beranda',
  impor: 'Impor CSV Semrush',
  keyword: 'Manajemen Keyword',
  cluster: 'Cluster Topik',
  brief: 'Tinjauan Brief',
  draft: 'Draf Artikel',
  settings: 'Pengaturan Redaksi',
  users: 'Manajemen Pengguna',
  auditlog: 'Audit Log',
  notifikasi: 'Notifikasi',
}

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp()

  const currentLabel = PAGE_NAMES[currentPage] || 'Beranda'

  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 select-none">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-normal">Riset & Produksi Berita</span>
        <span className="text-slate-300 font-light">/</span>
        <span className="font-medium text-[#1866EF]">{currentLabel}</span>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Button (Outlined Box) */}
        <button
          onClick={() => setCurrentPage('notifikasi')}
          className={`p-2 rounded-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors relative ${
            currentPage === 'notifikasi' ? 'bg-blue-50 border-blue-300 text-blue-600' : ''
          }`}
          title="Notifikasi"
        >
          <Bell className="w-4 h-4 text-slate-700" />
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User Profile (Text only, matching Figma) */}
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs font-semibold text-slate-900">Cameron Newton</span>
          <span className="text-[11px] text-slate-400 font-normal">Admin</span>
        </div>
      </div>
    </header>
  )
}
