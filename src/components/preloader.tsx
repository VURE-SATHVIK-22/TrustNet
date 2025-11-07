"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#0f1a3d] to-[#1a3a52]"
        >
          {/* Optimized background particles - Reduced count */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => {
              const left = ((i * 37) % 100)
              const top = ((i * 53) % 100)
              const duration = 3 + ((i % 5) * 0.5)
              const delay = (i % 10) * 0.2
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    willChange: 'transform, opacity',
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    delay,
                    ease: "easeInOut",
                  }}
                />
              )
            })}
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Main logo container */}
          <div className="relative z-10">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 -m-24"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full border-2 border-blue-400/20 rounded-full" />
            </motion.div>

            {/* Inner rotating ring */}
            <motion.div
              className="absolute inset-0 -m-16"
              animate={{ rotate: -360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full border border-cyan-400/30 rounded-full" />
            </motion.div>

            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 -m-32 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo image with animations */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotateY: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 1.5,
              }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* The actual TrustNet logo */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[600px] h-[340px] flex items-center justify-center"
              >
                {/* Logo with fade-in and scale animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative w-full h-full"
                >
                  {/* SVG recreation of your logo */}
                  <svg
                    viewBox="0 0 1024 576"
                    className="w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))' }}
                  >
                    {/* Circuit pattern background */}
                    <g opacity="0.6">
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30) * Math.PI / 180
                        const x1 = 240 + Math.cos(angle) * 60
                        const y1 = 288 + Math.sin(angle) * 60
                        const x2 = 240 + Math.cos(angle) * 100
                        const y2 = 288 + Math.sin(angle) * 100
                        return (
                          <motion.line
                            key={`circuit-${i}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.8 + i * 0.05,
                            }}
                          />
                        )
                      })}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30) * Math.PI / 180
                        const x = 240 + Math.cos(angle) * 100
                        const y = 288 + Math.sin(angle) * 100
                        return (
                          <motion.circle
                            key={`node-${i}`}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#06b6d4"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{
                              duration: 0.5,
                              delay: 1.2 + i * 0.05,
                            }}
                          />
                        )
                      })}
                    </g>

                    {/* Shield icon */}
                    <g>
                      <motion.path
                        d="M 180 230 L 240 210 L 300 230 L 300 300 Q 300 350 240 380 Q 180 350 180 300 Z"
                        fill="url(#shieldGradient)"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                      <motion.path
                        d="M 200 250 L 240 235 L 280 250 L 280 300 Q 280 330 240 350 Q 200 330 200 300 Z"
                        fill="url(#innerShield)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                      />
                    </g>

                    {/* TrustNet Text - Perfect spacing */}
                    <motion.text
                      x="340"
                      y="310"
                      fill="#e0e7ff"
                      fontSize="90"
                      fontWeight="400"
                      fontFamily="Arial, sans-serif"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 1.8 }}
                    >
                      Trust
                    </motion.text>
                    <motion.text
                      x="550"
                      y="310"
                      fill="#60a5fa"
                      fontSize="90"
                      fontWeight="400"
                      fontFamily="Arial, sans-serif"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 2 }}
                    >
                      Net
                    </motion.text>

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="innerShield" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Particle burst effect */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, Math.cos((i * 45) * Math.PI / 180) * 200],
                      y: [0, Math.sin((i * 45) * Math.PI / 180) * 200],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 2 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <motion.p
                className="text-blue-300/90 text-lg font-light tracking-[0.3em] uppercase"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Know Before You Click
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="mt-8 w-96 mx-auto"
            >
              <div className="h-1.5 bg-blue-900/30 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                  style={{ backgroundSize: "200% 100%" }}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: "100%",
                    backgroundPosition: ["0% 0%", "100% 0%"]
                  }}
                  transition={{ 
                    width: { duration: 3.5, ease: "easeOut" },
                    backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" }
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="text-blue-400/70 text-sm text-center mt-3 font-light tracking-wide"
              >
                Initializing Security Systems...
              </motion.p>
            </motion.div>
          </div>

          {/* Corner decorations */}
          {[
            { top: 4, left: 4, borderL: true, borderT: true },
            { top: 4, right: 4, borderR: true, borderT: true },
            { bottom: 4, left: 4, borderL: true, borderB: true },
            { bottom: 4, right: 4, borderR: true, borderB: true },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute w-20 h-20 ${
                pos.borderL ? 'border-l-2' : ''
              } ${pos.borderR ? 'border-r-2' : ''} ${
                pos.borderT ? 'border-t-2' : ''
              } ${pos.borderB ? 'border-b-2' : ''} border-blue-400/30`}
              style={{
                top: pos.top ? `${pos.top}rem` : undefined,
                bottom: pos.bottom ? `${pos.bottom}rem` : undefined,
                left: pos.left ? `${pos.left}rem` : undefined,
                right: pos.right ? `${pos.right}rem` : undefined,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
