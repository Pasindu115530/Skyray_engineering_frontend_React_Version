import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Send,
  AlertCircle,
  Check,
} from "lucide-react";
import type { Page, CartItem } from "../App";

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  navigateTo: (page: Page) => void;
  user: any;
}

export default function Cart({
  cart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  navigateTo,
  user,
}: CartProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Check if user is logged in
    if (!user) {
      // Redirect to login if not logged in
      navigateTo("login");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      setSubmitted(false);
      navigateTo("home");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0a0a14] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
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
          <h2 className="text-3xl text-white mb-4">
            Quotation Submitted!
          </h2>
          <p className="text-gray-300 mb-2">
            Thank you for your request
          </p>
          <p className="text-gray-400">
            Our team will contact you within 24-48 hours
          </p>
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
            <ShoppingCart className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl text-white mb-4">
              Quotation{" "}
              <span className="bg-gradient-to-r from-[#8B1538] to-[#D4AF37] bg-clip-text text-transparent">
                Cart
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Review your quotation requests before submission
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h2 className="text-3xl text-gray-900 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add services to your quotation cart to get
                started
              </p>
              <motion.button
                onClick={() => navigateTo("quotation")}
                className="px-8 py-3 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] text-white rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Quotation
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-xl shadow-md p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl text-gray-900 mb-1">
                            {item.service}
                          </h3>
                          <p className="text-sm text-[#8B1538] mb-2">
                            {item.projectType}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </div>
                        <motion.button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Quantity:
                        </span>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </motion.button>
                          <span className="w-12 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() =>
                              updateCartQuantity(
                                item.id,
                                item.quantity + 1,
                              )
                            }
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Add More Button */}
                <motion.button
                  onClick={() => navigateTo("quotation")}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#8B1538] hover:text-[#8B1538] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  + Add More Services
                </motion.button>
              </div>

              {/* Summary Panel */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6 sticky top-28"
                >
                  <h2 className="text-2xl text-gray-900 mb-6">
                    Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Total Items:</span>
                      <span className="text-gray-900">
                        {cart.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Total Units:</span>
                      <span className="text-gray-900">
                        {cart.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D4AF37]" />
                      <p>
                        Our team will review your requirements
                        and provide detailed pricing within
                        24-48 hours.
                      </p>
                    </div>
                  </div>

                  {!user && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-[#8B1538]/10 to-[#D4AF37]/10 rounded-lg border border-[#8B1538]/20">
                      <p className="text-sm text-gray-700">
                        <strong>Login required</strong> to
                        submit quotation request
                      </p>
                    </div>
                  )}

                  <motion.button
                    onClick={handleSubmit}
                    className="group relative w-full py-4 bg-gradient-to-r from-[#8B1538] to-[#D4AF37] text-white rounded-lg overflow-hidden mb-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#8B1538]"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>
                        {user
                          ? "Submit Quotation Request"
                          : "Login to Submit Request"}
                      </span>
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to clear your cart?",
                        )
                      ) {
                        clearCart();
                      }
                    }}
                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear Cart
                  </motion.button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}