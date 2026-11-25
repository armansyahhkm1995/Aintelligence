import React, { useState } from 'react'
import { TablePagination } from '../common/TablePagination'
import { UserRole } from '../../types'

interface DashboardEditorCorrectionsSectionProps {
  userRole?: UserRole
}

interface KeywordCorrectionItem {
  id: string
  action: string
  keyword: string
  volKd: string
  aiVsEditor: { ai: string; editor: string }
  notes: string
  editor: string
  time: string
}

interface ClusterCorrectionItem {
  id: string
  action: string
  topic: string
  volKd: string
  change: string
  notes: string
  editor: string
  time: string
}

interface BriefCorrectionItem {
  id: string
  title: string
  actionType: 'Disetujui' | 'Disimpan (Sunting Inline)'
  editor: string
  time: string
}

interface DraftCorrectionItem {
  id: string
  title: string
  copiedPart: string
  editor: string
  time: string
}

const KEYWORD_CORRECTIONS: KeywordCorrectionItem[] = [
  {
    id: 'KWD-CORR-01',
    action: 'Koreksi Status',
    keyword: 'cek desil bansos dtks jateng online',
    volKd: 'Vol: 14.200 | KD: 42%',
    aiVsEditor: { ai: 'Perlu Ditinjau', editor: 'Layak' },
    notes: 'Dibutuhkan untuk materi liputan bansos daerah Jawa Tengah menjelang penyaluran kuartal 4.',
    editor: 'Cameron Newton',
    time: '12 menit lalu',
  },
  {
    id: 'KWD-CORR-02',
    action: 'Koreksi Status',
    keyword: 'trik cepat pinjam uang tanpa jaminan',
    volKd: 'Vol: 28.500 | KD: 55%',
    aiVsEditor: { ai: 'Perlu Ditinjau', editor: 'Tidak Layak' },
    notes: 'Melanggar kebijakan redaksi terkait konten keuangan berisiko tinggi tanpa pengawasan OJK.',
    editor: 'Budi Santoso',
    time: '35 menit lalu',
  },
  {
    id: 'KWD-CORR-03',
    action: 'Koreksi Status',
    keyword: 'resep masakan daging qurban praktis',
    volKd: 'Vol: 45.000 | KD: 30%',
    aiVsEditor: { ai: 'Tidak Layak (Di luar topik)', editor: 'Layak' },
    notes: 'Disetujui untuk kanal gaya hidup dan kuliner nusantara edisi khusus Idul Adha.',
    editor: 'Siti Rahmawati',
    time: '1 jam lalu',
  },
  {
    id: 'KWD-CORR-04',
    action: 'Koreksi Status',
    keyword: 'jadwal sholat dan imsakiyah ramadhan 2027',
    volKd: 'Vol: 90.000 | KD: 25%',
    aiVsEditor: { ai: 'Perlu Ditinjau', editor: 'Layak' },
    notes: 'Informasi pelayanan publik resmi dari Kemenag untuk seluruh stasiun penyiaran RRI.',
    editor: 'Ahmad Fauzi',
    time: '2 jam lalu',
  },
  {
    id: 'KWD-CORR-05',
    action: 'Koreksi Status',
    keyword: 'download video tiktok tanpa watermark',
    volKd: 'Vol: 110.000 | KD: 60%',
    aiVsEditor: { ai: 'Perlu Ditinjau', editor: 'Tidak Layak' },
    notes: 'Tindakan pelanggaran hak cipta konten kreator, tidak sesuai dengan nilai jurnalistik RRI.',
    editor: 'Dewi Lestari',
    time: '3 jam lalu',
  },
  {
    id: 'KWD-CORR-06',
    action: 'Koreksi Status',
    keyword: 'simulasi angsuran kpr btn syariah',
    volKd: 'Vol: 32.000 | KD: 40%',
    aiVsEditor: { ai: 'Perlu Ditinjau', editor: 'Layak' },
    notes: 'Edukasi literasi pembiayaan rumah pertama bagi generasi muda.',
    editor: 'Cameron Newton',
    time: '4 jam lalu',
  },
  {
    id: 'KWD-CORR-07',
    action: 'Koreksi Status',
    keyword: 'cara daftar bintara tni ad online 2027',
    volKd: 'Vol: 65.000 | KD: 38%',
    aiVsEditor: { ai: 'Perlu Ditinjau', editor: 'Layak' },
    notes: 'Pengumuman resmi rekrutmen abdi negara yang dinantikan masyarakat.',
    editor: 'Budi Santoso',
    time: '5 jam lalu',
  },
]

