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
  const { showSuccess, showWarning } = useToast()
  const {
    csvCooldownMonths,
    setNewKeywordsBadgeCount,
    setNewKeywordGapBadgeCount,
    isTokenExhausted,
  } = useApp()

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isDuplicateAlertOpen, setIsDuplicateAlertOpen] = useState(false)
  const [duplicateFileInfo, setDuplicateFileInfo] = useState<DuplicateFileInfo | null>(null)
  const [isUploadDropdownOpen, setIsUploadDropdownOpen] = useState(false)
  const [selectedImportType, setSelectedImportType] = useState<'keyword' | 'keyword_gap'>('keyword')
  const [previewFileName, setPreviewFileName] = useState<string>('semrush_keywords_export_nov2026.csv')
  const [showRetentionBanner, setShowRetentionBanner] = useState<boolean>(true)

  // Tracking metadata berkas yang pernah diimpor untuk mencegah impor berulang kali
  const [importedFileRegistry, setImportedFileRegistry] = useState<
    Array<{ fileName: string; sizeBytes: number; uploadDate: string }>
  >([
    {
      fileName: 'semrush_keywords_export_nov2026.csv',
      sizeBytes: 1420580,
      uploadDate: '3 Jul 2026, 09:31',
    },
    {
      fileName: 'semrush_keyword_gap_detik_liputan6.csv',
      sizeBytes: 984500,
      uploadDate: '3 Jul 2026, 09:31',
    },
  ])

  const handleSelectImportType = (type: 'keyword' | 'keyword_gap', forceNewFile: boolean = false) => {
    setIsUploadDropdownOpen(false)

    // 1. Validasi Token Quota
    if (isTokenExhausted) {
      showWarning(
        'Unggah Ditolak (Token Habis)',
        'Kuota token LLM telah habis. Anda tidak dapat mengunggah berkas CSV hingga kuota token dipulihkan.'
      )
      return
    }

    const targetFileName = forceNewFile
      ? type === 'keyword'
        ? `semrush_keywords_update_${Date.now().toString().slice(-4)}.csv`
        : `semrush_gap_update_${Date.now().toString().slice(-4)}.csv`
      : type === 'keyword'
      ? 'semrush_keywords_export_nov2026.csv'
      : 'semrush_keyword_gap_detik_liputan6.csv'

    const targetFileSize = forceNewFile ? 1520100 : type === 'keyword' ? 1420580 : 984500

    // 2. Validasi Duplikasi Berdasarkan Metadata (Nama Berkas & Ukuran Berkas)
    const isDuplicate = !forceNewFile && importedFileRegistry.some(
      (item) => item.fileName.toLowerCase() === targetFileName.toLowerCase() && item.sizeBytes === targetFileSize
    )

    if (isDuplicate) {
      setDuplicateFileInfo({
        fileName: targetFileName,
        previousDate: '3 Jul 2026, 09:31 (Ukuran: ' + (targetFileSize / 1000000).toFixed(2) + ' MB)',
        similarity: 100,
        matchedKeywords:
          type === 'keyword'
            ? [
                'cara daftar bansos kemensos online 2027',
                'bantuan subsidi upah pekerja kemnaker',
                'cek desil bansos dtks jateng online',
                'panduan reksadana 2026',
                'syarat buat paspor online 2026',
              ]
            : ['ligue 1', 'klasemen liga 1', 'piala dunia', 'google gemini', 'la liga'],
      })
      setIsDuplicateAlertOpen(true)
      showWarning(
        'Berkas Duplikat Terdeteksi',
        `Berkas '${targetFileName}' dengan metadata yang sama sudah pernah diimpor sebelumnya.`
      )
      return
    }

    // Jika bukan duplikat, lakukan proses impor
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setSelectedImportType(type)
      setPreviewFileName(targetFileName)
      setImportedFileRegistry((prev) => [
        ...prev,
        {
          fileName: targetFileName,
          sizeBytes: targetFileSize,
          uploadDate: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ])

      if (type === 'keyword') {
        setNewKeywordsBadgeCount(10)
        showSuccess(
          'Impor CSV Kata Kunci Selesai',
          `Berkas ${targetFileName} berhasil divalidasi. 10 kata kunci baru siap ditinjau di menu Kata Kunci (+10).`
        )
      } else {
        setNewKeywordGapBadgeCount(10)
        showSuccess(
          'Impor CSV Perbandingan Kata Kunci Selesai',
          `Berkas ${targetFileName} berhasil divalidasi. 10 data gap kata kunci siap ditinjau di menu Perbandingan Kata Kunci (+10).`
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
        onUploadClick={() => {
          if (isTokenExhausted) {
            showWarning(
              'Unggah Ditolak (Token Habis)',
              'Kuota token LLM telah habis. Anda tidak dapat mengunggah berkas CSV hingga kuota token dipulihkan.'
            )
          } else {
            setIsUploadDropdownOpen(true)
          }
        }}
        onDismiss={() => setShowRetentionBanner(false)}
      />

      {/* 4. Drag & Drop Upload Zone */}
      <CsvDropzone
        isUploading={isUploading}
        isDropdownOpen={isUploadDropdownOpen}
        setIsDropdownOpen={setIsUploadDropdownOpen}
        onSelectImportType={(type) => handleSelectImportType(type, false)}
        isTokenExhausted={isTokenExhausted}
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
