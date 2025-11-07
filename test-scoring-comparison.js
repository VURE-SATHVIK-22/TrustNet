#!/usr/bin/env node

/**
 * TrustNet Scoring Comparison Demo
 * Shows the difference between Basic ML Models vs Advanced ML Engine
 */

// Simulate the Basic ML Models scoring (from ml-models.ts)
function basicMLScoring(url) {
  const legitimateDomains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com']
  
  let score = 85 // Start with base score
  
  // Check if it's a known legitimate domain
  const domain = new URL(url).hostname.toLowerCase()
  const isLegitimate = legitimateDomains.some(legitDomain => 
    domain.includes(legitDomain)
  )
  
  if (isLegitimate) {
    score = 95 // HARD CAP at 95%
  } else {
    // Apply penalties
    if (!url.startsWith('https://')) score -= 15
    if (url.length > 100) score -= 10
    // ... other penalties
  }
  
  return Math.max(0, Math.min(100, score))
}

// Simulate the Advanced ML Engine scoring (enhanced version)
function advancedMLScoring(url) {
  const trustedDomains = [
    'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 
    'github.com', 'stackoverflow.com', 'wikipedia.org', 'linkedin.com'
  ]
  
  let score = 95 // Start higher
  const domain = new URL(url).hostname.toLowerCase().replace('www.', '')
  
  // Check for exact trusted domain match
  const isTrusted = trustedDomains.some(trusted => 
    domain === trusted || domain.endsWith(`.${trusted}`)
  )
  
  if (isTrusted) {
    // Check for any risk factors even on trusted domains
    let minorRisks = 0
    
    if (!url.startsWith('https://')) minorRisks++
    if (url.length > 150) minorRisks++
    if (domain.split('.').length > 4) minorRisks++ // Too many subdomains
    
    // Perfect trusted domains get 100%, minor issues get 95-99%
    score = 100 - (minorRisks * 2.5)
    return Math.max(95, score)
  }
  
  // Apply sophisticated risk analysis for non-trusted domains
  let riskScore = 0
  
  if (!url.startsWith('https://')) riskScore += 0.25
  if (url.length > 100) riskScore += 0.15
  // ... more sophisticated analysis
  
  return Math.max(0, Math.min(100, (1 - riskScore) * 100))
}

// Test URLs
const testUrls = [
  'https://www.amazon.com',
  'https://amazon.com/products',
  'https://www.google.com/search?q=test',
  'https://github.com/microsoft/vscode',
  'https://stackoverflow.com/questions/123',
  'https://docs.microsoft.com/en-us/azure',
  'http://amazon.com', // No HTTPS
  'https://subdomain.very.long.amazon.com/path', // Complex subdomain
]

console.log('🔍 TrustNet Scoring Comparison\n')
console.log('URL'.padEnd(50) + 'Basic ML'.padEnd(12) + 'Advanced ML'.padEnd(12) + 'Difference')
console.log('='.repeat(80))

testUrls.forEach(url => {
  const basicScore = basicMLScoring(url)
  const advancedScore = advancedMLScoring(url)
  const difference = advancedScore - basicScore
  
  console.log(
    url.padEnd(50) + 
    `${basicScore}%`.padEnd(12) + 
    `${advancedScore}%`.padEnd(12) + 
    `${difference > 0 ? '+' : ''}${difference}%`
  )
})

console.log('\n📊 Summary:')
console.log('• Basic ML Models: Conservative approach, caps legitimate domains at 95%')
console.log('• Advanced ML Engine: Sophisticated analysis, allows 100% for perfect domains')
console.log('• Recommendation: Use Advanced ML Engine for better accuracy and user experience')