const fs = require('fs');

const file = 'src/components/features/shipment/BaseShipmentForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const s1StartMarker = '<div className="grid grid-cols-1 md:grid-cols-2 gap-8">';
const s1EndMarker = '{/* Right Side: Quote & Price Details */}';

const s1Idx = content.indexOf(s1StartMarker);
const s1EndIdx = content.indexOf(s1EndMarker);

console.log('s1Idx', s1Idx, 's1EndIdx', s1EndIdx);

if (s1Idx !== -1 && s1EndIdx !== -1) {
  const beforeS1 = content.substring(0, s1Idx);
  const afterS1End = content.substring(s1EndIdx);

  const replacement = `
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Step 1: Collection Address */}
                    <SenderDetails 
                      collectionAddress={collectionAddress}
                      setCollectionAddress={setCollectionAddress}
                      setIsAddressBookOpen={setIsAddressBookOpen}
                      setPostCodeModalTarget={setPostCodeModalTarget}
                      setIsPostCodeModalOpen={setIsPostCodeModalOpen}
                      countryOptions={countryOptions}
                    />

                    {/* Step 2: Delivery Address */}
                    <ReceiverDetails 
                      deliveryAddress={deliveryAddress}
                      setDeliveryAddress={setDeliveryAddress}
                      setIsAddressBookOpen={setIsAddressBookOpen}
                      setPostCodeModalTarget={setPostCodeModalTarget}
                      setIsPostCodeModalOpen={setIsPostCodeModalOpen}
                      countryOptions={countryOptions}
                    />
                  </div>

                  `;
  
  content = beforeS1 + replacement.trimStart() + afterS1End;
  
  // Add imports
  if (!content.includes('import { SenderDetails }')) {
    content = content.replace('import { ShipmentSuccessModal } from "@/components/features/shipment/ShipmentSuccessModal";',
    'import { ShipmentSuccessModal } from "@/components/features/shipment/ShipmentSuccessModal";\nimport { SenderDetails } from "./components/SenderDetails";\nimport { ReceiverDetails } from "./components/ReceiverDetails";');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully replaced Step 1 and Step 2!");
}
