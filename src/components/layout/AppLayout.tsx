import React, { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { DashboardPage } from '../../pages/DashboardPage'
import { ImporCSVPage } from '../../pages/ImporCSVPage'
import { KeywordPage } from '../../pages/KeywordPage'
import { ClusterPage } from '../../pages/ClusterPage'
import { BriefPage } from '../../pages/BriefPage'
import { DraftPage } from '../../pages/DraftPage'
import { SettingsPage } from '../../pages/SettingsPage'
import { AuditLogPage } from '../../pages/AuditLogPage'
import { UsersPage } from '../../pages/UsersPage'
import { NotifikasiPage } from '../../pages/NotifikasiPage'
import { LoginPage } from '../../pages/LoginPage'
import { ErrorBoundary } from '../common/ErrorBoundary'

// Modals & Drawers
import { BulkOverrideModal } from '../modals/BulkOverrideModal'
import { SingleOverrideModal } from '../modals/SingleOverrideModal'
import { ResolusiBentrokModal } from '../modals/ResolusiBentrokModal'
import { TolakClusterModal } from '../modals/TolakClusterModal'
import { TolakBriefModal } from '../modals/TolakBriefModal'
import { HapusDraftModal } from '../modals/HapusDraftModal'
import { AddRuleModal } from '../modals/AddRuleModal'
import { DeleteRuleModal } from '../modals/DeleteRuleModal'
import { AddUserModal } from '../modals/AddUserModal'
import { DeactivateUserModal } from '../modals/DeactivateUserModal'
import { EditClusterDrawer } from '../drawers/EditClusterDrawer'

export const AppLayout: React.FC = () => {
  const { currentPage, setCurrentPage, isAuthenticated, currentUser } = useApp()

  // Redirect editor away from admin pages if navigated directly
  useEffect(() => {
    if (currentUser?.role === 'editor' && ['settings', 'users', 'auditlog'].includes(currentPage)) {
      setCurrentPage('dashboard')
    }
  }, [currentUser, currentPage, setCurrentPage])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />
      case 'impor':
        return <ImporCSVPage />
      case 'keyword':
        return <KeywordPage />
      case 'cluster':
        return <ClusterPage />
      case 'brief':
        return <BriefPage />
      case 'draft':
        return <DraftPage />
      case 'settings':
        return <SettingsPage />
      case 'auditlog':
        return <AuditLogPage />
      case 'users':
        return <UsersPage />
      case 'notifikasi':
        return <NotifikasiPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased">
      {/* 267px Fixed Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto w-full">
            <ErrorBoundary>{renderCurrentPage()}</ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Overlays / Modals / Drawers */}
      <BulkOverrideModal />
      <SingleOverrideModal />
      <ResolusiBentrokModal />
      <TolakClusterModal />
      <TolakBriefModal />
      <HapusDraftModal />
      <AddRuleModal />
      <DeleteRuleModal />
      <AddUserModal />
      <DeactivateUserModal />
      <EditClusterDrawer />
    </div>
  )
}
