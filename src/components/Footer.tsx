import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Zap } from 'lucide-react';
import type { Page } from '../App';
import logo from 'figma:asset/56b78c2d6dfebeb65d9a4033b1ae02e7445ebb0c.png';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Electric Pulse Divider */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-[#8B1538] to-transparent">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          animate={{
            opacity: [0, 1, 0],
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="SkyRay Engineering Solutions" className="h-16 w-auto" />
            <p className="text-gray-400 text-sm">
              Powering innovation through engineering excellence. Your trusted partner in electrical engineering and industrial power systems.
            </p>
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Zap className="w-4 h-4" />
              <span className="text-sm">Certified & Reliable</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'About Us', page: 'about' as Page },
                { label: 'Our Services', page: 'services' as Page },
                { label: 'Projects', page: 'projects' as Page },
                { label: 'Gallery', page: 'gallery' as Page },
                { label: 'Contact', page: 'contact' as Page },
              ].map((item) => (
                <li key={item.page}>
                  <motion.button
                    onClick={() => navigateTo(item.page)}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg mb-4 text-[#D4AF37]">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Electrical Installations</li>
              <li>Industrial Power Systems</li>
              <li>Automation Solutions</li>
              <li>Maintenance & Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4 text-[#D4AF37]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#8B1538] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  123 Engineering Boulevard<br />
                  Industrial City, EC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#8B1538]" />
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#8B1538]" />
                <span className="text-sm text-gray-400">info@skyray.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkyRay Engineering Solutions (Pvt) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}