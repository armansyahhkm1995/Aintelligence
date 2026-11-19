export interface BriefTableRow {
  id: string
  title: string
  mainKeyword: string
  supportingKeywords: string[]
  processStatus: 'antre' | 'diproses' | 'selesai' | 'gagal'
  editor: string
  status: string
}

export interface BriefVersionItem {
  id: string
  version: string
  title: string
  createdAt: string
  createdBy: string
  isAI: boolean
  changeSummary: string
  angle: string
  targetAudience: string
  h2List: string[]
  primaryKeyword: string
  supportingKeywords: string[]
}

export interface BriefHeading {
  id: string
  level: string
  text: string
}

export interface InternalLinkItem {
  id: string
  title: string
  url: string
}
