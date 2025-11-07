"use client"

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export class SmoothScroll {
  private static lenis: Lenis | null = null
  private static rafId: number | null = null

  static initialize() {
    if (typeof window === 'undefined' || this.lenis) return

    // Initialize Lenis smooth scroll
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Connect Lenis with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Start animation loop
    this.raf()

    console.log('✨ Smooth scroll initialized')
  }

  private static raf() {
    if (!this.lenis) return
    
    this.rafId = requestAnimationFrame(() => this.raf())
  }

  static scrollTo(target: string | number, options?: any) {
    if (!this.lenis) return
    this.lenis.scrollTo(target, options)
  }

  static destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    
    if (this.lenis) {
      this.lenis.destroy()
      this.lenis = null
    }

    gsap.ticker.remove((time) => {
      this.lenis?.raf(time * 1000)
    })

    console.log('🧹 Smooth scroll destroyed')
  }

  static getInstance() {
    return this.lenis
  }
}
