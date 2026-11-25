import React, { useState } from 'react'
import { GripVertical, ChevronDown, Trash2 } from 'lucide-react'
import { useToast } from '../../context/ToastContext'

interface HeadingTemplate {
  id: string
  level: string
  text: string
}

export const BukuGayaTab: React.FC = () => {
  const { showSuccess } = useToast()

  const [toneOfVoice, setToneOfVoice] = useState(
    'Lugas, Objektif, Terverifikasi, dan Ramah Pembaca Digital (Sesuai Pedoman Jurnalistik RRI)'
  )

  const [headingTemplates, setHeadingTemplates] = useState<HeadingTemplate[]>([
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
    if (lvl === 'H1') return
    setHeadingTemplates((prev) =>
      prev.map((h) => (h.id === id ? { ...h, level: lvl } : h))
    )
    setOpenLevelDropdownId(null)
  }

  const handleSaveBukuGaya = () => {
    showSuccess('Pengaturan Redaksi', 'Perubahan Buku Gaya berhasil disimpan.')
  }

  return (
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
          <div>
            <label className="text-xs font-semibold text-slate-900 block">
              Struktur Baku Heading Artikel (Template Output AI)
            </label>
            <p className="text-[11px] text-slate-400 mt-0.5">
              H1 bersifat tunggal dan permanen pada posisi teratas sebagai judul utama naskah.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddHeading}
              className="h-[32px] px-3 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
            >
              Tambah Heading
            </button>
          </div>
        </div>

        {/* Headings List with Drag-and-Drop */}
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
                <div className="w-6 p-1 text-slate-300" title="H1 Baku Permanen di Posisi Teratas" />
              )}

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  h.level === 'H1'
                    ? 'bg-[#1866EF] text-white'
                    : h.level === 'P'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#1866EF] text-white'
                }`}
              >
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
              {h.level === 'H1' ? (
                <div
                  className="h-[28px] px-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-400 flex items-center select-none cursor-not-allowed"
                  title="H1 Wajib Tunggal dan Permanen di Posisi Teratas"
                >
                  <span>H1 (Terkunci)</span>
                </div>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenLevelDropdownId(openLevelDropdownId === h.id ? null : h.id)
                    }
                    className="h-[28px] px-2.5 bg-white border border-[#DBEAFE] rounded text-xs font-medium text-slate-700 flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{h.level}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {openLevelDropdownId === h.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenLevelDropdownId(null)}
                      />
                      <div className="absolute right-0 top-full mt-1 w-20 bg-white border border-[#DBEAFE] rounded-[6px] shadow-lg z-20 py-1">
                        {['P', 'H2', 'H3', 'H4', 'H5', 'H6'].map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleSelectLevel(h.id, lvl)}
                            className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition-colors cursor-pointer ${
                              h.level === lvl ? 'text-[#1866EF] font-bold bg-blue-50/50' : 'text-slate-700'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {h.level !== 'H1' && (
                <button
                  type="button"
                  onClick={() => handleRemoveHeading(h.id)}
                  className="p-1 rounded border border-rose-200 hover:bg-rose-50 text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
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
          className="h-[36px] px-5 border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors cursor-pointer"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSaveBukuGaya}
          className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs cursor-pointer"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  )
}
