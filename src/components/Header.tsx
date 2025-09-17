import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sun, Moon, Home, Box, Info, Phone } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

interface HeaderProps {
  onCartClick: () => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { itemCount } = useCart();


  // Animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 }, // من اليمين
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } }, // خروج لليمين
  };

  const linkVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const links = [
    { name: "الرئيسية", path: "/", icon: <Home size={18} /> },
    { name: "المنتجات", path: "/products", icon: <Box size={18} /> },
    { name: "اتصل بنا", path: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white dark:bg-dark-900 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-1 space-x-reverse">
            <div className="w-10 h-10 flex items-center justify-center mt-2">
              <img className="scale-150" src="/logo.png" alt="logo" />
            </div>
            <div>
              <h1 className="logo text-xl font-bold text-gray-900 dark:text-white">OBAK</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">متجر التشطيبات</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="nav-link  text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
              >
                {link.name} {/* ديسكتوب بدون أيقونات */}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {isDark ? <Sun size={24} className="stroke-2" /> : <Moon size={24} className="stroke-2" />}
            </motion.button>

            {/*  Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCartClick}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <ShoppingCart size={24}  className="stroke-2"/>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer Menu */}
            <motion.nav
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed top-0 right-0 w-3/4 h-full bg-white dark:bg-dark-900 shadow-2xl rounded-l-2xl p-6 z-50 md:hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500"
              >
                <X size={24} />
              </button>

              {/* Links */}
              <div className="flex flex-col space-y-6 mt-8">
                {links.map((link, i) => (
                  <motion.div key={i} variants={linkVariants}>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
