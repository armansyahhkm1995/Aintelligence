import React from 'react'
import { ArrowRight } from 'lucide-react'

interface AdminPipelineStepperProps {
  onNavigate: (page: string) => void
}

export const AdminPipelineStepper: React.FC<AdminPipelineStepperProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: 'Step 1: Impor CSV',
      count: '2 File Baru',
      sub: 'Unggahan terbaru 20 menit lalu',
      page: 'impor',
    },
    {
      step: 'Step 2: Kata Kunci',
      count: '1.250 Layak',
      sub: 'Dari 3.420 total keyword',
      page: 'keyword',
    },
    {
      step: 'Step 3: Kelompok Topik',
      count: '45 Terbentuk',
      sub: '3 potensi kanibalisasi',
      page: 'cluster',
    },
    {
      step: 'Step 4: Arahan Artikel',
      count: '12 Disetujui',
      sub: '4 menunggu tinjauan',
      page: 'brief',
    },
    {
      step: 'Step 5: Draf Artikel',
      count: '8 Siap Salin',
      sub: 'Siap verifikasi editor',
      page: 'draft',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {steps.map((st, i) => (
        <div
          key={i}
          onClick={() => onNavigate(st.page)}
          className="bg-white border border-[#DBEAFE] rounded-xl p-4 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              {st.step}
            </span>
            <div className="text-lg font-bold text-slate-900 mt-1 group-hover:text-[#1866EF] transition-colors">
              {st.count}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{st.sub}</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1866EF] mt-3 group-hover:underline">
            <span>Buka Modul</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      ))}
    </div>
  )
}
