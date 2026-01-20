'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageSquare, Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactFormProps {
  onClose?: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent scroll by saving current scroll position and restoring it
    const scrollY = window.scrollY;
    
    setStatus('sending');
    setErrorMessage('');
    
    // Restore scroll position after state update
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    });

    try {
      // Validate fields
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields');
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Send email via API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Set success status
      setStatus('success');

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-mono-700 dark:text-mono-300 mb-2"
          >
            Your Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-mono-400 dark:text-mono-600" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-mono-900 border border-mono-200 dark:border-mono-800 rounded-xl text-mono-900 dark:text-mono-100 placeholder-mono-400 dark:placeholder-mono-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 dark:focus-visible:ring-mono-50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-mono-700 dark:text-mono-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-mono-400 dark:text-mono-600" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-mono-900 border border-mono-200 dark:border-mono-800 rounded-xl text-mono-900 dark:text-mono-100 placeholder-mono-400 dark:placeholder-mono-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 dark:focus-visible:ring-mono-50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="group">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-mono-700 dark:text-mono-300 mb-2"
          >
            Your Message
          </label>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-mono-400 dark:text-mono-600" />
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              rows={6}
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-mono-900 border border-mono-200 dark:border-mono-800 rounded-xl text-mono-900 dark:text-mono-100 placeholder-mono-400 dark:placeholder-mono-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-mono-950 dark:focus-visible:ring-mono-50 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Tell me about your project or idea..."
            />
          </div>
        </div>

        {/* Status Messages - fixed height container to prevent layout shift */}
        <div className="min-h-[60px]">
          <AnimatePresence mode="wait">
            {status === 'error' && errorMessage && (
              <motion.div
                key="error"
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-red-800 dark:text-red-300"
              >
                <XCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm">{errorMessage}</p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl text-green-800 dark:text-green-300"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm">Message sent successfully! I&apos;ll get back to you soon.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          whileHover={status === 'idle' || status === 'error' ? { scale: 1.02 } : {}}
          whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
          className="w-full relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-mono-950 dark:bg-mono-50 text-mono-50 dark:text-mono-950 rounded-xl font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mono-950/20 dark:hover:shadow-mono-50/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-2 focus-visible:ring-offset-mono-950"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Message Sent!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
          <span className="absolute inset-0 bg-mono-800 dark:bg-mono-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
        </motion.button>
      </form>
    </motion.div>
  );
}
