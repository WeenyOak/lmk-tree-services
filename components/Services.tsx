// components/Services.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Tree Lopping',
    description: 'Safe and controlled tree reduction',
    image: '/services/lopping.jpg',
    color: 'from-emerald-600/80 to-emerald-900/90',
  },
  {
    title: 'Tree Removal',
    description: 'Safe removal of unwanted trees',
    image: '/services/tree-removal.jpg',
    color: 'from-green-600/80 to-green-900/90',
  },
  {
    title: 'Residential Tree Pruning',
    description: 'Expert shaping and health maintenance',
    image: '/services/pruning.jpg',
    color: 'from-teal-600/80 to-teal-900/90',
  },
  {
    title: 'Stump Grinding',
    description: 'Complete stump removal below ground',
    image: '/services/stump-grinding.jpg',
    color: 'from-emerald-700/80 to-emerald-950/90',
  },
  {
    title: 'Land Clearing',
    description: 'Complete site preparation for development',
    image: '/services/land-clearing.jpg',
    color: 'from-green-700/80 to-green-950/90',
  },
  {
    title: 'Mulching',
    description: 'Eco-friendly waste recycling',
    image: '/services/mulching.jpg',
    color: 'from-emerald-600/80 to-green-900/90',
  },
]

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-3xl font-bold text-primary-800 sm:text-4xl lg:text-5xl"
          >
            We Specialise in the following areas of tree removal
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
          />
        </motion.div>

        {/* Services Grid */}
        {/* Mobile now shows 2 columns as well */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                {/* Background Image with zoom effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                    backgroundColor: '#166534',
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${service.color} transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.h3
                    className="text-2xl font-bold text-white drop-shadow-lg"
                    initial={{ y: 0 }}
                    whileHover={{ y: -4 }}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description - appears on hover */}
                  <div className="mt-2 overflow-hidden">
                    <p className="translate-y-4 text-sm text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/90">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-2 text-white/0 transition-all duration-300 group-hover:text-white/90">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
