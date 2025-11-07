"use client"

import { ReactNode } from 'react'

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  variant?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur' | 'parallax'
  delay?: number
}

export function SectionTransition({ 
  children, 
  className = '', 
  variant = 'fade',
  delay = 0 
}: SectionTransitionProps) {
  
  const getAnimationAttributes = () => {
    switch (variant) {
      case 'fade':
        return { 'data-fade-scale': true }
      case 'slide-up':
        return { 'data-fade-scale': true }
      case 'slide-left':
        return { 'data-slide-left': true }
      case 'slide-right':
        return { 'data-slide-right': true }
      case 'scale':
        return { 'data-fade-scale': true }
      case 'blur':
        return { 'data-blur-fade': true }
      case 'parallax':
        return { 'data-parallax': true, 'data-parallax-speed': '0.5' }
      default:
        return { 'data-fade-scale': true }
    }
  }

  const animationProps = getAnimationAttributes()
  const style = delay > 0 ? { animationDelay: `${delay}s` } : {}

  return (
    <div 
      className={className} 
      style={style}
      {...animationProps}
    >
      {children}
    </div>
  )
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  background?: 'light' | 'dark' | 'gradient' | 'transparent'
  withParallax?: boolean
}

export function AnimatedSection({ 
  children, 
  className = '',
  background = 'transparent',
  withParallax = false
}: AnimatedSectionProps) {
  
  const bgClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    transparent: 'bg-transparent'
  }

  return (
    <section 
      className={`relative overflow-hidden ${bgClasses[background]} ${className}`}
      {...(withParallax ? { 'data-parallax': true, 'data-parallax-speed': '0.3' } : {})}
    >
      {children}
    </section>
  )
}
