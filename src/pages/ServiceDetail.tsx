import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, FileText, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import type { Page } from '../App';

interface ServiceDetailProps {
  serviceId: string;
  navigateTo: (page: Page) => void;
}

export default function ServiceDetail({ serviceId, navigateTo }: ServiceDetailProps) {
  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Service not found</h2>
          <button
            onClick={() => navigateTo('services')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/70" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.button
              onClick={() => navigateTo('services')}
              className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </motion.button>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl text-white mb-4 max-w-4xl"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-100 max-w-2xl"
            >
              {service.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl text-gray-900 mb-4">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {service.detailedDescription}
                </p>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl text-gray-900 mb-6">Benefits</h2>
                <div className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 hover:bg-orange-50 rounded-lg transition-colors group"
                    >
                      <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-28 space-y-6"
              >
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                  <h3 className="text-2xl mb-4">Interested in this service?</h3>
                  <p className="text-blue-100 mb-6">
                    Request a quotation and our experts will get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => navigateTo('quotation')}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="w-5 h-5" />
                    <span>Request Quotation</span>
                  </motion.button>
                </div>

                {/* Related Services */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl text-gray-900 mb-4">Related Services</h3>
                  <div className="space-y-3">
                    {servicesData
                      .filter(s => s.id !== serviceId)
                      .slice(0, 3)
                      .map((relatedService) => (
                        <motion.button
                          key={relatedService.id}
                          onClick={() => {
                            navigateTo('service-detail');
                            window.scrollTo(0, 0);
                          }}
                          className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-all group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                            {relatedService.title}
                          </div>
                        </motion.button>
                      ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl text-gray-900 mb-3">Need Help?</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Our technical team is ready to assist you with any questions.
                  </p>
                  <motion.button
                    onClick={() => navigateTo('contact')}
                    className="w-full py-2 bg-white border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
