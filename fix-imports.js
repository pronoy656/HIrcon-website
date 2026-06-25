const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const moves = [
  // Layout
  { from: 'navbar', to: 'layout/Navbar' },
  { from: 'NavbarWrapper', to: 'layout/NavbarWrapper' },
  { from: 'dashboard/Topbar', to: 'layout/Topbar' },

  // Auth
  { from: 'Auth-section/AuthLayout', to: 'auth/AuthLayout' },
  { from: 'Auth-section/login/LoginForm', to: 'auth/login/LoginForm' },
  { from: 'Auth-section/register/RegisterForm', to: 'auth/register/RegisterForm' },

  // UI (from common)
  { from: 'common/InputField', to: 'ui/InputField' },
  { from: 'common/SelectField', to: 'ui/SelectField' },
  { from: 'common/TextAreaField', to: 'ui/TextAreaField' },
  { from: 'common/Table', to: 'ui/Table' },
  { from: 'common/Pagination', to: 'ui/Pagination' },
  { from: 'common/Modal', to: 'ui/Modal' },
  { from: 'common/DeleteModal', to: 'ui/DeleteModal' },
  { from: 'common/ConfirmationModal', to: 'ui/ConfirmationModal' },
  { from: 'common/SuccessModal', to: 'ui/SuccessModal' },
  { from: 'common/Tabs', to: 'ui/Tabs' },

  // Features - Shipment
  { from: 'common/AddressBookModal', to: 'features/shipment/AddressBookModal' },
  { from: 'common/PostCodeModal', to: 'features/shipment/PostCodeModal' },
  { from: 'common/ScheduleCollectionModal', to: 'features/shipment/ScheduleCollectionModal' },
  { from: 'common/ShipmentSuccessModal', to: 'features/shipment/ShipmentSuccessModal' },
  { from: 'common/BaseShipmentForm', to: 'features/shipment/BaseShipmentForm' },
  
  // Folders to move entirely
  { fromDir: 'dashboard/ship/export-domestic', toDir: 'features/shipment/export-domestic' },
  { fromDir: 'dashboard/ship/import', toDir: 'features/shipment/import' },
  { fromDir: 'dashboard/ship/pallet', toDir: 'features/shipment/pallet' },
  { fromDir: 'dashboard/ship/quick-ship', toDir: 'features/shipment/quick-ship' },
  { fromDir: 'dashboard/ship/spot-rate', toDir: 'features/shipment/spot-rate' },
  { fromDir: 'dashboard/ship/ship-manager', toDir: 'features/shipment/ship-manager' },
  
  // Features - Manage
  { fromDir: 'manage/contact', toDir: 'features/manage/contact' },
  { fromDir: 'manage/csv-mapping', toDir: 'features/manage/csv-mapping' },
  { fromDir: 'preference-tabs', toDir: 'features/manage/preference-tabs' },

  // Features - Tracking
  { fromDir: 'dashboard/track/tracking-history', toDir: 'features/tracking/tracking-history' },
  { fromDir: 'dashboard/track/watch-shipment', toDir: 'features/tracking/watch-shipment' },

  // Features - Quote
  { fromDir: 'dashboard/quote/quick-quote', toDir: 'features/quote/quick-quote' },

  // Features - Products
  { fromDir: 'dashboard/products', toDir: 'features/products' },

  // Features - Overview
  { fromDir: 'dashboard/overview', toDir: 'features/overview' },
];

const importMap = {};
for (const move of moves) {
  if (move.from) {
    let oldP = move.from.replace(/\.tsx?$/, '');
    let newP = move.to.replace(/\.tsx?$/, '');
    importMap[oldP] = newP;
    importMap[oldP.toLowerCase()] = newP; 
  } else if (move.fromDir) {
    importMap[move.fromDir] = move.toDir;
  }
}

function resolveImport(currentFilePath, importPath) {
  if (importPath.startsWith('@/')) {
    return importPath;
  }
  if (importPath.startsWith('.')) {
    const absoluteImportPath = path.resolve(path.dirname(currentFilePath), importPath);
    const srcIndex = absoluteImportPath.indexOf(path.sep + 'src' + path.sep);
    if (srcIndex !== -1) {
      let relativeToSrc = absoluteImportPath.slice(srcIndex + 5); 
      relativeToSrc = relativeToSrc.replace(/\\/g, '/');
      return '@/' + relativeToSrc;
    }
  }
  return importPath;
}

function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const lines = content.split('\n');
  const newLines = lines.map(line => {
    const importRegex = /^(import.*?from\s+['"])(.*?)(['"].*)$/;
    const dynamicImportRegex = /^(.*import\s*\(\s*['"])(.*?)(['"].*)$/;

    let match = line.match(importRegex);
    let isDynamic = false;
    if (!match) {
      match = line.match(dynamicImportRegex);
      isDynamic = true;
    }

    if (match) {
      const prefix = match[1];
      const originalImport = match[2];
      const suffix = match[3];

      let standardizedImport = resolveImport(filePath, originalImport);
      
      if (standardizedImport.startsWith('@/components/')) {
        let compPath = standardizedImport.substring('@/components/'.length);
        
        let bestMatch = null;
        for (const [oldP, newP] of Object.entries(importMap)) {
          if (compPath === oldP || compPath.startsWith(oldP + '/')) {
            if (!bestMatch || oldP.length > bestMatch.oldP.length) {
              bestMatch = { oldP, newP };
            }
          }
        }

        if (bestMatch) {
          compPath = compPath.replace(bestMatch.oldP, bestMatch.newP);
          standardizedImport = '@/components/' + compPath;
        }
      }

      if (standardizedImport !== originalImport) {
        changed = true;
        return prefix + standardizedImport + suffix;
      }
    }
    return line;
  });

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

function walkDirForImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('.git') && !fullPath.includes('node_modules')) {
        walkDirForImports(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      updateImportsInFile(fullPath);
    }
  }
}

console.log('--- Fixing Imports ---');
walkDirForImports(srcDir);
console.log('Done!');
