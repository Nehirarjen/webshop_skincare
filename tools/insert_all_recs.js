const fs = require('fs');
const path = require('path');

const detailPath = path.join(__dirname, '..', 'product-detail.html');
let content = fs.readFileSync(detailPath, 'utf8');

// Target recommendations: pick 4 slug IDs that exist
const targets = ['detail-torriden-2','detail-boj-3','detail-med-3','detail-anua-3'];

function extractDetailBlock(slug){
  const reg = new RegExp('<div class="product-detail-section" id="'+slug+'">[\s\S]*?<\/div>','i');
  const m = content.match(reg);
  return m ? m[0] : null;
}

function extractImageFromBlock(block){ const m = block.match(/<img src=\"([^\"]+)\"/); return m ? m[1] : ''; }
function extractBrandAndNameFromBlock(block){ const b = block.match(/<span class=\"product-brand\">([^<]+)<\/span>/); const n = block.match(/<h2>|<h3 class=\"product-name\">([^<]+)<\/h2>/); return {brand: b ? b[1] : '', name: n ? n[1] : ''}; }

let recFragment = '\n    <!-- Empfehlungen -->\n    <div class="product-detail-recs">\n        <h4>Weitere Produkte</h4>\n        <div class="recommendations-grid">';

targets.forEach(slug => {
  const block = extractDetailBlock(slug);
  if(!block) return;
  const img = extractImageFromBlock(block);
  const info = extractBrandAndNameFromBlock(block);
  // build simple card
  recFragment += `\n            <a class=\"rec-card\" href=\"product-detail.html#${slug}\">\n                <img src=\"${img}\" alt=\"${info.brand} ${info.name}\"/>\n                <span class=\"rec-brand\">${info.brand}</span>\n                <span class=\"rec-name\">${info.name}</span>\n            </a>`;
});

recFragment += '\n        </div>\n    </div>\n';

// Insert after each detail-section's form end: naive approach - append to end of detail file for simplicity
content = content + recFragment;
fs.writeFileSync(detailPath, content, 'utf8');
console.log('Inserted recommendations into product-detail.html for targets:', targets.join(', '));
