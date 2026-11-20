import React, { useState } from 'react'
import { CheckCircle2, Edit3, XCircle, Trash2 } from 'lucide-react'
import { UserRole } from '../../types'

interface DashboardEditorCorrectionsSectionProps {
  userRole?: UserRole
}

export const DashboardEditorCorrectionsSection: React.FC<DashboardEditorCorrectionsSectionProps> = ({
  userRole = 'admin',
}) => {
  const [overrideFilter, setOverrideFilter] = useState<'keyword' | 'cluster' | 'brief' | 'draft'>(
    userRole === 'editor' ? 'brief' : 'keyword'
  )

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-md p-5 shadow-xs space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">Daftar Koreksi oleh Editor</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Riwayat intervensi, koreksi manual, penolakan, serta resolusi konflik oleh redaktur terhadap keputusan AI di seluruh modul.
        </p>
      </div>

      {/* Module Filter Tabs */}
      <div
        className={`border border-[#DBEAFE] rounded-[6px] p-1 flex sm:grid ${
          userRole === 'editor' ? 'sm:grid-cols-2' : 'sm:grid-cols-4'
        } gap-1 bg-white select-none overflow-x-auto w-full`}
      >
        {[
          ...(userRole === 'editor'
            ? []
            : [
                { id: 'keyword', label: 'Kata Kunci' },
                { id: 'cluster', label: 'Kelompok Topik' },
              ]),
          { id: 'brief', label: 'Arahan Artikel' },
          { id: 'draft', label: 'Draf Artikel' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setOverrideFilter(f.id as 'keyword' | 'cluster' | 'brief' | 'draft')}
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
                      Pisahkan Kata Kunci
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
  )
}
