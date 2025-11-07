# 🧪 TrustNet Test Examples

## URL/Link Analysis Test Cases

### ✅ Safe URLs (Should score 95-100%)
```
https://www.google.com
https://www.amazon.com
https://github.com
https://stackoverflow.com
https://www.microsoft.com
https://www.apple.com
https://www.wikipedia.org
https://www.youtube.com
```

### ⚠️ Suspicious URLs (Should score 40-70%)
```
http://bit.ly/suspicious-link
http://example-verify-account.com
https://secure-login-microsoft.net
http://paypal-security-check.org
```

### 🚨 Dangerous URLs (Should score 0-40%)
```
http://192.168.1.1/admin/login.php
http://paypal-verify.tk
http://amazon-security-alert.ml
http://microsoft-update.ga
http://secure-banking-login.cf
```

---

## Email Phishing Test Cases

### ✅ Safe Email (Should score 75-100%)
```
Subject: Team Meeting Tomorrow

Hi Team,

Just a reminder that we have our weekly team meeting tomorrow at 2 PM in Conference Room A. Please bring your project updates.

Looking forward to seeing everyone there.

Best regards,
Sarah
Project Manager
```

### ⚠️ Suspicious Email (Should score 40-75%)
```
Subject: Important Account Update Required

Dear Customer,

We have noticed some unusual activity on your account. For your security, please review your recent transactions and update your contact information.

You can review your account by logging into our website.

Thank you for your attention to this matter.

Customer Service Team
```

### 🚨 Phishing Email (Should score 0-40%)
```
Subject: URGENT: Your Account Will Be Suspended!

IMMEDIATE ACTION REQUIRED!!!

Your PayPal account has been LOCKED due to suspicious activity detected from IP address 192.168.1.1 in Nigeria.

You have 24 HOURS to verify your identity or your account will be PERMANENTLY DELETED and all funds will be FROZEN!

CLICK HERE NOW to verify: http://paypal-security-verify.tk/urgent

DO NOT IGNORE THIS MESSAGE!

This is your FINAL WARNING!

PayPal Security Team
```

### 🚨 Lottery Scam Email (Should score 0-30%)
```
Subject: CONGRATULATIONS! You've Won $1,000,000!!!

Dear Lucky Winner,

CONGRATULATIONS!!! You have been selected as the GRAND PRIZE WINNER of our International Mega Lottery!

YOU HAVE WON: $1,000,000 USD (One Million Dollars)

To claim your prize, please provide:
- Full Name
- Address
- Phone Number
- Bank Account Details
- Social Security Number

URGENT: This offer expires in 48 hours! Act now or lose your prize forever!

Click here to claim: http://lottery-winner-claim.ml/prize

Best regards,
International Lottery Commission
```

### 🚨 CEO Fraud Email (Should score 10-40%)
```
Subject: Urgent Wire Transfer Needed

Hi,

I'm currently in a meeting with investors and need you to process an urgent wire transfer immediately.

Amount: $50,000
Account: 1234567890
Bank: International Trust Bank
Swift Code: INTLBANK123

This is time-sensitive. Please confirm once done.

Thanks,
CEO
Sent from my iPhone
```

---

## QR Code Test Cases

### How to Test QR Codes:

1. **Generate QR Codes:**
   - Go to: https://www.qr-code-generator.com/
   - Or: https://www.qrcode-monkey.com/

2. **Safe QR Code Examples:**
   - Generate QR for: `https://www.google.com`
   - Generate QR for: `https://github.com`
   - Generate QR for: `https://www.wikipedia.org`

3. **Suspicious QR Code Examples:**
   - Generate QR for: `http://bit.ly/promo`
   - Generate QR for: `http://short.link/offer`

4. **Dangerous QR Code Examples:**
   - Generate QR for: `http://192.168.1.1/login`
   - Generate QR for: `http://paypal-verify.tk`
   - Generate QR for: `http://free-money-claim.ml`

---

## API Testing with cURL

### Test URL Analysis:
```bash
curl -X POST http://localhost:8000/analyze/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'
```

### Test Email Analysis:
```bash
curl -X POST http://localhost:8000/analyze/email \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "URGENT: Account Suspended",
    "text": "Your account will be deleted in 24 hours. Click here to verify immediately!"
  }'
```

### Test Health Check:
```bash
curl http://localhost:8000/health
```

### Test Stats:
```bash
curl http://localhost:8000/stats
```

---

## Expected Results

### Safe Content:
- **Trust Score:** 75-100%
- **Risk Category:** Safe
- **Confidence:** 90-99%
- **Explanations:** "✅ No major security issues detected"

### Suspicious Content:
- **Trust Score:** 40-75%
- **Risk Category:** Suspicious
- **Confidence:** 70-90%
- **Explanations:** Multiple warnings about suspicious patterns

### Dangerous Content:
- **Trust Score:** 0-40%
- **Risk Category:** High Risk / Critical Risk
- **Confidence:** 80-95%
- **Explanations:** Multiple critical warnings

---

## Feature Detection Tests

### URL Features to Check:
- ✅ HTTPS vs HTTP
- ✅ Domain length
- ✅ Suspicious keywords (verify, update, confirm)
- ✅ Brand impersonation
- ✅ IP addresses
- ✅ Suspicious TLDs (.tk, .ml, .ga)
- ✅ URL shorteners

### Email Features to Check:
- ✅ Urgent words (urgent, immediate, now)
- ✅ Threat words (suspend, block, delete)
- ✅ Action words (click, verify, update)
- ✅ Money words (prize, winner, lottery)
- ✅ Excessive punctuation (!!!)
- ✅ ALL CAPS usage
- ✅ Links in email
- ✅ Phone numbers

---

## Performance Benchmarks

### Expected Processing Times:
- **URL Analysis:** < 50ms
- **Email Analysis:** < 100ms
- **QR Code Analysis:** < 200ms

### Accuracy Targets:
- **URL Detection:** 95%+
- **Email Detection:** 96%+
- **QR Code Detection:** 95%+

---

## Testing Checklist

### Backend Tests:
- [ ] Backend starts without errors
- [ ] Health check returns "healthy"
- [ ] URL analysis works
- [ ] Email analysis works
- [ ] QR code analysis works
- [ ] API docs accessible at /docs
- [ ] Stats endpoint works

### Frontend Tests:
- [ ] Frontend loads at localhost:3000
- [ ] Navbar shows all scan tools
- [ ] Login page accessible
- [ ] Sign up page accessible
- [ ] Link analyzer page works
- [ ] Email checker page works
- [ ] QR code scanner page works
- [ ] Results display correctly
- [ ] Trust scores calculate properly

### Integration Tests:
- [ ] Frontend connects to backend
- [ ] URL analysis returns results
- [ ] Email analysis returns results
- [ ] QR code upload works
- [ ] Error handling works
- [ ] Loading states work
- [ ] Results are accurate

---

## Common Issues & Solutions

### Issue: "Failed to fetch"
**Solution:** Make sure backend is running on port 8000

### Issue: "QR code not decoded"
**Solution:** 
```bash
pip install pyzbar pillow
```

### Issue: "CORS error"
**Solution:** Backend already has CORS enabled for localhost

### Issue: "Port already in use"
**Solution:** 
```bash
# Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

## Advanced Testing

### Load Testing:
```bash
# Install Apache Bench
# Test 100 requests
ab -n 100 -c 10 -p url_data.json -T application/json http://localhost:8000/analyze/url
```

### Stress Testing:
```bash
# Test with multiple concurrent users
# Use tools like JMeter or Locust
```

---

**Happy Testing! 🧪**
