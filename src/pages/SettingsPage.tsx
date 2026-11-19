import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FilterRule } from '../types'
import { EditorialRulesTab } from '../components/settings/EditorialRulesTab'
import { BukuGayaTab } from '../components/settings/BukuGayaTab'
import { CsvRetentionTab } from '../components/settings/CsvRetentionTab'

export const SettingsPage: React.FC = () => {
  const {
    setIsTambahAturanOpen,
    setIsHapusAturanOpen,
    setRuleToDelete,
    setRuleToEdit,
  } = useApp()

  const [activeTab, setActiveTab] = useState<'filter' | 'bukugaya' | 'csv'>('filter')

  const handleAddNewRule = () => {
    setRuleToEdit(null)
    setIsTambahAturanOpen(true)
  }

  const handleEditRule = (rule: FilterRule) => {
    setRuleToEdit(rule)
    setIsTambahAturanOpen(true)
  }

  const handleDeleteRule = (rule: FilterRule) => {
    setRuleToDelete(rule)
    setIsHapusAturanOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Pengaturan Sistem & AI
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Konfigurasi aturan filter otomatis kata kunci dan pedoman buku gaya editorial.
        </p>
      </div>

      {/* Settings Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-5">
        {/* Segmented Pill Tab Navigation: 3 Tabs */}
        <div className="border border-[#DBEAFE] rounded-[6px] p-1 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-white select-none">
          <button
            type="button"
            onClick={() => setActiveTab('filter')}
            className={`h-[36px] px-3 rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              activeTab === 'filter'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Aturan Filter Kata Kunci
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bukugaya')}
            className={`h-[36px] px-3 rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              activeTab === 'bukugaya'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Buku Gaya
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('csv')}
            className={`h-[36px] px-3 rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              activeTab === 'csv'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Pengaturan Unggah CSV
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'filter' && (
          <EditorialRulesTab
            onAddNewRule={handleAddNewRule}
            onEditRule={handleEditRule}
            onDeleteRule={handleDeleteRule}
          />
        )}

        {activeTab === 'bukugaya' && <BukuGayaTab />}

        {activeTab === 'csv' && <CsvRetentionTab />}
      </div>
    </div>
  )
}
