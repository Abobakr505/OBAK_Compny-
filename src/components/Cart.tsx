import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const sendWhatsAppMessage = () => {
    if (items.length === 0) return;

    // رسالة الطلب
    let message = 'مرحباً، أريد طلب المنتجات التالية:\n\n';
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   الكمية: ${item.quantity}\n`;
      message += `   السعر: ${item.product.price} ر.س\n`;
      message += `   المجموع: ${item.product.price * item.quantity} ر.س\n\n`;
    });
    message += `إجمالي الطلب: ${total.toFixed(2)} ر.س\n\n`;
    message += 'شكراً لكم';

    // أرقام الواتساب (عميل + مندوب + مدير)
    const phoneNumbers = [
      '966500000000', // العميل
      '966511111111', // المندوب
      '966522222222', // المدير
    ];

    const encodedMessage = encodeURIComponent(message);
    phoneNumbers.forEach((phone) => {
      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    });

    setShowConfirmModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* خلفية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* السلة */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-900 shadow-xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  سلة التسوق ({items.length})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-4">
                      <Trash2 size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">السلة فارغة</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      أضف بعض المنتجات لتبدأ التسوق
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-4 space-x-reverse bg-gray-50 dark:bg-dark-800 p-3 rounded-lg"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                            {item.product.name}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-semibold">
                            {item.product.price} ر.س
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-200 dark:border-dark-700 p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      المجموع:
                    </span>
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {total.toFixed(2)} ر.س
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowConfirmModal(true)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 space-x-reverse transition-colors"
                    >
                      <MessageCircle size={20} />
                      <span>إرسال الطلب عبر واتساب</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearCart}
                      className="w-full bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-gray-800 dark:text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      إفراغ السلة
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

         {/* Confirm Modal */}
<AnimatePresence>
  {showConfirmModal && (
    <>
      {/* خلفية شفافة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setShowConfirmModal(false)}
      />

      {/* نافذة التأكيد */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4 text-center">
          <AlertCircle size={40} className="mx-auto text-yellow-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            تأكيد الإرسال
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            هل أنت متأكد أنك تريد إرسال الطلب عبر واتساب؟
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-dark-600"
            >
              إلغاء
            </button>
            <button
              onClick={sendWhatsAppMessage}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              تأكيد
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

        </>
      )}
    </AnimatePresence>
  );
};  

export default Cart;
