"use client"

import { Calendar, Code, FileText, User, Clock, Brain, Shield, Zap } from "lucide-react"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { FeatureSteps } from "@/components/ui/feature-section"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"

export default function DemoPage() {
  // Demo timeline data
  const timelineData = [
    {
      id: 1,
      title: "AI Research",
      date: "Jan 2024",
      content: "Advanced research into phishing detection algorithms and machine learning models.",
      category: "Research",
      icon: Brain,
      relatedIds: [2],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: "Model Training",
      date: "Feb 2024",
      content: "Training sophisticated ML models on large datasets of phishing examples.",
      category: "Development",
      icon: Code,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 3,
      title: "Real-time Engine",
      date: "Mar 2024",
      content: "Building real-time analysis engine with WebSocket support for instant results.",
      category: "Development",
      icon: Zap,
      relatedIds: [2, 4],
      status: "in-progress" as const,
      energy: 75,
    },
    {
      id: 4,
      title: "User Interface",
      date: "Apr 2024",
      content: "Designing intuitive interface with animated components and clear visualizations.",
      category: "Design",
      icon: FileText,
      relatedIds: [3, 5],
      status: "in-progress" as const,
      energy: 60,
    },
    {
      id: 5,
      title: "Security Audit",
      date: "May 2024",
      content: "Comprehensive security review and penetration testing of the platform.",
      category: "Security",
      icon: Shield,
      relatedIds: [4, 6],
      status: "pending" as const,
      energy: 30,
    },
    {
      id: 6,
      title: "Public Launch",
      date: "Jun 2024",
      content: "Official public release with full documentation and community support.",
      category: "Release",
      icon: Clock,
      relatedIds: [5],
      status: "pending" as const,
      energy: 10,
    },
  ];

  // Demo feature steps
  const demoFeatures = [
    {
      step: 'Step 1',
      title: 'Paste Content',
      content: 'Simply paste any suspicious URL or email content into our intelligent scanner.',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2070&auto=format&fit=crop'
    },
    {
      step: 'Step 2',
      title: 'AI Analysis',
      content: 'Our advanced machine learning models analyze over 50 different risk factors in real-time.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
    },
    {
      step: 'Step 3',
      title: 'Get Results',
      content: 'Receive detailed analysis with trust scores, explanations, and actionable security recommendations.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Hero Section */}
      <HeroGeometric 
        badge="Component Demo"
        title1="Animated Components"
        title2="Showcase"
      />
      
      {/* Feature Steps Demo */}
      <section className="py-20 bg-gray-50">
        <FeatureSteps 
          features={demoFeatures}
          title="Interactive Feature Steps"
          autoPlayInterval={4000}
        />
      </section>
      
      {/* Radial Timeline Demo */}
      <section className="py-0">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>
      
      {/* Component Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Advanced Animation Components
            </h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              These components showcase modern web animations using Framer Motion, 
              providing engaging user experiences with smooth transitions and interactive elements.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Geometric Hero</h3>
                <p className="text-gray-700">
                  Animated floating shapes with smooth entrance animations and gradient backgrounds.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Feature Steps</h3>
                <p className="text-gray-700">
                  Auto-playing step-by-step guide with smooth image transitions and progress indicators.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Orbital Timeline</h3>
                <p className="text-gray-700">
                  Interactive 3D orbital timeline with expandable nodes and connection visualization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}