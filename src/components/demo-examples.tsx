"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle, Play } from "lucide-react"
import { demoPhishingEmails, demoSuspiciousUrls } from "@/lib/demo-data"

interface DemoExamplesProps {
  onTryExample: (content: string) => void
}

export function DemoExamples({ onTryExample }: DemoExamplesProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Safe':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Suspicious':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'Phishing':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'Suspicious':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Phishing':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Try Demo Examples</h2>
        <p className="text-gray-600">Test our AI with these real-world examples</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Examples */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Examples</h3>
          <div className="space-y-4">
            {demoPhishingEmails.map((email, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium truncate">
                        {email.subject}
                      </CardTitle>
                      <Badge className={`${getStatusColor(email.expectedStatus)} text-xs px-2 py-1`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(email.expectedStatus)}
                          <span>{email.expectedStatus}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {email.content.substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Expected Score: {email.expectedScore}%
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onTryExample(email.content)}
                        className="flex items-center space-x-1"
                      >
                        <Play className="h-3 w-3" />
                        <span>Try This</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* URL Examples */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">URL Examples</h3>
          <div className="space-y-4">
            {demoSuspiciousUrls.map((urlExample, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusColor(urlExample.expectedStatus)} text-xs px-2 py-1`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(urlExample.expectedStatus)}
                          <span>{urlExample.expectedStatus}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-mono text-gray-900 mb-4 break-all">
                      {urlExample.url}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Expected Score: {urlExample.expectedScore}%
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onTryExample(urlExample.url)}
                        className="flex items-center space-x-1"
                      >
                        <Play className="h-3 w-3" />
                        <span>Try This</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}