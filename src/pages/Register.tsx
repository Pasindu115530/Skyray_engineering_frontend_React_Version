import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, Lock, Check, Zap } from 'lucide-react';
import type { Page } from '../App';

interface RegisterProps {
  navigateTo: (page: Page) => void;
}

export default function Register({ navigateTo }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigateTo('login');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0a0a14] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{ duration: 1 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] rounded-full flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl text-white mb-4">Registration Successful!</h2>
          <p className="text-gray-300">Redirecting to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0a0a14] flex items-center justify-center px-4 py-12">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,21,56,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,21,56,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#8B1538] to-[#D4AF37] p-8 text-white">
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]"
            />
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-4"
              >
                <Zap className="w-full h-full" />
              </motion.div>
              <h2 className="text-3xl text-center mb-2">Create Account</h2>
              <p className="text-center text-white/80">Join SkyRay Engineering</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm mb-2 text-gray-700">
                  Full Name / Company Name
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'fullName'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="relative rounded-lg"
                >
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email Address
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'email'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="relative rounded-lg"
                >
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">
                  Phone Number
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'phone'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="relative rounded-lg"
                >
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </motion.div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                  Password
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'password'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="relative rounded-lg"
                >
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </motion.div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-700">
                  Confirm Password
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'confirmPassword'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="relative rounded-lg"
                >
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full py-3 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] text-white rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#8B1538]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">Create Account</span>
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <motion.button
                  onClick={() => navigateTo('login')}
                  className="text-[#8B1538] hover:text-[#D4AF37] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login here
                </motion.button>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <motion.button
          onClick={() => navigateTo('home')}
          className="mt-6 w-full text-center text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
