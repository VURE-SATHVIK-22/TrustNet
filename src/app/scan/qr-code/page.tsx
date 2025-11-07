"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { QrCode, Upload, Camera, Scan, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function QRCodeScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    
    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64data = reader.result as string
        
        try {
          const response = await fetch("http://localhost:8000/analyze/qr-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_data: base64data })
          })

          const data = await response.json()
          
          setResult({
            url: data.decoded_content || "Could not decode QR code",
            trustScore: data.trust_score,
            status: data.risk_category,
            details: data.explanations?.join(". ") || "Analysis complete",
            confidence: data.confidence,
            features: data.features
          })
        } catch (error) {
          console.error("Analysis failed:", error)
          setResult({
            url: "Error",
            trustScore: 0,
            status: "Error",
            details: "Failed to analyze QR code. Make sure the backend is running."
          })
        } finally {
          setIsScanning(false)
        }
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("File read error:", error)
      setIsScanning(false)
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
                <QrCode className="h-12 w-12 text-blue-600" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                QR Code Scanner
              </h1>
              <p className="text-lg text-gray-600">
                Scan and verify QR codes for security threats
              </p>
            </div>

            {/* Upload Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Upload QR Code Image</CardTitle>
                <CardDescription>
                  Upload an image containing a QR code to analyze its safety
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="flex gap-4">
                    <Button className="flex-1" variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Use Camera
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <Scan className="h-4 w-4 mr-2" />
                      Paste from Clipboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scanning State */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Scan className="h-16 w-16 text-blue-600" />
                </motion.div>
                <p className="mt-4 text-lg text-gray-600">Analyzing QR code...</p>
              </motion.div>
            )}

            {/* Results */}
            {result && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Scan Results</CardTitle>
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
                      <p className="text-sm text-gray-600 mb-1">Destination URL</p>
                      <p className="font-mono text-sm bg-gray-50 p-3 rounded">{result.url}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Trust Score</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${
                              result.trustScore >= 70 ? "bg-green-500" :
                              result.trustScore >= 40 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${result.trustScore}%` }}
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
