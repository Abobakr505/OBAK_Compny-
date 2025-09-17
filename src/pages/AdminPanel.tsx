import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Package, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setActiveTab] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      setError('');
      setEmail('');
      setPassword('');
    } else {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('dashboard');
  };

  const LoginForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-16"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          تسجيل دخول الإدارة
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          أدخل بيانات الدخول للوصول إلى لوحة التحكم
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
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
            className="input-field"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn-primary"
        >
          تسجيل الدخول
        </motion.button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>بيانات تجريبية:</p>
        <p>البريد: admin@obak.com</p>
        <p>كلمة المرور: obak2024</p>
      </div>
    </motion.div>
  );

  const Dashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 mt-10"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          لوحة التحكم
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          <LogOut size={16} />
          <span>تسجيل خروج</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
            <Package className="text-primary-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">العملاء</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">المبيعات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12,450 ر.س</p>
            </div>
            <BarChart3 className="text-blue-500" size={32} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 p-6">
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </div>
  );
};

export default AdminPanel;
