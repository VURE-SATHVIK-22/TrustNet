import * as tf from '@tensorflow/tfjs'
import { commonPhishingIndicators, emotionalManipulationTactics } from './demo-data'

export interface ScanResult {
  trustScore: number
  status: 'Safe' | 'Suspicious' | 'Phishing'
  reasoning: string[]
  highlights: Array<{
    text: string
    risk: 'low' | 'medium' | 'high'
    reason: string
  }>
  emotionalTone: {
    urgency: number
    fear: number
    trust: number
    greed: number
  }
}

export class PhishingDetector {
  private urlModel: tf.LayersModel | null = null
  private emailModel: tf.LayersModel | null = null
  
  // Use comprehensive indicators from demo data
  private suspiciousKeywords = [
    ...commonPhishingIndicators.urgentWords,
    ...commonPhishingIndicators.threatWords,
    ...commonPhishingIndicators.actionWords,
    ...commonPhishingIndicators.moneyWords,
    ...commonPhishingIndicators.personalInfoWords
  ]
  
  private phishingDomains = commonPhishingIndicators.suspiciousDomains
  private legitimateDomains = commonPhishingIndicators.legitimateDomains

  async initialize() {
    // In a real implementation, you would load pre-trained models
    // For now, we'll use rule-based detection with ML-like scoring
    console.log('Initializing ML models...')
  }

  analyzeURL(url: string): ScanResult {
    const features = this.extractURLFeatures(url)
    const trustScore = this.calculateURLTrustScore(features)
    
    return {
      trustScore,
      status: this.getStatus(trustScore),
      reasoning: this.generateURLReasoning(features),
      highlights: this.highlightURLRisks(url, features),
      emotionalTone: { urgency: 0.1, fear: 0.1, trust: 0.8, greed: 0.1 }
    }
  }

  analyzeEmail(content: string): ScanResult {
    const features = this.extractEmailFeatures(content)
    const trustScore = this.calculateEmailTrustScore(features)
    const emotionalTone = this.analyzeEmotionalTone(content)
    
    return {
      trustScore,
      status: this.getStatus(trustScore),
      reasoning: this.generateEmailReasoning(features),
      highlights: this.highlightEmailRisks(content, features),
      emotionalTone
    }
  }

