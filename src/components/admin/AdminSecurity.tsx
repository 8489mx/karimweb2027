import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Save, Loader2, Key, Clock } from 'lucide-react';

export function AdminSecurity() {
  const { settings, logout } = useSettings();
  const [username, setUsername] = useState('admin');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (newPassword.length < 6) {
      setMsg('كلمة المرور يجب أن تكون 6 أحرف على الأقل.');
      return;
    }
    setLoading(true);
    setMsg('');
    try {
      
      const res = await fetch('/api/change_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({ username, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMsg('تم تغيير البيانات بنجاح! جاري تسجيل الخروج...');
        setTimeout(() => {
          logout();
        }, 1500);
      } else {
        setMsg(data.error || 'حدث خطأ.');
      }
    } catch(e) {
      setMsg('حدث خطأ في الاتصال.');
    } finally {
      setLoading(false);
    }
  };

  const lastLoginFormatted = settings.lastLogin ? new Date(settings.lastLogin).toLocaleString('ar-EG') : 'غير متوفر';

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Key className="w-5 h-5 text-brand-primary" /> تغيير بيانات الدخول</h2>
        
        {msg && (
          <div className={`mb-6 p-4 border rounded-xl text-sm ${msg.includes('بنجاح') ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            {msg}
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">اسم المستخدم الجديد</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary text-left"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">كلمة المرور الجديدة</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-4 focus:ring-brand-primary/10 transition-all text-slate-900 focus:outline-none focus:border-brand-primary text-left"
              dir="ltr"
            />
          </div>
          <div className="pt-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              حفظ وتغيير البيانات
            </button>
            <p className="text-xs text-slate-500 text-center mt-3">سيتم تسجيل الخروج تلقائياً بعد تغيير كلمة المرور لتأكيد الدخول بالبيانات الجديدة.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-brand-primary" /> سجل الدخول</h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <p className="text-sm text-slate-600">آخر تسجيل دخول ناجح:</p>
          <p className="text-lg font-mono mt-1 text-emerald-400" dir="ltr">{lastLoginFormatted}</p>
        </div>
      </div>
    </div>
  );
}
