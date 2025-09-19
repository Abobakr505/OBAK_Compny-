// types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: number;
  main_image: string;
  additional_images: string[];
  category: string;
  rating: number;
  reviews: number;
  in_stock: boolean;
  variants: string[];
  features: string[];
  sales: number; // Added sales field
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
