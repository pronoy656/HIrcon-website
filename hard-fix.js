const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { from: '@/components/navbar', to: '@/components/layout/Navbar' },
  { from: '@/components/NavbarWrapper', to: '@/components/layout/NavbarWrapper' },
  { from: '@/components/dashboard/Topbar', to: '@/components/layout/Topbar' },
  
  { from: '@/components/Auth-section/AuthLayout', to: '@/components/auth/AuthLayout' },
  { from: '@/components/Auth-section/login/LoginForm', to: '@/components/auth/login/LoginForm' },
  { from: '@/components/Auth-section/register/RegisterForm', to: '@/components/auth/register/RegisterForm' },

  { from: '@/components/common/InputField', to: '@/components/ui/InputField' },
  { from: '@/components/common/SelectField', to: '@/components/ui/SelectField' },
  { from: '@/components/common/TextAreaField', to: '@/components/ui/TextAreaField' },
  { from: '@/components/common/Table', to: '@/components/ui/Table' },
  { from: '@/components/common/Pagination', to: '@/components/ui/Pagination' },
  { from: '@/components/common/Modal', to: '@/components/ui/Modal' },
  { from: '@/components/common/DeleteModal', to: '@/components/ui/DeleteModal' },
  { from: '@/components/common/ConfirmationModal', to: '@/components/ui/ConfirmationModal' },
  { from: '@/components/common/SuccessModal', to: '@/components/ui/SuccessModal' },
  { from: '@/components/common/Tabs', to: '@/components/ui/Tabs' },

  { from: '@/components/common/AddressBookModal', to: '@/components/features/shipment/AddressBookModal' },
  { from: '@/components/common/PostCodeModal', to: '@/components/features/shipment/PostCodeModal' },
  { from: '@/components/common/ScheduleCollectionModal', to: '@/components/features/shipment/ScheduleCollectionModal' },
  { from: '@/components/common/ShipmentSuccessModal', to: '@/components/features/shipment/ShipmentSuccessModal' },
  { from: '@/components/common/BaseShipmentForm', to: '@/components/features/shipment/BaseShipmentForm' },

  { from: '@/components/dashboard/ship/export-domestic', to: '@/components/features/shipment/export-domestic' },
  { from: '@/components/dashboard/ship/import', to: '@/components/features/shipment/import' },
  { from: '@/components/dashboard/ship/pallet', to: '@/components/features/shipment/pallet' },
  { from: '@/components/dashboard/ship/quick-ship', to: '@/components/features/shipment/quick-ship' },
  { from: '@/components/dashboard/ship/spot-rate', to: '@/components/features/shipment/spot-rate' },
  { from: '@/components/dashboard/ship/ship-manager', to: '@/components/features/shipment/ship-manager' },
  
  { from: '@/components/manage/contact', to: '@/components/features/manage/contact' },
  { from: '@/components/manage/csv-mapping', to: '@/components/features/manage/csv-mapping' },
  { from: '@/components/preference-tabs', to: '@/components/features/manage/preference-tabs' },

  { from: '@/components/dashboard/track/tracking-history', to: '@/components/features/tracking/tracking-history' },
  { from: '@/components/dashboard/track/watch-shipment', to: '@/components/features/tracking/watch-shipment' },

  { from: '@/components/dashboard/quote/quick-quote', to: '@/components/features/quote/quick-quote' },
  { from: '@/components/dashboard/products', to: '@/components/features/products' },
  { from: '@/components/dashboard/overview', to: '@/components/features/overview' },
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git')) {
        walk(full);
      }
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      let content = fs.readFileSync(full, 'utf8');
      let newContent = content;
      
      for (const rep of replacements) {
        // Global replace
        newContent = newContent.split(rep.from).join(rep.to);
      }

      if (content !== newContent) {
        fs.writeFileSync(full, newContent, 'utf8');
        console.log(`Fixed: ${full}`);
      }
    }
  }
}

console.log('--- Hard Fixing Imports ---');
walk(srcDir);
console.log('Done!');
