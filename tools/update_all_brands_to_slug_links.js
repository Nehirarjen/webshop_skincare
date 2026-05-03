// Update all brand pages (brands.html) to slug-based detail links for all products shown
const fs = require('fs');
const path = require('path');

const brandsPath = path.join(__dirname, '..', 'brands.html');
const detailDir = path.join(__dirname, '..', 'product-detail');
let html = fs.readFileSync(brandsPath, 'utf8');

const existingSlugs = new Set();
fs.readdirSync(detailDir).forEach(f => {
  if (f.startsWith('detail-') && f.endsWith('.html')) {
    existingSlugs.add(f.substring(7, f.length - 5));
  }
});

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

let count = 0;
// Pattern: href="product-detail.html#detail-<num>" then inside block read brand/name
const globalRx = /<a\s+href=\"product-detail.html#detail-([0-9]+)\"[\s\S]*?<span class=\"product-brand\">([^<]+)<\/span>[\s\S]*?<h3 class=\"product-name\">([^<]+)<\/h3>/g;
let m;
while ((m = globalRx.exec(html)) !== null) {
  const slugCandidate = slugify((m[2] || '').trim() + ' ' + (m[3] || '').trim());
  if (existingSlugs.has(slugCandidate)) {
    const oldHref = 'href="product-detail.html#detail-' + m[1] + '"';
    const newHref = 'href="product-detail/detail-' + slugCandidate + '.html"';
    html = html.replace(oldHref, newHref);
    count++;
  }
}

fs.writeFileSync(brandsPath, html, 'utf8');
console.log('Updated brands.html to slug-based detail links:', count);
