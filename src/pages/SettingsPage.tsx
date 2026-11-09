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
  } = useApp()
  const { showSuccess } = useToast()

  const [activeTab, setActiveTab] = useState<'filter' | 'bukugaya' | 'api'>('filter')

  // Search & Filters for Tab 1
  const [searchRule, setSearchRule] = useState('')
  const [filterCategory, setFilterCategory] = useState('Semua')
  const [filterStatus, setFilterStatus] = useState('Semua')

  // Rule items local state with toggle support
  const [ruleItems, setRuleItems] = useState<FilterRule[]>([
    {
      id: 'RULE-01',
      name: 'Kata kunci piala dunia',
      description: 'Query musiman event olahraga',
      keywords: ['bola', 'messi'],
      category: 'Musiman',
      status: 'Aktif',
      updatedAt: '02 Nov 2026',
      updatedBy: 'Admin',
    },
    {
      id: 'RULE-02',
      name: 'Kata kunci tentang judi',
      description: 'Aktivitas ilegal',
      keywords: ['judi online', 'slot gacor'],
      category: 'Berisiko',
      status: 'Aktif',
      updatedAt: '02 Nov 2026',
      updatedBy: 'Admin',
    },
    {
      id: 'RULE-03',
      name: 'jadwal bioskop hari ini',
      description: 'Pola harian / non-evergreen',
      keywords: ['film', 'aadc'],
      category: 'Non-evergreen',
      status: 'Nonaktif',
      updatedAt: '02 Nov 2026',
      updatedBy: 'Admin',
    },
  ])

  const toggleRuleStatus = (id: string) => {
    setRuleItems((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === 'Aktif' ? 'Nonaktif' : 'Aktif' }
          : r
      )
    )
    showSuccess('Status Aturan', 'Status aturan filter berhasil diperbarui.')
  }

  // Tab 2: Buku Gaya states
  const [toneOfVoice, setToneOfVoice] = useState(
    'Lugas, Objektif, Terverifikasi, dan Ramah Pembaca Digital (Sesuai Pedoman Jurnalistik RRI)'
  )
  const [blacklist, setBlacklist] = useState([
    'slot gacor',
    'skema ponzi',
    'investasi bodong',
    'sensasional',
  ])
  const [newBlacklistWord, setNewBlacklistWord] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)

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
    setDraggedHeadingIdx(idx)
  }

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (draggedHeadingIdx === null || draggedHeadingIdx === idx) return
    const newItems = [...headingTemplates]
    const draggedItem = newItems[draggedHeadingIdx]
    newItems.splice(draggedHeadingIdx, 1)
    newItems.splice(idx, 0, draggedItem)
    setDraggedHeadingIdx(idx)
    setHeadingTemplates(newItems)
  }

  const handleDragEnd = () => {
    setDraggedHeadingIdx(null)
  }

  const handleRemoveHeading = (id: string) => {
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

  const handleAddBlacklist = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newBlacklistWord.trim()) {
      e.preventDefault()
      if (!blacklist.includes(newBlacklistWord.trim())) {
        setBlacklist([...blacklist, newBlacklistWord.trim()])
      }
      setNewBlacklistWord('')
      setIsAddingTag(false)
    }
  }

  const handleRemoveBlacklist = (word: string) => {
    setBlacklist(blacklist.filter((w) => w !== word))
  }

  const filteredRules = ruleItems.filter((r) => {
    if (!r) return false
    const matchSearch =
      (r.name || '').toLowerCase().includes(searchRule.toLowerCase()) ||
      (Array.isArray(r.keywords) ? r.keywords.join(' ') : '').toLowerCase().includes(searchRule.toLowerCase())
    const matchCat = filterCategory === 'Semua' || r.category === filterCategory
    const matchStat = filterStatus === 'Semua' || r.status === filterStatus
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
          Konfigurasi aturan filter otomatis keyword, pedoman buku gaya editorial, serta manajemen kredensial LLM.
        </p>
      </div>

      {/* COMP-TodoList-Editor: 949px Standard Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-5">
        {/* Segmented Pill Tab Navigation exactly matching Figma */}
        <div className="border border-[#DBEAFE] rounded-[6px] p-1 grid grid-cols-3 gap-1 bg-white select-none">
          <button
            type="button"
            onClick={() => setActiveTab('filter')}
            className={`h-[36px] rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center ${
              activeTab === 'filter'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Aturan Filter Keyword
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bukugaya')}
            className={`h-[36px] rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center ${
              activeTab === 'bukugaya'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Buku Gaya
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`h-[36px] rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center ${
              activeTab === 'api'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Konfigurasi API & AI
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: Aturan Filter Keyword (matches media_1794227113969_17687f9c.jpg) */}
        {/* ======================================================== */}
        {activeTab === 'filter' && (
          <div className="space-y-4">
            {/* Header with Title & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  Manajemen Aturan Filter Keyword
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Blacklist topik berdasarkan pola kata, query musiman, dan parameter eliminasi otomatis.
                </p>
              </div>

              <button
                onClick={() => setIsTambahAturanOpen(true)}
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
                    className="w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-[#020617] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Semua">Pilih: Semua Jenis</option>
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
                    className="w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-[#020617] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Semua">Pilih: Semua Status</option>
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
                    setFilterCategory('Semua')
                    setFilterStatus('Semua')
                  }}
                  className="h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors shrink-0 whitespace-nowrap"
                >
                  Bersihkan Filter
                </button>
              </div>
            </div>

            {/* Main Table */}
            <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
              <table className="w-full text-left text-xs">
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
                              onClick={() => setIsTambahAturanOpen(true)}
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

            {/* Section 2: Daftar Kata Terlarang */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-900 block">
                Daftar Kata Terlarang (Blacklist Frasa Redaksional)
              </label>
              <div className="min-h-[64px] p-2.5 bg-white border border-[#DBEAFE] rounded-[6px] flex flex-wrap items-center gap-2">
                {blacklist.map((word) => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]"
                  >
                    <span>{word}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlacklist(word)}
                      className="hover:text-rose-900 focus:outline-none"
                    >
                      <X className="w-3 h-3 text-[#B91C1C]" />
                    </button>
                  </span>
                ))}

                {isAddingTag ? (
                  <input
                    type="text"
                    autoFocus
                    value={newBlacklistWord}
                    onChange={(e) => setNewBlacklistWord(e.target.value)}
                    onKeyDown={handleAddBlacklist}
                    onBlur={() => {
                      if (newBlacklistWord.trim()) {
                        setBlacklist([...blacklist, newBlacklistWord.trim()])
                        setNewBlacklistWord('')
                      }
                      setIsAddingTag(false)
                    }}
                    placeholder="Ketik lalu Enter..."
                    className="h-[28px] px-2 text-xs border border-blue-400 rounded-full focus:outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="h-[28px] w-[28px] rounded-full border border-dashed border-[#FECACA] hover:bg-rose-50 text-[#B91C1C] flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Section 3: Struktur Baku Heading Artikel */}
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
                  <div className="relative">
                    <select className="h-[32px] pl-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-700 appearance-none cursor-pointer font-medium">
                      <option>Versi aktif: Versi 1</option>
                      <option>Versi 2</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Headings List with Drag-and-Drop and H1-H6 selection */}
              <div className="space-y-2">
                {headingTemplates.map((h, idx) => (
                  <div
                    key={h.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-2 p-2 rounded-[6px] border border-[#DBEAFE] bg-white text-xs transition-shadow ${
                      draggedHeadingIdx === idx ? 'opacity-50 border-blue-400 shadow-md' : ''
                    }`}
                  >
                    <div className="cursor-grab p-1 text-slate-300 hover:text-slate-500">
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1866EF] text-white">
                      {h.level}
                    </span>

                    <span className="flex-1 font-medium text-slate-800">
                      {h.text}
                    </span>

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
                          {['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].map((lvl) => (
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

                    <button
                      type="button"
                      onClick={() => handleRemoveHeading(h.id)}
                      className="p-1 rounded border border-[#FECACA] hover:bg-rose-50 text-[#B91C1C] transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                    </button>
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
        {/* TAB 3: Konfigurasi API & AI (matches media_1794227195531_81f71f93.jpg) */}
        {/* ======================================================== */}
        {activeTab === 'api' && (
          <div className="space-y-5">
            {/* Header with Title and Active Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  Konfigurasi API & Batasan AI
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kredensial enkripsi pihak ketiga, limitasi token bulanan, dan batas skor kelayakan evergreen.
                </p>
              </div>

              <span className="h-[26px] px-3 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#15803D] flex items-center">
                AKTIF (Claude 3.5 Sonnet)
              </span>
            </div>

            {/* Section 1: Anthropic Claude API Key */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-900 block">
                Anthropic Claude API Key
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full h-[40px] px-3.5 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => showSuccess('Model AI', 'Model Claude 3.5 Sonnet berhasil terhubung.')}
                  className="h-[40px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs shrink-0 whitespace-nowrap w-full sm:w-auto"
                >
                  Hubungkan Model
                </button>
              </div>
            </div>

            {/* Section 2: Ambang Batas Skor Evergreen */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-900 block">
                Ambang Batas Skor Evergreen (Min: 60%)
              </label>
              <p className="text-xs text-slate-400">
                Keyword skor &lt; 60% otomatis dialihkan ke status Review Manual.
              </p>
              <div className="relative w-28">
                <input
                  type="number"
                  value={evergreenThreshold}
                  onChange={(e) => setEvergreenThreshold(e.target.value)}
                  className="w-full h-[40px] px-3.5 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
                <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-500 pointer-events-none">
                  %
                </span>
              </div>
            </div>

            {/* Section 3: Limit Pemakaian AI Bulanan */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>Limit Pemakaian AI Bulanan (Token/Bulan)</span>
                <span>86%</span>
              </div>
              <div className="w-full bg-[#E2E8F0] rounded-full h-[7px] overflow-hidden">
                <div className="bg-[#1866EF] h-[7px] rounded-full" style={{ width: '86%' }} />
              </div>
              <div className="text-xs text-slate-500">
                14.250.000 / 20.000.000 Token
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
                onClick={handleSaveApi}
                className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
