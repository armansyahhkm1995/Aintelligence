import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { FilterRule } from '../types'
import {
  Plus,
  Trash2,
  Search,
  ChevronDown,
  Edit3,
  GripVertical,
  X,
} from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const {
    rules,
    setIsTambahAturanOpen,
    setIsHapusAturanOpen,
    setRuleToDelete,
    setRuleToEdit,
    editRule,
    csvCooldownMonths,
    setCsvCooldownMonths,
  } = useApp()
  const { showSuccess } = useToast()

  const [activeTab, setActiveTab] = useState<'filter' | 'bukugaya' | 'csv'>('filter')
  const [tempCooldownMonths, setTempCooldownMonths] = useState<number>(csvCooldownMonths || 3)
  const [checkFirst20, setCheckFirst20] = useState(true)
  const [autoRejectDuplicate, setAutoRejectDuplicate] = useState(true)

  // Search & Filters for Tab 1
  const [searchRule, setSearchRule] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const toggleRuleStatus = (id: string) => {
    const current = rules.find((r) => r.id === id)
    if (!current) return
    editRule(id, { status: current.status === 'Aktif' ? 'Nonaktif' : 'Aktif' })
    showSuccess('Status Aturan', 'Status aturan filter berhasil diperbarui.')
  }

  // Tab 2: Buku Gaya states
  const [toneOfVoice, setToneOfVoice] = useState(
    'Lugas, Objektif, Terverifikasi, dan Ramah Pembaca Digital (Sesuai Pedoman Jurnalistik RRI)'
  )

  // Headings template for Tab 2
  const [headingTemplates, setHeadingTemplates] = useState([
    { id: 'h-1', level: 'H1', text: 'Judul Jurnalistik' },
    { id: 'h-2', level: 'H2', text: 'Lead 5W+1H' },
    { id: 'h-3', level: 'H2', text: 'Latar Belakang' },
    { id: 'h-4', level: 'H2', text: 'Fakta Kunci' },
    { id: 'h-5', level: 'H3', text: 'Langkah Praktis' },
    { id: 'h-6', level: 'H2', text: 'Imbauan' },
  ])
  const [openLevelDropdownId, setOpenLevelDropdownId] = useState<string | null>(null)
  const [draggedHeadingIdx, setDraggedHeadingIdx] = useState<number | null>(null)

  const handleDragStart = (idx: number) => {
    if (headingTemplates[idx]?.level === 'H1') return
    setDraggedHeadingIdx(idx)
  }

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (draggedHeadingIdx === null || draggedHeadingIdx === idx) return
    if (idx === 0) return // Posisi H1 permanen di index 0
    const newItems = [...headingTemplates]
    const draggedItem = newItems[draggedHeadingIdx]
    if (draggedItem?.level === 'H1') return
    newItems.splice(draggedHeadingIdx, 1)
    newItems.splice(idx, 0, draggedItem)
    setDraggedHeadingIdx(idx)
    setHeadingTemplates(newItems)
  }

  const handleDragEnd = () => {
    setDraggedHeadingIdx(null)
  }

  const handleRemoveHeading = (id: string) => {
    const item = headingTemplates.find((h) => h.id === id)
    if (item?.level === 'H1') return
    setHeadingTemplates((prev) => prev.filter((h) => h.id !== id))
  }

  const handleAddHeading = () => {
    const newId = `h-${Date.now()}`
    setHeadingTemplates((prev) => [
      ...prev,
      { id: newId, level: 'H2', text: 'Heading Baru' },
    ])
    setOpenLevelDropdownId(newId)
  }

  const handleSelectLevel = (id: string, lvl: string) => {
    setHeadingTemplates((prev) =>
      prev.map((h) => (h.id === id ? { ...h, level: lvl } : h))
    )
    setOpenLevelDropdownId(null)
  }

  // Tab 3: API config states
  const [apiKey, setApiKey] = useState('sk-ant-api03-••••••••••••••••••••••••••••••••8d9A')
  const [evergreenThreshold, setEvergreenThreshold] = useState('60')

  const handleSaveBukuGaya = () => {
    showSuccess('Pengaturan Redaksi', 'Perubahan Buku Gaya berhasil disimpan.')
  }

  const handleSaveApi = () => {
    showSuccess('Pengaturan Redaksi', 'Konfigurasi API & Batasan AI berhasil disimpan.')
  }

  const handleDeleteRule = (r: FilterRule) => {
    setRuleToDelete(r)
    setIsHapusAturanOpen(true)
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

      {/* COMP-TodoList-Editor: 949px Standard Container */}
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

        {/* ======================================================== */}
        {/* TAB 1: Aturan Filter Kata Kunci (matches media_1794227113969_17687f9c.jpg) */}
        {/* ======================================================== */}
        {activeTab === 'filter' && (
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
                onClick={() => {
                  setRuleToEdit(null)
                  setIsTambahAturanOpen(true)
                }}
                className="h-[36px] px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Aturan Baru</span>
              </button>
            </div>

            {/* Filter Controls: Search Bar placed ABOVE filters */}
            <div className="space-y-3">
              {/* Search Box on Top */}
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

              {/* Filters Row: 2 Dropdowns + Hug Content Clear Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                      filterCategory ? 'text-slate-900 font-medium' : 'text-slate-500'
                    }`}
                  >
                    <option value="" disabled hidden>Pilih: Semua Jenis</option>
                    <option value="Musiman">Musiman</option>
                    <option value="Berisiko">Berisiko</option>
                    <option value="Non-evergreen">Non-evergreen</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative flex-1 w-full">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                      filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
                    }`}
                  >
                    <option value="" disabled hidden>Pilih: Semua Status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Hug Content Clear Filter Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSearchRule('')
                    setFilterCategory('')
                    setFilterStatus('')
                  }}
                  className="w-auto h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  Bersihkan Filter
                </button>
              </div>
            </div>

            {/* Main Table */}
            <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                    <th className="py-3 px-4 font-semibold">Nama Aturan</th>
                    <th className="py-3 px-4 font-semibold">Kata Kunci</th>
                    <th className="py-3 px-4 font-semibold">Jenis Filter</th>
                    <th className="py-3 px-4 font-semibold">Status Aturan</th>
                    <th className="py-3 px-4 font-semibold">Terakhir Diubah</th>
                    <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRules.map((rule) => {
                    const isAktif = rule.status === 'Aktif'
                    const jenisPillClass =
                      rule.category === 'Musiman'
                        ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                        : rule.category === 'Berisiko'
                        ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                        : 'bg-[#FDF4FF] text-[#A21CAF] border-[#F5D0FE]'

                    return (
                      <tr key={rule.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 leading-snug">
                            {rule.name}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {rule.description}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {rule.keywords.map((kw, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${jenisPillClass}`}
                          >
                            {rule.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {/* Toggle Switch: blue-700 when active, blue-50 when inactive */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleRuleStatus(rule.id)}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                isAktif ? 'bg-[#1D4ED8]' : 'bg-blue-50 border-blue-200'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                  isAktif ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                            <span
                              className={`text-xs font-medium ${
                                isAktif ? 'text-slate-900' : 'text-slate-400'
                              }`}
                            >
                              {rule.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {rule.updatedAt} · {rule.updatedBy}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setRuleToEdit(rule)
                                setIsTambahAturanOpen(true)
                              }}
                              className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                              title="Sunting"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRule(rule)}
                              className="p-1.5 rounded hover:bg-rose-50 text-[#B91C1C] transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>

              {/* Pagination Bar */}
              <div className="p-3.5 bg-white border-t border-[#DBEAFE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Menampilkan 1-5 dari 42 data</span>
                  <div className="relative">
                    <select className="h-[28px] pl-2 pr-6 bg-white border border-[#DBEAFE] rounded text-xs text-slate-700 appearance-none cursor-pointer">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                    <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button className="h-[28px] px-3 rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs">
                    Sebelumnya
                  </button>
                  <button className="h-[28px] w-[28px] rounded bg-[#1866EF] text-white font-bold text-xs flex items-center justify-center">
                    1
                  </button>
                  <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center">
                    2
                  </button>
                  <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center">
                    3
                  </button>
                  <span className="px-1 text-slate-400">...</span>
                  <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center">
                    10
                  </button>
                  <button className="h-[28px] px-3 rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs">
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: Buku Gaya (matches media_1794227168543_8dd3ecaa.png) */}
        {/* ======================================================== */}
        {activeTab === 'bukugaya' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                Buku Gaya & Template Editorial
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pedoman gaya penulisan naskah berita, nada redaksional, dan standarisasi heading AI.
              </p>
            </div>

            {/* Section 1: Nada Penulisan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-900 block">
                Nada Penulisan (Tone of Voice)
              </label>
              <input
                type="text"
                value={toneOfVoice}
                onChange={(e) => setToneOfVoice(e.target.value)}
                className="w-full h-[40px] px-3.5 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Section 2: Struktur Baku Heading Artikel */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-900 block">
                  Struktur Baku Heading Artikel (Template Output AI)
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddHeading}
                    className="h-[32px] px-3 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
                  >
                    Tambah Heading
                  </button>
                </div>
              </div>

              {/* Headings List with Drag-and-Drop (H1 locked without drag icon) */}
              <div className="space-y-2">
                {headingTemplates.map((h, idx) => (
                  <div
                    key={h.id}
                    draggable={h.level !== 'H1'}
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-2 p-2 rounded-[6px] border border-[#DBEAFE] bg-white text-xs transition-shadow ${
                      draggedHeadingIdx === idx ? 'opacity-50 border-blue-400 shadow-md' : ''
                    }`}
                  >
                    {h.level !== 'H1' ? (
                      <div className="cursor-grab p-1 text-slate-300 hover:text-slate-500">
                        <GripVertical className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 p-1 text-slate-300" title="H1 Baku Permanen" />
                    )}

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      h.level === 'H1'
                        ? 'bg-[#1866EF] text-white'
                        : h.level === 'P'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1866EF] text-white'
                    }`}>
                      {h.level}
                    </span>

                    <input
                      type="text"
                      value={h.text}
                      onChange={(e) => {
                        const val = e.target.value
                        setHeadingTemplates((prev) =>
                          prev.map((item) => (item.id === h.id ? { ...item, text: val } : item))
                        )
                      }}
                      className="flex-1 bg-transparent hover:bg-slate-50 focus:bg-white px-2 py-1 text-xs font-medium text-slate-800 rounded border border-transparent hover:border-slate-200 focus:border-blue-400 focus:outline-none transition-colors"
                      placeholder="Nama heading / elemen..."
                    />

                    {/* Level Selector Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenLevelDropdownId(openLevelDropdownId === h.id ? null : h.id)
                        }
                        className="h-[28px] px-2.5 bg-white border border-[#DBEAFE] rounded text-xs font-medium text-slate-700 flex items-center gap-1 hover:bg-slate-50"
                      >
                        <span>{h.level}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      {openLevelDropdownId === h.id && (
                        <div className="absolute right-0 top-full mt-1 w-20 bg-white border border-[#DBEAFE] rounded-[6px] shadow-lg z-20 py-1">
                          {['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleSelectLevel(h.id, lvl)}
                              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition-colors ${
                                h.level === lvl ? 'text-[#1866EF] font-bold bg-blue-50/50' : 'text-slate-700'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {h.level !== 'H1' && (
                      <button
                        type="button"
                        onClick={() => handleRemoveHeading(h.id)}
                        className="p-1 rounded border border-[#FECACA] hover:bg-rose-50 text-[#B91C1C] transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {}}
                className="h-[36px] px-5 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveBukuGaya}
                className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: Pengaturan Unggah CSV (Batas Kedaluwarsa & Revalidasi) */}
        {/* ======================================================== */}
        {activeTab === 'csv' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                Pengaturan Unggah & Validasi CSV Semrush
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Konfigurasi jeda waktu unggah ulang berkas CSV serupa serta parameter deteksi duplikasi kata kunci untuk menjamin kebaruan tren redaksional.
              </p>
            </div>

            {/* Section 1: Jeda Waktu Unggah Ulang Berkas CSV Serupa */}
            <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Jenjang Waktu Jeda Unggah Ulang Berkas CSV Serupa (Batas Kedaluwarsa Tren)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Tentukan jeda waktu minimum kapan suatu berkas CSV dengan kumpulan kata kunci serupa baru diizinkan untuk diunggah kembali ke sistem. Berkas serupa yang diunggah sebelum jeda waktu terlewati akan otomatis ditolak guna mencegah penulisan konten berbasis tren yang sudah lampau.
                </p>
              </div>

              {/* Radio options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 1, label: '1 Bulan', desc: 'Siklus tren sangat cepat' },
                  { value: 3, label: '3 Bulan (Rekomendasi)', desc: 'Ideal untuk evaluasi kuartal redaksi' },
                  { value: 6, label: '6 Bulan', desc: 'Siklus tren jangka panjang (semester)' },
                ].map((opt) => {
                  const isSelected = tempCooldownMonths === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTempCooldownMonths(opt.value)}
                      className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#1866EF] bg-[#EFF6FF] text-[#1866EF] ring-1 ring-[#1866EF]'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{opt.label}</span>
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#1866EF] bg-[#1866EF]' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{opt.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Section 2: Validasi Duplikasi 20 Kata Kunci Pertama */}
            <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Metode Validasi Duplikasi & Pengecekan Isi Berkas
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Sistem tidak hanya memeriksa nama berkas, melainkan mencocokkan sampel 20 kata kunci pertama guna mendeteksi berkas lama yang hanya diubah namanya.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checkFirst20}
                    onChange={(e) => setCheckFirst20(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#1866EF] focus:ring-[#1866EF]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Revalidasi Sampel 20 Kata Kunci Pertama (Ringan & Cepat)
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Membandingkan 20 kata kunci pertama dengan riwayat berkas sebelumnya. Jika kecocokan &ge; 80% dalam rentang jeda waktu ({tempCooldownMonths} bulan), sistem akan memicu alert penolakan duplikasi.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRejectDuplicate}
                    onChange={(e) => setAutoRejectDuplicate(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#1866EF] focus:ring-[#1866EF]"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Tolak Otomatis Berkas Duplikat & Catat ke Audit Log
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Memberikan peringatan penolakan instan pada form unggah CSV dan mencatat upaya pengunggahan berkas kedaluwarsa ke riwayat audit log redaksi.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTempCooldownMonths(csvCooldownMonths)}
                className="h-[36px] px-5 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setCsvCooldownMonths(tempCooldownMonths)
                  showSuccess(
                    'Pengaturan Unggah CSV',
                    `Jeda waktu unggah ulang CSV berhasil diatur menjadi ${tempCooldownMonths} bulan dengan validasi 20 kata kunci pertama.`
                  )
                }}
                className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs cursor-pointer"
              >
                Simpan Pengaturan CSV
              </button>
            </div>
          </div>
        )}

        {/* TAB 3 (Konfigurasi API & AI) di-hide sementara sesuai permintaan */}
      </div>
    </div>
  )
}
