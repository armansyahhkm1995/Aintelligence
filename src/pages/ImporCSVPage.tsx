import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { useApp } from '../context/AppContext'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'
import {
  PREVIEW_DATA,
  KEYWORD_GAP_PREVIEW_DATA,
  HISTORY_DATA,
} from '../components/import-csv/importCsvData'
import type { DuplicateFileInfo } from '../components/import-csv/types'
import { CsvRetentionBanner } from '../components/import-csv/CsvRetentionBanner'
import { CsvDropzone } from '../components/import-csv/CsvDropzone'
import { CsvDuplicateModal } from '../components/import-csv/CsvDuplicateModal'
import { CsvMetricsCards } from '../components/import-csv/CsvMetricsCards'
import { CsvPreviewTable } from '../components/import-csv/CsvPreviewTable'
import { CsvHistoryTable } from '../components/import-csv/CsvHistoryTable'

export const ImporCSVPage: React.FC = () => {
  const { showSuccess } = useToast()
  const {
    csvCooldownMonths,
    setNewKeywordsBadgeCount,
    setNewKeywordGapBadgeCount,
  } = useApp()

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false)
  const [duplicateFileInfo, setDuplicateFileInfo] = useState<DuplicateFileInfo | null>(null)
  const [isUploadDropdownOpen, setIsUploadDropdownOpen] = useState(false)
  const [selectedImportType, setSelectedImportType] = useState<'keyword' | 'keyword_gap'>('keyword')
  const [previewFileName, setPreviewFileName] = useState<string>('semrush_keywords_export_nov2026.csv')
  const [showRetentionBanner, setShowRetentionBanner] = useState<boolean>(true)

  const handleSelectImportType = (type: 'keyword' | 'keyword_gap') => {
    setIsUploadDropdownOpen(false)
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setSelectedImportType(type)
      if (type === 'keyword') {
        setPreviewFileName('semrush_keywords_export_nov2026.csv')
        setNewKeywordsBadgeCount(10)
        showSuccess(
          'Impor CSV Kata Kunci Selesai',
          'Berkas semrush_keywords_export_nov2026.csv berhasil divalidasi. 10 kata kunci baru siap ditinjau di menu Kata Kunci (+10).'
        )
      } else {
        setPreviewFileName('semrush_keyword_gap_detik_liputan6.csv')
        setNewKeywordGapBadgeCount(10)
        showSuccess(
          'Impor CSV Perbandingan Kata Kunci Selesai',
          'Berkas semrush_keyword_gap_detik_liputan6.csv berhasil divalidasi. 10 data gap kata kunci siap ditinjau di menu Perbandingan Kata Kunci (+10).'
        )
      }
    }, 600)
  }

  const handleDownloadErrorLog = (fileName: string) => {
    const text = `Log Galat Impor CSV: ${fileName}\nTanggal: 3 Jul 2026, 09:31\nBaris 2: Kolom volume 'Teks: N/A' bukan format numerik.`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `error-log-${fileName}.txt`
    a.click()
    showSuccess('Log Galat', `Log galat untuk ${fileName} berhasil diunduh.`)
  }

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 1 Active */}
      <MilestoneStepper currentStep={1} />

      {/* 2. Page Title and Description */}
      <div>
        <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
          Impor file Semrush CSV
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Unggah berkas CSV hasil riset Semrush, lakukan pemetaan kolom, dan validasi sebelum diproses oleh AI.
        </p>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={1} />

      {/* Full-width 100% Alert Banner / Flag Retensi CSV */}
      <CsvRetentionBanner
        isVisible={showRetentionBanner}
        daysSinceLastUpload={9}
        retentionDays={7}
        onUploadClick={() => setIsUploadDropdownOpen(true)}
        onDismiss={() => setShowRetentionBanner(false)}
      />

      {/* 4. Drag & Drop Upload Zone */}
      <CsvDropzone
        isUploading={isUploading}
        isDropdownOpen={isUploadDropdownOpen}
        setIsDropdownOpen={setIsUploadDropdownOpen}
        onSelectImportType={handleSelectImportType}
      />

      {/* Duplicate Alert Modal */}
      <CsvDuplicateModal
        isOpen={isDuplicateAlertOpen}
        info={duplicateFileInfo}
        cooldownMonths={csvCooldownMonths}
        onClose={() => setIsDuplicateAlertOpen(false)}
      />

      {/* Metrics Row: 3 Cards Informasi CSV */}
      <CsvMetricsCards />

      {/* 5. Table 1: Pratinjau Berkas CSV Terpilih */}
      <CsvPreviewTable
        previewFileName={previewFileName}
        selectedImportType={selectedImportType}
        previewData={PREVIEW_DATA}
        keywordGapPreviewData={KEYWORD_GAP_PREVIEW_DATA}
      />

      {/* 6. Table 2: Riwayat Impor Data */}
      <CsvHistoryTable
        historyData={HISTORY_DATA}
        onDownloadErrorLog={handleDownloadErrorLog}
      />
    </div>
  )
}