const CLUSTER_CORRECTIONS: ClusterCorrectionItem[] = [
  {
    id: 'CLS-CORR-01',
    action: 'Abaikan Kanibalisasi',
    topic: 'Panduan Reksadana 2026',
    volKd: 'Vol: 45.000 | 4 Kata Kunci',
    change: 'Semula AI: Butuh Resolusi → Override Editor: Aman',
    notes: 'Target audiens berbeda: artikel ini fokus pemula murni, sedangkan pilar kedua fokus komparasi instrumen.',
    editor: 'Cameron Newton',
    time: '25 menit lalu',
  },
  {
    id: 'CLS-CORR-02',
    action: 'Gabung Kelompok Topik',
    topic: 'Syarat E-Paspor Kilat',
    volKd: 'Vol: 18.000 | 2 Kata Kunci',
    change: 'Dilebur ke: Syarat dan Dokumen Pembuatan Paspor Elektronik',
    notes: 'Menghindari duplikasi konten dan menyatukan otoritas artikel layanan imigrasi.',
    editor: 'Budi Santoso',
    time: '1 jam lalu',
  },
  {
    id: 'CLS-CORR-03',
    action: 'Pecah Kelompok Topik',
    topic: 'Bansos BPNT dan PKH 2026',
    volKd: 'Vol: 62.000 | 5 Kata Kunci',
    change: 'Dipecah menjadi 2 artikel terpisah: Alur PKH & Mekanisme Sembako BPNT',
    notes: 'Kriteria penerima manfaat kedua bantuan berbeda secara regulasi Kemensos.',
    editor: 'Siti Rahmawati',
    time: '2 jam lalu',
  },
  {
    id: 'CLS-CORR-04',
    action: 'Tolak Kelompok Topik',
    topic: 'Bocoran Kunci Jawaban Ujian Nasional',
    volKd: 'Vol: 40.000 | 3 Kata Kunci',
    change: 'Status: Ditolak & Dicoret',
    notes: 'Konten manipulasi akademik bertentangan dengan etika jurnalisme dan integritas publik.',
    editor: 'Ahmad Fauzi',
    time: '3 jam lalu',
  },
  {
    id: 'CLS-CORR-05',
    action: 'Edit Kata Kunci Pilar',
    topic: 'Tips Membeli Rumah Pertama FLPP',
    volKd: 'Vol: 50.000 | 4 Kata Kunci',
    change: 'Mengubah kata kunci pilar menjadi: "syarat kpr subsidi flpp 2027"',
    notes: 'Penyesuaian dengan regulasi Kementerian PKP dan BP Tapera terbaru.',
    editor: 'Dewi Lestari',
    time: '4 jam lalu',
  },
  {
    id: 'CLS-CORR-06',
    action: 'Abaikan Kanibalisasi',
    topic: 'Rekayasa Lalu Lintas Tol Cipali',
    volKd: 'Vol: 38.000 | 3 Kata Kunci',
    change: 'Semula AI: Butuh Resolusi → Override Editor: Aman',
    notes: 'Diterbitkan terpisah karena kebutuhan update kondisi mudik real-time per segmen ruas jalan.',
    editor: 'Cameron Newton',
    time: '5 jam lalu',
  },
]

