// components/AreasServiced.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, MapPin } from 'lucide-react'

const areas = [
  'Beaconsfield',
  'Berwick',
  'Bunyip',
  'Churchill',
  'Clyde',
  'Clyde North',
  'Cranbourne',
  'Cranbourne East',
  'Cranbourne West',
  'Drouin',
  'Endeavour Hills',
  'Garfield',
  'Glengarry',
  'Glengarry West',
  'Hallam',
  'Hazelwood North',
  'Koo Wee Rup',
  'Lang Lang',
  'Longwarry',
  'Moe',
  'Morwell',
  'Narre Warren',
  'Newborough',
  'Officer',
  'Pakenham',
  'Trafalgar',
  'Traralgon',
  'Warragul',
  'Yarragon',
]

export function AreasServiced() {
  // Mobile: 2 columns (15 + 14)
  const mobileCol1 = areas.slice(0, 15)
  const mobileCol2 = areas.slice(15)

  // Desktop: 3 columns (10 + 10 + 9)
  const desktopCol1 = areas.slice(0, 10)
  const desktopCol2 = areas.slice(10, 20)
  const desktopCol3 = areas.slice(20)

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-emerald-50 to-green-100 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-10 flex items-start gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-3 shadow-lg shadow-emerald-500/25">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary-800 sm:text-4xl">
                Areas We Service
              </h2>
              <p className="mt-2 text-gray-600">
                Proudly servicing Gippsland & Melbourne&apos;s outer south-east
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-3 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-emerald-400 to-green-500"
              />
            </div>
          </div>

          {/* Mobile: 2 columns (hidden on lg+) */}
          <div className="grid grid-cols-2 gap-x-4 lg:hidden">
            <div className="space-y-0">
              {mobileCol1.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.02 }}
                  className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-50"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-0">
              {mobileCol2.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.02 }}
                  className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-50"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: 3 columns (hidden below lg) */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="space-y-0">
              {desktopCol1.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.02 }}
                  className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-50"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-0">
              {desktopCol2.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.02 }}
                  className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-50"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-0">
              {desktopCol3.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.02 }}
                  className="group flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-emerald-50"
                >
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-200">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 transition-colors group-hover:text-gray-900">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-6 text-center"
          >
            <p className="text-lg font-semibold text-emerald-700 mb-2">
              Don&apos;t see your suburb?
            </p>
            <p className="text-gray-600">
              We travel up to an hour from Drouin — from Narre Warren to Traralgon and everywhere in between. Get in touch to confirm we service your area.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}