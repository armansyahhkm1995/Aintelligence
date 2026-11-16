import React, { useState } from 'react'
import {
  Search,
  ChevronDown,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useToast } from '../context/ToastContext'

interface TaskItem {
  id: string
  name: string
  type: 'Klasifikasi CSV' | 'Pengelompokan Topik' | 'Generasi Arahan' | 'Generasi Draf'
  model: string
  createdAt: string
  status: 'antre' | 'diproses' | 'selesai' | 'gagal'
  details: string
}

export const AntreanTugasPage: React.FC = () => {
  const { showSuccess, showWarning } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')

  // Mock task queue data
  const [taskList, setTaskList] = useState<TaskItem[]>([
    {
      id: 'TSK-101',
      name: 'Keyword_Kesehatan_Nov.csv',
      type: 'Klasifikasi CSV',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 10:05 WIB',
      status: 'antre',
      details: 'Menunggu slot worker AI untuk parsing 1.200 baris kata kunci kesehatan.',
    },
    {
      id: 'TSK-102',
      name: 'Panduan Investasi Reksadana 2027',
      type: 'Generasi Draf',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 10:05 WIB',
      status: 'antre',
      details: 'Menunggu giliran generasi naskah artikel pilar (2.000 kata).',
    },
    {
      id: 'TSK-103',
      name: 'Update Harga Emas Antam Hari Ini',
      type: 'Generasi Draf',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 09:58 WIB',
      status: 'diproses',
      details: 'AI sedang menyusun kerangka dan naskah artikel berbasis data harga resmi.',
    },
    {
      id: 'TSK-104',
      name: 'Otomotif & Kendaraan Listrik',
      type: 'Pengelompokan Topik',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 09:55 WIB',
      status: 'diproses',
      details: 'Mengelompokkan 340 kueri otomotif ke dalam kelompok topik relevan.',
    },
    {
      id: 'TSK-105',
      name: 'Strategi Ketahanan Pangan Nasional 2027',
      type: 'Generasi Draf',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 09:40 WIB',
      status: 'selesai',
      details: 'Selesai diproses (1.850 kata, Skor SEO 94, 200 Token terpakai).',
    },
    {
      id: 'TSK-106',
      name: 'Topik: Wisata Liburan Akhir Tahun',
      type: 'Pengelompokan Topik',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 09:30 WIB',
      status: 'selesai',
      details: 'Selesai diproses (12 kelompok topik terbentuk tanpa bentrok).',
    },
    {
      id: 'TSK-107',
      name: 'Panduan ESG di Indonesia',
      type: 'Generasi Arahan',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 09:15 WIB',
      status: 'gagal',
      details: 'Timeout: Respons model melebihi batas waktu (120s). Siap dicoba ulang.',
    },
    {
      id: 'TSK-108',
      name: 'Politik_Pilkada_2026.csv',
      type: 'Klasifikasi CSV',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 09:00 WIB',
      status: 'gagal',
      details: 'Gagal parsing: Format berkas memiliki 8 kolom kosong tanpa header.',
    },
    {
      id: 'TSK-109',
      name: 'Tips Mengatur Keuangan Fresh Graduate',
      type: 'Generasi Arahan',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 08:45 WIB',
      status: 'selesai',
      details: 'Brief arahan artikel selesai dengan 4 referensi otoritas resmi.',
    },
    {
      id: 'TSK-110',
      name: 'Kripto & Regulasi Pajak 2026',
      type: 'Generasi Arahan',
      model: 'Worker Claude 3.5 Sonnet',
      createdAt: '12 Nov 2026, 08:20 WIB',
      status: 'antre',
      details: 'Antrean prioritas normal, menunggu verifikasi aturan OJK.',
    },
  ])

  const counts = {
    antre: taskList.filter((t) => t.status === 'antre').length + 21,
    diproses: taskList.filter((t) => t.status === 'diproses').length + 10,
    selesai: 142,
    gagal: taskList.filter((t) => t.status === 'gagal').length,
  }

  const filteredTasks = taskList.filter((task) => {
    const matchSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.details.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = !filterStatus || task.status === filterStatus
    const matchType = !filterType || task.type === filterType
    return matchSearch && matchStatus && matchType
  })

  const handleRetryTask = (id: string, name: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'antre', details: 'Menunggu slot pemrosesan ulang...' } : t))
    )
    showSuccess('Antrean Tugas', `Tugas "${name}" berhasil dimasukkan kembali ke antrean.`)
  }

  const handleCancelTask = (id: string, name: string) => {
    setTaskList((prev) => prev.filter((t) => t.id !== id))
    showWarning('Antrean Tugas', `Tugas "${name}" berhasil dibatalkan dari antrean.`)
  }

  return (
    <div className="space-y-6">
      {/* 1. Page Header with Consistent Aintelligence Style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="max-w-[650px]">
          <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
            Antrean Tugas AI & Pemrosesan
          </h1>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Monitor dan lacak progres pemrosesan tugas AI serta antrean otomatisasi redaksi secara realtime.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF] flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Worker Claude 3.5 Sonnet Aktif</span>
          </span>
        </div>
      </div>

      {/* 2. Status Metric Cards (Antre, Diproses, Selesai, Gagal) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Antre */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'antre' ? '' : 'antre')}
          className={`bg-white border rounded-[6px] p-4 shadow-xs cursor-pointer transition-all ${
            filterStatus === 'antre' ? 'border-[#B45309] ring-2 ring-amber-200' : 'border-[#FDE68A] hover:bg-amber-50/30'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-[#B45309]">Antre</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{counts.antre} Tugas</div>
          <div className="text-[11px] text-slate-400 mt-1">Menunggu giliran eksekusi</div>
        </div>

        {/* Diproses */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'diproses' ? '' : 'diproses')}
          className={`bg-white border rounded-[6px] p-4 shadow-xs cursor-pointer transition-all ${
            filterStatus === 'diproses' ? 'border-[#1866EF] ring-2 ring-blue-200' : 'border-[#BFDBFE] hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-[#1866EF]">Diproses</span>
            <PlayCircle className="w-4 h-4 text-[#1866EF]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{counts.diproses} Tugas</div>
          <div className="text-[11px] text-slate-400 mt-1">Sedang dikerjakan oleh AI</div>
        </div>

        {/* Selesai */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'selesai' ? '' : 'selesai')}
          className={`bg-white border rounded-[6px] p-4 shadow-xs cursor-pointer transition-all ${
            filterStatus === 'selesai' ? 'border-[#15803D] ring-2 ring-green-200' : 'border-[#BBF7D0] hover:bg-green-50/30'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-[#15803D]">Selesai</span>
            <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{counts.selesai} Tugas</div>
          <div className="text-[11px] text-slate-400 mt-1">Berhasil tanpa kendala</div>
        </div>

        {/* Gagal */}
        <div
          onClick={() => setFilterStatus(filterStatus === 'gagal' ? '' : 'gagal')}
          className={`bg-white border rounded-[6px] p-4 shadow-xs cursor-pointer transition-all ${
            filterStatus === 'gagal' ? 'border-[#DC2626] ring-2 ring-rose-200' : 'border-[#FECACA] hover:bg-rose-50/30'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-[#DC2626]">Gagal</span>
            <AlertCircle className="w-4 h-4 text-[#DC2626]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{counts.gagal} Tugas</div>
          <div className="text-[11px] text-slate-400 mt-1">Butuh coba ulang atau tinjauan</div>
        </div>
      </div>

      {/* 3. Table Container with Search & Filters */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
        {/* Search & Filter Controls */}
        <div className="space-y-3">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tugas, judul artikel, atau kueri..."
              className="w-full h-[40px] pl-10 pr-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Dropdowns Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Filter Status */}
            <div className="relative flex-1 w-full">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="">Status: Semua (Antre, Diproses, Selesai, Gagal)</option>
                <option value="antre">Status: Antre</option>
                <option value="diproses">Status: Diproses</option>
                <option value="selesai">Status: Selesai</option>
                <option value="gagal">Status: Gagal</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter Tipe Tugas */}
            <div className="relative flex-1 w-full">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterType ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="">Tipe Tugas: Semua Proses</option>
                <option value="Klasifikasi CSV">Klasifikasi CSV</option>
                <option value="Pengelompokan Topik">Pengelompokan Topik</option>
                <option value="Generasi Arahan">Generasi Arahan</option>
                <option value="Generasi Draf">Generasi Draf</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Clear Button */}
            {(searchQuery || filterStatus || filterType) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setFilterStatus('')
                  setFilterType('')
                }}
                className="w-auto h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors shrink-0 whitespace-nowrap cursor-pointer"
              >
                Bersihkan Filter
              </button>
            )}
          </div>
        </div>

        {/* 4. Table */}
        <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold">Nama Tugas / Entitas</th>
                  <th className="py-3 px-4 font-semibold">Tipe Proses</th>
                  <th className="py-3 px-4 font-semibold">Model AI</th>
                  <th className="py-3 px-4 font-semibold">Waktu Dibuat</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Tidak ada tugas yang sesuai dengan pencarian atau filter.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => {
                    const statusConfig = {
                      antre: {
                        label: 'Antre',
                        bg: 'bg-[#FFFBEB]',
                        text: 'text-[#B45309]',
                        border: 'border-amber-200',
                      },
                      diproses: {
                        label: 'Diproses',
                        bg: 'bg-[#EFF6FF]',
                        text: 'text-[#1866EF]',
                        border: 'border-[#BFDBFE]',
                      },
                      selesai: {
                        label: 'Selesai',
                        bg: 'bg-[#F0FDF4]',
                        text: 'text-[#15803D]',
                        border: 'border-[#BBF7D0]',
                      },
                      gagal: {
                        label: 'Gagal',
                        bg: 'bg-[#FEF2F2]',
                        text: 'text-[#DC2626]',
                        border: 'border-[#FECACA]',
                      },
                    }[task.status]

                    return (
                      <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{task.name}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 max-w-[280px] truncate" title={task.details}>
                            {task.details}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-medium inline-flex items-center gap-1">
                            <Layers className="w-3 h-3 text-slate-500" />
                            <span>{task.type}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium text-[11px]">
                          {task.model}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {task.createdAt}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {task.status === 'gagal' && (
                              <button
                                type="button"
                                onClick={() => handleRetryTask(task.id, task.name)}
                                className="px-2 py-1 bg-[#1866EF] hover:bg-blue-600 text-white rounded text-[11px] font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                                title="Coba Ulang Tugas"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Coba Ulang</span>
                              </button>
                            )}
                            {task.status === 'antre' && (
                              <button
                                type="button"
                                onClick={() => handleCancelTask(task.id, task.name)}
                                className="px-2 py-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                                title="Batalkan Antrean"
                              >
                                Batalkan
                              </button>
                            )}
                            {task.status === 'selesai' && (
                              <span className="text-[11px] text-slate-400 font-medium">Tersimpan</span>
                            )}
                            {task.status === 'diproses' && (
                              <span className="text-[11px] text-[#1866EF] font-medium animate-pulse">Berjalan...</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="p-3.5 bg-white border-t border-[#DBEAFE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <span>Menampilkan 1-10 dari {counts.antre + counts.diproses + counts.selesai + counts.gagal} tugas</span>
              <div className="relative">
                <select className="h-[28px] pl-2 pr-6 bg-white border border-[#DBEAFE] rounded text-xs text-slate-700 appearance-none cursor-pointer">
                  <option>10 / hal</option>
                  <option>25 / hal</option>
                  <option>50 / hal</option>
                </select>
                <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-500 cursor-pointer disabled:opacity-50"
                disabled
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center bg-[#1866EF] text-white font-semibold rounded cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                2
              </button>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                3
              </button>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center border border-[#DBEAFE] rounded hover:bg-slate-50 text-slate-500 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