const BRIEF_CORRECTIONS: BriefCorrectionItem[] = [
  {
    id: 'BRF-CORR-01',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    actionType: 'Disetujui',
    editor: 'Budi Santoso',
    time: '15 menit lalu',
  },
  {
    id: 'BRF-CORR-02',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    actionType: 'Disimpan (Sunting Inline)',
    editor: 'Ahmad Fauzi',
    time: '40 menit lalu',
  },
  {
    id: 'BRF-CORR-03',
    title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik 2026',
    actionType: 'Disetujui',
    editor: 'Siti Rahmawati',
    time: '1 jam lalu',
  },
  {
    id: 'BRF-CORR-04',
    title: 'Panduan Registrasi IKD Secara Online Kemendagri',
    actionType: 'Disimpan (Sunting Inline)',
    editor: 'Dewi Lestari',
    time: '2 jam lalu',
  },
  {
    id: 'BRF-CORR-05',
    title: 'Update Harga Emas Antam Hari Ini dan Proyeksi Pasar',
    actionType: 'Disetujui',
    editor: 'Budi Santoso',
    time: '3 jam lalu',
  },
  {
    id: 'BRF-CORR-06',
    title: 'Jadwal Libur Nasional dan Cuti Bersama 2027',
    actionType: 'Disetujui',
    editor: 'Rian Pratama',
    time: '4 jam lalu',
  },
]

const DRAFT_CORRECTIONS: DraftCorrectionItem[] = [
  {
    id: 'DFT-CORR-01',
    title: 'Panduan Lengkap Syarat dan Prosedur Klaim JHT BPJS Ketenagakerjaan 2026',
    copiedPart: 'Salin Semua Konten',
    editor: 'Siti Rahmawati',
    time: '10 menit lalu',
  },
  {
    id: 'DFT-CORR-02',
    title: 'Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini',
    copiedPart: 'Salin Paket Metadata SEO',
    editor: 'Dewi Lestari',
    time: '30 menit lalu',
  },
  {
    id: 'DFT-CORR-03',
    title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
    copiedPart: 'Salin Judul Saja',
    editor: 'Budi Santoso',
    time: '1 jam lalu',
  },
  {
    id: 'DFT-CORR-04',
    title: 'Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027',
    copiedPart: 'Salin Isi Naskah Saja',
    editor: 'Ahmad Fauzi',
    time: '2 jam lalu',
  },
  {
    id: 'DFT-CORR-05',
    title: 'Regulasi Insentif Kendaraan Listrik dan Subsidi Energi Hijau',
    copiedPart: 'Salin Rekomendasi Prompt Gambar Dari AI',
    editor: 'Rian Pratama',
    time: '3 jam lalu',
  },
  {
    id: 'DFT-CORR-06',
    title: 'Tips dan Simulasi Perhitungan Bunga KPR Subsidi FLPP 2027',
    copiedPart: 'Salin Semua Konten',
    editor: 'Siti Rahmawati',
    time: '4 jam lalu',
  },
  {
    id: 'DFT-CORR-07',
    title: 'Langkah Mitigasi Bencana Gempa Sesar Aktif Pulau Jawa',
    copiedPart: 'Salin Paket Metadata SEO',
    editor: 'Budi Santoso',
    time: '5 jam lalu',
  },
  {
    id: 'DFT-CORR-08',
    title: 'Pemerintah Siapkan Skema Perlindungan Tenaga Kerja Lepas (Gig Economy)',
    copiedPart: 'Salin Judul Saja',
    editor: 'Dewi Lestari',
    time: '6 jam lalu',
  },
]

