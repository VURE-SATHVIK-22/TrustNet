"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { Shield, Brain, Zap, Eye, Lock, Target } from "lucide-react";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <Shield className="h-16 w-16 text-blue-600" />
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                    TrustNet
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    AI-Powered Security
                  </p>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Advanced Phishing Detection with{" "}
              <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Machine Learning
              </span>
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Real-time AI Analysis</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Privacy-First</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                <Target className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">95%+ Accuracy</span>
              </div>
            </div>
          </>
        }
      >
        <div className="mx-auto rounded-2xl object-cover h-full object-left-top bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            {/* Left side - Dashboard Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Threat Analysis</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trust Score</span>
                    <span className="text-2xl font-bold text-green-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">1,247</div>
                      <div className="text-xs text-gray-500">Safe</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-600">89</div>
                      <div className="text-xs text-gray-500">Suspicious</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-600">23</div>
                      <div className="text-xs text-gray-500">Dangerous</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Detections</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">paypal-security.com</span>
                    </div>
                    <span className="text-xs text-red-600 font-medium">PHISHING</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">github.com</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">SAFE</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">bit.ly/urgent</span>
                    </div>
                    <span className="text-xs text-yellow-600 font-medium">SUSPICIOUS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - ML Visualization */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Email Detection</span>
                      <span className="font-semibold">96.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '96.2%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>URL Analysis</span>
                      <span className="font-semibold">94.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '94.7%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Ensemble Model</span>
                      <span className="font-semibold">97.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '97.8%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Intelligence</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">15.8K</div>
                    <div className="text-xs text-blue-700">URLs Analyzed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">2.3K</div>
                    <div className="text-xs text-purple-700">Threats Blocked</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="h-6 w-6" />
                  <span className="font-semibold">Real-time Protection</span>
                </div>
                <p className="text-sm opacity-90">
                  Advanced ML models analyze threats in real-time with sub-second response times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}