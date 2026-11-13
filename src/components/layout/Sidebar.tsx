import React, { useEffect } from 'react'
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
  X,
} from 'lucide-react'
import rriLogo from '../../assets/rri-logo.svg'

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, logout, isMobileNavOpen, setIsMobileNavOpen, currentUser } = useApp()

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileNavOpen])

  const pipelineNavItems: { id: AppPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'impor', label: 'Impor CSV Semrush', icon: UploadCloud },
    { id: 'keyword', label: 'Kata Kunci', icon: Search },
    { id: 'cluster', label: 'Kelompok Kata Kunci', icon: Network },
    { id: 'brief', label: 'Arahan Artikel', icon: FileCheck2 },
    { id: 'draft', label: 'Draf Artikel', icon: FileEdit },
  ]

  const adminNavItems: { id: AppPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'settings', label: 'Pengaturan Redaksi', icon: Sliders },
    { id: 'users', label: 'Manajemen Pengguna', icon: Users2 },
    { id: 'auditlog', label: 'Audit Log', icon: History },
  ]

  const handleNavClick = (id: AppPage) => {
    setCurrentPage(id)
    setIsMobileNavOpen(false)
  }

  const handleLogoutClick = () => {
    logout()
    setIsMobileNavOpen(false)
  }

  // Common Nav Content
  const renderNavContent = (isMobile = false) => (
    <>
      <div className="p-3 space-y-4">
        {/* Brand Header */}
        <div className="px-2 pt-2 pb-1 flex items-start justify-between">
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

          {/* Close button for mobile drawer */}
          {isMobile && (
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="p-1.5 -mr-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
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
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0375E5] text-white shadow-sm font-semibold'
                      : 'text-slate-700 hover:bg-blue-50/60 hover:text-slate-900 active:bg-blue-100/50'
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

        {/* Section: ADMIN (Khusus Akun Admin) */}
        {currentUser?.role === 'admin' && (
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
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0375E5] text-white shadow-sm font-semibold'
                        : 'text-slate-700 hover:bg-blue-50/60 hover:text-slate-900 active:bg-blue-100/50'
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
        )}
      </div>

      {/* Bottom Area */}
      <div className="p-3 border-t border-slate-100 mt-auto">
        {/* Keluar Button (Red) */}
        <button
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg text-xs font-medium text-[#EF4444] hover:bg-rose-50 active:bg-rose-100 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 text-[#EF4444]" />
            <span className="font-semibold text-[#EF4444]">Keluar</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#EF4444]" />
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-[267px] shrink-0 border-r border-[#DBEAFE] bg-white flex-col justify-between select-none h-screen overflow-y-auto">
        {renderNavContent(false)}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-[280px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between select-none overflow-y-auto z-10 animate-in slide-in-from-left duration-300 ease-in-out">
            {renderNavContent(true)}
          </div>
        </div>
      )}
    </>
  )
}
