// Demo data for testing the phishing detection system

export const demoPhishingEmails = [
  {
    subject: "URGENT: Your PayPal account has been limited",
    content: `Dear PayPal User,

Your account has been temporarily limited due to suspicious activity. To restore full access, please verify your identity immediately by clicking the link below:

http://paypal-security-verification.com/restore-access

You have 24 hours to complete this verification or your account will be permanently suspended.

Thank you,
PayPal Security Team`,
    expectedScore: 15,
    expectedStatus: "Phishing"
  },
  {
    subject: "Meeting reminder for tomorrow",
    content: `Hi John,

Just a quick reminder about our meeting tomorrow at 2 PM in the conference room. We'll be discussing the Q4 budget proposals.

Please bring the financial reports we discussed last week.

Best regards,
Sarah`,
    expectedScore: 88,
    expectedStatus: "Safe"
  },
  {
    subject: "Congratulations! You've won $1,000,000!",
    content: `CONGRATULATIONS!!!

You have been selected as the winner of our international lottery! You've won $1,000,000 USD!

To claim your prize, please provide:
- Full name
- Address
- Phone number
- Bank account details

Reply immediately as this offer expires in 48 hours!

Lottery Commission`,
    expectedScore: 8,
    expectedStatus: "Phishing"
  }
]

export const demoSuspiciousUrls = [
  {
    url: "http://amazon-security-alert.com/verify-account",
    expectedScore: 25,
    expectedStatus: "Phishing"
  },
  {
    url: "https://github.com/microsoft/vscode",
    expectedScore: 95,
    expectedStatus: "Safe"
  },
  {
    url: "http://bit.ly/urgent-action-required",
    expectedScore: 30,
    expectedStatus: "Suspicious"
  },
  {
    url: "https://www.google.com/search?q=phishing+detection",
    expectedScore: 92,
    expectedStatus: "Safe"
  },
  {
    url: "http://microsoft-support-team.org/windows-update",
    expectedScore: 18,
    expectedStatus: "Phishing"
  }
]

export const commonPhishingIndicators = {
  urgentWords: [
    "urgent", "immediate", "asap", "quickly", "now", "expires", "limited time",
    "act now", "don't delay", "hurry", "final notice", "last chance"
  ],
  
  threatWords: [
    "suspend", "suspended", "block", "blocked", "terminate", "close", "freeze",
    "locked", "disabled", "restricted", "cancelled", "expired"
  ],
  
  actionWords: [
    "verify", "confirm", "update", "validate", "authenticate", "secure",
    "click here", "download", "install", "activate", "enable"
  ],
  
  moneyWords: [
    "money", "cash", "prize", "winner", "lottery", "inheritance", "refund",
    "payment", "transfer", "deposit", "withdraw", "claim", "reward"
  ],
  
  personalInfoWords: [
    "password", "pin", "ssn", "social security", "account number", "credit card",
    "bank details", "personal information", "identity", "credentials"
  ],
  
  suspiciousDomains: [
    "bit.ly", "tinyurl.com", "short.link", "rebrand.ly", "ow.ly", "t.co",
    "goo.gl", "buff.ly", "adf.ly", "tiny.cc"
  ],
  
  legitimateDomains: [
    "google.com", "microsoft.com", "apple.com", "amazon.com", "facebook.com",
    "github.com", "stackoverflow.com", "wikipedia.org", "linkedin.com"
  ]
}

export const emotionalManipulationTactics = {
  fear: [
    "Your account will be closed",
    "Suspicious activity detected",
    "Security breach",
    "Unauthorized access",
    "Identity theft protection"
  ],
  
  urgency: [
    "Act within 24 hours",
    "Limited time offer",
    "Expires today",
    "Immediate action required",
    "Don't miss out"
  ],
  
  greed: [
    "You've won a prize",
    "Free money",
    "Exclusive offer",
    "Get rich quick",
    "Investment opportunity"
  ],
  
  authority: [
    "From your bank",
    "Government notice",
    "Tax refund",
    "Legal department",
    "Security team"
  ]
}