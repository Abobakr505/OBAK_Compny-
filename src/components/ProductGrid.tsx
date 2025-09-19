import React, { useState, useMemo, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { supabase } from "../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("جميع الفئات");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch categories
        const { data: cats, error: catsError } = await supabase.from('categories').select('name');
        if (catsError) {
          throw new Error(`خطأ في جلب الفئات: ${catsError.message}`);
        }
        setCategories(cats?.map(c => c.name) || []);

        // Fetch products
        const { data: prods, error: prodsError } = await supabase.from('products').select('*');
        if (prodsError) {
          throw new Error(`خطأ في جلب المنتجات: ${prodsError.message}`);
        }
        setProducts(prods || []);
      } catch (error) {
        console.error(error);
        toast.error('حدث خطأ أثناء جلب البيانات ❌');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  }, [selectedCategory, sortBy, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 bg-gray-50 dark:bg-dark-900">
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
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            منتجاتنا المميزة
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اكتشف مجموعتنا الواسعة من خامات التشطيب عالية الجودة
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("جميع الفئات")}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm ${
                selectedCategory === "جميع الفئات"
                  ? "bg-primary-500 text-white shadow-lg"
                  : "bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-700"
              }`}
            >
              جميع الفئات
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-sm ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
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

            <div className="flex items-center bg-white dark:bg-dark-800 rounded-lg p-1 border border-gray-300 dark:border-dark-600 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-primary-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-primary-500 text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <Filter className="mx-auto text-gray-400 mb-4" size={56} />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد منتجات
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              لم نجد منتجات تطابق المعايير المحددة
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;