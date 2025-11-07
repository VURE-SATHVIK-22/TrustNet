"use client"

import { Shield, Zap, Eye, Brain, Lock, Sparkles } from "lucide-react"

export function AnimationShowcase() {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          data-parallax 
          data-parallax-speed="0.2"
          className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"
        />
        <div 
          data-parallax 
          data-parallax-speed="0.4"
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with word reveal */}
        <div className="text-center mb-20">
          <h2 
            data-word-reveal
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Cinematic Scroll Experience
          </h2>
          <p 
            data-fade-scale
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Every scroll tells a story with smooth animations and premium interactions
          </p>
        </div>

        {/* Feature grid with stagger */}
        <div 
          data-cards-stagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              icon: Shield,
              title: "Parallax Depth",
              description: "Elements move at different speeds creating immersive depth",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Brain,
              title: "Smart Animations",
              description: "GPU-accelerated transitions for buttery-smooth 60fps",
              color: "from-purple-500 to-pink-500"
            },
            {
              icon: Zap,
              title: "Instant Response",
              description: "Magnetic interactions and smooth cursor following",
              color: "from-yellow-500 to-orange-500"
            },
            {
              icon: Eye,
              title: "Visual Feedback",
              description: "Every interaction provides clear, elegant feedback",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: Lock,
              title: "Performance First",
              description: "Optimized for all devices with smart degradation",
              color: "from-red-500 to-pink-500"
            },
            {
              icon: Sparkles,
              title: "Accessibility",
              description: "Respects reduced motion preferences automatically",
              color: "from-indigo-500 to-purple-500"
            }
          ].map((feature, index) => (
            <div
              key={index}
              data-card
              data-magnetic
              data-magnetic-strength="0.2"
              className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon with rotation */}
              <div 
                data-rotate-scroll
                data-rotate-amount="15"
                className={`relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}
              >
                <feature.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats section with counters */}
        <div 
          data-fade-scale
          className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 60, label: "FPS Performance", suffix: "" },
              { value: 100, label: "Animation Types", suffix: "+" },
              { value: 99, label: "Smooth Score", suffix: "%" },
              { value: 0, label: "Motion Sickness", suffix: "" }
            ].map((stat, index) => (
              <div 
                key={index}
                data-card
                className="text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  <span 
                    data-counter 
                    data-counter-target={stat.value}
                    data-counter-duration="2"
                  >
                    0
                  </span>
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image reveal demo */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-slide-left>
            <div 
              data-image-reveal
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
                alt="AI Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div data-slide-right className="flex flex-col justify-center">
            <h3 
              data-text-reveal
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Award-Winning Motion Design
            </h3>
            <p 
              data-fade-scale
              className="text-lg text-gray-600 leading-relaxed mb-6"
            >
              Every element on this page is carefully choreographed to create 
              a seamless, immersive experience that guides your attention and 
              enhances storytelling.
            </p>
            <div data-blur-fade>
              <button 
                data-magnetic
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-shadow"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
