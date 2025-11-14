"use client"

import { motion } from "framer-motion"
import { Shield, Sparkles, Brain, Lock } from "lucide-react"
import { ReactNode } from "react"

interface QuantumGuardLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export function QuantumGuardLayout({ children, title, description }: QuantumGuardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 mb-6"
            >
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">QuantumGuard AI</span>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>

            {/* What is QuantumGuard Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">What is QuantumGuard?</h2>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                QuantumGuard is an advanced AI system that calculates a <span className="font-semibold text-blue-600">Digital Trust Score</span> for any online identity.
                It helps you judge whether a link, message, sender, UPI ID or profile is trustworthy.
                It acts like a <span className="font-semibold text-indigo-600">CIBIL score — but for online safety</span>.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">What's Unique</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    First system to give a universal Digital Trust Score (0–100) across all digital identities
                  </p>
                </div>

                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900">What You Get</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    More accurate fraud detection with simple explanations and all-in-one identity safety checker
                  </p>
                </div>

                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Why Advanced</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Detects psychological manipulation patterns and uses multi-layer AI analysis for ultimate safety
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>
    </div>
  )
}
