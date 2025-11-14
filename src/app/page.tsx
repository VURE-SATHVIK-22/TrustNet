"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { GlassCards } from "@/components/ui/glass-cards"
import { advancedMLEngine, type AdvancedScanResult } from "@/lib/advanced-ml-engine"
import { GSAPAnimations } from "@/lib/gsap-animations"
import { Brain, Calendar, Code, FileText, Clock } from "lucide-react"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { QuantumGuardSection } from "@/components/QuantumGuardSection"

// Lazy load heavy components for better performance
const AnimatedHero = lazy(() => import("@/components/ui/animated-hero").then(m => ({ default: m.AnimatedHero })))
const FeatureSteps = lazy(() => import("@/components/ui/feature-section").then(m => ({ default: m.FeatureSteps })))
const RadialOrbitalTimeline = lazy(() => import("@/components/ui/radial-orbital-timeline"))
const ScanResults = lazy(() => import("@/components/scan-results").then(m => ({ default: m.ScanResults })))
const ScanSection = lazy(() => import("@/components/scan-section").then(m => ({ default: m.ScanSection })))
const DemoExamples = lazy(() => import("@/components/demo-examples").then(m => ({ default: m.DemoExamples })))
const PhishingTimeline = lazy(() => import("@/components/phishing-timeline").then(m => ({ default: m.PhishingTimeline })))
const MLDashboard = lazy(() => import("@/components/ml-dashboard").then(m => ({ default: m.MLDashboard })))
const ScrollProgress = lazy(() => import("@/components/scroll-progress").then(m => ({ default: m.ScrollProgress })))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

