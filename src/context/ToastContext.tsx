import React, { createContext, useContext, useState, useCallback } from 'react'
import { ToastMessage, ToastType } from '../types'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

interface ToastContextType {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => string
  removeToast: (id: string) => void
  showSuccess: (title: string, message: string, actionLabel?: string, onAction?: () => void) => void
  showWarning: (title: string, message: string, actionLabel?: string, onAction?: () => void) => void
  showError: (title: string, message: string, actionLabel?: string, onAction?: () => void) => void
  showInfo: (title: string, message: string, actionLabel?: string, onAction?: () => void) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    ({ type, title, message, duration = 4500, actionLabel, onAction }: Omit<ToastMessage, 'id'>) => {
      const id = 'toast_' + Math.random().toString(36).substring(2, 9)
      const newToast: ToastMessage = { id, type, title, message, duration, actionLabel, onAction }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }

      return id
    },
    [removeToast]
  )

  const showSuccess = useCallback(
    (title: string, message: string, actionLabel?: string, onAction?: () => void) => {
      addToast({ type: 'success', title, message, actionLabel: actionLabel || 'Tutup', onAction })
    },
    [addToast]
  )

  const showWarning = useCallback(
    (title: string, message: string, actionLabel?: string, onAction?: () => void) => {
      addToast({ type: 'warning', title, message, actionLabel: actionLabel || 'Dismiss', onAction })
    },
    [addToast]
  )

  const showError = useCallback(
    (title: string, message: string, actionLabel?: string, onAction?: () => void) => {
      addToast({ type: 'error', title, message, actionLabel: actionLabel || 'Tutup', onAction })
    },
    [addToast]
  )

  const showInfo = useCallback(
    (title: string, message: string, actionLabel?: string, onAction?: () => void) => {
      addToast({ type: 'info', title, message, actionLabel: actionLabel || 'Tutup', onAction })
    },
    [addToast]
  )

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showWarning,
        showError,
        showInfo,
      }}
    >
      {children}
      {/* Toast Floating Container (Bottom Right) matching Figma node 1015:24010 */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success'
          const isWarning = toast.type === 'warning'
          const isError = toast.type === 'error'

          return (
            <div
              key={toast.id}
              role="alert"
              aria-live="polite"
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl border shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 ${
                isSuccess
                  ? 'bg-emerald-50/95 border-emerald-200 text-emerald-950 backdrop-blur-md'
                  : isWarning
                  ? 'bg-amber-50/95 border-amber-200 text-amber-950 backdrop-blur-md'
                  : isError
                  ? 'bg-rose-50/95 border-rose-200 text-rose-950 backdrop-blur-md'
                  : 'bg-blue-50/95 border-blue-200 text-blue-950 backdrop-blur-md'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                {isError && <XCircle className="w-5 h-5 text-rose-600" />}
                {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-blue-600" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold tracking-wider uppercase mb-0.5 opacity-75">
                  {toast.title}
                </div>
                <div className="text-sm font-medium leading-relaxed break-words">
                  {toast.message}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {toast.actionLabel && (
                  <button
                    onClick={() => {
                      if (toast.onAction) toast.onAction()
                      removeToast(toast.id)
                    }}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                      isSuccess
                        ? 'text-emerald-800 hover:bg-emerald-200/60'
                        : isWarning
                        ? 'text-amber-800 hover:bg-amber-200/60'
                        : isError
                        ? 'text-rose-800 hover:bg-rose-200/60'
                        : 'text-blue-800 hover:bg-blue-200/60'
                    }`}
                  >
                    {toast.actionLabel}
                  </button>
                )}
                <button
                  onClick={() => removeToast(toast.id)}
                  aria-label="Tutup notifikasi"
                  className="p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
