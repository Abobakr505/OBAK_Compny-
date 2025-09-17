import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "./ProductCard";
import { products, categories } from "../data/products";

const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("جميع الفئات");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "جميع الفئات") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name, "ar");
      }
    });
  }, [selectedCategory, sortBy]);

  return (
    <section className="py-10 bg-gray-50 dark:bg-dark-900">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            منتجاتنا المميزة
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اكتشف مجموعتنا الواسعة من خامات التشطيب عالية الجودة
          </p>
        </motion.div>

        {/* الفلاتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-between"
        >
          {/* تصنيفات */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-700"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* الترتيب وطريقة العرض */}
          <div className="flex items-center gap-4">
            {/* الترتيب */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">ترتيب حسب الاسم</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">التقييم</option>
            </select>

            {/* وضع العرض */}
            <div className="flex items-center bg-white dark:bg-dark-800 rounded-lg p-1 border border-gray-300 dark:border-dark-600 shadow-sm">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-primary-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-primary-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* شبكة المنتجات */}
        <motion.div
          layout
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* لا توجد منتجات */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Filter className="mx-auto text-gray-400 mb-4" size={56} />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد منتجات
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              لم نجد منتجات تطابق المعايير المحددة
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
