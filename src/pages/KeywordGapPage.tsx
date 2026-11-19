import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Search, ChevronDown, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { MilestoneStepper } from '../components/common/MilestoneStepper'
import { NextStepBanner } from '../components/common/NextStepBanner'
import { KeywordGapItem } from '../types'

export const KeywordGapPage: React.FC = () => {
  const { keywordGapList } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [activePage, setActivePage] = useState(1)
  const pageSize = 10

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
          50 Daftar Perbandingan Kata Kunci (Keyword Gap)
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

        {/* Keyword Gap Table (Matching Semrush Screenshot media_1795064167185_09d85644.jpg) */}
        <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[950px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold">Keyword</th>
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
                  <th className="py-3 px-4 font-semibold">Results</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedItems.length > 0 ? (
                  paginatedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Keyword */}
                      <td className="py-3 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span className="hover:text-blue-600 transition-colors cursor-pointer">
                            {item.keyword}
                          </span>
                          <span className="text-slate-300">
                            <ExternalLink className="w-3 h-3 inline-block" />
                          </span>
                        </div>
                      </td>

                      {/* Intent */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {renderIntentBadges(item.intent)}
                      </td>

                      {/* detik.com Rank */}
                      <td className="py-3 px-3 font-mono font-medium text-slate-800">
                        <span className="px-2 py-0.5 rounded bg-blue-50/70 text-blue-900 font-semibold inline-block">
                          {item.detikRank}
                        </span>
                      </td>

                      {/* liputan6.com Rank */}
                      <td className="py-3 px-3 font-mono font-medium text-slate-800">
                        <span className="px-2 py-0.5 rounded bg-teal-50/70 text-teal-900 font-semibold inline-block">
                          {item.liputan6Rank}
                        </span>
                      </td>

                      {/* Volume */}
                      <td className="py-3 px-3 font-mono font-semibold text-slate-900">
                        {item.volume}
                      </td>

                      {/* KD % */}
                      <td className="py-3 px-3 font-mono">
                        {renderKdDot(item.kd)}
                      </td>

                      {/* CPC */}
                      <td className="py-3 px-3 font-mono text-slate-700">
                        {item.cpc}
                      </td>

                      {/* Com. */}
                      <td className="py-3 px-3 font-mono text-slate-700">
                        {item.com}
                      </td>

                      {/* Results */}
                      <td className="py-3 px-4 font-mono text-slate-700">
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

        {/* Clean Pagination Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-semibold text-slate-800">{paginatedItems.length}</span> dari{' '}
            <span className="font-semibold text-slate-800">{filteredItems.length}</span> data perbandingan kata kunci
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setActivePage(num)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
                  activePage === num
                    ? 'bg-[#1866EF] text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
