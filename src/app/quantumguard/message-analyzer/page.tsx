"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { QuantumGuardLayout } from "@/components/quantumguard/QuantumGuardLayout"
import { MessageSquare, AlertTriangle, Shield, Sparkles, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MessageResult {
  message: string
  scamProbability: number
  manipulationLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  detectedTactics: Array<{ tactic: string; confidence: number; description: string }>
  psychologyAnalysis: {
    urgency: number
    fear: number
    authority: number
    greed: number
    socialProof: number
  }
  recommendations: string[]
}

export default function MessageAnalyzerPage() {
  const [message, setMessage] = useState("")
  const [result, setResult] = useState<MessageResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeMessage = async () => {
    if (!message.trim()) return

    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // NLP-based scam detection
    const lowerMessage = message.toLowerCase()
    
    // Scam indicators
    const urgencyWords = ['urgent', 'immediately', 'now', 'hurry', 'limited time', 'expires', 'act fast']
    const fearWords = ['blocked', 'suspended', 'fraud', 'unauthorized', 'security alert', 'verify', 'confirm']
    const authorityWords = ['bank', 'police', 'government', 'official', 'department', 'authority']
    const greedWords = ['won', 'prize', 'lottery', 'free', 'reward', 'cashback', 'offer']
    const socialWords = ['everyone', 'people', 'users', 'customers', 'members']
    
    let scamScore = 0
    const detectedTactics: MessageResult['detectedTactics'] = []
    
    // Calculate psychology scores
    const urgency = urgencyWords.filter(word => lowerMessage.includes(word)).length * 20
    const fear = fearWords.filter(word => lowerMessage.includes(word)).length * 20
    const authority = authorityWords.filter(word => lowerMessage.includes(word)).length * 15
    const greed = greedWords.filter(word => lowerMessage.includes(word)).length * 20
    const socialProof = socialWords.filter(word => lowerMessage.includes(word)).length * 10
    
    scamScore = Math.min(100, urgency + fear + authority + greed + socialProof)
    
    // Detect tactics
    if (urgency > 0) {
      detectedTactics.push({
        tactic: 'Urgency Manipulation',
        confidence: Math.min(95, urgency),
        description: 'Creates false sense of urgency to pressure quick action'
      })
    }
    
    if (fear > 0) {
      detectedTactics.push({
        tactic: 'Fear Tactics',
        confidence: Math.min(95, fear),
        description: 'Uses fear and threats to manipulate victim'
      })
    }
    
    if (authority > 0) {
      detectedTactics.push({
        tactic: 'False Authority',
        confidence: Math.min(90, authority),
        description: 'Impersonates authority figures to gain trust'
      })
    }
    
    if (greed > 0) {
      detectedTactics.push({
        tactic: 'Greed Exploitation',
        confidence: Math.min(90, greed),
        description: 'Promises unrealistic rewards to lure victims'
      })
    }
    
    // Check for links
    if (/https?:\/\//.test(message)) {
      scamScore += 15
      detectedTactics.push({
        tactic: 'Suspicious Links',
        confidence: 75,
        description: 'Contains URLs that may lead to phishing sites'
      })
    }
    
    // Check for phone numbers
    if (/\d{10}/.test(message)) {
      scamScore += 10
      detectedTactics.push({
        tactic: 'Contact Request',
        confidence: 60,
        description: 'Requests contact through phone number'
      })
    }
    
    // Check for personal info requests
    if (/password|pin|otp|cvv|card number/i.test(message)) {
      scamScore += 30
      detectedTactics.push({
        tactic: 'Information Phishing',
        confidence: 95,
        description: 'Requests sensitive personal or financial information'
      })
    }
    
    scamScore = Math.min(100, scamScore)
    
    let manipulationLevel: MessageResult['manipulationLevel']
    if (scamScore >= 70) manipulationLevel = 'Critical'
    else if (scamScore >= 50) manipulationLevel = 'High'
    else if (scamScore >= 30) manipulationLevel = 'Medium'
    else manipulationLevel = 'Low'
    
    const recommendations: string[] = []
    if (manipulationLevel === 'Critical' || manipulationLevel === 'High') {
      recommendations.push('Do not respond to this message')
      recommendations.push('Do not click any links or call any numbers')
      recommendations.push('Block the sender immediately')
      recommendations.push('Report as spam/scam to your service provider')
    } else if (manipulationLevel === 'Medium') {
      recommendations.push('Verify sender identity through official channels')
      recommendations.push('Do not share personal information')
      recommendations.push('Be cautious of any requests for action')
    } else {
      recommendations.push('Message appears relatively safe')
      recommendations.push('Still verify sender if requesting sensitive actions')
      recommendations.push('Never share passwords or OTPs')
    }
    
    setResult({
      message,
      scamProbability: scamScore,
      manipulationLevel,
      detectedTactics,
      psychologyAnalysis: {
        urgency: Math.min(100, urgency),
        fear: Math.min(100, fear),
        authority: Math.min(100, authority),
        greed: Math.min(100, greed),
        socialProof: Math.min(100, socialProof)
      },
      recommendations
    })
    
    setIsAnalyzing(false)
  }

  return (
    <>
      <Navbar />
      <QuantumGuardLayout
        title="WhatsApp / SMS Scam Analyzer"
        description="Detect manipulation tactics and scam patterns in messages"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Input Section */}
          <div data-fade-scale className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Paste Message to Analyze</h3>
            <p className="text-gray-600 mb-6">
              Our AI will detect psychological manipulation, scam patterns, and social engineering tactics
            </p>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste WhatsApp message, SMS, or any suspicious text here..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            {/* Example Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setMessage("Hi! Your order #12345 has been shipped and will arrive tomorrow. Track your package at our official website. Thank you for shopping with us!")}
                className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                ✅ Try Real Message
              </button>
              <button
                onClick={() => setMessage("URGENT! Your bank account has been suspended due to suspicious activity. Click this link immediately to verify your identity or your account will be permanently blocked: http://fake-bank-verify.xyz Call us now at 9876543210")}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                ❌ Try Scam Message
              </button>
              <button
                onClick={() => setMessage("Congratulations! You have won a lottery of Rs 25,00,000! Claim your prize now by calling this number immediately. Limited time offer. Don't miss this opportunity!")}
                className="px-4 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                ⚠️ Try Lottery Scam
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Privacy Note:</strong> Your messages are analyzed locally and never stored or shared.
              </p>
            </div>

            <Button
              onClick={analyzeMessage}
              disabled={isAnalyzing || !message.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing Message...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Message
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
              {/* Scam Probability */}
              <div data-card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${
                      result.manipulationLevel === 'Critical' ? 'bg-red-100' :
                      result.manipulationLevel === 'High' ? 'bg-orange-100' :
                      result.manipulationLevel === 'Medium' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <AlertTriangle className={`w-12 h-12 ${
                        result.manipulationLevel === 'Critical' ? 'text-red-600' :
                        result.manipulationLevel === 'High' ? 'text-orange-600' :
                        result.manipulationLevel === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Scam Probability</h3>
                  <div className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                    {result.scamProbability}%
                  </div>
                  
                  <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold ${
                    result.manipulationLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                    result.manipulationLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                    result.manipulationLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    <Shield className="w-5 h-5" />
                    <span>{result.manipulationLevel} Manipulation</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.scamProbability}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      result.manipulationLevel === 'Critical' || result.manipulationLevel === 'High' 
                        ? 'bg-gradient-to-r from-red-500 to-orange-600' :
                      result.manipulationLevel === 'Medium' 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                  />
                </div>
              </div>

              {/* Detected Tactics */}
              {result.detectedTactics.length > 0 && (
                <div data-card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 shadow-xl">
                  <div className="flex items-center space-x-2 mb-6">
                    <Brain className="w-6 h-6 text-orange-600" />
                    <h4 className="text-xl font-bold text-gray-900">Manipulation Tactics Detected</h4>
                  </div>
                  <div className="space-y-4">
                    {result.detectedTactics.map((tactic, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{tactic.tactic}</h5>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            {tactic.confidence}% Confidence
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{tactic.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Psychology Analysis */}
              <div data-card className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="flex items-center space-x-2 mb-6">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">Psychological Manipulation Analysis</h4>
                </div>
                <div className="space-y-4">
                  {Object.entries(result.psychologyAnalysis).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                        <span className="text-sm font-bold text-gray-900">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`h-full rounded-full ${
                            value >= 70 ? 'bg-red-500' :
                            value >= 40 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

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
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
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
