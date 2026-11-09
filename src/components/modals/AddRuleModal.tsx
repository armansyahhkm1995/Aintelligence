import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { Sliders, X } from 'lucide-react'

export const AddRuleModal: React.FC = () => {
  const {
    isTambahAturanOpen,
    setIsTambahAturanOpen,
    addRule,
    editRule,
    ruleToEdit,
    setRuleToEdit,
  } = useApp()

  const [name, setName] = useState('')
  const [keywordsStr, setKeywordsStr] = useState('')
  const [category, setCategory] = useState<'Berisiko' | 'Musiman' | 'Non-evergreen'>('Berisiko')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (ruleToEdit) {
      setName(ruleToEdit.name || '')
      setKeywordsStr(Array.isArray(ruleToEdit.keywords) ? ruleToEdit.keywords.join(', ') : '')
      const validCategory: 'Berisiko' | 'Musiman' | 'Non-evergreen' =
        ruleToEdit.category === 'Musiman' || ruleToEdit.category === 'Non-evergreen'
          ? ruleToEdit.category
          : 'Berisiko'
      setCategory(validCategory)
      setDescription(ruleToEdit.description || '')
      setIsActive(ruleToEdit.status === 'Aktif')
    } else {
      setName('')
      setKeywordsStr('')
      setCategory('Berisiko')
      setDescription('')
      setIsActive(true)
    }
  }, [ruleToEdit, isTambahAturanOpen])

  if (!isTambahAturanOpen) return null

  const handleClose = () => {
    setIsTambahAturanOpen(false)
    setRuleToEdit(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const kwList = keywordsStr
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)

    if (ruleToEdit) {
      editRule(ruleToEdit.id, {
        name,
        description,
        keywords: kwList.length > 0 ? kwList : ['kata_kunci'],
        category,
        status: isActive ? 'Aktif' : 'Nonaktif',
      })
    } else {
      addRule({
        name,
        description,
        keywords: kwList.length > 0 ? kwList : ['kata_kunci'],
        category,
        status: isActive ? 'Aktif' : 'Nonaktif',
      })
    }

    handleClose()
  }

  const isEditing = Boolean(ruleToEdit)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? 'Perbarui Aturan Filter' : 'Tambah Aturan Filter'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
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
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white cursor-pointer"
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

          {/* Toggle / Switch for Aturan Aktif (replacing checkbox per user request) */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                isActive ? 'bg-[#1D4ED8]' : 'bg-slate-200'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span
              onClick={() => setIsActive(!isActive)}
              className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
            >
              Aturan aktif
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {isEditing ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
