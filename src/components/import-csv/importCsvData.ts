import type { PreviewItem, KeywordGapPreviewItem, ImportHistoryItem } from './types'

export const PREVIEW_DATA: PreviewItem[] = [
  {
    id: 'prv-1',
    keyword: 'cara daftar bansos kemensos online 2027',
    volumeText: '33.100',
    kd: 48,
    intent: 'Informational',
  },
  {
    id: 'prv-2',
    keyword: 'bantuan subsidi upah pekerja kemnaker',
    volumeText: 'Teks: N/A',
    isVolumeError: true,
    kd: 35,
    intent: 'Transaksional',
  },
  {
    id: 'prv-3',
    keyword: 'cek desil bansos dtks jateng online',
    volumeText: '14.200',
    kd: 42,
    intent: 'Komersial',
  },
]

export const KEYWORD_GAP_PREVIEW_DATA: KeywordGapPreviewItem[] = [
  { id: 'kg-prv-1', keyword: 'ligue 1', intent: ['n/a'], detikRank: 25, liputan6Rank: 12, volume: '6.1M', kd: 76, cpc: '0.08', com: '0', results: '10' },
  { id: 'kg-prv-2', keyword: 'klasemen liga 1', intent: ['n/a'], detikRank: 9, liputan6Rank: 24, volume: '5M', kd: 43, cpc: '0.40', com: '0.33', results: '10' },
  { id: 'kg-prv-3', keyword: 'piala dunia', intent: ['I', 'T'], detikRank: 13, liputan6Rank: 24, volume: '4.1M', kd: 52, cpc: '0.07', com: '0.33', results: '10' },
  { id: 'kg-prv-4', keyword: 'google gemini', intent: ['N', 'T'], detikRank: 51, liputan6Rank: 25, volume: '3.4M', kd: 52, cpc: '0.01', com: '0.08', results: '553K' },
  { id: 'kg-prv-5', keyword: 'la liga', intent: ['I', 'T'], detikRank: 18, liputan6Rank: 68, volume: '3.4M', kd: 59, cpc: '0.03', com: '0.33', results: '6K' },
]

export const HISTORY_DATA: ImportHistoryItem[] = [
  {
    id: 'hist-1',
    fileName: 'semrush_export_nov.csv',
    uploadDate: '3 Jul 2026, 09:31',
    status: 'Selesai',
    rowCount: 842,
    validCount: 842,
    isValidError: false,
    invalidCount: 842,
    isInvalidError: true,
    hasErrorLog: true,
  },
  {
    id: 'hist-2',
    fileName: 'semrush_export_nov.csv',
    uploadDate: '3 Jul 2026, 09:31',
    status: 'Diproses',
    rowCount: 842,
    validCount: 842,
    isValidError: true,
    invalidCount: 842,
    isInvalidError: false,
    hasErrorLog: true,
  },
  {
    id: 'hist-3',
    fileName: 'semrush_export_nov.csv',
    uploadDate: '3 Jul 2026, 09:31',
    status: 'Diproses',
    rowCount: 842,
    validCount: 842,
    isValidError: true,
    invalidCount: 842,
    isInvalidError: false,
    hasErrorLog: false,
  },
]
