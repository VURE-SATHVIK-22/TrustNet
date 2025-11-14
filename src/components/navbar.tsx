"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Shield, Menu, X, Sparkles, Search, Bell, Sun, Moon, 
  ChevronDown, Zap, Brain, Eye, Lock, BarChart3, FileText,
  Users, Settings, HelpCircle, Command, QrCode, Mail, Link as LinkIcon,
  LogIn, UserPlus, ShieldCheck, UserCheck, CreditCard, MessageSquare, Image
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Advanced magnetic hover effect component
const MagneticNavItem = ({ 
  children, 
  className = "",
  href,
  isActive = false 
}: { 
  children: React.ReactNode
  className?: string
  href?: string
  isActive?: boolean
}) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return
    
    const rect = itemRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    
    setMousePosition({ x: deltaX, y: deltaY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const content = (
    <motion.div
      ref={itemRef}
      className={`relative px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600' 
          : 'text-gray-700 hover:text-blue-600'
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-indigo-500/5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10 font-medium">{children}</span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          layoutId="activeIndicator"
        />
      )}
    </motion.div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}

// Advanced search component
const AdvancedSearch = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 z-50 p-6"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search TrustNet features, documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg outline-none placeholder-gray-400"
              />
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
            
            {query && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Quick Actions</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>Analyze URL</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Brain className="w-4 h-4 text-indigo-500" />
                    <span>Check Email</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Advanced 3D logo with dynamic effects
const AdvancedLogo = ({ scrolled }: { scrolled: boolean }) => {
  const [currentFont, setCurrentFont] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const logoRef = useRef<HTMLDivElement>(null)
  const shieldRef = useRef<HTMLDivElement>(null)
  
  const coolFonts = [
    "font-orbitron font-bold",
    "font-bungee",
    "font-righteous", 
    "font-exo2 font-black",
    "font-fredoka"
  ]

  const gradients = [
    "from-blue-600 via-indigo-600 to-purple-600",
    "from-purple-600 via-pink-600 to-red-600", 
    "from-green-600 via-teal-600 to-blue-600",
    "from-red-600 via-orange-600 to-yellow-600",
    "from-indigo-600 via-purple-600 to-pink-600",
    "from-teal-600 via-blue-600 to-indigo-600"
  ]

  useEffect(() => {
    const fontInterval = setInterval(() => {
      setCurrentFont(prev => (prev + 1) % coolFonts.length)
    }, 4000)

    return () => clearInterval(fontInterval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return
    
    const rect = logoRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / rect.width
    const deltaY = (e.clientY - centerY) / rect.height
    
    setMousePosition({ x: deltaX * 10, y: deltaY * 10 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div 
      ref={logoRef}
      className="flex items-center space-x-3 group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: scrolled ? 0.9 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Shield */}
      <motion.div
        ref={shieldRef}
        className="relative"
        animate={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Shield className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-all duration-300 drop-shadow-lg" />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-blue-400/30 rounded-full blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Particle effects */}
        <div className="absolute -inset-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Dynamic Text Logo */}
      <div className="flex flex-col">
        <motion.span 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          animate={{
            rotateX: mousePosition.y * 0.5,
            rotateY: mousePosition.x * 0.5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ transformStyle: "preserve-3d", fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          TrustNet
        </motion.span>
        <motion.span 
          className="text-xs text-gray-500 -mt-1"
          animate={{
            opacity: scrolled ? 0.7 : 1,
          }}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          Know Before You Click
        </motion.span>
      </div>
    </motion.div>
  )
}

// Notification badge component
const NotificationBadge = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Simulate real-time scan count updates
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
      {count > 0 && (
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {count > 99 ? '99+' : count}
        </motion.div>
      )}
    </motion.div>
  )
}

// Theme toggle component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Add theme switching logic here
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-200 rounded-full p-1 transition-colors duration-300"
      animate={{
        backgroundColor: isDark ? "#374151" : "#E5E7EB"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-gray-600" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  )
}

const navItems = [
  { name: "Home", href: "/", icon: Shield },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Awareness", href: "/awareness", icon: Eye },
]

const scanMenuItems = [
  { name: "QR Code Scanner", description: "Scan and verify QR codes", icon: QrCode, href: "/scan/qr-code" },
  { name: "Email Checker", description: "Analyze phishing emails", icon: Mail, href: "/scan/email" },
  { name: "Link Analyzer", description: "Check suspicious URLs", icon: LinkIcon, href: "/scan/link" },
]

const quantumGuardMenuItems = [
  { name: "Digital Trust Score Analyzer", description: "Analyze any digital identity", icon: ShieldCheck, href: "/quantumguard/trust-score" },
  { name: "Identity Checker", description: "Email / Phone / Username", icon: UserCheck, href: "/quantumguard/identity-checker" },
  { name: "UPI / Payment Risk Scanner", description: "Verify payment identities", icon: CreditCard, href: "/quantumguard/upi-scanner" },
  { name: "WhatsApp / SMS Scam Analyzer", description: "Detect message manipulation", icon: MessageSquare, href: "/quantumguard/message-analyzer" },
  { name: "Screenshot Authenticity Checker", description: "Verify screenshot legitimacy", icon: Image, href: "/quantumguard/screenshot-checker" },
]

const megaMenuItems = {
  resources: [
    { name: "Documentation", description: "API and integration guides", icon: FileText, href: "/docs" },
    { name: "Security Tips", description: "Best practices guide", icon: Lock, href: "/awareness" },
    { name: "Community", description: "Join our community", icon: Users, href: "/community" },
    { name: "Support", description: "Get help and support", icon: HelpCircle, href: "/support" },
  ]
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setScrolled(scrollTop > 20)
      setScrollProgress(progress)
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'dashboard', 'about']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    // Advanced navbar entrance animation
    if (navRef.current) {
      const tl = gsap.timeline()
      
      tl.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(".nav-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        "-=0.5"
      )
      .fromTo(".nav-action",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.1 },
        "-=0.3"
      )
    }

    // Scroll-based animations
    if (typeof window !== "undefined") {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleX: progress,
              duration: 0.1,
              ease: "none"
            })
          }
        }
      })
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMegaMenuEnter = (menu: string) => {
    setMegaMenuOpen(menu)
  }

  const handleMegaMenuLeave = () => {
    setMegaMenuOpen(null)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        ref={progressRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 z-[51] origin-left pointer-events-none"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20' 
            : 'bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-100'
        }`}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-20 items-center justify-between">
            {/* Logo - Fixed width to prevent shifting */}
            <div className="flex-shrink-0 nav-item">
              <Link href="/">
                <AdvancedLogo scrolled={scrolled} />
              </Link>
            </div>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-1 px-4">
              {navItems.map((item) => (
                <MagneticNavItem
                  key={item.name}
                  href={item.href}
                  isActive={pathname === item.href}
                  className="nav-item whitespace-nowrap"
                >
                  <item.icon className="w-4 h-4 mr-1.5" />
                  {item.name}
                </MagneticNavItem>
              ))}
              
              {/* Scan Tools Mega Menu */}
              <div 
                className="relative whitespace-nowrap"
                onMouseEnter={() => handleMegaMenuEnter('scan')}
                onMouseLeave={handleMegaMenuLeave}
              >
                <MagneticNavItem className="nav-item">
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-1.5" />
                    Scan Tools
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </span>
                </MagneticNavItem>
                
                <AnimatePresence>
                  {megaMenuOpen === 'scan' && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {scanMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                          >
                            <item.icon className="w-5 h-5 text-blue-500 group-hover:text-blue-600" />
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* QuantumGuard Mega Menu */}
              <div 
                className="relative whitespace-nowrap"
                onMouseEnter={() => handleMegaMenuEnter('quantumguard')}
                onMouseLeave={handleMegaMenuLeave}
              >
                <MagneticNavItem className="nav-item">
                  <span className="flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1.5" />
                    QuantumGuard
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </span>
                </MagneticNavItem>
                
                <AnimatePresence>
                  {megaMenuOpen === 'quantumguard' && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">QuantumGuard AI</h3>
                        <p className="text-xs text-gray-500">Universal Digital Trust Score System</p>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {quantumGuardMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                              <item.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Items - Right Side */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Search Icon */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="nav-action hidden md:flex p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Notifications */}
              <div className="nav-action hidden md:block">
                <NotificationBadge />
              </div>

              {/* Theme Toggle */}
              <div className="nav-action hidden md:block">
                <ThemeToggle />
              </div>

              {/* Login Button - Desktop */}
              <motion.div className="nav-action hidden lg:block">
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 whitespace-nowrap"
                    >
                      <LogIn className="w-4 h-4 mr-1.5" />
                      Login
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Sign Up Button - Desktop */}
              <motion.div className="nav-action hidden lg:block">
                <Link href="/signup">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group whitespace-nowrap"
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <span className="relative flex items-center">
                        <UserPlus className="w-4 h-4 mr-1.5" />
                        Sign Up
                      </span>
                      
                      {/* Ripple effect */}
                      <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-4 py-6">
                  <div className="space-y-3">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                            pathname === item.href
                              ? 'text-blue-600 bg-blue-50/80'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50/80'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Mobile Login/Signup Buttons */}
                    <motion.div 
                      className="pt-4 border-t border-gray-200/60 space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button 
                          variant="outline"
                          className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                      
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Sign Up
                        </Button>
                      </Link>
                      
                      <Button 
                        onClick={() => {
                          const scannerSection = document.getElementById('scanner')
                          if (scannerSection) {
                            scannerSection.scrollIntoView({ behavior: 'smooth' })
                          }
                          setIsOpen(false)
                        }}
                        variant="ghost"
                        className="w-full text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Advanced Search Modal */}
      <AdvancedSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}