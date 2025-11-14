"use client"

/**
 * Advanced Smooth Scrolling Utility
 * Provides buttery smooth scrolling without janky behavior
 */

export class SmoothScroll {
  private static instance: SmoothScroll | null = null
  private rafId: number | null = null
  private scrollTarget: number = 0
  private currentScroll: number = 0
  private ease: number = 0.1

  private constructor() {
    this.init()
  }

  static getInstance(): SmoothScroll {
    if (!this.instance) {
      this.instance = new SmoothScroll()
    }
    return this.instance
  }

  private init() {
    if (typeof window === 'undefined') return

    // Set initial scroll position
    this.currentScroll = window.scrollY
    this.scrollTarget = window.scrollY

    // Listen to scroll events
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true })

    // Start animation loop
    this.animate()
  }

  private onScroll() {
    this.scrollTarget = window.scrollY
  }

  private animate() {
    // Smooth interpolation
    this.currentScroll += (this.scrollTarget - this.currentScroll) * this.ease

    // Apply transform for smooth effect
    if (Math.abs(this.scrollTarget - this.currentScroll) > 0.5) {
      document.body.style.transform = `translateY(${-this.currentScroll}px)`
    }

    // Continue animation
    this.rafId = requestAnimationFrame(this.animate.bind(this))
  }

  public destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }
    window.removeEventListener('scroll', this.onScroll.bind(this))
    document.body.style.transform = ''
    SmoothScroll.instance = null
  }

  public setEase(ease: number) {
    this.ease = Math.max(0.01, Math.min(1, ease))
  }
}

/**
 * Simple smooth scroll to element
 */
export function smoothScrollTo(target: string | HTMLElement, offset: number = 80) {
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target

  if (!element) return

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}

/**
 * Initialize native smooth scrolling
 */
export function initNativeSmoothScroll() {
  if (typeof window === 'undefined') return

  // Add smooth scroll behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const href = anchor.getAttribute('href')
      if (href && href !== '#') {
        smoothScrollTo(href)
      }
    })
  })

  // Enable CSS smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth'
}

/**
 * Optimize scroll performance
 */
export function optimizeScrollPerformance() {
  if (typeof window === 'undefined') return

  // Disable smooth scroll during rapid scrolling
  let scrollTimeout: NodeJS.Timeout
  let isScrolling = false

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true
      document.documentElement.style.scrollBehavior = 'auto'
    }

    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling = false
      document.documentElement.style.scrollBehavior = 'smooth'
    }, 150)
  }, { passive: true })
}
