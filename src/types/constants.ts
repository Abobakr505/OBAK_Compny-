import { ServiceCategory } from '../lib/types';

export const WHATSAPP_NUMBER = "+15551234567"; // Replace with actual WhatsApp number

export const SERVICES_DATA: ServiceCategory[] = [
  {
    category: 'تطوير الويب',
    items: [
      {
        name: 'موقع ويب أساسي',
        description: 'تصميم وتطوير موقع ويب بسيط باستخدام HTML، CSS، وJavaScript.',
        price: '5000 SAR',
        image: 'https://picsum.photos/seed/basic-website/400/300',
        tags: ['الأكثر طلباً'],
        timeline: '2-4 أسابيع',
        features: ['صفحات ثابتة', 'تصميم سريع الاستجابة', 'تحسين SEO أساسي']
      },
      {
        name: 'موقع ويب ديناميكي',
        description: 'تطوير موقع ويب متقدم باستخدام React أو Vue مع قاعدة بيانات.',
        price: '15000 SAR',
        image: 'https://picsum.photos/seed/dynamic-website/400/300',
        tags: ['متقدم'],
        timeline: '4-8 أسابيع',
        features: ['إدارة المحتوى', 'تكامل API', 'أمان متقدم']
      },
      {
        name: 'تطبيق ويب مخصص',
        description: 'بناء تطبيق ويب كامل حسب احتياجات العميل مع ميزات متقدمة.',
        price: '30000 SAR',
        image: 'https://picsum.photos/seed/custom-web-app/400/300',
        tags: ['مخصص'],
        timeline: '8-12 أسبوع',
        features: ['واجهة مستخدم مخصصة', 'قواعد بيانات معقدة', 'تكامل مع أنظمة خارجية']
      },
    ]
  },
  {
    category: 'تطوير التطبيقات المحمولة',
    items: [
      {
        name: 'تطبيق Android أساسي',
        description: 'تطوير تطبيق أندرويد بسيط باستخدام Kotlin أو Java.',
        price: '10000 SAR',
        image: 'https://picsum.photos/seed/android-app/400/300',
        tags: ['الأكثر طلباً'],
        timeline: '3-6 أسابيع',
        features: ['واجهة بسيطة', 'تكامل مع الجهاز', 'نشر على Google Play']
      },
      {
        name: 'تطبيق iOS أساسي',
        description: 'تطوير تطبيق آيفون بسيط باستخدام Swift.',
        price: '12000 SAR',
        image: 'https://picsum.photos/seed/ios-app/400/300',
        tags: ['متقدم'],
        timeline: '3-6 أسابيع',
        features: ['واجهة بسيطة', 'تكامل مع iOS', 'نشر على App Store']
      },
      {
        name: 'تطبيق هجين (Cross-Platform)',
        description: 'تطوير تطبيق يعمل على Android وiOS باستخدام Flutter أو React Native.',
        price: '20000 SAR',
        image: 'https://picsum.photos/seed/hybrid-app/400/300',
        tags: ['فعال'],
        timeline: '5-10 أسابيع',
        features: ['كود مشترك', 'أداء عالي', 'نشر على كلا المنصتين']
      },
    ]
  },
  {
    category: 'تصميم UI/UX',
    items: [
      {
        name: 'تصميم واجهة مستخدم أساسي',
        description: 'تصميم UI بسيط باستخدام Figma أو Adobe XD.',
        price: '4000 SAR',
        image: 'https://picsum.photos/seed/ui-design/400/300',
        tags: ['الأكثر طلباً'],
        timeline: '1-2 أسابيع',
        features: ['رسومات أساسية', 'نماذج أولية', 'تعديلات محدودة']
      },
      {
        name: 'تصميم تجربة مستخدم كاملة',
        description: 'تصميم UX/UI شامل مع بحث مستخدم واختبارات.',
        price: '8000 SAR',
        image: 'https://picsum.photos/seed/ux-design/400/300',
        tags: ['شامل'],
        timeline: '2-4 أسابيع',
        features: ['بحث مستخدم', 'نماذج تفاعلية', 'تحسينات مستمرة']
      },
      {
        name: 'إعادة تصميم تطبيق موجود',
        description: 'تحديث وإعادة تصميم UI/UX لتطبيق أو موقع موجود.',
        price: '6000 SAR',
        image: 'https://picsum.photos/seed/redesign/400/300',
        tags: ['تحديث'],
        timeline: '2-3 أسابيع',
        features: ['تحليل الحالي', 'تصميم جديد', 'اختبارات']
      },
    ]
  },
  {
    category: 'خدمات أخرى',
    items: [
      {
        name: 'صيانة ودعم فني',
        description: 'خدمات صيانة شهرية للمواقع والتطبيقات.',
        price: '2000 SAR/شهر',
        image: 'https://picsum.photos/seed/maintenance/400/300',
        tags: ['مستمر'],
        timeline: 'شهري',
        features: ['تحديثات أمنية', 'إصلاح أخطاء', 'دعم 24/7']
      },
      {
        name: 'تكامل API',
        description: 'تكامل مع خدمات خارجية مثل الدفع أو الخرائط.',
        price: '5000 SAR',
        image: 'https://picsum.photos/seed/api-integration/400/300',
        tags: ['تقني'],
        timeline: '1-3 أسابيع',
        features: ['تكامل آمن', 'اختبارات', 'وثائق']
      },
      {
        name: 'تطوير برمجيات مخصصة',
        description: 'حلول برمجية مخصصة للأعمال الكبيرة.',
        price: '50000 SAR+',
        image: 'https://picsum.photos/seed/custom-software/400/300',
        tags: ['مخصص'],
        timeline: '3-6 أشهر',
        features: ['تحليل احتياجات', 'تطوير كامل', 'تدريب']
      },
    ]
  }
];