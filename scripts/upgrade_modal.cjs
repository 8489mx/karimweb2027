const fs = require('fs');

let path = 'src/components/ui/ContactModal.tsx';
let content = fs.readFileSync(path, 'utf8');

const newForm = `                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[14px] font-bold text-slate-700 mb-2 font-sans">الاسم</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
                        placeholder="الاسم بالكامل"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[14px] font-bold text-slate-700 mb-2 font-sans">البريد الإلكتروني</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-left placeholder:text-right"
                          placeholder="example@mail.com"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] font-bold text-slate-700 mb-2 font-sans">رقم الهاتف (اختياري)</label>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium text-left placeholder:text-right"
                          placeholder="+20 100 000 0000"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[14px] font-bold text-slate-700 mb-2 font-sans">الرسالة</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-50/50 border border-slate-200/60 rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium resize-none leading-relaxed"
                        placeholder="كيف يمكننا مساعدتك؟"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-slate-900 text-white rounded-xl py-4 px-4 font-bold text-[15px] font-sans hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98] flex items-center justify-center mt-2 disabled:opacity-70 group"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <span>إرسال الرسالة</span>
                      )}
                    </button>
                  </form>`;

content = content.replace(/<form onSubmit=\{handleSubmit\} className="space-y-5">[\s\S]*?<\/form>/, newForm);

// add phone to state
content = content.replace("email: '', message: '' }", "email: '', phone: '', message: '' }");

// send phone in fetch
content = content.replace(
  "email: formData.email,",
  "email: formData.email,\n          phone: formData.phone,"
);

// update modal container styling slightly for premium feel
content = content.replace(
  'className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto"',
  'className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 w-full max-w-lg overflow-hidden pointer-events-auto"'
);

content = content.replace(
  'className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"',
  'className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[100]"'
);

fs.writeFileSync(path, content);
