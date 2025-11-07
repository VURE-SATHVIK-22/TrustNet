"use client"

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

export class ScrollAnimations {
  
  /**
   * Parallax effect - elements move at different speeds
   */
  static initParallax() {
    const parallaxElements = gsap.utils.toArray('[data-parallax]')
    
    parallaxElements.forEach((element: any) => {
      const speed = element.dataset.parallaxSpeed || 0.5
      const direction = element.dataset.parallaxDirection || 'up'
      
      const yMovement = direction === 'up' ? -100 : 100
      
      gsap.to(element, {
        y: yMovement * parseFloat(speed),
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })
  }

  /**
   * Fade in with scale - smooth entrance animations
   */
  static initFadeInScale() {
    const elements = gsap.utils.toArray('[data-fade-scale]')
    
    elements.forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          scale: 0.8,
          y: 60
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }

  /**
   * Text reveal with stagger - cinematic text animations
   */
  static initTextReveal() {
    const textElements = gsap.utils.toArray('[data-text-reveal]')
    
    textElements.forEach((element: any) => {
      const lines = element.querySelectorAll('.line, p, h1, h2, h3, h4, h5, h6')
      
      if (lines.length > 0) {
        gsap.fromTo(lines,
          {
            opacity: 0,
            y: 50,
            rotationX: -45
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    })
  }

  /**
   * Word-by-word reveal - premium text animation
   */
  static initWordReveal() {
    const elements = gsap.utils.toArray('[data-word-reveal]')
    
    elements.forEach((element: any) => {
      const text = element.textContent
      const words = text.split(' ')
      
      element.innerHTML = words.map((word: string) => 
        `<span class="word-wrapper"><span class="word">${word}</span></span>`
      ).join(' ')
      
      const wordElements = element.querySelectorAll('.word')
      
      gsap.fromTo(wordElements,
        {
          opacity: 0,
          y: 100,
          rotationX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: element,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }

  /**
   * Horizontal scroll sections
   */
  static initHorizontalScroll() {
    const sections = gsap.utils.toArray('[data-horizontal-scroll]')
    
    sections.forEach((section: any) => {
      const items = section.querySelectorAll('[data-horizontal-item]')
      
      if (items.length === 0) return
      
      const totalWidth = items.length * 100
      
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          end: () => `+=${section.offsetWidth * items.length}`
        }
      })
    })
  }

  /**
   * Image reveal with clip-path
   */
  static initImageReveal() {
    const images = gsap.utils.toArray('[data-image-reveal]')
    
    images.forEach((image: any) => {
      gsap.fromTo(image,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.3
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }

  /**
   * Cards stagger animation
   */
  static initCardsStagger() {
    const cardGroups = gsap.utils.toArray('[data-cards-stagger]')
    
    cardGroups.forEach((group: any) => {
      const cards = group.querySelectorAll('[data-card]')
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationY: -15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }

  /**
   * Pin section with progress
   */
  static initPinSection() {
    const sections = gsap.utils.toArray('[data-pin-section]')
    
    sections.forEach((section: any) => {
      const content = section.querySelector('[data-pin-content]')
      
      if (!content) return
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: content,
        pinSpacing: false,
      })
    })
  }

  /**
   * Counter animation on scroll
   */
  static initCounters() {
    const counters = gsap.utils.toArray('[data-counter]')
    
    counters.forEach((counter: any) => {
      const target = parseInt(counter.dataset.counterTarget || counter.textContent)
      const duration = parseFloat(counter.dataset.counterDuration || '2')
      
      const obj = { value: 0 }
      
      gsap.to(obj, {
        value: target,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          counter.textContent = Math.round(obj.value).toLocaleString()
        },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
    })
  }

  /**
   * Rotate on scroll
   */
  static initRotateOnScroll() {
    const elements = gsap.utils.toArray('[data-rotate-scroll]')
    
    elements.forEach((element: any) => {
      const rotation = element.dataset.rotateAmount || 360
      
      gsap.to(element, {
        rotation: rotation,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })
  }

  /**
   * Slide in from sides
   */
  static initSlideIn() {
    // Slide from left
    const leftElements = gsap.utils.toArray('[data-slide-left]')
    leftElements.forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: -150,
          rotationY: -25
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })

    // Slide from right
    const rightElements = gsap.utils.toArray('[data-slide-right]')
    rightElements.forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: 150,
          rotationY: 25
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }

  /**
   * Blur fade in
   */
  static initBlurFade() {
    const elements = gsap.utils.toArray('[data-blur-fade]')
    
    elements.forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          filter: 'blur(20px)',
          scale: 1.1
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    })
  }

  /**
   * Magnetic hover effect
   */
  static initMagneticElements() {
    const elements = gsap.utils.toArray('[data-magnetic]')
    
    elements.forEach((element: any) => {
      const strength = parseFloat(element.dataset.magneticStrength || '0.3')
      
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    })
  }

  /**
   * Initialize all scroll animations
   */
  static initAll() {
    if (typeof window === 'undefined') return

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupAnimations()
      })
    } else {
      this.setupAnimations()
    }
  }

  private static setupAnimations() {
    // Initialize all animation types
    this.initParallax()
    this.initFadeInScale()
    this.initTextReveal()
    this.initWordReveal()
    this.initImageReveal()
    this.initCardsStagger()
    this.initPinSection()
    this.initCounters()
    this.initRotateOnScroll()
    this.initSlideIn()
    this.initBlurFade()
    this.initMagneticElements()
    this.initHorizontalScroll()

    console.log('🎬 Scroll animations initialized')
  }

  /**
   * Refresh ScrollTrigger instances
   */
  static refresh() {
    ScrollTrigger.refresh()
  }

  /**
   * Cleanup all animations
   */
  static cleanup() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.killTweensOf('*')
    console.log('🧹 Scroll animations cleaned up')
  }
}

// Add required CSS for word reveal
export const scrollAnimationStyles = `
.word-wrapper {
  display: inline-block;
  overflow: hidden;
  margin-right: 0.25em;
  perspective: 1000px;
}

.word {
  display: inline-block;
  transform-origin: bottom center;
}

[data-parallax],
[data-fade-scale],
[data-text-reveal],
[data-word-reveal],
[data-image-reveal],
[data-card],
[data-counter],
[data-rotate-scroll],
[data-slide-left],
[data-slide-right],
[data-blur-fade] {
  will-change: transform, opacity;
}

/* GPU acceleration */
[data-parallax],
[data-fade-scale],
[data-card] {
  transform: translateZ(0);
  backface-visibility: hidden;
}
`
