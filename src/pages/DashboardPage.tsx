import React from 'react'
import { useApp } from '../context/AppContext'

export const DashboardPage: React.FC = () => {
  const { setCurrentPage } = useApp()

  const steps = [
    {
      step: 'Step 1: Impor CSV',
      count: '2 File Baru',
      sub: 'Unggahan terbaru 20 menit lalu',
      page: 'impor' as const,
    },
    {
      step: 'Step 2: Keyword',
      count: '1.250 Layak',
      sub: 'Dari 3.420 total keyword',
      page: 'keyword' as const,
    },
    {
      step: 'Step 3: Cluster Topik',
      count: '45 Terbentuk',
      sub: '3 potensi kanibalisasi',
      page: 'cluster' as const,
    },
    {
      step: 'Step 4: Brief Artikel',
      count: '12 Disetujui',
      sub: '4 menunggu tinjauan',
      page: 'brief' as const,
    },
    {
      step: 'Step 5: Draf Artikel',
      count: '8 Siap Salin',
      sub: '',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {steps.map((item, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(item.page)}
            className="bg-white border border-[#DBEAFE] rounded-md p-4 flex flex-col justify-between hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group h-[136px]"
          >
            <div className="text-xs font-medium text-slate-500">{item.step}</div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">{item.count}</div>
              {item.sub ? (
                <div className="text-xs text-slate-400 mt-1 truncate">{item.sub}</div>
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

        {/* Section 1: Brief Menunggu Persetujuan */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900">
                1. Brief Menunggu Persetujuan
              </span>
              <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded border border-blue-200">
                4 Menunggu
              </span>
            </div>
            <span className="text-sm text-slate-400">Target produksi artikel</span>
          </div>

          {/* Brief Items List */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
            {/* Brief Row 1 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Panduan Lengkap Mudik Lebaran 2027 Rute Tol Trans-Jawa
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded">
                    Informasional
                  </span>
                  <span className="text-xs text-slate-500">
                    Potensi volume: 32.000 / bln • Menyerap: 8 Keyword • Waktu antrean: 45 mnt lalu
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('brief')}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-start sm:self-center"
              >
                Tinjau Brief
              </button>
            </div>

            {/* Brief Row 2 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Kompilasi Bansos Cair November 2026: Syarat & Cara Cek NIK
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#FAF5FF] text-[#7E22CE] text-xs font-medium px-2 py-0.5 rounded">
                    Transaksional
                  </span>
                  <span className="text-xs text-slate-500">
                    Potensi volume: 28.100 / bln • Menyerap: 6 Keyword • Waktu antrean: 1 jam lalu
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('brief')}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-start sm:self-center"
              >
                Tinjau Brief
              </button>
            </div>

            {/* Brief Row 3 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Update Harga Emas Antam Hari Ini dan Tips Investasi Pemula
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded">
                    Komersial
                  </span>
                  <span className="text-xs text-slate-500">
                    Potensi volume: 18.500 / bln • Menyerap: 5 Keyword • Waktu antrean: 2 jam lalu
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('brief')}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-start sm:self-center"
              >
                Tinjau Brief
              </button>
            </div>
          </div>
        </div>

        {/* Section Divider in Figma */}
        <div className="border-t border-[#DBEAFE]" />

        {/* Section 2: Draf Siap Diperiksa */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-slate-900">
                2. Draf Siap Diperiksa
              </span>
              <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded border border-green-200">
                3 Siap Salin
              </span>
            </div>
            <span className="text-sm text-slate-400">Naskah AI siap verifikasi editor</span>
          </div>

          {/* Draf Items List */}
          <div className="divide-y divide-slate-100 border border-slate-100 rounded-md overflow-hidden">
            {/* Draf Row 1 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Tol Probowangi Seksi 1 Resmi Beroperasi Akhir Pekan Ini
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded">
                    Skor SEO: 96/100
                  </span>
                  <span className="text-xs text-slate-500">Estimasi jumlah kata: 920 Kata</span>
                  <span className="bg-[#FEF2F2] text-[#B91C1C] text-xs font-medium px-2 py-0.5 rounded">
                    2 Kutipan Perlu Cek
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('draft')}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-start sm:self-center"
              >
                Sunting Draf
              </button>
            </div>

            {/* Draf Row 2 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Strategi Ketahanan Pangan Nasional Hadapi Anomali Cuaca 2027
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded">
                    Skor SEO: 91/100
                  </span>
                  <span className="text-xs text-slate-500">Estimasi jumlah kata: 900 Kata</span>
                  <span className="bg-[#FEF2F2] text-[#B91C1C] text-xs font-medium px-2 py-0.5 rounded">
                    1 Fakta Perlu Cek
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('draft')}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-start sm:self-center"
              >
                Sunting Draf
              </button>
            </div>

            {/* Draf Row 3 */}
            <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  Katalog Wisata Hidden Gem Dieng Terbaru Pasca Revitalisasi
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#F0FDF4] text-[#15803D] text-xs font-medium px-2 py-0.5 rounded">
                    Skor SEO: 94/100
                  </span>
                  <span className="text-xs text-slate-500">Estimasi jumlah kata: 800 Kata</span>
                  <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-medium px-2 py-0.5 rounded">
                    Siap Ekspor CMS
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('draft')}
                className="px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-sm font-semibold rounded-md transition-colors shadow-xs shrink-0 self-start sm:self-center"
              >
                Sunting Draf
              </button>
            </div>
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
