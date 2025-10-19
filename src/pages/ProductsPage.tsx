import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
// حركات جاهزة
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};


  return (
    <section className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container mx-auto px-4">

        {/* Hero Section */}
        <section className="py-20 rounded-md bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 flex justify-center">
              منتجاتنا
              <span className="block gradient-text pb-2 mr-2">الرائعة</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              نقدم مجموعة شاملة من المنتجات المتخصصة في التشطيبات بأعلى معايير الجودة والإبداع
            </p>

            {/* 🔍 شريط البحث */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-800 text-gray-900 dark:text-white shadow-md focus:ring-2 focus:ring-primary-500 outline-none transition-all duration-300"
              />
            </div>
          </motion.div>
        </section>

        {/* شبكة المنتجات */}
        <ProductGrid searchTerm={searchTerm} />
      </div>
    </section>
  );
};

export default ProductsPage;
