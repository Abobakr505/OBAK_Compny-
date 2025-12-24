import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { CartItem, Product } from "../types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ✅ تحميل الكارت مع تنظيف البيانات الفاسدة
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    if (!saved) return [];

    try {
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.filter(
        (item) =>
          item &&
          item.product &&
          typeof item.product.price === "number" &&
          typeof item.quantity === "number"
      );
    } catch {
      return [];
    }
  });

  // ✅ حفظ الكارت
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ إضافة منتج
  const addToCart = (
    product: Product,
    quantity = 1,
    variant?: string
  ) => {
    if (!product || typeof product.price !== "number") return;

    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id && item.variant === variant
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity, variant }];
    });
  };

  // ✅ حذف منتج
  const removeFromCart = (productId: string, variant?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          String(item.product.id) !== String(productId) ||
          item.variant !== variant
      )
    );
  };

  // ✅ تحديث الكمية
  const updateQuantity = (
    productId: string,
    quantity: number,
    variant?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        String(item.product.id) === String(productId) &&
        item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ✅ تفريغ الكارت
  const clearCart = () => setItems([]);

  // ✅ حساب الإجمالي بأمان
  const total = items.reduce((sum, item) => {
    if (!item.product || typeof item.product.price !== "number") {
      return sum;
    }
    return sum + item.product.price * item.quantity;
  }, 0);

  // ✅ عدد العناصر
  const itemCount = items.reduce((sum, item) => {
    if (typeof item.quantity !== "number") return sum;
    return sum + item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook الاستخدام
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within CartProvider");
  return context;
};
