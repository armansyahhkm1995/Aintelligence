import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Sliders, X } from 'lucide-react'

export const AddRuleModal: React.FC = () => {
  const { isTambahAturanOpen, setIsTambahAturanOpen, addRule } = useApp()

  const [name, setName] = useState('')
  const [keywordsStr, setKeywordsStr] = useState('')
  const [category, setCategory] = useState('Berisiko')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  if (!isTambahAturanOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const kwList = keywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)

    addRule({
      name,
      description,
      keywords: kwList.length > 0 ? kwList : ['kata_kunci'],
      category,
      status: isActive ? 'Aktif' : 'Nonaktif',
    })

    setName('')
    setKeywordsStr('')
    setDescription('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Tambah Aturan Filter</h2>
          </div>
          <button
            onClick={() => setIsTambahAturanOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Nama Aturan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis nama aturan di sini ..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Kata Kunci yang Diblokir <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={keywordsStr}
              onChange={(e) => setKeywordsStr(e.target.value)}
              placeholder="Tulis kata kunci yang ingin diblokir di sini (pisahkan dengan koma) ..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Jenis Filter
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
            >
              <option value="Berisiko">Berisiko</option>
              <option value="Musiman">Musiman</option>
              <option value="Non-evergreen">Non-evergreen</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Keterangan
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tulis keterangan kata kunci yang ingin diblokir di sini ..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="rule-active-check"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <label htmlFor="rule-active-check" className="text-xs font-medium text-slate-700 cursor-pointer">
              Aturan aktif
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsTambahAturanOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0375E5] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
