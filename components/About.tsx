// components/About.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Zap, HeartHandshake, CheckCircle, TrendingUp, Shield, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Industry Leaders',
    description: 'Certified Level 5 Arborists with advanced rigging qualifications',
    stat: 'Top 1%',
  },
  {
    icon: Shield,
    title: 'Fully Protected',
    description: '$20M public liability insurance for complete peace of mind',
    stat: '$20M',
  },
  {
    icon: TrendingUp,
    title: 'Proven Excellence',
    description: 'Consistently rated 5 stars across 500+ verified reviews',
    stat: '5.0★',
  },
  {
    icon: HeartHandshake,
    title: 'Community Trust',
    description: 'Preferred arborist for local councils and major developments',
    stat: '2500+',
  },
]

const credentials = [
  'Victorian Tree Industry Organisation (VTIO) Member',
  'International Society of Arboriculture (ISA) Certified',
  'WorkSafe Victoria Compliant',
  'Environmental Management Certified',
]

export function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-sage-50/40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-100 to-transparent rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-sage-100 to-transparent rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Why Choose Us</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bark-800 to-sage-700">
                Melbourne's Most Trusted
              </span>
              <br />
              <span className="text-primary-600">Tree Care Experts</span>
            </h2>
            
            <p className="text-lg text-bark-600 mb-6 leading-relaxed">
              With over 15 years of dedication to arboriculture excellence, we've built our reputation 
              on safety, precision, and environmental stewardship. Every project reflects our commitment 
              to preserving Melbourne's urban forest while protecting your property.
            </p>
            
            <p className="text-lg text-bark-600 mb-8 leading-relaxed">
              Our team combines traditional arborist craftsmanship with cutting-edge techniques and 
              equipment, ensuring optimal outcomes for both residential gardens and large-scale 
              commercial projects.
            </p>

            {/* Credentials */}
            <div className="space-y-3 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-primary-100">
              <h3 className="font-bold text-bark-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-600" />
                Industry Accreditations
              </h3>
              {credentials.map((credential) => (
                <div key={credential} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-bark-700 text-sm font-medium">{credential}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary-50 overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Stat display */}
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sage-600 mb-3">
                      {feature.stat}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-sage-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-bark-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-bark-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-sage-600 rounded-3xl p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-100 text-sm">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-primary-100 text-sm">Trees Serviced</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-100 text-sm">Safety Record</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100 text-sm">Emergency Response</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}