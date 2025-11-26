// components/Hero.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { motion, Reorder } from 'framer-motion';
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
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remaining = 5 - imageItems.length;
      if (remaining <= 0) {
        setErrors((e) => ({ ...e, images: 'Maximum 5 images allowed' }));
        setTimeout(
          () => setErrors((e) => ({ ...e, images: undefined })),
          3000
        );
        return;
      }

      const newFiles = acceptedFiles.slice(0, remaining);
      const newItems = newFiles.map((file: File) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      setImageItems((prev) => [...prev, ...newItems]);
    },
    [imageItems.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic'],
    },
    maxSize: 10485760,
    multiple: true,
  });

  const removeImage = (id: string) => {
    setImageItems((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

  const validateForm = (): boolean => {
    const e: FormErrors = {};

    if (!formData.firstName.trim()) e.firstName = 'First name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    if (!formData.phone.trim()) e.phone = 'Phone number is required';
    if (!formData.message.trim()) e.message = 'Please describe the job';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const base64Images = await Promise.all(
        imageItems.map(
          (item) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(item.file);
            })
        )
      );

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
          imageNames: imageItems.map((i) => i.file.name),
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
        imageItems.forEach((i) => URL.revokeObjectURL(i.preview));
        setImageItems([]);
        setErrors({});
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const scrollToNext = () =>
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });

  return (
    <section className="relative min-h-[105vh] md:min-h-[103vh] lg:min-h-[100vh] overflow-hidden">

      {/* STATIC background with mobile + desktop images */}
      <div
        className="
          absolute inset-0 
          bg-cover bg-center bg-no-repeat
          bg-[url('/mobileherosectionbackground.jpg')]   /* Mobile */
          md:bg-[url('/HeroSectionBackgroundNo2.jpg')]   /* Desktop */
        "
      />

      {/* MAIN CONTENT */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32 lg:pb-16"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block">Melbourne</span>
                <span className="block bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                  Tree Removal
                </span>
              </h1>
            </motion.div>

            <p className="mb-4 text-xl font-medium text-white/90">
              Fast, affordable, fully insured arborist services.
            </p>

            <p className="mb-2 text-lg text-white/80">
              Call now for a free quote{' '}
              <a
                href="tel:0429187791"
                className="font-bold text-white underline decoration-emerald-400 decoration-2 underline-offset-4"
              >
                0429 187 791
              </a>
            </p>
            <p className="mb-8 text-white/70">
              Same-day service available across Melbourne’s south-east.
            </p>

            <div className="space-y-3 text-white/90">
              {[
                'Free quotes',
                'Certified arborists',
                'Complete cleanup & waste removal',
                'Same-day service for urgent tree work',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <a
              href="tel:0429187791"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 font-bold text-white shadow-lg lg:hidden"
            >
              <Phone className="h-5 w-5" />
              0429 187 791
            </a>
          </motion.div>

          {/* Right-side FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-green-500/10 to-emerald-500/20 blur-2xl" />

              <div className="relative rounded-2xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                {/* Ribbon */}
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    Same Day Quotes
                  </div>
                </div>

                {/* SUCCESS */}
                {submitStatus === 'success' && (
                  <div className="mb-6 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                    <p className="font-semibold text-emerald-900">
                      Quote request sent!
                    </p>
                    <p className="text-sm text-emerald-700">
                      We'll contact you within 24 hours.
                    </p>
                  </div>
                )}

                {/* ERROR */}
                {submitStatus === 'error' && (
                  <div className="mb-6 rounded-xl bg-red-50 p-4 ring-1 ring-red-100">
                    <p className="font-semibold text-red-900">Something went wrong</p>
                    <p className="text-sm text-red-700">Please call us at 0429 187 791</p>
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name *"
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone *"
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    placeholder="Suburb"
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Job Description *"
                    rows={3}
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600">{errors.message}</p>
                  )}

                  {/* IMAGE UPLOAD */}
                  <div>
                    <div
                      {...getRootProps()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center ${
                        isDragActive
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto mb-2 h-6 w-6 text-gray-400" />
                      <p className="text-sm text-gray-600">Upload Images</p>
                      <p className="text-xs text-gray-400">
                        Drag & drop or click (max 5)
                      </p>
                    </div>

                    {errors.images && (
                      <p className="text-sm text-red-600">{errors.images}</p>
                    )}

                    {imageItems.length > 0 && (
                      <div className="mt-3">
                        <Reorder.Group
                          axis="x"
                          values={imageItems}
                          onReorder={setImageItems}
                          className="flex flex-wrap gap-2"
                        >
                          {imageItems.map((item) => (
                            <Reorder.Item key={item.id} value={item}>
                              <div className="relative h-14 w-14">
                                <button
                                  type="button"
                                  className="absolute -top-1.5 -right-1.5 z-20 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(item.id);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </button>

                                <div className="h-full w-full rounded-lg border-2 border-gray-200 bg-gray-100 overflow-hidden">
                                  <img
                                    src={item.preview}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4 font-semibold text-white shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending…' : 'Get Your Free Quote'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </motion.div>
      </motion.button>
    </section>
  );
}
