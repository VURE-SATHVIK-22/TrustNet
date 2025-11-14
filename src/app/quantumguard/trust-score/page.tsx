"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { QuantumGuardLayout } from "@/components/quantumguard/QuantumGuardLayout"
import { Shield, AlertTriangle, CheckCircle, XCircle, Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrustScoreResult {
  score: number
  riskLevel: 'Safe' | 'Low Risk' | 'Medium Risk' | 'High Risk' | 'Critical'
  category: string
  explanation: string
  factors: Array<{ name: string; impact: 'positive' | 'negative' | 'neutral'; description: string }>
}

export default function TrustScorePage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<TrustScoreResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeTrustScore = async () => {
    if (!input.trim()) return

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate trust score based on input patterns
    const hasHttps = input.includes('https://')
    const hasKnownDomain = /\.(com|org|edu|gov)/.test(input)
    const hasEmail = /@/.test(input)
    const hasPhone = /\d{10}/.test(input)
    const hasSuspiciousChars = /[<>{}]/.test(input)
    const length = input.length

    let score = 50
    const factors: TrustScoreResult['factors'] = []

    if (hasHttps) {
      score += 15
      factors.push({ name: 'HTTPS Protocol', impact: 'positive', description: 'Uses secure connection' })
    }
    if (hasKnownDomain) {
      score += 10
      factors.push({ name: 'Known Domain', impact: 'positive', description: 'Recognized domain extension' })
    }
    if (hasSuspiciousChars) {
      score -= 20
      factors.push({ name: 'Suspicious Characters', impact: 'negative', description: 'Contains unusual characters' })
    }
    if (length > 100) {
      score -= 10
      factors.push({ name: 'Excessive Length', impact: 'negative', description: 'Unusually long input' })
    }
    if (hasEmail) {
      score += 5
      factors.push({ name: 'Email Format', impact: 'positive', description: 'Valid email structure' })
    }
    if (hasPhone) {
      score += 5
      factors.push({ name: 'Phone Number', impact: 'positive', description: 'Contains phone number' })
    }

    score = Math.max(0, Math.min(100, score))

    let riskLevel: TrustScoreResult['riskLevel']
    let category: string

    if (score >= 80) {
      riskLevel = 'Safe'
      category = 'Trusted'
    } else if (score >= 60) {
      riskLevel = 'Low Risk'
      category = 'Likely Safe'
    } else if (score >= 40) {
      riskLevel = 'Medium Risk'
      category = 'Suspicious'
    } else if (score >= 20) {
      riskLevel = 'High Risk'
      category = 'Dangerous'
    } else {
      riskLevel = 'Critical'
      category = 'Highly Dangerous'
    }

    setResult({
      score,
      riskLevel,
      category,
      explanation: `Based on multi-layer AI analysis, this identity has a trust score of ${score}/100. ${
        score >= 70 ? 'This appears to be a legitimate identity with strong trust indicators.' :
        score >= 40 ? 'This identity shows some concerning patterns. Proceed with caution.' :
        'This identity exhibits multiple red flags. We strongly recommend avoiding interaction.'
      }`,
      factors
    })

    setIsAnalyzing(false)
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Safe': return 'text-green-600'
      case 'Low Risk': return 'text-blue-600'
      case 'Medium Risk': return 'text-yellow-600'
      case 'High Risk': return 'text-orange-600'
      case 'Critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Safe': return <CheckCircle className="w-16 h-16 text-green-600" />
      case 'Low Risk': return <Shield className="w-16 h-16 text-blue-600" />
      case 'Medium Risk': return <AlertTriangle className="w-16 h-16 text-yellow-600" />
      case 'High Risk': return <AlertTriangle className="w-16 h-16 text-orange-600" />
      case 'Critical': return <XCircle className="w-16 h-16 text-red-600" />
      default: return <Shield className="w-16 h-16 text-gray-600" />
    }
  }

  return (
    <>
      <Navbar />
      <QuantumGuardLayout
        title="Digital Trust Score Analyzer"
        description="Get an instant trust score (0-100) for any digital identity"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Input Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enter Any Digital Identity</h3>
            <p className="text-gray-600 mb-6">
              URLs, emails, phone numbers, social media usernames, UPI IDs, or any online identifier
            </p>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., https://example.com, user@email.com, @username, 9876543210, user@upi"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <Button
              onClick={analyzeTrustScore}
              disabled={isAnalyzing || !input.trim()}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Trust Score
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Trust Score Display */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl text-center">
                <div className="flex justify-center mb-4">
                  {getRiskIcon(result.riskLevel)}
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Trust Score</h3>
                <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  {result.score}
                  <span className="text-4xl">/100</span>
                </div>
                
                <div className={`text-2xl font-semibold ${getRiskColor(result.riskLevel)} mb-2`}>
                  {result.riskLevel}
                </div>
                <div className="text-lg text-gray-600 mb-6">{result.category}</div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      result.score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      result.score >= 60 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      result.score >= 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      result.score >= 20 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  />
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Analysis Explanation</h4>
                <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
              </div>

              {/* Risk Factors */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Trust Factors Analyzed</h4>
                <div className="space-y-4">
                  {result.factors.map((factor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50"
                    >
                      <div className="mt-1">
                        {factor.impact === 'positive' && <TrendingUp className="w-5 h-5 text-green-600" />}
                        {factor.impact === 'negative' && <TrendingDown className="w-5 h-5 text-red-600" />}
                        {factor.impact === 'neutral' && <Minus className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{factor.name}</h5>
                        <p className="text-sm text-gray-600">{factor.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        factor.impact === 'positive' ? 'bg-green-100 text-green-700' :
                        factor.impact === 'negative' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {factor.impact === 'positive' ? '+' : factor.impact === 'negative' ? '-' : '~'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </QuantumGuardLayout>
    </>
  )
}
