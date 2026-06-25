const fs = require('fs');

const file = 'src/components/features/shipment/BaseShipmentForm.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '{/* Step 3: Package & Shipment Details */}';
const endMarker = '{/* Box / Unit Details Section (for non-pallet shipments) */}';

const s1Idx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (s1Idx !== -1 && endIdx !== -1) {
  const before = content.substring(0, s1Idx);
  const after = content.substring(endIdx);

  const replacement = `
              {/* Step 3: Package & Shipment Details */}
              <ShipmentDetails
                hasEnhancedCover={hasEnhancedCover}
                setHasEnhancedCover={setHasEnhancedCover}
                serviceCompany={serviceCompany}
                setServiceCompany={setServiceCompany}
                serviceType={serviceType}
                setServiceType={setServiceType}
                serviceTypeOptions={serviceTypeOptions}
                selectedService={selectedService}
              />
            </>
          ) : null}

          `;
  
  // Notice I added `</> ) : null}` before the endMarker which is outside the block.
  // Wait, let's look at the original code...
  // The original code was:
  /*
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              ...
            </div>
          </div>
          </>
          ) : null}

          {/* Box / Unit Details Section (for non-pallet shipments) * /}
  */
  // So the `</> ) : null}` was inside the replaced string. We must put it back.

  content = before + replacement.trimStart() + after;
  
  // Remove unused state and refs
  content = content.replace('const [isServiceTypeOpen, setIsServiceTypeOpen] = useState(false);\n', '');
  
  const refCode = `  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceTypeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);`;
  
  content = content.replace(refCode, '');

  // Add imports
  if (!content.includes('import { ShipmentDetails }')) {
    content = content.replace('import { CommodityDetails } from "./components/CommodityDetails";',
    'import { CommodityDetails } from "./components/CommodityDetails";\nimport { ShipmentDetails } from "./components/ShipmentDetails";');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully replaced Shipment Details!");
} else {
  console.log("Failed to find markers.", s1Idx, endIdx);
}
