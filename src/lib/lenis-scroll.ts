"use client"

/**
 * Lenis-style Smooth Scrolling
 * Mimics Wix's smooth scroll effect with momentum and easing
 */

class LenisScroll {
  private targetScroll: number = 0
  private currentScroll: number = 0
  private ease: number = 0.075
  private rafId: number | null = null
  private isRunning: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    // Set initial values
    this.currentScroll = window.scrollY
    this.targetScroll = window.scrollY

    // Create smooth scroll container
    this.setupSmoothContainer()

    // Listen to scroll events
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true })
    window.addEventListener('resize', this.onResize.bind(this), { passive: true })

    // Start animation loop
    this.start()
  }

  private setupSmoothContainer() {
    // Simplified setup - no fixed positioning to prevent blank pages
    const body = document.body
    const html = document.documentElement

    // Just ensure smooth scrolling without breaking layout
    html.style.scrollBehavior = 'smooth'
    body.style.willChange = 'transform'
  }

  private onScroll() {
    this.targetScroll = window.scrollY
  }

  private onResize() {
    this.setupSmoothContainer()
  }

  private lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor
  }

  private animate() {
    if (!this.isRunning) return

    // Smooth interpolation
    const diff = Math.abs(this.targetScroll - this.currentScroll)
    
    // Only animate if difference is significant
    if (diff > 0.5) {
      this.currentScroll = this.lerp(this.currentScroll, this.targetScroll, this.ease)
    } else {
      this.currentScroll = this.targetScroll
    }

    // Continue animation
    this.rafId = requestAnimationFrame(this.animate.bind(this))
  }

  public start() {
    if (this.isRunning) return
    this.isRunning = true
    this.animate()
  }

  public stop() {
    this.isRunning = false
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  public destroy() {
    this.stop()
    window.removeEventListener('scroll', this.onScroll.bind(this))
    window.removeEventListener('resize', this.onResize.bind(this))
    
    // Reset styles
    document.body.style.willChange = ''
    document.documentElement.style.scrollBehavior = ''
  }

  public scrollTo(target: number, immediate: boolean = false) {
    if (immediate) {
      this.currentScroll = target
      this.targetScroll = target
      window.scrollTo(0, target)
    } else {
      this.targetScroll = target
      window.scrollTo(0, target)
    }
  }
}

// Singleton instance
let lenisInstance: LenisScroll | null = null

export function initLenisScroll() {
  if (typeof window === 'undefined') return null
  
  if (!lenisInstance) {
    lenisInstance = new LenisScroll()
  }
  
  return lenisInstance
}

export function destroyLenisScroll() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export function getLenisInstance() {
  return lenisInstance
}
