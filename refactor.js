const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

const moves = [
  // Layout
  { from: 'navbar.tsx', to: 'layout/Navbar.tsx' },
  { from: 'NavbarWrapper.tsx', to: 'layout/NavbarWrapper.tsx' },
  { from: 'dashboard/Topbar.tsx', to: 'layout/Topbar.tsx' },

  // Auth
  { from: 'Auth-section/AuthLayout.tsx', to: 'auth/AuthLayout.tsx' },
  // Let's just rename the dir if there's more, but we explicitly map known files to be safe
  { from: 'Auth-section/login/LoginForm.tsx', to: 'auth/login/LoginForm.tsx' },
  { from: 'Auth-section/register/RegisterForm.tsx', to: 'auth/register/RegisterForm.tsx' },

  // UI (from common)
  { from: 'common/InputField.tsx', to: 'ui/InputField.tsx' },
  { from: 'common/SelectField.tsx', to: 'ui/SelectField.tsx' },
  { from: 'common/TextAreaField.tsx', to: 'ui/TextAreaField.tsx' },
  { from: 'common/Table.tsx', to: 'ui/Table.tsx' },
  { from: 'common/Pagination.tsx', to: 'ui/Pagination.tsx' },
  { from: 'common/Modal.tsx', to: 'ui/Modal.tsx' },
  { from: 'common/DeleteModal.tsx', to: 'ui/DeleteModal.tsx' },
  { from: 'common/ConfirmationModal.tsx', to: 'ui/ConfirmationModal.tsx' },
  { from: 'common/SuccessModal.tsx', to: 'ui/SuccessModal.tsx' },
  { from: 'common/Tabs.tsx', to: 'ui/Tabs.tsx' },

  // Features - Shipment
  { from: 'common/AddressBookModal.tsx', to: 'features/shipment/AddressBookModal.tsx' },
  { from: 'common/PostCodeModal.tsx', to: 'features/shipment/PostCodeModal.tsx' },
  { from: 'common/ScheduleCollectionModal.tsx', to: 'features/shipment/ScheduleCollectionModal.tsx' },
  { from: 'common/ShipmentSuccessModal.tsx', to: 'features/shipment/ShipmentSuccessModal.tsx' },
  { from: 'common/BaseShipmentForm.tsx', to: 'features/shipment/BaseShipmentForm.tsx' },
  
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

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function moveFile(from, to) {
  const fromPath = path.join(componentsDir, from);
  const toPath = path.join(componentsDir, to);
  if (fs.existsSync(fromPath)) {
    ensureDir(toPath);
    fs.renameSync(fromPath, toPath);
    console.log(`Moved: ${from} -> ${to}`);
    return true;
  }
  return false;
}

function moveDir(from, to) {
  const fromPath = path.join(componentsDir, from);
  const toPath = path.join(componentsDir, to);
  if (fs.existsSync(fromPath)) {
    ensureDir(toPath);
    // Move all contents
    const items = fs.readdirSync(fromPath);
    for (const item of items) {
      const src = path.join(fromPath, item);
      const dest = path.join(toPath, item);
      if (fs.statSync(src).isDirectory()) {
        moveDir(path.join(from, item), path.join(to, item));
      } else {
        ensureDir(dest);
        fs.renameSync(src, dest);
        console.log(`Moved file: ${src} -> ${dest}`);
      }
    }
  }
}

// Perform moves
console.log('--- Moving files ---');
for (const move of moves) {
  if (move.fromDir) {
    moveDir(move.fromDir, move.toDir);
  } else {
    moveFile(move.from, move.to);
  }
}
// Special case for Auth-section since it might have other files
moveDir('Auth-section', 'auth');

// We also need to map the old import paths to the new import paths.
// Build a map of components/old/path -> components/new/path
const importMap = {};
for (const move of moves) {
  if (move.from) {
    let oldP = move.from.replace(/\.tsx?$/, '');
    let newP = move.to.replace(/\.tsx?$/, '');
    importMap[oldP] = newP;
    importMap[oldP.toLowerCase()] = newP; // for navbar.tsx -> Navbar.tsx case
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
      let relativeToSrc = absoluteImportPath.slice(srcIndex + 5); // +5 for \src\
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
      
      // If it points to components, check if we need to rewrite
      if (standardizedImport.startsWith('@/components/')) {
        let compPath = standardizedImport.substring('@/components/'.length);
        
        // Exact file match
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

console.log('--- Updating Imports ---');
walkDirForImports(srcDir);
console.log('Done!');
