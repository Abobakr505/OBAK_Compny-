import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Chat, GoogleGenAI } from "@google/genai";
import type { ChatMessage } from '../lib/types';
import { X, SendIcon, SparklesIcon } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

interface AiAssistantModalProps {
  onClose: () => void;
}

const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // Added for data fetching
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchData = useCallback(async () => {
    try {
      setDataLoading(true);
      // Fetch products
      const { data: prods, error: prodsError } = await supabase
        .from('products')
        .select('*');
      if (prodsError) {
        throw new Error(`خطأ في جلب المنتجات: ${prodsError.message}`);
      }
      setProducts(prods || []);

      // Fetch categories
      const { data: cats, error: catsError } = await supabase
        .from('categories')
        .select('*');
      if (catsError) {
        throw new Error(`خطأ في جلب الفئات: ${catsError.message}`);
      }
      setCategories(cats || []);
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء جلب البيانات ❌');
      setError('حدث خطأ أثناء جلب البيانات');
    } finally {
      setDataLoading(false);
    }
  }, []);

  const initializeChat = useCallback(() => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY environment variable not set.');
      }
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
        أنت مساعد ذكي وودود لشركة "OBAK" المتخصصة في بيع منتجات التشطيبات. مهمتك مساعدة العملاء في اختيار المنتجات بناءً على البيانات المقدمة فقط. أجب باللغة العربية عن الأسئلة المتعلقة بالمنتجات، الأسعار، الفئات، الميزات، أكثر المنتجات مبيعًا، والمنتجات المتوفرة. لا تبتكر بيانات جديدة. كن موجزًا ومفيدًا.
        
        بيانات المنتجات:
        ${JSON.stringify(products, null, 2)}
        
        بيانات الفئات:
        ${JSON.stringify(categories, null, 2)}
        
        لتحديد أكثر المنتجات مبيعًا، رتب المنتجات حسب حقل "sales" بترتيب تنازلي. إذا سُئلت عن المنتجات المتوفرة، ركز على المنتجات التي تحتوي على "in_stock: true". قدم الإجابات بشكل واضح ومنظم، مع استخدام قوائم أو جداول إذا لزم الأمر.
      `;

      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction,
        },
      });
      setMessages([{
        role: 'model',
        text: 'أهلاً بك في شركة "OBAK"! كيف يمكنني مساعدتك في منتجات التشطيبات اليوم؟'
      }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred during initialization.');
      console.error(e);
      toast.error('حدث خطأ أثناء تهيئة المساعد الذكي ❌');
    }
  }, [products, categories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!dataLoading) {
      initializeChat();
    }
  }, [dataLoading, initializeChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: input });

      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === 'model') {
            return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + chunkText }];
          }
          return prev;
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Sorry, something went wrong.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: `عذرًا، حدث خطأ ما. ${errorMessage}` }]);
      console.error(e);
      toast.error('حدث خطأ أثناء معالجة طلبك ❌');
    } finally {
      setIsLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 mt-4" onClick={onClose}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#f59e0b',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '16px 24px',
            borderRadius: '12px',
            textAlign: 'center',
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
      <div className="w-full max-w-2xl h-[80vh] bg-stone-100 rounded-2xl shadow-2xl flex flex-col border border-stone-300 mt-20" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-stone-200">
          <div className="flex items-center space-x-3 gap-2">
            <SparklesIcon className="w-6 h-6 text-primary-700" />
            <h2 className="text-3xl text-primary-500">المساعد الذكي</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 transition-colors" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary-500 text-white rounded-br-none' : 'bg-stone-200 text-slate-800 rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-3 justify-start">
              <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-stone-200 text-slate-800 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-primary-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-stone-200 bg-stone-200/50 rounded-b-2xl">
          <div className="flex items-center bg-white rounded-full p-2 border border-stone-300 focus-within:ring-2 focus-within:ring-primary transition-shadow">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اسأل عن المنتجات، الميزات، أو الأسعار..."
              className="flex-1 bg-transparent px-4 text-slate-800 placeholder-slate-500 focus:outline-none"
              disabled={isLoading}
              dir="rtl"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-primary-500 text-white rounded-full disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors hover:bg-primary-700">
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiAssistantModal;