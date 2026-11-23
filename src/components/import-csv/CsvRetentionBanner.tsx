import React from 'react'
import { Upload, X } from 'lucide-react'

interface CsvRetentionBannerProps {
  isVisible?: boolean
  daysSinceLastUpload?: number
  retentionDays?: number
  onUploadClick: () => void
  onDismiss?: () => void
}

export const CsvRetentionBanner: React.FC<CsvRetentionBannerProps> = ({
  isVisible = true,
  daysSinceLastUpload = 9,
  retentionDays = 7,
  onUploadClick,
  onDismiss,
}) => {
  if (!isVisible) return null

  return (
    <div className="w-full bg-amber-50/90 border border-amber-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-amber-950">
          Pemberitahuan Retensi: Perlu Unggah Dataset Kata Kunci Terbaru
        </h3>
        <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
          Anda belum mengunggah data kata kunci dari SEMrush dalam waktu{' '}
          <strong>{daysSinceLastUpload} hari terakhir</strong> (batas retensi redaksi:{' '}
          <strong>{retentionDays} hari</strong>). Perbarui dataset riset secara berkala agar arahan editorial dan tren topik tetap relevan serta akurat.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onUploadClick}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Unggah Sekarang</span>
        </button>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-100/60 rounded-lg transition-colors cursor-pointer"
            title="Tutup Pemberitahuan"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
