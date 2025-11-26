// components/About.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Award, TreePine, Sparkles } from 'lucide-react'

export function About() {
  return (
    // On mobile: normal spacing below hero (mt-10)
    // On tablet: closer, but not overlapping (sm:mt-12)
    // On desktop: overlapping hero for that lifted-card look (lg:-mt-32)
    <section id="about" className="relative z-20 mt-10 sm:mt-12 lg:-mt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Main card - SOLID dark green background, no transparency */}
          <div className="relative overflow-hidden rounded-3xl bg-[#14532d] p-8 shadow-2xl sm:p-12">
            {/* Decorative gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-transparent to-green-900/30" />
            
            {/* Decorative glow elements */}
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-green-400/20 blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  About us
                </h2>
                <div className="mb-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-green-300" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-3xl"
              >
                <p className="mb-6 text-lg leading-relaxed text-white sm:text-xl">
                  LMK Tree Services is a trusted name in Tree Lopping and Removal across Melbourne&apos;s
                  south-east. We also specialise in stump grinding and removal, mulching, and pruning.
                </p>

                <p className="mb-8 text-emerald-100">
                  Need a tree removed? Get in touch with our team today.
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="inline-block rounded-full bg-emerald-500 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-emerald-900/30"
                >
                  No job is too big or small!
                </motion.div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
              >
                {[
                  { icon: TreePine, value: '15+', label: 'Years Experience' },
                  { icon: Shield, value: '$20M', label: 'Insurance Cover' },
                  { icon: Award, value: '1000+', label: 'Trees Serviced' },
                  { icon: Sparkles, value: '24/7', label: 'Emergency Service' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <stat.icon className="mb-2 h-6 w-6 text-emerald-400" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-emerald-200">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
