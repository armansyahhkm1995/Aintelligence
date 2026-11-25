import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { Sliders, X, Search } from 'lucide-react'

export const AddRuleModal: React.FC = () => {
  const {
    isTambahAturanOpen,
    setIsTambahAturanOpen,
    addRule,
    editRule,
    ruleToEdit,
    setRuleToEdit,
    keywords: existingKeywordsList,
  } = useApp()

  const [name, setName] = useState('')
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [inputKeyword, setInputKeyword] = useState('')
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [category, setCategory] = useState<'Berisiko' | 'Musiman' | 'Non-evergreen'>('Berisiko')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  const suggestionBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ruleToEdit) {
      setName(ruleToEdit.name || '')
      setSelectedKeywords(Array.isArray(ruleToEdit.keywords) ? ruleToEdit.keywords : [])
      setInputKeyword('')
      const validCategory: 'Berisiko' | 'Musiman' | 'Non-evergreen' =
        ruleToEdit.category === 'Musiman' || ruleToEdit.category === 'Non-evergreen'
          ? ruleToEdit.category
          : 'Berisiko'
      setCategory(validCategory)
      setDescription(ruleToEdit.description || '')
      setIsActive(ruleToEdit.status === 'Aktif')
    } else {
      setName('')
      setSelectedKeywords([])
      setInputKeyword('')
      setCategory('Berisiko')
      setDescription('')
      setIsActive(true)
    }
  }, [ruleToEdit, isTambahAturanOpen])

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isTambahAturanOpen) return null

  const handleClose = () => {
    setIsTambahAturanOpen(false)
    setRuleToEdit(null)
  }

  // All distinct keyword strings from Kata Kunci menu
  const allAvailableKeywords = Array.from(
    new Set((existingKeywordsList || []).map((k) => k.keyword.trim()).filter(Boolean))
  )

  // Filter suggestions matching input
  const filteredSuggestions = inputKeyword.trim()
    ? allAvailableKeywords.filter(
        (kw) =>
          kw.toLowerCase().includes(inputKeyword.trim().toLowerCase()) &&
          !selectedKeywords.some((sel) => sel.toLowerCase() === kw.toLowerCase())
      )
    : allAvailableKeywords
        .filter((kw) => !selectedKeywords.some((sel) => sel.toLowerCase() === kw.toLowerCase()))
        .slice(0, 8)

  const handleAddKeyword = (kw: string) => {
    const trimmed = kw.trim()
    if (!trimmed) return
    if (!selectedKeywords.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedKeywords((prev) => [...prev, trimmed])
    }
    setInputKeyword('')
    setIsSuggestionsOpen(false)
  }

  const handleRemoveKeyword = (kwToRemove: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== kwToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputKeyword.trim()) {
        handleAddKeyword(inputKeyword)
      }
    } else if (e.key === 'Backspace' && !inputKeyword && selectedKeywords.length > 0) {
      handleRemoveKeyword(selectedKeywords[selectedKeywords.length - 1])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Include any typed text that hasn't been added yet
    const finalKeywords = [...selectedKeywords]
    if (inputKeyword.trim() && !finalKeywords.includes(inputKeyword.trim())) {
      finalKeywords.push(inputKeyword.trim())
    }

    if (finalKeywords.length === 0) {
      return
    }

    if (ruleToEdit) {
      editRule(ruleToEdit.id, {
        name,
        description,
        keywords: finalKeywords,
        category,
        status: isActive ? 'Aktif' : 'Nonaktif',
      })
    } else {
      addRule({
        name,
        description,
        keywords: finalKeywords,
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

          {/* Multi-Keyword Input with Autocomplete from Kata Kunci database */}
          <div className="relative" ref={suggestionBoxRef}>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-800">
                Kata Kunci yang Diblokir <span className="text-rose-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">
                Ketik & tekan Enter atau pilih dari menu Kata Kunci
              </span>
            </div>

            {/* Container Chips + Input */}
            <div
              onClick={() => setIsSuggestionsOpen(true)}
              className="w-full min-h-[42px] p-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600 flex flex-wrap items-center gap-1.5 transition-all cursor-text"
            >
              {selectedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-xs font-semibold rounded-md animate-in fade-in zoom-in-95"
                >
                  <span>{kw}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveKeyword(kw)
                    }}
                    className="text-[#1D4ED8]/60 hover:text-[#B91C1C] transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={inputKeyword}
                onChange={(e) => {
                  setInputKeyword(e.target.value)
                  setIsSuggestionsOpen(true)
                }}
                onFocus={() => setIsSuggestionsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={
                  selectedKeywords.length === 0
                    ? 'Ketik kata kunci atau pilih dari rekomendasi...'
                    : 'Tambah kata kunci lagi...'
                }
                className="flex-1 min-w-[140px] text-xs text-slate-800 bg-transparent focus:outline-none py-1 px-1 placeholder:text-slate-400"
              />
            </div>

            {/* Dropdown Autocomplete Suggestions */}
            {isSuggestionsOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl py-1.5 z-50 max-h-52 overflow-y-auto text-xs animate-in fade-in duration-100">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100">
                  <span>Daftar Kata Kunci dari Menu Kata Kunci:</span>
                  <span className="text-[#1866EF]">
                    {filteredSuggestions.length} ditemukan
                  </span>
                </div>

                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => handleAddKeyword(kw)}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 text-slate-800 hover:text-[#1866EF] font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{kw}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        Pilih
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-3 text-center text-slate-400 text-xs">
                    {inputKeyword.trim() ? (
                      <div>
                        Tidak ada kata kunci terdaftar yang cocok dengan "
                        <strong className="text-slate-700">{inputKeyword}</strong>".
                        <div className="text-[11px] text-[#1866EF] mt-1 font-semibold">
                          Tekan Enter untuk tetap menambahkan kata kunci baru ini.
                        </div>
                      </div>
                    ) : (
                      'Semua kata kunci terdaftar sudah dipilih.'
                    )}
                  </div>
                )}
              </div>
            )}
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

          {/* Toggle / Switch for Aturan Aktif */}
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
              disabled={selectedKeywords.length === 0 && !inputKeyword.trim()}
              className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {isEditing ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
