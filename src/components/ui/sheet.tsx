import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer Sliding from Right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-slate-200 transform transition-transform ease-out duration-300 flex flex-col h-full animate-in slide-in-from-right">
          {children}
        </div>
      </div>
    </div>
  )
}

export function SheetHeader({
  className,
  children,
  onClose,
}: {
  className?: string
  children: React.ReactNode
  onClose?: () => void
}) {
  return (
    <div className={cn('p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/50', className)}>
      <div className="flex-1 pr-4">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Tutup panel"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export function SheetTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn('text-lg font-bold text-slate-900', className)}>{children}</h2>
}

export function SheetDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('text-xs text-slate-500 mt-1', className)}>{children}</p>
}

export function SheetContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex-1 overflow-y-auto p-6 space-y-6', className)}>{children}</div>
}

export function SheetFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('p-6 border-t border-slate-200 bg-slate-50/50 flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  )
}
