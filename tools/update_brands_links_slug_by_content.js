// Update all product-detail links on brands.html to slug-based detail pages, by inferring slug from product card content
const fs = require('fs');
const path = require('path');

const brandsPath = path.join(__dirname, '..', 'brands.html');
const detailDir = path.join(__dirname, '..', 'product-detail');
const html = fs.readFileSync(brandsPath, 'utf8');

// collect existing detail slugs
const existing = new Set();
fs.readdirSync(detailDir).forEach(f => {
  if (f.startsWith('detail-') && f.endsWith('.html')) {
    const slug = f.substring(7, f.length - 5);
    existing.add(slug);
  }
});

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

let out = html;
let count = 0;
const anchorRe = /<a\s+href=\"product-detail.html#detail-([0-9]+)\"([\s\S]*?)<\/a>/g;
let m;
while ((m = anchorRe.exec(html)) !== null){
  // extract brand/name within this anchor block
  const block = m[0];
  const brandMatch = block.match(/<span class=\"product-brand\">([^<]+)<\/span>/);
  const nameMatch = block.match(/<h3 class=\"product-name\">([^<]+)<\/h3>/);
  if(!brandMatch || !nameMatch) continue;
  const brand = brandMatch[1].trim();
  const name = nameMatch[1].trim();
  const slugCandidate = slugify(brand + ' ' + name);
  if (existing.has(slugCandidate)){
    const oldHref = 'href="product-detail.html#detail-' + m[1] + '"';
    const newHref = 'href="product-detail/detail-' + slugCandidate + '.html"';
    out = out.replace(oldHref, newHref);
    count++;
  }
}

fs.writeFileSync(brandsPath, out, 'utf8');
console.log('Brands: updated' , count, 'links to slug-based detail pages');
