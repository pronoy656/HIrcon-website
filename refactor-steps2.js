const fs = require('fs');

const file = 'src/components/features/shipment/BaseShipmentForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '{/* Box / Unit Details Section (for non-pallet shipments) */}';
const endMarker = '<div className="flex items-center gap-2 mt-4 mb-4">';

let s1Idx = content.indexOf(startMarker);
let endIdx = content.indexOf(endMarker, s1Idx);

if (s1Idx === -1) {
  s1Idx = content.indexOf('{/* Box / Unit Details Section */}');
  endIdx = content.indexOf(endMarker, s1Idx);
}

console.log('s1Idx', s1Idx, 'endIdx', endIdx);

if (s1Idx !== -1 && endIdx !== -1) {
  const before = content.substring(0, s1Idx);
  const after = content.substring(endIdx);

  const replacement = `
          {/* Box Details Section */}
          <BoxDetails
            packageType={packageType}
            setPackageType={setPackageType}
            isDocument={isDocument}
            setIsDocument={setIsDocument}
            isCommodity={isCommodity}
            setIsCommodity={setIsCommodity}
            numBoxes={numBoxes}
            setNumBoxes={setNumBoxes}
            showBoxesSize={showBoxesSize}
            setShowBoxesSize={setShowBoxesSize}
            currency={currency}
            setCurrency={setCurrency}
            currencyOptions={currencyOptions}
            boxesData={boxesData}
            handleBoxChange={handleBoxChange}
            handleCopyAllBoxes={handleCopyAllBoxes}
            handleCopyNextBox={handleCopyNextBox}
          />
          
          `;
  
  content = before + replacement.trimStart() + after;
  
  // Add imports
  if (!content.includes('import { BoxDetails }')) {
    content = content.replace('import { ReceiverDetails } from "./components/ReceiverDetails";',
    'import { ReceiverDetails } from "./components/ReceiverDetails";\nimport { BoxDetails } from "./components/BoxDetails";');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully replaced Box Details!");
} else {
  console.log("Failed to find markers.");
}
