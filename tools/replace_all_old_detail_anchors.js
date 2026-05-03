// Replace old detail anchors (product-detail.html#detail-<digits>) with slug-based detail pages
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const targetFiles = [
  path.join(repoRoot, 'index.html'),
  path.join(repoRoot, 'products.html'),
  path.join(repoRoot, 'brands.html')
];
const detailDir = path.join(repoRoot, 'product-detail');

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

function findBlockContaining(html, idx){
  // find the closest enclosing <article ...> ... </article> around idx
  let start = html.lastIndexOf('<article', idx);
  if (start < 0) start = 0;
  let end = html.indexOf('</article>', idx);
  if (end === -1) end = idx + 200;
  return html.substring(start, end + '</article>'.length);
}

let totalReplacements = 0;
for (const file of targetFiles){
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const anchorRx = /href=\"product-detail.html#detail-\d+\"/g;
  let m; let localCount = 0;
  while ((m = anchorRx.exec(html)) !== null){
    const anchorPos = m.index;
    const block = findBlockContaining(html, anchorPos);
    // extract brand/name within block
    const brandMatch = block.match(/<span[^>]*class=["']product-brand["'][^>]*>([^<]+)<\/span>/i);
    const nameMatch  = block.match(/<h[12][^>]*class=["']product-name["'][^>]*>([^<]+)<\/h[123]>/i) || block.match(/<h3[^>]*class=["']product-name["'][^>]*>([^<]+)<\/h3>/i);
    if(!brandMatch || !nameMatch) continue;
    const brand = brandMatch[1].trim();
    const name = nameMatch[1].trim();
    const slug = slugify(brand + ' ' + name);
    const detailPath = path.join(detailDir, 'detail-' + slug + '.html');
    if (!fs.existsSync(detailPath)) continue;
    const newHref = 'href="product-detail/detail-' + slug + '.html"';
    // replace the exact anchor text
    html = html.slice(0, anchorPos) + newHref + html.slice(anchorPos + m[0].length);
    localCount++;
  }
  if (localCount > 0){
    fs.writeFileSync(file, html, 'utf8');
  }
  totalReplacements += localCount;
}

console.log('Slug-based replacements completed. Total replacements:', totalReplacements);
