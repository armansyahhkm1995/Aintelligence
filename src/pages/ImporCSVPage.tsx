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
    const cleanFileName = fileName.replace(/\.[^/.]+$/, '')

    const escapeXml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

    const errorRows = [
      {
        row: '14',
        keyword: '',
        column: 'Keyword',
        value: '',
        category: 'Baris Kosong',
        message: 'Kolom kata kunci kosong atau tidak memiliki karakter valid.',
        action: 'Hapus baris kosong ini dari berkas.',
      },
      {
        row: '28',
        keyword: 'cek bansos kemensos 2026',
        column: 'Search Volume',
        value: 'N/A',
        category: 'Format Numerik Tidak Valid',
        message: "Nilai volume pencarian 'N/A' bukan format angka integer valid.",
        action: "Ganti nilai 'N/A' dengan estimasi volume angka bulat atau 0.",
      },
      {
        row: '45',
        keyword: 'syarat perpanjang sim online',
        column: 'Keyword Difficulty',
        value: '145',
        category: 'Di Luar Batas Indeks',
        message: 'Skor Keyword Difficulty (145) melebihi batas maksimal valid 100.',
        action: 'Koreksi nilai KD agar berada dalam rentang skor 0-100.',
      },
      {
        row: '67',
        keyword: 'pendaftaran cpns 2026 kemenkumham',
        column: 'Keyword',
        value: 'pendaftaran cpns 2026 kemenkumham',
        category: 'Karakter Rusak (Encoding)',
        message: 'Ditemukan karakter byte korup (bukan standar encoding UTF-8).',
        action: "Simpan ulang berkas dengan pilihan encoding 'CSV UTF-8 (Comma delimited)'.",
      },
      {
        row: '82',
        keyword: 'jadwal imsakiyah ramadhan rri',
        column: 'Search Intent',
        value: 'UNKNOWN_XYZ',
        category: 'Format Intent Tidak Valid',
        message: "Intent 'UNKNOWN_XYZ' tidak sesuai standar SEO baku.",
        action: 'Gunakan intent standar: Informational, Navigational, Commercial, atau Transactional.',
      },
      {
        row: '103',
        keyword: 'cara daftar bansos kemensos online 2027',
        column: 'Keyword',
        value: 'cara daftar bansos kemensos online 2027',
        category: 'Duplikasi Internal Berkas',
        message: 'Kata kunci duplikat ditemukan lebih dari 1 kali di berkas yang sama (sebelumnya di Baris 8).',
        action: 'Hapus baris duplikat agar kata kunci tidak diproses ganda.',
      },
      {
        row: '119',
        keyword: 'bantuan subsidi upah pekerja',
        column: 'Cost Per Click (CPC)',
        value: '$1.25',
        category: 'Format Simbol Mata Uang',
        message: "Nilai CPC mengandung simbol '$', parser memerlukan format desimal angka murni.",
        action: "Hapus simbol mata uang dan gunakan format desimal angka murni (contoh: 1.25).",
      },
      {
        row: '142',
        keyword: '',
        column: 'Volume',
        value: '',
        category: 'Baris Tanpa Data',
        message: 'Seluruh kolom pada baris ini kosong / whitespace.',
        action: 'Hapus baris kosong di akhir berkas.',
      },
    ]

    // Format dokumen SpreadsheetML XML Microsoft Excel (.xls) resmi dengan styling rapi
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>Log Galat Impor CSV Semrush</Title>
  <Subject>Log Galat Validasi Redaksi RRI Digital</Subject>
  <Author>RRI Digital Aitelligence</Author>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1E293B"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="Header">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#94A3B8"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#94A3B8"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#94A3B8"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#94A3B8"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#1866EF" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="Cell">
   <Alignment ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#334155"/>
  </Style>
  <Style ss:ID="CellCenter">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#334155"/>
  </Style>
  <Style ss:ID="CellBadge">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FECACA"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FECACA"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FECACA"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FECACA"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="10" ss:Bold="1" ss:Color="#B91C1C"/>
   <Interior ss:Color="#FEF2F2" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Log Galat Impor">
  <Table>
   <Column ss:Width="80"/>
   <Column ss:Width="190"/>
   <Column ss:Width="140"/>
   <Column ss:Width="110"/>
   <Column ss:Width="160"/>
   <Column ss:Width="300"/>
   <Column ss:Width="280"/>
   <Row ss:Height="26">
    <Cell ss:StyleID="Header"><Data ss:Type="String">Nomor Baris</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Kata Kunci Terbaca</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Kolom Bermasalah</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Nilai Mentah</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Kategori Galat</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Pesan Galat &amp; Alasan Penolakan</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Rekomendasi Tindakan</Data></Cell>
   </Row>
${errorRows
  .map(
    (r) => `   <Row ss:Height="22">
    <Cell ss:StyleID="CellCenter"><Data ss:Type="Number">${r.row}</Data></Cell>
    <Cell ss:StyleID="Cell"><Data ss:Type="String">${escapeXml(r.keyword)}</Data></Cell>
    <Cell ss:StyleID="Cell"><Data ss:Type="String">${escapeXml(r.column)}</Data></Cell>
    <Cell ss:StyleID="CellCenter"><Data ss:Type="String">${escapeXml(r.value)}</Data></Cell>
    <Cell ss:StyleID="CellBadge"><Data ss:Type="String">${escapeXml(r.category)}</Data></Cell>
    <Cell ss:StyleID="Cell"><Data ss:Type="String">${escapeXml(r.message)}</Data></Cell>
    <Cell ss:StyleID="Cell"><Data ss:Type="String">${escapeXml(r.action)}</Data></Cell>
   </Row>`
  )
  .join('\n')}
  </Table>
 </Worksheet>
</Workbook>`

    const blob = new Blob([xmlContent], { type: 'application/vnd.ms-excel;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `log_galat_${cleanFileName}.xls`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showSuccess('Log Galat', `Log galat untuk ${fileName} berhasil diunduh dalam format Excel (.xls).`)
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
