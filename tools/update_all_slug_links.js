// Update all detail links in both products.html and brands.html to slug-based detail pages
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'products.html');
const brandsPath = path.join(__dirname, '..', 'brands.html');
const indexPath = path.join(__dirname, '..', 'index.html');
const detailDir = path.join(__dirname, '..', 'product-detail');

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }
function extractSlugFromBlock(block){
  const brandMatch = block.match(/<span class=\"product-brand\">([^<]+)<\/span>/);
  const nameMatch = block.match(/<h3 class=\"product-name\">([^<]+)<\/h3>/);
  if(!brandMatch || !nameMatch) return null;
  const slug = slugify(brandMatch[1].trim() + ' ' + nameMatch[1].trim());
  return slug;
}

function slugExists(slug){
  // details exist as detail-<slug>.html
  const f = path.join(detailDir, 'detail-' + slug + '.html');
  try{ return fs.existsSync(f); } catch(e){ return false; }
}

function updateFileForSlug(filePath){
  let html = fs.readFileSync(filePath, 'utf8');
  const blockRe = /<article class=\"product-card\">([\s\S]*?)<\/article>/g;
  let m;
  let updated = false;
  while ((m = blockRe.exec(html)) !== null){
    const block = m[0];
    const slug = extractSlugFromBlock(block);
    if(!slug || !slugExists(slug)) continue;
    const oldHrefRegex = /href=\"product-detail.html#detail-\d+\"/;
    if (oldHrefRegex.test(block)){
      const newHref = 'href=\"product-detail/detail-' + slug + '.html\"';
      const updatedBlock = block.replace(oldHrefRegex, newHref);
      html = html.replace(block, updatedBlock);
      updated = true;
    }
  }
  if(updated){ fs.writeFileSync(filePath, html, 'utf8'); console.log('Updated slug-based detail links in', path.basename(filePath)); }
  else { console.log('No slug-based changes needed for', path.basename(filePath)); }
}

updateFileForSlug(productsPath);
updateFileForSlug(brandsPath);

function updateIndexSlugLinks(indexPath){
  if(!require('fs').existsSync(indexPath)) return;
  let html = require('fs').readFileSync(indexPath,'utf8');
  // Find blocks with detail-<num> anchors in index, and replace to slug-based if slug exists
  const blockRe = /<a\s+href=\"product-detail.html#detail-([0-9]+)\"[\s\S]*?<\/a>/g;
  const detailFiles = require('fs').readdirSync(path.join(__dirname,'..','product-detail')).filter(f => f.startsWith('detail-') && f.endsWith('.html'));
  const slugFromFile = (f)=> f.substring(7, f.length-5);
  const slugExists = (slug)=> detailFiles.some(df => slugFromFile(df) === slug);
  let m; let updated = 0;
  while((m = blockRe.exec(html)) !== null){
    const block = m[0];
    // Try to read brand/name inside block
    const brandMatch = block.match(/<span class=\"product-brand\">([^<]+)<\/span>/);
    const nameMatch = block.match(/<h3 class=\"product-name\">([^<]+)<\/h3>/);
    if(brandMatch && nameMatch){
      const slug = slugify(brandMatch[1].trim() + ' ' + nameMatch[1].trim());
      if(slugExists(slug)){
        const newHref = 'href="product-detail/detail-' + slug + '.html"';
        const newBlock = block.replace(/href=\"product-detail.html#detail-\d+\"/, newHref);
        html = html.replace(block, newBlock);
        updated++;
      }
    }
  }
  if(updated>0){
    require('fs').writeFileSync(indexPath, html, 'utf8');
  }
  console.log('Index: slug-based links updated =', updated);
}
updateIndexSlugLinks(indexPath);
