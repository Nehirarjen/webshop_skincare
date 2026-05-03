const fs = require('fs');
const path = require('path');

const root = process.cwd();
const indexPath = path.join(root, 'index.html');
const productsPath = path.join(root, 'products.html');
const brandsPath = path.join(root, 'brands.html');
const detailDir = path.join(root, 'product-detail');

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p, {recursive:true}); }
ensureDir(detailDir);

function extractSlugsFromContent(content){ const re = /detail-beauty-of-joseon-[a-z0-9-]+\.html/g; const arr = []; let m; while ((m = re.exec(content)) !== null){ arr.push(m[0]); } return arr; }

const contents = [];
[indexPath, productsPath, brandsPath].forEach(p => {
  if (fs.existsSync(p)) contents.push(fs.readFileSync(p, 'utf8'));
});
const found = new Set();
contents.forEach(c => {
  const slugs = extractSlugsFromContent(c);
  slugs.forEach(s => found.add(s));
});

let missing = [];
found.forEach(slugUrl => {
  const slug = slugUrl.replace(/^detail-beauty-of-joseon-/, '').replace(/\.html$/, '');
  const f = path.join(detailDir, 'detail-' + slugUrl.replace('.html','') + '.html');
  if(!fs.existsSync(f)) missing.push('detail-' + slug + '.html');
});

if(missing.length>0){
  // Create minimal placeholder pages for missing ones
  missing.forEach(slugFile => {
    const slugHTML = slugFile.replace('.html','');
    const filePath = path.join(detailDir, slugFile);
    if(fs.existsSync(filePath)) return;
    const slug = slugHTML; // include whole slug
    const placeholder = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>${slug}</title><link rel="stylesheet" href="../style.css"></head><body><h1>${slug}</h1><p>Placeholder-Seite für ${slug}</p></body></html>`;
    fs.writeFileSync(filePath, placeholder, 'utf8');
  });
  console.log('Created', missing.length, 'placeholder slug pages under product-detail/');
} else {
  console.log('All JOSEON slug pages exist.');
}
