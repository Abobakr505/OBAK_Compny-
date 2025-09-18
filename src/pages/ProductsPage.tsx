// src/pages/ProductsPage.tsx
import React from "react";
import ProductGrid from "../components/ProductGrid";

const ProductsPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container mx-auto">

              {/* Hero Section */}
      <section className="py-20  bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6  flex  justify-center">
              منتجاتنا
              <span className="block gradient-text pb-2  mr-2">الرائعة </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 ">
              نقدم مجموعة شاملة من المنتجات المتخصصة في التشطيبات بأعلى معايير الجودة والإبداع
            </p>
          </div>
        </div>
      </section>
        {/* شبكة المنتجات */}
        <ProductGrid />
      </div>
    </section>
  );
};

export default ProductsPage;
