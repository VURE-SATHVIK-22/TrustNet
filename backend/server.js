const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trustnet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('✅ Connected to MongoDB')
})

// Scan Result Schema
const scanResultSchema = new mongoose.Schema({
  inputText: { type: String, required: true },
  inputType: { type: String, enum: ['email', 'url'], required: true },
  trustScore: { type: Number, required: true },
  category: { type: String, enum: ['Safe', 'Suspicious', 'Dangerous'], required: true },
  confidence: { type: Number, required: true },
  nlpAnalysis: {
    phishingProbability: Number,
    urgencyScore: Number,
    suspiciousKeywords: [String],
    languageTone: String,
    spellingAnomalies: Number
  },
  urlAnalysis: {
    maliciousProbability: Number,
    features: {
      urlLength: Number,
      hasHTTPS: Boolean,
      hasIP: Boolean,
      suspiciousChars: Number,
      domainAge: Number,
      redirectCount: Number
    },
    riskFactors: [String]
  },
  emotionalManipulation: {
    fear: Number,
    urgency: Number,
    authority: Number,
    greed: Number,
    social_proof: Number
  },
  explanations: [{
    type: String,
    text: String,
    risk: String,
    explanation: String,
    position: {
      start: Number,
      end: Number
    }
  }],
  userFeedback: {
    isAccurate: Boolean,
    actualCategory: String,
    comments: String
  },
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String
})

const ScanResult = mongoose.model('ScanResult', scanResultSchema)

// Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TrustNet API is running',
    timestamp: new Date().toISOString()
  })
})

// Analyze Content
app.post('/api/analyze', async (req, res) => {
  try {
    const { inputText, analysisResult } = req.body
    
    if (!inputText || !analysisResult) {
      return res.status(400).json({ 
        error: 'Missing required fields: inputText and analysisResult' 
      })
    }

    // Determine input type
    const inputType = /^https?:\/\//.test(inputText.trim()) ? 'url' : 'email'
    
    // Save scan result to database
    const scanResult = new ScanResult({
      inputText,
      inputType,
      ...analysisResult,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })

    await scanResult.save()

    res.json({
      success: true,
      scanId: scanResult._id,
      message: 'Analysis completed and saved'
    })

  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({ 
      error: 'Internal server error during analysis',
      details: error.message 
    })
  }
})

// Get Scan History
app.get('/api/scans', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, inputType } = req.query
    
    const filter = {}
    if (category) filter.category = category
    if (inputType) filter.inputType = inputType

    const scans = await ScanResult.find(filter)
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-inputText -explanations') // Exclude large fields for list view

    const total = await ScanResult.countDocuments(filter)

    res.json({
      scans,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })

  } catch (error) {
    console.error('Scan history error:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve scan history',
      details: error.message 
    })
  }
})

// Get Scan Details
app.get('/api/scans/:id', async (req, res) => {
  try {
    const scan = await ScanResult.findById(req.params.id)
    
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' })
    }

    res.json(scan)

  } catch (error) {
    console.error('Scan details error:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve scan details',
      details: error.message 
    })
  }
})

// Submit User Feedback
app.post('/api/scans/:id/feedback', async (req, res) => {
  try {
    const { isAccurate, actualCategory, comments } = req.body
    
    const scan = await ScanResult.findById(req.params.id)
    
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' })
    }

    scan.userFeedback = {
      isAccurate,
      actualCategory,
      comments,
      submittedAt: new Date()
    }

    await scan.save()

    res.json({
      success: true,
      message: 'Feedback submitted successfully'
    })

  } catch (error) {
    console.error('Feedback error:', error)
    res.status(500).json({ 
      error: 'Failed to submit feedback',
      details: error.message 
    })
  }
})

// Get Analytics
app.get('/api/analytics', async (req, res) => {
  try {
    const { timeframe = '7d' } = req.query
    
    // Calculate date range
    const now = new Date()
    const startDate = new Date()
    
    switch (timeframe) {
      case '24h':
        startDate.setHours(now.getHours() - 24)
        break
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Aggregate statistics
    const stats = await ScanResult.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgTrustScore: { $avg: '$trustScore' },
          avgConfidence: { $avg: '$confidence' }
        }
      }
    ])

    // Daily breakdown
    const dailyStats = await ScanResult.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            category: '$category'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ])

    // Top phishing indicators
    const topIndicators = await ScanResult.aggregate([
      { $match: { timestamp: { $gte: startDate }, category: { $in: ['Suspicious', 'Dangerous'] } } },
      { $unwind: '$nlpAnalysis.suspiciousKeywords' },
      {
        $group: {
          _id: '$nlpAnalysis.suspiciousKeywords',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])

    res.json({
      timeframe,
      summary: stats,
      dailyBreakdown: dailyStats,
      topPhishingIndicators: topIndicators,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ 
      error: 'Failed to generate analytics',
      details: error.message 
    })
  }
})

// Export Scan Data
app.get('/api/export', async (req, res) => {
  try {
    const { format = 'json', category, startDate, endDate } = req.query
    
    const filter = {}
    if (category) filter.category = category
    if (startDate || endDate) {
      filter.timestamp = {}
      if (startDate) filter.timestamp.$gte = new Date(startDate)
      if (endDate) filter.timestamp.$lte = new Date(endDate)
    }

    const scans = await ScanResult.find(filter)
      .sort({ timestamp: -1 })
      .select('-userAgent -ipAddress') // Exclude sensitive fields

    if (format === 'csv') {
      // Convert to CSV format
      const csv = convertToCSV(scans)
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=trustnet-export.csv')
      res.send(csv)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Disposition', 'attachment; filename=trustnet-export.json')
      res.json(scans)
    }

  } catch (error) {
    console.error('Export error:', error)
    res.status(500).json({ 
      error: 'Failed to export data',
      details: error.message 
    })
  }
})

// Helper function to convert to CSV
function convertToCSV(data) {
  if (!data.length) return ''
  
  const headers = ['timestamp', 'inputType', 'category', 'trustScore', 'confidence']
  const csvRows = [headers.join(',')]
  
  data.forEach(item => {
    const row = [
      item.timestamp.toISOString(),
      item.inputType,
      item.category,
      item.trustScore,
      item.confidence
    ]
    csvRows.push(row.join(','))
  })
  
  return csvRows.join('\n')
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl 
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TrustNet API server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})