"use client"

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if device has mouse (not touch-only)
    const hasMousePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasMousePointer) return

    setIsVisible(true)

    // Create cursor elements with enhanced structure
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor-container'
    cursor.innerHTML = `
      <div class="cursor-dot">
        <div class="cursor-dot-inner"></div>
      </div>
      <div class="cursor-ring">
        <div class="cursor-ring-glow"></div>
      </div>
      <div class="cursor-trail"></div>
    `
    document.body.appendChild(cursor)

    const cursorDot = cursor.querySelector('.cursor-dot') as HTMLElement
    const cursorDotInner = cursor.querySelector('.cursor-dot-inner') as HTMLElement
    const cursorRing = cursor.querySelector('.cursor-ring') as HTMLElement
    const cursorRingGlow = cursor.querySelector('.cursor-ring-glow') as HTMLElement
    const cursorTrail = cursor.querySelector('.cursor-trail') as HTMLElement

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0
    let trailX = 0
    let trailY = 0
    let isHovering = false

    // Mouse move handler with velocity tracking
    let lastX = 0
    let lastY = 0
    let velocityX = 0
    let velocityY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Calculate velocity for trail effect
      velocityX = mouseX - lastX
      velocityY = mouseY - lastY
      lastX = mouseX
      lastY = mouseY
    }

    // Ultra-smooth cursor follow with RAF
    const animateCursor = () => {
      // Dot follows very closely (instant feel)
      const dotSpeed = isHovering ? 0.25 : 0.35
      dotX += (mouseX - dotX) * dotSpeed
      dotY += (mouseY - dotY) * dotSpeed
      
      // Ring follows with smooth delay
      const ringSpeed = isHovering ? 0.15 : 0.2
      ringX += (mouseX - ringX) * ringSpeed
      ringY += (mouseY - ringY) * ringSpeed
      
      // Trail follows with more delay
      trailX += (mouseX - trailX) * 0.08
      trailY += (mouseY - trailY) * 0.08
      
      // Apply transforms with GPU acceleration
      gsap.set(cursorDot, {
        x: dotX,
        y: dotY,
        force3D: true
      })
      
      gsap.set(cursorRing, {
        x: ringX,
        y: ringY,
        force3D: true
      })
      
      gsap.set(cursorTrail, {
        x: trailX,
        y: trailY,
        force3D: true
      })
      
      // Add subtle rotation based on velocity
      const rotation = Math.atan2(velocityY, velocityX) * (180 / Math.PI)
      gsap.set(cursorRingGlow, {
        rotation: rotation,
        force3D: true
      })
      
      requestAnimationFrame(animateCursor)
    }
    
    animateCursor()

    // Enhanced interactive element handlers
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      isHovering = true
      
      // Determine interaction type
      const isButton = target.tagName === 'BUTTON' || target.getAttribute('role') === 'button'
      const isLink = target.tagName === 'A'
      const isMagnetic = target.hasAttribute('data-magnetic')
      
      // Ring animation
      gsap.to(cursorRing, {
        scale: isButton || isMagnetic ? 2.5 : 2,
        borderColor: isButton ? '#2563eb' : isLink ? '#7c3aed' : '#2563eb',
        borderWidth: '2px',
        duration: 0.4,
        ease: 'power3.out'
      })
      
      // Glow effect
      gsap.to(cursorRingGlow, {
        opacity: 0.6,
        scale: 1.2,
        duration: 0.4,
        ease: 'power3.out'
      })
      
      // Dot animation
      gsap.to(cursorDot, {
        scale: 0.3,
        duration: 0.4,
        ease: 'power3.out'
      })
      
      gsap.to(cursorDotInner, {
        scale: 1.5,
        backgroundColor: isButton ? '#2563eb' : '#7c3aed',
        duration: 0.4,
        ease: 'power3.out'
      })
      
      // Trail effect
      gsap.to(cursorTrail, {
        scale: 1.5,
        opacity: 0.3,
        duration: 0.4,
        ease: 'power3.out'
      })
      
      // Add pulse animation
      gsap.to(cursorRing, {
        scale: isButton || isMagnetic ? 2.7 : 2.2,
        duration: 0.6,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      })
    }

    const handleMouseLeave = () => {
      isHovering = false
      
      // Kill pulse animation
      gsap.killTweensOf(cursorRing)
      
      // Reset ring
      gsap.to(cursorRing, {
        scale: 1,
        borderColor: '#94a3b8',
        borderWidth: '2px',
        duration: 0.5,
        ease: 'power3.out'
      })
      
      // Reset glow
      gsap.to(cursorRingGlow, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      })
      
      // Reset dot
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      })
      
      gsap.to(cursorDotInner, {
        scale: 1,
        backgroundColor: '#2563eb',
        duration: 0.5,
        ease: 'power3.out'
      })
      
      // Reset trail
      gsap.to(cursorTrail, {
        scale: 1,
        opacity: 0.15,
        duration: 0.5,
        ease: 'power3.out'
      })
    }

    // Click effect
    const handleMouseDown = () => {
      gsap.to(cursorDot, {
        scale: 0.8,
        duration: 0.1,
        ease: 'power2.out'
      })
      
      gsap.to(cursorRing, {
        scale: isHovering ? 2.2 : 0.9,
        duration: 0.1,
        ease: 'power2.out'
      })
    }

    const handleMouseUp = () => {
      gsap.to(cursorDot, {
        scale: isHovering ? 0.3 : 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      })
      
      gsap.to(cursorRing, {
        scale: isHovering ? 2.5 : 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    
    // Observe DOM for new interactive elements
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-magnetic], [data-card], input, textarea, select, [role="button"]'
      )
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Initial setup for existing elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-magnetic], [data-card], input, textarea, select, [role="button"]'
    )
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    })
    
    document.addEventListener('mouseenter', () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    })

    // Cleanup
    return () => {
      observer.disconnect()
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
      
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor)
      }
    }
  }, [])

  if (!isVisible) return null

  return null // Cursor is created in useEffect
}
