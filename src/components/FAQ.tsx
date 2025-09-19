import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 👇 استدعاء الـ easing الجاهز من framer-motion
import { easeInOut } from "framer-motion";

const FAQ = () => {
  const faqs = [
  {
    q: "ما هي أنواع منتجات التشطيب التي توفرونها؟",
    a: "نوفر مجموعة متنوعة من منتجات التشطيب مثل السيراميك، البورسلين، الدهانات، الأدوات الصحية، وحدات الإضاءة، وأرضيات الباركيه.",
  },
  {
    q: "هل تتوفر منتجاتكم بمقاسات وألوان مختلفة؟",
    a: "نعم، جميع منتجاتنا متوفرة بمقاسات وألوان متعددة لتناسب مختلف الأذواق وأنماط التصميم الداخلي.",
  },
  {
    q: "هل تقدمون ضمان على المنتجات؟",
    a: "بالتأكيد، نوفر ضمان رسمي على معظم منتجات التشطيب مثل الأدوات الصحية والسيراميك لضمان الجودة وراحة عملائنا.",
  },
  {
    q: "هل يمكنني مشاهدة عينات قبل الشراء؟",
    a: "نعم، يمكنك طلب عينات من السيراميك أو الدهانات أو المواد الأخرى للتأكد من مطابقتها لذوقك قبل إتمام عملية الشراء.",
  },
  {
    q: "ما طرق الدفع المتاحة عند شراء منتجات التشطيب؟",
    a: "نوفر خيارات دفع متعددة تشمل الدفع نقدًا، التحويل البنكي، بطاقات الائتمان، وخدمات الدفع الإلكتروني.",
  },
  {
    q: "هل يمكن توصيل المنتجات حتى موقع المشروع؟",
    a: "نعم، لدينا خدمة توصيل سريعة وآمنة لجميع المنتجات إلى موقع العميل مع إمكانية التركيب لبعض المنتجات.",
  },
  {
    q: "هل تقدمون خدمة استشارات لاختيار المواد المناسبة؟",
    a: "بالتأكيد، فريقنا المتخصص يساعدك في اختيار منتجات التشطيب التي تناسب تصميم منزلك وميزانيتك.",
  },
  {
    q: "هل يمكن استرجاع أو استبدال المنتجات؟",
    a: "نعم، نوفر سياسة استبدال واسترجاع وفق الشروط المحددة لضمان رضاك عن عملية الشراء.",
  },
];


  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // أنيميشن العناصر لما تدخل الفيو
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: i * 0.15, ease: easeInOut }, // ✅ استخدم easeInOut
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
                      transition={{ duration: 0.4, ease: easeInOut }} // ✅ هنا كمان
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
