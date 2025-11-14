"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export class ScrollAnimations {
  private static initialized = false

  /**
   * Initialize all scroll-based animations - OPTIMIZED
   */
  static initAll() {
    if (this.initialized) return
    this.initialized = true

    // Configure ScrollTrigger for smooth performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true
    })

    // Disable scrub for smoother scrolling
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
      markers: false
    })

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // Only initialize lightweight animations
      this.initFadeScale()
      this.initCardsStagger()
      this.initCounters()
    })
  }

  /**
   * Lightweight fade and scale animation for sections
   */
  private static initFadeScale() {
    const elements = document.querySelectorAll('[data-fade-scale]')
    
    elements.forEach((element) => {
      // Set initial state immediately to prevent blank content
      gsap.set(element, { opacity: 1, y: 0, scale: 1 })
      
      gsap.fromTo(element,
        {
          opacity: 0,
          y: 30,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
          }
        }
      )
    })
  }

  /**
   * Lightweight stagger animation for card grids
   */
  private static initCardsStagger() {
    const containers = document.querySelectorAll('[data-cards-stagger]')
    
    containers.forEach((container) => {
      const cards = container.querySelectorAll('[data-card]')
      
      // Set initial state immediately
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true
          }
        }
      )
    })
  }

  /**
   * Animated counters - OPTIMIZED
   */
  private static initCounters() {
    const counters = document.querySelectorAll('[data-counter]')
    
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-counter-target') || '0')
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        onEnter: () => {
          gsap.to(counter, {
            textContent: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              const value = Math.ceil(parseFloat(this.targets()[0].textContent))
              this.targets()[0].textContent = value.toLocaleString()
            }
          })
        },
        once: true
      })
    })
  }

  /**
   * Cleanup all ScrollTrigger instances
   */
  static cleanup() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    this.initialized = false
  }

  /**
   * Refresh ScrollTrigger calculations
   */
  static refresh() {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }
  }
}
