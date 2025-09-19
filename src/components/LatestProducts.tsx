import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  in_stock: boolean;
  variants: string[];
}

const LatestProducts: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    setLoading(false);
    if (error) {
      console.error('Error fetching latest products:', error);
    } else {
      setLatestProducts(data || []);
    }
  };

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

      {/* شبكة المنتجات */}
      {loading ? (
      <div className=" flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">جاري تحميل المنتجات...</p>
        </div>
      </div>
      ) : latestProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">لا توجد منتجات جديدة حاليًا</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestProducts.map((product, index) => (
            <motion.div
              key={product.id}
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
      )}

      {/* زر رؤية باقي المنتجات */}
      <div className="mt-12 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-semibold rounded-full shadow-lg hover:bg-primary-700 hover:scale-110 transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5" />
          رؤية باقي المنتجات
        </Link>
      </div>
    </div>
  );
};

export default LatestProducts;