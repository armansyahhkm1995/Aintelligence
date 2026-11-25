import React, { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { TablePagination } from '../common/TablePagination'

interface DashboardTasksSectionProps {
  onNavigateBrief: () => void
  onNavigateDraft: () => void
}

interface BriefTaskItem {
  id: string
  title: string
  mainKeyword: string
  supportingKeywords: string[]
}

interface DraftTaskItem {
  id: string
  title: string
  seoScore: number
  version: string
  warning: string
}

const BRIEF_TASKS: BriefTaskItem[] = [
  {
    id: 'TSK-BRF-001',
    title: 'Panduan Lengkap Mudik Lebaran 2027 Rute Tol Trans-Jawa',
    mainKeyword: 'mudik lebaran 2027',
    supportingKeywords: ['tol trans jawa', 'tarif tol mudik', 'tips mudik aman'],
  },
  {
    id: 'TSK-BRF-002',
    title: 'Kompilasi Bansos Cair November 2026: Syarat & Cara Cek NIK',
    mainKeyword: 'bansos november 2026',
    supportingKeywords: ['cek bansos kemensos', 'bansos pkh cair', 'bpnt tahap 4'],
  },
  {
    id: 'TSK-BRF-003',
    title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik Masa Berlaku 10 Tahun',
    mainKeyword: 'paspor elektronik 2026',
    supportingKeywords: ['biaya e-paspor', 'm-paspor antrean', 'syarat paspor baru'],
  },
  {
    id: 'TSK-BRF-004',
    title: 'Update Harga Emas Antam Hari Ini dan Proyeksi Pasar Akhir Tahun',
    mainKeyword: 'harga emas antam',
    supportingKeywords: ['emas batangan 1 gram', 'grafik harga emas', 'buyback antam'],
  },
  {
    id: 'TSK-BRF-005',
    title: 'Panduan Registrasi IKD Secara Online Kemendagri Tanpa Antre',
    mainKeyword: 'cara aktivasi ikd online',
    supportingKeywords: ['identitas kependudukan digital', 'ktp digital kemendagri', 'aplikasi ikd'],
  },
  {
    id: 'TSK-BRF-006',
    title: 'Jadwal Lengkap Libur Nasional dan Cuti Bersama SKB 3 Menteri 2027',
    mainKeyword: 'jadwal libur nasional 2027',
    supportingKeywords: ['cuti bersama 2027', 'tanggal merah idul fitri', 'long weekend 2027'],
  },
  {
    id: 'TSK-BRF-007',
    title: 'Syarat Pendaftaran Akun SNPMB Jalur SNBP Siswa Eligible',
    mainKeyword: 'pendaftaran snpmb 2027',
    supportingKeywords: ['syarat snbp', 'portal snpmb bppp', 'siswa eligible'],
  },
  {
    id: 'TSK-BRF-008',
    title: 'Daftar Tarif Listrik PLN Non-Subsidi Triwulan I Resmi Berlaku',
    mainKeyword: 'tarif listrik pln 2027',
    supportingKeywords: ['penyesuaian tarif pln', 'biaya kwh pln', 'golongan tarif listrik'],
  },
]

const DRAFT_TASKS: DraftTaskItem[] = [
  {
    id: 'TSK-DFT-001',
    title: 'Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini',
    seoScore: 96,
    version: 'Versi 2',
    warning: 'Butuh Verifikasi Fakta: Konfirmasi nilai tarif resmi BPJT terbaru',
  },
  {
    id: 'TSK-DFT-002',
    title: 'Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027',
    seoScore: 91,
    version: 'Versi 1',
    warning: 'Kutipan Narasumber Dibutuhkan: Kepala Badan Pangan Nasional',
  },
  {
    id: 'TSK-DFT-003',
    title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
    seoScore: 88,
    version: 'Versi 3',
    warning: 'Periksa Aturan: UU Administrasi Kependudukan pasal 15',
  },
  {
    id: 'TSK-DFT-004',
    title: 'Panduan Lengkap Syarat dan Prosedur Klaim JHT BPJS Ketenagakerjaan',
    seoScore: 94,
    version: 'Versi 2',
    warning: 'Verifikasi Regulasi: Permenaker No. 4/2022 pencairan 100%',
  },
  {
    id: 'TSK-DFT-005',
    title: 'Regulasi Insentif Kendaraan Listrik dan Subsidi Energi Hijau',
    seoScore: 89,
    version: 'Versi 1',
    warning: 'Konfirmasi Angka: Alokasi APBN Kementerian ESDM',
  },
  {
    id: 'TSK-DFT-006',
    title: 'Tips dan Simulasi Perhitungan Bunga KPR Subsidi FLPP 2027',
    seoScore: 93,
    version: 'Versi 2',
    warning: 'Verifikasi Bunga: Ketentuan BP Tapera 5% fixed suku bunga',
  },
  {
    id: 'TSK-DFT-007',
    title: 'Langkah Mitigasi Bencana Gempa Sesar Aktif Pulau Jawa',
    seoScore: 90,
    version: 'Versi 1',
    warning: 'Konfirmasi Data BMKG: Peta persebaran sesar aktif',
  },
  {
    id: 'TSK-DFT-008',
    title: 'Pemerintah Siapkan Skema Perlindungan Tenaga Kerja Lepas (Gig Economy)',
    seoScore: 92,
    version: 'Versi 2',
    warning: 'Konfirmasi Draft RPP Ketenagakerjaan Kementerian Tenaga Kerja',
  },
]

export const DashboardTasksSection: React.FC<DashboardTasksSectionProps> = ({
  onNavigateBrief,
  onNavigateDraft,
}) => {
  // Pagination state: 5 items per page
  const [briefPage, setBriefPage] = useState<number>(1)
  const [briefPageSize, setBriefPageSize] = useState<number>(5)

  const [draftPage, setDraftPage] = useState<number>(1)
  const [draftPageSize, setDraftPageSize] = useState<number>(5)

  const currentBriefs = BRIEF_TASKS.slice(
    (briefPage - 1) * briefPageSize,
    briefPage * briefPageSize
  )

  const currentDrafts = DRAFT_TASKS.slice(
    (draftPage - 1) * draftPageSize,
    draftPage * draftPageSize
  )

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-6">
      {/* Header Row */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Daftar Tugas
          </h2>
          <span className="bg-[#FFFBEB] text-[#B45309] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
            {BRIEF_TASKS.length + DRAFT_TASKS.length} Butuh Tindakan
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          Kumpulan naskah arahan artikel dan draf berita yang berstatus <strong>Tersedia</strong> (belum diambil atau dikunci oleh siapapun) dan siap untuk diperiksa oleh redaksi.
        </p>
      </div>

      {/* Section 1: Arahan Artikel Menunggu Persetujuan */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">
              1. Arahan Artikel Menunggu Persetujuan
            </span>
            <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold px-2 py-0.5 rounded border border-blue-200">
              {BRIEF_TASKS.length} Menunggu
            </span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded border border-emerald-200">
              Tersedia
            </span>
          </div>
          <span className="text-xs text-slate-400">Target produksi arahan artikel</span>
        </div>

        {/* Tabel Arahan Artikel */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[34%]">Judul Arahan Artikel</th>
                  <th className="py-3 px-3.5 w-[14%]">Status</th>
                  <th className="py-3 px-3.5 w-[20%]">Kata Kunci Utama</th>
                  <th className="py-3 px-3.5 w-[20%]">Kata Kunci Pendukung</th>
                  <th className="py-3 px-3.5 w-[12%] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentBriefs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-semibold text-slate-900 line-clamp-1">
                        {item.title}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Tersedia
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="text-xs font-medium text-slate-800">
                        {item.mainKeyword}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.supportingKeywords.join(', ')}
                      </p>
                    </td>
                    <td className="py-3 px-3.5 align-middle text-center">
                      <button
                        type="button"
                        onClick={onNavigateBrief}
                        className="px-3 py-1.5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
                      >
                        Tinjau Arahan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Bar Arahan Artikel */}
        <TablePagination
          currentPage={briefPage}
          totalItems={BRIEF_TASKS.length}
          pageSize={briefPageSize}
          onPageChange={setBriefPage}
          onPageSizeChange={(newSize) => {
            setBriefPageSize(newSize)
            setBriefPage(1)
          }}
        />
      </div>

      {/* Section Divider */}
      <div className="border-t border-[#DBEAFE]" />

      {/* Section 2: Draft Artikel Siap Diperiksa */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">
              2. Draft Artikel Siap Diperiksa
            </span>
            <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
              {DRAFT_TASKS.length} Siap Diperiksa
            </span>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded border border-emerald-200">
              Tersedia
            </span>
          </div>
          <span className="text-xs text-slate-400">Naskah AI siap verifikasi editor</span>
        </div>

        {/* Tabel Draft Artikel */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[30%]">Judul Draft Artikel</th>
                  <th className="py-3 px-3.5 w-[12%]">Status</th>
                  <th className="py-3 px-3.5 w-[14%]">Skor SEO (AI)</th>
                  <th className="py-3 px-3.5 w-[12%]">Versi Draft</th>
                  <th className="py-3 px-3.5 w-[20%]">Peringatan / Catatan</th>
                  <th className="py-3 px-3.5 w-[12%] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentDrafts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-semibold text-slate-900 line-clamp-1">
                        {item.title}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Tersedia
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="text-xs font-semibold text-slate-800">
                        {item.seoScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-block px-2 py-0.5 rounded font-medium text-xs bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200">
                        {item.version}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-[11px] font-medium leading-tight">
                        <AlertTriangle className="w-3 h-3 text-[#B45309] shrink-0" />
                        <span className="line-clamp-1">{item.warning}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-middle text-center">
                      <button
                        type="button"
                        onClick={onNavigateDraft}
                        className="px-3 py-1.5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-md transition-colors shadow-xs cursor-pointer"
                      >
                        Tinjau Draft
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Bar Draft Artikel */}
        <TablePagination
          currentPage={draftPage}
          totalItems={DRAFT_TASKS.length}
          pageSize={draftPageSize}
          onPageChange={setDraftPage}
          onPageSizeChange={(newSize) => {
            setDraftPageSize(newSize)
            setDraftPage(1)
          }}
        />
      </div>
    </div>
  )
}
