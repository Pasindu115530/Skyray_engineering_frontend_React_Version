import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Projects from './pages/Projects';
import RequestQuotation from './pages/RequestQuotation';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CartCategories from './pages/CartCategories';
import ProductListing from './pages/ProductListing';
import Gallery from './pages/Gallery';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export type Page = 'home' | 'login' | 'register' | 'about' | 'projects' | 'quotation' | 'cart' | 'contact' | 'services' | 'service-detail' | 'cart-categories' | 'product-listing' | 'gallery';

export interface User {
  name: string;
  email: string;
}

export interface CartItem {
  id: string;
  service: string;
  projectType: string;
  description: string;
  quantity: number;
  itemType?: 'service' | 'product';
  productName?: string;
  productSpecs?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    navigateTo('home');
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('home');
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
              return (
                <Home 
                  navigateTo={navigateTo} 
                  onSelectCategory={(categoryId) => {
                    setSelectedCategory(categoryId); // Set the state here
                    navigateTo('product-listing');   // Then change the page
                  }} 
                />
            );
      case 'login':
        return <Login navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'register':
        return <Register navigateTo={navigateTo} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'services':
        return <Services navigateTo={navigateTo} onSelectService={(serviceId) => {
          setSelectedService(serviceId);
          navigateTo('service-detail');
        }} />;
      case 'service-detail':
        return <ServiceDetail serviceId={selectedService} navigateTo={navigateTo} />;
      case 'cart-categories':
        return <CartCategories navigateTo={navigateTo} onSelectCategory={(categoryId) => {
          setSelectedCategory(categoryId);
          navigateTo('product-listing');
        }} />;
      case 'product-listing':
        return <ProductListing categoryId={selectedCategory} navigateTo={navigateTo} addToCart={addToCart} />;
      case 'quotation':
        return <RequestQuotation user={user} navigateTo={navigateTo} addToCart={addToCart} />;
      case 'cart':
        return <Cart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} navigateTo={navigateTo} user={user} />;
      case 'contact':
        return <Contact />;
      case 'gallery':
        return <Gallery />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        user={user}
        onLogout={handleLogout}
        cartCount={cart.length}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default App;