const fs = require('fs');

const calcPath = 'src/components/sections/CalorieCalculator.tsx';
let calcContent = fs.readFileSync(calcPath, 'utf8');

const unselectedClass = "bg-white/60 border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] backdrop-blur-md text-brand-muted hover:bg-white/80 hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)]";
const selectedClass = "bg-brand-primary text-white border border-brand-primary shadow-[0_8px_20px_-4px_rgba(88,180,229,0.5)]";

// 1. Unit Toggle
calcContent = calcContent.replace(
  /<div className="flex bg-slate-100 p-1\.5 rounded-xl w-fit mx-auto shadow-inner">[\s\S]*?<\/div>/,
  `<div className="flex gap-3 w-fit mx-auto">
              <button type="button" onClick={() => { setUnitSystem('metric'); clearResults(); }} className={\`px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${unitSystem === 'metric' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                Metric
              </button>
              <button type="button" onClick={() => { setUnitSystem('imperial'); clearResults(); }} className={\`px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${unitSystem === 'imperial' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                Imperial
              </button>
            </div>`
);

// 2. Gender Toggle
calcContent = calcContent.replace(
  /<div className="flex bg-slate-100 p-1\.5 rounded-xl shadow-inner">\s*<button type="button" onClick={\(\) => handleGenderChange\('male'\)}[\s\S]*?<\/button>\s*<\/div>/,
  `<div className="flex gap-3">
                  <button type="button" onClick={() => handleGenderChange('male')} className={\`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${gender === 'male' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                    {t.calculator.male}
                  </button>
                  <button type="button" onClick={() => handleGenderChange('female')} className={\`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${gender === 'female' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                    {t.calculator.female}
                  </button>
                </div>`
);

// 3. Resistance Training
calcContent = calcContent.replace(
  /<div className="flex bg-slate-100 p-1\.5 rounded-xl shadow-inner">\s*<button type="button" onClick={\(\) => { setResistanceTraining\('yes'\); clearResults\(\); }}[\s\S]*?<\/button>\s*<\/div>/,
  `<div className="flex gap-3">
                    <button type="button" onClick={() => { setResistanceTraining('yes'); clearResults(); }} className={\`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${resistanceTraining === 'yes' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                      {t.calculator.yes || 'نعم'}
                    </button>
                    <button type="button" onClick={() => { setResistanceTraining('no'); clearResults(); }} className={\`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${resistanceTraining === 'no' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                      {t.calculator.no || 'لا'}
                    </button>
                  </div>`
);

// 4. Goal Selection
calcContent = calcContent.replace(
  /<div className="flex bg-white\/50 backdrop-blur-md p-1\.5 rounded-xl mb-10 w-full sm:w-fit mx-auto border border-white\/60 shadow-sm overflow-x-auto hide-scrollbar" dir="ltr">[\s\S]*?<\/div>/,
  `<div className="flex flex-wrap justify-center gap-3 mb-10 w-full" dir="ltr">
              <button onClick={() => setGoal('maintain')} className={\`flex-1 sm:flex-none min-w-[120px] px-4 sm:px-6 md:px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${goal === 'maintain' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                {t.calculator.maintain || 'المحافظة على الوزن'}
              </button>
              <button onClick={() => setGoal('cut')} className={\`flex-1 sm:flex-none min-w-[120px] px-4 sm:px-6 md:px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${goal === 'cut' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                {t.calculator.lose || 'خسارة الدهون'}
              </button>
              <button onClick={() => setGoal('bulk')} className={\`flex-1 sm:flex-none min-w-[120px] px-4 sm:px-6 md:px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 \${goal === 'bulk' ? '${selectedClass}' : '${unselectedClass}'}\`}>
                {t.calculator.gain || 'بناء العضلات'}
              </button>
            </div>`
);

// 5. Inputs
const oldInputClass = 'className="w-full bg-white border border-brand-border shadow-sm rounded-xl px-4 py-3.5 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-en text-center text-lg"';
const newInputClass = 'className="w-full bg-white/60 border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] backdrop-blur-md rounded-2xl px-4 py-3.5 text-brand-text focus:outline-none focus:bg-white focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all font-en text-center text-lg"';

calcContent = calcContent.split(oldInputClass).join(newInputClass);

fs.writeFileSync(calcPath, calcContent);
console.log('Updated CalorieCalculator.tsx buttons');
