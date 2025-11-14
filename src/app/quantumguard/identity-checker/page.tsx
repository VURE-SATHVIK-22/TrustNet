"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { QuantumGuardLayout } from "@/components/quantumguard/QuantumGuardLayout"
import { Mail, Phone, User, AlertTriangle, CheckCircle, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IdentityResult {
  type: 'email' | 'phone' | 'username'
  value: string
  riskProbability: number
  isValid: boolean
  warnings: string[]
  recommendations: string[]
}

export default function IdentityCheckerPage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [result, setResult] = useState<IdentityResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeIdentity = async () => {
    if (!email && !phone && !username) return

    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    let identityResult: IdentityResult

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isValid = emailRegex.test(email)
      const hasSuspiciousDomain = /\.(xyz|tk|ml|ga|cf)$/.test(email)
      const hasNumbers = /\d{4,}/.test(email)
      
      let risk = 20
      const warnings: string[] = []
      const recommendations: string[] = []

      if (!isValid) {
        risk += 40
        warnings.push('Invalid email format detected')
      }
      if (hasSuspiciousDomain) {
        risk += 30
        warnings.push('Email uses suspicious domain extension')
        recommendations.push('Verify sender through alternative channels')
      }
      if (hasNumbers) {
        risk += 10
        warnings.push('Email contains unusual number patterns')
      }

      identityResult = {
        type: 'email',
        value: email,
        riskProbability: Math.min(risk, 95),
        isValid,
        warnings,
        recommendations: recommendations.length ? recommendations : ['Email appears legitimate', 'Always verify important communications']
      }
    } else if (phone) {
      const phoneRegex = /^\+?[\d\s-()]{10,}$/
      const isValid = phoneRegex.test(phone)
      const hasCountryCode = phone.startsWith('+')
      
      let risk = 15
      const warnings: string[] = []
      const recommendations: string[] = []

      if (!isValid) {
        risk += 35
        warnings.push('Invalid phone number format')
      }
      if (!hasCountryCode) {
        risk += 10
        warnings.push('Missing country code')
      }

      identityResult = {
        type: 'phone',
        value: phone,
        riskProbability: Math.min(risk, 90),
        isValid,
        warnings,
        recommendations: recommendations.length ? recommendations : ['Phone format appears valid', 'Be cautious of unsolicited calls']
      }
    } else {
      const hasSpecialChars = /[^a-zA-Z0-9_-]/.test(username)
      const isShort = username.length < 3
      const hasRandomPattern = /^[a-z]{1,2}\d{6,}$/.test(username)
      
      let risk = 10
      const warnings: string[] = []
      const recommendations: string[] = []

      if (hasSpecialChars) {
        risk += 20
        warnings.push('Username contains unusual special characters')
      }
      if (isShort) {
        risk += 15
        warnings.push('Username is unusually short')
      }
      if (hasRandomPattern) {
        risk += 25
        warnings.push('Username follows bot-like pattern')
        recommendations.push('Check account creation date and activity')
      }

      identityResult = {
        type: 'username',
        value: username,
        riskProbability: Math.min(risk, 85),
        isValid: !hasSpecialChars && !isShort,
        warnings,
        recommendations: recommendations.length ? recommendations : ['Username appears normal', 'Verify account authenticity through profile']
      }
    }

    setResult(identityResult)
    setIsAnalyzing(false)
  }

  return (
    <>
      <Navbar />
      <QuantumGuardLayout
        title="Identity Checker"
        description="Verify emails, phone numbers, and usernames for authenticity"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Input Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Enter Identity to Check</h3>
            
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setPhone("")
                    setUsername("")
                  }}
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="text-center text-gray-500 font-medium">OR</div>

              {/* Phone Input */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setEmail("")
                    setUsername("")
                  }}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="text-center text-gray-500 font-medium">OR</div>

              {/* Username Input */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  <span>Social Media Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setEmail("")
                    setPhone("")
                  }}
                  placeholder="@username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <Button
              onClick={analyzeIdentity}
              disabled={isAnalyzing || (!email && !phone && !username)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing Identity...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Check Identity
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
              {/* Risk Assessment */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {result.type === 'email' && <Mail className="w-8 h-8 text-blue-600" />}
                    {result.type === 'phone' && <Phone className="w-8 h-8 text-blue-600" />}
                    {result.type === 'username' && <User className="w-8 h-8 text-blue-600" />}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 capitalize">{result.type} Analysis</h3>
                      <p className="text-gray-600">{result.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {result.isValid ? (
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    ) : (
                      <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                    )}
                    <div className="text-sm font-medium text-gray-600">
                      {result.isValid ? 'Valid Format' : 'Invalid Format'}
                    </div>
                  </div>
                </div>

                {/* Risk Meter */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Risk Probability</span>
                    <span className={`text-2xl font-bold ${
                      result.riskProbability < 30 ? 'text-green-600' :
                      result.riskProbability < 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {result.riskProbability}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.riskProbability}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${
                        result.riskProbability < 30 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        result.riskProbability < 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  result.riskProbability < 30 ? 'bg-green-100 text-green-700' :
                  result.riskProbability < 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">
                    {result.riskProbability < 30 ? 'Low Risk - Appears Safe' :
                     result.riskProbability < 60 ? 'Medium Risk - Exercise Caution' :
                     'High Risk - Potentially Dangerous'}
                  </span>
                </div>
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 shadow-xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <h4 className="text-xl font-bold text-gray-900">Security Warnings</h4>
                  </div>
                  <ul className="space-y-3">
                    {result.warnings.map((warning, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                        <span className="text-gray-700">{warning}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">Recommendations</h4>
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
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
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
