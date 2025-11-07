"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link as LinkIcon, Search, AlertTriangle, CheckCircle, XCircle, Loader2, ExternalLink, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function LinkScanPage() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!url.trim()) return

    // Basic URL validation
    if (!url.match(/^https?:\/\/.+/)) {
      alert("Please enter a valid URL starting with http:// or https://")
      return
    }

    setIsAnalyzing(true)
    
    try {
      const response = await fetch("http://localhost:8000/analyze/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze()
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block p-4 bg-blue-100 rounded-full mb-4"
              >
                <LinkIcon className="h-12 w-12 text-blue-600" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Link Analyzer
              </h1>
              <p className="text-lg text-gray-600">
                Check URLs for phishing, malware, and security threats
              </p>
            </div>

            {/* Input Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Enter URL to Analyze</CardTitle>
                <CardDescription>
                  Paste any suspicious link to check its safety
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="h-12 pl-10"
                    />
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !url.trim()}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick Examples */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "https://www.google.com",
                      "https://github.com",
                      "http://suspicious-site.tk"
                    ].map((example) => (
                      <button
                        key={example}
                        onClick={() => setUrl(example)}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Analysis Results</CardTitle>
                      {result.risk_category === "Safe" ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : result.risk_category === "Suspicious" ? (
                        <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* URL Display */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Analyzed URL</p>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <code className="flex-1 text-sm break-all">{url}</code>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Trust Score */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Trust Score</p>
                        <span className="text-2xl font-bold">{result.trust_score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            result.trust_score >= 70 ? "bg-green-500" :
                            result.trust_score >= 40 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${result.trust_score}%` }}
                        />
                      </div>
                    </div>

                    {/* Risk Category */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Risk Category</p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                        result.risk_category === "Safe" ? "bg-green-100 text-green-800" :
                        result.risk_category === "Suspicious" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {result.risk_category}
                      </span>
                    </div>

                    {/* Security Features */}
                    {result.features && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Security Features</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Shield className={`h-5 w-5 ${result.features.has_https ? "text-green-600" : "text-red-600"}`} />
                            <div>
                              <p className="text-xs text-gray-600">HTTPS</p>
                              <p className="text-sm font-medium">{result.features.has_https ? "Secure" : "Not Secure"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <LinkIcon className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-600">URL Length</p>
                              <p className="text-sm font-medium">{result.features.url_length} chars</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Explanations */}
                    {result.explanations && result.explanations.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Findings</p>
                        <ul className="space-y-2">
                          {result.explanations.map((explanation: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{explanation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Processing Time */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Analysis Time</span>
                        <span className="font-medium">{result.processing_time?.toFixed(2) || "N/A"} ms</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-gray-600">Confidence Level</span>
                        <span className="font-medium">{result.confidence}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Real-time Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Instant security checks using advanced ML algorithms
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">High Accuracy</h3>
                  <p className="text-sm text-gray-600">
                    95%+ accuracy in detecting phishing and malware
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mb-3" />
                  <h3 className="font-semibold mb-2">Threat Detection</h3>
                  <p className="text-sm text-gray-600">
                    Identifies suspicious patterns and known threats
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