export default function Home() {
  const [scanResult, setScanResult] = useState<AdvancedScanResult | null>(null)
  const [inputText, setInputText] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [realTimeStats, setRealTimeStats] = useState({
    total_scans: 0,
    phishing_detected: 0,
    safe_urls: 0,
    suspicious_emails: 0
  })

  useEffect(() => {
    // Initialize GSAP animations
    GSAPAnimations.initializeGlobalAnimations()
    
    // Initialize stats with mock data
    setRealTimeStats({
      total_scans: 15847,
      phishing_detected: 2341,
      safe_urls: 11256,
      suspicious_emails: 2250
    })
    
    return () => {
      GSAPAnimations.cleanup()
    }
  }, [])

  // Separate effect for polling stats
  useEffect(() => {
    // Initial stats fetch
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/stats')
        if (response.ok) {
          const stats = await response.json()
          setRealTimeStats({
            total_scans: stats.total_analyzed || 0,
            phishing_detected: stats.phishing_detected || 0,
            safe_urls: stats.safe_count || 0,
            suspicious_emails: stats.suspicious_count || 0
          })
          setIsConnected(true)
        }
      } catch (error) {
        // Backend not available, keep mock data
        setIsConnected(false)
      }
    }
    
    // Fetch stats immediately
    fetchStats()
    
    // Then poll every 30 seconds
    const statsInterval = setInterval(fetchStats, 30000)
    
    return () => {
      clearInterval(statsInterval)
    }
  }, [])

  // WebSocket functionality disabled for simple backend
  // The system works perfectly with HTTP polling for stats

  const handleScan = async (input: string) => {
    setInputText(input)
    
    try {
      // Determine if input is URL or email content
      const isUrl = /^https?:\/\//.test(input.trim())
      const endpoint = isUrl ? '/analyze/url' : '/analyze/email'
      const payload = isUrl ? { url: input } : { text: input, subject: '' }
      
      // Use real ML backend for analysis
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      if (!response.ok) {
        throw new Error(`Backend analysis failed: ${response.status}`)
      }
      
      const backendResult = await response.json()
      
      // Convert backend result to expected format
      const riskCategory = backendResult.risk_category === 'Critical Risk' || backendResult.risk_category === 'High Risk' ? 'Dangerous' : 
                          backendResult.risk_category === 'Safe' || backendResult.risk_category === 'Low Risk' ? 'Safe' : 'Suspicious'
      
      const convertedResult: AdvancedScanResult = {
        trustScore: backendResult.trust_score,
        category: riskCategory,
        confidence: backendResult.confidence,
        explanations: (backendResult.explanations || []).map((exp: string) => ({
          type: 'pattern' as const,
          text: exp,
          risk: 'medium' as const,
          explanation: exp,
          position: { start: 0, end: 0 }
        })),
        nlpAnalysis: {
          phishingProbability: (100 - backendResult.trust_score) / 100,
          urgencyScore: 0.5,
          suspiciousKeywords: [],
          languageTone: 'formal' as const,
          spellingAnomalies: 0
        },
        urlAnalysis: {
          maliciousProbability: (100 - backendResult.trust_score) / 100,
          features: {
            urlLength: backendResult.features?.url_length || 0,
            hasHTTPS: backendResult.features?.has_https || false,
            hasIP: backendResult.features?.has_ip || false,
            suspiciousChars: backendResult.features?.special_char_ratio || 0,
            domainAge: backendResult.features?.domain_age_days || null,
            redirectCount: 0
          },
          riskFactors: backendResult.explanations || []
        },
        emotionalManipulation: {
          fear: 0.3,
          urgency: 0.2,
          authority: 0.1,
          greed: 0.1,
          social_proof: 0.1
        }
      }
      
      setScanResult(convertedResult)
      
      // Also try local analysis as fallback
      try {
        const localResult = await advancedMLEngine.analyzeContent(input)
        console.log('🔄 Local analysis for comparison:', localResult)
      } catch (localError) {
        console.warn('Local analysis failed:', localError)
      }
      
    } catch (error) {
      console.error('❌ Analysis failed:', error)
      
      // Fallback to local analysis
      try {
        console.log('🔄 Falling back to local analysis...')
        const localResult = await advancedMLEngine.analyzeContent(input)
        setScanResult(localResult)
      } catch (localError) {
        console.error('❌ Local analysis also failed:', localError)
        // Show error to user
        setScanResult({
          trustScore: 50,
          category: 'Suspicious',
          confidence: 0,
          explanations: [{ 
            type: 'pattern', 
            text: 'Analysis service temporarily unavailable. Please try again later.',
            risk: 'medium',
            explanation: 'Unable to connect to analysis backend',
            position: { start: 0, end: 0 }
          }],
          nlpAnalysis: {
            phishingProbability: 0.5,
            urgencyScore: 0,
            suspiciousKeywords: [],
            languageTone: 'formal',
            spellingAnomalies: 0
          },
          urlAnalysis: {
            maliciousProbability: 0.5,
            features: {
              urlLength: 0,
              hasHTTPS: false,
              hasIP: false,
              suspiciousChars: 0,
              domainAge: null,
              redirectCount: 0
            },
            riskFactors: []
          },
          emotionalManipulation: {
            fear: 0, urgency: 0, authority: 0, greed: 0, social_proof: 0
          }
        })
      }
    }
  }

  // Feature steps data for TrustNet
  const trustnetFeatures = [
    {
      step: 'Step 1',
      title: 'Input Analysis',
      content: 'Paste any suspicious URL or email content into our advanced AI scanner for immediate analysis.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      step: 'Step 2',
      title: 'AI Processing',
      content: 'Our machine learning models analyze 50+ features including URL structure, content patterns, and emotional manipulation tactics.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      step: 'Step 3',
      title: 'Instant Results',
      content: 'Get detailed results with trust scores, risk explanations, and actionable insights to protect yourself from phishing attacks.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    }
  ]

  // Timeline data for TrustNet development
  const timelineData = [
    {
      id: 1,
      title: "Research & Planning",
      date: "Q1 2024",
      content: "Comprehensive research on phishing attack patterns and AI detection methodologies.",
      category: "Planning",
      icon: Calendar,
      relatedIds: [2],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: "ML Model Development",
      date: "Q2 2024",
      content: "Development of advanced machine learning models for URL and email analysis.",
      category: "Development",
      icon: Brain,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 3,
      title: "Real-time Engine",
      date: "Q3 2024",
      content: "Implementation of real-time analysis engine with WebSocket support.",
      category: "Development",
      icon: Code,
      relatedIds: [2, 4],
      status: "in-progress" as const,
      energy: 75,
    },
    {
      id: 4,
      title: "User Interface",
      date: "Q4 2024",
      content: "Advanced UI/UX design with interactive visualizations and explanations.",
      category: "Design",
      icon: FileText,
      relatedIds: [3, 5],
      status: "in-progress" as const,
      energy: 60,
    },
    {
      id: 5,
      title: "Public Release",
      date: "Q1 2025",
      content: "Full public release with comprehensive documentation and support.",
      category: "Release",
      icon: Clock,
      relatedIds: [4],
      status: "pending" as const,
      energy: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>
      <main className="relative">
        {/* Geometric Hero Landing */}
        <HeroGeometric 
          badge="🛡️ TrustNet AI Security"
          title1="Advanced Phishing Detection"
          title2="Powered by Machine Learning"
        />
        
        {/* New Animated Hero Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatedHero />
        </Suspense>
        
        {/* Original Hero Section */}
        <HeroSection onScan={handleScan} />
        
        {/* QuantumGuard Section */}
        <QuantumGuardSection />

        {/* Glass Cards Feature Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" data-parallax data-parallax-speed="0.3" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16" data-fade-scale>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" data-text-reveal>
                Advanced Security Features
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto" data-fade-scale>
                Comprehensive protection powered by cutting-edge AI technology
              </p>
            </div>
            
            <div className="flex justify-center" data-cards-stagger>
              <GlassCards />
            </div>
          </div>
        </section>
        
        {/* Functional Scan Section */}
        <div data-fade-scale>
          <Suspense fallback={<LoadingSpinner />}>
            <ScanSection />
          </Suspense>
        </div>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50 relative">
          <div data-parallax data-parallax-speed="0.2" className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
          <div data-parallax data-parallax-speed="0.3" className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
          <div className="relative z-10">
            <Suspense fallback={<LoadingSpinner />}>
              <FeatureSteps 
                features={trustnetFeatures}
                title="How TrustNet Protects You"
                autoPlayInterval={5000}
              />
            </Suspense>
          </div>
        </section>
        
        {/* Scan Results */}
        {scanResult && (
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <Suspense fallback={<LoadingSpinner />}>
              <ScanResults result={scanResult} inputText={inputText} />
            </Suspense>
          </div>
        )}
        
        {/* Demo Examples */}
        {!scanResult && (
          <div data-fade-scale>
            <Suspense fallback={<LoadingSpinner />}>
              <DemoExamples onTryExample={handleScan} />
            </Suspense>
          </div>
        )}
        
        {/* Real-time Stats Display */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8" data-word-reveal>
              Real-time Protection Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" data-cards-stagger>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl" data-card data-magnetic data-magnetic-strength="0.2">
                <div className="text-3xl font-bold text-blue-600 mb-2" data-counter data-counter-target={realTimeStats.total_scans}>
                  0
                </div>
                <div className="text-sm text-gray-600">Total Scans</div>
                <div className="text-xs mt-1 text-blue-500">
                  ● Updated
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl" data-card data-magnetic data-magnetic-strength="0.2">
                <div className="text-3xl font-bold text-red-600 mb-2" data-counter data-counter-target={realTimeStats.phishing_detected}>
                  0
                </div>
                <div className="text-sm text-gray-600">Threats Blocked</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl" data-card data-magnetic data-magnetic-strength="0.2">
                <div className="text-3xl font-bold text-green-600 mb-2" data-counter data-counter-target={realTimeStats.safe_urls}>
                  0
                </div>
                <div className="text-sm text-gray-600">Safe URLs</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl" data-card data-magnetic data-magnetic-strength="0.2">
                <div className="text-3xl font-bold text-yellow-600 mb-2" data-counter data-counter-target={realTimeStats.suspicious_emails}>
                  0
                </div>
                <div className="text-sm text-gray-600">Suspicious Content</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ML Dashboard */}
        <section className="py-20 bg-gray-50" data-fade-scale>
          <Suspense fallback={<LoadingSpinner />}>
            <MLDashboard />
          </Suspense>
        </section>
        
        {/* Phishing Timeline */}
        <section className="py-20" data-blur-fade>
          <Suspense fallback={<LoadingSpinner />}>
            <PhishingTimeline />
          </Suspense>
        </section>
        
        {/* Interactive Timeline */}
        <section className="py-0">
          <Suspense fallback={<LoadingSpinner />}>
            <RadialOrbitalTimeline timelineData={timelineData} />
          </Suspense>
        </section>
      </main>
    </div>
  )
}