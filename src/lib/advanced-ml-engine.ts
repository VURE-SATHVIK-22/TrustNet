import * as tf from '@tensorflow/tfjs'

export interface AdvancedScanResult {
  trustScore: number
  category: 'Safe' | 'Suspicious' | 'Dangerous'
  confidence: number
  nlpAnalysis: {
    phishingProbability: number
    urgencyScore: number
    suspiciousKeywords: string[]
    languageTone: 'formal' | 'urgent' | 'threatening' | 'casual'
    spellingAnomalies: number
  }
  urlAnalysis: {
    maliciousProbability: number
    features: {
      urlLength: number
      hasHTTPS: boolean
      hasIP: boolean
      suspiciousChars: number
      domainAge: number | null
      redirectCount: number
    }
    riskFactors: string[]
  }
  explanations: Array<{
    type: 'keyword' | 'url_feature' | 'pattern'
    text: string
    risk: 'low' | 'medium' | 'high'
    explanation: string
    position?: { start: number; end: number }
  }>
  emotionalManipulation: {
    fear: number
    urgency: number
    authority: number
    greed: number
    social_proof: number
  }
}

export class AdvancedMLEngine {
  private nlpModel: tf.LayersModel | null = null
  private urlModel: tf.LayersModel | null = null
  private ensembleModel: tf.LayersModel | null = null
  private tokenizer: any = null
  private isInitialized = false

  // Advanced phishing indicators based on real datasets
  private phishingPatterns = {
    urgentKeywords: [
      'urgent', 'immediate', 'asap', 'expires today', 'act now', 'limited time',
      'don\'t delay', 'hurry', 'final notice', 'last chance', 'time sensitive'
    ],
    threatKeywords: [
      'suspend', 'suspended', 'block', 'blocked', 'terminate', 'close account',
      'freeze', 'locked', 'disabled', 'restricted', 'cancelled', 'deactivate'
    ],
    actionKeywords: [
      'verify now', 'confirm identity', 'update payment', 'validate account',
      'click here', 'download attachment', 'install software', 'enable security'
    ],
    authorityKeywords: [
      'bank notification', 'irs notice', 'government alert', 'security team',
      'fraud department', 'compliance officer', 'legal department'
    ],
    greedKeywords: [
      'you\'ve won', 'lottery winner', 'inheritance', 'tax refund', 'cash prize',
      'free money', 'investment opportunity', 'get rich', 'exclusive offer'
    ],
    socialProofKeywords: [
      'thousands of customers', 'popular choice', 'recommended by experts',
      'trusted by millions', 'award winning', 'industry leader'
    ]
  }

