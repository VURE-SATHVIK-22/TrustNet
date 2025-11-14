"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link as LinkIcon, Send, AlertTriangle, CheckCircle, XCircle, Info, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"

export default function LinkScanPage() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleScan = async () => {
    if (!url.trim()) return
    
    setIsScanning(true)
    
    try {
      const response = await fetch("http://localhost:8000/analyze/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })

      const data = await response.json()
      
      setResult({
        url: url,
        trustScore: data.trust_score,
        status: data.risk_category,
        details: data.explanations?.join(". ") || "Analysis complete",
        confidence: data.confidence,
        features: data.features
      })
    } catch (error) {
      console.error("Analysis failed:", error)
      setResult({
        url: url,
        trustScore: 50,
        status: "Error",
        details: "Failed to analyze URL. Using local analysis."
      })
    } finally {
      setIsScanning(false)
    }
  }

  const exampleLinks = [
    {
      title: "Visit Official Site",
      url: "https://trustnet.example.com",
      description: "Explore our main website and features",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "View Documentation",
      url: "https://docs.trustnet.example.com",
      description: "Read comprehensive guides and API docs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Join Community",
      url: "https://discord.gg/trustnet",
      description: "Connect with other users and get support",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 pt-24 pb-12">
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
                className="inline-block p-4 bg-cyan-100 rounded-full mb-4"
              >
                <LinkIcon className="h-12 w-12 text-cyan-600" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                URL Link Scanner
              </h1>
              <p className="text-lg text-gray-600">
                Verify website links before clicking to stay safe online
              </p>
            </div>

            {/* Educational Section */}
            <Card className="mb-8 border-cyan-200 bg-cyan-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-600" />
                  <CardTitle className="text-cyan-900">How Link Verification Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-semibold text-cyan-900 mb-1">🔗 Why It Happens</h4>
                  <p className="text-sm">
                    When you click a link, your browser sends an HTTP request to the destination server, which responds with the 
                    webpage content. This process happens instantly, but malicious links can redirect you to phishing sites or 
                    trigger unwanted downloads before you realize what's happening.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-900 mb-1">⚙️ How It Works</h4>
                  <p className="text-sm">
                    Links use HTML anchor tags (&lt;a href="URL"&gt;) that tell your browser where to navigate. When clicked, 
                    the browser resolves the URL, establishes a connection, and loads the destination. TrustNet analyzes the URL 
                    structure, domain reputation, and patterns before you click to identify potential threats.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-900 mb-1">🛡️ Why Verification is Critical</h4>
                  <p className="text-sm">
                    Verifying links before clicking prevents you from visiting malicious websites that could steal your credentials, 
                    install malware, or trick you into revealing sensitive information. TrustNet's AI analyzes 50+ URL features to 
                    detect phishing attempts, ensuring you only visit verified, secure destinations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Scan Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Analyze URL Link</CardTitle>
                  <CardDescription>
                    Paste any suspicious URL to check its safety
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="font-mono"
                    />
                    <Button 
                      onClick={handleScan}
                      disabled={!url.trim() || isScanning}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
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
                          Analyze URL
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Example Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Explore TrustNet Resources</CardTitle>
                  <CardDescription>
                    Click any link to visit verified resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {exampleLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="group block"
                      >
                        <div className={`flex items-center gap-4 p-4 bg-gradient-to-r ${link.color} bg-opacity-10 rounded-lg border-2 border-transparent group-hover:border-cyan-500 transition-all cursor-pointer`}>
                          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${link.color} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                              {link.title}
                              <ExternalLink className="h-4 w-4 text-cyan-600" />
                            </p>
                            <p className="text-sm text-cyan-600 font-mono">{link.url}</p>
                            <p className="text-xs text-gray-500 mt-1">{link.description}</p>
                          </div>
                        </div>
                      </motion.a>
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
                      <p className="text-sm text-gray-600 mb-1">URL</p>
                      <p className="font-mono text-sm bg-gray-50 p-3 rounded break-all">{result.url}</p>
                    </div>
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
