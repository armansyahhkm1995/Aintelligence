import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  User,
  KeywordItem,
  ClusterItem,
  ArticleBrief,
  ArticleDraft,
  FilterRule,
  AuditLogItem,
  NotificationItem,
} from '../types'
import {
  INITIAL_USERS,
  INITIAL_KEYWORDS,
  INITIAL_CLUSTERS,
  INITIAL_BRIEF,
  INITIAL_DRAFT,
  INITIAL_RULES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData'
import { useToast } from './ToastContext'

export type AppPage =
  | 'dashboard'
  | 'impor'
  | 'keyword'
  | 'cluster'
  | 'brief'
  | 'draft'
  | 'settings'
  | 'auditlog'
  | 'users'
  | 'notifikasi'

interface AppContextType {
  // Navigation & Page State
  currentPage: AppPage
  setCurrentPage: (page: AppPage) => void

  // Auth
  currentUser: User
  isAuthenticated: boolean
  login: (email: string, password?: string) => boolean
  verify2FA: (code: string) => boolean
  logout: () => void

  // Keywords & Bulk Override
  keywords: KeywordItem[]
  selectedKeywordIds: string[]
  toggleKeywordSelect: (id: string) => void
  selectAllKeywords: (select: boolean) => void
  clearKeywordSelect: () => void
  bulkOverrideKeywords: (newKelayakan: 'Layak' | 'Tidak Layak', reason?: string) => void
  overrideSingleKeyword: (id: string, newKelayakan: 'Layak' | 'Tidak Layak', reason?: string) => void

  // Clusters & Resolusi
  clusters: ClusterItem[]
  activeCluster: ClusterItem | null
  setActiveCluster: (cluster: ClusterItem | null) => void
  updateCluster: (clusterId: string, updates: Partial<ClusterItem>) => void
  resolveCMSConflict: (clusterId: string, reason: string) => void
  rejectCluster: (clusterId: string, reason?: string) => void

  // Brief
  brief: ArticleBrief
  updateBrief: (updates: Partial<ArticleBrief>) => void
  approveBrief: () => void
  rejectBrief: (reason?: string) => void

  // Draft
  draft: ArticleDraft
  updateDraft: (content: string) => void
  publishDraftToEditools: () => void
  deleteDraft: () => void

  // Settings / Rules
  rules: FilterRule[]
  addRule: (rule: Omit<FilterRule, 'id' | 'updatedAt' | 'updatedBy'>) => void
  deleteRule: (id: string) => void
  ruleToDelete: FilterRule | null
  setRuleToDelete: (rule: FilterRule | null) => void

  // Users
  users: User[]
  addUser: (user: Omit<User, 'id' | 'lastActive'>) => void
  editUser: (id: string, updates: Partial<User>) => void
  deactivateUser: (id: string) => void
  userToDeactivate: User | null
  setUserToDeactivate: (user: User | null) => void
  userToEdit: User | null
  setUserToEdit: (user: User | null) => void

  // Audit Logs
  auditLogs: AuditLogItem[]
  addAuditLog: (category: string, details: string) => void

  // Notifications
  notifications: NotificationItem[]

  // Modals Visibility
  isBulkOverrideOpen: boolean
  setIsBulkOverrideOpen: (open: boolean) => void
  isSingleOverrideOpen: boolean
  setIsSingleOverrideOpen: (open: boolean) => void
  targetKeywordForOverride: KeywordItem | null
  setTargetKeywordForOverride: (k: KeywordItem | null) => void
  isEditClusterDrawerOpen: boolean
  setIsEditClusterDrawerOpen: (open: boolean) => void
  isResolusiBentrokOpen: boolean
  setIsResolusiBentrokOpen: (open: boolean) => void
  isTolakClusterOpen: boolean
  setIsTolakClusterOpen: (open: boolean) => void
  isTolakBriefOpen: boolean
  setIsTolakBriefOpen: (open: boolean) => void
  isHapusDraftOpen: boolean
  setIsHapusDraftOpen: (open: boolean) => void
  isTambahAturanOpen: boolean
  setIsTambahAturanOpen: (open: boolean) => void
  isHapusAturanOpen: boolean
  setIsHapusAturanOpen: (open: boolean) => void
  isTambahPenggunaOpen: boolean
  setIsTambahPenggunaOpen: (open: boolean) => void
  isNonaktifkanPenggunaOpen: boolean
  setIsNonaktifkanPenggunaOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const LOCAL_STORAGE_PREFIX = 'rri_v3_figma_'

function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key)
    if (!item) return fallback
    const parsed = JSON.parse(item)
    // Validate clusters schema
    if (key === 'clusters') {
      if (!Array.isArray(parsed) || parsed.length === 0 || typeof parsed[0].pillarKeyword !== 'object') {
        return fallback
      }
    }
    // Validate brief schema
    if (key === 'brief') {
      if (!parsed || !Array.isArray(parsed.headings)) {
        return fallback
      }
    }
    // Validate draft schema
    if (key === 'draft') {
      if (!parsed || !Array.isArray(parsed.alternativeTitles)) {
        return fallback
      }
    }
    // Validate rules schema
    if (key === 'rules') {
      if (!Array.isArray(parsed) || parsed.length === 0 || !Array.isArray(parsed[0].keywords)) {
        return fallback
      }
    }
    return parsed
  } catch {
    return fallback
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(val))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showSuccess, showWarning } = useToast()

  // Navigation
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard')

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const [currentUser] = useState<User>(() =>
    getStored('user', INITIAL_USERS[0]) // Budi Prasetyo (Admin)
  )

  // State
  const [keywords, setKeywords] = useState<KeywordItem[]>(() =>
    getStored('keywords', INITIAL_KEYWORDS)
  )
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<string[]>(['KWD-102', 'KWD-103'])

  const [clusters, setClusters] = useState<ClusterItem[]>(() =>
    getStored('clusters', INITIAL_CLUSTERS)
  )
  const [activeCluster, setActiveCluster] = useState<ClusterItem | null>(INITIAL_CLUSTERS[1])

  const [brief, setBrief] = useState<ArticleBrief>(() =>
    getStored('brief', INITIAL_BRIEF)
  )
  const [draft, setDraft] = useState<ArticleDraft>(() =>
    getStored('draft', INITIAL_DRAFT)
  )
  const [rules, setRules] = useState<FilterRule[]>(() =>
    getStored('rules', INITIAL_RULES)
  )
  const [users, setUsers] = useState<User[]>(() =>
    getStored('users', INITIAL_USERS)
  )
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() =>
    getStored('auditLogs', INITIAL_AUDIT_LOGS)
  )
  const [notifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)

  // Modals
  const [isBulkOverrideOpen, setIsBulkOverrideOpen] = useState(false)
  const [isSingleOverrideOpen, setIsSingleOverrideOpen] = useState(false)
  const [targetKeywordForOverride, setTargetKeywordForOverride] = useState<KeywordItem | null>(null)
  const [isEditClusterDrawerOpen, setIsEditClusterDrawerOpen] = useState(false)
  const [isResolusiBentrokOpen, setIsResolusiBentrokOpen] = useState(false)
  const [isTolakClusterOpen, setIsTolakClusterOpen] = useState(false)
  const [isTolakBriefOpen, setIsTolakBriefOpen] = useState(false)
  const [isHapusDraftOpen, setIsHapusDraftOpen] = useState(false)
  const [isTambahAturanOpen, setIsTambahAturanOpen] = useState(false)
  const [isHapusAturanOpen, setIsHapusAturanOpen] = useState(false)
  const [ruleToDelete, setRuleToDelete] = useState<FilterRule | null>(null)
  const [isTambahPenggunaOpen, setIsTambahPenggunaOpen] = useState(false)
  const [isNonaktifkanPenggunaOpen, setIsNonaktifkanPenggunaOpen] = useState(false)
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  // Persist
  useEffect(() => setStored('keywords', keywords), [keywords])
  useEffect(() => setStored('clusters', clusters), [clusters])
  useEffect(() => setStored('brief', brief), [brief])
  useEffect(() => setStored('draft', draft), [draft])
  useEffect(() => setStored('rules', rules), [rules])
  useEffect(() => setStored('users', users), [users])
  useEffect(() => setStored('auditLogs', auditLogs), [auditLogs])

  const addAuditLog = (category: string, details: string) => {
    const now = new Date()
    const timeStr = `${now.getDate().toString().padStart(2, '0')} Nov 2026 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    const newLog: AuditLogItem = {
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: timeStr,
      timezone: 'Asia/Jakarta (WIB)',
      user: currentUser.name,
      role: currentUser.role === 'admin' ? 'Admin' : 'Editor',
      category,
      details,
    }
    setAuditLogs((prev) => [newLog, ...prev])
  }

  // Auth methods
  const login = () => {
    return true
  }

  const verify2FA = (code: string) => {
    if (code.length === 6) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  // Keywords
  const toggleKeywordSelect = (id: string) => {
    setSelectedKeywordIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectAllKeywords = (select: boolean) => {
    if (select) {
      setSelectedKeywordIds(keywords.map((k) => k.id))
    } else {
      setSelectedKeywordIds([])
    }
  }

  const clearKeywordSelect = () => setSelectedKeywordIds([])

  const bulkOverrideKeywords = (newKelayakan: 'Layak' | 'Tidak Layak', reason?: string) => {
    setKeywords((prev) =>
      prev.map((k) =>
        selectedKeywordIds.includes(k.id)
          ? { ...k, kelayakanAI: newKelayakan, status: 'Baru', aiReason: reason || k.aiReason }
          : k
      )
    )
    addAuditLog(
      'Koreksi Keyword',
      `Mengubah kelayakan massal ${selectedKeywordIds.length} kata kunci menjadi '${newKelayakan}'. Alasan: ${reason || 'Manual override redaksional'}.`
    )
    showSuccess('Manajemen kata kunci', 'Aturan kelayakan berhasil disimpan')
    setSelectedKeywordIds([])
    setIsBulkOverrideOpen(false)
  }

  const overrideSingleKeyword = (id: string, newKelayakan: 'Layak' | 'Tidak Layak', reason?: string) => {
    const kw = keywords.find((k) => k.id === id)
    setKeywords((prev) =>
      prev.map((k) =>
        k.id === id
          ? { ...k, kelayakanAI: newKelayakan, status: 'Baru', aiReason: reason || k.aiReason }
          : k
      )
    )
    addAuditLog(
      'Koreksi Keyword',
      `Mengubah kelayakan keyword '${kw?.keyword || id}' menjadi '${newKelayakan}'. Alasan: ${reason || 'Koreksi manual editor'}.`
    )
    showSuccess('Manajemen kata kunci', 'Aturan kelayakan berhasil disimpan')
    setIsSingleOverrideOpen(false)
    setTargetKeywordForOverride(null)
  }

  // Clusters
  const updateCluster = (clusterId: string, updates: Partial<ClusterItem>) => {
    setClusters((prev) =>
      prev.map((c) => (c.id === clusterId ? { ...c, ...updates } : c))
    )
    showSuccess('Cluster Topik', 'Cluster berhasil digabung. Menghitung ulang volume SEO...')
  }

  const resolveCMSConflict = (clusterId: string, reason: string) => {
    setClusters((prev) =>
      prev.map((c) => (c.id === clusterId ? { ...c, status: 'Aman' } : c))
    )
    const cl = clusters.find((c) => c.id === clusterId)
    addAuditLog(
      'Persetujuan',
      `Bypass CMS Conflict cluster '${cl?.name || clusterId}'. Justifikasi: ${reason}.`
    )
    showSuccess('Cluster Topik', 'Cluster disetujui untuk diteruskan ke pembuatan Brief Berita')
    setIsResolusiBentrokOpen(false)
  }

  const rejectCluster = (clusterId: string, reason?: string) => {
    const cl = clusters.find((c) => c.id === clusterId)
    setClusters((prev) => prev.filter((c) => c.id !== clusterId))
    addAuditLog(
      'Koreksi Keyword',
      `Menolak cluster '${cl?.name || clusterId}'. Alasan: ${reason || 'Ditolak redaksi'}.`
    )
    showWarning('Cluster Topik', `Cluster '${cl?.name || clusterId}' berhasil ditolak dan dihapus.`)
    setIsTolakClusterOpen(false)
  }

  // Brief
  const updateBrief = (updates: Partial<ArticleBrief>) => {
    setBrief((prev) => ({ ...prev, ...updates }))
  }

  const approveBrief = () => {
    setBrief((prev) => ({ ...prev, status: 'Disetujui' }))
    addAuditLog('Persetujuan', `Menyetujui Brief Artikel ${brief.id} untuk dilanjutkan ke antrean Draf AI.`)
    showSuccess('Tinjauan Brief', 'Brief disetujui! Draf sedang ditulis oleh AI')
  }

  const rejectBrief = (reason?: string) => {
    setBrief((prev) => ({ ...prev, status: 'Ditolak' }))
    addAuditLog('Persetujuan', `Menolak Brief Artikel ${brief.id}. Alasan: ${reason || 'Ditolak redaksi'}.`)
    showWarning('Tinjauan Brief', 'Brief berhasil ditolak.')
    setIsTolakBriefOpen(false)
    setCurrentPage('cluster')
  }

  // Draft
  const updateDraft = (content: string) => {
    setDraft((prev) => ({ ...prev, content }))
  }

  const publishDraftToEditools = () => {
    addAuditLog('Aktivitas Sistem AI', `Meneruskan Draf Artikel ${draft.id} ke portal Editools/CMS RRI.`)
    showSuccess('Penyuntingan Draf', 'Draf berhasil dikirim ke Editools CMS RRI.')
  }

  const deleteDraft = () => {
    addAuditLog('Aktivitas Sistem AI', `Menghapus draf artikel ${draft.id}.`)
    showWarning('Penyuntingan Draf', 'Draf artikel berhasil dihapus.')
    setIsHapusDraftOpen(false)
    setCurrentPage('cluster')
  }

  // Settings & Rules
  const addRule = (newRule: Omit<FilterRule, 'id' | 'updatedAt' | 'updatedBy'>) => {
    const created: FilterRule = {
      ...newRule,
      id: `RUL-${Math.floor(100 + Math.random() * 900)}`,
      updatedBy: 'Admin',
      updatedAt: '02 Nov 2026',
    }
    setRules((prev) => [created, ...prev])
    addAuditLog('Perubahan Aturan', `Menambahkan aturan filter keyword baru: '${newRule.name}'.`)
    showSuccess('Pengaturan Redaksi', 'Aturan filter berhasil ditambahkan')
    setIsTambahAturanOpen(false)
  }

  const deleteRule = (id: string) => {
    const target = rules.find((r) => r.id === id)
    setRules((prev) => prev.filter((r) => r.id !== id))
    addAuditLog('Perubahan Aturan', `Menghapus aturan filter keyword: '${target?.name || id}'.`)
    showWarning('Pengaturan Redaksi', 'Aturan filter berhasil dihapus')
    setIsHapusAturanOpen(false)
    setRuleToDelete(null)
  }

  // Users
  const addUser = (newUser: Omit<User, 'id' | 'lastActive'>) => {
    const created: User = {
      ...newUser,
      id: `USR-00${users.length + 1}`,
      lastActive: 'Baru ditambahkan',
      has2FA: true,
    }
    setUsers((prev) => [...prev, created])
    addAuditLog('Manajemen Pengguna', `Menambahkan pengguna baru: ${newUser.name} (${newUser.email}).`)
    showSuccess('Manajemen Pengguna', `Pengguna ${newUser.name} berhasil ditambahkan`)
    setIsTambahPenggunaOpen(false)
  }

  const editUser = (id: string, updates: Partial<User>) => {
    const u = users.find((user) => user.id === id)
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updates } : user))
    )
    addAuditLog('Manajemen Pengguna', `Memperbarui akun pengguna: ${updates.name || u?.name || id}.`)
    showSuccess('Manajemen Pengguna', `Pengguna ${updates.name || u?.name || id} berhasil diperbarui`)
    setIsTambahPenggunaOpen(false)
    setUserToEdit(null)
  }

  const deactivateUser = (id: string) => {
    const u = users.find((user) => user.id === id)
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: 'nonaktif' } : user))
    )
    addAuditLog('Manajemen Pengguna', `Menonaktifkan akun pengguna: ${u?.name || id}.`)
    showWarning('Manajemen Pengguna', `Pengguna ${u?.name || id} telah dinonaktifkan`)
    setIsNonaktifkanPenggunaOpen(false)
    setUserToDeactivate(null)
  }

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentUser,
        isAuthenticated,
        login,
        verify2FA,
        logout,
        keywords,
        selectedKeywordIds,
        toggleKeywordSelect,
        selectAllKeywords,
        clearKeywordSelect,
        bulkOverrideKeywords,
        overrideSingleKeyword,
        clusters,
        activeCluster,
        setActiveCluster,
        updateCluster,
        resolveCMSConflict,
        rejectCluster,
        brief,
        updateBrief,
        approveBrief,
        rejectBrief,
        draft,
        updateDraft,
        publishDraftToEditools,
        deleteDraft,
        rules,
        addRule,
        deleteRule,
        ruleToDelete,
        setRuleToDelete,
        users,
        addUser,
        editUser,
        deactivateUser,
        userToDeactivate,
        setUserToDeactivate,
        userToEdit,
        setUserToEdit,
        auditLogs,
        addAuditLog,
        notifications,
        isBulkOverrideOpen,
        setIsBulkOverrideOpen,
        isSingleOverrideOpen,
        setIsSingleOverrideOpen,
        targetKeywordForOverride,
        setTargetKeywordForOverride,
        isEditClusterDrawerOpen,
        setIsEditClusterDrawerOpen,
        isResolusiBentrokOpen,
        setIsResolusiBentrokOpen,
        isTolakClusterOpen,
        setIsTolakClusterOpen,
        isTolakBriefOpen,
        setIsTolakBriefOpen,
        isHapusDraftOpen,
        setIsHapusDraftOpen,
        isTambahAturanOpen,
        setIsTambahAturanOpen,
        isHapusAturanOpen,
        setIsHapusAturanOpen,
        isTambahPenggunaOpen,
        setIsTambahPenggunaOpen,
        isNonaktifkanPenggunaOpen,
        setIsNonaktifkanPenggunaOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
