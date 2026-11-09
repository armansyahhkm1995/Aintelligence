import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react'

export const DraftPage: React.FC = () => {
  const {
    draft,
    updateDraft,
    publishDraftToEditools,
    setIsHapusDraftOpen,
  } = useApp()
  const { showSuccess } = useToast()

  const [aiRewritePrompt, setAiRewritePrompt] = useState(
    'Ubah gaya bahasa agar lebih santai dan tambahkan H2 tentang risiko psikologis FOMO...'
  )

  const handleCopyDraft = () => {
    const textToCopy = `${draft?.title || ''}\n\n${draft?.content || ''}`
    navigator.clipboard.writeText(textToCopy)
    showSuccess('Penyuntingan Draf', 'Naskah draf berhasil disalin ke clipboard.')
  }

  const handleExportMd = () => {
    const md = `# ${draft?.title || 'Draf Artikel'}\n\n${draft?.content || ''}`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `draft-${draft?.id || 'rri'}.md`
    a.click()
    showSuccess('Penyuntingan Draf', 'Draf berhasil diekspor ke file Markdown (.md)')
  }

  return (
    <div className="space-y-6">
      {/* Title and description */}
      <div className="max-w-[500px]">
        <h1 className="text-xl font-bold text-[#1866EF] tracking-tight">
          Penyuntingan Draf Artikel
        </h1>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          Verifikasi data faktual, sunting naskah AI, tinjau paket metadata SEO, dan teruskan ke Editools atau CMS RRI.
        </p>
      </div>

      {/* 2-Column Split matching user screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Rich Text Toolbar */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-2 flex flex-wrap items-center gap-1.5 shadow-xs">
            {/* Heading Selector */}
            <div className="relative">
              <button
                type="button"
                className="h-[32px] px-3 bg-white border border-[#DBEAFE] rounded text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50"
              >
                <span>Heading 1</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Active B button (Solid blue) */}
            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-[#1866EF] text-white font-bold text-xs flex items-center justify-center shadow-xs"
            >
              B
            </button>

            {/* I button */}
            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-white hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-700 italic font-serif font-bold text-xs flex items-center justify-center"
            >
              I
            </button>

            {/* U button */}
            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-white hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-700 underline font-bold text-xs flex items-center justify-center"
            >
              U
            </button>

            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="h-[32px] w-[32px] rounded bg-white hover:bg-slate-50 text-slate-500 flex items-center justify-center"
            >
              <AlignJustify className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="h-[32px] px-2 rounded bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600"
            >
              H1
            </button>
            <button
              type="button"
              className="h-[32px] px-2 rounded bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600"
            >
              H2
            </button>
            <button
              type="button"
              className="h-[32px] px-2 rounded bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600"
            >
              H3
            </button>
          </div>

          {/* Article Document Box */}
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-6 shadow-xs space-y-4">
            {/* Title */}
            <h1 className="text-xl font-bold text-slate-900 leading-snug">
              Panduan Aman Memulai Investasi Reksadana untuk Gen-Z
            </h1>

            {/* Lead */}
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              JAKARTA — Menghadapi dinamika ekonomi digital dan tekanan inflasi, minat generasi muda terhadap instrumen investasi legal kian meningkat. Reksadana kini menjadi salah satu pintu masuk paling diminati bagi kalangan pemula karena modal awal yang sangat terjangkau serta dikelola langsung oleh manajer investasi berizin resmi.
            </p>

            {/* H2 */}
            <h2 className="text-sm font-bold text-slate-900 pt-1">
              Apa Itu Reksadana dan Mengapa Ramah Pemula?
            </h2>

            {/* Fact Check Warning Pill */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                Butuh Verifikasi Fakta: Konfirmasi rilis statistik resmi OJK terbaru
              </span>
            </div>

            {/* Paragraph */}
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              Berdasarkan rilis statistik Otoritas Jasa Keuangan (OJK), akumulasi dana kelolaan reksadana nasional tercatat menembus
            </p>

            {/* Annotation */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                Kutipan Narasumber Dibutuhkan
              </span>
            </div>

            {/* H2 */}
            <h2 className="text-sm font-bold text-slate-900 pt-1">
              Langkah Praktis Memilih Agen Penjual (APERD) Resmi
            </h2>

            {/* AI Selection Box (Light blue with Blue Border) */}
            <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[6px] space-y-3">
              <p className="text-xs text-[#1D4ED8] font-medium leading-relaxed">
                Calon investor wajib memastikan platform Agen Penjual Efek Reksa Dana (APERD) telah terdaftar di OJK. Jangan tergiur promosi return tidak wajar yang menjanjikan keuntungan pasti di media sosial tanpa memahami profil risiko.
              </p>
              <textarea
                value={aiRewritePrompt}
                onChange={(e) => setAiRewritePrompt(e.target.value)}
                rows={2}
                placeholder="Ubah gaya bahasa agar lebih santai dan tambahkan H2 tentang risiko psikologis FOMO..."
                className="w-full p-3 text-xs bg-white border border-[#DBEAFE] rounded-[6px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => showSuccess('Penyuntingan Draf', 'Permintaan tulis ulang bagian dikirim ke AI.')}
                  className="h-[36px] px-4 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
                >
                  Tulis Ulang Bagian Ini
                </button>
              </div>
            </div>

            {/* Ending Paragraph */}
            <p className="text-xs text-slate-700 leading-relaxed font-sans pt-1">
              Dengan pemahaman risiko yang baik dan kedisiplinan alokasi dana darurat, generasi muda dapat mengoptimalkan reksadana sebagai benteng ketahanan finansial masa depan tanpa terjebak investasi bodong.
            </p>
          </div>
        </div>

        {/* Right Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#DBEAFE] rounded-[6px] p-5 shadow-xs space-y-4">
            {/* Status Draf */}
            <div>
              <h3 className="text-sm font-bold text-slate-900">Status Draf</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Draf AI dibuat 10:00 WIB · Tersimpan otomatis 10:15 WIB
              </p>
            </div>

            <div className="w-full h-[1px] bg-slate-100" />

            {/* Paket Metadata SEO */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Paket Metadata SEO
                </h4>
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                  Skor SEO: 94/100
                </span>
              </div>

              {/* Meta Title */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-900 block">
                  Meta Title (Judul Search Engine)
                </label>
                <div className="p-3 rounded-[6px] bg-white border border-[#DBEAFE] text-xs text-slate-800">
                  Panduan Aman Investasi Reksadana Gen-Z: Tips OJK
                </div>
              </div>

              {/* Meta Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-900 block">
                  Meta Description
                </label>
                <div className="p-3 rounded-[6px] bg-white border border-[#DBEAFE] text-xs text-slate-800 leading-relaxed">
                  Pelajari cara memulai investasi reksadana aman untuk pemula dan Gen-Z. Panduan legalitas OJK, modal Rp10.000, serta tips pencairan.
                </div>
              </div>

              {/* Slug URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-900 block">
                  Slug URL Portal RRI
                </label>
                <div className="p-3 rounded-[6px] bg-white border border-[#DBEAFE] text-xs text-slate-500 font-mono">
                  rri.co.id/bisnis/<span className="font-bold text-[#1866EF]">cara-investasi-reksadana-pemula</span>
                </div>
              </div>

              {/* Alternatif Judul AI */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-900 block">
                  Alternatif Judul AI (Klik untuk Ganti H1):
                </label>
                <div className="space-y-1.5">
                  <div
                    onClick={() => showSuccess('Penyuntingan Draf', 'Judul berhasil diganti.')}
                    className="p-3 rounded-[6px] bg-white hover:bg-blue-50/50 border border-[#DBEAFE] text-xs text-slate-800 cursor-pointer transition-colors"
                  >
                    5 Langkah Memulai Reksadana Legal Tanpa Takut Rugi
                  </div>
                  <div
                    onClick={() => showSuccess('Penyuntingan Draf', 'Judul berhasil diganti.')}
                    className="p-3 rounded-[6px] bg-white hover:bg-blue-50/50 border border-[#DBEAFE] text-xs text-slate-800 cursor-pointer transition-colors"
                  >
                    Reksadana vs Deposito: Mana Lebih Aman untuk Tabungan Awal?
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-slate-100" />

            {/* Riwayat Versi Draft */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Riwayat Versi Draft</h4>
                <button
                  type="button"
                  className="text-xs text-[#1866EF] hover:underline font-semibold"
                >
                  Tambah Versi
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {/* Versi 2 */}
                <div className="p-3 rounded-[6px] bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                      <span className="font-bold text-[#15803D]">Versi 2 (Saat Ini)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                      Aktif
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Disunting oleh Editor Cameron • Hari ini, 14:15 WIB
                  </div>
                </div>

                {/* Versi 1 */}
                <div className="p-3 rounded-[6px] bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                    <span className="font-bold text-slate-700">Versi 1</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Dihasilkan Claude 3.5 Sonnet • Hari ini, 14:10 WIB
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-slate-100" />

            {/* Finalisasi & Penerbitan */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900">Finalisasi & Penerbitan</h4>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExportMd}
                  className="h-[36px] border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
                >
                  Ekspor Draft ke MD
                </button>
                <button
                  onClick={handleCopyDraft}
                  className="h-[36px] border border-[#DBEAFE] hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-[6px] transition-colors"
                >
                  Salin Draft
                </button>
              </div>

              <button
                onClick={publishDraftToEditools}
                className="w-full h-[40px] bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-[6px] transition-colors shadow-xs"
              >
                Kirim ke Editools
              </button>

              <button
                onClick={() => setIsHapusDraftOpen(true)}
                className="w-full h-[36px] bg-[#FEF2F2] border border-[#FECACA] hover:bg-rose-100 text-[#B91C1C] text-xs font-semibold rounded-[6px] transition-colors"
              >
                Hapus
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed pt-1">
                Draf akan otomatis masuk ke antrean uji plagiarisme & buku gaya Editools
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
