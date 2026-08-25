const fs = require('fs');
let path = 'src/components/layout/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('ContactModal')) {
  content = content.replace(
    "import React from 'react';",
    "import React, { useState } from 'react';\nimport { ContactModal } from '../ui/ContactModal';"
  );
}

if (!content.includes('isContactModalOpen')) {
  content = content.replace(
    '  const { t, lang: dir } = useLanguage();',
    '  const { t, lang: dir } = useLanguage();\n  const [isContactModalOpen, setIsContactModalOpen] = useState(false);'
  );
}

content = content.replace(
  '<a href="mailto:info@karimzakaria.com" dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-3">',
  '<button onClick={() => setIsContactModalOpen(true)} dir="ltr" className="group flex items-center justify-center gap-3 w-full lg:w-auto mb-3">'
);

content = content.replace(
  'info@karimzakaria.com\n              </span>\n            </a>',
  'info@karimzakaria.com\n              </span>\n            </button>'
);

if (!content.includes('<ContactModal')) {
  content = content.replace(
    '    </footer>',
    '      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />\n    </footer>'
  );
}

fs.writeFileSync(path, content);
