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

    // Create cursor elements
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>'
    document.body.appendChild(cursor)

    const cursorDot = cursor.querySelector('.cursor-dot') as HTMLElement
    const cursorRing = cursor.querySelector('.cursor-ring') as HTMLElement

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let ringX = 0
    let ringY = 0

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Smooth cursor follow
    gsap.ticker.add(() => {
      // Dot follows closely
      cursorX += (mouseX - cursorX) * 0.3
      cursorY += (mouseY - cursorY) * 0.3
      
      // Ring follows with delay
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      
      gsap.set(cursorDot, {
        x: cursorX,
        y: cursorY
      })
      
      gsap.set(cursorRing, {
        x: ringX,
        y: ringY
      })
    })

    // Interactive element handlers
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      
      gsap.to(cursorRing, {
        scale: 2,
        borderColor: '#2563eb',
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(cursorDot, {
        scale: 0.5,
        backgroundColor: '#2563eb',
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursorRing, {
        scale: 1,
        borderColor: '#94a3b8',
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: '#2563eb',
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-magnetic], [data-card], input, textarea, select, [role="button"]'
    )
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 })
    })
    
    document.addEventListener('mouseenter', () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 })
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseEnter)
      document.removeEventListener('mouseenter', handleMouseLeave)
      
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
