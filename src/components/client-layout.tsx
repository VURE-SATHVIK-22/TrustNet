"use client"

import { useState, useEffect } from "react"
import { Preloader } from "./preloader"
import { CustomCursor } from "./custom-cursor"
import { SmoothScroll } from "@/lib/smooth-scroll"
import { ScrollAnimations } from "@/lib/scroll-animations"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Wait for preloader animation to complete
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false)
      // Small delay before showing content to ensure smooth transition
      setTimeout(() => {
        setShowContent(true)
        
        // Initialize smooth scroll and animations after content is visible
        setTimeout(() => {
          SmoothScroll.initialize()
          ScrollAnimations.initAll()
        }, 100)
      }, 500)
    }, 4500)

    return () => {
      clearTimeout(preloaderTimer)
      SmoothScroll.destroy()
      ScrollAnimations.cleanup()
    }
  }, [])

  return (
    <>
      <Preloader />
      <CustomCursor />
      {showContent && (
        <div className="animate-fadeIn">
          {children}
        </div>
      )}
    </>
  )
}
