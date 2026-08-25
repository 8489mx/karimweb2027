const fs = require('fs');

let content = fs.readFileSync('src/components/sections/Packages.tsx', 'utf8');

// Add helper function after highlightBonusText
content = content.replace(
  /const highlightBonusText = \(text: string, pkgKey: string, isDropdownSelected: boolean = false\) => \{/,
  `const getDurationLabel = (opt: number) => {
    const key = opt + 'm';
    if (settings?.packagesData?.durations?.[key as '3m' | '6m']) {
      return settings.packagesData.durations[key as '3m' | '6m'];
    }
    return t.packages.durationOptions[opt as keyof typeof t.packages.durationOptions];
  };

const highlightBonusText = (text: string, pkgKey: string, isDropdownSelected: boolean = false) => {`
);

// Replace t.packages.durationOptions[...] with getDurationLabel(...)
content = content.replace(
  /t\.packages\.durationOptions\[currentDurationNum as keyof typeof t\.packages\.durationOptions\]/g,
  `getDurationLabel(currentDurationNum)`
);

content = content.replace(
  /t\.packages\.durationOptions\[opt as keyof typeof t\.packages\.durationOptions\]/g,
  `getDurationLabel(opt)`
);

fs.writeFileSync('src/components/sections/Packages.tsx', content);

