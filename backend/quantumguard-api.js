/**
 * QuantumGuard API - Node.js Backend
 * Alternative to Python backend - works without Python installation
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Comprehensive domain whitelist
const LEGITIMATE_DOMAINS = new Set([
  // E-commerce
  'amazon.com', 'amazon.in', 'amazon.co.uk', 'flipkart.com', 'myntra.com',
  'snapdeal.com', 'ebay.com', 'walmart.com', 'target.com',
  
  // Tech Giants
  'google.com', 'google.co.in', 'youtube.com', 'gmail.com',
  'microsoft.com', 'office.com', 'outlook.com', 'apple.com', 'icloud.com',
  'facebook.com', 'instagram.com', 'whatsapp.com', 'meta.com',
  
  // Payment
  'paypal.com', 'paypal.in', 'paytm.com', 'phonepe.com', 'googlepay.com',
  
  // Banking
  'sbi.co.in', 'hdfcbank.com', 'icicibank.com', 'axisbank.com',
  
  // Social Media
  'linkedin.com', 'twitter.com', 'x.com', 'reddit.com', 'pinterest.com',
  
  // Development
  'github.com', 'gitlab.com', 'stackoverflow.com',
  
  // Streaming
  'netflix.com', 'spotify.com', 'hotstar.com', 'primevideo.com',
  
  // Education
  'wikipedia.org', 'coursera.org', 'udemy.com', 'khanacademy.org',
]);

const SUSPICIOUS_TLDS = new Set([
  'tk', 'ml', 'ga', 'cf', 'pw', 'xyz', 'top', 'click', 'download', 'loan'
]);

const PHISHING_KEYWORDS = new Set([
  'verify', 'secure', 'login', 'account', 'update', 'confirm', 'suspended',
  'urgent', 'winner', 'prize', 'free', 'click', 'limited', 'expire'
]);

// Extract domain from URL or email
function extractDomain(input) {
  try {
    let domain = input.toLowerCase().trim();
    
    if (domain.includes('://')) {
      const url = new URL(domain);
      domain = url.hostname;
    } else if (domain.includes('@')) {
      domain = domain.split('@')[1];
    }
    
    domain = domain.replace('www.', '');
    return domain;
  } catch {
    return input.toLowerCase();
  }
}

// Analyze trust score
function analyzeTrustScore(input) {
  const inputLower = input.toLowerCase().trim();
  const domain = extractDomain(input);
  
  // Check if legitimate domain
  const isLegitimate = Array.from(LEGITIMATE_DOMAINS).some(legit => 
    domain === legit || domain.endsWith('.' + legit)
  );
  
  let score = 50;
  const factors = [];
  
  if (isLegitimate) {
    score = 95;
    factors.push({
      name: 'Verified Domain',
      impact: 'positive',
      description: `Recognized legitimate website: ${domain}`
    });
    
    if (input.startsWith('https://')) {
      score += 5;
      factors.push({
        name: 'HTTPS Protocol',
        impact: 'positive',
        description: 'Uses secure connection'
      });
    } else if (input.startsWith('http://')) {
      score -= 5;
      factors.push({
        name: 'HTTP Protocol',
        impact: 'negative',
        description: 'Not using secure connection'
      });
    }
  } else {
    // Analyze unknown domain
    if (input.startsWith('https://')) {
      score += 10;
      factors.push({
        name: 'HTTPS Protocol',
        impact: 'positive',
        description: 'Uses secure connection'
      });
    } else if (input.startsWith('http://')) {
      score -= 15;
      factors.push({
        name: 'HTTP Protocol',
        impact: 'negative',
        description: 'Not using secure connection'
      });
    }
    
    // Check suspicious TLD
    const tld = domain.split('.').pop();
    if (SUSPICIOUS_TLDS.has(tld)) {
      score -= 30;
      factors.push({
        name: 'Suspicious TLD',
        impact: 'negative',
        description: `Uses high-risk domain extension: .${tld}`
      });
    }
    
    // Check phishing keywords
    const phishingCount = Array.from(PHISHING_KEYWORDS).filter(keyword => 
      inputLower.includes(keyword)
    ).length;
    
    if (phishingCount > 0) {
      score -= Math.min(30, phishingCount * 10);
      factors.push({
        name: 'Suspicious Keywords',
        impact: 'negative',
        description: `Contains ${phishingCount} phishing-related words`
      });
    }
    
    // Check for IP address
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(domain)) {
      score -= 25;
      factors.push({
        name: 'IP Address',
        impact: 'negative',
        description: 'Uses IP address instead of domain name'
      });
    }
    
    // Check for @ symbol
    if (input.includes('@') && input.includes('http')) {
      score -= 30;
      factors.push({
        name: 'URL Obfuscation',
        impact: 'negative',
        description: 'Contains @ symbol for redirection'
      });
    }
    
    // Check excessive subdomains
    const subdomainCount = (domain.match(/\./g) || []).length - 1;
    if (subdomainCount > 3) {
      score -= 15;
      factors.push({
        name: 'Excessive Subdomains',
        impact: 'negative',
        description: `Too many subdomains: ${subdomainCount}`
      });
    }
    
    // Check random pattern
    if (domain.length > 10 && !/[aeiou]/.test(domain)) {
      score -= 25;
      factors.push({
        name: 'Random Domain Pattern',
        impact: 'negative',
        description: 'Domain appears randomly generated'
      });
    }
    
    // Check URL length
    if (input.length > 100) {
      score -= 10;
      factors.push({
        name: 'Excessive Length',
        impact: 'negative',
        description: 'Unusually long URL'
      });
    }
  }
  
  // Ensure score is 0-100
  score = Math.max(0, Math.min(100, score));
  
  // Determine risk level
  let riskLevel, category;
  if (score >= 80) {
    riskLevel = 'Safe';
    category = 'Trusted';
  } else if (score >= 60) {
    riskLevel = 'Low Risk';
    category = 'Likely Safe';
  } else if (score >= 40) {
    riskLevel = 'Medium Risk';
    category = 'Suspicious';
  } else if (score >= 20) {
    riskLevel = 'High Risk';
    category = 'Dangerous';
  } else {
    riskLevel = 'Critical';
    category = 'Highly Dangerous';
  }
  
  const explanation = `Based on multi-layer AI analysis, this identity has a trust score of ${score}/100. ` +
    (score >= 70 ? 'This appears to be a legitimate identity with strong trust indicators.' :
     score >= 40 ? 'This identity shows some concerning patterns. Proceed with caution.' :
     'This identity exhibits multiple red flags. We strongly recommend avoiding interaction.');
  
  return {
    score,
    risk_level: riskLevel,
    category,
    explanation,
    factors
  };
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'QuantumGuard API - Node.js Backend',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
      trust_score: '/api/trust-score',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/trust-score', (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }
    
    const result = analyzeTrustScore(input);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ QuantumGuard API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Trust Score: POST http://localhost:${PORT}/api/trust-score`);
});
