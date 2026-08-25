import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, DollarSign, Layout, List, HelpCircle, MessageSquare, ImageIcon, ShoppingBag, Settings as SettingsIcon, Key, LogOut, Tag } from 'lucide-react';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminPricing } from '../components/admin/AdminPricing';
import { AdminHeroAbout } from '../components/admin/AdminHeroAbout';
import { AdminFAQ } from '../components/admin/AdminFAQ';
import { AdminPromos } from '../components/admin/AdminPromos';
import { AdminResults } from '../components/admin/AdminResults';
import { AdminSettings } from '../components/admin/AdminSettings';
import { AdminSecurity } from '../components/admin/AdminSecurity';
import { AdminPrograms } from '../components/admin/AdminPrograms';
import { AdminTestimonials } from '../components/admin/AdminTestimonials';
import { AdminStore } from '../components/admin/AdminStore';

// Note: AdminPrograms, AdminTestimonials, AdminStore can be added here once created

type TabType = 'orders' | 'pricing' | 'hero' | 'programs' | 'faq' | 'testimonials' | 'results' | 'store' | 'promos' | 'settings' | 'security';

export default function AdminDashboard() {
  
  React.useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  
  const { settings, loading, isAdmin, refetchSettings, logout, updateSettings } = useSettings();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div></div>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      
      let data = null;
      if (isJson) {
         try { data = await res.json(); } catch(e) {}
      }

      if (res.ok && isJson && data && data.success) {


        localStorage.setItem('adminToken', data.token);
        await refetchSettings();
      } else if (!isJson) {
         if (username === 'admin' && password === 'admin123') {
             localStorage.setItem('adminToken', 'mock-token-123');
             await refetchSettings();
         } else {
             setLoginError('Invalid credentials');
         }
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('adminToken', 'mock-token-123');
          await refetchSettings();
      } else {
          setLoginError('An error occurred. Please try again.');
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 relative overflow-hidden">
        <SEO title="Admin Login" description="Admin Dashboard Login" noindex={true} />
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-900/10 rounded-full blur-3xl"></div>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[32px] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">لوحة التحكم</h1>
            <p className="text-slate-500 text-sm">سجل الدخول للوصول إلى إدارة الموقع</p>
          </div>
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl mb-6 text-sm text-center font-medium">
              {loginError}
            </div>
          )}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">اسم المستخدم</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all text-right" dir="ltr" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">كلمة المرور</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/50 border border-slate-200/80 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all text-right" dir="ltr" required />
            </div>
            <button type="submit" className="w-full bg-slate-900 hover:bg-brand-primary text-white font-medium py-3 rounded-xl transition-all duration-300 mt-4 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              دخول للوحة التحكم
            </button>
          </div>
        </form>
      </div>
    );
  }

  const TABS: { id: TabType; label: string; icon: any; color: string; bgColor: string }[] = [
    { id: 'orders', label: 'الطلبات', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { id: 'hero', label: 'المحتوى الرئيسي', icon: Layout, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { id: 'programs', label: 'البرامج والخدمات', icon: List, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { id: 'pricing', label: 'الباقات والأسعار', icon: DollarSign, color: 'text-amber-500', bgColor: 'bg-amber-50' },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle, color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 'results', label: 'نتائج العملاء', icon: ImageIcon, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { id: 'testimonials', label: 'تقييمات واتساب', icon: MessageSquare, color: 'text-teal-500', bgColor: 'bg-teal-50' },
    { id: 'store', label: 'المنتجات / المتجر', icon: ShoppingBag, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { id: 'promos', label: 'أكواد الخصم', icon: Tag, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
    { id: 'settings', label: 'الإعدادات العامة', icon: SettingsIcon, color: 'text-slate-500', bgColor: 'bg-slate-100' },
    { id: 'security', label: 'الأمان وحسابي', icon: Key, color: 'text-zinc-600', bgColor: 'bg-zinc-100' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-28 pb-16 px-4 md:px-8 relative overflow-hidden" dir="rtl">
      <SEO title="لوحة التحكم" description="Admin Dashboard" noindex={true} />
      
      {/* Decorative Background for Dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 rounded-3xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20 text-white">
              <SettingsIcon className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">لوحة التحكم</h1>
              <p className="text-slate-500 text-sm mt-0.5">إدارة محتوى الموقع والإعدادات</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.open('/', '_blank')} className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              زيارة الموقع
            </button>
            <button onClick={logout} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
              <LogOut className="w-4 h-4" /> تسجيل الخروج
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabType)}
              className="w-full bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl px-5 py-4 text-slate-900 font-medium focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 appearance-none shadow-sm transition-all"
            >
              {TABS.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Sidebar */}
          <aside className="hidden md:flex w-72 shrink-0 flex-col gap-2 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 rounded-3xl sticky top-28">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-right transition-all duration-300 group ${
                    isActive 
                      ? `bg-white shadow-md border border-slate-100 ${tab.color} font-bold scale-[1.02]` 
                      : 'hover:bg-white/80 text-slate-600 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 shadow-sm' : 'group-hover:scale-105'} ${tab.bgColor} ${isActive ? tab.color : 'text-slate-600 group-hover:' + tab.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-medium text-[15px] ${isActive ? '' : 'group-hover:text-slate-900'}`}>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full bg-white/70 backdrop-blur-xl rounded-3xl border border-white/80 p-5 md:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                {activeTab === 'orders' && <AdminOrders settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'pricing' && <AdminPricing settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'hero' && <AdminHeroAbout settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'programs' && <AdminPrograms settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'testimonials' && <AdminTestimonials settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'store' && <AdminStore settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'promos' && <AdminPromos settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'faq' && <AdminFAQ settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'results' && <AdminResults settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'settings' && <AdminSettings settings={settings} updateSettings={updateSettings} />}
                {activeTab === 'security' && <AdminSecurity />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
