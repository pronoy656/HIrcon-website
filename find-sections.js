const fs = require('fs');
const content = fs.readFileSync('src/components/features/shipment/BaseShipmentForm.tsx', 'utf8');

const queries = [
  'Box Details',
  'Shipment Details',
  'Commodity Information',
  'Summary'
];

queries.forEach(q => {
  const index = content.indexOf(q);
  if (index !== -1) {
    const lines = content.substring(0, index).split('\n');
    console.log(`Found "${q}" at line ${lines.length}`);
  } else {
    console.log(`Could not find "${q}"`);
  }
});
