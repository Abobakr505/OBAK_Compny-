import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, Package, Users, BarChart3, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

// Extracted LoginForm component
const LoginForm: React.FC<{
  handleLogin: (e: React.FormEvent) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
}> = ({ handleLogin, email, setEmail, password, setPassword, error }) => (
  <div className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        <LogIn className="text-white" size={24} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        تسجيل دخول الإدارة
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        أدخل بيانات الدخول للوصول إلى لوحة التحكم
      </p>
    </div>

    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200 text-right"
          dir="rtl"
          placeholder="admin@obak.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          كلمة المرور
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200 text-right"
          dir="rtl"
          placeholder="••••••••"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg"
      >
        تسجيل الدخول
      </button>
    </form>

    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <p className="font-semibold">بيانات تجريبية:</p>
      <p>البريد: admin@obak.com</p>
      <p>كلمة المرور: obak2024</p>
    </div>
  </div>
);

// Extracted Dashboard component
const Dashboard: React.FC<{
  products: any[];
  categories: any[];
  totalSales: number;
  handleLogout: () => void;
}> = ({ products, categories, totalSales, handleLogout }) => (
  <div className="space-y-8 mt-10">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        لوحة التحكم
      </h2>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
      >
        <LogOut size={18} />
        <span className="font-medium">تسجيل خروج</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">إجمالي المنتجات</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.length}</p>
          </div>
          <Package className="text-primary-500" size={40} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الفئات</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
          </div>
          <Users className="text-green-500" size={40} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">إجمالي المبيعات</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSales.toFixed(2)} ر.س</p>
          </div>
          <BarChart3 className="text-primary-500" size={40} />
        </div>
      </div>
    </div>
  </div>
);

