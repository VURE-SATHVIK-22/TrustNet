"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ShieldCheck, UserCheck, CreditCard, MessageSquare, Image, Sparkles, ArrowRight, Shield, Brain, Lock } from "lucide-react"
import { WavyBlock, WavyBlockItem } from "@/components/ui/wavy-text-block"

const quantumGuardFeatures = [
  {
    icon: ShieldCheck,
    title: "Digital Trust Score",
    description: "Get instant 0-100 trust scores for any digital identity",
    href: "/quantumguard/trust-score",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: UserCheck,
    title: "Identity Checker",
    description: "Verify emails, phone numbers, and usernames",
    href: "/quantumguard/identity-checker",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: CreditCard,
    title: "UPI Scanner",
    description: "Detect suspicious payment IDs before transactions",
    href: "/quantumguard/upi-scanner",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Message Analyzer",
    description: "Identify scam patterns in WhatsApp/SMS",
    href: "/quantumguard/message-analyzer",
    gradient: "from-pink-500 to-red-500"
  },
  {
    icon: Image,
    title: "Screenshot Checker",
    description: "Verify authenticity of screenshots",
    href: "/quantumguard/screenshot-checker",
    gradient: "from-red-500 to-orange-500"
  }
]

const uniqueFeatures = [
  {
    icon: Shield,
    title: "Universal Coverage",
    description: "First system to give a universal Digital Trust Score (0–100) across all digital identities"
  },
  {
    icon: Brain,
    title: "Psychology Detection",
    description: "Detects psychological manipulation patterns like urgency, fear, and authority tactics"
  },
  {
    icon: Lock,
    title: "Multi-Layer AI",
    description: "Uses advanced machine learning with 50+ feature analysis for ultimate accuracy"
  }
]

export function QuantumGuardSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Wavy Title Animation */}
        <div className="mb-20">
          <WavyBlock className="flex flex-col justify-start items-center gap-4">
            <WavyBlockItem index={0}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium text-blue-200">Introducing QuantumGuard AI</span>
                </div>
              </motion.div>
            </WavyBlockItem>
            
            <WavyBlockItem index={1}>
              <h2 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Digital Trust Score
              </h2>
            </WavyBlockItem>
            
            <WavyBlockItem index={2}>
              <h2 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                For Everything Online
              </h2>
            </WavyBlockItem>
          </WavyBlock>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-200 text-center max-w-3xl mx-auto mt-8"
          >
            Like a CIBIL score for online safety — verify any digital identity before you trust it
          </motion.p>
        </div>

        {/* Why QuantumGuard is Unique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why QuantumGuard is Unique
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-blue-200">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {quantumGuardFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="group relative h-full">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  {/* Card */}
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <div className={`p-3 bg-gradient-to-br ${feature.gradient} rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-blue-200 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-blue-300 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Try Now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Protect Yourself from Online Scams
            </h3>
            <p className="text-blue-200 mb-6 max-w-2xl">
              QuantumGuard analyzes URLs, emails, phone numbers, UPI IDs, messages, and screenshots
              to give you instant trust scores and fraud detection.
            </p>
            <Link href="/quantumguard/trust-score">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Using QuantumGuard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
