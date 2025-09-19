import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string>("النوع الافتراضي");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data: prod, error: prodError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (prodError) {
          throw new Error(`خطأ في جلب المنتج: ${prodError.message}`);
        }

        setProduct(prod);
        if (prod) {
          setSelectedImage(prod.main_image || "");
          const { data: related, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category', prod.category)
            .neq('id', prod.id)
            .limit(4);

          if (relatedError) {
            throw new Error(`خطأ في جلب المنتجات المشابهة: ${relatedError.message}`);
          }

          setRelatedProducts(related || []);
        }
      } catch (error) {
        console.error(error);
        toast.error('حدث خطأ أثناء جلب بيانات المنتج ❌');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">جاري تحميل المنتج...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
        المنتج غير موجود
      </div>
    );
  }

  const allImages = [product.main_image, ...(product.additional_images || [])].filter(Boolean);

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-800 py-16" dir="rtl">
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
            textAlign: 'center',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#b45309',
            },
          },
        }}
      />
      <div className="container mx-auto px-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium mb-8 hover:underline"
        >
          <ArrowLeft size={20} /> رجوع للمنتجات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-900">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              {allImages.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i}`}
                  className={`w-24 h-24 object-cover rounded-lg shadow bg-white dark:bg-gray-800 cursor-pointer hover:scale-105 transition ${
                    selectedImage === img ? 'border-2 border-primary-500' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 leading-snug">
              {product.name}
            </h1>

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

            <div className="text-4xl font-bold text-primary-700 dark:text-primary-300 mb-8">
              {product.price} ج.م
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>

            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-10 space-y-2">
              <li>جودة ممتازة وضمان أصلي</li>
              <li>سعر تنافسي مناسب للجميع</li>
              <li>متوفر بألوان ومقاسات متعددة</li>
              <li>شحن سريع لجميع المدن</li>
            </ul>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">اختر النوع:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v: string) => (
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

            <button
              onClick={() => {
                addToCart(product, 1, selectedVariant);
                toast.success(`تمت إضافة ${product.name} (${selectedVariant}) للسلة`);
              }}
              disabled={!product.in_stock}
              className={`flex items-center gap-3 px-8 py-4 text-lg rounded-lg font-medium shadow-lg transition-all duration-300 ${
                product.in_stock
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={22} />
              <span>{product.in_stock ? "أضف للسلة" : "غير متوفر"}</span>
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              منتجات مشابهة
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map((rp: any, idx: number) => (
                <ProductCard key={rp.id} product={rp} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsPage;