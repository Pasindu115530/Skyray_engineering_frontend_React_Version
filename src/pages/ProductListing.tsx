import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { productsData, productCategories } from '../data/productsData';
import type { Page, CartItem } from '../App';

interface ProductListingProps {
  categoryId: string;
  navigateTo: (page: Page) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
}

export default function ProductListing({ categoryId, navigateTo, addToCart }: ProductListingProps) {
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  
  const category = productCategories.find(c => c.id === categoryId);
  const products = productsData.filter(p => p.category === categoryId);

  const handleAddToCart = (product: typeof productsData[0]) => {
    addToCart({
      service: category?.title || '',
      projectType: 'Product Order',
      description: product.description,
      quantity: 1,
      itemType: 'product',
      productName: product.name,
      productSpecs: product.specs,
    });

    setAddedProducts(new Set(addedProducts).add(product.id));
    
    // Remove from added state after 2 seconds
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Category not found</h2>
          <button
            onClick={() => navigateTo('cart-categories')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={() => navigateTo('cart-categories')}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Categories
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl text-white mb-4">
              {category.title}
            </h1>
            <p className="text-xl text-blue-100">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden group">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="mb-3 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full inline-block">
                    {product.specs}
                  </div>

                  <p className="text-gray-600 mb-6 text-sm">
                    {product.description}
                  </p>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    disabled={addedProducts.has(product.id)}
                    className={`w-full py-3 rounded-lg transition-all flex items-center justify-center space-x-2 ${
                      addedProducts.has(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-orange-500 text-white hover:shadow-lg'
                    }`}
                    whileHover={addedProducts.has(product.id) ? {} : { scale: 1.05 }}
                    whileTap={addedProducts.has(product.id) ? {} : { scale: 0.95 }}
                  >
                    {addedProducts.has(product.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* View Cart CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl text-gray-900 mb-4">
              Ready to Request a Quotation?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              View your cart and submit your quotation request
            </p>
            <motion.button
              onClick={() => navigateTo('cart')}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Cart & Request Quote
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
