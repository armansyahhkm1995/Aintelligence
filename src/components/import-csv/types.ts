export interface PreviewItem {
  id: string
  keyword: string
  volumeText: string
  isVolumeError?: boolean
  kd: number
  intent: 'Informational' | 'Transaksional' | 'Komersial'
}

export interface KeywordGapPreviewItem {
  id: string
  keyword: string
  intent: string[]
  detikRank: number
  liputan6Rank: number
  volume: string
  kd: number
  cpc: string
  com: string
  results: string
}

export interface ImportHistoryItem {
  id: string
  fileName: string
  uploadDate: string
  status: 'Selesai' | 'Diproses'
  rowCount: number
  validCount: number
  isValidError?: boolean
  invalidCount: number
  isInvalidError?: boolean
  hasErrorLog: boolean
}

export interface DuplicateFileInfo {
  fileName: string
  previousDate: string
  similarity: number
  matchedKeywords: string[]
}
