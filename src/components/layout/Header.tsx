import React from 'react'
import { useApp, AppPage } from '../../context/AppContext'
import { Bell, Menu } from 'lucide-react'

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
  const { currentPage, setCurrentPage, setIsMobileNavOpen, currentUser } = useApp()

  const currentLabel = PAGE_NAMES[currentPage] || 'Beranda'

  return (
    <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 select-none">
      {/* Left: Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Buka Menu Navigasi"
          title="Buka Navigasi"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs truncate">
          <span className="hidden sm:inline text-slate-500 font-normal">Riset & Produksi Berita</span>
          <span className="hidden sm:inline text-slate-300 font-light">/</span>
          <span className="font-semibold sm:font-medium text-[#1866EF] truncate">{currentLabel}</span>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
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
        <div className="h-7 w-px bg-slate-200" />

        {/* User Profile (Text only, matching Figma) */}
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs font-semibold text-slate-900 truncate max-w-[110px] sm:max-w-none">
            {currentUser?.name || 'Cameron Newton'}
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            {currentUser?.role === 'editor' ? 'Editor' : 'Admin'}
          </span>
        </div>
      </div>
    </header>
  )
}
