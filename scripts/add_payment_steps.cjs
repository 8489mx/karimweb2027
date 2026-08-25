const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf-8');

const stepsSection = `            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 p-6 mt-6">
              <h3 className="text-lg font-black text-slate-900 mb-6">خطوات الدفع والتفعيل</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black shrink-0 text-sm">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">تحويل المبلغ</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">قم بتحويل إجمالي المبلغ الموضح إلى وسيلة الدفع التي اخترتها.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black shrink-0 text-sm">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">إرفاق الإيصال</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">التقط صورة لإيصال التحويل (سكرين شوت) وقم برفعها في المكان المخصص.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black shrink-0 text-sm">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">تأكيد وتفعيل</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">بعد إتمام الطلب، سنقوم بمراجعة الدفع وتفعيل حسابك والتواصل معك فوراً.</p>
                  </div>
                </div>
              </div>
            </div>`;

content = content.replace(/<\/div>\n\n          <\/div>\n        <\/form>/, `</div>\n${stepsSection}\n          </div>\n        </form>`);

fs.writeFileSync(checkoutPath, content);
console.log('Added payment steps section.');
