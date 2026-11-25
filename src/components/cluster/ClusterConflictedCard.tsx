import React from 'react'
import { GitMerge, XCircle, CheckCircle2 } from 'lucide-react'

interface ClusterConflictedCardProps {
  isMerged: boolean
  isCard2Ignored: boolean
  isRejected?: boolean
  rejectReason?: string
  abaikanReason?: string
  targetMergeTopic?: string
  mergeReason?: string
  card2Supporting: string[]
  isSplitActionOpen?: boolean
  onToggleSplitAction?: () => void
  onOpenConflictModal?: () => void
  onOpenAbaikanModal: () => void
  onOpenMergeModal: () => void
  onOpenSplitModal: () => void
  onRestoreMergedTopic: () => void
  onRestoreRejectedTopic?: () => void
  onRestoreIgnoredTopic?: () => void
  onReject: () => void
  onEdit: () => void
  onCreateBrief: () => void
}

export const ClusterConflictedCard: React.FC<ClusterConflictedCardProps> = ({
  isMerged,
  isCard2Ignored,
  isRejected = false,
  rejectReason = '',
  abaikanReason = '',
  targetMergeTopic = 'Cara Investasi Reksadana Pemula',
  mergeReason = 'Maksud pencarian (search intent) identik dengan artikel pilar, disatukan untuk menghindari kompetisi peringkat kata kunci internal pada domain RRI.',
  card2Supporting,
  isSplitActionOpen: _isSplitActionOpen,
  onToggleSplitAction: _onToggleSplitAction,
  onOpenConflictModal: _onOpenConflictModal,
  onOpenAbaikanModal,
  onOpenMergeModal,
  onOpenSplitModal,
  onRestoreMergedTopic,
  onRestoreRejectedTopic,
  onRestoreIgnoredTopic,
  onReject,
  onEdit,
  onCreateBrief,
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-xs space-y-4 transition-all ${
        isRejected
          ? 'border-2 border-rose-300 ring-4 ring-rose-500/10'
          : isCard2Ignored
          ? 'border border-emerald-200'
          : 'border border-[#DBEAFE]'
      }`}
    >
      {/* Header Row: Badges & Right Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {isRejected ? (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              Ditolak
            </span>
          ) : isMerged ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-semibold">
              Telah Digabung
            </span>
          ) : !isCard2Ignored ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-semibold">
              Butuh Resolusi
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#15803D] text-xs font-semibold">
              Aman (Override)
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] text-[#6D28D9] text-xs font-semibold">
            Informasional
          </span>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          <span className="font-bold text-slate-800">Total Vol: 45.000 / bln</span>
          <span className="mx-2 text-slate-300">|</span>
          <span>Rata-rata KD: 32% • ({card2Supporting.length + 1} Kata Kunci)</span>
        </div>
      </div>

      {/* Cluster Title */}
      <div>
        <h2
          className={`text-lg font-bold leading-snug ${
            isRejected || isMerged
              ? 'text-slate-400 line-through'
              : isCard2Ignored
              ? 'text-[#1866EF]'
              : 'text-[#92400E]'
          }`}
        >
          Panduan Reksadana 2026
        </h2>
      </div>

      {/* Callout Banner (Rejected, Merged, Warning, or Safe Ignored) */}
      {isRejected ? (
        <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-3.5 text-xs font-medium text-rose-800 flex items-start gap-2.5">
          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            Kelompok topik ini telah ditolak oleh redaksi.{' '}
            {rejectReason ? (
              <>
                Alasan: <strong>{rejectReason}</strong>
              </>
            ) : (
              'Tidak diproses ke tahap pembuatan arahan artikel.'
            )}
          </div>
        </div>
      ) : isMerged ? (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 text-xs text-[#15803D] space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-[#15803D]">
            <GitMerge className="w-4 h-4 text-[#15803D] shrink-0" />
            <span>Topik Telah Berhasil Digabungkan</span>
          </div>
          <div className="text-slate-800 leading-relaxed">
            Digabungkan ke topik target: <strong className="text-[#1866EF]">'{targetMergeTopic}'</strong>.
          </div>
          <div className="text-slate-600 leading-relaxed">
            Alasan Penggabungan: <strong>{mergeReason}</strong>
          </div>
        </div>
      ) : isCard2Ignored ? (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-3.5 text-xs font-medium text-[#15803D] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
          <span>
            Peringatan kanibalisasi telah diabaikan (Topik Aman).{' '}
            {abaikanReason ? (
              <>
                Pertimbangan: <strong>{abaikanReason}</strong>
              </>
            ) : null}
          </span>
        </div>
      ) : (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 text-xs font-medium text-[#B45309]">
          Kanibalisasi Terdeteksi: Cluster ini bersaing di maksud pencarian yang sama dengan cluster 'Cara Investasi Reksadana Pemula'.
        </div>
      )}

      {/* Content Box with Pilar & Supporting Keywords */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
        {/* Kata Kunci Pilar */}
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Pilar:
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
              isRejected || isMerged
                ? 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                : isCard2Ignored
                ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]'
                : 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
            }`}
          >
            panduan reksadana 2026 (Vol 22.000) (KD 28%)
          </span>
        </div>

        {/* Kata Kunci Pendukung */}
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Kata Kunci Pendukung:
          </div>
          <div className="flex flex-wrap gap-2">
            {card2Supporting.map((kw, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  isRejected || isMerged
                    ? 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                    : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
                }`}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-end gap-2.5 pt-1 flex-wrap">
        {isRejected ? (
          <button
            type="button"
            onClick={onRestoreRejectedTopic}
            className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            Kembalikan Topik
          </button>
        ) : isMerged ? (
          <button
            type="button"
            onClick={onRestoreMergedTopic}
            className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            Kembalikan Topik
          </button>
        ) : !isCard2Ignored ? (
          <>
            <button
              type="button"
              onClick={onOpenAbaikanModal}
              className="h-9 px-4 bg-[#FFFBEB] hover:bg-amber-100 text-[#B45309] border border-[#FDE68A] text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Abaikan
            </button>
            <button
              type="button"
              onClick={onOpenMergeModal}
              className="h-9 px-4 bg-white hover:bg-blue-50 text-[#1866EF] border border-[#BFDBFE] text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Gabungkan Topik
            </button>
            <button
              type="button"
              onClick={onOpenSplitModal}
              className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Pecahkan Topik
            </button>
            <button
              type="button"
              onClick={onReject}
              className="h-9 px-4 bg-[#FEF2F2] hover:bg-red-100 text-[#B91C1C] border border-[#FECACA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Tolak
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onRestoreIgnoredTopic}
              className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Kembalikan Topik
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="h-9 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              Perbarui Topik
            </button>
            <button
              type="button"
              onClick={onCreateBrief}
              className="h-9 px-5 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Buat Arahan
            </button>
          </>
        )}
      </div>
    </div>
  )
}
