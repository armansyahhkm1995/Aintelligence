import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ImportHistoryItem } from './types'

interface CsvHistoryTableProps {
  historyData: ImportHistoryItem[]
  onDownloadErrorLog: (fileName: string) => void
}

export const CsvHistoryTable: React.FC<CsvHistoryTableProps> = ({
  historyData,
  onDownloadErrorLog,
}) => {
  const [pageSize, setPageSize] = useState<number>(10)
  const [activePage, setActivePage] = useState<number>(1)

  return (
    <div className="bg-white border border-[#DBEAFE] rounded-xl p-5 shadow-xs space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900 leading-snug">
          Riwayat Impor Data
        </h2>
      </div>

      <div className="border border-[#DBEAFE] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-[#DBEAFE] text-slate-600 bg-[#F8FAFC]">
                <th className="py-3 px-4 font-semibold w-[28%]">Nama CSV</th>
                <th className="py-3 px-4 font-semibold w-[14%]">Status</th>
                <th className="py-3 px-4 font-semibold w-[12%]">Baris</th>
                <th className="py-3 px-4 font-semibold w-[14%]">Valid</th>
                <th className="py-3 px-4 font-semibold w-[14%]">Tidak Valid</th>
                <th className="py-3 px-4 font-semibold w-[18%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {historyData.map((hist) => (
                <tr key={hist.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{hist.fileName}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{hist.uploadDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold border ${
                        hist.status === 'Selesai'
                          ? 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                          : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                      }`}
                    >
                      {hist.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {hist.rowCount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        hist.isValidError
                          ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                          : 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                      }`}
                    >
                      {hist.validCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        hist.isInvalidError
                          ? 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]'
                          : 'bg-[#ECFDF5] text-[#15803D] border-[#A7F3D0]'
                      }`}
                    >
                      {hist.invalidCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {hist.hasErrorLog ? (
                      <button
                        type="button"
                        onClick={() => onDownloadErrorLog(hist.fileName)}
                        className="h-[34px] px-3.5 border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Unduh Log Galat
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs font-normal">
                        Tidak ada galat
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Menampilkan 1-5 dari 42 data</span>
          <div className="relative inline-block">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
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
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
          >
            Sebelumnya
          </button>
          <button
            type="button"
            onClick={() => setActivePage(1)}
            className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
              activePage === 1
                ? 'bg-[#1866EF] text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setActivePage(2)}
            className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
              activePage === 2
                ? 'bg-[#1866EF] text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setActivePage(3)}
            className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
              activePage === 3
                ? 'bg-[#1866EF] text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            onClick={() => setActivePage(10)}
            className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-colors cursor-pointer ${
              activePage === 10
                ? 'bg-[#1866EF] text-white shadow-2xs'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            10
          </button>
          <button
            type="button"
            onClick={() => setActivePage(Math.min(10, activePage + 1))}
            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors cursor-pointer"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  )
}
