import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export class GSAPAnimations {
  static initializeGlobalAnimations() {
    if (typeof window === 'undefined') return

    // Configure GSAP for optimal performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    })

    // Configure ScrollTrigger for smooth scrolling
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
      limitCallbacks: true
    })

    // Smooth cursor follow effect (non-blocking)
    requestAnimationFrame(() => {
      this.initMagneticCursor()
    })
    
    // Global scroll animations (lightweight)
    setTimeout(() => {
      this.initScrollAnimations()
    }, 100)
    
    // Floating elements (low priority)
    setTimeout(() => {
      this.initFloatingAnimations()
    }, 200)
  }

  static initMagneticCursor() {
    // Disabled custom cursor to prevent stuck behavior
    // Native cursor is more reliable and doesn't cause issues
    return
  }

  static initScrollAnimations() {
    // Fade in elements on scroll (optimized)
    gsap.utils.toArray('[data-fade-in]').forEach((element: any) => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    })

    // Slide in from left (optimized)
    gsap.utils.toArray('[data-slide-left]').forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    })

    // Slide in from right (optimized)
    gsap.utils.toArray('[data-slide-right]').forEach((element: any) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      )
    })
  }

  static initFloatingAnimations() {
    // Floating icons
    gsap.utils.toArray('[data-float]').forEach((element: any) => {
      gsap.to(element, {
        y: -10,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      })
    })

    // Rotating elements
    gsap.utils.toArray('[data-rotate]').forEach((element: any) => {
      gsap.to(element, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      })
    })
  }

  static animateHeroText(element: HTMLElement) {
    const words = element.textContent?.split(' ') || []
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ')

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
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1
      }
    )
  }

  static animateCountUp(element: HTMLElement, endValue: number, duration = 2) {
    const obj = { value: 0 }
    
    gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString()
      }
    })
  }

  static animateProgressBar(element: HTMLElement, percentage: number) {
    const progressBar = element.querySelector('.progress-fill') as HTMLElement
    const percentageText = element.querySelector('.percentage-text') as HTMLElement
    
    gsap.fromTo(progressBar,
      { width: '0%' },
      {
        width: `${percentage}%`,
        duration: 2,
        ease: 'power2.out'
      }
    )

    if (percentageText) {
      this.animateCountUp(percentageText, percentage)
    }
  }

  static animateCardReveal(cards: NodeListOf<Element> | Element[]) {
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
      }
    )
  }

  static animateLoadingSpinner(element: HTMLElement) {
    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(element, {
      rotation: 360,
      duration: 1,
      ease: 'none'
    })

    return tl
  }

  static animateScanProcess(container: HTMLElement) {
    const tl = gsap.timeline()
    
    // Scanning animation
    tl.to(container.querySelector('.scan-line'), {
      x: '100%',
      duration: 2,
      ease: 'power2.inOut',
      repeat: 2
    })
    
    // Pulse effect
    tl.to(container, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    }, '-=1')

    return tl
  }

  static animateResultReveal(element: HTMLElement, trustScore: number) {
    const tl = gsap.timeline()
    
    // Initial reveal
    tl.fromTo(element,
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }
    )

    // Animate trust score
    const scoreElement = element.querySelector('.trust-score')
    if (scoreElement) {
      tl.add(() => {
        this.animateCountUp(scoreElement as HTMLElement, trustScore)
      }, '-=0.5')
    }

    // Animate progress bars
    const progressBars = element.querySelectorAll('.progress-bar')
    progressBars.forEach((bar, index) => {
      tl.add(() => {
        this.animateProgressBar(bar as HTMLElement, trustScore)
      }, `-=${0.3 - index * 0.1}`)
    })

    return tl
  }

  static animatePageTransition(fromElement: HTMLElement, toElement: HTMLElement) {
    const tl = gsap.timeline()
    
    // Fade out current page
    tl.to(fromElement, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in'
    })
    
    // Fade in new page
    tl.fromTo(toElement,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.2'
    )

    return tl
  }

  static animateHighlights(elements: NodeListOf<Element>) {
    elements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          backgroundColor: 'transparent',
          scale: 1
        },
        {
          backgroundColor: '#fef3c7', // Yellow highlight
          scale: 1.02,
          duration: 0.5,
          ease: 'power2.out',
          delay: index * 0.1,
          yoyo: true,
          repeat: 1
        }
      )
    })
  }

  static createParallaxEffect(element: HTMLElement, speed = 0.5) {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  static animateTypewriter(element: HTMLElement, text: string, speed = 0.05) {
    element.textContent = ''
    
    gsap.to(element, {
      text: text,
      duration: text.length * speed,
      ease: 'none'
    })
  }

  static cleanup() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.killTweensOf('*')
  }
}

// CSS for magnetic cursor (to be added to global styles)
export const cursorStyles = `
.magnetic-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

.cursor-dot {
  width: 20px;
  height: 20px;
  background: #007AFF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.word {
  display: inline-block;
  margin-right: 0.25em;
}

@media (max-width: 768px) {
  .magnetic-cursor {
    display: none;
  }
}

  static initMagneticElements() {
    // Add magnetic hover effects to navbar items
    const magneticElements = document.querySelectorAll('[data-magnetic]')
    
    magneticElements.forEach(element => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = element.getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2
        
        gsap.to(element, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        })
      }
      
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
    })
  }

  static initElegantHoverEffects() {
    // Add elegant hover effects to buttons and links
    const elegantElements = document.querySelectorAll('.elegant-hover')
    
    elegantElements.forEach(element => {
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })
  }
}`