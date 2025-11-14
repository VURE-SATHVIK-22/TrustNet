"use client"

import { useState } from "react"
import { Sparkles, MousePointer2, Zap, Star, Heart, ArrowRight } from "lucide-react"

export default function CursorDemo() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MousePointer2 className="w-6 h-6" />
            Enhanced Cursor Demo
          </h1>
          <a 
            href="/"
            className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
            data-magnetic
          >
            Back to Home
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div data-fade-scale>
          <h2 className="text-6xl font-bold mb-6" data-word-reveal>
            Ultra-Smooth Cursor
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Experience premium cursor interactions with smooth following, 
            magnetic effects, and beautiful animations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-20" data-cards-stagger>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl" data-card data-magnetic>
            <div className="text-4xl font-bold text-blue-400 mb-2">60fps</div>
            <div className="text-sm text-blue-200">Smooth Animation</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl" data-card data-magnetic>
            <div className="text-4xl font-bold text-purple-400 mb-2">3 Layers</div>
            <div className="text-sm text-purple-200">Dot, Ring, Trail</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl" data-card data-magnetic>
            <div className="text-4xl font-bold text-pink-400 mb-2">GPU</div>
            <div className="text-sm text-pink-200">Accelerated</div>
          </div>
        </div>
      </section>

      {/* Interactive Elements Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-center mb-12">
          Hover Over These Elements
        </h3>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Primary Button */}
          <div className="text-center">
            <button 
              className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-blue-500/50"
              data-magnetic
              onClick={() => setClickCount(c => c + 1)}
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              Primary Button
            </button>
            <p className="text-sm text-gray-400 mt-2">Magnetic effect + Glow</p>
          </div>

          {/* Secondary Button */}
          <div className="text-center">
            <button 
              className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all hover:shadow-2xl hover:shadow-purple-500/50"
              data-magnetic
            >
              <Zap className="w-5 h-5 inline mr-2" />
              Secondary Button
            </button>
            <p className="text-sm text-gray-400 mt-2">Purple hover state</p>
          </div>

          {/* Outline Button */}
          <div className="text-center">
            <button 
              className="w-full px-8 py-4 border-2 border-white/30 hover:border-white/60 rounded-xl font-semibold transition-all hover:bg-white/5"
              data-magnetic
            >
              <Star className="w-5 h-5 inline mr-2" />
              Outline Button
            </button>
            <p className="text-sm text-gray-400 mt-2">Subtle interaction</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <h4 className="text-2xl font-bold mb-6 text-center">Interactive Links</h4>
          <div className="space-y-4">
            <a 
              href="#" 
              className="block p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all group"
              data-magnetic
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xl font-semibold mb-2">Smooth Cursor Following</h5>
                  <p className="text-gray-400">Dot follows instantly, ring with delay</p>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </a>

            <a 
              href="#" 
              className="block p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all group"
              data-magnetic
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xl font-semibold mb-2">Magnetic Attraction</h5>
                  <p className="text-gray-400">Elements pull the cursor towards them</p>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </a>

            <a 
              href="#" 
              className="block p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all group"
              data-magnetic
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xl font-semibold mb-2">Glow Effects</h5>
                  <p className="text-gray-400">Beautiful glow on hover interactions</p>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mb-20">
          <h4 className="text-2xl font-bold mb-6 text-center">Interactive Cards</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-cards-stagger>
            {[
              { icon: Sparkles, title: "Feature 1", color: "from-blue-500 to-cyan-500" },
              { icon: Zap, title: "Feature 2", color: "from-purple-500 to-pink-500" },
              { icon: Star, title: "Feature 3", color: "from-yellow-500 to-orange-500" },
              { icon: Heart, title: "Feature 4", color: "from-red-500 to-pink-500" }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all group"
                data-card
                data-magnetic
                data-magnetic-strength="0.3"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h5 className="text-lg font-semibold mb-2">{item.title}</h5>
                <p className="text-sm text-gray-400">Hover to see the cursor effect</p>
              </div>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="max-w-2xl mx-auto mb-20">
          <h4 className="text-2xl font-bold mb-6 text-center">Form Elements</h4>
          <div className="space-y-4 p-8 bg-white/5 backdrop-blur-sm rounded-xl">
            <div>
              <label className="block text-sm font-medium mb-2">Text Input</label>
              <input 
                type="text" 
                placeholder="Hover and type here..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Textarea</label>
              <textarea 
                placeholder="Hover and type here..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select</label>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none transition-all">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Click Counter */}
        <div className="text-center">
          <div className="inline-block p-8 bg-white/5 backdrop-blur-sm rounded-xl">
            <p className="text-sm text-gray-400 mb-2">Button Clicks</p>
            <div className="text-6xl font-bold text-blue-400 mb-4" data-counter data-counter-target={clickCount}>
              {clickCount}
            </div>
            <p className="text-sm text-gray-400">Click any button above to increment</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-center mb-12">Cursor Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Smooth Following",
              description: "Dot follows cursor instantly, ring with smooth delay for premium feel"
            },
            {
              title: "Magnetic Effect",
              description: "Cursor is attracted to interactive elements with smooth easing"
            },
            {
              title: "Glow on Hover",
              description: "Beautiful glow effect appears when hovering over buttons and links"
            },
            {
              title: "Click Animation",
              description: "Satisfying scale animation on click for tactile feedback"
            },
            {
              title: "Trail Effect",
              description: "Subtle trail follows cursor with blur for depth perception"
            },
            {
              title: "GPU Accelerated",
              description: "All animations use transform3d for 60fps performance"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl"
              data-fade-scale
            >
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center border-t border-white/10">
        <p className="text-gray-400">
          Move your cursor around to experience the smooth animations
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Desktop only • Automatically disabled on touch devices
        </p>
      </footer>
    </div>
  )
}
