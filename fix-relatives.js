const fs = require('fs');
const path = require('path');

const files = [
  'src/app/dashboard/manage/preference/page.tsx',
  'src/app/dashboard/manage/dashboard-preference/page.tsx',
  'src/app/dashboard/manage/contact/page.tsx',
  'src/app/dashboard/integration/page.tsx'
];

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Replace all instances of ../.../components with @/components
    content = content.replace(/import\s+(.*?)\s+from\s+['"]\.\.\/.*?\/components\/(.*?)['"]/g, "import $1 from \"@/components/$2\"");
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed relative imports in ${file}`);
  }
}
