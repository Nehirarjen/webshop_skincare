const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'index.html'),
  path.join(__dirname, '..', 'products.html'),
  path.join(__dirname, '..', 'brands.html')
];
function extractSlugLinksFromHtml(html){
  const re = /product-detail\/detail-([a-z0-9-]+)\.html/g;
  const slugs = new Set();
  let m; while ((m = re.exec(html)) !== null){ slugs.add(m[1]); }
  return Array.from(slugs);
}

function slugExists(slug){
  const f = path.join(__dirname, '..', 'product-detail', 'detail-' + slug + '.html');
  return fs.existsSync(f);
}

let allSlugs = new Set();
files.forEach(fp => {
  if(!fs.existsSync(fp)) return;
  const html = fs.readFileSync(fp, 'utf8');
  extractSlugLinksFromHtml(html).forEach(s=> allSlugs.add(s));
});

const results = [];
Array.from(allSlugs).forEach(s => {
  if(!slugExists(s)) results.push(s);
});

if(results.length){
  console.log('Missing slug detail pages for', results.length, 'slugs:');
  results.forEach(s => console.log(' -', s));
} else {
  console.log('All slug-based detail pages exist for referenced links.');
}
