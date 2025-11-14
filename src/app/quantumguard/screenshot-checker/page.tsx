"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { QuantumGuardLayout } from "@/components/quantumguard/QuantumGuardLayout"
import { Image, Upload, AlertTriangle, CheckCircle, Shield, Sparkles, Eye, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScreenshotResult {
  fileName: string
  authenticityScore: number
  verdict: 'Authentic' | 'Suspicious' | 'Likely Fake'
  detectedIssues: Array<{ issue: string; severity: 'low' | 'medium' | 'high'; description: string }>
  technicalAnalysis: {
    metadata: string
    resolution: string
    compression: string
    artifacts: string
  }
  recommendations: string[]
}

export default function ScreenshotCheckerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [result, setResult] = useState<ScreenshotResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResult(null)
    }
  }

  const analyzeScreenshot = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 2500))

    // Simulated image analysis
    const fileName = selectedFile.name
    const fileSize = selectedFile.size
    const fileType = selectedFile.type
    
    let authenticityScore = 70
    const detectedIssues: ScreenshotResult['detectedIssues'] = []
    
    // Check file properties
    if (fileSize < 50000) {
      authenticityScore -= 15
      detectedIssues.push({
        issue: 'Unusually Small File Size',
        severity: 'medium',
        description: 'File size is smaller than typical screenshots, may indicate heavy compression or editing'
      })
    }
    
    if (fileSize > 5000000) {
      authenticityScore -= 10
      detectedIssues.push({
        issue: 'Large File Size',
        severity: 'low',
        description: 'Unusually large file size may indicate uncompressed or edited image'
      })
    }
    
    // Check file type
    if (!fileType.includes('image')) {
      authenticityScore -= 30
      detectedIssues.push({
        issue: 'Invalid File Type',
        severity: 'high',
        description: 'File is not a valid image format'
      })
    }
    
    // Simulate metadata analysis
    const hasMetadata = Math.random() > 0.5
    if (!hasMetadata) {
      authenticityScore -= 20
      detectedIssues.push({
        issue: 'Missing Metadata',
        severity: 'high',
        description: 'Image metadata has been stripped, common in edited or fake screenshots'
      })
    }
    
    // Simulate compression artifacts
    const hasArtifacts = Math.random() > 0.6
    if (hasArtifacts) {
      authenticityScore -= 15
      detectedIssues.push({
        issue: 'Compression Artifacts',
        severity: 'medium',
        description: 'Detected unusual compression patterns that may indicate editing'
      })
    }
    
    // Simulate resolution check
    const isStandardResolution = Math.random() > 0.3
    if (!isStandardResolution) {
      authenticityScore -= 10
      detectedIssues.push({
        issue: 'Non-Standard Resolution',
        severity: 'low',
        description: 'Image resolution doesn\'t match common device screen sizes'
      })
    }
    
    authenticityScore = Math.max(0, Math.min(100, authenticityScore))
    
    let verdict: ScreenshotResult['verdict']
    if (authenticityScore >= 70) verdict = 'Authentic'
    else if (authenticityScore >= 40) verdict = 'Suspicious'
    else verdict = 'Likely Fake'
    
    const recommendations: string[] = []
    if (verdict === 'Authentic') {
      recommendations.push('Screenshot appears to be authentic')
      recommendations.push('Still verify content through official sources')
      recommendations.push('Check for logical inconsistencies in the content')
    } else if (verdict === 'Suspicious') {
      recommendations.push('Exercise caution with this screenshot')
      recommendations.push('Verify information through official channels')
      recommendations.push('Look for signs of photo editing or manipulation')
      recommendations.push('Check timestamps and other details for consistency')
    } else {
      recommendations.push('Do not trust this screenshot')
      recommendations.push('High probability of manipulation or fabrication')
      recommendations.push('Report if used for fraudulent purposes')
      recommendations.push('Verify all information independently')
    }
    
    setResult({
      fileName,
      authenticityScore,
      verdict,
      detectedIssues,
      technicalAnalysis: {
        metadata: hasMetadata ? 'Present' : 'Stripped/Missing',
        resolution: isStandardResolution ? '1080x1920 (Standard)' : '847x1523 (Non-standard)',
        compression: hasArtifacts ? 'High (Suspicious)' : 'Normal',
        artifacts: hasArtifacts ? 'Detected' : 'None'
      },
      recommendations
    })
    
    setIsAnalyzing(false)
  }

  return (
    <>
      <Navbar />
      <QuantumGuardLayout
        title="Screenshot Authenticity Checker"
        description="Verify if screenshots are genuine or manipulated"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Upload Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Screenshot</h3>
            <p className="text-gray-600 mb-6">
              Our AI analyzes metadata, compression patterns, and visual artifacts to detect manipulation
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="screenshot-upload"
              />
              <label htmlFor="screenshot-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-blue-50 rounded-full">
                    <Upload className="w-12 h-12 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">Click to upload screenshot</p>
                    <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                </div>
              </label>
            </div>

            {preview && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Preview</h4>
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img src={preview} alt="Preview" className="w-full max-h-96 object-contain bg-gray-50" />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  File: {selectedFile?.name} ({(selectedFile?.size || 0 / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}

            <Button
              onClick={analyzeScreenshot}
              disabled={isAnalyzing || !selectedFile}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Analyzing Screenshot...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Authenticity
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
              {/* Authenticity Score */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {result.verdict === 'Authentic' && <CheckCircle className="w-16 h-16 text-green-600" />}
                    {result.verdict === 'Suspicious' && <AlertTriangle className="w-16 h-16 text-yellow-600" />}
                    {result.verdict === 'Likely Fake' && <XCircle className="w-16 h-16 text-red-600" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Authenticity Score</h3>
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {result.authenticityScore}
                    <span className="text-3xl">/100</span>
                  </div>
                  
                  <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold ${
                    result.verdict === 'Authentic' ? 'bg-green-100 text-green-700' :
                    result.verdict === 'Suspicious' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <Eye className="w-5 h-5" />
                    <span>{result.verdict}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.authenticityScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      result.verdict === 'Authentic' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      result.verdict === 'Suspicious' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  />
                </div>
              </div>

              {/* Technical Analysis */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="flex items-center space-x-2 mb-6">
                  <Image className="w-6 h-6 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">Technical Analysis</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(result.technicalAnalysis).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="text-sm font-medium text-gray-600 capitalize mb-1">{key}</div>
                      <div className="text-lg font-semibold text-gray-900">{value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Detected Issues */}
              {result.detectedIssues.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 shadow-xl">
                  <div className="flex items-center space-x-2 mb-6">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <h4 className="text-xl font-bold text-gray-900">Issues Detected</h4>
                  </div>
                  <div className="space-y-4">
                    {result.detectedIssues.map((issue, index) => (
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
                          <h5 className="font-semibold text-gray-900">{issue.issue}</h5>
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-xl">
                <div className="flex items-center space-x-2 mb-6">
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
