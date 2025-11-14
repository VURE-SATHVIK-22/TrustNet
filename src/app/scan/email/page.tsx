"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, AlertTriangle, CheckCircle, XCircle, Info, ExternalLink, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Textarea } from "@/components/ui/textarea"

export default function EmailScanPage() {
  const [emailContent, setEmailContent] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const handleScan = async () => {
    if (!emailContent.trim()) return
    
    setIsScanning(true)
    
    try {
      const response = await fetch("http://localhost:8000/analyze/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailContent, subject: "" })
      })

      const data = await response.json()
      
      setResult({
        trustScore: data.trust_score,
        status: data.risk_category,
        details: data.explanations?.join(". ") || "Analysis complete",
        confidence: data.confidence
      })
    } catch (error) {
      console.error("Analysis failed:", error)
      setResult({
        trustScore: 50,
        status: "Error",
        details: "Failed to analyze email. Using local analysis."
      })
    } finally {
      setIsScanning(false)
    }
  }

  const exampleEmails = [
    {
      email: "support@trustnet.com",
      label: "Technical Support",
      description: "Get help with technical issues",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      email: "info@trustnet.com",
      label: "General Information",
      description: "Learn more about our services",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      email: "contact@trustnet.com",
      label: "General Contact",
      description: "Reach out for any inquiries",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block p-4 bg-purple-100 rounded-full mb-4"
              >
                <Mail className="h-12 w-12 text-purple-600" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Email Content Scanner
              </h1>
              <p className="text-lg text-gray-600">
                Analyze email content for phishing attempts and security threats
              </p>
            </div>

            {/* Educational Section */}
            <Card className="mb-8 border-purple-200 bg-purple-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-purple-900">How Email Analysis Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">📧 Why It Works</h4>
                  <p className="text-sm">
                    When you click an email address, your device uses the "mailto:" protocol to automatically open your default 
                    email client (like Gmail, Outlook, or Apple Mail) with the recipient address pre-filled. This is a standard 
                    HTML feature that triggers email app actions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">⚙️ How It Works</h4>
                  <p className="text-sm">
                    Email links use HTML anchor tags with "mailto:" protocol (e.g., &lt;a href="mailto:support@trustnet.com"&gt;). 
                    When clicked, your operating system detects this protocol and launches the associated email application, 
                    creating a new message addressed to the specified recipient.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">🛡️ Why Verification Matters</h4>
                  <p className="text-sm">
                    Verifying email content before responding is crucial. Phishing emails often impersonate legitimate companies 
                    to steal credentials or sensitive information. TrustNet analyzes email patterns, urgency tactics, and 
                    suspicious keywords to help you identify potential threats before you engage.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Scan Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Analyze Email Content</CardTitle>
                  <CardDescription>
                    Paste suspicious email content to check for phishing attempts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Paste email content here..."
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <Button 
                      onClick={handleScan}
                      disabled={!emailContent.trim() || isScanning}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isScanning ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Send className="h-4 w-4" />
                          </motion.div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Analyze Email
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Example Emails */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact TrustNet</CardTitle>
                  <CardDescription>
                    Click any email to open your mail client
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {exampleEmails.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="group"
                      >
                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-transparent group-hover:border-purple-500 transition-all cursor-pointer">
                          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                            <a 
                              href={`mailto:${item.email}`}
                              className="text-purple-600 hover:text-purple-700 font-mono text-sm flex items-center gap-1"
                            >
                              {item.email}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              copyToClipboard(item.email)
                            }}
                            className="flex-shrink-0 p-2 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Copy email"
                          >
                            {copiedEmail === item.email ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {result && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Analysis Results</CardTitle>
                      {result.status === "Safe" ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : result.status === "Suspicious" ? (
                        <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Trust Score</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.trustScore}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-3 rounded-full ${
                              result.trustScore >= 70 ? "bg-green-500" :
                              result.trustScore >= 40 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                        <span className="font-bold text-lg">{result.trustScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Analysis</p>
                      <p className="text-gray-800">{result.details}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
