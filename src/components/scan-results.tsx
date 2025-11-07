"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle, Brain, Download, Shield, Zap, Eye, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GSAPAnimations } from "@/lib/gsap-animations"
import type { AdvancedScanResult } from "@/lib/advanced-ml-engine"

interface ScanResultsProps {
  result: AdvancedScanResult
  inputText: string
}

export function ScanResults({ result, inputText }: ScanResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trustScoreRef = useRef<HTMLDivElement>(null)
  const progressBarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      GSAPAnimations.animateResultReveal(containerRef.current, result.trustScore)
    }

    // Animate explanations with highlights
    const highlightElements = document.querySelectorAll('.risk-highlight')
    if (highlightElements.length > 0) {
      GSAPAnimations.animateHighlights(highlightElements)
    }
  }, [result])

  const getStatusIcon = () => {
    switch (result.category) {
      case 'Safe':
        return <CheckCircle className="h-8 w-8 text-green-600" />
      case 'Suspicious':
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />
      case 'Dangerous':
        return <XCircle className="h-8 w-8 text-red-600" />
    }
  }

  const getStatusColor = () => {
    switch (result.category) {
      case 'Safe':
        return 'text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-200'
      case 'Suspicious':
        return 'text-yellow-700 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
      case 'Dangerous':
        return 'text-red-700 bg-gradient-to-r from-red-50 to-red-100 border-red-200'
    }
  }

  const getTrustScoreColor = () => {
    if (result.trustScore >= 70) return 'text-green-600'
    if (result.trustScore >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGradientColor = () => {
    if (result.trustScore >= 70) return 'from-green-500 to-emerald-500'
    if (result.trustScore >= 40) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-rose-500'
  }

  return (
    <div ref={containerRef} className="space-y-8 max-w-6xl mx-auto">
      {/* Main Trust Score Display */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
          <CardContent className="p-12 relative z-10">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center space-x-4">
                {getStatusIcon()}
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">Trust Analysis</h2>
                  <p className="text-gray-600 mt-2">Confidence: {Math.round(result.confidence * 100)}%</p>
                </div>
              </div>

              <div className="relative">
                <div className="w-48 h-48 mx-auto relative">
                  {/* Circular Progress */}
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${result.trustScore * 2.51} 251`}
                      strokeLinecap="round"
                      className={`text-gradient bg-gradient-to-r ${getGradientColor()}`}
                      style={{
                        background: `conic-gradient(from 0deg, ${result.trustScore >= 70 ? '#10b981' : result.trustScore >= 40 ? '#f59e0b' : '#ef4444'} ${result.trustScore}%, #e5e7eb 0%)`
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-5xl font-bold trust-score ${getTrustScoreColor()}`}>
                        {result.trustScore}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Trust Score</div>
                    </div>
                  </div>
                </div>
              </div>

              <Badge className={`${getStatusColor()} text-lg px-6 py-3 font-semibold`}>
                {result.category}
              </Badge>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NLP Analysis */}
        <Card className="border-0 shadow-xl" data-slide-left>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Brain className="h-6 w-6 text-purple-600" />
              <span>Content Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Phishing Probability</span>
                  <span className="font-semibold">{Math.round(result.nlpAnalysis.phishingProbability * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <Progress value={result.nlpAnalysis.phishingProbability * 100} className="h-3" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Urgency Score</span>
                  <span className="font-semibold">{Math.round(result.nlpAnalysis.urgencyScore * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <Progress value={result.nlpAnalysis.urgencyScore * 100} className="h-3" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Language Analysis</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Tone:</span>
                  <Badge variant="outline" className="ml-2 capitalize">
                    {result.nlpAnalysis.languageTone}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Spelling Issues:</span>
                  <span className="ml-2 font-semibold">{result.nlpAnalysis.spellingAnomalies}</span>
                </div>
              </div>
            </div>

            {result.nlpAnalysis.suspiciousKeywords.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Suspicious Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.nlpAnalysis.suspiciousKeywords.slice(0, 8).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="risk-highlight text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* URL Analysis */}
        <Card className="border-0 shadow-xl" data-slide-right>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <span>URL Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Malicious Probability</span>
                <span className="font-semibold">{Math.round(result.urlAnalysis.maliciousProbability * 100)}%</span>
              </div>
              <div className="progress-bar">
                <Progress value={result.urlAnalysis.maliciousProbability * 100} className="h-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result.urlAnalysis.features.hasHTTPS ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>HTTPS: {result.urlAnalysis.features.hasHTTPS ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${result.urlAnalysis.features.hasIP ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span>IP Address: {result.urlAnalysis.features.hasIP ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <span className="text-gray-600">URL Length:</span>
                <span className="ml-2 font-semibold">{result.urlAnalysis.features.urlLength}</span>
              </div>
              <div>
                <span className="text-gray-600">Suspicious Chars:</span>
                <span className="ml-2 font-semibold">{result.urlAnalysis.features.suspiciousChars}</span>
              </div>
            </div>

            {result.urlAnalysis.riskFactors.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  {result.urlAnalysis.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Emotional Tone Analysis */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-orange-600" />
            <span>Emotional Manipulation Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(result.emotionalManipulation).map(([emotion, score]) => (
              <div key={emotion} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="capitalize font-medium text-gray-700">
                    {emotion.replace('_', ' ')}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {Math.round(score * 100)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <Progress value={score * 100} className="h-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Explanations */}
      {result.explanations.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Eye className="h-6 w-6 text-indigo-600" />
              <span>Risk Explanations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.explanations.map((explanation, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    explanation.risk === 'high'
                      ? 'bg-red-50 border-red-400'
                      : explanation.risk === 'medium'
                      ? 'bg-yellow-50 border-yellow-400'
                      : 'bg-blue-50 border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono bg-white px-3 py-1 rounded shadow-sm">
                      {explanation.text}
                    </code>
                    <Badge
                      variant={explanation.risk === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {explanation.risk} risk
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{explanation.explanation}</p>
                  <div className="mt-2 text-xs text-gray-500 capitalize">
                    Type: {explanation.type.replace('_', ' ')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" className="flex-1">
              View Awareness Tips
            </Button>
            <Button variant="outline" className="flex-1">
              Mark Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}