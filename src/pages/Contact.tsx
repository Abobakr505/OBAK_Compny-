import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// حركات جاهزة
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay },
  }),
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = "service_1bdsc8t";
    const templateID = "template_zvn7klm";
    const userID = "k9Ti1ib4trNRh4VAQ";

    if (formRef.current) {
      emailjs.sendForm(serviceID, templateID, formRef.current, userID).then(
        (result) => {
          console.log("Form submitted successfully:", result.text);
          setIsSubmitted(true);
          setError(null);
          setFormData({ name: "", email: "", phone: "", message: "" });
          setTimeout(() => setIsSubmitted(false), 3000);
        },
        (error) => {
          console.error("Form submission error:", error.text);
          setError("حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.");
        }
      );
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "الهاتف",
      info: "+201001417988",
      color: "from-green-500 to-emerald-500",
      description: "متاح 24/7 للاستفسارات العاجلة",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      info: "info@obakinteriors.com",
      color: "from-primary-500 to-primary-500",
      description: "نرد خلال ساعة في أوقات العمل",
    },
    {
      icon: MapPin,
      title: "العنوان",
      info: "24 مصطفى رياض، المنطقة الأولى، مدينة نصر، مصر.",
      color: "from-red-500 to-pink-500",
      description: "مكتبنا الرئيسي",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Salem",
      company: "Villa Owner in New Cairo",
      text: "The service was excellent, and the interior design of the villa exceeded my expectations. The attention to detail and choice of materials were outstanding.",
      rating: 5,
    },
    {
      name: "Mai Hassan",
      company: "Company Manager in Maadi",
      text: "We requested a new office design for our company, and the result was amazing. The design reflects professionalism and precision with modern touches.",
      rating: 5,
    },
    {
      name: "Mohamed Abdallah",
      company: "Commercial Building Owner in Alexandria",
      text: "The rooftop design was perfect, making the best use of the space. Now it’s a comfortable and inviting area for clients.",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 flex justify-center">
            تواصل
            <span className="block gradient-text mr-2">معنا</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            هل لديك مشروع في ذهنك؟ نحن هنا لمساعدتك في تحويل أفكارك إلى واقع
            مرئي مذهل
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              معلومات التواصل
            </h2>
            <div className="space-y-8 mb-12">
              {contactMethods.map((contact, index) => (
                <motion.div
                  key={index}
                  custom={index * 0.2}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <contact.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {contact.title}
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
                        {contact.info}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Free Consultation */}
            <motion.div
              className="gradient-border rounded-3xl"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="gradient-border-content p-8">
                <div className="flex items-center mb-4 gap-4">
                  <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    استشارة مجانية
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  احجز استشارة مجانية مع فريقنا لمناقشة مشروعك والحصول على أفضل
                  الحلول المناسبة لاحتياجاتك.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl shadow-lg"
                >
                  احجز استشارتك المجانية
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                أرسل لنا رسالة
              </h3>

              {isSubmitted && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-300">
                    تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                  </span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl flex items-center space-x-3"
                >
                  <span className="text-red-800 dark:text-red-300">{error}</span>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    الرسالة *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="أخبرنا عن مشروعك وأهدافك بالتفصيل..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>إرسال الرسالة</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              ماذا يقول عملاؤنا
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              آراء وتجارب عملائنا الكرام الذين وثقوا بنا في تنفيذ مشاريعهم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index * 0.2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
