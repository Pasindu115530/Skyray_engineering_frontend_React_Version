import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Wrench, AlertCircle, Check } from 'lucide-react';
import type { Page, User, CartItem } from '../App';

interface RequestQuotationProps {
  user: User | null;
  navigateTo: (page: Page) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
}

const serviceOptions = [
  { value: 'electrical-installation', label: 'Electrical Installation' },
  { value: 'power-systems', label: 'Industrial Power Systems' },
  { value: 'automation', label: 'Automation Solutions' },
  { value: 'maintenance', label: 'Maintenance & Support' },
  { value: 'consulting', label: 'Engineering Consulting' },
];

const projectTypes = [
  { value: 'new-installation', label: 'New Installation' },
  { value: 'upgrade', label: 'System Upgrade' },
  { value: 'repair', label: 'Repair & Maintenance' },
  { value: 'consultation', label: 'Technical Consultation' },
];

export default function RequestQuotation({ user, navigateTo, addToCart }: RequestQuotationProps) {
  const [formData, setFormData] = useState({
    projectType: '',
    service: '',
    requirements: '',
    quantity: 1,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Remove the redirect - allow everyone to request quotation
  // They'll need to login when submitting from cart

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedService = serviceOptions.find(s => s.value === formData.service);
    const selectedProjectType = projectTypes.find(p => p.value === formData.projectType);

    addToCart({
      service: selectedService?.label || '',
      projectType: selectedProjectType?.label || '',
      description: formData.requirements,
      quantity: formData.quantity,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        projectType: '',
        service: '',
        requirements: '',
        quantity: 1,
      });
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
          <h2 className="text-3xl text-white mb-4">Added to Cart!</h2>
          <p className="text-gray-300">Your quotation request has been added</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0a0a14]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,21,56,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,21,56,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FileText className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl text-white mb-4">
              Request a <span className="bg-gradient-to-r from-[#8B1538] to-[#D4AF37] bg-clip-text text-transparent">Quotation</span>
            </h1>
            <p className="text-xl text-gray-300">
              Tell us about your project and get a detailed quote
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">Project Details</h2>
              {user ? (
                <p className="text-gray-600">
                  Logged in as: <span className="text-[#8B1538]">{user.name}</span>
                </p>
              ) : (
                <p className="text-gray-600">
                  Add items to cart. Login required when submitting your quotation.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm mb-2 text-gray-700">
                  Project Type *
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'projectType'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="rounded-lg"
                >
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('projectType')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-sm mb-2 text-gray-700">
                  Service Required *
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'service'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="rounded-lg"
                >
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    required
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm mb-2 text-gray-700">
                  Quantity / Units *
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'quantity'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="rounded-lg"
                >
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('quantity')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors"
                    required
                  />
                </motion.div>
              </div>

              {/* Requirements */}
              <div>
                <label htmlFor="requirements" className="block text-sm mb-2 text-gray-700">
                  Project Requirements & Notes *
                </label>
                <motion.div
                  animate={{
                    boxShadow:
                      focusedField === 'requirements'
                        ? '0 0 0 3px rgba(139, 21, 56, 0.1), 0 0 20px rgba(212, 175, 55, 0.3)'
                        : '0 0 0 0px rgba(139, 21, 56, 0)',
                  }}
                  className="rounded-lg"
                >
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('requirements')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8B1538] transition-colors resize-none"
                    placeholder="Please describe your project requirements in detail..."
                    required
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full py-4 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] text-white rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#8B1538]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center justify-center space-x-2">
                  <Wrench className="w-5 h-5" />
                  <span>Add to Quotation Cart</span>
                </span>
              </motion.button>
            </form>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-4 bg-gradient-to-r from-[#8B1538]/5 to-[#D4AF37]/5 rounded-lg border border-[#8B1538]/20"
            >
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Our team will review your requirements and provide a detailed quotation within 24-48 hours. You can add multiple services to your cart before submitting.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}