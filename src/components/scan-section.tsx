"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Shield, Zap, Brain, AlertTriangle, CheckCircle, XCircle, 
  Loader2, Upload, Link, Mail, FileText, Download, Copy,
  TrendingUp, Clock, Target, Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface AnalysisResult {
  trust_score: number
  risk_category: string
  confidence: number
  features: Record<string, any>
  explanations: string[]
  processing_time: number
  timestamp: string
}

interface ScanResult {
  id: string
  type: 'url' | 'email'
  input: string
  result: AnalysisResult
  timestamp: Date
}

const API_BASE_URL = "http://localhost:8000"

export function ScanSection() {
  const [activeTab, setActiveTab] = useState("url")
  const [urlInput, setUrlInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const analyzeURL = async (url: string): Promise<AnalysisResult> => {
    const response = await fetch(`${API_BASE_URL}/analyze/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`)
    }

    return response.json()
  }

  const analyzeEmail = async (text: string, subject: string = ""): Promise<AnalysisResult> => {
    const response = await fetch(`${API_BASE_URL}/analyze/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, subject }),
    })

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`)
    }

    return response.json()
  }

  const handleAnalyze = async () => {
    if (isAnalyzing) return

    const input = activeTab === 'url' ? urlInput.trim() : emailInput.trim()
    if (!input) {
      setError("Please enter a URL or email content to analyze")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90))
    }, 100)

    try {
      let result: AnalysisResult

      if (activeTab === 'url') {
        // Basic URL validation
        if (!urlInput.match(/^https?:\/\/.+/)) {
          throw new Error("Please enter a valid URL starting with http:// or https://")
        }
        result = await analyzeURL(urlInput)
      } else {
        result = await analyzeEmail(emailInput, emailSubject)
      }

      setProgress(100)
      
      const scanResult: ScanResult = {
        id: Date.now().toString(),
        type: activeTab as 'url' | 'email',
        input: activeTab === 'url' ? urlInput : `${emailSubject} ${emailInput}`.trim(),
        result,
        timestamp: new Date()
      }

      setCurrentResult(scanResult)
      setScanHistory(prev => [scanResult, ...prev.slice(0, 9)]) // Keep last 10 results

      // Clear inputs after successful analysis
      if (activeTab === 'url') {
        setUrlInput("")
      } else {
        setEmailInput("")
        setEmailSubject("")
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed")
    } finally {
      clearInterval(progressInterval)
      setIsAnalyzing(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (activeTab === 'email') {
        setEmailInput(content)
      }
    }
    reader.readAsText(file)
  }

  const getRiskColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'safe':
      case 'low risk':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'suspicious':
      case 'medium risk':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'high risk':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'critical risk':
      case 'dangerous':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'safe':
      case 'low risk':
        return <CheckCircle className="w-5 h-5" />
      case 'suspicious':
      case 'medium risk':
        return <AlertTriangle className="w-5 h-5" />
      case 'high risk':
      case 'critical risk':
      case 'dangerous':
        return <XCircle className="w-5 h-5" />
      default:
        return <Shield className="w-5 h-5" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section id="scanner" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Threat Scanner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze URLs and emails in real-time using advanced machine learning models. 
            Get instant threat assessments with detailed explanations.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Scanner Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <span>Threat Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    Enter a URL or email content to analyze for phishing and security threats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="url" className="flex items-center space-x-2">
                        <Link className="w-4 h-4" />
                        <span>URL Scanner</span>
                      </TabsTrigger>
                      <TabsTrigger value="email" className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email Scanner</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="url" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          URL to Analyze
                        </label>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="w-full"
                          disabled={isAnalyzing}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Subject (Optional)
                        </label>
                        <Input
                          placeholder="Email subject line"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          disabled={isAnalyzing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Content
                        </label>
                        <Textarea
                          placeholder="Paste email content here..."
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="min-h-[120px]"
                          disabled={isAnalyzing}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isAnalyzing}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload File
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".txt,.eml"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  {progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || (!urlInput.trim() && !emailInput.trim())}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Current Result */}
              <AnimatePresence>
                {currentResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            {getRiskIcon(currentResult.result.risk_category)}
                            <span>Analysis Result</span>
                          </span>
                          <Badge className={getRiskColor(currentResult.result.risk_category)}>
                            {currentResult.result.risk_category}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Trust Score */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Trust Score</span>
                            <span className="text-2xl font-bold text-blue-600">
                              {currentResult.result.trust_score.toFixed(1)}%
                            </span>
                          </div>
                          <Progress 
                            value={currentResult.result.trust_score} 
                            className="w-full h-2"
                          />
                        </div>

                        {/* Confidence */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Confidence</span>
                          <span className="text-sm text-gray-600">
                            {currentResult.result.confidence.toFixed(1)}%
                          </span>
                        </div>

                        {/* Processing Time */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Processing Time
                          </span>
                          <span className="text-sm text-gray-600">
                            {currentResult.result.processing_time.toFixed(0)}ms
                          </span>
                        </div>

                        {/* Explanations */}
                        {currentResult.result.explanations.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-sm font-medium">Risk Factors</span>
                            <div className="space-y-1">
                              {currentResult.result.explanations.map((explanation, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-gray-600 bg-gray-50 p-2 rounded flex items-start space-x-2"
                                >
                                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span>{explanation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(JSON.stringify(currentResult.result, null, 2))}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Result
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const dataStr = JSON.stringify(currentResult.result, null, 2)
                              const dataBlob = new Blob([dataStr], { type: 'application/json' })
                              const url = URL.createObjectURL(dataBlob)
                              const link = document.createElement('a')
                              link.href = url
                              link.download = `trustnet-analysis-${Date.now()}.json`
                              link.click()
                            }}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scan History */}
              {scanHistory.length > 0 && (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Recent Scans</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {scanHistory.map((scan) => (
                        <motion.div
                          key={scan.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => setCurrentResult(scan)}
                        >
                          <div className="flex items-center space-x-3">
                            {scan.type === 'url' ? (
                              <Link className="w-4 h-4 text-blue-500" />
                            ) : (
                              <Mail className="w-4 h-4 text-green-500" />
                            )}
                            <div>
                              <div className="text-sm font-medium truncate max-w-48">
                                {scan.input}
                              </div>
                              <div className="text-xs text-gray-500">
                                {scan.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                          <Badge 
                            className={`text-xs ${getRiskColor(scan.result.risk_category)}`}
                          >
                            {scan.result.trust_score.toFixed(0)}%
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {scanHistory.length}
                      </div>
                      <div className="text-sm opacity-90">
                        Scans Performed
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {scanHistory.filter(s => s.result.trust_score >= 75).length}
                      </div>
                      <div className="text-sm opacity-90">
                        Safe Results
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}