export const DashboardEditorCorrectionsSection: React.FC<DashboardEditorCorrectionsSectionProps> = ({
  userRole = 'admin',
}) => {
  const [activeTab, setActiveTab] = useState<'keyword' | 'cluster' | 'brief' | 'draft'>('keyword')

  // Pagination states for each tab (5 items per page)
  const [keywordPage, setKeywordPage] = useState<number>(1)
  const [keywordPageSize, setKeywordPageSize] = useState<number>(5)

  const [clusterPage, setClusterPage] = useState<number>(1)
  const [clusterPageSize, setClusterPageSize] = useState<number>(5)

  const [briefPage, setBriefPage] = useState<number>(1)
  const [briefPageSize, setBriefPageSize] = useState<number>(5)

  const [draftPage, setDraftPage] = useState<number>(1)
  const [draftPageSize, setDraftPageSize] = useState<number>(5)

  const currentKeywords = KEYWORD_CORRECTIONS.slice(
    (keywordPage - 1) * keywordPageSize,
    keywordPage * keywordPageSize
  )

  const currentClusters = CLUSTER_CORRECTIONS.slice(
    (clusterPage - 1) * clusterPageSize,
    clusterPage * clusterPageSize
  )

  const currentBriefs = BRIEF_CORRECTIONS.slice(
    (briefPage - 1) * briefPageSize,
    briefPage * briefPageSize
  )

  const currentDrafts = DRAFT_CORRECTIONS.slice(
    (draftPage - 1) * draftPageSize,
    draftPage * draftPageSize
  )

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900">Daftar Koreksi oleh Editor</h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Rekapitulasi intervensi manusia, persetujuan arahan artikel, dan penyalinan naskah berita oleh editor redaksi RRI.
        </p>
      </div>

      {/* 4 Tab Selector */}
      <div className="border border-[#DBEAFE] rounded-lg p-1 grid grid-cols-2 sm:grid-cols-4 gap-1 bg-white select-none">
        <button
          type="button"
          onClick={() => setActiveTab('keyword')}
          className={`h-9 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
            activeTab === 'keyword'
              ? 'bg-[#1866EF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Kata Kunci
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cluster')}
          className={`h-9 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
            activeTab === 'cluster'
              ? 'bg-[#1866EF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Kelompok Topik
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('brief')}
          className={`h-9 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
            activeTab === 'brief'
              ? 'bg-[#1866EF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Arahan Artikel
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('draft')}
          className={`h-9 px-3 rounded-md text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
            activeTab === 'draft'
              ? 'bg-[#1866EF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Draf Artikel
        </button>
      </div>

      {/* Tab 1: Kata Kunci Table */}
      {activeTab === 'keyword' && (
        <div className="space-y-3">
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[14%]">Tindakan</th>
                    <th className="py-3 px-3.5 w-[24%]">Kata Kunci</th>
                    <th className="py-3 px-3.5 w-[20%]">AI vs Keputusan Editor</th>
                    <th className="py-3 px-3.5 w-[28%]">Alasan / Catatan Editor</th>
                    <th className="py-3 px-3.5 w-[14%] text-right">Editor & Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentKeywords.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-top">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 border border-blue-200 text-[#1866EF]">
                          {item.action}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-top">
                        <div className="font-bold text-slate-900 leading-snug">{item.keyword}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.volKd}</div>
                      </td>
                      <td className="py-3 px-3.5 align-top">
                        <div className="text-[11px] text-slate-500">
                          AI:{' '}
                          <span className="font-semibold text-slate-700">{item.aiVsEditor.ai}</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          Editor: {item.aiVsEditor.editor}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 align-top text-slate-600 leading-relaxed">
                        "{item.notes}"
                      </td>
                      <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-500">
                        <div className="font-semibold text-slate-800">{item.editor}</div>
                        <div className="text-slate-400 mt-0.5">{item.time}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={keywordPage}
            totalItems={KEYWORD_CORRECTIONS.length}
            pageSize={keywordPageSize}
            onPageChange={setKeywordPage}
            onPageSizeChange={(newSize) => {
              setKeywordPageSize(newSize)
              setKeywordPage(1)
            }}
          />
        </div>
      )}

      {/* Tab 2: Kelompok Topik Table */}
      {activeTab === 'cluster' && (
        <div className="space-y-3">
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[16%]">Aksi Resolusi</th>
                    <th className="py-3 px-3.5 w-[24%]">Topik Terkait</th>
                    <th className="py-3 px-3.5 w-[25%]">Perubahan Struktur Klaster</th>
                    <th className="py-3 px-3.5 w-[23%]">Alasan / Catatan Resolusi</th>
                    <th className="py-3 px-3.5 w-[12%] text-right">Editor & Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentClusters.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-top">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 border border-amber-200 text-amber-800">
                          {item.action}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-top">
                        <div className="font-bold text-slate-900 leading-snug">{item.topic}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.volKd}</div>
                      </td>
                      <td className="py-3 px-3.5 align-top text-slate-700 font-medium">
                        {item.change}
                      </td>
                      <td className="py-3 px-3.5 align-top text-slate-600 leading-relaxed">
                        "{item.notes}"
                      </td>
                      <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-500">
                        <div className="font-semibold text-slate-800">{item.editor}</div>
                        <div className="text-slate-400 mt-0.5">{item.time}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={clusterPage}
            totalItems={CLUSTER_CORRECTIONS.length}
            pageSize={clusterPageSize}
            onPageChange={setClusterPage}
            onPageSizeChange={(newSize) => {
              setClusterPageSize(newSize)
              setClusterPage(1)
            }}
          />
        </div>
      )}

      {/* Tab 3: Arahan Artikel Table (Kolom Catatan Redaksi Dihapus) */}
      {activeTab === 'brief' && (
        <div className="space-y-3">
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[42%]">Judul Arahan Artikel Disetujui / Disimpan</th>
                    <th className="py-3 px-3.5 w-[24%]">Status Tindakan</th>
                    <th className="py-3 px-3.5 w-[20%]">Editor Penanggung Jawab</th>
                    <th className="py-3 px-3.5 w-[14%] text-right">Waktu Eksekusi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentBriefs.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-middle">
                        <span className="font-bold text-slate-900 leading-snug">{item.title}</span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            item.actionType === 'Disetujui'
                              ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                              : 'bg-[#EFF6FF] text-[#1866EF] border-[#BFDBFE]'
                          }`}
                        >
                          {item.actionType}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-middle font-semibold text-slate-800">
                        {item.editor}
                      </td>
                      <td className="py-3 px-3.5 align-middle text-right text-slate-500 font-mono text-[11px]">
                        {item.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={briefPage}
            totalItems={BRIEF_CORRECTIONS.length}
            pageSize={briefPageSize}
            onPageChange={setBriefPage}
            onPageSizeChange={(newSize) => {
              setBriefPageSize(newSize)
              setBriefPage(1)
            }}
          />
        </div>
      )}

      {/* Tab 4: Draf Artikel Table (Kolom Tindakan Salin per Naskah) */}
      {activeTab === 'draft' && (
        <div className="space-y-3">
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[38%]">Judul Draft Artikel</th>
                    <th className="py-3 px-3.5 w-[28%]">Tindakan Salin Konten</th>
                    <th className="py-3 px-3.5 w-[20%]">Editor Penyalindang</th>
                    <th className="py-3 px-3.5 w-[14%] text-right">Waktu Salin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentDrafts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-middle">
                        <span className="font-bold text-slate-900 leading-snug">{item.title}</span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <span className="text-xs font-medium text-slate-800">
                          {item.copiedPart}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-middle font-semibold text-slate-800">
                        {item.editor}
                      </td>
                      <td className="py-3 px-3.5 align-middle text-right text-slate-500 font-mono text-[11px]">
                        {item.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={draftPage}
            totalItems={DRAFT_CORRECTIONS.length}
            pageSize={draftPageSize}
            onPageChange={setDraftPage}
            onPageSizeChange={(newSize) => {
              setDraftPageSize(newSize)
              setDraftPage(1)
            }}
          />
        </div>
      )}
    </div>
  )
}