// Extracted ProductsTab component
const ProductsTab: React.FC<{
  products: any[];
  categories: any[];
  newProduct: any;
  setNewProduct: (product: any) => void;
  selectedImages: File[];
  setSelectedImages: (files: File[]) => void;
  editingProductId: number | null;
  addOrUpdateProduct: () => void;
  deleteProduct: (id: number) => void;
  editProduct: (prod: any) => void;
  handleVariantsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFeaturesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  products,
  categories,
  newProduct,
  setNewProduct,
  setSelectedImages,
  editingProductId,
  addOrUpdateProduct,
  deleteProduct,
  editProduct,
  handleVariantsChange,
  handleFeaturesChange,
}) => (
  <div className="space-y-8">
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة المنتجات</h3>
    
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المنتج</label>
          <input
            type="text"
            placeholder="اسم المنتج"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full px-4 py-3 dark:text-gray-300  border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">السعر</label>
          <input
            type="number"
            placeholder="السعر"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
            dir="rtl"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف القصير (للبطاقة)</label>
        <textarea
          placeholder="الوصف القصير (للبطاقة)"
          value={newProduct.short_description}
          onChange={(e) => setNewProduct({ ...newProduct, short_description: e.target.value })}
          className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 h-24 text-right"
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف الطويل (لصفحة التفاصيل)</label>
        <textarea
          placeholder="الوصف الطويل (لصفحة التفاصيل)"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="w-full px-4 py-3  dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 h-32 text-right"
          dir="rtl"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رفع الصور (الصورة الأولى هي الرئيسية)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSelectedImages(e.target.files ? Array.from(e.target.files) : [])}
            className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200"
          />
          {newProduct.main_image && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">الصورة الرئيسية الحالية: {newProduct.main_image}</p>
          )}
          {newProduct.additional_images && newProduct.additional_images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">الصور الإضافية:</p>
              <ul className="list-disc list-inside text-sm text-gray-500  dark:text-gray-400">
                {newProduct.additional_images.map((img: string, idx: number) => (
                  <li key={idx}>{img}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الفئة</label>
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
            dir="rtl"
          >
            <option value="">اختر فئة</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">التقييم</label>
          <input
            type="number"
            step="0.1"
            placeholder="التقييم"
            value={newProduct.rating}
            onChange={(e) => setNewProduct({ ...newProduct, rating: parseFloat(e.target.value) })}
            className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">عدد المراجعات</label>
          <input
            type="number"
            placeholder="عدد المراجعات"
            value={newProduct.reviews}
            onChange={(e) => setNewProduct({ ...newProduct, reviews: parseInt(e.target.value) })}
            className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
            dir="rtl"
          />
        </div>
      </div>
      <div>
        <label className="block  text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الأنواع (مفصولة بفاصلة)</label>
        <input
          type="text"
          placeholder="الأنواع (مفصولة بفاصلة)"
          value={newProduct.variants.join(', ')}
          onChange={handleVariantsChange}
          className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المميزات (مفصولة بفاصلة)</label>
        <input
          type="text"
          placeholder="المميزات (مفصولة بفاصلة)"
          value={newProduct.features.join(', ')}
          onChange={handleFeaturesChange}
          className="w-full px-4 py-3 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
          dir="rtl"
        />
      </div>
      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={newProduct.in_stock}
          onChange={(e) => setNewProduct({ ...newProduct, in_stock: e.target.checked })}
          className="w-5 h-5 accent-primary-500"
        />
        متوفر في المخزون
      </label>
      <button
        onClick={addOrUpdateProduct}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        {editingProductId ? 'تحديث المنتج' : 'إضافة منتج'}
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(prod => (
        <div key={prod.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700">
          {prod.main_image && <img src={prod.main_image} alt={prod.name} className="w-full h-40 object-cover rounded-lg mb-4" />}
          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{prod.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الفئة: {prod.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">السعر: {prod.price} ج.م</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => editProduct(prod)} className="text-primary-500 hover:text-primary-600 transition"><Edit size={20} /></button>
            <button onClick={() => deleteProduct(prod.id)} className="text-red-500 hover:text-red-600 transition"><Trash2 size={20} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Extracted CategoriesTab component
const CategoriesTab: React.FC<{
  categories: any[];
  newCategory: string;
  setNewCategory: (value: string) => void;
  editingCategoryId: number | null;
  addOrUpdateCategory: () => void;
  deleteCategory: (id: number) => void;
  editCategory: (cat: any) => void;
}> = ({
  categories,
  newCategory,
  setNewCategory,
  editingCategoryId,
  addOrUpdateCategory,
  deleteCategory,
  editCategory,
}) => (
  <div className="space-y-8">
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الفئات</h3>
    
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم الفئة</label>
        <input
          type="text"
          placeholder="اسم الفئة"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition duration-200 text-right"
          dir="rtl"
        />
      </div>
      <button
        onClick={addOrUpdateCategory}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        {editingCategoryId ? 'تحديث الفئة' : 'إضافة فئة'}
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(cat => (
        <div key={cat.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{cat.name}</h4>
          <div className="flex justify-end gap-3">
            <button onClick={() => editCategory(cat)} className="text-primary-500 hover:text-primary-600 transition"><Edit size={20} /></button>
            <button onClick={() => deleteCategory(cat.id)} className="text-red-500 hover:text-red-600 transition"><Trash2 size={20} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminPanel: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [totalSales, setTotalSales] = useState(0);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    short_description: '',
    price: 0,
    main_image: '',
    additional_images: [] as string[],
    category: '',
    rating: 0,
    reviews: 0,
    in_stock: true,
    variants: [] as string[],
    features: [] as string[],
    sales: 0
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    const { data: prods, error: prodsError } = await supabase.from('products').select('*');
    if (prodsError) {
      console.error('Error fetching products:', prodsError);
      toast.error('حدث خطأ أثناء جلب المنتجات');
      return;
    }
    setProducts(prods || []);

    // Calculate total sales (price * sales for each product)
    const total = prods
      ? prods.reduce((sum, prod) => sum + (prod.price * (prod.sales || 0)), 0)
      : 0;
    setTotalSales(total);

    const { data: cats, error: catsError } = await supabase.from('categories').select('*');
    if (catsError) {
      console.error('Error fetching categories:', catsError);
      toast.error('حدث خطأ أثناء جلب الفئات');
      return;
    }
    setCategories(cats || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success('تم تسجيل الدخول بنجاح ✅');
      setError('');
      setEmail('');
      setPassword('');
      fetchData();
    } else {
      setError('بيانات الدخول غير صحيحة');
      toast.error('بيانات الدخول غير صحيحة ❌');
    }
  };

  const handleLogout = async () => {
    await logout();
    setActiveTab('dashboard');
    toast.success('تم تسجيل الخروج بنجاح ✅');
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Image upload error:', uploadError);
      toast.error('حدث خطأ أثناء رفع الصورة ❌');
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const addOrUpdateProduct = async () => {
    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول لإضافة أو تحديث المنتج ❌');
      return;
    }

    if (!newProduct.name || !newProduct.price) {
      toast.error('اسم المنتج والسعر مطلوبان ❌');
      return;
    }

    if (isNaN(newProduct.price) || newProduct.price < 0 || newProduct.price > 99999999.99) {
      toast.error('السعر يجب أن يكون بين 0 و 99999999.99 ❌');
      return;
    }
    if (isNaN(newProduct.rating) || newProduct.rating < 0 || newProduct.rating > 999.99) {
      toast.error('التقييم يجب أن يكون بين 0 و 999.99 ❌');
      return;
    }

    const productData = {
      ...newProduct,
      price: Number(newProduct.price.toFixed(2)),
      rating: Number(newProduct.rating.toFixed(2)),
      variants: Array.isArray(newProduct.variants) ? newProduct.variants : [],
      features: Array.isArray(newProduct.features) ? newProduct.features : [],
      main_image: newProduct.main_image || null,
      additional_images: newProduct.additional_images || [],
    };

    if (selectedImages.length > 0) {
      const uploadedUrls = await Promise.all(
        selectedImages.map(file => uploadImage(file))
      );
      const validUrls = uploadedUrls.filter((url): url is string => url !== null);
      if (validUrls.length === 0) {
        toast.error('فشل في رفع الصور ❌');
        return;
      }
      productData.main_image = validUrls[0];
      productData.additional_images = validUrls.slice(1);
    }

    if (editingProductId) {
      const { error } = await supabase.from('products').update(productData).eq('id', editingProductId);
      if (!error) {
        fetchData();
        resetProductForm();
        toast.success(`تم تحديث المنتج "${newProduct.name}" بنجاح ✅`);
      } else {
        console.error('Update error:', error);
        toast.error(`حدث خطأ أثناء تحديث المنتج: ${error.message} ❌`);
      }
    } else {
      const { error } = await supabase.from('products').insert([productData]);
      if (!error) {
        fetchData();
        resetProductForm();
        toast.success(`تم إضافة المنتج "${newProduct.name}" بنجاح ✅`);
      } else {
        console.error('Insert error:', error);
        toast.error(`حدث خطأ أثناء إضافة المنتج: ${error.message} ❌`);
      }
    }
  };

  const deleteProduct = async (id: number) => {
    const product = products.find(p => p.id === id);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      fetchData();
      toast.success(`تم حذف المنتج "${product?.name}" بنجاح ✅`);
    } else {
      toast.error('حدث خطأ أثناء حذف المنتج ❌');
    }
  };

  const editProduct = (prod: any) => {
    setNewProduct({
      ...prod,
      variants: prod.variants || [],
      features: prod.features || [],
      short_description: prod.short_description || '',
      main_image: prod.main_image || '',
      additional_images: prod.additional_images || [],
      sales: prod.sales || 0,
    });
    setSelectedImages([]);
    setEditingProductId(prod.id);
  };

  const resetProductForm = () => {
    setNewProduct({
      name: '',
      description: '',
      short_description: '',
      price: 0,
      main_image: '',
      additional_images: [],
      category: '',
      rating: 0,
      reviews: 0,
      in_stock: true,
      variants: [],
      features: [],
      sales: 0
    });
    setSelectedImages([]);
    setEditingProductId(null);
  };

  const addOrUpdateCategory = async () => {
    if (!newCategory) {
      toast.error('اسم الفئة مطلوب ❌');
      return;
    }
    if (editingCategoryId) {
      const { error } = await supabase.from('categories').update({ name: newCategory }).eq('id', editingCategoryId);
      if (!error) {
        fetchData();
        resetCategoryForm();
        toast.success(`تم تحديث الفئة "${newCategory}" بنجاح ✅`);
      } else {
        toast.error(`حدث خطأ أثناء تحديث الفئة: ${error.message} ❌`);
      }
    } else {
      const { error } = await supabase.from('categories').insert([{ name: newCategory }]);
      if (!error) {
        fetchData();
        resetCategoryForm();
        toast.success(`تم إضافة الفئة "${newCategory}" بنجاح ✅`);
      } else {
        toast.error(`حدث خطأ أثناء إضافة الفئة: ${error.message} ❌`);
      }
    }
  };

  const deleteCategory = async (id: number) => {
    const category = categories.find(c => c.id === id);
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      fetchData();
      toast.success(`تم حذف الفئة "${category?.name}" بنجاح ✅`);
    } else {
      toast.error('حدث خطأ أثناء حذف الفئة ❌');
    }
  };

  const editCategory = (cat: any) => {
    setNewCategory(cat.name);
    setEditingCategoryId(cat.id);
  };

  const resetCategoryForm = () => {
    setNewCategory('');
    setEditingCategoryId(null);
  };

  const handleVariantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, variants: e.target.value.split(',').map(v => v.trim()) });
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, features: e.target.value.split(',').map(v => v.trim()) });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8" dir="rtl">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#d97706',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '16px 24px',
            borderRadius: '12px',
            textAlign: 'center'
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#b45309',
            },
          },
        }}
      />
      {!isAuthenticated ? (
        <LoginForm
          handleLogin={handleLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
        />
      ) : (
        <>
          <div className="flex gap-4 mb-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-3 rounded-full font-medium transition duration-300 ${activeTab === 'dashboard' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              لوحة التحكم
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-3 rounded-full font-medium transition duration-300 ${activeTab === 'products' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              المنتجات
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 px-6 py-3 rounded-full font-medium transition duration-300 ${activeTab === 'categories' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              الفئات
            </button>
          </div>

          {activeTab === 'dashboard' && (
            <Dashboard products={products} categories={categories} totalSales={totalSales} handleLogout={handleLogout} />
          )}
          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              categories={categories}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              editingProductId={editingProductId}
              addOrUpdateProduct={addOrUpdateProduct}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
              handleVariantsChange={handleVariantsChange}
              handleFeaturesChange={handleFeaturesChange}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              editingCategoryId={editingCategoryId}
              addOrUpdateCategory={addOrUpdateCategory}
              deleteCategory={deleteCategory}
              editCategory={editCategory}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;