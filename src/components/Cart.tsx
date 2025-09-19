import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, AlertCircle, MailCheck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { supabase } from '../lib/supabaseClient';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  const sendEmails = async () => {
    if (items.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'السلة فارغة',
        text: 'أضف بعض المنتجات لتتمكن من الإرسال!',
      });
      return;
    }

    if (!customerEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'البريد الإلكتروني مطلوب',
        text: 'يرجى إدخال بريدك الإلكتروني لتلقي تفاصيل الطلب.',
      });
      return;
    }

    // جمع المجموع الكلي
    const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    // إنشاء نص تفاصيل الطلب مع المجموع الكلي في النهاية
    const orderDetails = items
      .map((i, idx) =>
        `${idx + 1}. ${i.product.name}\n   السعر: ${i.product.price} ج.م\n   الكمية: ${i.quantity}\n   المجموع: ${(i.product.price * i.quantity).toFixed(2)} ج.م\n----------------------`
      )
      .join('\n') + `\nالمجموع الكلي: ${totalAmount.toFixed(2)} ج.م`;

    const messages = [
  {
    serviceId: 'service_tgzd2om',
    templateId: 'template_40ru0ik',
    publicKey: '6nGwnsGKd0RPHSNcN',
    params: {
      to_email: customerEmail,   // 👈 لازم يكون to_email
      name: 'عميل',
      total: total.toFixed(2),
      order_details: orderDetails,
    },
  },
  {
    serviceId: 'service_q9eftm9',
    templateId: 'template_vk16gzo',
    publicKey: '6nGwnsGKd0RPHSNcN',
    params: {
      to_email: 'alihasan5335@gmail.com',
      name: 'مندوب',
      total: total.toFixed(2),
      order_details: orderDetails,
    },
  },
  {
    serviceId: 'service_lcr6o8n',
    templateId: 'template_o1airgf',
    publicKey: 'k9Ti1ib4trNRh4VAQ',
    params: {
      to_email: 'alihasan5335@gmail.com',
      name: 'المدير',
      total: total.toFixed(2),
      order_details: orderDetails,
    },
  },
];

    try {
      // Send emails
      for (const msg of messages) {
        await emailjs.send(msg.serviceId, msg.templateId, msg.params, msg.publicKey);
      }

      // Update sales count in Supabase
      for (const item of items) {
        const { data: product, error: fetchError } = await supabase
          .from('products')
          .select('sales')
          .eq('id', item.product.id)
          .single();

        if (fetchError) {
          throw new Error(`خطأ في جلب بيانات المنتج ${item.product.id}: ${fetchError.message}`);
        }

        const currentSales = product.sales || 0;
        const newSales = currentSales + item.quantity;

        const { error: updateError } = await supabase
          .from('products')
          .update({ sales: newSales })
          .eq('id', item.product.id);

        if (updateError) {
          throw new Error(`خطأ في تحديث المبيعات للمنتج ${item.product.id}: ${updateError.message}`);
        }
      }

      Swal.fire({
        icon: 'success',
        title: 'تم الإرسال!',
        text: 'تم إرسال جميع الرسائل وتحديث المبيعات بنجاح ✅',
        color: "#fff",
        background: "#d97706",
        timer: 3000,
        showConfirmButton: false,
      });
      setShowConfirmModal(false);
      clearCart();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء إرسال الرسائل أو تحديث المبيعات ❌',
        color: "#fff",
        background: "#d97706",
        confirmButtonColor: "#b45309",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-900 shadow-xl z-50 flex flex-col"
          >
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
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-2"
                >
                  <div className="w-28 h-28 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-4">
                    <Trash2 size={36} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">السلة فارغة</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    أضف بعض المنتجات لتبدأ التسوق
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center space-x-4 space-x-reverse bg-gray-50 dark:bg-dark-800 p-3 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.product.main_image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-semibold">
                          {item.product.price} ج.م
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(String(item.product.id), item.quantity - 1)}
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
                          onClick={() => updateQuantity(String(item.product.id), item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(String(item.product.id))}
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
                    {total.toFixed(2)} ج.م
                  </span>
                </div>

                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirmModal(true)}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 space-x-reverse transition-colors"
                  >
                    <span>إرسال الطلب عبر البريد</span>
                    <MailCheck size={20} />
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
          </motion.div>

          {/* Confirm Modal */}
          <AnimatePresence>
            {showConfirmModal && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-50"
                  onClick={() => setShowConfirmModal(false)}
                />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="fixed inset-0 flex items-center justify-center z-50"
                >
                  <motion.div 
                    className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4 text-center"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <AlertCircle size={40} className="mx-auto text-yellow-500" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">تأكيد الإرسال</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      أدخل بريدك الإلكتروني لتلقي تفاصيل الطلب:
                    </p>

                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="example@mail.com"
                      className="w-full border rounded-lg p-2 text-center dark:bg-dark-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />

                    <div className="flex justify-center gap-4 pt-4">
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-dark-600"
                      >
                        إلغاء
                      </button>
                      <motion.button
                        onClick={sendEmails}
                        disabled={!customerEmail}
                        whileTap={{ scale: customerEmail ? 0.95 : 1 }}
                        className={`px-4 py-2 rounded-lg text-white ${
                          customerEmail ? "bg-primary-500 hover:bg-primary-600" : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        تأكيد
                      </motion.button>
                    </div>
                  </motion.div>
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
