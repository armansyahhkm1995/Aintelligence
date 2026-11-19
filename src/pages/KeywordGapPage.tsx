import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Search, ChevronDown } from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'

export const KeywordGapPage: React.FC = () => {
  const { keywordGapList } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredItems = keywordGapList.filter((item) =>
    item.keyword.toLowerCase().includes(searchQuery.toLowerCase().trim())
  )

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1
  const paginatedItems = filteredItems.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  )

  const renderIntentBadges = (intents: string[]) => {
    return (
      <div className="flex items-center gap-1">
        {intents.map((intent, idx) => {
          if (intent === 'n/a') {
            return (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500"
              >
                n/a
              </span>
            )
          }
          if (intent === 'I') {
            return (
              <span
                key={idx}
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1]"
                title="Informational"
              >
                I
              </span>
            )
          }
          if (intent === 'T') {
            return (
              <span
                key={idx}
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-[#CCFBF1] text-[#0F766E]"
                title="Transactional"
              >
                T
              </span>
            )
          }
          if (intent === 'N') {
            return (
              <span
                key={idx}
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-[#F3E8FF] text-[#7E22CE]"
                title="Navigational"
              >
                N
              </span>
            )
          }
          if (intent === 'C') {
            return (
              <span
                key={idx}
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-[#FEF3C7] text-[#B45309]"
                title="Commercial"
              >
                C
              </span>
            )
          }
          return (
            <span
              key={idx}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
            >
              {intent}
            </span>
          )
        })}
      </div>
    )
  }

  const renderKdDot = (kd: number) => {
    let colorClass = 'bg-emerald-500'
    if (kd >= 70) {
      colorClass = 'bg-rose-500'
    } else if (kd >= 50) {
      colorClass = 'bg-amber-500'
    } else if (kd >= 40) {
      colorClass = 'bg-yellow-500'
    }
    return (
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-slate-900">{kd}</span>
        <span className={`w-2 h-2 rounded-full ${colorClass} inline-block shrink-0`} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 1. Milestone Stepper: Step 2 Active (Sesuai dengan Menu Kata Kunci) */}
      <MilestoneStepper currentStep={2} />

      {/* 2. Page Title and Description */}
      <div>
        <h1 className="text-2xl font-bold text-[#1866EF] tracking-tight">
          50 Daftar Perbandingan Kata Kunci
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Analisis komparasi kata kunci kompetitor (detik.com vs liputan6.com) dari Semrush untuk mengidentifikasi celah peluang trafik organik redaksi portal RRI.
        </p>
      </div>

      {/* 3. Next Step Banner */}
      <NextStepBanner currentStep={2} />

      {/* 4. Main Table Container */}
      <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
        {/* Full width Search Box */}
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setActivePage(1)
            }}
            placeholder="Filter kata kunci gap ..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#1866EF] text-slate-800"
          />
        </div>

        {/* Table matching KeywordPage column and border styling */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[950px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold">Kata Kunci</th>
                  <th className="py-3 px-3 font-semibold">Intent</th>
                  <th className="py-3 px-3 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      <span>detik.com</span>
                    </span>
                  </th>
                  <th className="py-3 px-3 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                      <span>liputan6.com</span>
                    </span>
                  </th>
                  <th className="py-3 px-3 font-semibold">Volume</th>
                  <th className="py-3 px-3 font-semibold">KD %</th>
                  <th className="py-3 px-3 font-semibold">CPC</th>
                  <th className="py-3 px-3 font-semibold">Com.</th>
                  <th className="py-3 px-4 font-semibold">Hasil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Kata Kunci (Redirect icon removed) */}
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <span className="font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {item.keyword}
                        </span>
                      </td>

                      {/* Intent */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {renderIntentBadges(item.intent)}
                      </td>

                      {/* detik.com Rank */}
                      <td className="py-3.5 px-3 font-mono font-medium text-slate-800">
                        <span className="px-2 py-0.5 rounded bg-blue-50/70 text-blue-900 font-semibold inline-block">
                          {item.detikRank}
                        </span>
                      </td>

                      {/* liputan6.com Rank */}
                      <td className="py-3.5 px-3 font-mono font-medium text-slate-800">
                        <span className="px-2 py-0.5 rounded bg-teal-50/70 text-teal-900 font-semibold inline-block">
                          {item.liputan6Rank}
                        </span>
                      </td>

                      {/* Volume */}
                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-900">
                        {item.volume}
                      </td>

                      {/* KD % */}
                      <td className="py-3.5 px-3 font-mono">
                        {renderKdDot(item.kd)}
                      </td>

                      {/* CPC */}
                      <td className="py-3.5 px-3 font-mono text-slate-700">
                        {item.cpc}
                      </td>

                      {/* Com. */}
                      <td className="py-3.5 px-3 font-mono text-slate-700">
                        {item.com}
                      </td>

                      {/* Hasil */}
                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        {item.results}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400 text-xs">
                      Tidak ada kata kunci perbandingan yang cocok dengan pencarian "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer matching KeywordPage styling */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>
              Menampilkan {filteredItems.length > 0 ? (activePage - 1) * pageSize + 1 : 0}-
              {Math.min(activePage * pageSize, filteredItems.length)} dari {filteredItems.length} data
            </span>
            <div className="relative inline-block">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setActivePage(1)
                }}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-2.5 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
              if (totalPages > 6) {
                if (num === 1 || num === totalPages || (num >= activePage - 1 && num <= activePage + 1)) {
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setActivePage(num)}
                      className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                        activePage === num
                          ? 'bg-[#1866EF] text-white shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {num}
                    </button>
                  )
                }
                if (num === 2 && activePage > 3) {
                  return (
                    <span key="dots-start" className="px-1 text-slate-400 font-bold">
                      ...
                    </span>
                  )
                }
                if (num === totalPages - 1 && activePage < totalPages - 2) {
                  return (
                    <span key="dots-end" className="px-1 text-slate-400 font-bold">
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActivePage(num)}
                  className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
                    activePage === num
                      ? 'bg-[#1866EF] text-white shadow-2xs'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {num}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
