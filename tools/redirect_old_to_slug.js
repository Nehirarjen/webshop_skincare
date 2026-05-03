// Generate static redirects for old detail-<n> URLs to slug-based detail pages
const fs = require('fs');
const path = require('path');

const detailDir = path.join(__dirname, '..', 'product-detail');
const outRoot = path.join(__dirname, '..');
let detailFiles = [];
try {
  detailFiles = fs.readdirSync(detailDir).filter(f => f.startsWith('detail-') && f.endsWith('.html'));
} catch(e) {
  console.error('Could not read detail directory', detailDir, e);
  detailFiles = [];
}

function slugFromFilename(f){
  const s = f.substring('detail-'.length, f.length - '.html'.length);
  // slug already derived from filename if following slug pattern; keep as-is
  // We will attempt to recover slug by reading the page title, but for simplicity, use s
  // In practice, use the slug we already know by filename.
  return s;
}

detailFiles.sort();
const mapping = detailFiles.map((f, idx) => ({slug: slugFromFilename(f), file: f}));

let created = 0;
for(let i = 0; i < mapping.length; i++){
  const slug = mapping[i].slug;
  const target = 'product-detail/detail-' + slug + '.html';
  const oldName = 'old-detail-' + (i+1) + '.html';
  const content = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url='${target}'" />
  <title>Redirect</title>
</head>
<body>
  Falls du nicht weitergeleitet wurdest, klicken Sie <a href="${target}">hier</a>.
</body>
</html>`;
  const pathOut = path.join(outRoot, oldName);
  fs.writeFileSync(pathOut, content, 'utf8');
  created++;
}

console.log('Created', created, 'redirect pages for old-detail-* to slug-based detail pages');
