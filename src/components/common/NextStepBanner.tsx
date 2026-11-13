import React from 'react'
import { ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export interface NextStepBannerProps {
  currentStep?: 1 | 2 | 3 | 4 | 5
  title?: string
  subtitle?: string
  buttonText?: string
  targetPage?: 'impor' | 'keyword' | 'cluster' | 'brief' | 'draft'
  onClick?: () => void
}

interface BannerStepInfo {
  title: string
  subtitle: string
  buttonText: string
  targetPage: 'impor' | 'keyword' | 'cluster' | 'brief' | 'draft'
}

const STEP_BANNERS: Record<number, BannerStepInfo> = {
  1: {
    title: 'Saring Kata Kunci',
    subtitle: 'Setelah file diproses, periksa kata kunci yang layak dijadikan bahan artikel.',
    buttonText: 'Lanjut ke Penyaringan Kata Kunci',
    targetPage: 'keyword',
  },
  2: {
    title: 'Kelompokkan topik',
    subtitle: 'Kata kunci yang lolos disatukan menurut topik dan intent agar tidak menjadi artikel yang tumpang tindih.',
    buttonText: 'Lanjut ke Pengelompokkan Topik',
    targetPage: 'cluster',
  },
  3: {
    title: 'Arahan Artikel',
    subtitle: 'Periksa ruang lingkup, kerangka, kebutuhan sumber, dan jadwal pembaruan sebelum artikel disusun.',
    buttonText: 'Lanjut ke Pengarahan Artikel',
    targetPage: 'brief',
  },
  4: {
    title: 'Draft Artikel',
    subtitle: 'Tinjau artikel yang dibuat oleh AI llau ekspor ke portal berita.',
    buttonText: 'Lanjut ke Draft Artikel',
    targetPage: 'draft',
  },
  5: {
    title: 'Mulai siklus artikel berikutnya',
    subtitle: 'Setelah draf diekspor, kembali impor data untuk mencari peluang artikel evergreen berikutnya.',
    buttonText: 'Impor Data Baru',
    targetPage: 'impor',
  },
}

export const NextStepBanner: React.FC<NextStepBannerProps> = ({
  currentStep = 1,
  title,
  subtitle,
  buttonText,
  targetPage,
  onClick,
}) => {
  const { setCurrentPage } = useApp()
  const stepInfo = STEP_BANNERS[currentStep] || STEP_BANNERS[1]

  const finalTitle = title || stepInfo.title
  const finalSubtitle = subtitle || stepInfo.subtitle
  const finalButtonText = buttonText || stepInfo.buttonText
  const finalTargetPage = targetPage || stepInfo.targetPage

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (finalTargetPage) {
      setCurrentPage(finalTargetPage)
    }
  }

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left side: descriptions */}
      <div className="space-y-0.5">
        <div className="text-slate-500 text-xs font-normal">Tahap berikutnya</div>
        <div className="text-slate-900 font-bold text-sm tracking-tight">{finalTitle}</div>
        <p className="text-slate-500 text-xs leading-relaxed max-w-2xl">{finalSubtitle}</p>
      </div>

      {/* Right side: button with border */}
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center justify-between sm:justify-center gap-2 px-4 py-2.5 bg-white border border-[#DBEAFE] hover:bg-slate-50 text-slate-900 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 shadow-2xs"
      >
        <span>{finalButtonText}</span>
        <ChevronRight className="w-4 h-4 text-slate-700 stroke-[2.5]" />
      </button>
    </div>
  )
}
