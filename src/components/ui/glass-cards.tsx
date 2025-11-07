"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Scan, Lock, Zap, Eye, Brain } from 'lucide-react'

interface GlassCard {
  icon: React.ReactNode
  title: string
  description: string
  rotation: number
  color: string
}

const cards: GlassCard[] = [
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Real-time Protection",
    description: "AI-powered threat detection analyzing millions of patterns",
    rotation: -12,
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "ML Analysis",
    description: "Advanced machine learning models with 97% accuracy",
    rotation: 0,
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Instant Scan",
    description: "Lightning-fast security checks in under 100ms",
    rotation: 12,
    color: "from-cyan-500 to-blue-500"
  }
]

export const GlassCards: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center gap-0 py-12">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="relative w-80 h-96 group cursor-pointer"
          style={{
            margin: '0 -60px',
          }}
          initial={{ 
            rotateY: card.rotation,
            z: -index * 50 
          }}
          whileHover={{
            rotateY: 0,
            z: 50,
            margin: '0 20px',
            transition: { duration: 0.5, ease: "easeOut" }
          }}
        >
          {/* Card container with 3D transform */}
          <motion.div
            className="relative w-full h-full rounded-2xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${card.rotation}deg)`,
            }}
            whileHover={{
              transform: "rotateY(0deg)",
            }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Animated gradient background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Glass morphism layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl" />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
            />

            {/* Minimal particle effects for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: `${30 + i * 15}%`,
                    willChange: 'transform',
                  }}
                  animate={{
                    y: [0, -80, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
              {/* Icon with glow */}
              <motion.div
                className={`relative mb-6 text-white`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-full blur-xl opacity-60`}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative">
                  {card.icon}
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-2xl font-bold text-white mb-3 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {card.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-blue-200 text-center text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {card.description}
              </motion.p>

              {/* Animated stats/metrics */}
              <motion.div
                className="mt-6 flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {index === 0 ? "24/7" : index === 1 ? "97%" : "<100ms"}
                  </div>
                  <div className="text-xs text-blue-300">
                    {index === 0 ? "Active" : index === 1 ? "Accuracy" : "Speed"}
                  </div>
                </div>
              </motion.div>

              {/* Hover indicator */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                <div className="flex items-center gap-2 text-blue-300 text-sm">
                  <span>Learn More</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom glow bar */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
            />

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
          </motion.div>

          {/* 3D shadow */}
          <motion.div
            className="absolute inset-0 bg-black/20 rounded-2xl blur-xl -z-10"
            style={{
              transform: `translateZ(-50px) rotateY(${card.rotation}deg)`,
            }}
            whileHover={{
              transform: "translateZ(-50px) rotateY(0deg)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
