import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Shield, Truck, MailCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-20 h-20 bg-primary-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-400 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-300 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-primary-500/10 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              <span>أفضل خامات التشطيب في مصر </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              متجر
              <span className=" logo text-primary-500"> OBAK </span>
              للتشطيبات
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              نوفر لك أجود أنواع خامات التشطيب من بلاط وسيراميك ورخام وجرانيت وباركيه
              وجميع مستلزمات التشطيب بأفضل الأسعار وأعلى جودة
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center space-x-2 space-x-reverse"
                onClick={() => location.href = '/products'}
                >
                <span>تسوق الآن</span>
                <ArrowLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                onClick={() => location.href = '/contect'}
              >
                تواصل معنا
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">ضمان الجودة</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">منتجات أصلية 100%</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Truck className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">توصيل سريع</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">خلال 24 ساعة</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">أسعار تنافسية</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">أفضل الأسعار</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-0">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                alt="خامات التشطيب"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-white dark:bg-dark-800 p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-2 space-x-reverse z-10">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">متوفر الآن</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-primary-500 text-white p-4 rounded-xl shadow-lg"
            >
              <div className="text-center z-10">
                <div className="text-2xl font-bold">+500</div>
                <div className="text-sm opacity-90">منتج متنوع</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;