import React from 'react'
import type { PreviewItem, KeywordGapPreviewItem } from './types'

interface CsvPreviewTableProps {
  previewFileName: string
  selectedImportType: 'keyword' | 'keyword_gap'
  previewData: PreviewItem[]
  keywordGapPreviewData: KeywordGapPreviewItem[]
}

export const CsvPreviewTable: React.FC<CsvPreviewTableProps> = ({
  previewFileName,
  selectedImportType,
  previewData,
  keywordGapPreviewData,
}) => {
  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      {/* Table Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            Pratinjau file {previewFileName}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Format data:{' '}
            <strong className="text-slate-700">
              {selectedImportType === 'keyword'
                ? 'Riset Kata Kunci Standar (Volume, KD%, Intent)'
                : 'Perbandingan Kata Kunci (Keyword Gap - Domain Matriks)'}
            </strong>
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1866EF] flex items-center">
          {selectedImportType === 'keyword' ? 'Simulasi 3 Baris Teratas' : 'Simulasi 5 Baris Teratas'}
        </span>
      </div>

      {/* Clean Table 1 without extra filters */}
      <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {selectedImportType === 'keyword' ? (
            <table className="w-full text-left text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold w-[40%]">Kata Kunci</th>
                  <th className="py-3 px-4 font-semibold w-[20%]">Volume</th>
                  <th className="py-3 px-4 font-semibold w-[20%]">KD%</th>
                  <th className="py-3 px-4 font-semibold w-[20%]">Intensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {previewData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {item.keyword}
                    </td>
                    <td
                      className={`py-3.5 px-4 font-mono font-medium ${
                        item.isVolumeError ? 'text-[#EF4444]' : 'text-slate-900'
                      }`}
                    >
                      {item.volumeText}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-900">
                      {item.kd}%
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {item.intent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs min-w-[850px]">
              <thead>
                <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                  <th className="py-3 px-4 font-semibold min-w-[180px]">Keyword</th>
                  <th className="py-3 px-4 font-semibold min-w-[80px]">Intent</th>
                  <th className="py-3 px-4 font-semibold text-center min-w-[90px]">
                    <span className="inline-flex items-center gap-1.5 justify-center">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      detik.com
                    </span>
                  </th>
                  <th className="py-3 px-4 font-semibold text-center min-w-[95px]">
                    <span className="inline-flex items-center gap-1.5 justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      liputan6.com
                    </span>
                  </th>
                  <th className="py-3 px-4 font-semibold text-right min-w-[80px]">Volume</th>
                  <th className="py-3 px-4 font-semibold text-right min-w-[70px]">KD %</th>
                  <th className="py-3 px-4 font-semibold text-right min-w-[70px]">CPC</th>
                  <th className="py-3 px-4 font-semibold text-right min-w-[70px]">Com.</th>
                  <th className="py-3 px-4 font-semibold text-right min-w-[75px]">Results</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {keywordGapPreviewData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {row.keyword}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        {row.intent.map((it, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center justify-center font-bold rounded text-[10px] uppercase ${
                              it === 'n/a'
                                ? 'text-slate-400 font-normal lowercase'
                                : it === 'I'
                                ? 'w-4 h-4 bg-sky-100 text-sky-800 border border-sky-300'
                                : it === 'T'
                                ? 'w-4 h-4 bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : it === 'N'
                                ? 'w-4 h-4 bg-purple-100 text-purple-800 border border-purple-300'
                                : 'w-4 h-4 bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold font-mono text-slate-700 bg-blue-50/20">
                      {row.detikRank}
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold font-mono text-slate-700 bg-emerald-50/20">
                      {row.liputan6Rank}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                      {row.volume}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <span className="font-mono font-medium text-slate-800">{row.kd}</span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            row.kd >= 70
                              ? 'bg-rose-500'
                              : row.kd >= 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                      {row.cpc}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                      {row.com}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                      {row.results}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