  private suspiciousUrlPatterns = {
    shorteners: ['bit.ly', 'tinyurl.com', 'short.link', 'rebrand.ly', 'ow.ly', 't.co'],
    suspiciousTlds: ['.tk', '.ml', '.ga', '.cf', '.pw', '.top', '.click'],
    phishingKeywords: ['secure', 'verify', 'update', 'confirm', 'login', 'account'],
    brandImpersonation: ['paypal', 'amazon', 'microsoft', 'apple', 'google', 'facebook']
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      console.log('🧠 Initializing Advanced ML Engine...')
      
      // In a real implementation, these would be pre-trained models
      // For now, we'll create sophisticated rule-based analysis that mimics ML behavior
      await this.initializeTokenizer()
      
      this.isInitialized = true
      console.log('✅ ML Engine initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize ML Engine:', error)
      throw error
    }
  }

  private async initializeTokenizer(): Promise<void> {
    // Simulate tokenizer initialization
    this.tokenizer = {
      encode: (text: string) => text.toLowerCase().split(/\s+/),
      decode: (tokens: string[]) => tokens.join(' ')
    }
  }

  async analyzeContent(input: string): Promise<AdvancedScanResult> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    const isUrl = this.isValidUrl(input)
    
    if (isUrl) {
      return this.analyzeUrl(input)
    } else {
      return this.analyzeEmail(input)
    }
  }

  private isValidUrl(string: string): boolean {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  private async analyzeEmail(content: string): Promise<AdvancedScanResult> {
    const nlpAnalysis = this.performNLPAnalysis(content)
    const urlAnalysis = this.extractAndAnalyzeUrls(content)
    const emotionalManipulation = this.analyzeEmotionalManipulation(content)
    const explanations = this.generateEmailExplanations(content, nlpAnalysis)
    
    // Ensemble scoring
    const trustScore = this.calculateEmailTrustScore(nlpAnalysis, urlAnalysis, emotionalManipulation)
    const category = this.categorizeThreat(trustScore)
    const confidence = this.calculateConfidence(nlpAnalysis, urlAnalysis)

    return {
      trustScore,
      category,
      confidence,
      nlpAnalysis,
      urlAnalysis,
      explanations,
      emotionalManipulation
    }
  }

  private async analyzeUrl(url: string): Promise<AdvancedScanResult> {
    const urlAnalysis = this.performUrlAnalysis(url)
    const nlpAnalysis = this.analyzeUrlText(url)
    const emotionalManipulation = { fear: 0.1, urgency: 0.1, authority: 0.1, greed: 0.1, social_proof: 0.1 }
    const explanations = this.generateUrlExplanations(url, urlAnalysis)
    
    const trustScore = this.calculateUrlTrustScore(urlAnalysis)
    const category = this.categorizeThreat(trustScore)
    const confidence = this.calculateUrlConfidence(urlAnalysis)

    return {
      trustScore,
      category,
      confidence,
      nlpAnalysis,
      urlAnalysis,
      explanations,
      emotionalManipulation
    }
  }

  private performNLPAnalysis(content: string) {
    const tokens = this.tokenizer.encode(content)
    const text = content.toLowerCase()
    
    // Analyze suspicious keywords
    const suspiciousKeywords: string[] = []
    let phishingScore = 0
    let urgencyScore = 0
    
    // Check for phishing patterns
    Object.entries(this.phishingPatterns).forEach(([category, keywords]) => {
      keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
          suspiciousKeywords.push(keyword)
          phishingScore += this.getKeywordWeight(category)
          if (category === 'urgentKeywords') urgencyScore += 0.2
        }
      })
    })

    // Analyze language tone
    const languageTone = this.detectLanguageTone(text)
    
    // Count spelling anomalies (simplified)
    const spellingAnomalies = this.countSpellingAnomalies(text)
    
    // Calculate phishing probability
    const phishingProbability = Math.min(phishingScore / 10, 1)

    return {
      phishingProbability,
      urgencyScore: Math.min(urgencyScore, 1),
      suspiciousKeywords,
      languageTone,
      spellingAnomalies
    }
  }

  private performUrlAnalysis(url: string) {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()
    const pathname = urlObj.pathname
    const search = urlObj.search
    
    const features = {
      urlLength: url.length,
      hasHTTPS: url.startsWith('https://'),
      hasIP: /\d+\.\d+\.\d+\.\d+/.test(hostname),
      suspiciousChars: (url.match(/[~!@#$%^&*()+={}[\]|\\:";'<>?,]/g) || []).length,
      domainAge: null, // Would require external API in real implementation
      redirectCount: 0 // Would require following redirects in real implementation
    }

    const riskFactors: string[] = []
    let maliciousProbability = 0

    // Check for URL shorteners
    if (this.suspiciousUrlPatterns.shorteners.some(shortener => hostname.includes(shortener))) {
      riskFactors.push('URL shortening service')
      maliciousProbability += 0.3
    }

    // Check for suspicious TLDs
    if (this.suspiciousUrlPatterns.suspiciousTlds.some(tld => hostname.endsWith(tld))) {
      riskFactors.push('Suspicious top-level domain')
      maliciousProbability += 0.2
    }

    // Check for phishing keywords in URL
    this.suspiciousUrlPatterns.phishingKeywords.forEach(keyword => {
      if (url.toLowerCase().includes(keyword)) {
        riskFactors.push(`Contains phishing keyword: ${keyword}`)
        maliciousProbability += 0.15
      }
    })

    // Check for brand impersonation (enhanced to handle legitimate international domains)
    this.suspiciousUrlPatterns.brandImpersonation.forEach(brand => {
      const legitimateTlds = ['.com', '.in', '.co.uk', '.de', '.fr', '.ca', '.au', '.jp', '.br', '.it', '.es']
      const isLegitimate = legitimateTlds.some(tld => 
        hostname === `${brand}${tld}` || hostname === `www.${brand}${tld}`
      )
      
      if (hostname.includes(brand) && !isLegitimate) {
        riskFactors.push(`Potential ${brand} impersonation`)
        maliciousProbability += 0.25
      }
    })

    // Additional risk factors
    if (!features.hasHTTPS) {
      riskFactors.push('No HTTPS encryption')
      maliciousProbability += 0.2
    }

    if (features.hasIP) {
      riskFactors.push('Uses IP address instead of domain')
      maliciousProbability += 0.3
    }

    if (features.urlLength > 100) {
      riskFactors.push('Unusually long URL')
      maliciousProbability += 0.1
    }

    return {
      maliciousProbability: Math.min(maliciousProbability, 1),
      features,
      riskFactors,
      originalUrl: url
    }
  }

  private analyzeUrlText(url: string) {
    // Basic NLP analysis for URL text
    return {
      phishingProbability: 0.1,
      urgencyScore: 0.1,
      suspiciousKeywords: [],
      languageTone: 'casual' as const,
      spellingAnomalies: 0
    }
  }

  private extractAndAnalyzeUrls(content: string) {
    const urlRegex = /https?:\/\/[^\s]+/g
    const urls = content.match(urlRegex) || []
    
    if (urls.length === 0) {
      return {
        maliciousProbability: 0,
        features: {
          urlLength: 0,
          hasHTTPS: true,
          hasIP: false,
          suspiciousChars: 0,
          domainAge: null,
          redirectCount: 0
        },
        riskFactors: []
      }
    }

    // Analyze the first URL found
    return this.performUrlAnalysis(urls[0] || '')
  }

  private analyzeEmotionalManipulation(content: string) {
    const text = content.toLowerCase()
    
    const fear = this.calculateEmotionScore(text, this.phishingPatterns.threatKeywords)
    const urgency = this.calculateEmotionScore(text, this.phishingPatterns.urgentKeywords)
    const authority = this.calculateEmotionScore(text, this.phishingPatterns.authorityKeywords)
    const greed = this.calculateEmotionScore(text, this.phishingPatterns.greedKeywords)
    const social_proof = this.calculateEmotionScore(text, this.phishingPatterns.socialProofKeywords)

    return { fear, urgency, authority, greed, social_proof }
  }

  private calculateEmotionScore(text: string, keywords: string[]): number {
    const matches = keywords.filter(keyword => text.includes(keyword.toLowerCase())).length
    return Math.min(matches / keywords.length * 2, 1) // Normalize to 0-1
  }

  private getKeywordWeight(category: string): number {
    const weights = {
      urgentKeywords: 1.5,
      threatKeywords: 2.0,
      actionKeywords: 1.2,
      authorityKeywords: 1.8,
      greedKeywords: 1.6,
      socialProofKeywords: 1.0
    }
    return weights[category as keyof typeof weights] || 1.0
  }

  private detectLanguageTone(text: string): 'formal' | 'urgent' | 'threatening' | 'casual' {
    if (this.phishingPatterns.threatKeywords.some(word => text.includes(word))) {
      return 'threatening'
    }
    if (this.phishingPatterns.urgentKeywords.some(word => text.includes(word))) {
      return 'urgent'
    }
    if (text.includes('dear sir') || text.includes('sincerely') || text.includes('regards')) {
      return 'formal'
    }
    return 'casual'
  }

  private countSpellingAnomalies(text: string): number {
    // Simplified spelling anomaly detection
    const commonMisspellings = ['recieve', 'seperate', 'occured', 'neccessary', 'definately']
    return commonMisspellings.filter(word => text.toLowerCase().includes(word)).length
  }

  private calculateEmailTrustScore(nlp: any, url: any, emotion: any): number {
    let score = 85 // Start with high trust
    
    // NLP factors
    score -= nlp.phishingProbability * 40
    score -= nlp.urgencyScore * 20
    score -= nlp.spellingAnomalies * 5
    
    // URL factors
    score -= url.maliciousProbability * 30
    
    // Emotional manipulation factors
    score -= (emotion.fear + emotion.urgency + emotion.greed) * 10
    
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  private calculateUrlTrustScore(urlAnalysis: any): number {
    let score = 95 // Start with high trust for URLs
    
    // Check if it's a known legitimate domain first
    const url = urlAnalysis.originalUrl || ''
    const isKnownLegitimate = this.isKnownLegitimateUrl(url)
    
    if (isKnownLegitimate && urlAnalysis.maliciousProbability < 0.1) {
      // Allow 100% for truly clean, known legitimate domains
      score = 100
    }
    
    score -= urlAnalysis.maliciousProbability * 60
    
    if (!urlAnalysis.features.hasHTTPS) score -= 15
    if (urlAnalysis.features.hasIP) score -= 20
    if (urlAnalysis.features.urlLength > 100) score -= 10
    
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  private isKnownLegitimateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.toLowerCase()
      
      const trustedDomains = [
        'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 
        'github.com', 'stackoverflow.com', 'wikipedia.org', 'linkedin.com',
        'facebook.com', 'twitter.com', 'instagram.com', 'youtube.com'
      ]
      
      return trustedDomains.some(domain => 
        hostname === domain || 
        hostname === `www.${domain}` ||
        hostname.endsWith(`.${domain}`)
      )
    } catch {
      return false
    }
  }

  private categorizeThreat(trustScore: number): 'Safe' | 'Suspicious' | 'Dangerous' {
    if (trustScore >= 70) return 'Safe'
    if (trustScore >= 40) return 'Suspicious'
    return 'Dangerous'
  }

  private calculateConfidence(nlp: any, url: any): number {
    // Higher confidence when multiple indicators agree
    const indicators = [
      nlp.phishingProbability > 0.5 ? 1 : 0,
      url.maliciousProbability > 0.5 ? 1 : 0,
      nlp.suspiciousKeywords.length > 3 ? 1 : 0
    ]
    
    const agreement = indicators.reduce((sum, val) => sum + val, 0) / indicators.length
    return Math.round(0.7 + agreement * 0.3 * 100) / 100 // 70-100% confidence
  }

  private calculateUrlConfidence(urlAnalysis: any): number {
    const riskFactorCount = urlAnalysis.riskFactors.length
    return Math.max(0.6, 1 - riskFactorCount * 0.1)
  }

  private generateEmailExplanations(content: string, nlpAnalysis: any) {
    const explanations: any[] = []
    
    // Add keyword explanations
    nlpAnalysis.suspiciousKeywords.forEach((keyword: string) => {
      const index = content.toLowerCase().indexOf(keyword.toLowerCase())
      if (index !== -1) {
        explanations.push({
          type: 'keyword',
          text: keyword,
          risk: this.getKeywordRisk(keyword),
          explanation: this.getKeywordExplanation(keyword),
          position: { start: index, end: index + keyword.length }
        })
      }
    })

    return explanations
  }

  private generateUrlExplanations(url: string, urlAnalysis: any) {
    const explanations: any[] = []
    
    urlAnalysis.riskFactors.forEach((factor: string) => {
      explanations.push({
        type: 'url_feature',
        text: factor,
        risk: 'medium' as const,
        explanation: `This URL characteristic is commonly associated with phishing attempts.`
      })
    })

    return explanations
  }

  private getKeywordRisk(keyword: string): 'low' | 'medium' | 'high' {
    if (this.phishingPatterns.threatKeywords.includes(keyword)) return 'high'
    if (this.phishingPatterns.urgentKeywords.includes(keyword)) return 'high'
    if (this.phishingPatterns.greedKeywords.includes(keyword)) return 'medium'
    return 'low'
  }

  private getKeywordExplanation(keyword: string): string {
    const explanations: { [key: string]: string } = {
      'urgent': 'Creates false sense of urgency to pressure quick action',
      'suspend': 'Threatens account suspension to create fear',
      'verify': 'Common phishing tactic to steal credentials',
      'click here': 'Vague call-to-action often leads to malicious sites',
      'winner': 'Appeals to greed, common in lottery scams'
    }
    
    return explanations[keyword.toLowerCase()] || 'This keyword is commonly used in phishing attempts'
  }
}

export const advancedMLEngine = new AdvancedMLEngine()