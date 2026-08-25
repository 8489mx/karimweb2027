import React, { useState, useMemo } from 'react';
import { Search, MessageCircle, Plus, FileText, CheckCircle, Clock, XCircle, FileEdit, Save, ChevronDown, Download, Copy, Check } from 'lucide-react';
import { SiteSettings, useSettings } from '../../context/SettingsContext';

export function AdminOrders({ settings, updateSettings }: { settings: SiteSettings, updateSettings: any }) {
  const { refetchSettings } = useSettings();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhoneId(id);
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };
  const [newOrder, setNewOrder] = useState({
    customer_name: '',
    phone: '',
    package_name: '',
    amount: '',
    currency: 'EGP',
    status: 'completed',
    notes: '',
    promo_code: ''
  });

  const handleAddOrder = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      
      const response = await fetch('/api/orders.php?action=admin_create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          ...newOrder,
          amount: parseFloat(newOrder.amount) || 0
        })
      });
      
      if (response.ok) {
        await refetchSettings();
        setIsAddModalOpen(false);
        setNewOrder({
          customer_name: '', phone: '', package_name: '', amount: '', currency: 'EGP', status: 'completed', notes: '', promo_code: ''
        });
        showToast('تمت إضافة الطلب بنجاح');
      } else {
        showToast('حدث خطأ أثناء إضافة الطلب');
      }
    } catch (err) {
      showToast('حدث خطأ في الاتصال');
    }
    setIsAdding(false);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  
  const [dbOrders, setDbOrders] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    fetch('/api/orders.php', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
    .then(r => r.headers.get("content-type")?.includes("application/json") ? r.json() : [])
    .then(d => {
       if (Array.isArray(d)) setDbOrders(d);
    })
    .catch(e => {
       console.log("Mock orders fetched", e);
       setDbOrders([]);
    });
  }, []);


  const orders = useMemo(() => {
    let arr = [...dbOrders];
    arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return arr;
  }, [dbOrders]);


  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        return o.customer_name.toLowerCase().includes(lower) || 
               o.phone.includes(lower) || 
               o.id.toLowerCase().includes(lower);
      }
      return true;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, curr) => {
      if (curr.status === 'completed') {
        const currency = curr.currency || 'USD';
        acc[currency] = (acc[currency] || 0) + (curr.amount || 0);
      }
      return acc;
    }, {} as Record<string, number>);
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const updateOrderStatus = async (id: string, newStatus: 'pending' | 'completed' | 'cancelled') => {
    try {
      
      const response = await fetch('/api/orders.php?action=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (response.ok) {
        const updatedOrders = dbOrders.map(o => o.id === id ? { ...o, status: newStatus } : o);
        setDbOrders(updatedOrders); // Pass true or just update local state if possible
        showToast('تم تحديث حالة الطلب بنجاح');
      } else {
        showToast('حدث خطأ أثناء تحديث حالة الطلب');
      }
    } catch (e) {
      showToast('حدث خطأ في الاتصال');
    }
  };

  const saveNote = async (id: string) => {
    try {
      
      const response = await fetch('/api/orders.php?action=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ id, notes: tempNote })
      });
      if (response.ok) {
        const updatedOrders = dbOrders.map(o => o.id === id ? { ...o, notes: tempNote } : o);
        setDbOrders(updatedOrders);
        setEditingNoteId(null);
        showToast('تم حفظ الملاحظة بنجاح');
      } else {
        showToast('حدث خطأ أثناء حفظ الملاحظة');
      }
    } catch (e) {
      showToast('حدث خطأ في الاتصال');
    }
  };

  const startEditingNote = (id: string, currentNote: string = '') => {
    setTempNote(currentNote);
    setEditingNoteId(id);
  };

  const openWhatsApp = (phone: string) => {
    let cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle className="w-3 h-3" /> مكتمل</span>;
      case 'cancelled': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200"><XCircle className="w-3 h-3" /> ملغي</span>;
      default: return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><Clock className="w-3 h-3" /> قيد الانتظار</span>;
    }
  };

  
  const exportToCSV = () => {
    if (orders.length === 0) return;
    const headers = ['رقم الطلب', 'التاريخ', 'اسم العميل', 'رقم الهاتف', 'الباقة', 'المدة', 'السعر', 'العملة', 'الحالة', 'الملاحظات'];
    const csvRows = [headers.join(',')];
    
    orders.forEach(o => {
      const row = [
        o.id,
        new Date(o.date).toLocaleDateString('en-GB'),
        '"' + (o.customer_name || '') + '"',
        o.phone,
        '"' + (o.package_name || '') + '"',
        o.duration,
        o.amount,
        o.currency,
        o.status,
        '"' + (o.notes || '').replace(/"/g, '""') + '"'
      ];
      csvRows.push(row.join(','));
    });
    
    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `orders_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 backdrop-blur-md flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">إدارة الطلبات</h2>
        <button onClick={exportToCSV} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 px-5 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5">
          <Download className="w-4 h-4" /> تصدير CSV
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-slate-500 text-sm">إجمالي الطلبات</p>
          <p className="text-2xl font-bold mt-1">{orders.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-slate-500 text-sm">الطلبات المكتملة</p>
          <p className="text-2xl font-bold mt-1 text-emerald-400">{orders.filter(o => o.status === 'completed').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-2">
          <p className="text-slate-500 text-sm">إجمالي الإيرادات (للمكتملة)</p>
          <div className="flex flex-wrap gap-3 mt-1">
            {Object.keys(totalRevenue).length === 0 ? <p className="text-xl font-bold">0</p> : 
              Object.entries(totalRevenue).map(([curr, amt]) => (
                <span key={curr} className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg font-bold">
                  {Number(amt)} {curr}
                </span>
              ))
            }
          </div>
        </div>
      </div>

      {/* Filters */}
      
      <div className="flex flex-col sm:flex-row gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-[0_4px_12px_rgb(0,0,0,0.1)] hover:shadow-[0_4px_16px_rgb(0,0,0,0.15)] shrink-0"
        >
          <Plus className="w-5 h-5" />
          إضافة طلب
        </button>
        <div className="relative flex-1">
  
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="بحث بالاسم، الهاتف، أو رقم الطلب..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all"
        >
          <option value="all">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="bg-slate-50/50 border border-slate-200 rounded-xl overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-10 text-slate-500">لا توجد طلبات مطابقة للبحث.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50/80">
                <tr className="text-slate-500 text-sm">
                  <th className="px-4 py-3 font-medium">الطلب / التاريخ</th>
                  <th className="px-4 py-3 font-medium">العميل</th>
                  <th className="px-4 py-3 font-medium">الباقة</th>
                  <th className="px-4 py-3 font-medium">كود الخصم</th>
                  <th className="px-4 py-3 font-medium">المبلغ</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                  <th className="px-4 py-3 font-medium">ملاحظات</th>
                  <th className="px-4 py-3 font-medium text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-100 transition-colors text-sm">
                    <td className="px-4 py-3">
                      <div className="font-mono text-slate-600">{order.id}</div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(order.date).toLocaleString('ar-EG')}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{order.customer_name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 font-mono" dir="ltr">{order.phone}</span>
                        <button 
                          onClick={() => handleCopyPhone(order.phone, order.id)} 
                          className="text-slate-400 hover:text-brand-primary transition-colors"
                          title="نسخ رقم الهاتف"
                        >
                          {copiedPhoneId === order.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => openWhatsApp(order.phone)} className="text-[#25D366] hover:scale-110 transition-transform" title="مراسلة عبر واتساب">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-brand-primary font-medium">{order.package_name}</div>
                      <div className="text-xs text-slate-500 mt-1">{order.duration}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {order.amount} <span className="text-xs text-slate-500">{order.currency}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative group inline-block">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="completed">مكتمل</option>
                          <option value="cancelled">ملغي</option>
                        </select>
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="px-4 py-3 min-w-[200px]">
                      {editingNoteId === order.id ? (
                        <div className="flex items-start gap-2">
                          <textarea 
                            value={tempNote}
                            onChange={(e) => setTempNote(e.target.value)}
                            className="w-full bg-white border border-brand-primary/50 rounded p-2 text-xs focus:outline-none resize-none h-16"
                            placeholder="اكتب ملاحظة..."
                          />
                          <div className="flex flex-col gap-1">
                            <button onClick={() => saveNote(order.id)} className="p-1.5 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200" title="حفظ"><Save className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setEditingNoteId(null)} className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200" title="إلغاء"><XCircle className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-2 group">
                          <p className="text-xs text-slate-500 whitespace-pre-wrap flex-1">{order.notes || <span className="opacity-50 italic">لا توجد ملاحظات</span>}</p>
                          <button onClick={() => startEditingNote(order.id, order.notes)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-brand-primary transition-all">
                            <FileEdit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                       {/* Additional actions if needed */}
                       <button onClick={() => openWhatsApp(order.phone)} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded hover:bg-[#25D366]/20 transition-colors text-xs font-medium">
                         <MessageCircle className="w-3.5 h-3.5" />
                         واتساب
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isAdding && setIsAddModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-[0_20px_60px_rgb(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800">إضافة طلب يدوي</h3>
              <button onClick={() => !isAdding && setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="add-order-form" onSubmit={handleAddOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">اسم العميل</label>
                  <input required type="text" value={newOrder.customer_name} onChange={e => setNewOrder({...newOrder, customer_name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">رقم الواتساب</label>
                  <input required type="text" value={newOrder.phone} onChange={e => setNewOrder({...newOrder, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">الخدمة / الباقة</label>
                  <input required type="text" value={newOrder.package_name} onChange={e => setNewOrder({...newOrder, package_name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">المبلغ</label>
                    <input required type="number" step="any" value={newOrder.amount} onChange={e => setNewOrder({...newOrder, amount: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all" dir="ltr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">العملة</label>
                    <select value={newOrder.currency} onChange={e => setNewOrder({...newOrder, currency: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all">
                      <option value="EGP">EGP</option>
                      <option value="USD">USD</option>
                      <option value="SAR">SAR</option>
                      <option value="AED">AED</option>
                      <option value="KWD">KWD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">كود الخصم المستخدم (اختياري)</label>
                  <input type="text" value={newOrder.promo_code} onChange={e => setNewOrder({...newOrder, promo_code: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-en uppercase" placeholder="مثال: KARIM50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">الحالة</label>
                  <select value={newOrder.status} onChange={e => setNewOrder({...newOrder, status: e.target.value as any})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all">
                    <option value="completed">مكتمل (يُحسب في الإيرادات)</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">ملاحظات (اختياري)</label>
                  <textarea value={newOrder.notes} onChange={e => setNewOrder({...newOrder, notes: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all min-h-[80px] resize-y" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => !isAdding && setIsAddModalOpen(false)}
                className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                إلغاء
              </button>
              <button 
                form="add-order-form"
                type="submit"
                disabled={isAdding}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium flex items-center gap-2 disabled:opacity-70"
              >
                {isAdding ? <span className="animate-pulse">جاري الحفظ...</span> : 'إضافة الطلب'}
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
  );
}