import * as React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'purple' | 'info'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-[#0066FF] text-white',
    secondary: 'border-transparent bg-slate-100 text-slate-800',
    destructive: 'border-rose-200 bg-rose-50 text-rose-700 font-semibold',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold',
    warning: 'border-amber-200 bg-amber-50 text-amber-700 font-semibold',
    purple: 'border-purple-200 bg-purple-50 text-purple-700 font-semibold',
    info: 'border-blue-200 bg-blue-50 text-blue-700 font-semibold',
    outline: 'border-slate-200 text-slate-700',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
