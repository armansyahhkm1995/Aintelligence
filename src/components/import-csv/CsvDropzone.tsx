import React, { useState } from 'react'
import { Upload, ChevronDown, FileText, GitCompare } from 'lucide-react'

interface CsvDropzoneProps {
  isUploading: boolean
  isDropdownOpen: boolean
  setIsDropdownOpen: (open: boolean) => void
  onSelectImportType: (type: 'keyword' | 'keyword_gap') => void
}

export const CsvDropzone: React.FC<CsvDropzoneProps> = ({
  isUploading,
  isDropdownOpen,
  setIsDropdownOpen,
  onSelectImportType,
}) => {
  return (
    <div className="bg-[#EFF6FF] border-2 border-dashed border-[#BFDBFE] rounded-xl p-8 sm:p-10 text-center transition-colors space-y-4">
      <div className="flex justify-center">
        <Upload className="w-7 h-7 text-[#1866EF]" />
      </div>
      <div>
        <h2 className="text-sm font-bold text-slate-900 mb-1">
          Tarik dan seret file CSV Semrush di sini, atau klik tombol di bawah
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Hanya format .CSV yang didukung. Maksimal 50.000 baris / 25 MB.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={isUploading}
            className="h-10 px-6 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center justify-center gap-2"
          >
            {isUploading ? (
              'Memproses Berkas...'
            ) : (
              <>
                <span>Pilih File CSV dari Komputer</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden text-left py-1.5 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Pilih Format Impor
              </div>
              <button
                type="button"
                onClick={() => onSelectImportType('keyword')}
                className="w-full px-4 py-3 hover:bg-blue-50/70 text-slate-800 flex items-start gap-3 transition-colors cursor-pointer group text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#1866EF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1866EF] group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-[#1866EF]">
                    Impor CSV Kata Kunci
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Format standar riset kata kunci: Volume, KD%, dan Intensi
                  </div>
                </div>
              </button>

              <div className="h-px bg-slate-100 my-1" />

              <button
                type="button"
                onClick={() => onSelectImportType('keyword_gap')}
                className="w-full px-4 py-3 hover:bg-blue-50/70 text-slate-800 flex items-start gap-3 transition-colors cursor-pointer group text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <GitCompare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    Impor CSV Perbandingan Kata Kunci (Keyword Gap)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Format perbandingan peringkat domain kompetitor (detik.com vs liputan6.com)
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
