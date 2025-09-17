import type { ServiceCategory } from '../lib/types';

export const WHATSAPP_NUMBER = "+15551234567"; // Replace with actual WhatsApp number

export const SERVICES_DATA: ServiceCategory[] = [
  {
    category: 'بلاط وسيراميك',
    items: [
      {
        name: 'بلاط سيراميك فاخر',
        description: 'بلاط سيراميك عالي الجودة مقاوم للماء والخدوش، مناسب للأرضيات والجدران.',
        price: '45 ج.م',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        tags: ['الأكثر مبيعاً'],
        timeline: 'متاح',
        features: ['مقاوم للماء', 'تحمل عالي', 'سهل التنظيف']
      },
      {
        name: 'رخام كرارا إيطالي',
        description: 'رخام كرارا الإيطالي الأصلي، مثالي للمطابخ والحمامات الفاخرة.',
        price: '120 ج.م',
        image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
        tags: ['مميز'],
        timeline: 'متاح',
        features: ['جودة عالية', 'مظهر فاخر', 'سهل التثبيت']
      }
    ]
  },
  {
    category: 'أرضيات خشبية',
    items: [
      {
        name: 'باركيه خشب البلوط',
        description: 'باركيه خشب البلوط الطبيعي، مقاوم للرطوبة ومعالج ضد الحشرات.',
        price: '85 ج.م',
        image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
        tags: ['الأكثر مبيعاً'],
        timeline: 'متاح',
        features: ['مقاوم للرطوبة', 'سهل التركيب', 'جودة ممتازة']
      }
    ]
  },
  {
    category: 'دهانات وألوان',
    items: [
      {
        name: 'دهان جوتن فاخر',
        description: 'دهان جوتن عالي الجودة، مقاوم للبقع وسهل التنظيف.',
        price: '35 ج.م',
        image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg',
        tags: ['الأكثر مبيعاً', 'مستمر'],
        timeline: 'متاح',
        features: ['سهل التنظيف', 'ألوان ثابتة', 'مقاوم للبقع']
      }
    ]
  },
  {
    category: 'إضاءة وكهرباء',
    items: [
      {
        name: 'إضاءة LED ذكية',
        description: 'إضاءة LED ذكية قابلة للتحكم عن بعد مع تغيير الألوان.',
        price: '65 ج.م',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        tags: ['الأكثر مبيعاً'],
        timeline: 'متاح',
        features: ['تغيير الألوان', 'تحكم عن بعد', 'توفير الطاقة']
      }
    ]
  },
  {
    category: 'عوازل',
    items: [
      {
        name: 'عازل حراري متطور',
        description: 'عازل حراري عالي الكفاءة، يوفر في استهلاك الطاقة.',
        price: '55 ج.م',
        image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
        tags: ['مميز'],
        timeline: 'متاح',
        features: ['توفير الطاقة', 'سهل التركيب', 'عمر طويل']
      }
    ]
  },
  {
    category: 'ورق جدران',
    items: [
      {
        name: 'ورق جدران ثلاثي الأبعاد',
        description: 'ورق جدران ثلاثي الأبعاد مقاوم للرطوبة وسهل التركيب.',
        price: '25 ج.م',
        image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
        tags: ['جديد'],
        timeline: 'متاح',
        features: ['تصميم ثلاثي الأبعاد', 'سهل التركيب', 'مقاوم للرطوبة']
      }
    ]
  },
  {
    category: 'أدوات صحية',
    items: [
      {
        name: 'صنابير نحاس فاخرة',
        description: 'صنابير نحاس عالية الجودة مقاومة للصدأ والتآكل.',
        price: '95 ج.م',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        tags: ['نفد المخزون'],
        timeline: 'غير متاح',
        features: ['مقاومة الصدأ', 'تصميم فاخر', 'جودة عالية']
      }
    ]
  }
];
