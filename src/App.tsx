import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Cart from './components/Cart';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import Contact from './pages/Contact';  
import FAQ from './components/FAQ';
import ProductsPage from './pages/ProductsPage';
import About from './components/About';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LatestProducts from './components/LatestProducts';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 flex flex-col">
              <Header onCartClick={() => setIsCartOpen(true)} />
                

              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <Routes>
                  {/* الصفحة الرئيسية */}
                  <Route path="/" element={<><Hero /><LatestProducts /> <About/> <FAQ/> </>} />

                  {/* صفحات جديدة */}
                  <Route path="/contact" element={<Contact />} />

                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  {/* صفحة لوحة التحكم */}
                  <Route path="/admin" element={<AdminPanel />} />
                </Routes>
              </motion.main>
              <WhatsAppButton/>
              <Footer />

              <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
              />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
