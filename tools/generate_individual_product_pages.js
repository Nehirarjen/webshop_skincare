// Generate per-product detail pages from existing detail blocks in product-detail.html
const fs = require('fs');
const path = require('path');

const detailSrc = path.join(__dirname, '..', 'product-detail.html');
const html = fs.readFileSync(detailSrc, 'utf8');

// Extract blocks: <div class="product-detail-section" id="detail-..."> ... </div>
const blockRegex = /<div class="product-detail-section" id="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
const products = [];
while ((m = blockRegex.exec(html)) !== null) {
  const slug = m[1];
  const block = m[0];
  // extract brand, name, price, image, desc from block
  const brandMatch = block.match(/<span class=\"product-brand\">([^<]+)<\/span>/);
  const nameMatch = block.match(/<h1[^>]*>([^<]+)<\/h1>/) || block.match(/<h3 class=\"product-name\">([^<]+)<\/h3>/);
  const priceMatch = block.match(/<p class=\"product-price-large\">([^<]+)<\/p>/);
  const imgMatch = block.match(/<img src=\"([^\"]+)\"/);
  const brand = brandMatch ? brandMatch[1].trim() : '';
  const name = nameMatch ? nameMatch[1].trim() : slug;
  const price = priceMatch ? priceMatch[1].trim() : '';
  const img = imgMatch ? imgMatch[1].trim() : '';
  products.push({slug, brand, name, price, img, block});
}

function slugFromBrandName(brand, name){ const base = (brand + ' ' + name).toLowerCase(); return base.replace(/[^a-z0-9]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

function buildPage(p, others){
  const slug = p.slug;
  const page = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.name} — SUNA Korean Skincare</title>
  <link rel="stylesheet" href="../style.css" />
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <nav class="nav-left">
        <a href="/webshop_skincare/products.html">Produkte</a>
        <a href="/webshop_skincare/brands.html">Marken</a>
        <a href="/webshop_skincare/contact.html">Kontakt</a>
      </nav>
      <a href="/webshop_skincare/index.html" class="logo">SUNA</a>
      <div class="nav-right"><span class="tagline">Korean Skincare</span></div>
    </div>
  </header>
  <main class="container">
    <section class="section">
      <div class="product-detail-grid" style="display:flex;gap:32px;align-items:flex-start;">
        <div class="product-detail-media" style="flex:1;min-width:280px;">
          <img src="${p.img}" alt="${p.brand} ${p.name}" style="max-width:100%;border-radius:6px;"/>
        </div>
        <div class="product-detail-info" style="flex:1;min-width:280px;">
          <span class="product-brand">${p.brand}</span>
          <h1>${p.name}</h1>
          <p class="product-price-large">${p.price}</p>
          <p class="product-desc">Kurze Beschreibung des Produkts. Enthält wichtige Inhaltsstoffe und Anwendungshinweise.</p>
          <div class="product-ingredients">
            <h3>Schlüsselinhaltsstoffe</h3>
            <div class="ingredient-tags">
              <span class="ingredient-tag">Centella Asiatica</span>
              <span class="ingredient-tag">Hyaluronic Acid</span>
              <span class="ingredient-tag">Niacinamide</span>
            </div>
          </div>
          <form class="add-to-cart-form" action="/webshop_skincare/order-confirmation.html" method="get">
            <div class="form-row"><div class="form-group"><label for="qty-${slug}">Menge</label><input type="number" id="qty-${slug}" name="qty" min="1" max="10" value="1" /></div></div>
            <div class="form-row"><div class="form-group"><label for="name-${slug}">Name</label><input type="text" id="name-${slug}" name="name" required /></div>
            <div class="form-group"><label for="email-${slug}">E-Mail</label><input type="email" id="email-${slug}" name="email" required /></div></div>
            <div class="form-row"><div class="form-group"><label for="address-${slug}">Adresse</label><input type="text" id="address-${slug}" name="address" required /></div></div>
            <div class="form-row"><div class="form-group"><label for="plz-${slug}">PLZ</label><input type="text" id="plz-${slug}" name="plz" required /></div>
            <div class="form-group"><label for="city-${slug}">Ort</label><input type="text" id="city-${slug}" name="city" required /></div></div>
            <input type="hidden" name="product" value="${p.name}" />
            <input type="hidden" name="price" value="${p.price}" />
            <button type="submit" class="btn-primary">Jetzt bestellen</button>
          </form>
        </div>
      </div>
    </section>
    <section class="section">
      ${others.map(o => `
        <a class="rec-card" href="detail-${slugFromBrandName(o.brand, o.name)}.html#${o.slug || ''}">
          <img src="${o.img || ''}" alt="${o.brand} ${o.name}" />
          <span class="rec-brand">${o.brand}</span>
          <span class="rec-name">${o.name}</span>
        </a>`).join('\n')}
    </section>
  </main>
  </body>
  </html>`
  return page
}

// Create a single page per product in product-detail/ as detail-<slug>.html
const detailFolder = path.join(__dirname, '..', 'product-detail')
if(!fs.existsSync(detailFolder)) fs.mkdirSync(detailFolder)

const all = products.map(p=> {
  const slug = slugFromBrandName(p.brand, p.name);
  return {slug, brand:p.brand, name:p.name, price:p.price, img:p.img, block:p.block};
})

let index = 0
let generated = 0
all.forEach((it)=>{
  const slug = slugFromBrandName(it.brand, it.name)
  // Determine 4-6 recommendations by picking a few other products
  const recs = all.filter(x=> x.slug !== it.slug).slice(0,4)
  const page = buildPage({slug: it.slug, brand: it.brand, name: it.name, price: it.price, img: it.img}, recs).trim()
  const outPath = path.join(detailFolder, `detail-${slug}.html`)
  fs.writeFileSync(outPath, page, 'utf8')
  generated++
})
console.log('Generated', generated, 'detail pages under product-detail/.')
