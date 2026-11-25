import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { TablePagination } from '../common/TablePagination'
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
  aiReason: string
}

interface DraftDecisionItem {
  id: string
  title: string
  seoScore: number
  aiReason: string
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
    aiReason: 'Sudut pandang regulasi kependudukan Dukcapil bagi keluarga baru yang ingin mengurus KK barcode mandiri secara online tanpa calo.',
  },
  {
    id: 'BRF-DEC-02',
    title: 'Syarat dan Dokumen Pembuatan Paspor Elektronik 2026',
    mainKeyword: 'paspor elektronik 2026',
    supportingKeywords: ['biaya e-paspor', 'm-paspor antrean', 'syarat paspor baru'],
    aiReason: 'Sudut pandang keimigrasian praktis bagi pemohon paspor mengenai aturan baru masa berlaku 10 tahun dan alur antrean aplikasi M-Paspor.',
  },
  {
    id: 'BRF-DEC-03',
    title: 'Strategi Investasi Reksadana Saham bagi Pemula',
    mainKeyword: 'investasi reksadana saham',
    supportingKeywords: ['reksadana pemula', 'risiko reksadana saham', 'nabung rutin reksadana'],
    aiReason: 'Sudut pandang literasi keuangan OJK bagi investor pemula untuk mengelola risiko fluktuasi pasar dan diversifikasi portofolio jangka panjang.',
  },
  {
    id: 'BRF-DEC-04',
    title: 'Panduan Registrasi IKD Secara Online Kemendagri',
    mainKeyword: 'cara aktivasi ikd online',
    supportingKeywords: ['ktp digital dukcapil', 'syarat buat ikd', 'aplikasi ikd hp'],
    aiReason: 'Sudut pandang digitalisasi identitas kependudukan Kemendagri bagi masyarakat umum pemilik e-KTP untuk aktivasi identitas digital via smartphone.',
  },
  {
    id: 'BRF-DEC-05',
    title: 'Update Harga Emas Antam Hari Ini dan Proyeksi Pasar',
    mainKeyword: 'harga emas antam hari ini',
    supportingKeywords: ['harga buyback emas', 'emas batangan 1 gram', 'prospek emas dunia'],
    aiReason: 'Sudut pandang pasar komoditas harian bagi masyarakat investor logam mulia yang memantau selisih spread beli dan harga buyback resmi Antam.',
  },
  {
    id: 'BRF-DEC-06',
    title: 'Jadwal Libur Nasional dan Cuti Bersama 2027',
    mainKeyword: 'jadwal libur nasional 2027',
    supportingKeywords: ['skb 3 menteri', 'cuti bersama idul fitri', 'long weekend 2027'],
    aiReason: 'Sudut pandang kebijakan resmi SKB 3 Menteri bagi masyarakat dan pekerja profesional yang menyusun agenda liburan dan cuti tahunan.',
  },
  {
    id: 'BRF-DEC-07',
    title: 'Syarat Pendaftaran Akun SNPMB 2027 Jalur SNBP Dibuka',
    mainKeyword: 'pendaftaran snpmb 2027',
    supportingKeywords: ['siswa eligible snbp', 'jadwal snpmb bppp', 'simpan permanen snpmb'],
    aiReason: 'Sudut pandang panduan akademis seleksi masuk PTN bagi siswa SMA eligible dan orang tua terkait batas waktu simpan permanen akun SNPMB.',
  },
  {
    id: 'BRF-DEC-08',
    title: 'Panduan Lengkap Mudik Lebaran 2027 Rute Tol Trans-Jawa',
    mainKeyword: 'mudik lebaran 2027',
    supportingKeywords: ['tol trans jawa', 'tarif tol mudik', 'tips mudik aman'],
    aiReason: 'Sudut pandang navigasi darat dan rekayasa lalin mudik terintegrasi bagi pengemudi mobil pribadi mengenai tarif tol dan rest area strategis.',
  },
]

const DRAFT_DECISIONS: DraftDecisionItem[] = [
  {
    id: 'DFT-DEC-01',
    title: 'Panduan Lengkap Syarat dan Prosedur Klaim JHT BPJS Ketenagakerjaan 2026',
    seoScore: 94,
    aiReason: 'Naskah disusun dengan formula struktur 5W+1H alur pencairan JHT 100% sesuai Permenaker No. 4/2022 guna menjawab intensi pencarian solusi klaim cepat.',
  },
  {
    id: 'DFT-DEC-02',
    title: 'Prosedur Pindah Domisili Antar Provinsi Tanpa Surat Pengantar RT',
    seoScore: 88,
    aiReason: 'Naskah membedah UU Adminduk Pasal 15 untuk menjawab kebingungan warga mengenai penghapusan syarat surat pengantar RT/RW secara lugas dan faktual.',
  },
  {
    id: 'DFT-DEC-03',
    title: 'Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini',
    seoScore: 96,
    aiReason: 'Laporan aktual peresmian tol Probowangi Seksi 1 yang mengoptimalkan kata kunci navigasi jalan tol serta tarif resmi BPJT Kementerian PUPR.',
  },
  {
    id: 'DFT-DEC-04',
    title: 'Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027',
    seoScore: 91,
    aiReason: 'Analisis kebijakan publik dengan mengintegrasikan data anomali cuaca BMKG dan proyeksi cadangan beras pemerintah dari Badan Pangan Nasional.',
  },
  {
    id: 'DFT-DEC-05',
    title: 'Regulasi Insentif Kendaraan Listrik dan Subsidi Energi Hijau',
    seoScore: 89,
    aiReason: 'Artikel komparatif skema subsidi energi hijau dan insentif mobil listrik dengan keterbacaan tinggi bagi konsumen urban yang beralih ke EV.',
  },
  {
    id: 'DFT-DEC-06',
    title: 'Tips dan Simulasi Perhitungan Bunga KPR Subsidi FLPP 2027',
    seoScore: 93,
    aiReason: 'Panduan simulasi cicilan bunga tetap 5% KPR Tapera FLPP yang menyasar keluarga muda berpenghasilan rendah dengan daya beli menengah ke bawah.',
  },
  {
    id: 'DFT-DEC-07',
    title: 'Langkah Mitigasi Bencana Gempa Sesar Aktif Pulau Jawa',
    seoScore: 90,
    aiReason: 'Edukasi mitigasi kegempaan berbasis zona sesar aktif BMKG/PVMBG untuk meningkatkan kesiapsiagaan pembaca di wilayah rawan lindu darat.',
  },
  {
    id: 'DFT-DEC-08',
    title: 'Pemerintah Siapkan Skema Perlindungan Tenaga Kerja Lepas (Gig Economy)',
    seoScore: 92,
    aiReason: 'Naskah liputan ketenagakerjaan yang merangkum poin krusial jaminan sosial perlindungan gig worker dan pekerja lepas di Indonesia.',
  },
]

