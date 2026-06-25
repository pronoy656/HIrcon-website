const fs = require('fs');

const file = 'src/components/features/shipment/BaseShipmentForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '{/* Commercial Invoice Details */}';
const endMarker = '{/* Additional Comments */}';

const s1Idx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

console.log('s1Idx', s1Idx, 'endIdx', endIdx);

if (s1Idx !== -1 && endIdx !== -1) {
  const before = content.substring(0, s1Idx);
  const after = content.substring(endIdx);

  const replacement = `
          {/* Commercial Invoice Details */}
          <CommodityDetails
            invoiceItems={invoiceItems}
            setInvoiceItems={setInvoiceItems}
            countryOptions={countryOptions}
            isCustomValueEditable={isCustomValueEditable}
            setIsCustomValueEditable={setIsCustomValueEditable}
          />

          `;
  
  content = before + replacement.trimStart() + after;
  
  // Add imports
  if (!content.includes('import { CommodityDetails }')) {
    content = content.replace('import { BoxDetails } from "./components/BoxDetails";',
    'import { BoxDetails } from "./components/BoxDetails";\nimport { CommodityDetails } from "./components/CommodityDetails";');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully replaced Commodity Details!");
} else {
  console.log("Failed to find markers.");
}
