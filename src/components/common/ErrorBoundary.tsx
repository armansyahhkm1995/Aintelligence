import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo)
  }

  private handleReset = () => {
    try {
      // Clear localStorage cache for rri app
      const keys = Object.keys(localStorage)
      for (const k of keys) {
        if (k.startsWith('rri_')) {
          localStorage.removeItem(k)
        }
      }
    } catch (e) {
      console.error('Error clearing localStorage:', e)
    }
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="bg-white border border-[#FECACA] rounded-xl p-6 max-w-lg w-full shadow-xs text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Terjadi Kendala Memuat Halaman
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Data yang tersimpan sebelumnya mungkin tidak sesuai dengan format terbaru.
                Klik tombol di bawah untuk menyetel ulang data ke kondisi bawaan.
              </p>
            </div>
            {this.state.error && (
              <pre className="text-[10px] text-left p-3 bg-slate-50 border border-slate-200 rounded text-rose-700 overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1866EF] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data & Muat Ulang</span>
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
