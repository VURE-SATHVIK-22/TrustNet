"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Preloader } from "./preloader"
import { CustomCursor } from "./custom-cursor"
import { ScrollAnimations } from "@/lib/scroll-animations"
import { initLenisScroll, destroyLenisScroll } from "@/lib/lenis-scroll"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content immediately to prevent blank pages
    setShowContent(true)
    
    // Shorter preloader for better UX
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false)
      
      // Initialize smooth scrolling after preloader
      requestAnimationFrame(() => {
        // Enable native smooth scrolling (no custom engine to prevent issues)
        if (typeof window !== 'undefined') {
          document.documentElement.style.scrollBehavior = 'smooth'
        }
        
        // Initialize animations after content is visible
        setTimeout(() => {
          ScrollAnimations.initAll()
          ScrollAnimations.refresh()
        }, 200)
      })
    }, 1500) // Reduced to 1.5s

    return () => {
      clearTimeout(preloaderTimer)
      ScrollAnimations.cleanup()
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      <CustomCursor />
      
      {/* Show content immediately, no animation wrapper to prevent blank screens */}
      {showContent && children}
    </>
  )
}
