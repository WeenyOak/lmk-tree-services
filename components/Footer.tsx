// components/Footer.tsx
'use client'

import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#14532d] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="LMK Tree Services"
            width={160}
            height={80}
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Contact info row */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <a
            href="tel:0429187791"
            className="flex items-center gap-2 text-white transition-colors hover:text-emerald-300"
          >
            <Phone className="h-4 w-4 text-emerald-400" />
            <span className="font-medium">0429 187 791</span>
          </a>

          <a
            href="mailto:kyle@lmktreeservices.com"
            className="flex items-center gap-2 text-white transition-colors hover:text-emerald-300"
          >
            <Mail className="h-4 w-4 text-emerald-400" />
            <span className="font-medium">kyle@lmktreeservices.com</span>
          </a>

          <div className="flex items-center gap-2 text-white">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span className="font-medium">Melbourne&apos;s South-East</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-white/20" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/70">
            &copy; {currentYear} LMK Tree Services. All Rights Reserved.
          </p>

          {/* Designed by + Blank Slate Dev logo */}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-sm text-white/70">Designed by</span>
            <a
              href="https://blankslatedev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-105"
            >
              <Image
                src="/BlankSlateDevToFillHeader.png"
                alt="Blank Slate Dev"
                width={96}
                height={96}
                className="object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.85)] hover:drop-shadow-[0_0_18px_rgba(16,185,129,1)] transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
