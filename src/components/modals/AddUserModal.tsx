import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { UserRole } from '../../types'
import { UserPlus, Edit3, X } from 'lucide-react'

export const AddUserModal: React.FC = () => {
  const {
    isTambahPenggunaOpen,
    setIsTambahPenggunaOpen,
    addUser,
    editUser,
    userToEdit,
    setUserToEdit,
  } = useApp()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('editor')

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name)
      setEmail(userToEdit.email)
      setRole(userToEdit.role)
    } else {
      setName('')
      setEmail('')
      setRole('editor')
    }
  }, [userToEdit, isTambahPenggunaOpen])

  if (!isTambahPenggunaOpen) return null

  const handleClose = () => {
    setIsTambahPenggunaOpen(false)
    setUserToEdit(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userToEdit) {
      editUser(userToEdit.id, {
        name,
        email,
        role,
      })
    } else {
      addUser({
        name,
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        status: 'aktif',
        has2FA: true,
      })
    }
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              {userToEdit ? <Edit3 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {userToEdit ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Nama Pengguna <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Prasetyo"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Email Pengguna <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contoh: budi.prasetyo@rri.co.id"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Peran Akses
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
            >
              <option value="editor">Editor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              {userToEdit ? 'Simpan Perubahan' : 'Tambah Pengguna'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
