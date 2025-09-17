import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id.toString() === id);
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>("النوع الافتراضي");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-300">
        المنتج غير موجود
      </div>
    );
  }

  // منتجات مشابهة حسب نفس التصنيف
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-800 py-16">
      {/* Toaster في المنتصف */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#f59e0b',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '16px 24px',
            borderRadius: '12px',
            textAlign: 'center'
          }
        }}
      />
      <div className="container mx-auto px-4">
        {/* زر الرجوع */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium mb-8 hover:underline"
        >
          <ArrowLeft size={20} /> رجوع للمنتجات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* صورة المنتج */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="flex gap-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i}`}
                  className="w-24 h-24 object-cover rounded-lg shadow bg-white dark:bg-gray-800 cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </motion.div>

          {/* تفاصيل المنتج */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 leading-snug">
              {product.name}
            </h1>

            {/* التصنيف والتقييم */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {product.rating} ({product.reviews} مراجعة)
                </span>
              </div>
            </div>

            {/* السعر */}
            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-8">
              {product.price} ج.م
            </div>

            {/* الوصف الطويل */}
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* المميزات */}
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-10 space-y-2">
              <li>جودة ممتازة وضمان أصلي</li>
              <li>سعر تنافسي مناسب للجميع</li>
              <li>متوفر بألوان ومقاسات متعددة</li>
              <li>شحن سريع لجميع المدن</li>
            </ul>

            {/* اختيار النوع */}
            {product.variants && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">اختر النوع:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map(v => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedVariant === v
                          ? "bg-primary-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* زر الإضافة للسلة */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                addToCart(product, 1, selectedVariant);
                toast.success(`تمت إضافة ${product.name} (${selectedVariant}) للسلة`);
              }}
              disabled={!product.inStock}
              className={`flex items-center gap-3 px-8 py-4 text-lg rounded-lg font-medium shadow-lg transition-all duration-300 ${
                product.inStock
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={22} />
              <span>{product.inStock ? "أضف للسلة" : "غير متوفر"}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* منتجات مشابهة */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              منتجات مشابهة
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} index={0} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;
