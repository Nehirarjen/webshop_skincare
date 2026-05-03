// Update all product-detail links on brands.html to slug-based detail pages
const fs = require('fs');
const path = require('path');

const brandsPath = path.join(__dirname, '..', 'brands.html');
let html = fs.readFileSync(brandsPath, 'utf8');

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

// Find all brand/product anchor blocks on brands.html
const anchorRegex = /<a\s+href=\"product-detail.html#detail-([^\"]+)\"[\s\S]*?<\/a>/g;
let m;
let replacements = 0;
while ((m = anchorRegex.exec(html)) !== null){
  // Extract the block content for this anchor to read brand and product-name
  const before = html.slice(0, m.index);
  const after = html.slice(m.index);
  // Heuristic: extract within the matched anchor block a product-brand and product-name
  const blockMatch = after.match(/<a[^>]*>[\s\S]*?<\/a>/);
  const block = blockMatch ? blockMatch[0] : '';
  const brandMatch = block.match(/<span class=\"product-brand\">([^<]+)<\/span>/);
  const nameMatch = block.match(/<h3 class=\"product-name\">([^<]+)<\/h3>/);
  if(brandMatch && nameMatch){
    const brand = brandMatch[1].trim();
    const name = nameMatch[1].trim();
    const slug = slugify(brand + ' ' + name);
    const newHref = 'href="product-detail/detail-' + slug + '.html"';
    // Replace the href within this block
    const oldHref = 'href="product-detail.html#detail-' + m[1] + '"';
    html = html.replace(oldHref, newHref);
    replacements++;
  }
}

fs.writeFileSync(brandsPath, html, 'utf8');
console.log('Updated brands.html per-product detail links, replacements=', replacements);
