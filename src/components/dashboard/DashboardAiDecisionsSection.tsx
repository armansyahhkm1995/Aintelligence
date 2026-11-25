import React, { useState } from 'react'
import { Sparkles, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { UserRole } from '../../types'

interface DashboardAiDecisionsSectionProps {
  userRole?: UserRole
}

interface KeywordDecisionItem {
  id: string
  keyword: string
  decision: 'Layak' | 'Tidak Layak' | 'Perlu Ditinjau'
  reason: string
}

interface ClusterDecisionItem {
  id: string
  title: string
  pillarKeyword: string
  supportingKeywords: string[]
  volume: string
  reason: string
  status: 'Aman' | 'Butuh Resolusi'
  intent: 'Informasional' | 'Transaksional' | 'Komersial' | 'Navigasional'
}

interface BriefDecisionItem {
  id: string
  title: string
  mainKeyword: string
  supportingKeywords: string[]
  status: 'Selesai'
}

interface DraftDecisionItem {
  id: string
  title: string
  seoScore: number
  status: 'Selesai'
}

const KEYWORD_DECISIONS: KeywordDecisionItem[] = [
  {
    id: 'KWD-DEC-01',
    keyword: 'cara daftar bansos kemensos online 2027',
    decision: 'Layak',
    reason: 'Volume pencarian tinggi (33.100/bln), KD rendah (48%), intent informasional mendesak bagi penerima manfaat publik.',
  },
  {
    id: 'KWD-DEC-02',
    keyword: 'bantuan subsidi upah pekerja kemnaker',
    decision: 'Layak',
    reason: 'Tren pencarian musiman tinggi menjelang kuartal akhir, sangat relevan dengan liputan ketenagakerjaan RRI.',
  },
  {
    id: 'KWD-DEC-03',
    keyword: 'cek desil bansos dtks jateng online',
    decision: 'Perlu Ditinjau',
    reason: 'Spesifik lokal Jawa Tengah, memerlukan verifikasi apakah layak diterbitkan pada portal nasional atau diteruskan ke RRI Semarang.',
  },
  {
    id: 'KWD-DEC-04',
    keyword: 'judi slot gacor deposit pulsa',
    decision: 'Tidak Layak',
    reason: 'Melanggar aturan redaksi RRI (Kategori Negatif / Perjudian Ilegal Dilarang Kominfo).',
  },
  {
    id: 'KWD-DEC-05',
    keyword: 'syarat pinjol langsung cair tanpa ktp',
    decision: 'Tidak Layak',
    reason: 'Melanggar kaidah literasi keuangan Buku Gaya RRI Bab II terkait promosi pinjaman daring ilegal tanpa izin OJK.',
  },
  {
    id: 'KWD-DEC-06',
    keyword: 'panduan pendaftaran akun snpmb bppp 2027',
    decision: 'Layak',
    reason: 'Edukasi resmi penerimaan mahasiswa baru Kemendikbudristek dengan intensi informasional murni dan volume tinggi.',
  },
  {
    id: 'KWD-DEC-07',
    keyword: 'jadwal cuti bersama libur lebaran 2027',
    decision: 'Layak',
    reason: 'Tren puncak tahunan dengan potensi viralitas tinggi bagi masyarakat dan pemudik seluruh Indonesia.',
  },
  {
    id: 'KWD-DEC-08',
    keyword: 'trik hack akun media sosial orang lain',
    decision: 'Tidak Layak',
    reason: 'Tindakan melawan hukum dan cybercrime terlarang oleh regulasi UU ITE.',
  },
]

const CLUSTER_DECISIONS: ClusterDecisionItem[] = [
  {
    id: 'CLS-DEC-01',
    title: 'Panduan Reksadana 2026',
    pillarKeyword: 'panduan reksadana 2026',
    supportingKeywords: ['belajar reksadana online', 'reksadana bibit ojk', 'bareksa reksadana pasar uang'],
    volume: '45.000 / bln',
    reason: 'Seluruh kata kunci memiliki kedekatan semantik intent edukasi investasi pemula, namun bersaing dengan topik investasi umum.',
    status: 'Butuh Resolusi',
    intent: 'Informasional',
  },
  {
    id: 'CLS-DEC-02',
    title: 'Cara Investasi Reksadana Uang untuk Generasi-Z',
    pillarKeyword: 'cara investasi reksadana',
    supportingKeywords: ['reksadana pemula', 'modal kecil', 'keuntungan reksadana'],
    volume: '60.000 / bln',
    reason: 'Volume pencarian tinggi dan risiko kanibalisasi internal 0% terhadap arsip berita rilis sebelumnya.',
    status: 'Aman',
    intent: 'Komersial',
  },
  {
    id: 'CLS-DEC-03',
    title: 'Panduan Pendaftaran Akun SNPMB 2027',
    pillarKeyword: 'pendaftaran snpmb 2027',
    supportingKeywords: ['syarat snbp', 'portal snpmb bppp', 'siswa eligible'],
    volume: '75.000 / bln',
    reason: 'Intensi seragam mengenai tahapan registrasi akun siswa SMA sederajat bebas dari bentrok kata kunci.',
    status: 'Aman',
    intent: 'Informasional',
  },
  {
    id: 'CLS-DEC-04',
    title: 'Prosedur Klaim JHT BPJS Ketenagakerjaan',
    pillarKeyword: 'klaim jht bpjs',
    supportingKeywords: ['syarat klaim jht', 'aplikasi jmo online', 'pencairan saldo bpjs'],
    volume: '52.000 / bln',
    reason: 'Membahas tuntas alur pencairan dana ketenagakerjaan dari regulasi resmi pemerintah tanpa duplikasi topik.',
    status: 'Aman',
    intent: 'Transaksional',
  },
  {
    id: 'CLS-DEC-05',
    title: 'Rute dan Rekayasa Lalu Lintas Tol Trans-Jawa Mudik 2027',
    pillarKeyword: 'jalur mudik tol trans jawa',
    supportingKeywords: ['one way tol cipali', 'tarif tol jakarta surabaya', 'rest area tol jawa'],
    volume: '68.000 / bln',
    reason: 'Topik krusial publik dengan rute spesifik pulau Jawa yang siap diproduksi menjadi artikel panduan navigasi.',
    status: 'Aman',
    intent: 'Navigasional',
  },
  {
    id: 'CLS-DEC-06',
    title: 'Update Harga Emas Antam dan Analisis Investasi Logam Mulia',
    pillarKeyword: 'harga emas batangan antam',
    supportingKeywords: ['grafik harga emas hari ini', 'prospek investasi emas 2027', 'harga buyback antam'],
    volume: '82.000 / bln',
    reason: 'Konsistensi data pasar komoditas harian untuk kebutuhan referensi publik.',
    status: 'Aman',
    intent: 'Komersial',
  },
  {
    id: 'CLS-DEC-07',
    title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik',
    pillarKeyword: 'biaya paspor elektronik 2026',
    supportingKeywords: ['antrean paspor m-paspor', 'paspor 10 tahun imigrasi', 'perpanjang paspor lama'],
    volume: '39.000 / bln',
    reason: 'Panduan layanan keimigrasian resmi berbasis aplikasi terintegrasi Ditjen Imigrasi.',
    status: 'Aman',
    intent: 'Transaksional',
  },
  {
    id: 'CLS-DEC-08',
    title: 'Kompilasi Bantuan Sosial Cair Kuartal 4',
    pillarKeyword: 'bansos kemensos cair',
    supportingKeywords: ['cek desil dtks', 'bansos pkh tahap 4', 'beras bantuan pangan cbp'],
    volume: '58.000 / bln',
    reason: 'Terdapat potensi tumpang tindih dengan klaster bantuan pangan daerah, butuh penegasan cakupan nasional.',
    status: 'Butuh Resolusi',
    intent: 'Informasional',
  },
]

const BRIEF_DECISIONS: BriefDecisionItem[] = [
  {
    id: 'BRF-DEC-01',
    title: 'Cara Mengurus Kartu Keluarga dan Persyaratannya',
    mainKeyword: 'cara mengurus kartu keluarga',
    supportingKeywords: ['syarat kk baru', 'pindah kk online', 'dukcapil kk barcode'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-02',
    title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik 2026',
    mainKeyword: 'paspor elektronik 2026',
    supportingKeywords: ['biaya e-paspor', 'm-paspor antrean', 'syarat paspor baru'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-03',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    mainKeyword: 'investasi reksadana saham',
    supportingKeywords: ['reksadana pemula', 'risiko reksadana saham', 'nabung rutin reksadana'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-04',
    title: 'Panduan Registrasi IKD Secara Online Kemendagri',
    mainKeyword: 'cara aktivasi ikd online',
    supportingKeywords: ['ktp digital dukcapil', 'syarat buat ikd', 'aplikasi ikd hp'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-05',
    title: 'Update Harga Emas Antam Hari Ini dan Proyeksi Pasar',
    mainKeyword: 'harga emas antam hari ini',
    supportingKeywords: ['harga buyback emas', 'emas batangan 1 gram', 'prospek emas dunia'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-06',
    title: 'Jadwal Libur Nasional dan Cuti Bersama 2027',
    mainKeyword: 'jadwal libur nasional 2027',
    supportingKeywords: ['skb 3 menteri', 'cuti bersama idul fitri', 'long weekend 2027'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-07',
    title: 'Syarat Pendaftaran Akun SNPMB 2027 Jalur SNBP Dibuka',
    mainKeyword: 'pendaftaran snpmb 2027',
    supportingKeywords: ['siswa eligible snbp', 'jadwal snpmb bppp', 'simpan permanen snpmb'],
    status: 'Selesai',
  },
  {
    id: 'BRF-DEC-08',
    title: 'Panduan Lengkap Mudik Lebaran 2027 Rute Tol Trans-Jawa',
    mainKeyword: 'mudik lebaran 2027',
    supportingKeywords: ['tol trans jawa', 'tarif tol mudik', 'tips mudik aman'],
    status: 'Selesai',
  },
]

const DRAFT_DECISIONS: DraftDecisionItem[] = [
  {
    id: 'DFT-DEC-01',
    title: 'Panduan Lengkap Syarat dan Prosedur Klaim JHT BPJS Ketenagakerjaan 2026',
    seoScore: 94,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-02',
    title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
    seoScore: 88,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-03',
    title: 'Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini',
    seoScore: 96,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-04',
    title: 'Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027',
    seoScore: 91,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-05',
    title: 'Regulasi Insentif Kendaraan Listrik dan Subsidi Energi Hijau',
    seoScore: 89,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-06',
    title: 'Tips dan Simulasi Perhitungan Bunga KPR Subsidi FLPP 2027',
    seoScore: 93,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-07',
    title: 'Langkah Mitigasi Bencana Gempa Sesar Aktif Pulau Jawa',
    seoScore: 90,
    status: 'Selesai',
  },
  {
    id: 'DFT-DEC-08',
    title: 'Pemerintah Siapkan Skema Perlindungan Tenaga Kerja Lepas (Gig Economy)',
    seoScore: 92,
    status: 'Selesai',
  },
]

export const DashboardAiDecisionsSection: React.FC<DashboardAiDecisionsSectionProps> = ({
  userRole = 'admin',
}) => {
  const [activeTab, setActiveTab] = useState<'keyword' | 'cluster' | 'brief' | 'draft'>('keyword')

  // Pagination states for each tab (5 items per page)
  const [keywordPage, setKeywordPage] = useState<number>(1)
  const [clusterPage, setClusterPage] = useState<number>(1)
  const [briefPage, setBriefPage] = useState<number>(1)
  const [draftPage, setDraftPage] = useState<number>(1)
  const itemsPerPage = 5

  const totalKeywordPages = Math.ceil(KEYWORD_DECISIONS.length / itemsPerPage)
  const currentKeywords = KEYWORD_DECISIONS.slice(
    (keywordPage - 1) * itemsPerPage,
    keywordPage * itemsPerPage
  )

  const totalClusterPages = Math.ceil(CLUSTER_DECISIONS.length / itemsPerPage)
  const currentClusters = CLUSTER_DECISIONS.slice(
    (clusterPage - 1) * itemsPerPage,
    clusterPage * itemsPerPage
  )

  const totalBriefPages = Math.ceil(BRIEF_DECISIONS.length / itemsPerPage)
  const currentBriefs = BRIEF_DECISIONS.slice(
    (briefPage - 1) * itemsPerPage,
    briefPage * itemsPerPage
  )

  const totalDraftPages = Math.ceil(DRAFT_DECISIONS.length / itemsPerPage)
  const currentDrafts = DRAFT_DECISIONS.slice(
    (draftPage - 1) * itemsPerPage,
    draftPage * itemsPerPage
  )

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">Daftar Keputusan AI</h2>
          <span className="p-1 rounded bg-blue-50 text-[#1866EF]">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Log pertimbangan dan formulasi otomatis AI pada 4 modul utama: seleksi kata kunci, pengelompokan topik, perumusan arahan artikel, serta produksi draf berita.
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
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[30%]">Kata Kunci</th>
                  <th className="py-3 px-3.5 w-[18%]">Keputusan AI</th>
                  <th className="py-3 px-3.5 w-[52%]">Alasan Keputusan AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentKeywords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-semibold text-slate-900">{item.keyword}</span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          item.decision === 'Layak'
                            ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                            : item.decision === 'Tidak Layak'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {item.decision === 'Layak' && <CheckCircle2 className="w-3 h-3 text-[#15803D]" />}
                        {item.decision === 'Tidak Layak' && <XCircle className="w-3 h-3 text-rose-600" />}
                        {item.decision === 'Perlu Ditinjau' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        <span>{item.decision}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle text-slate-600 leading-relaxed">
                      {item.reason}
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
                {Math.min(keywordPage * itemsPerPage, KEYWORD_DECISIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{KEYWORD_DECISIONS.length}</strong> kata kunci
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
            <table className="w-full text-left text-xs min-w-[900px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[20%]">Judul Topik</th>
                  <th className="py-3 px-3.5 w-[15%]">Kata Kunci Pilar</th>
                  <th className="py-3 px-3.5 w-[16%]">Kata Kunci Pendukung</th>
                  <th className="py-3 px-3.5 w-[11%]">Prediksi Vol/Bln</th>
                  <th className="py-3 px-3.5 w-[18%]">Alasan AI</th>
                  <th className="py-3 px-3.5 w-[10%]">Status</th>
                  <th className="py-3 px-3.5 w-[10%]">Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentClusters.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-semibold text-slate-900">{item.title}</span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-block px-2 py-0.5 rounded font-semibold text-[11px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#1866EF]">
                        {item.pillarKeyword}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {item.supportingKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-middle font-semibold text-slate-700">
                      {item.volume}
                    </td>
                    <td className="py-3 px-3.5 align-middle text-slate-600 leading-relaxed text-[11px]">
                      {item.reason}
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.status === 'Aman'
                            ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                            : 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9]">
                        {item.intent}
                      </span>
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
                {Math.min(clusterPage * itemsPerPage, CLUSTER_DECISIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{CLUSTER_DECISIONS.length}</strong> kelompok topik
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

      {/* Tab 3: Arahan Artikel Table */}
      {activeTab === 'brief' && (
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[38%]">Judul Artikel</th>
                  <th className="py-3 px-3.5 w-[22%]">Kata Kunci Utama</th>
                  <th className="py-3 px-3.5 w-[28%]">Kata Kunci Pendukung</th>
                  <th className="py-3 px-3.5 w-[12%] text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentBriefs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-semibold text-slate-900">{item.title}</span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-block font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded text-[11px]">
                        {item.mainKeyword}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {item.supportingKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[10px]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-middle text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
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
                {Math.min(briefPage * itemsPerPage, BRIEF_DECISIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{BRIEF_DECISIONS.length}</strong> arahan artikel
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

      {/* Tab 4: Draf Artikel Table */}
      {activeTab === 'draft' && (
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[56%]">Judul Artikel</th>
                  <th className="py-3 px-3.5 w-[24%]">Prediksi Skor SEO</th>
                  <th className="py-3 px-3.5 w-[20%] text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {currentDrafts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3.5 align-middle">
                      <span className="font-semibold text-slate-900">{item.title}</span>
                    </td>
                    <td className="py-3 px-3.5 align-middle">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-semibold text-xs bg-[#F0FDF4] text-[#15803D] border border-green-200">
                        Skor SEO: {item.seoScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-middle text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
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
                {Math.min(draftPage * itemsPerPage, DRAFT_DECISIONS.length)}
              </strong>{' '}
              dari <strong className="text-slate-700">{DRAFT_DECISIONS.length}</strong> draf artikel
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
