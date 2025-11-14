// components/Services.tsx
'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Scissors, TreeDeciduous, Leaf, Shield, Truck, Clock, Sparkles, Trees } from 'lucide-react'

const services = [
  {
    icon: TreeDeciduous,
    title: 'Tree Removal',
    description: 'Safe and efficient removal of unwanted or dangerous trees with minimal impact to your property.',
    features: ['Crane assistance available', 'Stump grinding included', 'Full cleanup service'],
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Scissors,
    title: 'Precision Pruning',
    description: 'Expert trimming and shaping to enhance tree health, safety, and aesthetic appeal.',
    features: ['Crown thinning', 'Deadwood removal', 'Structural pruning'],
    color: 'from-primary-500 to-green-500',
  },
  {
    icon: Leaf,
    title: 'Tree Health Care',
    description: 'Comprehensive assessment and treatment plans to ensure your trees thrive for generations.',
    features: ['Disease diagnosis', 'Pest management', 'Soil analysis'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Emergency Response',
    description: '24/7 emergency service for storm damage, fallen trees, and urgent safety hazards.',
    features: ['Rapid response', 'Insurance assistance', 'Priority service'],
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Truck,
    title: 'Waste Management',
    description: 'Eco-friendly disposal and recycling of all green waste, mulch available upon request.',
    features: ['Wood chipping', 'Mulch delivery', 'Complete removal'],
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Trees,
    title: 'Land Clearing',
    description: 'Professional vegetation management for development, fire prevention, and landscaping.',
    features: ['Site preparation', 'Selective clearing', 'Erosion control'],
    color: 'from-purple-500 to-pink-500',
  },
]

export function Services() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white via-sage-50/30 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-nature-pattern opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Our Expertise</span>
            <Sparkles className="w-5 h-5 text-primary-500" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bark-800 to-sage-700">
              Professional Tree Services
            </span>
          </h2>
          <p className="text-xl text-bark-600 max-w-3xl mx-auto leading-relaxed">
            From routine maintenance to emergency response, our certified arborists deliver 
            excellence in every branch of tree care
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ scale }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-primary-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon container with gradient background */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-3.5 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                </div>

                <h3 className="text-2xl font-bold text-bark-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-bark-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-bark-700">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative corner accent */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary-100 to-transparent rounded-tl-3xl opacity-50" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-primary-50 to-sage-50 rounded-full border border-primary-200">
            <Clock className="w-5 h-5 text-primary-600" />
            <span className="text-bark-700 font-medium">
              Same-day quotes available • Free consultations • Emergency service 24/7
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}