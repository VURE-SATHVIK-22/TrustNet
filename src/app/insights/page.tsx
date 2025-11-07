"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, Shield, Globe, Mail, Link, Calendar, Code, FileText, User, Clock, Brain } from "lucide-react"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"

const trendingThreats = [
  { domain: "fake-paypal-security.com", count: 23, trend: "up" },
  { domain: "amazon-verification.net", count: 18, trend: "up" },
  { domain: "microsoft-support.org", count: 15, trend: "down" },
  { domain: "bank-security-alert.com", count: 12, trend: "up" },
  { domain: "apple-id-locked.info", count: 9, trend: "stable" }
]

const phishingPhrases = [
  { phrase: "urgent action required", frequency: 45 },
  { phrase: "verify your account", frequency: 38 },
  { phrase: "suspended account", frequency: 32 },
  { phrase: "click here immediately", frequency: 28 },
  { phrase: "limited time offer", frequency: 24 }
]

const weeklyStats = [
  { day: "Mon", safe: 45, suspicious: 8, phishing: 3 },
  { day: "Tue", safe: 52, suspicious: 12, phishing: 5 },
  { day: "Wed", safe: 38, suspicious: 6, phishing: 2 },
  { day: "Thu", safe: 41, suspicious: 9, phishing: 4 },
  { day: "Fri", safe: 48, suspicious: 11, phishing: 6 },
  { day: "Sat", safe: 35, suspicious: 5, phishing: 1 },
  { day: "Sun", safe: 29, suspicious: 4, phishing: 2 }
]

// Timeline data for threat analysis workflow
const threatTimelineData = [
  {
    id: 1,
    title: "Detection",
    date: "Real-time",
    content: "AI models continuously scan and detect potential phishing threats across emails and URLs.",
    category: "Detection",
    icon: Shield,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Analysis",
    date: "< 500ms",
    content: "Advanced feature extraction and ensemble model scoring provide detailed threat assessment.",
    category: "Analysis",
    icon: Brain,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Classification",
    date: "Instant",
    content: "Threats are classified as Safe, Suspicious, or Dangerous with confidence scoring.",
    category: "Classification",
    icon: FileText,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 4,
    title: "Response",
    date: "Immediate",
    content: "Users receive detailed explanations and actionable recommendations for protection.",
    category: "Response",
    icon: User,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 5,
    title: "Learning",
    date: "Continuous",
    content: "System learns from new threats and user feedback to improve detection accuracy.",
    category: "Learning",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 60,
  },
]

export default function Insights() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-600" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-green-600 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const maxCount = Math.max(...weeklyStats.map(stat => stat.safe + stat.suspicious + stat.phishing))

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
            <h1 className="text-3xl font-bold text-gray-900">Security Insights</h1>
            <p className="text-gray-600 mt-2">Analyze phishing trends and threat patterns</p>
          </div>

          {/* Weekly Activity Chart */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Weekly Scan Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat, index) => (
                  <motion.div
                    key={stat.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {stat.day}
                    </div>
                    <div className="flex-1 flex items-center space-x-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 flex overflow-hidden">
                        <div
                          className="bg-green-500 h-full"
                          style={{ width: `${(stat.safe / maxCount) * 100}%` }}
                        />
                        <div
                          className="bg-yellow-500 h-full"
                          style={{ width: `${(stat.suspicious / maxCount) * 100}%` }}
                        />
                        <div
                          className="bg-red-500 h-full"
                          style={{ width: `${(stat.phishing / maxCount) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-green-600">{stat.safe}</span>
                      <span className="text-yellow-600">{stat.suspicious}</span>
                      <span className="text-red-600">{stat.phishing}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span>Suspicious</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Phishing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Trending Phishing Domains */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-red-600" />
                  <span>Trending Phishing Domains</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingThreats.map((threat, index) => (
                    <motion.div
                      key={threat.domain}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-mono text-sm text-gray-900">{threat.domain}</div>
                        <div className="text-xs text-gray-500">{threat.count} detections</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(threat.trend)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Phishing Phrases */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-yellow-600" />
                  <span>Common Phishing Phrases</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phishingPhrases.map((phrase, index) => (
                    <motion.div
                      key={phrase.phrase}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">"{phrase.phrase}"</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(phrase.frequency / 50) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-sm font-medium text-gray-600">
                        {phrase.frequency}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Threat Analysis Workflow - Radial Timeline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              TrustNet Threat Analysis Workflow
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <RadialOrbitalTimeline timelineData={threatTimelineData} />
            </div>
          </div>

          {/* Threat Intelligence Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Threats</p>
                    <p className="text-2xl font-bold text-red-600">47</p>
                    <p className="text-xs text-gray-500 mt-1">+12% from last week</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Blocked Attempts</p>
                    <p className="text-2xl font-bold text-green-600">1,247</p>
                    <p className="text-xs text-gray-500 mt-1">+8% from last week</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Domains</p>
                    <p className="text-2xl font-bold text-blue-600">23</p>
                    <p className="text-xs text-gray-500 mt-1">-5% from last week</p>
                  </div>
                  <Link className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}