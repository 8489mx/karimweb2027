import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8ea420ab-cf9f-4c28-9347-e108a4f3e9fa",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
          onClose();
        }, 3000);
      } else {
        console.error("Form submission failed", result);
        setStatus('idle');
      }
    } catch (error) {
       console.error("Error submitting form", error);
       setStatus('idle');
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gradient-to-b from-[#eaf6ff] to-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-[420px] overflow-hidden pointer-events-auto relative p-6 sm:p-8"
              dir="rtl"
            >
              <button
                onClick={onClose}
                className="absolute top-5 left-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-7 pt-4 sm:pt-2 px-1">
                <h3 className="text-[24px] font-bold text-slate-900 font-sans mb-3">تواصل معنا</h3>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed">
                  أرسل استفسارك وسنقوم بالرد عليك في أقرب وقت.
                </p>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2 font-sans">تم إرسال رسالتك بنجاح!</h4>
                  <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-[280px]">شكراً لتواصلك معنا، رسالتك وصلتنا وهنرد عليك في أقرب وقت.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <User className="h-[18px] w-[18px] text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-100 rounded-[14px] pr-[42px] pl-4 py-3.5 text-[14px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium placeholder:text-slate-400"
                      placeholder="الاسم بالكامل"
                      autoComplete="name"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Mail className="h-[18px] w-[18px] text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-100 rounded-[14px] pr-[42px] pl-4 py-3.5 text-[14px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium placeholder:text-slate-400 text-right"
                      placeholder="البريد الإلكتروني"
                      autoComplete="email"
                      dir="rtl"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Phone className="h-[18px] w-[18px] text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-100 rounded-[14px] pr-[42px] pl-4 py-3.5 text-[14px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium placeholder:text-slate-400 text-right"
                      placeholder="رقم الهاتف (اختياري)"
                      autoComplete="tel"
                      dir="rtl"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute top-4 right-0 pr-4 flex items-start pointer-events-none">
                      <MessageSquare className="h-[18px] w-[18px] text-slate-400" />
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-100 rounded-[14px] pr-[42px] pl-4 py-3.5 text-[14px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium resize-none placeholder:text-slate-400"
                      placeholder="كيف يمكننا مساعدتك؟"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-slate-900 text-white rounded-[14px] py-3.5 px-4 font-bold text-[14px] font-sans hover:bg-slate-800 transition-all shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] active:scale-[0.98] flex items-center justify-center mt-5 disabled:opacity-70 group"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span>إرسال الرسالة</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
