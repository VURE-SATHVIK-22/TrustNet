"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Eye, Sparkles, Lock, Brain } from "lucide-react"
import { GSAPAnimations } from "@/lib/gsap-animations"

interface HeroSectionProps {
  onScan: (input: string) => Promise<void>
}

export function HeroSection({ onScan }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      GSAPAnimations.animateHeroText(titleRef.current)
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
      )
    }

    // Animate card
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 1.2, ease: "back.out(1.7)" }
      )
    }

    // Floating background elements
    const floatingElements = document.querySelectorAll('.floating-element')
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        duration: 3 + index * 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3
      })
    })
  }, [])

  const handleScan = async () => {
    if (!inputValue.trim()) return
    
    setIsScanning(true)
    
    // Animate scanning process
    if (cardRef.current) {
      GSAPAnimations.animateScanProcess(cardRef.current)
    }
    
    try {
      await onScan(inputValue)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 min-h-screen flex items-center z-0">
      {/* Floating Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-100/50 rounded-full blur-xl" data-parallax data-parallax-speed="0.2"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-indigo-100/50 rounded-full blur-xl" data-parallax data-parallax-speed="0.4"></div>
        <div className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-purple-100/50 rounded-full blur-xl" data-parallax data-parallax-speed="0.3"></div>
        <div className="floating-element absolute bottom-20 right-10 w-28 h-28 bg-blue-100/50 rounded-full blur-xl" data-parallax data-parallax-speed="0.5"></div>
      </div>

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-8">
            <div 
              data-hero-badge
              className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Advanced AI-Powered Detection</span>
            </div>
          </div>

          <h1 
            data-hero-title
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-tight opacity-0"
          >
            TrustNet — Know Before You Click
          </h1>
          
          <p
            data-hero-subtitle
            className="mx-auto max-w-3xl text-xl md:text-2xl leading-relaxed text-gray-800 mb-12 font-medium opacity-0"
          >
            Advanced phishing detection powered by machine learning. 
            <br />
            <span className="text-blue-700 font-semibold">Privacy-first. Real-time. Explainable.</span>
          </p>

          <div data-hero-card className="mx-auto max-w-4xl mb-16 opacity-0">
            <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-lg relative overflow-hidden">
              <div className="scan-line absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0"></div>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Paste suspicious URL or email content to analyze..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <Button
                    onClick={handleScan}
                    disabled={!inputValue.trim() || isScanning}
                    size="lg"
                    className="h-14 px-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    data-magnetic
                  >
                    {isScanning ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>Analyze Now</span>
                      </div>
                    )}
                  </Button>
                </div>
                
                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>100% Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Instant Results</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Explainable AI</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div 
              data-hero-feature
              className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-all duration-300" 
              data-magnetic 
              data-magnetic-strength="0.15"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy-First Architecture</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                All analysis happens locally in your browser using TensorFlow.js. 
                Your data never leaves your device.
              </p>
            </div>
            
            <div 
              data-hero-feature
              className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-all duration-300" 
              data-magnetic 
              data-magnetic-strength="0.15"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced ML Models</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                Hybrid approach combining NLP for email analysis and feature-based URL detection 
                with ensemble scoring.
              </p>
            </div>
            
            <div 
              data-hero-feature
              className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-all duration-300" 
              data-magnetic 
              data-magnetic-strength="0.15"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Explainable Results</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                Detailed explanations with highlighted risk factors, emotional manipulation 
                detection, and confidence scoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}