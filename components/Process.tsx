// components/Process.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardCheck,
  Home,
  Shield,
  Sparkles,
  Calendar,
  PhoneCall,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: PhoneCall,
    title: 'Initial Call & Job Discussion',
    text: 'We ask the right questions up front — tree type, access, hazards, and your goals — so we arrive prepared.',
  },
  {
    number: '02',
    icon: Home,
    title: 'On-Site Assessment & Quote',
    text: 'A certified arborist inspects the tree, surrounding structures and access points. You get a clear, fixed quote with no surprises.',
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'Permit Guidance (If Required)',
    text: 'Some Melbourne councils require permits. We help determine if one is needed and guide you through the correct steps.',
  },
  {
    number: '04',
    icon: Shield,
    title: 'Safe, Professional Work',
    text: 'Using the right equipment and safe techniques, we carry out the job efficiently and safely with full public liability insurance.',
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Full Site Clean-Up',
    text: 'Branches chipped, stumps removed on request, and your yard left cleaner than we found it. Mulch available at no cost.',
  },
  {
    number: '06',
    icon: Calendar,
    title: 'Follow-Up & Support',
    text: 'We provide aftercare advice and support for future maintenance, pest issues or replanting.',
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-4 flex w-full justify-center">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 font-semibold text-xs tracking-wide rounded-full">
              OUR PROCESS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-bark-900 mb-4 text-left">
            How We Handle Your Tree Work — Start to Finish
          </h2>
          <p className="text-lg text-bark-700 max-w-2xl text-left">
            A clean, transparent workflow that homeowners trust. No guesswork — just
            certified arborists doing things properly.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="space-y-14">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-6"
            >
              {/* Marker */}
              <div className="flex items-center justify-center self-stretch">
                <span className="h-3 w-3 rounded-full bg-green-600 ring-4 ring-green-100" />
              </div>

              {/* Vertical line */}
              <div className="w-px self-stretch bg-bark-200" />

              {/* Content */}
              <div className="bg-bark-50 shadow-sm border border-bark-100 rounded-2xl p-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-xl p-3 flex-shrink-0">
                    <step.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-700 tracking-widest">
                      {step.number}
                    </p>
                    <h3 className="text-xl font-bold text-bark-900 mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-bark-700 text-sm leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
