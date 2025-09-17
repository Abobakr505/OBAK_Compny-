import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Heart, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaTiktok } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center mt-2">
              <span className="text-white font-bold text-xl">
                <img className='scale-150' src="/logo.png" alt="" />
              </span>
            </div>
              <div>
                <h3 className="logo text-xl font-bold">OBAK</h3>
                <p className="text-sm text-gray-400">متجر التشطيبات</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              نوفر لك أجود أنواع خامات التشطيب من بلاط وسيراميك ورخام وجرانيت
              وجميع مستلزمات التشطيب بأفضل الأسعار وأعلى جودة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/OBAKinteriors"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.tiktok.com/@obakinterior"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <FaTiktok  size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/obak.interiors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.youtube.com/channel/UCP4emgee8j7AZfMaHTiei_g"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Youtube  size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="tel:+201001417988"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Phone  size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-500 transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">الفئات</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  بلاط وسيراميك
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  رخام وجرانيت
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  أرضيات خشبية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  دهانات وألوان
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                  إضاءة وكهرباء
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="text-primary-500" size={20} />
                <span className="text-gray-400">+201001417988</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="text-primary-500" size={20} />
                <span className="text-gray-400">info@obakinteriors.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="text-primary-500" size={20} />
                <span className="text-gray-400">   24 مصطفى رياض، المنطقة الأولى، مدينة نصر، مصر.</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className=" mt-8 pt-8 text-center"
        >
          {/* حقوق النشر */}
          <p className="text-gray-500 dark:text-gray-400 text-md">
            © {new Date().getFullYear()} OBAK - متجر التشطيبات. جميع الحقوق محفوظة.
          </p>

          {/* عبارة "صنع بـ ❤️ من ..." */}
          <p className="text-gray-600 dark:text-gray-300 text-md flex items-center justify-center gap-1 mt-2">
            <span>صُنع بـ</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>من</span>
            <span className="bracket text-primary-400 dark:text-primary-600">{"<"}</span>
            <a
              href="https://bakrhasan.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              أبوبكر حسن
            </a>
            <span className="bracket text-primary-400 dark:text-primary-600">{">"}</span>
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;