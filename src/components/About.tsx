import React, { useRef } from 'react';
import { Users, Award, Target, Heart, TrendingUp, Shield, CheckCircle, Star } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);

  // Set up animation controls and inView hooks
  const contentControls = useAnimation();
  const imageControls = useAnimation();
  const valuesControls = useAnimation();
  const statsControls = useAnimation();

  const contentInView = useInView(contentRef, { triggerOnce: false, threshold: 0.2 });
  const imageInView = useInView(imageRef, { triggerOnce: false, threshold: 0.2 });
  const valuesInView = useInView(valuesRef, { triggerOnce: false, threshold: 0.2 });
  const statsInView = useInView(statsRef, { triggerOnce: false, threshold: 0.2 });

  // Animation variants
  const contentVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
  };

  const valueVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'backOut' } }
  };

  // Trigger animations based on inView status
  useEffect(() => {
    if (contentInView) contentControls.start('visible');
    else contentControls.start('hidden');
  }, [contentInView, contentControls]);

  useEffect(() => {
    if (imageInView) imageControls.start('visible');
    else imageControls.start('hidden');
  }, [imageInView, imageControls]);

  useEffect(() => {
    if (valuesInView) valuesControls.start('visible');
    else valuesControls.start('hidden');
  }, [valuesInView, valuesControls]);

  useEffect(() => {
    if (statsInView) statsControls.start('visible');
    else statsControls.start('hidden');
  }, [statsInView, statsControls]);

  const values = [
    {
      icon: Target,
      title: 'الإبداع والابتكار',
      description: 'نسعى دائماً لتقديم حلول إبداعية ومبتكرة تتجاوز توقعات عملائنا وتحقق أهدافهم',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'الجودة العالية',
      description: 'نلتزم بأعلى معايير الجودة في جميع مراحل الإنتاج والتنفيذ لضمان التميز',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'العمل الجماعي',
      description: 'فريق متخصص يعمل بتناغم وتعاون لضمان تحقيق أفضل النتائج الممكنة',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Heart,
      title: 'الشغف والالتزام',
      description: 'نحب ما نعمل ونلتزم بتقديم أفضل ما لدينا في كل مشروع نتولاه',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'النمو المستمر',
      description: 'نواكب أحدث التقنيات والاتجاهات في عالم الإنتاج المرئي والتطوير المستمر',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Shield,
      title: 'الثقة والأمان',
      description: 'نحافظ على سرية مشاريع عملائنا ونضمن حقوق الملكية الفكرية بأعلى المعايير',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { number: '2,500+', label: ' وحدات مكتملة', icon: '💯' },
    { number: '2,000+', label: ' عملاء سعداء', icon: '😊' },
    { number: '700+', label: 'مشروع مكتمل', icon: '⭐' },
  ];

  const achievements = [
    'الجودة بلا تنازل',
    'الالتزام بالميزانية والمواعيد',
    'فريق عمل متعدد التخصصات',
    'احترام الوقت'
  ];

  return (
    <section ref={sectionRef} className="pt-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Content */}
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate={contentControls}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full px-6 py-3 mb-6">
              <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">من نحن</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              فريقك المختص في 
              <span className="block gradient-text py-2">التصميم والديكور</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              نحن فريق من المتخصصين في التصميم والتنفيذ، نقدم حلولًا متكاملة ومبتكرة تناسب احتياجاتك وتطلعاتك. في OBAK، نؤمن بأن لكل مساحة قصة مميزة، ودورنا هو روايتها من خلال تصميمات تجمع بين الحداثة والأصالة.</p>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
             نمزج بين أحدث التقنيات وأفضل معايير الجودة لنحول رؤيتك إلى واقع. سواء كنت تبحث عن تصميم منزل فريد، مكتب عملي، أو مشروع تجاري مميز، نحرص على أن تكون كل تفصيلة مصممة بعناية لتعكس شخصيتك وتضيف قيمة إلى حياتك.</p>

            {/* Achievements list */}
            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 hover:scale-110 text-white px-8 py-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform shadow-lg">
                تعرف على فريقنا
              </button>
              <button className="glass-effect text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800 transition-all duration-300 shadow-lg">
                قصة نجاحنا
              </button>
            </div>
          </motion.div>

          {/* Enhanced Image */}
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="hidden"
            animate={imageControls}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/team.jpeg"
                alt="فريق العمل"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-3xl blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating stats */}
            <div className="absolute top-8 left-8 glass-effect rounded-2xl p-4 shadow-xl">
              <div className="text-2xl font-bold gradient-text">700+</div>
              <div className="text-sm text-white dark:text-black">مشروع</div>
            </div>
            
            <div className="absolute bottom-8 right-8 glass-effect rounded-2xl p-4 shadow-xl">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-sm text-white dark:text-black">تقييم العملاء</div>
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              initial="hidden"
              animate={statsControls}
              className="text-center glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-700/50"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Values */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              قيمنا و
              <span className="gradient-text">مبادئنا</span>
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              المبادئ والقيم التي نؤمن بها ونطبقها في جميع أعمالنا ومشاريعنا
            </p>
          </div>
          
          <motion.div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={valueVariants}
                initial="hidden"
                animate={valuesControls}
                className="group text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800/70 transition-all duration-500 transform hover:scale-105 border border-gray-200 dark:border-gray-700/50 shadow-lg hover:shadow-2xl"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                
                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-6 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${value.color} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: valuesInView ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', originX: 0 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;