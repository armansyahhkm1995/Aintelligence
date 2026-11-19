export interface DraftTableRow {
  id: string
  title: string
  seoScore: number
  version: string
  processStatus: 'antre' | 'diproses' | 'selesai' | 'gagal'
  editor: string
  status: string
}

export interface DraftSectionItem {
  heading: string
  content: string
  isNew?: boolean
}

export interface DraftVersionItem {
  id: string
  version: string
  title: string
  createdAt: string
  createdBy: string
  isAI: boolean
  wordCount: number
  seoScore: number
  changeSummary: string
  angle: string
  lead: string
  sections: DraftSectionItem[]
}

export interface DraftImageRec {
  subject: string
  format: string
  altText: string
  caption: string
  fileName: string
}
