const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/Checkout.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// The regex might have failed due to specific whitespace or indentation.
// Let's find the exact blocks for card and applepay.

const startCard = content.indexOf("{selectedMethod === 'card' && (");
const endCard = content.indexOf("{selectedMethod === 'applepay' && (");
const endApple = content.indexOf("{selectedMethod === 'instapay' && (");

if (startCard !== -1 && endApple !== -1) {
  content = content.substring(0, startCard) + content.substring(endApple);
} else {
  console.log("Could not find blocks. Card:", startCard, "Apple:", endApple);
}

fs.writeFileSync(filePath, content);
console.log('Removed UI sections.');