  private extractURLFeatures(url: string) {
    const urlObj = new URL(url)
    
    return {
      length: url.length,
      hostname: urlObj.hostname,
      hasHTTPS: url.startsWith('https://'),
      domainLength: urlObj.hostname.length,
      hasSubdomains: urlObj.hostname.split('.').length > 2,
      hasNumbers: /\d/.test(urlObj.hostname),
      hasHyphens: urlObj.hostname.includes('-'),
      isShortener: this.phishingDomains.some(domain => urlObj.hostname.includes(domain)),
      pathLength: urlObj.pathname.length,
      hasQueryParams: urlObj.search.length > 0,
      suspiciousChars: (url.match(/[~!@#$%^&*()+={}[\]|\\:";'<>?,]/g) || []).length
    }
  }

  private extractEmailFeatures(content: string) {
    const words = content.toLowerCase().split(/\s+/)
    const sentences = content.split(/[.!?]+/)
    
    return {
      length: content.length,
      wordCount: words.length,
      sentenceCount: sentences.length,
      suspiciousKeywordCount: this.suspiciousKeywords.filter(keyword => 
        content.toLowerCase().includes(keyword)
      ).length,
      hasLinks: /https?:\/\//.test(content),
      linkCount: (content.match(/https?:\/\/[^\s]+/g) || []).length,
      hasAttachments: /attachment|download|file|pdf|doc|exe/.test(content.toLowerCase()),
      urgencyWords: ['urgent', 'immediate', 'asap', 'quickly', 'now'].filter(word =>
        content.toLowerCase().includes(word)
      ).length,
      moneyMentions: /\$|money|payment|refund|prize|lottery|inheritance/.test(content.toLowerCase()),
      personalInfo: /ssn|social security|password|pin|account number/.test(content.toLowerCase())
    }
  }

  private calculateURLTrustScore(features: any): number {
    let score = 85 // Start with high trust
    
    // Check if it's a known legitimate domain
    const isLegitimate = this.legitimateDomains.some(domain => 
      features.hostname && features.hostname.includes(domain)
    )
    
    if (isLegitimate) {
      score = 95 // High trust for known legitimate domains
    } else {
      if (!features.hasHTTPS) score -= 15
      if (features.isShortener) score -= 25
      if (features.length > 100) score -= 10
      if (features.hasNumbers) score -= 5
      if (features.hasHyphens) score -= 5
      if (features.suspiciousChars > 5) score -= 15
      if (features.hasSubdomains && features.domainLength > 20) score -= 10
    }
    
    return Math.max(0, Math.min(100, score))
  }

  private calculateEmailTrustScore(features: any): number {
    let score = 80 // Start with moderate trust
    
    if (features.suspiciousKeywordCount > 3) score -= 20
    if (features.urgencyWords > 2) score -= 15
    if (features.linkCount > 3) score -= 10
    if (features.moneyMentions) score -= 15
    if (features.personalInfo) score -= 20
    if (features.hasAttachments) score -= 10
    if (features.length < 50) score -= 10 // Too short
    if (features.length > 2000) score -= 5 // Suspiciously long
    
    return Math.max(0, Math.min(100, score))
  }

  private getStatus(trustScore: number): 'Safe' | 'Suspicious' | 'Phishing' {
    if (trustScore >= 70) return 'Safe'
    if (trustScore >= 40) return 'Suspicious'
    return 'Phishing'
  }

  private generateURLReasoning(features: any): string[] {
    const reasons: string[] = []
    
    if (!features.hasHTTPS) reasons.push('URL uses HTTP instead of secure HTTPS')
    if (features.isShortener) reasons.push('Uses URL shortening service')
    if (features.length > 100) reasons.push('Unusually long URL')
    if (features.suspiciousChars > 5) reasons.push('Contains many special characters')
    if (features.hasSubdomains && features.domainLength > 20) reasons.push('Complex subdomain structure')
    
    if (reasons.length === 0) reasons.push('URL appears to follow standard patterns')
    
    return reasons
  }

  private generateEmailReasoning(features: any): string[] {
    const reasons: string[] = []
    
    if (features.suspiciousKeywordCount > 3) reasons.push('Contains multiple suspicious keywords')
    if (features.urgencyWords > 2) reasons.push('Uses urgent language to pressure action')
    if (features.moneyMentions) reasons.push('Mentions money, prizes, or financial incentives')
    if (features.personalInfo) reasons.push('Requests sensitive personal information')
    if (features.linkCount > 3) reasons.push('Contains multiple external links')
    
    if (reasons.length === 0) reasons.push('Content appears legitimate')
    
    return reasons
  }

  private highlightURLRisks(url: string, features: any) {
    const highlights: Array<{text: string, risk: 'low' | 'medium' | 'high', reason: string}> = []
    
    if (!features.hasHTTPS) {
      highlights.push({
        text: 'http://',
        risk: 'high',
        reason: 'Insecure connection'
      })
    }
    
    return highlights
  }

  private highlightEmailRisks(content: string, features: any) {
    const highlights: Array<{text: string, risk: 'low' | 'medium' | 'high', reason: string}> = []
    
    this.suspiciousKeywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) {
        highlights.push({
          text: keyword,
          risk: 'medium',
          reason: 'Commonly used in phishing attempts'
        })
      }
    })
    
    return highlights
  }

  private analyzeEmotionalTone(content: string) {
    const text = content.toLowerCase()
    
    // Count matches for each emotional category
    const urgencyMatches = commonPhishingIndicators.urgentWords.filter(word => text.includes(word)).length
    const fearMatches = commonPhishingIndicators.threatWords.filter(word => text.includes(word)).length
    const greedMatches = commonPhishingIndicators.moneyWords.filter(word => text.includes(word)).length
    
    // Check for authority/trust manipulation
    const authorityMatches = emotionalManipulationTactics.authority.filter(phrase => text.includes(phrase.toLowerCase())).length
    
    // Normalize scores (0-1 scale)
    return {
      urgency: Math.min(urgencyMatches / 3, 1), // Cap at 1.0
      fear: Math.min(fearMatches / 3, 1),
      trust: authorityMatches > 0 ? Math.min(authorityMatches / 2, 1) : 0.1, // Low trust if no authority indicators
      greed: Math.min(greedMatches / 2, 1)
    }
  }
}

export const phishingDetector = new PhishingDetector()