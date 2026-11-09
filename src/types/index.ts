export type UserRole = 'admin' | 'editor'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  status: 'aktif' | 'nonaktif'
  lastActive: string
  department?: string
  has2FA?: boolean
}

export type ToastType = 'success' | 'warning' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
  actionLabel?: string
  onAction?: () => void
}

export type KeywordStatus = 'Layak' | 'Tidak Layak'
export type SearchIntent =
  | 'Informational'
  | 'Commercial'
  | 'Transactional'
  | 'Navigational'
  | 'Komersial'
  | 'Transaksional'
  | 'Navigasional'

export interface KeywordItem {
  id: string
  keyword: string
  aturan: string
  sourceFile: string
  volume: number
  kd: number
  intent: SearchIntent
  aiTopic: string
  evergreenScore: number
  kelayakanAI: 'Layak' | 'Tidak Layak'
  status: 'Dikelompokkan' | 'Baru' | 'Review Manual'
  aiReason?: string
}

export type ClusterStatus = 'Aman' | 'Butuh Resolusi' | 'Bentrok CMS RRI'

export interface ClusterKeywordRef {
  text: string
  vol: number
  kd: number
}

export interface ClusterItem {
  id: string
  name: string
  status: ClusterStatus
  intent: SearchIntent
  totalVol: number
  avgKd: number
  keywordCount: number
  pillarKeyword: ClusterKeywordRef
  supportingKeywords: ClusterKeywordRef[]
  alertTitle?: string
  alertDesc?: string
  subAlert?: string
  cmsArticleTitle?: string
  cmsPublishDate?: string
}

export interface OutlineHeading {
  id: string
  level: 'h1' | 'h2' | 'h3'
  text: string
}

export interface ArticleBrief {
  id: string
  title: string
  angle: string
  headings: OutlineHeading[]
  entityAnchors: string[]
  searchIntentCoverage: string[]
  internalLinks: { title: string; url: string }[]
  aiNotes: string
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak'
  version: string
  updatedAt: string
}

export interface ArticleDraft {
  id: string
  title: string
  seoScore: number
  wordCount: number
  estimatedReadingTime: string
  metaTitle: string
  metaDesc: string
  slugUrl: string
  alternativeTitles: string[]
  content: string
  status: 'Siap Review' | 'Telah Terbit' | 'Ditolak'
  version: string
  updatedAt: string
}

export interface FilterRule {
  id: string
  name: string
  description: string
  keywords: string[]
  category: string
  status: 'Aktif' | 'Nonaktif'
  updatedBy: string
  updatedAt: string
}

export interface AuditLogItem {
  id: string
  timestamp: string
  timezone: string
  user: string
  role: 'Admin' | 'Editor'
  category: string
  details: string
}

export interface NotificationItem {
  id: string
  category: 'Hari Ini' | 'Kemarin'
  title: string
  timeAgo: string
  type: 'success' | 'error'
}
