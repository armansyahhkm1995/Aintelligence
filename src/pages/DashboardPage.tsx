import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  Search,
  ArrowRight,
  ShieldCheck,
  Edit3,
  XCircle,
  RefreshCw,
  Trash2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const { setCurrentPage } = useApp()

  const [aiDecisionTab, setAiDecisionTab] = useState<'keyword' | 'cluster' | 'brief'>('brief')
  const [overrideFilter, setOverrideFilter] = useState<'keyword' | 'cluster' | 'brief' | 'draft'>('keyword')

  const steps = [
    {
      step: 'Step 1: Impor CSV',
      count: '2 File Baru',
      sub: 'Unggahan terbaru 20 menit lalu',
      page: 'impor' as const,
    },
    {
      step: 'Step 2: Kata Kunci',
      count: '1.250 Layak',
      sub: 'Dari 3.420 total keyword',
      page: 'keyword' as const,
    },
    {
      step: 'Step 3: Kelompok Topik',
      count: '45 Terbentuk',
      sub: '3 potensi kanibalisasi',
      page: 'cluster' as const,
    },
    {
      step: 'Step 4: Arahan Artikel',
      count: '12 Disetujui',
      sub: '4 menunggu tinjauan',
      page: 'brief' as const,
    },
    {
      step: 'Step 5: Draf Artikel',
      count: '8 Siap Salin',
      sub: 'Siap verifikasi editor',
      page: 'draft' as const,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div>
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Dashboard Pipeline Produksi
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Ruang kendali riset keyword, penyusunan brief, dan produksi draf berita otomatis.
        </p>
      </div>

      {/* 5 Metrics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
        {steps.map((item, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(item.page)}
            className="bg-white border border-[#DBEAFE] rounded-md p-3.5 sm:p-4 flex flex-col justify-between hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group min-h-[120px] sm:h-[136px]"
          >
            <div className="text-[11px] sm:text-xs font-medium text-slate-500">{item.step}</div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{item.count}</div>
              {item.sub ? (
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 truncate">{item.sub}</div>
              ) : (
                <div className="h-4" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* COMP-TodoList-Editor: Daftar Tugas Butuh Tindakan Editor */}
      <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-5">
        {/* Header Row */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Daftar Tugas Butuh Tindakan Editor
            </h2>
            <span className="bg-[#FFFBEB] text-[#B45309] text-xs font-medium px-2 py-0.5 rounded border border-amber-200">
              7 Butuh Tindakan
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Item bottleneck prioritas yang menunggu persetujuan dan penyuntingan Anda.
          </p>
        </div>

        {/* Section 1: Arahan Artikel Menunggu Persetujuan */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900">
                1. Arahan Artikel Menunggu Persetujuan
              </span>
              <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                4 Menunggu
              </span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400">Target produksi artikel</span>
          </div>

          {/* Brief Items List */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
            {/* Brief Row 1 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Panduan Lengkap Mudik Lebaran 2027 Rute Tol Trans-Jawa
                </h3>
                <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap text-xs pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-medium">Kata Kunci Utama:</span>
                    <span className="font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                      mudik lebaran 2027
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-500 font-medium">Kata Kunci Pendukung:</span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      tol trans jawa
                    </span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      tarif tol mudik
                    </span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      tips mudik aman
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('brief')}
                className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
              >
                Tinjau Arahan
              </button>
            </div>

            {/* Brief Row 2 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Kompilasi Bansos Cair November 2026: Syarat & Cara Cek NIK
                </h3>
                <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap text-xs pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-medium">Kata Kunci Utama:</span>
                    <span className="font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                      bansos cair november 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-500 font-medium">Kata Kunci Pendukung:</span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      syarat bansos 2026
                    </span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      cara cek nik bansos
                    </span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      daftar penerima bansos
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('brief')}
                className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
              >
                Tinjau Arahan
              </button>
            </div>

            {/* Brief Row 3 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Update Harga Emas Antam Hari Ini dan Tips Investasi Pemula
                </h3>
                <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap text-xs pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-medium">Kata Kunci Utama:</span>
                    <span className="font-semibold text-[#1866EF] bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 rounded">
                      harga emas antam hari ini
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-500 font-medium">Kata Kunci Pendukung:</span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      tips investasi emas
                    </span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      prediksi harga emas
                    </span>
                    <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      beli emas antam
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('brief')}
                className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
              >
                Tinjau Arahan
              </button>
            </div>
          </div>
        </div>

        {/* Section Divider in Figma */}
        <div className="border-t border-[#DBEAFE]" />

        {/* Section 2: Draft Artikel Siap Diperiksa */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900">
                2. Draft Artikel Siap Diperiksa
              </span>
              <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded border border-green-200">
                3 Siap Salin
              </span>
            </div>
            <span className="text-xs sm:text-sm text-slate-400">Naskah AI siap verifikasi editor</span>
          </div>

          {/* Draf Items List */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
            {/* Draf Row 1 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini
                </h3>
                <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
                    Skor SEO: 96/100
                  </span>
                  <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                    Versi Draft: Versi 2
                  </span>
                  <span className="bg-slate-50 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                    Jumlah Kata: 920 Kata
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('draft')}
                className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
              >
                Tinjau Draft
              </button>
            </div>

            {/* Draf Row 2 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027
                </h3>
                <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
                    Skor SEO: 91/100
                  </span>
                  <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                    Versi Draft: Versi 1
                  </span>
                  <span className="bg-slate-50 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                    Jumlah Kata: 900 Kata
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('draft')}
                className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
              >
                Tinjau Draft
              </button>
            </div>

            {/* Draf Row 3 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Katalog Wisata Hidden Gem Dieng Terbaru Pasca Revitalisasi
                </h3>
                <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-semibold px-2 py-0.5 rounded border border-green-200">
                    Skor SEO: 94/100
                  </span>
                  <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                    Versi Draft: Versi 2
                  </span>
                  <span className="bg-slate-50 text-slate-700 text-xs font-medium px-2 py-0.5 rounded border border-slate-200">
                    Jumlah Kata: 800 Kata
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('draft')}
                className="w-full sm:w-auto px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-stretch sm:self-center text-center cursor-pointer"
              >
                Tinjau Draft
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: DAFTAR KEPUTUSAN AI (TRANSPARANSI LOG MODEL)                      */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-5">
        {/* Header */}
        <div>
          <h2 className="text-base font-semibold text-slate-900">Daftar Keputusan AI</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Alasan logis dan pertimbangan otomatis AI pada setiap tahap: dari kata kunci, kelompok topik, hingga rumusan arahan & draf artikel.
          </p>
        </div>

        {/* Tab Selector: Full width matching SettingsPage */}
        <div className="border border-[#DBEAFE] rounded-[6px] p-1 flex sm:grid sm:grid-cols-3 gap-1 bg-white select-none overflow-x-auto w-full">
          <button
            type="button"
            onClick={() => setAiDecisionTab('keyword')}
            className={`h-[36px] px-3 shrink-0 sm:shrink rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              aiDecisionTab === 'keyword'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Kata Kunci
          </button>
          <button
            type="button"
            onClick={() => setAiDecisionTab('cluster')}
            className={`h-[36px] px-3 shrink-0 sm:shrink rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              aiDecisionTab === 'cluster'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Kelompok Topik
          </button>
          <button
            type="button"
            onClick={() => setAiDecisionTab('brief')}
            className={`h-[36px] px-3 shrink-0 sm:shrink rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              aiDecisionTab === 'brief'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Arahan & Draf Artikel
          </button>
        </div>

        {/* Tab Content 1: Saring Kata Kunci */}
        {aiDecisionTab === 'keyword' && (
          <div className="space-y-3">
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
              {/* Item 1 */}
              <div className="p-3.5 hover:bg-slate-50/60 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">cara daftar bansos kemensos online 2027</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                      Layak
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Vol: 33.100 | KD: 48% | Evergreen: 94</span>
                </div>
                <div className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-md text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#15803D]">Alasan & Keputusan AI:</strong> Volume pencarian bulanan sangat tinggi (33.100) dengan KD 48% yang realistis dicapai portal berita. Intensi murni informasional layanan masyarakat tanpa risiko melanggar etika. Skor evergreen 94 menjamin relevansi pembaca jangka panjang.
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 hover:bg-slate-50/60 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">cek desil bansos dtks jateng online</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                      Perlu Ditinjau
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Vol: 14.200 | KD: 42% | Tumpang Tindih: 68</span>
                </div>
                <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-md text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#B45309]">Alasan & Keputusan AI:</strong> Terdeteksi tumpang tindih tinggi (68%) dengan panduan bansos nasional Kemensos. Diberi status "Perlu Ditinjau" agar editor mengonfirmasi apakah artikel akan difokuskan khusus untuk dinamika penyaluran wilayah Jawa Tengah atau digabungkan ke artikel induk.
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 hover:bg-slate-50/60 transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">Kata kunci tentang judi</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                      Tidak Layak
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Vol: 8.100 | KD: 32% | Risiko: Berisiko</span>
                </div>
                <div className="p-2.5 bg-rose-50/50 border border-rose-100 rounded-md text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#B91C1C]">Alasan & Keputusan AI:</strong> Ditolak otomatis karena melanggar aturan blacklist kata kunci berisiko hukum dan regulasi Kominfo/UU ITE. Kata kunci tidak memenuhi asas kepatutan konten publik RRI serta berisiko menurunkan reputasi domain portal.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Kelompok Topik */}
        {aiDecisionTab === 'cluster' && (
          <div className="space-y-3">
            <div className="space-y-3">
              {/* Cluster Item 1 */}
              <div className="p-4 border border-[#DBEAFE] rounded-xl bg-slate-50/30 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#1866EF]">Cara Investasi Reksadana Pemula</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                      Aman (Siap Brief)
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">Total Vol: 45.000 / bln • (4 Keyword)</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <p><strong>Kata Kunci Pilar:</strong> <code className="text-[#1866EF] bg-blue-50 px-1.5 py-0.5 rounded">cara investasi reksadana (Vol 22.000) (KD 28%)</code></p>
                  <p><strong>Kata Kunci Pendukung:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">reksadana pemula</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">modal kecil</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">keuntungan reksadana</code></p>
                </div>
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#1866EF]">Keputusan AI Membentuk Topik Ini:</strong> Seluruh kata kunci pendukung memiliki kedekatan semantik intent edukasi langkah awal. Pengelompokan ini mengunci volume pencarian 45.000/bulan ke dalam satu pilar kokoh tanpa menyebar menjadi 4 artikel pendek yang saling memakan traffic. Tingkat risiko kanibalisasi internal adalah 0% terhadap arsip berita RRI sebelumnya.
                </div>
              </div>

              {/* Cluster Item 2 */}
              <div className="p-4 border border-amber-200 rounded-xl bg-amber-50/20 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#92400E]">Panduan Reksadana 2026</h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                      Butuh Resolusi
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">Total Vol: 45.000 / bln • (3 Keyword)</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <p><strong>Kata Kunci Pilar:</strong> <code className="text-[#B45309] bg-amber-50 px-1.5 py-0.5 rounded">panduan reksadana 2026 (Vol 22.000) (KD 28%)</code></p>
                  <p><strong>Kata Kunci Pendukung:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">belajar reksadana online</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">cara mulai reksadana bibit</code></p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#B45309]">Keputusan AI Memberi Flag Peringatan:</strong> Terdeteksi skor tumpang tindih semantik 78% dengan topik <em>Cara Investasi Reksadana Pemula</em>. Jika kedua artikel dirilis bersamaan tanpa sudut pandang spesifik tahunan, keduanya akan bersaing di mesin pencari (kanibalisasi internal). AI menyerahkan keputusan kepada redaksi untuk memisahkan kata kunci bermerek atau mengabaikan jika memiliki fokus regulasi 2026.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Arahan Artikel & Basis Draf (Single Narrative Paragraph) */}
        {aiDecisionTab === 'brief' && (
          <div className="space-y-4">
            {/* Rincian Komponen Arahan Artikel */}
            <div className="p-4 border border-[#DBEAFE] rounded-xl bg-white space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Judul Usulan Artikel</span>
                  <h3 className="text-base font-bold text-[#1866EF] mt-0.5">
                    Cara Investasi Reksadana Pemula: Panduan Aman Modal Rp10.000 Legal OJK
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-bold">
                  Status: Siap Ditulis AI
                </span>
              </div>

              {/* Grid 6 Komponen Pendukung */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">1. Sasaran Pembaca</span>
                  <p className="text-xs text-slate-800 font-medium">Masyarakat yang mengurus dokumen kependudukan & generasi muda/first-jobber yang membutuhkan instrumen tabungan aman.</p>
                </div>
                <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">2. Pertanyaan Utama</span>
                  <p className="text-xs text-slate-800 font-medium">Berapa modal awal minimal? Apakah reksadana dijamin LPS? Berapa hari kerja proses pencairan saldo rekening?</p>
                </div>
                <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">3. Sudut Pandang Jurnalistik (Angle)</span>
                  <p className="text-xs text-slate-800 font-medium">Fokus pada keamanan modal, regulasi perlindungan konsumen OJK, dan kemudahan pencairan untuk pemula berpenghasilan pertama.</p>
                </div>
                <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">4. Kerangka Naskah Baku</span>
                  <p className="text-xs text-slate-800 font-medium"><strong className="text-[#1866EF]">H1 Baku Permanen di Puncak:</strong> Panduan Lengkap Memulai Investasi Reksadana bagi Pemula (tanpa drag-and-drop), dilanjutkan subtopik H2/H3 sistematis.</p>
                </div>
                <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">5. Daftar URL/Penerbit/Sumber Pendukung</span>
                  <p className="text-xs text-slate-800 font-medium">OJK (Otoritas Jasa Keuangan), Inflasi Tahunan BI, Bursa Efek Indonesia (BEI), UU P2SK No. 4/2023.</p>
                </div>
                <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">6. Rekomendasi Tautan Internal RRI</span>
                  <p className="text-xs text-slate-800 font-medium">rri.co.id/ekonomi/tips-kelola-gaji-pertama, rri.co.id/hukum/waspada-pinjol-ilegal-2026.</p>
                </div>
              </div>

              {/* Kesimpulan Naratif Tunggal Menyeluruh (One Paragraph Summary for Brief & Draft) */}
              <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl space-y-1.5 mt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1866EF]">
                  <Sparkles className="w-4 h-4" />
                  <span>Kesimpulan Keputusan AI (Dasar Arahan & Draf Artikel):</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed text-justify">
                  Berdasarkan hasil analisis agregasi kata kunci pilar dan pendukung seputar literasi keuangan, AI menetapkan judul <strong>"Cara Investasi Reksadana Pemula: Panduan Aman Modal Rp10.000 Legal OJK"</strong> sebagai arahan artikel prioritas dengan sasaran pembaca utama generasi muda dan masyarakat umum yang memerlukan kepastian regulasi. Seluruh pertanyaan utama pembaca mengenai ambang batas modal dan kepastian pencairan dijawab melalui sudut pandang perlindungan konsumen OJK, yang diturunkan ke dalam kerangka naskah terstruktur baku (diawali H1 permanen tanpa drag-drop serta subtopik H2/H3 yang runtut), diperkuat daftar URL rujukan otoritas resmi UU P2SK serta rekomendasi tautan internal portal RRI, sehingga draf artikel akhir yang diproduksi AI dapat langsung tersaji utuh, kredibel secara jurnalistik, memenuhi standar SEO evergreen, dan siap diterbitkan redaksi tanpa risiko tumpang tindih topik.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: DAFTAR OVERRIDE EDITOR (LOG AUDIT KOREKSI MANUAL)                 */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-base font-semibold text-slate-900">Daftar Override Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Riwayat intervensi, koreksi manual, penolakan, serta resolusi konflik oleh redaktur terhadap keputusan AI di seluruh modul.
          </p>
        </div>

        {/* Module Filter Tabs: Full width matching SettingsPage (4 tabs, 'all' removed) */}
        <div className="border border-[#DBEAFE] rounded-[6px] p-1 flex sm:grid sm:grid-cols-4 gap-1 bg-white select-none overflow-x-auto w-full">
          {[
            { id: 'keyword', label: 'Kata Kunci' },
            { id: 'cluster', label: 'Kelompok Topik' },
            { id: 'brief', label: 'Arahan Artikel' },
            { id: 'draft', label: 'Draf Artikel' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setOverrideFilter(f.id as any)}
              className={`h-[36px] px-3 shrink-0 sm:shrink rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
                overrideFilter === f.id
                  ? 'bg-[#1866EF] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Override Logs Table */}
        <div className="border border-slate-200/90 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-3.5 w-[16%]">Aksi</th>
                  <th className="py-3 px-3.5 w-[24%]">Item Terkait</th>
                  <th className="py-3 px-3.5 w-[25%]">Keputusan Semula AI vs Koreksi</th>
                  <th className="py-3 px-3.5 w-[23%]">Alasan / Catatan Editor</th>
                  <th className="py-3 px-3.5 w-[12%] text-right">Editor & Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {/* 1. Kata Kunci: Koreksi Redaksional */}
                {overrideFilter === 'keyword' && (
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]">
                        Koreksi Status
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">cek desil bansos dtks jateng online</div>
                      <div className="text-[11px] text-slate-400">Vol: 14.200 | KD: 42%</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-500 line-through">Semula AI: Perlu Ditinjau</div>
                      <div className="text-[#15803D] font-bold mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Koreksi Editor: Layak</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                      "Dibutuhkan untuk materi liputan bansos daerah Jawa Tengah menjelang penyaluran kuartal 4."
                    </td>
                    <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-800">Cameron Newton</div>
                      <div>12 mnt lalu</div>
                    </td>
                  </tr>
                )}

                {/* 2. Kelompok Topik: Abaikan Kanibalisasi */}
                {overrideFilter === 'cluster' && (
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]">
                        Abaikan Bentrok
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">Panduan Reksadana 2026</div>
                      <div className="text-[11px] text-slate-400">Pilar: panduan reksadana 2026</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-500 line-through">Semula AI: Butuh Resolusi (Kanibalisasi 78%)</div>
                      <div className="text-[#15803D] font-bold mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Koreksi Editor: Aman (Siap Brief)</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                      "Fokus pada pembaruan regulasi tahun 2026, bukan tutorial dasar pemula."
                    </td>
                    <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-800">Cameron Newton</div>
                      <div>25 mnt lalu</div>
                    </td>
                  </tr>
                )}

                {/* 3. Kelompok Topik: Perbarui Topik */}
                {overrideFilter === 'cluster' && (
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]">
                        Perbarui Topik
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">Cara Investasi Reksadana Pemula</div>
                      <div className="text-[11px] text-slate-400">Sebelumnya 3 kata kunci pendukung</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-500">Struktur Awal AI</div>
                      <div className="text-[#1866EF] font-bold mt-0.5 flex items-center gap-1">
                        <Edit3 className="w-3.5 h-3.5 shrink-0" />
                        <span>+ 'reksadana syariah pemula'</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                      "Menampung tren pencarian instrumen syariah untuk generasi muda agar cakupan lebih komprehensif."
                    </td>
                    <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-800">Cameron Newton</div>
                      <div>1 jam lalu</div>
                    </td>
                  </tr>
                )}

                {/* 4. Kelompok Topik: Pisahkan Kata Kunci */}
                {overrideFilter === 'cluster' && (
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8]">
                        Pisahkan Keyword
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">cara mulai reksadana bibit</div>
                      <div className="text-[11px] text-slate-400">Vol: 22.000 | Branded Query</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-500 line-through">Semula AI: Menyatu di Cluster Panduan</div>
                      <div className="text-[#7E22CE] font-bold mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Koreksi: Dipisah ke Topik Mandiri</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                      "Query bersifat spesifik platform (branded APERD), dipisahkan ke artikel tinjauan aplikasi resmi OJK."
                    </td>
                    <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-800">Cameron Newton</div>
                      <div>2 jam lalu</div>
                    </td>
                  </tr>
                )}

                {/* 5. Arahan Artikel: Tolak Arahan Artikel */}
                {overrideFilter === 'brief' && (
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C]">
                        Tolak Arahan
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">Strategi Investasi Kripto Modal Kecil untuk Remaja</div>
                      <div className="text-[11px] text-slate-400">Status Awal: Brief Disetujui AI</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-500 line-through">Semula AI: Siap Diteruskan ke Draf</div>
                      <div className="text-[#B91C1C] font-bold mt-0.5 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Koreksi Editor: Ditolak</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                      "Aset kripto berisiko tinggi dan bertentangan dengan kebijakan literasi edukasi konservatif RRI untuk kalangan remaja."
                    </td>
                    <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-800">Cameron Newton</div>
                      <div>3 jam lalu</div>
                    </td>
                  </tr>
                )}

                {/* 6. Draf Artikel: Hapus Draf */}
                {overrideFilter === 'draft' && (
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3.5 align-top">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C]">
                        Hapus Draf
                      </span>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="font-bold text-slate-900 leading-snug">Prediksi Kurs Rupiah Akhir Tahun 2026</div>
                      <div className="text-[11px] text-slate-400">Versi 1 | 850 kata</div>
                    </td>
                    <td className="py-3 px-3.5 align-top">
                      <div className="text-slate-500 line-through">Semula AI: Draf Siap Verifikasi</div>
                      <div className="text-[#B91C1C] font-bold mt-0.5 flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Koreksi Editor: Dihapus Total</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 align-top text-slate-700 leading-relaxed">
                      "Kutipan analis tidak terkonfirmasi dan skor cek fakta memerlukan revisi total dari sumber primer Bank Indonesia."
                    </td>
                    <td className="py-3 px-3.5 align-top text-right text-[11px] text-slate-400">
                      <div className="font-semibold text-slate-800">Cameron Newton</div>
                      <div>4 jam lalu</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status Mesin AI Card (Daftar Topik Pantauan in Figma) */}
      <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-slate-900">Status Mesin AI</h2>
            <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded border border-green-200">
              Aktif Normal
            </span>
          </div>
          <span className="text-sm text-slate-400">Worker Claude 3.5 Sonnet</span>
        </div>

        {/* Quota Progress Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-900">
              Limit Pemakaian AI Bulanan (Januari 2026)
            </span>
            <span className="font-bold text-[#1E40AF]">86%</span>
          </div>
          <div className="w-full bg-[#F1F5F9] rounded-full h-[7px] overflow-hidden">
            <div className="bg-[#1866EF] h-[7px] rounded-full" style={{ width: '86%' }} />
          </div>
          <div className="text-xs text-slate-500 text-left">
            14.250.000 /  20.000.000 Token
          </div>
        </div>

        {/* 2x2 Grid of Status Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Card 0: Antre */}
          <div className="rounded-lg overflow-hidden border border-[#FDE68A]">
            <div className="h-[34px] px-4 py-2 bg-[#FDE68A] flex items-center justify-between">
              <span className="text-xs font-bold text-[#B45309]">Antre</span>
              <span className="text-xs font-bold text-slate-900">24 Tugas</span>
            </div>
            <div className="bg-[#FEFCE8] p-3 space-y-2">
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#B45309]">Klasifikasi CSV</span>
                  <span className="text-slate-400">10:05 WIB</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Keyword_Kesehatan_Nov.csv
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#B45309]">Generate Draf</span>
                  <span className="text-slate-400">10:05 WIB</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Panduan Investasi Reksadana 2027
                </div>
              </div>
            </div>
          </div>

          {/* Card 1: Diproses */}
          <div className="rounded-lg overflow-hidden border border-[#BFDBFE]">
            <div className="h-[34px] px-4 py-2 bg-[#BFDBFE] flex items-center justify-between">
              <span className="text-xs font-bold text-[#1E40AF]">Diproses</span>
              <span className="text-xs font-bold text-slate-900">24 Tugas</span>
            </div>
            <div className="bg-[#EFF6FF] p-3 space-y-2">
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E40AF]">Generate Draf</span>
                  <span className="text-slate-400">Status: Memproses ...</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Update Harga Emas Antam Hari Ini
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E40AF]">Clustering AI</span>
                  <span className="text-slate-400">Status: Memproses ...</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Otomotif & Kendaraan Listrik
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Selesai */}
          <div className="rounded-lg overflow-hidden border border-[#BBF7D0]">
            <div className="h-[34px] px-4 py-2 bg-[#BBF7D0] flex items-center justify-between">
              <span className="text-xs font-bold text-[#15803D]">Selesai</span>
              <span className="text-xs font-bold text-slate-900">24 Tugas</span>
            </div>
            <div className="bg-[#F0FDF4] p-3 space-y-2">
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#15803D]">Draf Selesai</span>
                  <span className="text-slate-400">10:05 WIB / 200 Token</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Strategi Ketahanan Pangan Nasional 2027
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#15803D]">Cluster Selesai</span>
                  <span className="text-slate-400">10:05 WIB / 200 Token</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Topik: Wisata Liburan Akhir Tahun
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Gagal */}
          <div className="rounded-lg overflow-hidden border border-[#FECACA]">
            <div className="h-[34px] px-4 py-2 bg-[#FECACA] flex items-center justify-between">
              <span className="text-xs font-bold text-[#B91C1C]">Gagal</span>
              <span className="text-xs font-bold text-slate-900">24 Tugas</span>
            </div>
            <div className="bg-[#FEF2F2] p-3 space-y-2">
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#B91C1C]">Timeout</span>
                  <span className="text-slate-400">LLM terlalu lama merespons</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Panduan ESG di Indonesia
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded p-2.5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#B91C1C]">Limit Token</span>
                  <span className="text-slate-400">Kuota token harian tidak mencukupi</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate">
                  Politik_Pilkada_2026.csv
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
