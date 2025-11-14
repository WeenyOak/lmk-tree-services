// components/Hero.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Shield, Award, Clock, TreePine } from 'lucide-react'
import { Button } from './ui/Button'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToConsultation = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sage-50 via-white to-primary-50/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px]"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-3xl" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px]"
        >
          <div className="w-full h-full bg-gradient-to-tl from-sage-200/40 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        {/* Floating tree silhouettes */}
        <motion.div
          className="absolute top-20 right-10 opacity-10"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <TreePine className="w-32 h-32 text-primary-700" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-10 opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <TreePine className="w-24 h-24 text-sage-700" />
        </motion.div>
      </div>

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
          }}
          className="transition-transform duration-300 ease-out"
        >
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-8 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-lg">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-bark-800">Fully Insured</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-lg">
              <Award className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-bark-800">Certified Arborists</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 shadow-lg">
              <Clock className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-bark-800">24/7 Emergency</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bark-800 via-bark-700 to-sage-700">
              Melbourne's Premier
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-sage-600">
              Tree Services
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-bark-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Expert arborists delivering safe, efficient tree removal, pruning, and maintenance 
            with a commitment to environmental excellence
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button 
              size="xl" 
              onClick={scrollToConsultation}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-600 transform transition-transform group-hover:scale-110" />
            </Button>
            <Button 
              size="xl" 
              variant="glass" 
              onClick={scrollToServices}
              className="backdrop-blur-md"
            >
              Explore Our Services
            </Button>
          </motion.div>

          {/* Stats with better design */}
          <motion.div
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { number: '15+', label: 'Years Excellence', icon: '🌳' },
              { number: '2,500+', label: 'Trees Serviced', icon: '✨' },
              { number: '100%', label: 'Safety Record', icon: '🛡️' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-primary-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-sage-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-bark-600 font-medium mt-1">{stat.label}</div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-sage-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-bark-500 font-medium uppercase tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-bark-400 flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}