import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-dark-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* صورة المنتج */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* زر المعاينة مع الرابط على الصورة كلها */}
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-500 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <Eye size={22} />
          </motion.div>
        </Link>

        {/* نفاد المخزون */}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md z-20">
            نفد المخزون
          </div>
        )}
      </div>

      {/* بيانات المنتج */}
      <div className="p-5">
        {/* التصنيف + التقييم */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        {/* اسم المنتج */}
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* الوصف */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* السعر + زر الإضافة */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {product.price} ر.س
          </div>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
              product.inStock
                ? "bg-primary-500 hover:bg-primary-600 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={18} />
            <span>{product.inStock ? "أضف للسلة" : "غير متوفر"}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;