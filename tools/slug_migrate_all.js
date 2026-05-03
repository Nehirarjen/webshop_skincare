// Migrate all old detail anchors (product-detail.html#detail-<digits>) to slug-based detail pages across index.html, products.html, and brands.html
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const filesToMigrate = [
  path.join(root, 'index.html'),
  path.join(root, 'products.html'),
  path.join(root, 'brands.html')
];
const detailDir = path.join(root, 'product-detail');

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,'');
}

function buildSlugFromBlock(block) {
  const brandMatch = block.match(/<span[^>]*class=["']product-brand["'][^>]*>([^<]+)<\/span>/i);
  const nameMatch  = block.match(/<h1[^>]*>([^<]+)<\/h1>/i) || block.match(/<h3[^>]*class=["']product-name["'][^>]*>([^<]+)<\/h3>/i);
  if(!brandMatch || !nameMatch) return null;
  const slug = slugify(brandMatch[1].trim() + ' ' + nameMatch[1].trim());
  // verify existence
  if (fs.existsSync(path.join(detailDir, 'detail-' + slug + '.html'))) return slug;
  return null;
}

function tryReplaceHref(html, oldHref, newHref){
  if (html.indexOf(oldHref) === -1) return [html, 0];
  const updated = html.split(oldHref).join(newHref);
  // return [updatedHtml, replacements]
  const reps = (html.match(new RegExp(escapeRegExp(newHref), 'g')) || []).length;
  return [updated, reps];
}

function escapeRegExp(string){ return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

let totalReplacements = 0;
for (const filePath of filesToMigrate){
  if (!fs.existsSync(filePath)) continue;
  let html = fs.readFileSync(filePath, 'utf8');
  // Find all anchors to old detail pages
  const anchorRx = /href=\"product-detail.html#detail-(\d+)\"/g;
  let m;
  let localCount = 0;
  while ((m = anchorRx.exec(html)) !== null){
    const anchorPos = m.index;
    // Try to locate the containing product-card block
    const articleStart = html.lastIndexOf('<article', anchorPos);
    const articleEnd = html.indexOf('</article>', anchorPos);
    if (articleStart === -1 || articleEnd === -1) continue;
    const block = html.substring(articleStart, articleEnd);
    const slug = buildSlugFromBlock(block);
    if (!slug) continue;
    const oldHref = 'href="product-detail.html#detail-' + m[1] + '"';
    const newHref = 'href="product-detail/detail-' + slug + '.html"';
    if (html.indexOf(oldHref) !== -1){
      html = html.replace(oldHref, newHref);
      localCount++;
    }
  }
  if (localCount > 0){
    fs.writeFileSync(filePath, html, 'utf8');
  }
  totalReplacements += localCount;
}

console.log('Slug migration complete. Total replacements across files:', totalReplacements);
