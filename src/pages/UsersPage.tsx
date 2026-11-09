import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { User } from '../types'
import {
  UserPlus,
  Search,
  ChevronDown,
  ShieldCheck,
  ShieldAlert,
  Edit3,
  X,
} from 'lucide-react'

export const UsersPage: React.FC = () => {
  const {
    users,
    setIsTambahPenggunaOpen,
    setUserToEdit,
    setIsNonaktifkanPenggunaOpen,
    setUserToDeactivate,
  } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const safeUsers: User[] = Array.isArray(users) && users.length > 0
    ? users
    : [
        {
          id: 'USR-01',
          name: 'Budi Prasetyo (Anda)',
          email: 'budi.prasetyo@rri.co.id',
          role: 'admin' as const,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          has2FA: true,
          status: 'aktif' as const,
          lastActive: 'Online',
        },
        {
          id: 'USR-02',
          name: 'Siti Rahmawati',
          email: 'siti.rahmawati@rri.co.id',
          role: 'editor' as const,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
          has2FA: true,
          status: 'aktif' as const,
          lastActive: '10 menit lalu',
        },
        {
          id: 'USR-03',
          name: 'Ahmad Fauzi',
          email: 'ahmad.fauzi@rri.co.id',
          role: 'editor' as const,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
          has2FA: true,
          status: 'aktif' as const,
          lastActive: '1 jam lalu',
        },
        {
          id: 'USR-04',
          name: 'Dewi Lestari',
          email: 'dewi.lestari@rri.co.id',
          role: 'editor' as const,
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
          has2FA: true,
          status: 'aktif' as const,
          lastActive: '2 jam lalu',
        },
        {
          id: 'USR-05',
          name: 'Rian Hidayat',
          email: 'rian.hidayat@rri.co.id',
          role: 'editor' as const,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
          has2FA: false,
          status: 'nonaktif' as const,
          lastActive: '3 hari lalu',
        },
      ]

  const filteredUsers = safeUsers.filter((u) => {
    if (!u) return false
    const matchSearch =
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole =
      !filterRole || (u.role && u.role.toLowerCase() === filterRole.toLowerCase())
    const matchStatus =
      !filterStatus || (u.status && u.status.toLowerCase() === filterStatus.toLowerCase())
    return matchSearch && matchRole && matchStatus
  })

  const handleOpenAdd = () => {
    setUserToEdit(null)
    setIsTambahPenggunaOpen(true)
  }

  const handleOpenEdit = (user: User) => {
    setUserToEdit(user)
    setIsTambahPenggunaOpen(true)
  }

  const handleDeactivate = (user: User) => {
    setUserToDeactivate(user)
    setIsNonaktifkanPenggunaOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Heading matching Figma */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="max-w-[500px]">
          <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
            Manajemen Pengguna & Kontrol Hak Akses
          </h1>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Pengaturan hak akses pengguna, pemantauan status akun aktif, dan audit kepatuhan keamanan 2FA.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="h-[40px] px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      {/* MetricsRow: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Total Akun Terdaftar
          </div>
          <div className="text-xl font-bold text-slate-900">8 Pengguna</div>
          <div className="text-[11px] text-slate-400 mt-1">2 Admin · 6 Editor</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">Kepatuhan 2FA</div>
          <div className="text-xl font-bold text-[#15803D]">7 Aktif (87.5%)</div>
          <div className="text-[11px] text-slate-400 mt-1">1 Akun belum aktivasi 2FA</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-4 shadow-xs">
          <div className="text-xs font-medium text-slate-500 mb-1">
            Status Akun Aktif
          </div>
          <div className="text-xl font-bold text-slate-900">7 Aktif / 1 Dinonaktifkan</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Log perubahan tersimpan di Audit Log
          </div>
        </div>
      </div>

      {/* COMP-TodoList-Editor: 949px Standard Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
        {/* Filter Controls: Search Box placed ABOVE filters */}
        <div className="space-y-3">
          {/* Search Box on Top */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, atau email pengguna..."
              className="w-full h-[40px] pl-10 pr-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filters Row: 2 Dropdowns + Hug Content Clear Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Dropdown 1: Peran */}
            <div className="relative flex-1 w-full">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterRole ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Peran: Semua (Admin & Editor)</option>
                <option value="Admin">Administrator</option>
                <option value="Editor">Editor</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dropdown 2: Status */}
            <div className="relative flex-1 w-full">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`w-full h-[40px] px-3 pr-8 text-xs bg-white border border-[#DBEAFE] rounded-[6px] appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                  filterStatus ? 'text-slate-900 font-medium' : 'text-slate-500'
                }`}
              >
                <option value="" disabled hidden>Status: Semua</option>
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Non-aktif</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Hug Content Clear Button */}
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setFilterRole('')
                setFilterStatus('')
              }}
              className="w-auto h-[40px] px-4 border border-[#FEE2E2] hover:bg-rose-50 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Bersihkan Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#DBEAFE] rounded-[6px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-[#DBEAFE] text-slate-500 bg-[#F8FAFC]">
                <th className="py-3 px-4 font-semibold">Nama & Email</th>
                <th className="py-3 px-4 font-semibold">Peran Akses</th>
                <th className="py-3 px-4 font-semibold">Verifikasi 2FA</th>
                <th className="py-3 px-4 font-semibold">Status Akun</th>
                <th className="py-3 px-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredUsers.map((u, idx) => {
                const isAktif = u.status === 'aktif'
                return (
                  <tr key={u.id || idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-[10px] font-medium">
                        {u.role === 'admin' ? 'Administrator' : 'Editor'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.has2FA ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>2FA Terverifikasi</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B45309]">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Belum diaktifkan</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          isAktif
                            ? 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]'
                            : 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                        }`}
                      >
                        {isAktif ? 'Aktif' : 'Non-aktif'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Icon */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(u)}
                          className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Edit Pengguna"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Deactivate / Cross Icon */}
                        <button
                          type="button"
                          onClick={() => handleDeactivate(u)}
                          className="p-1 rounded text-[#B91C1C] hover:text-rose-900 hover:bg-rose-50 transition-colors"
                          title="Nonaktifkan Pengguna"
                        >
                          <X className="w-3.5 h-3.5 text-[#B91C1C]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>

          {/* Pagination Bar */}
          <div className="p-3.5 bg-white border-t border-[#DBEAFE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <span>Menampilkan 1-5 dari 42 data</span>
              <div className="relative">
                <select className="h-[28px] pl-2 pr-6 bg-white border border-[#DBEAFE] rounded text-xs text-slate-700 appearance-none cursor-pointer">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <ChevronDown className="absolute right-1.5 top-2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
              <button className="h-[28px] px-2.5 sm:px-3 rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs shrink-0">
                Sebelumnya
              </button>
              <button className="h-[28px] w-[28px] rounded bg-[#1866EF] text-white font-bold text-xs flex items-center justify-center shrink-0">
                1
              </button>
              <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center shrink-0">
                2
              </button>
              <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center shrink-0">
                3
              </button>
              <span className="px-1 text-slate-400 shrink-0">...</span>
              <button className="h-[28px] w-[28px] rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs flex items-center justify-center shrink-0">
                10
              </button>
              <button className="h-[28px] px-2.5 sm:px-3 rounded border border-[#DBEAFE] text-slate-700 hover:bg-slate-50 text-xs shrink-0">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
