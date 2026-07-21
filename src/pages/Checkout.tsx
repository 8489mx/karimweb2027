import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Copy, Loader2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackCheckoutComplete, trackCheckoutStart, trackCheckoutStep } from '../utils/tracking';
import { Footer } from '../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrencyCode, createOrder, OrderDetails, getOrder } from '../utils/api';
import { CountryCode, DurationCode, PackageCode } from '../config/pricing';
import { SEO } from '../components/SEO';

type CheckoutStep = 'FORM' | 'PAYMENT';

export function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, dir, lang } = useLanguage();
  
  const token = searchParams.get('token');
  const initialOrderNumber = searchParams.get('order');

  let initialTokenData: { pkg: PackageCode, duration: DurationCode, country: CountryCode } | null = null;
  if (token) {
    try {
      const stored = sessionStorage.getItem(token);
      if (stored) {
        initialTokenData = JSON.parse(stored);
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (!initialTokenData && !initialOrderNumber) {
      navigate('/', { replace: true });
    }
  }, [initialTokenData, initialOrderNumber, navigate]);

  const tokenData = initialTokenData || { pkg: 'elite' as PackageCode, duration: '3m' as DurationCode, country: 'OTHER' as CountryCode };
  const pkgKey = tokenData.pkg;
  const durationKey = tokenData.duration;
  const countryKey = tokenData.country;


  const [step, setStep] = useState<CheckoutStep>(initialOrderNumber ? 'PAYMENT' : 'FORM');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(initialOrderNumber ? true : false);
  const [error, setError] = useState('');


  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [residenceCountry, setResidenceCountry] = useState<CountryCode>(countryKey);

  // Payment State
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // If we land with an order_number, fetch it directly
    if (initialOrderNumber) {
      fetchOrder(initialOrderNumber);
    } else {
      trackCheckoutStart({ package_name: pkgKey, cta_location: 'checkout_load' });
    }
  }, [initialOrderNumber]);

  const fetchOrder = async (orderNumber: string) => {
    setIsLoading(true);
    const res = await getOrder(orderNumber);
    if (res.success && res.order) {
      setOrderDetails(res.order);
      setStep('PAYMENT');
      setDefaultPaymentMethod(res.order.residence_country);
    } else {
      setError('الطلب غير موجود أو انتهت صلاحيته.');
    }
    setIsLoading(false);
  };

  const setDefaultPaymentMethod = (country: CountryCode) => {
    if (country === 'EG') {
      setSelectedMethod('instapay');
    } else {
      setSelectedMethod('international_bank');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsLoading(true);
    setError('');

    const res = await createOrder({
      customer_name: name,
      phone_number: phone,
      phone_country_code: '', // Can be extracted from phone if needed
      residence_country: residenceCountry,
      package_code: pkgKey,
      duration_code: durationKey
    });

    if (res.success && res.order_number) {
      // Order created, fetch it to show in payment step
      trackCheckoutStep({ step_name: 'payment_methods', package_name: pkgKey });
      
      // Update URL so they can refresh
      navigate(`/checkout?order=${res.order_number}`, { replace: true });
      await fetchOrder(res.order_number);
    } else {
      setError(res.error || 'حدث خطأ أثناء إنشاء الطلب. الرجاء المحاولة مرة أخرى.');
    }
    setIsLoading(false);
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getWhatsAppMessage = () => {
    if (!orderDetails) return '';
    
    let paymentMethodName = '';
    if (selectedMethod === 'instapay') paymentMethodName = 'إنستاباي (InstaPay)';
    if (selectedMethod === 'wallet') paymentMethodName = 'محفظة إلكترونية';
    if (selectedMethod === 'bank') paymentMethodName = 'تحويل أو إيداع بنكي';
    if (selectedMethod === 'international_bank') paymentMethodName = 'تحويل بنكي دولي';
    if (selectedMethod === 'international_wallet') paymentMethodName = 'محفظة إلكترونية دولية';

    const message = `*طلب اشتراك جديد* 🚀
رقم الطلب: ${orderDetails.order_number}
الاسم: ${orderDetails.customer_name}
رقم الهاتف: ${orderDetails.phone_number}
الدولة: ${t.countries[orderDetails.residence_country]}
الباقة: ${orderDetails.package_code.toUpperCase()}
مدة الاشتراك: ${orderDetails.total_duration_months} شهور
المبلغ المطلوب: ${orderDetails.final_amount} ${orderDetails.currency_code}
طريقة الدفع المختارة: ${paymentMethodName}

قمت بالتحويل وسأرفق صورة الإيصال في هذه المحادثة (أو أريد بيانات الدفع لو كانت دولية).`;

    return encodeURIComponent(message);
  };

  const handleFinalSubmit = () => {
    trackCheckoutComplete({ 
      package_name: orderDetails?.package_code || '', 
      price: String(orderDetails?.final_amount || ''), 
      currency: orderDetails?.currency_code || '' 
    });
    window.open(`https://wa.me/201001060503?text=${getWhatsAppMessage()}`, '_blank');
  };

  const paymentMethodsEG = [
    { id: 'instapay', ...t.checkout.methods.instapay },
    { id: 'wallet', ...t.checkout.methods.wallet },
    { id: 'bank', ...t.checkout.methods.bank }
  ];

  const paymentMethodsInternational = [
    { id: 'international_bank', ...t.checkout.methods.international_bank },
    { id: 'international_wallet', ...t.checkout.methods.international_wallet },
    { id: 'instapay', ...t.checkout.methods.instapay } // For expats with Egyptian bank accounts
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-cairo" dir={dir}>
      <SEO title="إتمام الدفع | كابتن كريم زكريا" noindex={true} />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/#packages')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-[15px]"
          >
            {lang === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 rotate-180" />}
            {t.checkout.backBtn}
          </button>
          
          <div className="flex items-center gap-2 md:gap-3 bg-brand-primary/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-brand-primary/10">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" />
            <span className="text-[13px] md:text-sm font-bold text-brand-primary">دفع آمن</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-[1000px] mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Form / Payment */}
            <div className="lg:col-span-7">
              {isLoading && !orderDetails && (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6 font-semibold">
                  {error}
                </div>
              )}

              {!isLoading && step === 'FORM' && (
                <form onSubmit={handleFormSubmit} className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-200/60">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.checkout.form.title}</h2>
                  <p className="text-slate-500 font-medium mb-8">يرجى تعبئة البيانات لإنشاء طلبك الخاص.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[15px] font-bold text-slate-700 mb-2">{t.checkout.form.name}</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.checkout.form.namePlaceholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[15px] font-bold text-slate-700 mb-2">{t.checkout.form.phone}</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.checkout.form.phonePlaceholder}
                        dir="ltr"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-bold text-slate-700 mb-2">{t.checkout.form.country}</label>
                      <select 
                        value={residenceCountry}
                        onChange={(e) => setResidenceCountry(e.target.value as CountryCode)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium appearance-none"
                      >
                        {Object.entries(t.countries)
                          .filter(([code]) => code === 'EG' ? countryKey === 'EG' : true)
                          .map(([code, cName]) => (
                          <option key={code} value={code}>{cName}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 font-bold text-[16px] flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{t.checkout.form.submitOrder}</span>}
                    </button>
                  </div>
                </form>
              )}

              {!isLoading && step === 'PAYMENT' && orderDetails && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-200/60"
                >
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-900">{t.checkout.paymentMethod}</h2>
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                      طلب رقم: {orderDetails.order_number}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {(orderDetails.residence_country === 'EG' ? paymentMethodsEG : paymentMethodsInternational).map((method) => (
                      <label 
                        key={method.id}
                        className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedMethod === method.id 
                            ? 'border-brand-primary bg-brand-primary/5' 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center h-5 mt-1">
                          <input 
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedMethod === method.id}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                          />
                        </div>
                        <div className="mr-3 ml-3">
                          <div className="font-bold text-slate-900">{method.title}</div>
                          <div className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={selectedMethod}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-slate-50 rounded-xl overflow-hidden"
                    >
                      <div className="p-6">
                        {selectedMethod === 'instapay' && (
                          <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="text-sm font-medium text-slate-500">عنوان الدفع (InstaPay Handle)</div>
                            <div className="text-xl md:text-2xl font-black text-slate-900 font-en bg-white px-6 py-3 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm w-full sm:w-auto">
                              {t.checkout.methods.instapay.handle}
                              <button onClick={() => handleCopy(t.checkout.methods.instapay.handle, 'instapay')} className="text-brand-primary hover:text-brand-primary-hover transition-colors p-2 bg-brand-primary/10 rounded-lg shrink-0">
                                {copied === 'instapay' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedMethod === 'wallet' && (
                          <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="text-sm font-medium text-slate-500">رقم المحفظة (فودافون/أورانج/اتصالات)</div>
                            <div className="text-2xl font-black text-slate-900 font-en tracking-widest bg-white px-8 py-3 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                              {t.checkout.methods.wallet.number}
                              <button onClick={() => handleCopy(t.checkout.methods.wallet.number, 'wallet')} className="text-brand-primary hover:text-brand-primary-hover transition-colors p-2 bg-brand-primary/10 rounded-lg shrink-0">
                                {copied === 'wallet' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedMethod === 'bank' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 font-bold mb-1">اسم البنك</div>
                                <div className="font-bold text-slate-900 text-lg">{t.checkout.methods.bank.bankName}</div>
                              </div>
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 font-bold mb-1">اسم المستفيد</div>
                                <div className="font-bold text-slate-900 font-en">{t.checkout.methods.bank.accountName}</div>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                              <div>
                                <div className="text-xs text-slate-500 font-bold mb-1">رقم الحساب</div>
                                <div className="font-bold text-slate-900 font-en tracking-widest text-lg">{t.checkout.methods.bank.accountNumber}</div>
                              </div>
                              <button onClick={() => handleCopy(t.checkout.methods.bank.accountNumber, 'bank')} className="text-brand-primary hover:bg-brand-primary/10 p-2.5 rounded-lg transition-colors">
                                {copied === 'bank' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedMethod === 'international_bank' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 font-bold mb-1">SWIFT / BIC</div>
                                <div className="font-bold text-slate-900 text-lg font-en">{t.checkout.methods.bank.swift}</div>
                              </div>
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                                <div className="text-xs text-slate-500 font-bold mb-1">اسم المستفيد</div>
                                <div className="font-bold text-slate-900 font-en">{t.checkout.methods.bank.accountName}</div>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                              <div>
                                <div className="text-xs text-slate-500 font-bold mb-1">IBAN</div>
                                <div className="font-bold text-slate-900 font-en tracking-wider text-sm sm:text-base">{t.checkout.methods.bank.iban}</div>
                              </div>
                              <button onClick={() => handleCopy(t.checkout.methods.bank.iban, 'iban')} className="text-brand-primary hover:bg-brand-primary/10 p-2.5 rounded-lg transition-colors">
                                {copied === 'iban' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              </button>
                            </div>
                            <div className="text-xs text-center text-slate-500 font-medium">يرجى تحويل المبلغ بعملة {orderDetails.currency_code}.</div>
                          </div>
                        )}
                        
                        {selectedMethod === 'international_wallet' && (
                          <div className="text-center p-4">
                            <p className="text-slate-700 font-semibold mb-4 leading-relaxed">يرجى الضغط على الزر بالأسفل للتواصل عبر واتساب وتزويدنا بدولتك لنرسل لك بيانات التحويل المناسبة (مثل زين كاش، أو محافظ أخرى).</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <button 
                    onClick={handleFinalSubmit}
                    className="w-full mt-8 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl py-4.5 font-bold text-[16px] flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(58,155,207,0.3)] hover:shadow-[0_12px_25px_rgba(58,155,207,0.4)] hover:-translate-y-0.5"
                  >
                    <span>{t.checkout.confirmBtn}</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-[24px] p-6 md:p-8 shadow-2xl sticky top-28 overflow-hidden relative">
                {/* Accent Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[80px] rounded-full pointer-events-none" />
                
                <h2 className="text-xl font-bold text-white mb-6 relative z-10">{t.checkout.orderSummary}</h2>
                
                {orderDetails ? (
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-slate-400 font-medium">{t.checkout.package}</span>
                      <span className={`font-black uppercase tracking-wider ${orderDetails.package_code === 'max' ? 'text-[#E5B951]' : 'text-[#38bdf8]'}`}>
                        {orderDetails.package_code}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-slate-400 font-medium">دولة الدفع</span>
                      <span className="text-white font-bold">{t.countries[orderDetails.residence_country]}</span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-slate-400 font-medium">{t.checkout.duration}</span>
                      <span className="text-white font-bold">{orderDetails.base_duration_months} شهور</span>
                    </div>

                    {orderDetails.free_months > 0 && (
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-slate-400 font-medium">شهور هدية</span>
                        <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md">
                          +{orderDetails.free_months} شهر
                        </span>
                      </div>
                    )}

                    <div className="pt-2">
                      <div className="flex justify-between items-end">
                        <span className="text-slate-300 font-bold text-lg">{t.checkout.total}</span>
                        <div className="flex items-center gap-1.5 flex-row-reverse font-en">
                          <span className="text-4xl font-black text-white">{orderDetails.final_amount}</span>
                          <span className="text-lg font-bold text-slate-300 mb-1">{orderDetails.currency_code}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <span className="text-slate-500 font-medium">قم بإدخال بياناتك لإنشاء الطلب وعرض الإجمالي.</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
