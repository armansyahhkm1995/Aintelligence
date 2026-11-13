import React from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export interface MilestoneStepperProps {
  currentStep: 1 | 2 | 3 | 4 | 5
  onNavigate?: (page: 'impor' | 'keyword' | 'cluster' | 'brief' | 'draft') => void
}

interface StepConfig {
  num: 1 | 2 | 3 | 4 | 5
  page: 'impor' | 'keyword' | 'cluster' | 'brief' | 'draft'
  title: string
  subtitle: string
}

const STEPS: StepConfig[] = [
  {
    num: 1,
    page: 'impor',
    title: 'Impor CSV',
    subtitle: 'Unggah CSV Semrush',
  },
  {
    num: 2,
    page: 'keyword',
    title: 'Saring Kata Kunci',
    subtitle: 'Tentukan kelayakan',
  },
  {
    num: 3,
    page: 'cluster',
    title: 'Kelompokkan Topik',
    subtitle: 'Bentuk calon artikel',
  },
  {
    num: 4,
    page: 'brief',
    title: 'Arahan Artikel',
    subtitle: 'Tetapkan ruang lingkup',
  },
  {
    num: 5,
    page: 'draft',
    title: 'Sunting Artikel',
    subtitle: 'Tinjau dan ekspor',
  },
]

export const MilestoneStepper: React.FC<MilestoneStepperProps> = ({
  currentStep,
  onNavigate,
}) => {
  const { setCurrentPage } = useApp()

  const handleStepClick = (page: 'impor' | 'keyword' | 'cluster' | 'brief' | 'draft') => {
    if (onNavigate) {
      onNavigate(page)
    } else {
      setCurrentPage(page)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-2 sm:p-2.5 shadow-xs w-full overflow-x-auto">
      <div className="flex items-center justify-between min-w-[780px] gap-1 sm:gap-2">
        {STEPS.map((step, idx) => {
          const isCompleted = step.num < currentStep
          const isActive = step.num === currentStep
          const isUpcoming = step.num > currentStep
          const stepNumberStr = `0${step.num}`

          return (
            <React.Fragment key={step.num}>
              {/* Step Item */}
              <button
                type="button"
                onClick={() => handleStepClick(step.page)}
                className={`flex-1 text-left rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-2.5 transition-all cursor-pointer select-none ${
                  isCompleted
                    ? 'bg-[#ECFDF5] border border-[#A7F3D0] hover:bg-emerald-100/70'
                    : isActive
                    ? 'bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-blue-100/70'
                    : 'bg-transparent border border-transparent hover:bg-slate-50'
                }`}
              >
                {/* Left Circle Icon */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isCompleted
                      ? 'bg-[#10B981] text-white shadow-2xs'
                      : isActive
                      ? 'bg-[#1866EF] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{stepNumberStr}</span>
                  )}
                </div>

                {/* Texts */}
                <div className="min-w-0">
                  <div
                    className={`font-bold text-xs sm:text-[13px] leading-tight truncate ${
                      isCompleted
                        ? 'text-[#15803D]'
                        : isActive
                        ? 'text-[#1866EF]'
                        : 'text-slate-900'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-[10px] sm:text-[11px] leading-tight truncate mt-0.5 ${
                      isCompleted
                        ? 'text-slate-600'
                        : isActive
                        ? 'text-slate-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.subtitle}
                  </div>
                </div>
              </button>

              {/* Separator Chevron */}
              {idx < STEPS.length - 1 && (
                <div className="shrink-0 px-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
