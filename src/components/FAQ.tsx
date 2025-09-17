import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      q: "ما هي الخدمات التي تقدمونها؟",
      a: "نحن نقدم حلول متكاملة في إنتاج المحتوى المرئي والصوتي، من الفكرة إلى التنفيذ الكامل.",
    },
    {
      q: "كيف يمكنني طلب خدمة أو مشروع جديد؟",
      a: "يمكنك التواصل معنا عبر صفحة 'اتصل بنا' أو إرسال تفاصيل المشروع عبر البريد الإلكتروني وسيتواصل فريقنا معك خلال 24 ساعة.",
    },
    {
      q: "ما المدة الزمنية لتنفيذ المشاريع؟",
      a: "تختلف مدة التنفيذ حسب حجم المشروع وتعقيده، لكننا نلتزم دائماً بالمواعيد المتفق عليها.",
    },
    {
      q: "هل تقدمون استشارات قبل بدء المشروع؟",
      a: "نعم، نقدم جلسات استشارية مجانية لفهم متطلباتك وتقديم أفضل الحلول الممكنة.",
    },
    {
      q: "ما هي طرق الدفع المتاحة؟",
      a: "نوفر عدة طرق دفع آمنة مثل التحويل البنكي، البطاقات الائتمانية، والدفع الإلكتروني.",
    },
    {
      q: "هل يمكن تعديل المشروع بعد التسليم؟",
      a: "نعم، نقدم فترة دعم وتعديلات بعد التسليم للتأكد من رضاك الكامل.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // أنيميشن العناصر لما تدخل الفيو
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full px-6 py-3 mb-6">
            <HelpCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              الأسئلة الشائعة
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            أسئلة <span className="gradient-text">تتكرر</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            هنا ستجد إجابات عن أكثر الأسئلة التي تصلنا من عملائنا
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={itemVariants}
                className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="text-gray-600 dark:text-gray-400 leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
