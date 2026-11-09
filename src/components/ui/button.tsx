import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]'
    
    const variants = {
      default: 'bg-[#0066FF] text-white hover:bg-[#0052CC] shadow-sm',
      destructive: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
      outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200/80',
      ghost: 'hover:bg-slate-100 hover:text-slate-900',
      link: 'text-[#0066FF] underline-offset-4 hover:underline',
    }

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-lg px-6 text-base',
      icon: 'h-10 w-10 p-0',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
