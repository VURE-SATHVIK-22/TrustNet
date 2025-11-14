"use client"

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Initialize all animations with proper timing
 */
export function initializeAnimations() {
  if (typeof window === 'undefined') return

  // Set up GSAP defaults for smooth animations
  gsap.defaults({
    ease: 'power3.out',
    duration: 1
  })

  // Configure ScrollTrigger for better performance
  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 150
  })

  // Add smooth scroll class to html
  document.documentElement.classList.add('lenis')

  console.log('✨ Animations initialized')
}

/**
 * Animate elements on page load (before scroll) - PERFECT VERSION
 */
export function animatePageLoad() {
  if (typeof window === 'undefined') return

  // Create master timeline for perfect sequencing
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out'
    }
  })

  // 1. Animate navbar with slide down
  tl.from('nav', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, 0.2)

  // 2. Animate hero badge
  const badge = document.querySelector('[data-hero-badge]')
  if (badge) {
    tl.fromTo(badge, 
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: () => {
          badge.classList.add('animated')
          badge.classList.remove('opacity-0')
        }
      }, 0.4)
  }

  // 3. Animate hero title - word by word
  const heroTitle = document.querySelector('[data-hero-title]')
  if (heroTitle) {
    // Remove opacity-0 class first
    heroTitle.classList.remove('opacity-0')
    
    const words = heroTitle.textContent?.split(' ') || []
    heroTitle.innerHTML = words.map(word => 
      `<span class="inline-block" style="opacity: 0; transform: translateY(20px);">${word}</span>`
    ).join(' ')
    
    const wordElements = heroTitle.querySelectorAll('span')
    tl.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      onComplete: () => heroTitle.classList.add('animated')
    }, 0.6)
  }

  // 4. Animate hero subtitle
  const subtitle = document.querySelector('[data-hero-subtitle]')
  if (subtitle) {
    tl.fromTo(subtitle,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: () => {
          subtitle.classList.add('animated')
          subtitle.classList.remove('opacity-0')
        }
      }, 1.2)
  }

  // 5. Animate hero card with bounce
  const card = document.querySelector('[data-hero-card]')
  if (card) {
    tl.fromTo(card,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.4)',
        onComplete: () => {
          card.classList.add('animated')
          card.classList.remove('opacity-0')
        }
      }, 1.6)
  }

  // 6. Animate feature cards with stagger
  const features = document.querySelectorAll('[data-hero-feature]')
  if (features.length > 0) {
    tl.from(features, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        features.forEach(f => f.classList.add('animated'))
      }
    }, 2)
  }

  // 7. Animate floating elements
  const floatingElements = document.querySelectorAll('.floating-element')
  floatingElements.forEach((element, index) => {
    gsap.to(element, {
      y: -20,
      duration: 3 + index * 0.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.5 + index * 0.2
    })
  })

  console.log('🎬 Perfect page load animations complete')
}

/**
 * Force refresh all ScrollTrigger instances
 */
export function refreshAnimations() {
  if (typeof window === 'undefined') return
  
  ScrollTrigger.refresh()
  console.log('🔄 Animations refreshed')
}
