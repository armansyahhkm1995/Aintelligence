import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { SearchIntent, ClusterKeywordRef } from '../../types'
import {
  X,
  RefreshCw,
  Trash2,
  Plus,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react'

export const EditClusterDrawer: React.FC = () => {
  const {
    isEditClusterDrawerOpen,
    setIsEditClusterDrawerOpen,
    activeCluster,
    updateCluster,
  } = useApp()

  const [clusterName, setClusterName] = useState('')
  const [intent, setIntent] = useState<SearchIntent>('Informational')
  const [pillarKeyword, setPillarKeyword] = useState<ClusterKeywordRef>({
    text: '',
    vol: 0,
    kd: 0,
  })
  const [supportingKeywords, setSupportingKeywords] = useState<ClusterKeywordRef[]>([])
  const [newKeywordInput, setNewKeywordInput] = useState('')

  useEffect(() => {
    if (activeCluster) {
      setClusterName(activeCluster.name || '')
      setIntent(activeCluster.intent || 'Informational')
      const p =
        typeof activeCluster.pillarKeyword === 'object' && activeCluster.pillarKeyword !== null
          ? activeCluster.pillarKeyword
          : { text: String(activeCluster.pillarKeyword || ''), vol: 22000, kd: 28 }
      setPillarKeyword(p)
      const supp = Array.isArray(activeCluster.supportingKeywords)
        ? activeCluster.supportingKeywords.map((k) =>
            typeof k === 'object' && k !== null ? k : { text: String(k), vol: 15000, kd: 25 }
          )
        : []
      setSupportingKeywords(supp)
    }
  }, [activeCluster])

  if (!isEditClusterDrawerOpen || !activeCluster) return null

  // Calculate live score
  const pillarVol = pillarKeyword?.vol || 0
  const pillarKd = pillarKeyword?.kd || 0
  const totalVolume =
    pillarVol + (supportingKeywords || []).reduce((acc, k) => acc + (k?.vol || 0), 0)
  const totalCount = 1 + (supportingKeywords || []).length
  const avgKd = Math.round(
    (pillarKd + (supportingKeywords || []).reduce((acc, k) => acc + (k?.kd || 0), 0)) /
      (totalCount || 1)
  )

  const handleSwapPillar = (idx: number) => {
    const candidate = supportingKeywords[idx]
    const currentPillar = pillarKeyword
    setPillarKeyword(candidate)
    const updated = [...supportingKeywords]
    updated[idx] = currentPillar
    setSupportingKeywords(updated)
  }

  const handleRemoveSupporting = (idx: number) => {
    setSupportingKeywords((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeywordInput.trim()) return
    const newK: ClusterKeywordRef = {
      text: newKeywordInput.trim(),
      vol: 12000,
      kd: 30,
    }
    setSupportingKeywords((prev) => [...prev, newK])
    setNewKeywordInput('')
  }

  const handleSave = () => {
    updateCluster(activeCluster.id, {
      name: clusterName,
      intent,
      pillarKeyword,
      supportingKeywords,
      totalVol: totalVolume,
      avgKd,
      keywordCount: totalCount,
      status: 'Aman',
    })
    setIsEditClusterDrawerOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-white h-screen shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header Panel */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-bold text-slate-900">
              Edit Struktur Cluster
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeCluster.status === 'Aman'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {activeCluster.status}
            </span>
          </div>
          <button
            onClick={() => setIsEditClusterDrawerOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Bagian 1: Informasi Dasar */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Nama Topik / Cluster
              </label>
              <input
                type="text"
                value={clusterName}
                onChange={(e) => setClusterName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Intent Pencarian
              </label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value as SearchIntent)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
              >
                <option value="Informational">Informational</option>
                <option value="Commercial">Commercial</option>
                <option value="Transactional">Transactional</option>
                <option value="Navigational">Navigational</option>
              </select>
            </div>
          </div>

          {/* Bagian 2: Ringkasan Metrik (Live Score) */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Total Volume: {totalVolume.toLocaleString('id-ID')} / bln</span>
              <span>Rata-rata KD: {avgKd}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Angka ini terhitung otomatis jika Anda menambah atau membuang kata kunci.</span>
            </div>
          </div>

          {/* Bagian 3: Manajemen Keyword */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-800 block">
              Manajemen Hierarki Kata Kunci
            </span>

            {/* Pillar Slot */}
            <div className="border-2 border-blue-500 bg-blue-50/30 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  Keyword Pilar (Induk)
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {pillarKeyword.text}
                </div>
                <div className="text-[10px] text-slate-500">
                  Vol {pillarKeyword.vol.toLocaleString('id-ID')} • KD {pillarKeyword.kd}%
                </div>
              </div>
            </div>

            {/* Supporting List */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Daftar Keyword Pendukung ({supportingKeywords.length})
              </span>
              {supportingKeywords.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 text-xs transition-colors"
                >
                  <div>
                    <div className="font-medium text-slate-900">{sk.text}</div>
                    <div className="text-[10px] text-slate-400">
                      Vol {sk.vol.toLocaleString('id-ID')} • KD {sk.kd}%
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSwapPillar(idx)}
                      className="px-2 py-1 text-[10px] font-medium border border-slate-200 hover:bg-slate-50 rounded flex items-center gap-1 text-slate-600"
                      title="Rotasi menjadi pilar"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Tukar Pilar</span>
                    </button>
                    <button
                      onClick={() => handleRemoveSupporting(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Pisahkan/Buang Keyword"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian 4: Tambah Keyword */}
          <form onSubmit={handleAddKeyword} className="space-y-2 pt-1 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-800">
              Tambah Keyword ke Cluster
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                placeholder="Cari dari daftar kata kunci baru..."
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer (Sticky di Bagian Bawah Drawer) */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3 shrink-0">
          <p className="text-[10px] text-slate-500 leading-tight">
            Perubahan struktur akan memicu AI untuk memvalidasi ulang potensi kanibalisasi.
          </p>
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditClusterDrawerOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-white text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-[#0375E5] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Simpan Perubahan & Hitung Ulang
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
