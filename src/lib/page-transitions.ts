"use client"

import { gsap } from "gsap"

/**
 * Smooth page transition utilities
 */
export class PageTransitions {
  /**
   * Animate page entrance
   */
  static animatePageIn() {
    const main = document.querySelector('main')
    if (!main) return

    gsap.fromTo(main,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    )
  }

  /**
   * Animate page exit
   */
  static animatePageOut(callback?: () => void) {
    const main = document.querySelector('main')
    if (!main) {
      callback?.()
      return
    }

    gsap.to(main, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power3.in",
      onComplete: callback
    })
  }

  /**
   * Smooth scroll to element
   */
  static scrollToElement(selector: string, offset: number = 100) {
    const element = document.querySelector(selector)
    if (!element) return

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset

    gsap.to(window, {
      scrollTo: {
        y: targetPosition,
        autoKill: true
      },
      duration: 1.2,
      ease: "power3.inOut"
    })
  }

  /**
   * Smooth scroll to top
   */
  static scrollToTop() {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: 1,
      ease: "power3.inOut"
    })
  }
}
