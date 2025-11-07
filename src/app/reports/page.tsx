"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

const mockReports = [
  {
    id: 1,
    date: "2024-11-03",
    time: "14:30",
    type: "URL",
    content: "https://suspicious-bank-login.com",
    status: "Phishing",
    trustScore: 15,
    threats: ["Fake domain", "No HTTPS", "Suspicious structure"]
  },
  {
    id: 2,
    date: "2024-11-03",
    time: "12:15",
    type: "Email",
    content: "Urgent: Verify your account immediately...",
    status: "Suspicious",
    trustScore: 35,
    threats: ["Urgent language", "Generic greeting", "Suspicious links"]
  },
  {
    id: 3,
    date: "2024-11-02",
    time: "16:45",
    type: "URL",
    content: "https://github.com/user/repo",
    status: "Safe",
    trustScore: 92,
    threats: []
  },
  {
    id: 4,
    date: "2024-11-02",
    time: "10:20",
    type: "Email",
    content: "Meeting reminder for tomorrow...",
    status: "Safe",
    trustScore: 88,
    threats: []
  },
  {
    id: 5,
    date: "2024-11-01",
    time: "09:30",
    type: "URL",
    content: "http://bit.ly/suspicious-link",
    status: "Phishing",
    trustScore: 8,
    threats: ["URL shortener", "No HTTPS", "Suspicious redirect"]
  }
]

export default function Reports() {
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

  const getTrustScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Scan Reports</h1>
            <p className="text-gray-600 mt-2">View and manage your security scan history</p>
          </div>

          {/* Filters and Search */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                </Button>
                <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  <span>Export All</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trust Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockReports.map((report, index) => (
                      <motion.tr
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{report.date}</div>
                            <div className="text-gray-500">{report.time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={report.content}>
                            {report.content}
                          </div>
                          {report.threats.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {report.threats.slice(0, 2).join(", ")}
                              {report.threats.length > 2 && "..."}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${getStatusColor(report.status)} text-xs px-3 py-1`}>
                            {report.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-semibold ${getTrustScoreColor(report.trustScore)}`}>
                            {report.trustScore}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">158</div>
                <div className="text-sm text-gray-600">Total Scans</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">127</div>
                <div className="text-sm text-gray-600">Safe</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">23</div>
                <div className="text-sm text-gray-600">Suspicious</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">8</div>
                <div className="text-sm text-gray-600">Phishing</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}