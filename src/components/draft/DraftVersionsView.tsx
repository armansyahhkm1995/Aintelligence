import React from 'react'
import { ChevronLeft, Eye } from 'lucide-react'
import { MilestoneStepper } from '../common/MilestoneStepper'
import { useApp } from '../../context/AppContext'
import type { DraftVersionItem } from './types'

interface DraftVersionsViewProps {
  activeItemTitle: string
  versions: DraftVersionItem[]
  activeDraftVersionId: string
  onBackToDetail: () => void
  onToggleVersion: (versionId: string) => void
  onSelectCompare: (version: DraftVersionItem) => void
}

export const DraftVersionsView: React.FC<DraftVersionsViewProps> = ({
  activeItemTitle,
  versions,
  activeDraftVersionId,
  onBackToDetail,
  onToggleVersion,
  onSelectCompare,
}) => {
  const { currentUser } = useApp()

  return (
    <div className="space-y-6">
      {/* Milestone Stepper */}
      {currentUser?.role !== 'editor' && <MilestoneStepper currentStep={5} />}

      {/* Back Link & Header */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onBackToDetail}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Detail Draft Artikel</span>
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
            {activeItemTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-4xl leading-relaxed">
            <strong className="text-slate-700 font-semibold">Sudut Pandang Jurnalistik (Angle):</strong> Edukasi finansial praktis dan komprehensif bagi investor pemula untuk memahami instrumen reksadana, diversifikasi portofolio, dan regulasi OJK terbaru tahun 2026.
          </p>
        </div>
      </div>

      {/* Versions Table Card */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            Daftar Riwayat Versi Draft Artikel
          </h2>
          <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF]">
            {versions.length} Versi Tersimpan
          </span>
        </div>

        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold">Versi Draft Artikel</th>
                  <th className="py-3 px-4 font-semibold">Dibuat Oleh</th>
                  <th className="py-3 px-4 font-semibold">Statistik Naskah</th>
                  <th className="py-3 px-4 font-semibold">Ringkasan Perubahan</th>
                  <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {versions.map((v) => {
                  const isActive = v.id === activeDraftVersionId
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Toggle Switch */}
                          <button
                            type="button"
                            onClick={() => onToggleVersion(v.id)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-hidden cursor-pointer shrink-0 ${
                              isActive ? 'bg-[#1866EF]' : 'bg-slate-300'
                            }`}
                            title={isActive ? 'Versi ini sedang aktif' : 'Klik untuk aktifkan versi ini'}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                isActive ? 'translate-x-4.5' : 'translate-x-1'
                              }`}
                            />
                          </button>

                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{v.version}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-[10px] font-bold">
                                Aktif
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`font-semibold ${v.isAI ? 'text-[#1866EF]' : 'text-slate-900'}`}>
                            {v.createdBy}
                          </span>
                          <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                            {v.createdAt}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1866EF] border border-blue-200 text-[10px] font-semibold">
                            {v.wordCount.toLocaleString('id-ID')} kata
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#15803D] border border-emerald-200 text-[10px] font-semibold">
                            SEO: {v.seoScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">{v.changeSummary}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onSelectCompare(v)}
                          className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-blue-100 border border-[#BFDBFE] text-[#1866EF] font-semibold text-xs rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          title="Bandingkan dengan Versi Terbaru"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Bandingkan</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
