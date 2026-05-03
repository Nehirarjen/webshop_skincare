// Append per-detail product recommendations to each detail page (4 cards) based on existing detail pages
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'product-detail');
const files = fs.readdirSync(dir).filter(f => f.startsWith('detail-') && f.endsWith('.html'));
// Build a map of slug -> {brand, name, img, filename}
function extractFromContent(content, slug){
  const brandMatch = content.match(/<span class="product-brand">([^<]+)<\/span>/);
  const brand = brandMatch ? brandMatch[1].trim() : '';
  const nameMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/) || content.match(/<h3 class="product-name">([^<]+)<\/h3>/);
  const name = nameMatch ? nameMatch[1].trim() : slug;
  const imgMatch = content.match(/<img[^>]+src=\"([^\"]+)\"/);
  const img = imgMatch ? imgMatch[1] : '';
  return {slug, brand, name, img}
}

const detailList = files.map(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const slug = f.replace('detail-','').replace('.html','');
  const data = extractFromContent(c, slug);
  return Object.assign({filename: f, slug}, data);
}).sort((a,b)=> a.slug.localeCompare(b.slug));

// Build and insert recommendations into each detail page
detailList.forEach((p, idx) => {
  const total = detailList.length;
  // Pick 4 recs in circular fashion, skipping itself
  const recs = [];
  for(let t=1; t<=4; t++){
    recs.push(detailList[(idx + t) % total]);
  }
  const recCards = recs.map(r => {
    const slug = r.slug;
    const img = r.img || '';
    const brand = r.brand || '';
    const name = r.name || slug;
    return `
    <a class="rec-card" href="detail-${slug}.html">
      <img src="${img}" alt="${brand} ${name}" />
      <span class="rec-brand">${brand}</span>
      <span class="rec-name">${name}</span>
    </a>`
  }).join('\n');

  const recSection = `
    <div class="product-detail-recs">
      <h4>Weitere Produkte</h4>
      <div class="recommendations-grid">
        ${recCards}
      </div>
    </div>`;

  // Insert after the first closing </form> tag found in the page (best effort)
  const filePath = path.join(dir, p.filename);
  let content = fs.readFileSync(filePath, 'utf8');
  const formEnd = content.indexOf('</form>');
  if(formEnd !== -1){
    const insertPos = formEnd + '</form>'.length;
    content = content.slice(0, insertPos) + '\n' + recSection + content.slice(insertPos);
    fs.writeFileSync(filePath, content, 'utf8');
  } else {
    // Fallback: append at end of file
    content += recSection;
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Appended per-detail recommendations to', detailList.length, 'pages');
