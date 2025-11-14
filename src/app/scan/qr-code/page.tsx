"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { QrCode, Upload, Camera, Scan, AlertTriangle, CheckCircle, XCircle, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function QRCodeScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showBackendWarning, setShowBackendWarning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PNG or JPG image')
      return
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 10MB')
      return
    }

    setIsScanning(true)
    
    try {
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
          setShowBackendWarning(true)
          setResult({
            url: "Backend Not Available",
            trustScore: 0,
            status: "Error",
            details: "Could not connect to the ML backend server. Please start the backend by running: python start-ml-backend.py"
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await processFile(file)
  }

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return
    await processFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  // Automatically generate QR codes using QR Server API
  const exampleQRCodes = [
    {
      title: "Scan to Visit TrustNet",
      url: "https://trustnet.example.com",
      qrData: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("https://trustnet.example.com")}&bgcolor=ffffff&color=2563eb`,
      description: "Official TrustNet Website"
    },
    {
      title: "Scan to View GitHub Repo",
      url: "https://github.com/trustnet-demo",
      qrData: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("https://github.com/trustnet-demo")}&bgcolor=ffffff&color=2563eb`,
      description: "Demo Repository"
    },
    {
      title: "Scan to Contact Support",
      url: "https://trustnet.example.com/contact",
      qrData: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent("https://trustnet.example.com/contact")}&bgcolor=ffffff&color=2563eb`,
      description: "Contact Form"
    }
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12">
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

            {/* Backend Warning Banner */}
            {showBackendWarning && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="border-orange-300 bg-orange-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-orange-900 mb-2">ML Backend Not Running</h3>
                        <p className="text-sm text-orange-800 mb-3">
                          The machine learning backend server is not available. To enable QR code analysis, please start the backend.
                        </p>
                        <div className="bg-orange-100 rounded-lg p-3 font-mono text-sm text-orange-900">
                          <p className="mb-1">Open a new terminal and run:</p>
                          <code className="block bg-white px-3 py-2 rounded mt-2">python start-ml-backend.py</code>
                        </div>
                        <Button
                          onClick={() => setShowBackendWarning(false)}
                          variant="outline"
                          size="sm"
                          className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Educational Section */}
            <Card className="mb-8 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-blue-900">How QR Code Scanning Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">🔍 Why It Happens</h4>
                  <p className="text-sm">
                    When you scan a QR code, it triggers your device to decode the embedded data (usually a URL, email, or text). 
                    Your browser or app then processes this information and redirects you to the intended destination.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">⚙️ How It Works</h4>
                  <p className="text-sm">
                    QR codes contain encoded data in a 2D matrix format. When scanned, your device's camera captures the image, 
                    decodes the pattern, and extracts the URL or information. This uses image recognition and data decoding algorithms 
                    to convert the visual pattern into actionable data.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">🛡️ Importance of Verification</h4>
                  <p className="text-sm">
                    Scanning QR codes through TrustNet ensures the destination is safe before you visit it. Malicious QR codes can 
                    redirect to phishing sites or trigger unwanted downloads. Always verify QR codes from unknown sources to protect 
                    your data and device security.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Upload Section */}
              <Card>
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
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer group ${
                        isDragging 
                          ? 'border-blue-600 bg-blue-50 scale-105' 
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: isDragging ? 1.1 : 1 }}
                        className="inline-block"
                      >
                        <Upload className={`h-12 w-12 mx-auto mb-4 transition-colors ${
                          isDragging 
                            ? 'text-blue-600' 
                            : 'text-gray-400 group-hover:text-blue-500'
                        }`} />
                      </motion.div>
                      <p className={`mb-2 font-medium ${
                        isDragging ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {isDragging ? 'Drop your QR code image here' : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      {isDragging && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-blue-600 mt-2"
                        >
                          Release to upload
                        </motion.p>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
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
                        Paste
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example QR Codes */}
              <Card>
                <CardHeader>
                  <CardTitle>Try These Example QR Codes</CardTitle>
                  <CardDescription>
                    Scan these safe QR codes to test the scanner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {exampleQRCodes.map((qr, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="text-center group cursor-pointer"
                      >
                        <div className="bg-white p-3 rounded-lg shadow-md group-hover:shadow-xl transition-all border-2 border-transparent group-hover:border-blue-500">
                          <img 
                            src={qr.qrData} 
                            alt={qr.title}
                            className="w-full h-auto rounded"
                          />
                        </div>
                        <p className="text-xs font-semibold mt-2 text-gray-700">{qr.title}</p>
                        <p className="text-xs text-gray-500">{qr.description}</p>
                        <a 
                          href={qr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center justify-center gap-1 mt-1"
                        >
                          Visit <ExternalLink className="h-3 w-3" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

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
                      <p className="font-mono text-sm bg-gray-50 p-3 rounded break-all">{result.url}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Trust Score</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
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
