"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Preloader } from "./preloader"
import { CustomCursor } from "./custom-cursor"
import { SmoothScroll } from "@/lib/smooth-scroll"
import { ScrollAnimations } from "@/lib/scroll-animations"
import { initializeAnimations, animatePageLoad, refreshAnimations } from "@/lib/init-animations"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Initialize animations immediately
    initializeAnimations()
    
    // Perfect timing: 4 seconds for preloader
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false)
      
      // Seamless transition delay
      setTimeout(() => {
        setShowContent(true)
        
        // Initialize smooth scroll and animations with perfect timing
        requestAnimationFrame(() => {
          SmoothScroll.initialize()
          
          // Small delay for smooth initialization
          setTimeout(() => {
            ScrollAnimations.initAll()
            animatePageLoad()
            
            // Final refresh for perfect alignment
            setTimeout(() => {
              refreshAnimations()
            }, 500)
          }, 100)
        })
      }, 800) // Longer delay for smoother transition
    }, 4000)

    return () => {
      clearTimeout(preloaderTimer)
      SmoothScroll.destroy()
      ScrollAnimations.cleanup()
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoothness
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
