// components/ui/Button.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95',
        {
          'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 focus:ring-primary-500 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30':
            variant === 'primary',
          'bg-gradient-to-r from-bark-800 to-bark-700 text-white hover:from-bark-900 hover:to-bark-800 focus:ring-bark-500 shadow-lg':
            variant === 'secondary',
          'border-2 border-primary-600 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 bg-white':
            variant === 'outline',
          'bg-white/20 backdrop-blur-md border border-white/30 text-bark-800 hover:bg-white/30 focus:ring-white/50':
            variant === 'glass',
          'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500':
            variant === 'danger',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'px-8 py-4 text-lg': size === 'xl',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}