export const DashboardAiDecisionsSection: React.FC<DashboardAiDecisionsSectionProps> = ({
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

  const currentKeywords = KEYWORD_DECISIONS.slice(
    (keywordPage - 1) * keywordPageSize,
    keywordPage * keywordPageSize
  )

  const currentClusters = CLUSTER_DECISIONS.slice(
    (clusterPage - 1) * clusterPageSize,
    clusterPage * clusterPageSize
  )

  const currentBriefs = BRIEF_DECISIONS.slice(
    (briefPage - 1) * briefPageSize,
    briefPage * briefPageSize
  )

  const currentDrafts = DRAFT_DECISIONS.slice(
    (draftPage - 1) * draftPageSize,
    draftPage * draftPageSize
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
        <div className="space-y-3">
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
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            item.decision === 'Layak'
                              ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                              : item.decision === 'Tidak Layak'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {item.decision}
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
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={keywordPage}
            totalItems={KEYWORD_DECISIONS.length}
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
              <table className="w-full text-left text-xs min-w-[900px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[20%]">Judul Topik</th>
                    <th className="py-3 px-3.5 w-[15%]">Kata Kunci Pilar</th>
                    <th className="py-3 px-3.5 w-[18%]">Kata Kunci Pendukung</th>
                    <th className="py-3 px-3.5 w-[11%]">Prediksi Vol/Bln</th>
                    <th className="py-3 px-3.5 w-[18%]">Alasan AI</th>
                    <th className="py-3 px-3.5 w-[9%]">Status</th>
                    <th className="py-3 px-3.5 w-[9%]">Intent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentClusters.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-middle">
                        <span className="font-semibold text-slate-900">{item.title}</span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <span className="text-xs font-semibold text-slate-800">
                          {item.pillarKeyword}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.supportingKeywords.join(', ')}
                        </p>
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
          </div>

          {/* Pagination */}
          <TablePagination
            currentPage={clusterPage}
            totalItems={CLUSTER_DECISIONS.length}
            pageSize={clusterPageSize}
            onPageChange={setClusterPage}
            onPageSizeChange={(newSize) => {
              setClusterPageSize(newSize)
              setClusterPage(1)
            }}
          />
        </div>
      )}

      {/* Tab 3: Arahan Artikel Table */}
      {activeTab === 'brief' && (
        <div className="space-y-3">
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[760px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[26%]">Judul Artikel</th>
                    <th className="py-3 px-3.5 w-[18%]">Kata Kunci Utama</th>
                    <th className="py-3 px-3.5 w-[20%]">Kata Kunci Pendukung</th>
                    <th className="py-3 px-3.5 w-[36%]">Alasan AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentBriefs.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-middle">
                        <span className="font-semibold text-slate-900 line-clamp-2">{item.title}</span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <span className="text-xs font-semibold text-slate-800">
                          {item.mainKeyword}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.supportingKeywords.join(', ')}
                        </p>
                      </td>
                      <td className="py-3 px-3.5 align-middle text-slate-600 leading-relaxed">
                        {item.aiReason}
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
            totalItems={BRIEF_DECISIONS.length}
            pageSize={briefPageSize}
            onPageChange={setBriefPage}
            onPageSizeChange={(newSize) => {
              setBriefPageSize(newSize)
              setBriefPage(1)
            }}
          />
        </div>
      )}

      {/* Tab 4: Draf Artikel Table */}
      {activeTab === 'draft' && (
        <div className="space-y-3">
          <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#DBEAFE] text-slate-600 font-semibold">
                    <th className="py-3 px-3.5 w-[32%]">Judul Artikel</th>
                    <th className="py-3 px-3.5 w-[16%]">Prediksi Skor SEO</th>
                    <th className="py-3 px-3.5 w-[52%]">Alasan AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentDrafts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5 align-middle">
                        <span className="font-semibold text-slate-900 line-clamp-2">{item.title}</span>
                      </td>
                      <td className="py-3 px-3.5 align-middle">
                        <span className="text-xs font-semibold text-slate-800">
                          {item.seoScore}/100
                        </span>
                      </td>
                      <td className="py-3 px-3.5 align-middle text-slate-600 leading-relaxed">
                        {item.aiReason}
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
            totalItems={DRAFT_DECISIONS.length}
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
