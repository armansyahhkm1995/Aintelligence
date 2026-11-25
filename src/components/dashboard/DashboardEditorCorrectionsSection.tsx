import React, { useState } from 'react'
import { CheckCircle2, Copy, FileText, Check, Sparkles } from 'lucide-react'
import { UserRole } from '../../types'
import { useToast } from '../../context/ToastContext'

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
  notes: string
}

interface DraftCorrectionItem {
  id: string
  title: string
  copyOptions: string[]
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
    notes: 'Diterbitkan terpisah karena kebutuhan update kondisi mudik *real-time* per segmen ruas jalan.',
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
    notes: 'Arahan artikel telah disetujui tanpa revisi outline untuk lanjut ke antrean draf AI otomatis.',
  },
  {
    id: 'BRF-CORR-02',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    actionType: 'Disimpan (Sunting Inline)',
    editor: 'Ahmad Fauzi',
    time: '40 menit lalu',
    notes: 'Menyimpan penyesuaian sudut pandang lokal dan menambahkan aturan diversifikasi risiko OJK.',
  },
  {
    id: 'BRF-CORR-03',
    title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik 2026',
    actionType: 'Disetujui',
    editor: 'Siti Rahmawati',
    time: '1 jam lalu',
    notes: 'Disetujui setelah memastikan poin biaya PNBP paspor 10 tahun tercantum akurat.',
  },
  {
    id: 'BRF-CORR-04',
    title: 'Panduan Registrasi IKD Secara Online Kemendagri',
    actionType: 'Disimpan (Sunting Inline)',
    editor: 'Dewi Lestari',
    time: '2 jam lalu',
    notes: 'Menyimpan suntingan daftar pertanyaan utama (5W+1H) terkait kendala scan barcode di Dukcapil.',
  },
  {
    id: 'BRF-CORR-05',
    title: 'Update Harga Emas Antam Hari Ini dan Proyeksi Pasar',
    actionType: 'Disetujui',
    editor: 'Budi Santoso',
    time: '3 jam lalu',
    notes: 'Disetujui untuk diproduksi cepat sebagai artikel tren ekonomi pagi.',
  },
  {
    id: 'BRF-CORR-06',
    title: 'Jadwal Libur Nasional dan Cuti Bersama 2027',
    actionType: 'Disetujui',
    editor: 'Rian Pratama',
    time: '4 jam lalu',
    notes: 'Disetujui berdasarkan rilis resmi SKB 3 Menteri.',
  },
]

const DRAFT_CORRECTIONS: DraftCorrectionItem[] = [
  {
    id: 'DFT-CORR-01',
    title: 'Panduan Lengkap Syarat dan Prosedur Klaim JHT BPJS Ketenagakerjaan 2026',
    copyOptions: [
      'Salin Semua',
      'Salin Judul',
      'Salin Isi',
      'Salin Paket Metadata SEO',
      'Salin Rekomendasi Prompt Gambar Dari AI',
    ],
    editor: 'Siti Rahmawati',
    time: '10 menit lalu',
  },
  {
    id: 'DFT-CORR-02',
    title: 'Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini',
    copyOptions: [
      'Salin Semua',
      'Salin Judul',
      'Salin Isi',
      'Salin Paket Metadata SEO',
      'Salin Rekomendasi Prompt Gambar Dari AI',
    ],
    editor: 'Dewi Lestari',
    time: '30 menit lalu',
  },
  {
    id: 'DFT-CORR-03',
    title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
    copyOptions: [
      'Salin Semua',
      'Salin Judul',
      'Salin Isi',
      'Salin Paket Metadata SEO',
      'Salin Rekomendasi Prompt Gambar Dari AI',
    ],
    editor: 'Budi Santoso',
    time: '1 jam lalu',
  },
  {
    id: 'DFT-CORR-04',
    title: 'Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027',
    copyOptions: [
      'Salin Semua',
      'Salin Judul',
      'Salin Isi',
      'Salin Paket Metadata SEO',
      'Salin Rekomendasi Prompt Gambar Dari AI',
    ],
    editor: 'Ahmad Fauzi',
    time: '2 jam lalu',
  },
  {
    id: 'DFT-CORR-05',
    title: 'Regulasi Insentif Kendaraan Listrik dan Subsidi Energi Hijau',
    copyOptions: [
      'Salin Semua',
      'Salin Judul',
      'Salin Isi',
      'Salin Paket Metadata SEO',
      'Salin Rekomendasi Prompt Gambar Dari AI',
    ],
    editor: 'Rian Pratama',
    time: '3 jam lalu',
  },
  {
    id: 'DFT-CORR-06',
    title: 'Tips dan Simulasi Perhitungan Bunga KPR Subsidi FLPP 2027',
    copyOptions: [
      'Salin Semua',
      'Salin Judul',
      'Salin Isi',
      'Salin Paket Metadata SEO',
      'Salin Rekomendasi Prompt Gambar Dari AI',
    ],
    editor: 'Siti Rahmawati',
    time: '4 jam lalu',
  },
]

