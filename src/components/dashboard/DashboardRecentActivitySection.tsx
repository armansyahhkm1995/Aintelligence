import React, { useState } from 'react'
import { UserRole } from '../../types'

interface DashboardRecentActivitySectionProps {
  userRole?: UserRole
}

interface ActivityItem {
  id: string
  timestamp: string
  timezone: string
  user: string
  role: 'Editor' | 'Admin'
  category: string
  details: string
}

const ALL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'ACT-001',
    timestamp: '25 Nov 2026, 17:45',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Siti Rahmawati',
    role: 'Editor',
    category: 'Penyalinan Draf',
    details: 'Menyalin seluruh naskah draf berita "Panduan Lengkap Syarat dan Prosedur Klaim JHT BPJS Ketenagakerjaan 2026" ke clipboard untuk publikasi CMS.',
  },
  {
    id: 'ACT-002',
    timestamp: '25 Nov 2026, 17:30',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Budi Santoso',
    role: 'Editor',
    category: 'Persetujuan Arahan',
    details: 'Menyetujui arahan editorial "Cara Mengurus Kartu Keluarga dan Persyaratannya" untuk masuk ke antrean draf AI otomatis.',
  },
  {
    id: 'ACT-003',
    timestamp: '25 Nov 2026, 17:15',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Ahmad Fauzi',
    role: 'Editor',
    category: 'Simpan Perubahan',
    details: 'Menyimpan suntingan manual pada struktur heading dan menambahkan referensi OJK pada arahan "Strategi Investasi Reksadana Saham bagi Pemula".',
  },
  {
    id: 'ACT-004',
    timestamp: '25 Nov 2026, 16:50',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Dewi Lestari',
    role: 'Editor',
    category: 'Klaim Naskah',
    details: 'Membuka dan mengunci naskah draf berita "Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT" (Status: Diambil).',
  },
  {
    id: 'ACT-005',
    timestamp: '25 Nov 2026, 16:25',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Siti Rahmawati',
    role: 'Editor',
    category: 'Salin Metadata SEO',
    details: 'Menyalin paket rekomendasi meta title, meta description, dan keyword density untuk naskah "Panduan Registrasi IKD Secara Online".',
  },
  {
    id: 'ACT-006',
    timestamp: '25 Nov 2026, 15:40',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Cameron Newton',
    role: 'Admin',
    category: 'Impor CSV Semrush',
    details: 'Mengunggah dan memvalidasi berkas semrush_keywords_export_nov2026.csv (842 kata kunci diproses, 10 kata kunci baru ditambahkan).',
  },
  {
    id: 'ACT-007',
    timestamp: '25 Nov 2026, 15:10',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Cameron Newton',
    role: 'Admin',
    category: 'Pengaturan Redaksi',
    details: 'Memperbarui batas retensi berkas CSV menjadi 7 hari dan memperbarui daftar kata kunci terlarang (Kategori Perjudian).',
  },
  {
    id: 'ACT-008',
    timestamp: '25 Nov 2026, 14:45',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Rian Pratama',
    role: 'Editor',
    category: 'Buat Ulang Draf',
    details: 'Meminta regenerasi draf AI untuk naskah "Tol Probowangi Seksi 1" dengan sudut pandang dampak mobilitas ekonomi regional.',
  },
  {
    id: 'ACT-009',
    timestamp: '25 Nov 2026, 14:15',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Cameron Newton',
    role: 'Admin',
    category: 'Resolusi Kelompok Topik',
    details: 'Menggabungkan kelompok topik "Panduan Reksadana 2026" ke artikel pilar "Cara Investasi Reksadana Uang untuk Generasi-Z".',
  },
  {
    id: 'ACT-010',
    timestamp: '25 Nov 2026, 13:50',
    timezone: 'Asia/Jakarta (WIB)',
    user: 'Ahmad Fauzi',
    role: 'Editor',
    category: 'Salin Prompt Gambar AI',
    details: 'Menyalin prompt rekomendasi visual AI untuk ilustrasi foto artikel panduan reksadana.',
  },
]

export const DashboardRecentActivitySection: React.FC<DashboardRecentActivitySectionProps> = ({
  userRole = 'admin',
}) => {
  // If role is editor: show only editor activities
  // If role is admin: show all activities
  const filteredActivities = userRole === 'editor'
    ? ALL_ACTIVITIES.filter((a) => a.role === 'Editor')
    : ALL_ACTIVITIES

  const [currentPageNum, setCurrentPageNum] = useState<number>(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)

  const currentItems = filteredActivities.slice(
    (currentPageNum - 1) * itemsPerPage,
    currentPageNum * itemsPerPage
  )

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header Row */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Aktivitas Terbaru
          </h2>
          <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
            {filteredActivities.length} Aktivitas Redaksi
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {userRole === 'editor'
            ? 'Buku catatan aktivitas redaksi bagi tim editor mencakup persetujuan arahan, penyalinan draf, penyimpanan suntingan, dan pengelolaan naskah.'
            : 'Buku catatan aktivitas redaksi lengkap mencakup seluruh pengerjaan editor serta intervensi administratif sistem.'}
        </p>
      </div>

      {/* Main Table Matching Audit Log Structure */}
      <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                <th className="py-3 px-3.5 w-[20%]">Waktu (WIB)</th>
                <th className="py-3 px-3.5 w-[22%]">Pengguna & Peran</th>
                <th className="py-3 px-3.5 w-[18%]">Kategori</th>
                <th className="py-3 px-3.5 w-[40%]">Detail Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {currentItems.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3.5 font-mono align-top">
                    <div className="font-semibold text-slate-900">{log.timestamp}</div>
                    <div className="text-[10px] text-slate-400">{log.timezone}</div>
                  </td>
                  <td className="py-3 px-3.5 align-top">
                    <div className="font-semibold text-slate-900">{log.user}</div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      Role: {log.role}
                    </div>
                  </td>
                  <td className="py-3 px-3.5 align-top">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#1866EF] border border-[#BFDBFE]">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-[#DBEAFE] flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Menampilkan{' '}
            <strong className="text-slate-700">
              {(currentPageNum - 1) * itemsPerPage + 1}–
              {Math.min(currentPageNum * itemsPerPage, filteredActivities.length)}
            </strong>{' '}
            dari <strong className="text-slate-700">{filteredActivities.length}</strong> aktivitas
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPageNum((prev) => Math.max(1, prev - 1))}
              disabled={currentPageNum === 1}
              className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <span className="px-2 py-1 font-semibold text-slate-800">
              Hal {currentPageNum} dari {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPageNum((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPageNum === totalPages}
              className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
