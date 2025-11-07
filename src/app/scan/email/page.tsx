"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function EmailScanPage() {
  const [subject, setSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return

    setIsAnalyzing(true)
    
    try {
      const response = await fetch("http://localhost:8000/analyze/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailContent, subject })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
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
                <Mail className="h-12 w-12 text-blue-600" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Email Phishing Checker
              </h1>
              <p className="text-lg text-gray-600">
                Analyze emails for phishing attempts and malicious content
              </p>
            </div>

            {/* Input Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Email Content</CardTitle>
                <CardDescription>
                  Paste the email subject and body to analyze
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Subject (Optional)
                  </label>
                  <Input
                    placeholder="Email subject line..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Body
                  </label>
                  <Textarea
                    placeholder="Paste email content here..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !emailContent.trim()}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Analyze Email
                    </>
                  )}
                </Button>
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

                    {/* Confidence */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Confidence Level</span>
                        <span className="font-medium">{result.confidence}%</span>
                      </div>
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
