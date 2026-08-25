const fs = require('fs');

const tsPath = 'src/components/sections/CalorieCalculator.tsx';
let tsContent = fs.readFileSync(tsPath, 'utf8');

const formStart = '<form onSubmit={calculate}>';
const formEnd = '</form>';

const startIndex = tsContent.indexOf(formStart);
const endIndex = tsContent.indexOf(formEnd) + formEnd.length;

const newForm = `<form onSubmit={calculate} className="space-y-6 md:space-y-8">
            
            {/* Unit Toggle */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit mx-auto shadow-inner">
              <button type="button" onClick={() => { setUnitSystem('metric'); clearResults(); }} className={\`px-8 py-2 rounded-lg text-sm font-bold transition-all \${unitSystem === 'metric' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                Metric
              </button>
              <button type="button" onClick={() => { setUnitSystem('imperial'); clearResults(); }} className={\`px-8 py-2 rounded-lg text-sm font-bold transition-all \${unitSystem === 'imperial' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                Imperial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Gender */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.gender}</label>
                <div className="flex bg-slate-100 p-1.5 rounded-xl shadow-inner">
                  <button type="button" onClick={() => handleGenderChange('male')} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${gender === 'male' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                    {t.calculator.male}
                  </button>
                  <button type="button" onClick={() => handleGenderChange('female')} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${gender === 'female' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                    {t.calculator.female}
                  </button>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.age}</label>
                <input
                  type="number"
                  min="5"
                  max="119"
                  value={age}
                  onChange={(e) => { setAge(e.target.value); clearResults(); }}
                  className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                  placeholder="25"
                  dir="ltr"
                />
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">
                  {unitSystem === 'metric' ? t.calculator.weight : t.calculator.weightImperial}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); clearResults(); }}
                  className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                  placeholder={unitSystem === 'metric' ? "75" : "165"}
                  dir="ltr"
                />
              </div>

              {/* Height */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-brand-text px-1 block">
                  {unitSystem === 'metric' ? t.calculator.height : t.calculator.heightImperial}
                </label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => { setHeightCm(e.target.value); clearResults(); }}
                    className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                    placeholder="175"
                    dir="ltr"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => { setHeightFt(e.target.value); clearResults(); }}
                      className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                      placeholder="ft (5)"
                      dir="ltr"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => { setHeightIn(e.target.value); clearResults(); }}
                      className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                      placeholder="in (9)"
                      dir="ltr"
                    />
                  </div>
                )}
              </div>
              
              {/* Activity Level - only for adults */}
              {(!age || parseInt(age) >= 18) && (
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.activity}</label>
                  <CustomSelect
                    value={activity === '' ? 0 : activity as number}
                    onChange={(val) => { setActivity(val === 0 ? '' : val); clearResults(); }}
                    options={[
                      { value: 0, label: t.calculator.selectActivity || 'اختر مستوى نشاطك' },
                      { value: 1.2, label: t.calculator.activities?.sedentary || 'قليل جداً' },
                      { value: 1.375, label: t.calculator.activities?.light || 'خفيف' },
                      { value: 1.55, label: t.calculator.activities?.moderate || 'متوسط' },
                      { value: 1.725, label: t.calculator.activities?.active || 'مرتفع' },
                      { value: 1.9, label: t.calculator.activities?.veryActive || 'مرتفع جداً' }
                    ]}
                  />
                </div>
              )}
              
              {/* Resistance Training - only for adults */}
              {(!age || parseInt(age) >= 18) && (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-text px-1 block">{t.calculator.resistanceTraining || 'هل تمارس تمارين مقاومة بانتظام؟'}</label>
                  <div className="flex bg-slate-100 p-1.5 rounded-xl shadow-inner">
                    <button type="button" onClick={() => { setResistanceTraining('yes'); clearResults(); }} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${resistanceTraining === 'yes' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                      {t.calculator.yes || 'نعم'}
                    </button>
                    <button type="button" onClick={() => { setResistanceTraining('no'); clearResults(); }} className={\`flex-1 py-3 rounded-lg text-sm font-bold transition-all \${resistanceTraining === 'no' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}\`}>
                      {t.calculator.no || 'لا'}
                    </button>
                  </div>
                </div>
              )}

              {/* Body Fat (Optional) */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm font-bold text-brand-text px-1">
                  <span>{t.calculator.bodyFat}</span>
                  <span className="text-slate-500 font-normal text-xs">{t.calculator.bodyFatOptional}</span>
                </label>
                <input
                  type="number"
                  min="3"
                  max="60"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => { setBodyFat(e.target.value); clearResults(); }}
                  className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"
                  placeholder="15"
                  dir="ltr"
                />
                <p className="text-[11px] text-slate-500 mt-1 px-1">{t.calculator.bodyFatNote}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-500 text-sm font-medium mt-6 text-center bg-red-50/50 p-4 rounded-xl border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="flex justify-center mt-12 mb-6">
              <Button type="submit" size="lg" className="w-full sm:w-auto min-w-[280px] shadow-lg shadow-brand-primary/20 text-lg py-4">
                {t.calculator.calculate}
              </Button>
            </div>
          </form>`;

tsContent = tsContent.substring(0, startIndex) + newForm + tsContent.substring(endIndex);
fs.writeFileSync(tsPath, tsContent);
console.log('Form updated.');
