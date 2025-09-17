import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom"; // إذا كنت تريد ربط الزر بصفحة المنتجات

const LatestProducts: React.FC = () => {
  // أخذ أحدث 3 منتجات فقط
  const latestProducts = useMemo(() => [...products].slice(-3).reverse(), []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* عنوان القسم */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full px-6 py-3 mb-6">
          <HelpCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
            أحدث المنتجات
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          المنتجات <span className="gradient-text">الجديدة</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          هنا ستجد أحدث منتجاتنا المميزة
        </p>
      </div>

      {/* شبكة المنتجات مع تأثير دخول متحرك */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestProducts.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </div>

{/* زر رؤية باقي المنتجات */}
<div className="mt-12 text-center">
  <Link
    to="/products"
    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-full shadow-lg hover:bg-primary-700 hover:scale-110  transition-all duration-300"
  >
    <ArrowRight className="w-5 h-5" />
    رؤية باقي المنتجات
    
  </Link>
</div>
    </div>
  );
};

export default LatestProducts;