export const DashboardEditorCorrectionsSection: React.FC<DashboardEditorCorrectionsSectionProps> = ({
  userRole = 'admin',
}) => {
  const { showSuccess } = useToast()
  const [activeTab, setActiveTab] = useState<'keyword' | 'cluster' | 'brief' | 'draft'>('keyword')
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null)

  // Pagination states for each tab (5 items per page)
  const [keywordPage, setKeywordPage] = useState<number>(1)
  const [clusterPage, setClusterPage] = useState<number>(1)
  const [briefPage, setBriefPage] = useState<number>(1)
  const [draftPage, setDraftPage] = useState<number>(1)
  const itemsPerPage = 5

  const totalKeywordPages = Math.ceil(KEYWORD_CORRECTIONS.length / itemsPerPage)
  const currentKeywords = KEYWORD_CORRECTIONS.slice(
    (keywordPage - 1) * itemsPerPage,
    keywordPage * itemsPerPage
  )

  const totalClusterPages = Math.ceil(CLUSTER_CORRECTIONS.length / itemsPerPage)
  const currentClusters = CLUSTER_CORRECTIONS.slice(
    (clusterPage - 1) * itemsPerPage,
    clusterPage * itemsPerPage
  )

  const totalBriefPages = Math.ceil(BRIEF_CORRECTIONS.length / itemsPerPage)
  const currentBriefs = BRIEF_CORRECTIONS.slice(
    (briefPage - 1) * itemsPerPage,
    briefPage * itemsPerPage
  )

  const totalDraftPages = Math.ceil(DRAFT_CORRECTIONS.length / itemsPerPage)
  const currentDrafts = DRAFT_CORRECTIONS.slice(
    (draftPage - 1) * itemsPerPage,
    draftPage * itemsPerPage
  )

  const handleCopyOption = (draftTitle: string, optionLabel: string, draftId: string) => {
    navigator.clipboard.writeText(`${optionLabel} untuk naskah: ${draftTitle}`)
    setCopiedDraftId(`${draftId}-${optionLabel}`)
    showSuccess('Salin Berhasil', `${optionLabel} berhasil disalin ke clipboard`)
    setTimeout(() => setCopiedDraftId(null), 2000)
  }

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900">Daftar Koreksi oleh Editor</h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Rekapitulasi intervensi manual, persetujuan arahan, penyimpanan suntingan, dan aktivitas penyalinan draf berita oleh tim editor redaksi.
        </p>
      </div>

      {/* 4 Module Tabs */}
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
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[16%]">Aksi</th>
                  <th className="py-3 px-3.5 w-[24%]">Item Terkait</th>
                  <th className="py-3 px-3.5 w-[25%]">Keputusan Semula AI vs Koreksi</th>
                  <th className="py-3 px-3.5 w-[23%]">Alasan / Catatan Editor</th>
                  <th className="py-3 px-3.5 w-[12%] text-right">Editor & Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentKeywords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]">
                        {item.action}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">{item.keyword}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.volKd}</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-400 line-through">Semula AI: {item.aiVsEditor.ai}</div>
                      <div className="text-[#15803D] font-bold mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Koreksi Editor: {item.aiVsEditor.editor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
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

          {/* Pagination */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-t border-[#DBEAFE] flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Menampilkan{' '}
              <strong className="text-slate-700">
                {(keywordPage - 1) * itemsPerPage + 1}–
                {Math.min(keywordPage * itemsPerPage, KEYWORD_CORRECTIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{KEYWORD_CORRECTIONS.length}</strong> koreksi kata kunci
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setKeywordPage((prev) => Math.max(1, prev - 1))}
                disabled={keywordPage === 1}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <span className="px-2 py-1 font-semibold text-slate-800">
                Hal {keywordPage} dari {totalKeywordPages}
              </span>
              <button
                type="button"
                onClick={() => setKeywordPage((prev) => Math.min(totalKeywordPages, prev + 1))}
                disabled={keywordPage === totalKeywordPages}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Kelompok Topik Table */}
      {activeTab === 'cluster' && (
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

          {/* Pagination */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-t border-[#DBEAFE] flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Menampilkan{' '}
              <strong className="text-slate-700">
                {(clusterPage - 1) * itemsPerPage + 1}–
                {Math.min(clusterPage * itemsPerPage, CLUSTER_CORRECTIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{CLUSTER_CORRECTIONS.length}</strong> resolusi topik
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setClusterPage((prev) => Math.max(1, prev - 1))}
                disabled={clusterPage === 1}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <span className="px-2 py-1 font-semibold text-slate-800">
                Hal {clusterPage} dari {totalClusterPages}
              </span>
              <button
                type="button"
                onClick={() => setClusterPage((prev) => Math.min(totalClusterPages, prev + 1))}
                disabled={clusterPage === totalClusterPages}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Arahan Artikel Table (Hanya ada Setujui dan Simpan Inline) */}
      {activeTab === 'brief' && (
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[32%]">Judul Arahan Artikel Disetujui / Disimpan</th>
                  <th className="py-3 px-3.5 w-[18%]">Status Tindakan</th>
                  <th className="py-3 px-3.5 w-[16%]">Editor Penanggung Jawab</th>
                  <th className="py-3 px-3.5 w-[14%]">Waktu Eksekusi</th>
                  <th className="py-3 px-3.5 w-[20%]">Catatan Redaksi</th>
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
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          item.actionType === 'Disetujui'
                            ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                            : 'bg-[#EFF6FF] text-[#1866EF] border-[#BFDBFE]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.actionType}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle font-semibold text-slate-800">
                      {item.editor}
                    </td>
                    <td className="py-3 px-3.5 align-middle text-slate-500 font-mono text-[11px]">
                      {item.time}
                    </td>
                    <td className="py-3 px-3.5 align-middle text-slate-600 leading-relaxed text-[11px]">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-t border-[#DBEAFE] flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Menampilkan{' '}
              <strong className="text-slate-700">
                {(briefPage - 1) * itemsPerPage + 1}–
                {Math.min(briefPage * itemsPerPage, BRIEF_CORRECTIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{BRIEF_CORRECTIONS.length}</strong> arahan disetujui / disimpan
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBriefPage((prev) => Math.max(1, prev - 1))}
                disabled={briefPage === 1}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <span className="px-2 py-1 font-semibold text-slate-800">
                Hal {briefPage} dari {totalBriefPages}
              </span>
              <button
                type="button"
                onClick={() => setBriefPage((prev) => Math.min(totalBriefPages, prev + 1))}
                disabled={briefPage === totalBriefPages}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Draf Artikel Table (Kolom Salin Lengkap) */}
      {activeTab === 'draft' && (
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[28%]">Judul Draft Artikel</th>
                  <th className="py-3 px-3.5 w-[46%]">Opsi Penyalinan Konten (Siap CMS)</th>
                  <th className="py-3 px-3.5 w-[14%]">Editor Penyalindang</th>
                  <th className="py-3 px-3.5 w-[12%] text-right">Waktu Salin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentDrafts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-bold text-slate-900 leading-snug">{item.title}</span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <div className="flex flex-wrap gap-1.5">
                        {item.copyOptions.map((opt, i) => {
                          const isCopied = copiedDraftId === `${item.id}-${opt}`
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleCopyOption(item.title, opt, item.id)}
                              className={`px-2 py-1 rounded text-[11px] font-semibold border transition-all cursor-pointer inline-flex items-center gap-1 ${
                                isCopied
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : opt === 'Salin Semua'
                                  ? 'bg-[#1866EF] text-white hover:bg-blue-600 border-blue-600 shadow-2xs'
                                  : 'bg-slate-50 hover:bg-blue-50/80 text-slate-700 hover:text-[#1866EF] border-slate-200'
                              }`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Tersalin!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>{opt}</span>
                                </>
                              )}
                            </button>
                          )
                        })}
                      </div>
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

          {/* Pagination */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-t border-[#DBEAFE] flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Menampilkan{' '}
              <strong className="text-slate-700">
                {(draftPage - 1) * itemsPerPage + 1}–
                {Math.min(draftPage * itemsPerPage, DRAFT_CORRECTIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{DRAFT_CORRECTIONS.length}</strong> draf tersalin
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDraftPage((prev) => Math.max(1, prev - 1))}
                disabled={draftPage === 1}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <span className="px-2 py-1 font-semibold text-slate-800">
                Hal {draftPage} dari {totalDraftPages}
              </span>
              <button
                type="button"
                onClick={() => setDraftPage((prev) => Math.min(totalDraftPages, prev + 1))}
                disabled={draftPage === totalDraftPages}
                className="px-2.5 py-1 border border-slate-200 hover:bg-white rounded text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
