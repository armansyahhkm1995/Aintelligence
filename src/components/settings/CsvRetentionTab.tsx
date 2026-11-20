import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'

export const CsvRetentionTab: React.FC = () => {
  const { csvRetentionDays, setCsvRetentionDays, lastCsvUploadDate } = useApp()
  const { showSuccess } = useToast()

  const [tempRetentionDays, setTempRetentionDays] = useState<number>(csvRetentionDays || 7)

  const calculateDaysSinceUpload = () => {
    try {
      const uploadTime = new Date(lastCsvUploadDate).getTime()
      const nowTime = new Date(2026, 10, 19).getTime() // 19 Nov 2026
      const diffTime = Math.max(0, nowTime - uploadTime)
      return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    } catch {
      return 9
    }
  }
  const daysSinceLastUpload = calculateDaysSinceUpload()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          Pengaturan Retensi Unggah CSV SEMrush
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Konfigurasi batas waktu retensi (hari) dataset kata kunci. Sistem akan otomatis memunculkan flag notifikasi di halaman Impor CSV saat rentang waktu sejak unggahan terakhir melampaui batas ini.
        </p>
      </div>

      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
        {/* Form Input Hari */}
        <div className="max-w-xl space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1.5">
              Batas Waktu Retensi Dataset (Hari)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={365}
                value={tempRetentionDays}
                onChange={(e) => setTempRetentionDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-32 px-3.5 py-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] font-semibold"
              />
              <span className="text-xs font-semibold text-slate-600">Hari</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Sistem akan menghitung selisih hari dari berkas CSV riset SEMrush terakhir yang diunggah. Jika selisih hari melebihi batas ini, flag peringatan/notifikasi akan otomatis tampil di halaman Impor CSV.
            </p>
          </div>

          {/* Status Box */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Unggahan CSV Terakhir:</span>
              <span className="font-semibold text-slate-800">
                10 Nov 2026 ({daysSinceLastUpload} hari yang lalu)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Batas Retensi Saat Ini:</span>
              <span className="font-semibold text-[#1866EF]">
                {csvRetentionDays} Hari
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setTempRetentionDays(csvRetentionDays)}
            className="h-[36px] px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              setCsvRetentionDays(tempRetentionDays)
              showSuccess(
                'Pengaturan Unggah CSV Disimpan',
                `Batas waktu retensi berhasil diperbarui menjadi ${tempRetentionDays} hari.`
              )
            }}
            className="h-[36px] px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  )
}
