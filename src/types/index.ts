export interface Product {
  id: string;
  name: string;
  description: string; // الوصف القصير
  longDescription?: string; // الوصف الطويل (اختياري)
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  variants?: string[]; // الأنواع أو الخيارات المتاحة للمنتج
  features?: string[]; // قائمة المميزات
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string; // أضفنا النوع هنا
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}
