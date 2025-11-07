"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick,
  className = "" 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center gap-1 px-9 py-4 border-4 border-transparent text-base bg-transparent rounded-full font-semibold text-blue-500 shadow-[0_0_0_2px_#3b82f6] cursor-pointer overflow-hidden transition-all duration-600 ${className}`}
      whileHover={{
        boxShadow: '0 0 0 12px transparent',
        borderRadius: '12px',
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {/* Arrow 2 (left) */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute w-6 h-6 fill-blue-500 z-10"
        initial={{ left: '-25%' }}
        whileHover={{ left: '16px' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </motion.svg>

      {/* Text */}
      <motion.span
        className="relative z-10 text-blue-600"
        initial={{ x: -12 }}
        whileHover={{ x: 12, color: '#1e293b' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.span>

      {/* Circle expansion */}
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full opacity-0"
        whileHover={{
          width: '220px',
          height: '220px',
          opacity: 1,
        }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Arrow 1 (right) */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute w-6 h-6 fill-blue-500 z-10"
        initial={{ right: '16px' }}
        whileHover={{ right: '-25%', fill: '#1e293b' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </motion.svg>
    </motion.button>
  )
}
