const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'product-detail.html');
let html = fs.readFileSync(filePath, 'utf8');

// Build a simple 4-card rec block using 4 known slug targets
const recTargets = ['detail-torriden-2','detail-boj-3','detail-med-3','detail-anua-3'];
function makeRecBlock(){
  // Attempt to extract image/name for each target for nicer cards
  const cards = recTargets.map(slug => {
    // naive image guess: pick the first <img src='...'> within the block
    const block = html.match(new RegExp('<div class="product-detail-section" id="'+slug+'">[\s\S]*?<\/div>'))?.[0] || '';
    const imgMatch = block.match(/<img src="([^"]+)"/);
    const brandMatch = block.match(/<span class=\"product-brand\">([^<]+)<\\/span>/);
    const nameMatch = block.match(/<h1>|<h2>|<h3 class=\"product-name\">([^<]+)<\\/h[123]>|<h3 class=\"product-name\">([^<]+)<\\/h[123]>/);
    const img = imgMatch ? imgMatch[1] : '';
    const brand = brandMatch ? brandMatch[1] : slug;
    const name = nameMatch ? (nameMatch[1] || nameMatch[2] || slug) : slug;
    return `<a class="rec-card" href="product-detail.html#${slug}">
        <img src="${img}" alt="${brand} ${name}" />
        <span class="rec-brand">${brand}</span>
        <span class="rec-name">${name}</span>
    </a>`
  }).join('\n')
  return `
    <div class="product-detail-recs">
        <h4>Weitere Produkte</h4>
        <div class="recommendations-grid">
            ${cards}
        </div>
    </div>`
}

const recHTML = makeRecBlock()
html = html.replace(/(<\/form>)/g, '$1\n'+recHTML)
fs.writeFileSync(filePath, html, 'utf8')
console.log('Inserted per-detail recommendations (heuristic) after every form');
