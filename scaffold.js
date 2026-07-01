const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'shipments', title: 'Shipments', desc: 'Manage all global shipments and create new labels.' },
  { path: 'couriers', title: 'Courier Partners', desc: 'Manage API credentials and priorities for global couriers.' },
  { path: 'customers', title: 'Customers', desc: 'Manage business and individual shipping customers.' },
  { path: 'pricing', title: 'Pricing', desc: 'Set shipping, zone, and custom weight rates.' },
  { path: 'billing', title: 'Billing', desc: 'View transactions, invoices, and payments.' },
  { path: 'reports', title: 'Reports', desc: 'Analytics on courier performance and revenue.' },
  { path: 'support', title: 'Support', desc: 'Customer support tickets and contact messages.' }
];

const basePath = path.join(__dirname, 'src/app/admin');

pages.forEach(p => {
  const dirPath = path.join(basePath, p.path);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const content = `import { Button } from "@/components/ui/button";

export default function ${p.path.charAt(0).toUpperCase() + p.path.slice(1)}Page() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <span className="text-3xl text-primary font-bold">${p.path.charAt(0).toUpperCase()}</span>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">${p.title}</h1>
      <p className="text-muted-foreground text-lg max-w-lg mt-2">
        ${p.desc} This module is currently under construction for the Courier Aggregator pivot.
      </p>
      <div className="mt-8">
        <Button variant="outline">Go Back</Button>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('Pages scaffolded successfully.');
