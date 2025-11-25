// components/Hero.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Clock,
  CheckCircle,
  Phone,
  Zap,
  Send,
  AlertCircle,
  MapPin,
  Mail,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function Hero() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'tree-removal',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s()-]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please describe the service you need';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'tree-removal',
          message: '',
        });
        setErrors({});

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Static Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/HeroSectionBackgroundNo2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Side - Headlines and Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Melbourne&apos;s Premier{' '}
              <span className="mt-2 block bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                Tree Service Experts
              </span>
            </h1>

            <p className="mb-8 text-lg text-white/85 md:text-xl">
              Professional tree removal, pruning, and emergency response with 15+ years
              of experience across Melbourne.
            </p>

            {/* Service highlights */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                <span className="text-left">
                  Free quotes with fixed pricing - no surprises
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                <span className="text-left">
                  Same day service for urgent tree work
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                <span className="text-left">
                  Certified arborists with $20M insurance
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                <span className="text-left">
                  Complete cleanup &amp; green waste removal
                </span>
              </div>
            </div>

            {/* Emergency Call Banner */}
            <div className="rounded-2xl border border-orange-400/30 bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-200">
                <Zap className="h-4 w-4" />
                24/7 Emergency Service
              </div>
              <p className="mb-4 text-white/90">
                Storm damage or dangerous trees? Call us now for immediate assistance.
              </p>

              <a
                href="tel:0429187791"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-orange-600 shadow-lg transition hover:bg-orange-50"
              >
                <Phone className="h-5 w-5" />
                0429 187 791
              </a>
            </div>

            {/* Contact details */}
            <div className="mt-8 space-y-2 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-300" />
                <span className="text-sm">Servicing all Melbourne suburbs</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-300" />
                <span className="text-sm">kyle@lmktreeservices.com</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full"
          >
            <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              {/* Form Header */}
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold text-bark-900 sm:text-3xl">
                  Get Your Free Quote
                </h2>
                <p className="text-sm text-bark-600">
                  Tell us about your trees - we&apos;ll respond within 24 hours
                </p>
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-lg bg-emerald-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900">Quote request sent!</p>
                      <p className="text-sm text-emerald-700">
                        We&apos;ll contact you within 24 hours with pricing and next
                        steps.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Phone Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      className={`w-full rounded-lg border-2 px-4 py-3 text-bark-900 placeholder:text-bark-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                        errors.name ? 'border-red-500' : 'border-bark-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className={`w-full rounded-lg border-2 px-4 py-3 text-bark-900 placeholder:text-bark-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                        errors.phone ? 'border-red-500' : 'border-bark-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className={`w-full rounded-lg border-2 px-4 py-3 text-bark-900 placeholder:text-bark-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
                      errors.email ? 'border-red-500' : 'border-bark-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Service Type */}
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-bark-200 bg-white px-4 py-3 text-bark-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  >
                    <option value="tree-removal">Tree Removal</option>
                    <option value="tree-lopping">Tree Lopping &amp; Pruning</option>
                    <option value="tree-health">Tree Health Assessment</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="waste-removal">Green Waste Removal</option>
                    <option value="land-clearing">Land Clearing</option>
                    <option value="other">Other Service</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your tree service needs (location, access, specific concerns) *"
                    rows={4}
                    className={`w-full rounded-lg border-2 px-4 py-3 text-bark-900 placeholder:text-bark-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none ${
                      errors.message ? 'border-red-500' : 'border-bark-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-600">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:from-emerald-700 hover:to-emerald-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      Get Free Quote
                    </span>
                  )}
                </button>

                <p className="text-center text-xs text-bark-500">
                  * Required fields. Your information is safe with us.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
