import { useState } from "react";
import {
  Headset,
  X,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { motion, AnimatePresence } from "framer-motion";
import AiAssistantModal from './AiAssistantModal';

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const phoneNumber = "+201093954137";
  const message = encodeURIComponent("مرحبا، أود الاستفسار عن خدماتكم."); // يمكنك تغيير الرسالة الافتراضية
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.1,
        type: "spring" as "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
    exit: { opacity: 0, scale: 0.5, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative flex flex-col items-center">
        <AnimatePresence>
          {open && (
            <div className="flex flex-col items-center mb-4 space-y-3">
              {[
                {
                  Icon: FaWhatsapp,
                  label: "دردشة واتساب",
                  href: whatsappUrl,
                },
                {
                  Icon: SparklesIcon,
                  label: "المساعد الذكي",
                  onClick: () => setModalOpen(true),
                }
              ].map((item, index) => {
                const Component = item.href ? motion.a : motion.button;
                return (
                  <Component
                    key={item.label}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={iconVariants}
                    href={item.href}
                    target={item.href && item.label.includes("واتساب") ? "_blank" : undefined}
                    rel={item.href && item.label.includes("واتساب") ? "noopener noreferrer" : undefined}
                    onClick={item.onClick}
                    aria-label={item.label}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative group bg-primary-500 rounded-full p-3 shadow-lg"
                  >
                    <item.Icon className="h-6 w-6 text-white" />
                    <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                      {item.label}
                    </span>
                  </Component>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "إغلاق خيارات الدعم" : "تواصل معنا"}
          className="bg-primary-500 text-white p-4 rounded-full shadow-2xl focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {open ? <X className="h-6 w-6" /> : <Headset className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* مودال يظهر ويختفي بسلاسة */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 flex items-center justify-center z-[100] bg-black/50"
          >
            <AiAssistantModal onClose={() => setModalOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
