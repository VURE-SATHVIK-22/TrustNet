"use client";
import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Shield, AlertTriangle, Users, DollarSign, Globe, Lock } from "lucide-react";

export function PhishingTimeline() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">AI-Powered Defense Era</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            Advanced machine learning models achieve 97%+ accuracy in phishing detection. 
            TrustNet launches with real-time AI analysis and privacy-first architecture.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-blue-900">Global Impact</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3M</div>
              <div className="text-sm text-blue-700">Phishing attempts blocked by AI</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <Lock className="h-6 w-6 text-green-600" />
                <span className="font-semibold text-green-900">Privacy Protection</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-green-700">Local processing, zero data upload</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">97.8%</div>
                <div className="text-xs text-gray-600">AI Accuracy</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">&lt;500ms</div>
                <div className="text-xs text-gray-600">Analysis Time</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">ChatGPT Phishing Surge</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            AI-generated phishing emails become more sophisticated. Cybercriminals leverage ChatGPT 
            to create convincing phishing content, leading to a 1,265% increase in malicious emails.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
              <div className="text-2xl font-bold text-red-600">1,265%</div>
              <div className="text-sm text-red-700">Increase in AI-generated phishing</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
              <div className="text-2xl font-bold text-orange-600">$12.5B</div>
              <div className="text-sm text-orange-700">Global losses to phishing</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <div className="text-2xl font-bold text-yellow-600">3.4B</div>
              <div className="text-sm text-yellow-700">Phishing emails sent daily</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Major Incidents:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Microsoft 365 phishing campaign affects 10,000+ organizations</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>PayPal credential harvesting reaches 2.1M attempted victims</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Banking trojans evolve with AI-assisted social engineering</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Remote Work Exploitation</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            Cybercriminals exploit remote work vulnerabilities. COVID-19 themed phishing campaigns 
            target remote workers with fake VPN updates, collaboration tool scams, and work-from-home offers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">255%</div>
              <div className="text-xs text-purple-700">Increase in phishing</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">1 in 4</div>
              <div className="text-xs text-blue-700">Remote workers targeted</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">$6.9B</div>
              <div className="text-xs text-green-700">BEC losses</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">83%</div>
              <div className="text-xs text-red-700">Organizations hit</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3">Top Attack Vectors:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Fake VPN Updates</span>
                </div>
                <div className="text-xs text-gray-600 ml-5">Malicious software disguised as security updates</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Zoom/Teams Scams</span>
                </div>
                <div className="text-xs text-gray-600 ml-5">Fake meeting invitations with credential theft</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Cryptocurrency Boom Scams</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            Cryptocurrency phishing explodes with Bitcoin reaching all-time highs. Fake crypto exchanges, 
            wallet scams, and NFT phishing campaigns target investors with sophisticated social engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
              <h4 className="font-semibold text-green-900 mb-4">Crypto Losses</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Total Stolen</span>
                  <span className="font-bold text-green-600">$14B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Victims</span>
                  <span className="font-bold text-green-600">46,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Fake Exchanges</span>
                  <span className="font-bold text-green-600">1,200+</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl">
              <h4 className="font-semibold text-orange-900 mb-4">Attack Methods</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-700">Fake wallet apps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-700">Ponzi scheme websites</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-700">Celebrity impersonation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-700">Fake ICO launches</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Notable Incident</span>
            </div>
            <p className="text-sm text-yellow-700">
              Elon Musk Twitter impersonation scams steal over $2M in Bitcoin through fake giveaway campaigns.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">COVID-19 Pandemic Exploitation</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            Cybercriminals exploit global pandemic fears. COVID-19 themed phishing campaigns surge 667%, 
            targeting healthcare workers, remote employees, and vulnerable populations with vaccine scams and fake relief funds.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
              <div className="text-3xl font-bold text-red-600 mb-2">667%</div>
              <div className="text-sm text-red-700">Increase in COVID-themed phishing</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
              <div className="text-3xl font-bold text-orange-600 mb-2">$4.2B</div>
              <div className="text-sm text-orange-700">Pandemic-related cyber losses</div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-xl mb-4">
            <h4 className="font-semibold mb-4">Major Campaign Types:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm">Fake vaccine registration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Stimulus payment scams</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm">Fake WHO/CDC alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Contact tracing fraud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Business Email Compromise Peak</h3>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-6">
            Business Email Compromise (BEC) attacks reach unprecedented levels. Sophisticated CEO fraud 
            and vendor impersonation schemes target enterprises, resulting in $26 billion in global losses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">$26B</div>
              <div className="text-sm text-blue-700">BEC Global Losses</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">166K</div>
              <div className="text-sm text-purple-700">Reported Incidents</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-100 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-sm text-green-700">Email-based Attacks</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Evolution of Tactics:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">CEO Fraud 2.0</div>
                  <div className="text-sm text-gray-600">Advanced social engineering with deep research on executives</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Vendor Impersonation</div>
                  <div className="text-sm text-gray-600">Sophisticated supply chain targeting with invoice fraud</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-gray-900">Real Estate Wire Fraud</div>
                  <div className="text-sm text-gray-600">Targeting high-value property transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white">
      <Timeline data={data} />
    </div>
  );
}