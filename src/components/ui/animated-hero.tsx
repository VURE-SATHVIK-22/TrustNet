"use client"

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Shield, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => [
    "secure", 
    "intelligent", 
    "advanced", 
    "reliable", 
    "powerful"
  ], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const scrollToScanner = () => {
    const scannerSection = document.getElementById('scanner');
    if (scannerSection) {
      scannerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-32 items-center justify-center flex-col">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
            >
              <Shield className="w-4 h-4" />
              AI-Powered Phishing Protection 
              <MoveRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Main Title */}
          <div className="flex gap-4 flex-col">
            <motion.h1 
              className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-encode-sans font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gray-900">TrustNet is</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle with Quintessential font */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <p className="font-quintessential text-2xl md:text-3xl text-blue-600 mb-4">
                Know Before You Click
              </p>
              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl text-center font-encode-sans">
                Protect yourself from phishing attacks with our advanced AI-powered detection system. 
                Analyze suspicious URLs and emails in real-time with machine learning algorithms 
                that provide instant, accurate threat assessments.
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-encode-sans"
              onClick={scrollToScanner}
            >
              <Zap className="w-5 h-5" />
              Start Scanning Now
              <MoveRight className="w-4 h-4" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-4 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 font-encode-sans"
            >
              <Brain className="w-5 h-5" />
              Learn How It Works
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 font-encode-sans">25K+</div>
              <div className="text-sm text-gray-600 font-encode-sans">Scans Performed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 font-encode-sans">99.7%</div>
              <div className="text-sm text-gray-600 font-encode-sans">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 font-encode-sans">&lt;50ms</div>
              <div className="text-sm text-gray-600 font-encode-sans">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 font-encode-sans">3.2K+</div>
              <div className="text-sm text-gray-600 font-encode-sans">Threats Blocked</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };