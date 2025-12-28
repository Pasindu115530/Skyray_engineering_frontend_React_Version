import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import type { Page, User as UserType } from '../App';
import logo from '../assets/skyraylogo.jpg';

interface NavigationProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  user: UserType | null;
  onLogout: () => void;
  cartCount: number;
}

export default function Navigation({ currentPage, navigateTo, user, onLogout, cartCount }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' as Page },
    { label: 'About Us', page: 'about' as Page },
    { label: 'Our Services', page: 'services' as Page },
    { label: 'Projects', page: 'projects' as Page },
    { label: 'Gallery', page: 'gallery' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ];

  const handleNavClick = (page: Page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <motion.img
              src={logo}
              alt="SkyRay Engineering Solutions"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative px-3 py-2 transition-colors ${
                  currentPage === item.page
                    ? 'text-[#8B1538]'
                    : 'text-gray-700 hover:text-[#8B1538]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B1538] to-[#D4AF37]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <motion.button
                  onClick={() => handleNavClick('quotation')}
                  className="px-4 py-2 text-[#8B1538] hover:text-[#D4AF37] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Quote
                </motion.button>
                <motion.button
                  onClick={() => handleNavClick('cart')}
                  className="relative p-2 text-gray-700 hover:text-[#8B1538] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#8B1538] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <User className="w-4 h-4 text-[#8B1538]" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <motion.button
                  onClick={onLogout}
                  className="p-2 text-gray-700 hover:text-[#8B1538] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => handleNavClick('login')}
                className="px-6 py-2 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] text-white rounded-lg hover:shadow-lg hover:shadow-[#8B1538]/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Customer Login
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                currentPage === item.page
                  ? 'bg-[#8B1538] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          {user ? (
            <>
              <button
                onClick={() => handleNavClick('quotation')}
                className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Request Quote
              </button>
              <button
                onClick={() => handleNavClick('cart')}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-[#8B1538] text-white text-xs rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-[#8B1538]" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="block w-full px-4 py-2 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] text-white rounded-lg text-center"
            >
              Customer Login
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
}