"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { QuantumGuardLayout } from "@/components/quantumguard/QuantumGuardLayout"
import { CreditCard, AlertTriangle, CheckCircle, Shield, Sparkles, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UPIResult {
  upiId: string
  isValid: boolean
  trustScore: number
  riskLevel: 'Safe' | 'Suspicious' | 'Dangerous'
  issues: Array<{ type: string; severity: 'low' | 'medium' | 'high'; description: string }>
  recommendations: string[]
}

export default function UPIScannerPage() {
  const [upiId, setUpiId] = useState("")
  const [result, setResult] = useState<UPIResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeUPI = async () => {
    if (!upiId.trim()) return

    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // UPI validation logic
    const upiRegex = /^[\w.-]+@[\w.-]+$/
    const isValid = upiRegex.test(upiId)
    
    const issues: UPIResult['issues'] = []
    let trustScore = 50
    
    // Comprehensive list of known legitimate UPI providers
    const knownProviders = [
      'paytm', 'ptm', 'phonepe', 'ybl', 'ibl', 'axl',
      'gpay', 'googlepay', 'okaxis', 'oksbi', 'okicici', 'okhdfc',
      'upi', 'sbi', 'icici', 'hdfc', 'axis', 'kotak', 'pnb', 'bob',
      'federal', 'indus', 'yes', 'idbi', 'union', 'canara', 'boi',
      'airtel', 'jio', 'freecharge', 'mobikwik', 'amazon', 'whatsapp'
    ]
    
    const bankPart = upiId.split('@')[1]?.toLowerCase() || ''
    const userPart = upiId.split('@')[0]?.toLowerCase() || ''
    const isKnownProvider = knownProviders.some(provider => bankPart.includes(provider))
    
    // Check for common issues
    if (!isValid) {
      issues.push({
        type: 'Invalid Format',
        severity: 'high',
        description: 'UPI ID does not follow standard format (username@bank)'
      })
      trustScore = 15
    } else if (isKnownProvider) {
      // Known provider - start with high score
      trustScore = 85
      
      // Check for suspicious patterns in username
      const hasExcessiveNumbers = /\d{8,}/.test(userPart)
      const hasRandomPattern = /^[a-z0-9]{15,}$/.test(userPart) && !/[aeiou]{2}/.test(userPart)
      
      if (hasExcessiveNumbers) {
        issues.push({
          type: 'Suspicious Pattern',
          severity: 'medium',
          description: 'Username contains very long number sequence'
        })
        trustScore -= 15
      }
      
      if (hasRandomPattern) {
        issues.push({
          type: 'Random Username',
          severity: 'low',
          description: 'Username appears randomly generated'
        })
        trustScore -= 10
      }
    } else {
      // Unknown provider
      trustScore = 35
      issues.push({
        type: 'Unknown Provider',
        severity: 'high',
        description: 'Payment provider not recognized - high risk of fraud'
      })
      
      // Check for suspicious TLDs in provider
      const hasSuspiciousTLD = /\.(xyz|tk|ml|ga|cf|pw|top|click)$/i.test(bankPart)
      if (hasSuspiciousTLD) {
        issues.push({
          type: 'Suspicious Domain',
          severity: 'high',
          description: 'Provider uses high-risk domain extension'
        })
        trustScore -= 20
      }
    }

    const hasSpecialChars = /[^a-zA-Z0-9@._-]/.test(upiId)
    if (hasSpecialChars) {
      issues.push({
        type: 'Unusual Characters',
        severity: 'medium',
        description: 'Contains unusual special characters'
      })
      trustScore -= 15
    }

    trustScore = Math.max(0, Math.min(100, trustScore))

    let riskLevel: UPIResult['riskLevel']
    if (trustScore >= 60) riskLevel = 'Safe'
    else if (trustScore >= 30) riskLevel = 'Suspicious'
    else riskLevel = 'Dangerous'

    const recommendations: string[] = []
    if (riskLevel === 'Safe') {
      recommendations.push('UPI ID appears legitimate')
      recommendations.push('Always verify payment details before confirming')
      recommendations.push('Check transaction amount carefully')
    } else if (riskLevel === 'Suspicious') {
      recommendations.push('Exercise caution with this UPI ID')
      recommendations.push('Verify recipient identity through alternative means')
      recommendations.push('Start with small test transaction if necessary')
    } else {
      recommendations.push('Do not proceed with this payment')
      recommendations.push('Report suspicious UPI ID to your bank')
      recommendations.push('Verify recipient through official channels only')
    }

    setResult({
      upiId,
      isValid,
      trustScore,
      riskLevel,
      issues,
      recommendations
    })

    setIsAnalyzing(false)
  }

  return (
    <>
      <Navbar />
      <QuantumGuardLayout
        title="UPI / Payment Risk Scanner"
        description="Verify UPI IDs and payment identities before transactions"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Input Section */}
          <div data-fade-scale className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enter UPI ID to Verify</h3>
            <p className="text-gray-600 mb-6">
              Check any UPI ID for formatting issues, suspicious patterns, and trust indicators
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@paytm, 9876543210@ybl, merchant@okaxis"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Example Buttons */}
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setUpiId("merchant@paytm")}
                className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                ✅ Try Real UPI (Paytm)
              </button>
              <button
                onClick={() => setUpiId("user@ybl")}
                className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                ✅ Try Real UPI (PhonePe)
              </button>
              <button
                onClick={() => setUpiId("user123456789@unknownbank")}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                ❌ Try Fake UPI
              </button>
              <button
                onClick={() => setUpiId("suspicious@xyz")}
                className="px-4 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                ⚠️ Try Suspicious UPI
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Always verify UPI IDs match the intended recipient. Scammers often use similar-looking IDs to trick users.
              </p>
            </div>

            <Button
              onClick={analyzeUPI}
              disabled={isAnalyzing || !upiId.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Scanning UPI ID...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Scan UPI ID
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
              data-cards-stagger
            >
              {/* Trust Score Display */}
              <div data-card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {result.riskLevel === 'Safe' && <CheckCircle className="w-16 h-16 text-green-600" />}
                    {result.riskLevel === 'Suspicious' && <AlertTriangle className="w-16 h-16 text-yellow-600" />}
                    {result.riskLevel === 'Dangerous' && <XCircle className="w-16 h-16 text-red-600" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Trust Score</h3>
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {result.trustScore}
                    <span className="text-3xl">/100</span>
                  </div>
                  
                  <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold ${
                    result.riskLevel === 'Safe' ? 'bg-green-100 text-green-700' :
                    result.riskLevel === 'Suspicious' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <Shield className="w-5 h-5" />
                    <span>{result.riskLevel}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.trustScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      result.riskLevel === 'Safe' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      result.riskLevel === 'Suspicious' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  />
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">UPI ID:</span>
                    <span className="text-sm font-mono text-gray-900">{result.upiId}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-700">Format:</span>
                    <span className={`text-sm font-medium ${result.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {result.isValid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Issues Detected */}
              {result.issues.length > 0 && (
                <div data-card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 shadow-xl">
                  <div className="flex items-center space-x-2 mb-6">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <h4 className="text-xl font-bold text-gray-900">Issues Detected</h4>
                  </div>
                  <div className="space-y-4">
                    {result.issues.map((issue, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          issue.severity === 'high' ? 'bg-red-50 border-red-500' :
                          issue.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{issue.type}</h5>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                            issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {issue.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{issue.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div data-card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="flex items-center space-x-2 mb-6">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">Safety Recommendations</h4>
                </div>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </QuantumGuardLayout>
    </>
  )
}
