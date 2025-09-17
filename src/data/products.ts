import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'بلاط سيراميك فاخر',
    description: 'بلاط سيراميك عالي الجودة مقاوم للماء والخدوش، مناسب للأرضيات والجدران',
    price: 45,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'بلاط وسيراميك',
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'رخام كرارا إيطالي',
    description: 'رخام كرارا الإيطالي الأصلي، مثالي للمطابخ والحمامات الفاخرة',
    price: 120,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    category: 'بلاط وسيراميك',
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'باركيه خشب البلوط',
    description: 'باركيه خشب البلوط الطبيعي، مقاوم للرطوبة ومعالج ضد الحشرات',
    price: 85,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    category: 'أرضيات خشبية',
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '4',
    name: 'دهان جوتن فاخر',
    description: 'دهان جوتن عالي الجودة، مقاوم للبقع وسهل التنظيف',
    price: 35,
    image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg',
    category: 'دهانات وألوان',
    inStock: true,
    rating: 4.6,
    reviews: 203
  },
  {
    id: '5',
    name: 'إضاءة LED ذكية',
    description: 'إضاءة LED ذكية قابلة للتحكم عن بعد مع تغيير الألوان',
    price: 65,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'إضاءة وكهرباء',
    inStock: true,
    rating: 4.5,
    reviews: 98
  },
  {
    id: '6',
    name: 'صنابير نحاس فاخرة',
    description: 'صنابير نحاس عالية الجودة مقاومة للصدأ والتآكل',
    price: 95,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'أدوات صحية',
    inStock: false,
    rating: 4.8,
    reviews: 67
  },
  {
    id: '7',
    name: 'ورق جدران ثلاثي الأبعاد',
    description: 'ورق جدران ثلاثي الأبعاد مقاوم للرطوبة وسهل التركيب',
    price: 25,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    category: 'ورق جدران',
    inStock: true,
    rating: 4.4,
    reviews: 145
  },
  {
    id: '8',
    name: 'عازل حراري متطور',
    description: 'عازل حراري عالي الكفاءة، يوفر في استهلاك الطاقة',
    price: 55,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    category: 'عوازل',
    inStock: true,
    rating: 4.7,
    reviews: 78
  }
];

export const categories = [
  'جميع الفئات',
  'بلاط وسيراميك',
  'رخام وجرانيت',
  'أرضيات خشبية',
  'دهانات وألوان',
  'إضاءة وكهرباء',
  'أدوات صحية',
  'ورق جدران',
  'عوازل'
];