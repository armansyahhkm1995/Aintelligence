import React, { useState } from 'react'
import { Plus, Search, ChevronDown, Edit3, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import { FilterRule } from '../../types'

interface EditorialRulesTabProps {
  onAddNewRule: () => void
  onEditRule: (rule: FilterRule) => void
  onDeleteRule: (rule: FilterRule) => void
}

export const EditorialRulesTab: React.FC<EditorialRulesTabProps> = ({
  onAddNewRule,
  onEditRule,
  onDeleteRule,
}) => {
  const { rules, editRule } = useApp()
  const { showSuccess } = useToast()

  const [searchRule, setSearchRule] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const toggleRuleStatus = (id: string) => {
    const current = rules.find((r) => r.id === id)
    if (!current) return
    editRule(id, {
      status: current.status === 'Aktif' ? 'Nonaktif' : 'Aktif',
      updatedAt: '23 Nov 2026',
    })
    showSuccess('Status Aturan', 'Status aturan filter berhasil diperbarui.')
  }

  const filteredRules = (rules || []).filter((r) => {
    if (!r) return false
    const matchSearch =
      (r.name || '').toLowerCase().includes(searchRule.toLowerCase()) ||
      (Array.isArray(r.keywords) ? r.keywords.join(' ') : '').toLowerCase().includes(searchRule.toLowerCase())
    const matchCat = !filterCategory || r.category === filterCategory
    const matchStat = !filterStatus || r.status === filterStatus
    return matchSearch && matchCat && matchStat
  })

  return (
    <div className="space-y-4">
      {/* Header with Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            Manajemen Aturan Filter Kata Kunci
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Blacklist topik berdasarkan pola kata, query musiman, dan parameter eliminasi otomatis.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddNewRule}
          className="h-[36px] px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Aturan Baru</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="space-y-3">
        {/* Search Box */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchRule}
            onChange={(e) => setSearchRule(e.target.value)}
            placeholder="Cari kata kunci ..."
            className="w-full h-[40px] pl-10 pr-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                filterCategory ? 'text-slate-900 font-medium' : 'text-slate-500'
              }`}
            >
              <option value="">Semua Kategori</option>
              <option value="Sensitivitas / Larangan">Sensitivitas / Larangan</option>
              <option value="Regulasi & Hukum">Regulasi & Hukum</option>
              <option value="Kualitas Konten">Kualitas Konten</option>
              <option value="SARA & Kebencian">SARA & Kebencian</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 w-full">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
              }`}
            >
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {(searchRule || filterCategory || filterStatus) && (
            <button
              type="button"
              onClick={() => {
                setSearchRule('')
                setFilterCategory('')
                setFilterStatus('')
              }}
              className="h-[40px] px-4 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-[6px] transition-colors shrink-0 w-full sm:w-auto cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Rules Table */}
      <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600">
                <th className="py-3 px-4 font-semibold w-[22%]">Nama Aturan</th>
                <th className="py-3 px-4 font-semibold w-[16%]">Kategori</th>
                <th className="py-3 px-4 font-semibold w-[22%]">Daftar Kata Kunci</th>
                <th className="py-3 px-4 font-semibold w-[16%] text-center">Status</th>
                <th className="py-3 px-4 font-semibold w-[14%]">Perubahan Terakhir</th>
                <th className="py-3 px-4 font-semibold w-[10%] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredRules.map((rule) => {
                const isAktif = rule.status === 'Aktif'
                return (
                  <tr key={rule.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{rule.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {rule.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                        {rule.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {rule.keywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-blue-50 text-[#1866EF] border border-blue-100 text-[11px]"
                          >
                            {kw}
                          </span>
                        ))}
                        {rule.keywords.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">
                            +{rule.keywords.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isAktif}
                          onClick={() => toggleRuleStatus(rule.id)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#1866EF] focus:ring-offset-2 ${
                            isAktif ? 'bg-[#1866EF]' : 'bg-slate-200'
                          }`}
                          title={isAktif ? 'Klik untuk nonaktifkan aturan' : 'Klik untuk aktifkan aturan'}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              isAktif ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleRuleStatus(rule.id)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                            isAktif
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title={isAktif ? 'Klik untuk nonaktifkan aturan' : 'Klik untuk aktifkan aturan'}
                        >
                          {isAktif ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      <span className="font-medium text-slate-800">{rule.updatedAt || '02 Nov 2026'}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEditRule(rule)}
                          className="p-1.5 text-slate-500 hover:text-[#1866EF] hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded transition-colors cursor-pointer"
                          title="Sunting Aturan"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteRule(rule)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded transition-colors cursor-pointer"
                          title="Hapus Aturan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredRules.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada aturan yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
