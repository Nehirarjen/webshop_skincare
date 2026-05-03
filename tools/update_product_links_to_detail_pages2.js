// Update products.html links to per-product detail pages, inferred from card content
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'products.html');
let html = fs.readFileSync(file, 'utf8');

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

const cardRegex = /<article class="product-card">([\s\S]*?)<\/article>/g;
let m, count = 0;
let newHtml = html;
while ((m = cardRegex.exec(html)) !== null){
  const card = m[0];
  const brandMatch = card.match(/<span class=\"product-brand\">([^<]+)<\/span>/);
  const nameMatch = card.match(/<h3 class="product-name">([^<]+)<\/h3>/);
  if(!brandMatch || !nameMatch) continue;
  const brand = brandMatch[1].trim();
  const name = nameMatch[1].trim();
  const slug = slugify(brand + ' ' + name);
  const oldHrefMatch = card.match(/href=\"product-detail.html#detail-[^\"]+\"/);
  if(oldHrefMatch){
    const newHref = 'href="product-detail/detail-' + slug + '.html"';
    const updatedCard = card.replace(oldHrefMatch[0], newHref);
    newHtml = newHtml.replace(card, updatedCard);
    count++;
  } else {
    // No descriptor found; skip
  }
}

fs.writeFileSync(file, newHtml, 'utf8')
console.log('Updated product-detail links in products.html for', count, 'cards');
