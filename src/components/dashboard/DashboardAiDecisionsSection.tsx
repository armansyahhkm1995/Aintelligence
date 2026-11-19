import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { UserRole } from '../../types'

interface DashboardAiDecisionsSectionProps {
  userRole?: UserRole
}

export const DashboardAiDecisionsSection: React.FC<DashboardAiDecisionsSectionProps> = ({
  userRole = 'admin',
}) => {
  const [aiDecisionTab, setAiDecisionTab] = useState<'keyword' | 'cluster' | 'brief' | 'draft'>('brief')

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">Daftar Keputusan AI</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Alasan logis dan pertimbangan otomatis AI pada setiap tahap: dari kata kunci, kelompok topik, hingga rumusan arahan & draf artikel.
        </p>
      </div>

      {/* Tab Selector */}
      {userRole === 'editor' ? (
        <div className="border border-[#DBEAFE] rounded-[6px] p-1 flex sm:grid sm:grid-cols-2 gap-1 bg-white select-none overflow-x-auto w-full">
          <button
            type="button"
            onClick={() => setAiDecisionTab('brief')}
            className={`h-[36px] px-3 shrink-0 sm:shrink rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              aiDecisionTab === 'brief'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Arahan Artikel
          </button>
          <button
            type="button"
            onClick={() => setAiDecisionTab('draft')}
            className={`h-[36px] px-3 shrink-0 sm:shrink rounded-[4px] text-xs font-semibold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
              aiDecisionTab === 'draft'
                ? 'bg-[#1866EF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Draf Artikel
          </button>
        </div>
      ) : (
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
      )}

      {/* Tab Content 1: Saring Kata Kunci (Admin Only) */}
      {aiDecisionTab === 'keyword' && userRole === 'admin' && (
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

      {/* Tab Content 2: Kelompok Topik (Admin Only) */}
      {aiDecisionTab === 'cluster' && userRole === 'admin' && (
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

      {/* Tab Content 3: Arahan Artikel */}
      {aiDecisionTab === 'brief' && (
        <div className="space-y-4">
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

            {/* Kesimpulan Naratif Tunggal */}
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

      {/* Tab Content 4: Draf Artikel */}
      {aiDecisionTab === 'draft' && (
        <div className="space-y-4">
          <div className="p-4 border border-[#DBEAFE] rounded-xl bg-white space-y-3.5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Draf Naskah Terverifikasi AI
                </span>
                <h3 className="text-base font-bold text-[#1866EF] mt-0.5">
                  Panduan Aman Memulai Investasi Reksadana untuk Gen-Z
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-bold self-start sm:self-auto">
                Status: Siap Salin &amp; Review
              </span>
            </div>

            {/* Grid 4 Evaluasi Keputusan Redaksional AI pada Draf */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  1. Struktur Lead 5W+1H
                </span>
                <p className="text-xs text-slate-800 font-medium">
                  Paragraf pembuka memuat fokus edukasi, menjabarkan apa itu reksadana, modal minimal Rp10.000, serta legalitas perlindungan OJK.
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  2. Kepatuhan Buku Gaya
                </span>
                <p className="text-xs text-slate-800 font-medium">
                  Tata bahasa baku KBBI, netral, menguraikan akronim APERD dan RDN, serta menyertakan klausul disclaimer risiko investasi.
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  3. Keterbacaan &amp; SEO
                </span>
                <p className="text-xs text-slate-800 font-medium">
                  Skor Flesch 72 (mudah dipahami pembaca pemula), kepadatan kata kunci 1.8%, dan struktur subjudul ramah mesin telusur.
                </p>
              </div>
              <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  4. Orisinalitas &amp; Kemiripan
                </span>
                <p className="text-xs text-slate-800 font-medium">
                  Tingkat kemiripan naskah 18.4% (aman di bawah ambang 20%), sitasi langsung ke regulasi resmi OJK dan BI telah diproteksi.
                </p>
              </div>
            </div>

            {/* Kesimpulan Naratif AI untuk Draf */}
            <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl space-y-1.5 mt-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1866EF]">
                <Sparkles className="w-4 h-4" />
                <span>Kesimpulan Keputusan AI (Pertimbangan Produksi Draf):</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed text-justify">
                Draf artikel diproduksi secara komprehensif mengikuti arahan editorial sebelumnya. AI memastikan seluruh paragraf mengalir logis tanpa repetisi informasi, bebas dari kata kunci terlarang atau frasa spekulatif, dan siap disalin oleh editor ke CMS portal berita RRI.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
