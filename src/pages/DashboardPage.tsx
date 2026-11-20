import React from 'react'
import { useApp } from '../context/AppContext'
import { AdminPipelineStepper } from '../components/dashboard/AdminPipelineStepper'
import { EditorSummaryCards } from '../components/dashboard/EditorSummaryCards'
import { AdminAuditLocksSection } from '../components/dashboard/AdminAuditLocksSection'
import { DashboardTasksSection } from '../components/dashboard/DashboardTasksSection'
import { DashboardAiDecisionsSection } from '../components/dashboard/DashboardAiDecisionsSection'
import { DashboardRecentActivitySection } from '../components/dashboard/DashboardRecentActivitySection'
import { DashboardEditorCorrectionsSection } from '../components/dashboard/DashboardEditorCorrectionsSection'

export const DashboardPage: React.FC = () => {
  const { setCurrentPage, currentUser } = useApp()
  const isEditor = currentUser?.role === 'editor'

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div>
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          {isEditor ? 'Ringkasan Tugas Editor' : 'Dashboard Pipeline Produksi'}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {isEditor
            ? 'Ruang kerja editor untuk memantau tugas naskah, keputusan AI, dan riwayat aktivitas redaksi.'
            : 'Ruang kendali riset kata kunci, penyusunan brief, dan produksi draf berita otomatis.'}
        </p>
      </div>

      {/* Top Section: Stepper for Admin OR Summary Cards for Editor */}
      {isEditor ? (
        <EditorSummaryCards
          onNavigateBrief={() => setCurrentPage('brief')}
          onNavigateDraft={() => setCurrentPage('draft')}
        />
      ) : (
        <>
          <AdminPipelineStepper onNavigate={(page) => setCurrentPage(page as any)} />
          <AdminAuditLocksSection
            onNavigateBrief={() => setCurrentPage('brief')}
            onNavigateDraft={() => setCurrentPage('draft')}
          />
        </>
      )}

      {/* Section 1: Daftar Tugas */}
      <DashboardTasksSection
        onNavigateBrief={() => setCurrentPage('brief')}
        onNavigateDraft={() => setCurrentPage('draft')}
      />

      {/* Section 2: Daftar Keputusan AI */}
      <DashboardAiDecisionsSection userRole={currentUser?.role} />

      {/* Section 3: Aktivitas Terbaru */}
      <DashboardRecentActivitySection userRole={currentUser?.role} />

      {/* Section 4: Daftar Koreksi oleh Editor */}
      <DashboardEditorCorrectionsSection userRole={currentUser?.role} />
    </div>
  )
}
