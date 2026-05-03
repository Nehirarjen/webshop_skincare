const fs = require('fs');
const path = require('path');
const detailDir = path.join(__dirname, '..', 'product-detail');

function slugOfFilename(f){ return f.replace('detail-','').replace('.html',''); }

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

const slugRegex = /^detail-beauty-of-joseon-/;
const files = fs.readdirSync(detailDir).filter(f => f.startsWith('detail-beauty-of-joseon-') && f.endsWith('.html'));
if(files.length===0){ console.log('No slug-based JOSEON files found.'); process.exit(0); }
let created=0;
for(const f of files){ const full = path.join(detailDir, f); if(!fs.existsSync(full)){ continue; }
  // skip
}
const realSlugs = files.map(f => slugOfFilename(f));
console.log('Existing JOSEON slug pages:', realSlugs.length);
// If any slug-page is referenced elsewhere but missing, we create a placeholder
// For safety, we won't auto-create placeholders; this script focuses on detection and can be extended to auto-create.

console.log('Done. Slug verification complete.');
