"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Eye, Brain, Mail, Link, Globe } from "lucide-react"

const awarenessCards = [
  {
    icon: Mail,
    title: "Email Phishing",
    description: "Learn to identify suspicious emails and protect yourself from email-based attacks.",
    tips: [
      "Check sender's email address carefully",
      "Look for urgent language and threats",
      "Verify links before clicking",
      "Be wary of unexpected attachments"
    ],
    risk: "high"
  },
  {
    icon: Link,
    title: "Malicious URLs",
    description: "Understand how to spot dangerous links and avoid clicking on them.",
    tips: [
      "Hover over links to see actual destination",
      "Check for HTTPS encryption",
      "Be suspicious of shortened URLs",
      "Look for misspelled domain names"
    ],
    risk: "medium"
  },
  {
    icon: Globe,
    title: "Fake Websites",
    description: "Recognize cloned websites designed to steal your credentials.",
    tips: [
      "Verify the website URL carefully",
      "Look for security certificates",
      "Check for professional design quality",
      "Be cautious with login pages"
    ],
    risk: "high"
  },
  {
    icon: Brain,
    title: "Social Engineering",
    description: "Understand psychological tactics used by cybercriminals.",
    tips: [
      "Question urgent requests for information",
      "Verify identity through separate channels",
      "Don't trust caller ID completely",
      "Be skeptical of too-good-to-be-true offers"
    ],
    risk: "medium"
  }
]

const realExamples = [
  {
    type: "Email",
    subject: "Urgent: Your account will be suspended",
    content: "Dear Customer, Your account has been flagged for suspicious activity. Click here to verify your identity within 24 hours or your account will be permanently suspended.",
    redFlags: [
      "Generic greeting",
      "Urgent language",
      "Threat of account suspension",
      "Suspicious link"
    ]
  },
  {
    type: "URL",
    subject: "Fake Banking Website",
    content: "http://bank-of-america-security.com/login",
    redFlags: [
      "Not HTTPS",
      "Suspicious domain name",
      "Extra hyphens in domain",
      "Not official bank domain"
    ]
  }
]

export default function Awareness() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Security Awareness</h1>
            <p className="text-gray-600 mt-2">Learn to identify and protect yourself from phishing attacks</p>
          </div>

          {/* Awareness Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {awarenessCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <card.icon className="h-5 w-5 text-blue-600" />
                        <span>{card.title}</span>
                      </CardTitle>
                      <Badge 
                        variant={card.risk === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {card.risk} risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-900">Key Tips:</h4>
                      <ul className="space-y-1">
                        {card.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Real Examples Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Phishing Examples</h2>
            <div className="space-y-6">
              {realExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span>{example.type} Example</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-semibold text-red-900 mb-2">{example.subject}</h4>
                          <p className="text-red-800 text-sm font-mono">{example.content}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Red Flags:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {example.redFlags.map((flag, flagIndex) => (
                              <div key={flagIndex} className="flex items-center space-x-2">
                                <Shield className="h-4 w-4 text-red-600" />
                                <span className="text-sm text-gray-700">{flag}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span>Best Practices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Do:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Verify sender identity through separate channels</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Use two-factor authentication</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Keep software updated</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Report suspicious emails</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Don't:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Click suspicious links or attachments</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Share personal information via email</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Trust urgent requests without verification</span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Use the same password everywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}