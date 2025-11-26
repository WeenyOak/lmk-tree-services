// components/Hero.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, Reorder } from 'framer-motion';
import {
  CheckCircle,
  Phone,
  Send,
  AlertCircle,
  Upload,
  X,
  GripVertical,
  ChevronDown,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  suburb: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  phone?: string;
  message?: string;
  images?: string;
}

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

export function Hero() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    suburb: '',
    message: '',
  });
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Enable parallax only on desktop (lg and up) so mobile doesn't fade the form
  const [enableParallax, setEnableParallax] = useState(false);

  useEffect(() => {
    const updateParallax = () => {
      if (typeof window === 'undefined') return;
      // Tailwind's lg breakpoint is 1024px
      setEnableParallax(window.innerWidth >= 1024);
    };

    updateParallax();
    window.addEventListener('resize', updateParallax);
    return () => window.removeEventListener('resize', updateParallax);
  }, []);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = 5 - imageItems.length;
      if (remainingSlots <= 0) {
        setErrors((prev) => ({ ...prev, images: 'Maximum 5 images allowed' }));
        setTimeout(() => setErrors((prev) => ({ ...prev, images: undefined })), 3000);
        return;
      }

      const newFiles = acceptedFiles.slice(0, remainingSlots);
      if (imageItems.length + acceptedFiles.length > 5) {
        setErrors((prev) => ({ ...prev, images: 'Maximum 5 images allowed' }));
        setTimeout(() => setErrors((prev) => ({ ...prev, images: undefined })), 3000);
      }

      const newItems: ImageItem[] = newFiles.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      setImageItems((prev) => [...prev, ...newItems]);
    },
    [imageItems.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic'] },
    maxSize: 10485760,
    multiple: true,
  });

  const removeImage = (id: string) => {
    setImageItems((prev) => {
      const item = prev.find((img) => img.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
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
    if (!formData.message.trim()) newErrors.message = 'Please describe the job';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const imagePromises = imageItems.map(
        (item) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(item.file);
          })
      );

      const base64Images = await Promise.all(imagePromises);

      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          service: 'tree-removal',
          message: formData.suburb
            ? `Suburb: ${formData.suburb}\n\n${formData.message}`
            : formData.message,
          images: base64Images,
          imageNames: imageItems.map((item) => item.file.name),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          suburb: '',
          message: '',
        });
        imageItems.forEach((item) => URL.revokeObjectURL(item.preview));
        setImageItems([]);
        setErrors({});
        setTimeout(() => setSubmitStatus('idle'), 5000);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const scrollToNext = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: backgroundY }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/HeroSectionBackgroundNo2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </motion.div>

      {/* Animated grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32"
        style={enableParallax ? { y: contentY, opacity } : undefined}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: Copy with staggered animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block">LMK Tree</span>
                <span className="block bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4 text-xl font-medium text-white/90"
            >
              Need professional tree removal services?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="mb-2 text-lg text-white/80">
                Call for a free quote on{' '}
                <a
                  href="tel:0429187791"
                  className="font-bold text-white underline decoration-emerald-400 decoration-2 underline-offset-4 transition-colors hover:decoration-emerald-300"
                >
                  0429 187 791
                </a>
              </p>
              <p className="mb-8 text-white/70">
                Our tree cutting and lopping services are delivered by highly trained arborists at
                affordable prices.
              </p>
            </motion.div>

            {/* Trust badges with stagger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              {[
                'Free quotes with fixed pricing - no surprises',
                'Same day service for urgent tree work',
                'Certified arborists with $20M insurance',
                'Complete cleanup & green waste removal',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/90"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 backdrop-blur-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Phone CTA - visible on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-10 lg:hidden"
            >
              <a
                href="tel:0429187791"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                0429 187 791
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Form Card with glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-green-500/10 to-emerald-500/20 blur-2xl" />

              <div className="relative rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                {/* Form Header */}
                <div className="mb-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
                  >
                    <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    Same Day Quotes
                  </motion.div>
                </div>

                {/* Success */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mb-6 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-emerald-100 p-1">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-900">Quote request sent!</p>
                        <p className="text-sm text-emerald-700">
                          We&apos;ll contact you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-xl bg-red-50 p-4 ring-1 ring-red-100"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-900">Something went wrong</p>
                        <p className="text-sm text-red-700">Please call us at 0429 187 791</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name *"
                        className={`w-full rounded-xl border-2 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none ${
                          errors.firstName
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  {/* Contact fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone *"
                        className={`w-full rounded-xl border-2 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none ${
                          errors.phone
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        className={`w-full rounded-xl border-2 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none ${
                          errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Suburb */}
                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    placeholder="Suburb"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Job Description *"
                      rows={3}
                      className={`w-full rounded-xl border-2 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none resize-none ${
                        errors.message
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <div
                      {...getRootProps()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${
                        isDragActive
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-gray-300 bg-gray-50/50 hover:border-emerald-400 hover:bg-emerald-50/50'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                      <p className="text-sm text-gray-600">Upload Images</p>
                      <p className="text-xs text-gray-400">Drag &amp; drop or click (max 5)</p>
                    </div>

                    {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}

                    {imageItems.length > 0 && (
                      <div className="mt-3">
                        <Reorder.Group
                          axis="x"
                          values={imageItems}
                          onReorder={setImageItems}
                          className="flex flex-wrap gap-2"
                        >
                          {imageItems.map((item) => (
                            <Reorder.Item
                              key={item.id}
                              value={item}
                              className="relative cursor-grab active:cursor-grabbing"
                              whileDrag={{ scale: 1.05, zIndex: 50 }}
                            >
                              <div className="group relative h-14 w-14">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(item.id);
                                  }}
                                  className="absolute -top-1.5 -right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-all hover:scale-110 hover:bg-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                                <div className="h-full w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 transition-all group-hover:border-emerald-400">
                                  <img
                                    src={item.preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                    draggable={false}
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                                    <GripVertical className="h-4 w-4 text-white opacity-0 group-hover:opacity-80" />
                                  </div>
                                </div>
                              </div>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          Get Your Free Quote
                        </>
                      )}
                    </span>
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#f7f5f2] to-transparent" />
    </section>
  );
}
