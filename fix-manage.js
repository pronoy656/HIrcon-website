const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

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
      
      newContent = newContent.replace(/@\/components\/features\/manage\/common\/(InputField|SelectField|TextAreaField|Table|Pagination|Modal|DeleteModal|ConfirmationModal|SuccessModal|Tabs)/g, '@/components/ui/$1');
      newContent = newContent.replace(/@\/components\/layout\/ui\/button/g, '@/components/ui/button');
      newContent = newContent.replace(/@\/components\/features\/manage\/ui\//g, '@/components/ui/');

      if (content !== newContent) {
        fs.writeFileSync(full, newContent, 'utf8');
        console.log(`Fixed: ${full}`);
      }
    }
  }
}

console.log('--- Fixing Remaining Imports ---');
walk(srcDir);
console.log('Done!');
