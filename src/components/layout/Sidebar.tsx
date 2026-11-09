import React from 'react'
import { useApp, AppPage } from '../../context/AppContext'
import {
  LayoutDashboard,
  UploadCloud,
  Search,
  Network,
  FileCheck2,
  FileEdit,
  Sliders,
  Users2,
  History,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import rriLogo from '../../assets/rri-logo.svg'

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, logout } = useApp()

  const pipelineNavItems: { id: AppPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
    { id: 'impor', label: 'Impor CSV Semrush', icon: UploadCloud },
    { id: 'keyword', label: 'Manajemen Kata Kunci', icon: Search },
    { id: 'cluster', label: 'Cluster Topik', icon: Network },
    { id: 'brief', label: 'Brief Berita', icon: FileCheck2 },
    { id: 'draft', label: 'Draf Artikel', icon: FileEdit },
  ]

  const adminNavItems: { id: AppPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'settings', label: 'Pengaturan Redaksi', icon: Sliders },
    { id: 'users', label: 'Manajemen Pengguna', icon: Users2 },
    { id: 'auditlog', label: 'Audit Log', icon: History },
  ]

  return (
    <aside className="w-[267px] shrink-0 border-r border-[#DBEAFE] bg-white flex flex-col justify-between select-none h-screen overflow-y-auto">
      <div className="p-2 space-y-4">
        {/* Brand Header */}
        <div className="px-3 pt-3 pb-1">
          <div className="flex flex-col gap-1.5">
            <img
              src={rriLogo}
              alt="Radio Republik Indonesia"
              className="h-8 w-auto object-contain object-left"
            />
            <span className="text-[11px] font-medium text-slate-500">
              Riset & Produksi Berita
            </span>
          </div>
        </div>

        {/* Section: PIPELINE PRODUKSI */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[11px] font-bold text-slate-400 tracking-wider">
            PIPELINE PRODUKSI
          </div>
          <nav className="space-y-0.5">
            {pipelineNavItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0375E5] text-white shadow-sm font-semibold'
                      : 'text-slate-700 hover:bg-blue-50/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </div>

        {/* Section: ADMIN */}
        <div className="space-y-1 pt-1">
          <div className="px-3 py-1 text-[11px] font-bold text-slate-400 tracking-wider">
            ADMIN
          </div>
          <nav className="space-y-0.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0375E5] text-white shadow-sm font-semibold'
                      : 'text-slate-700 hover:bg-blue-50/60 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="p-3 border-t border-slate-100">
        {/* Keluar Button (Red) */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg text-xs font-medium text-[#EF4444] hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 text-[#EF4444]" />
            <span className="font-medium text-[#EF4444]">Keluar</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#EF4444]" />
        </button>
      </div>
    </aside>
  )
}
