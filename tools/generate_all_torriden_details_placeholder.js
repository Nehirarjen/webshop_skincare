const fs = require('fs');
const path = require('path');

const detailDir = path.join(__dirname, '..', 'product-detail');
const outBase = detailDir;

const items = [
  {slug:'detail-torriden-dive-in-serum', title:'DIVE IN Serum', price:'CHF 24.00'},
  {slug:'detail-torriden-dive-in-cleansing-foam', title:'DIVE IN Cleansing Foam', price:'CHF 16.50'},
  {slug:'detail-torriden-dive-in-soothing-cream', title:'DIVE IN Soothing Cream', price:'CHF 25.00'},
  {slug:'detail-torriden-dive-in-sunscreen-spf50', title:'DIVE IN Sunscreen SPF50+', price:'CHF 22.00'},
  {slug:'detail-torriden-torriden-solid-in-lip-essence', title:'SOLID IN Lip Essence', price:'CHF 11.00'},
  {slug:'detail-torriden-torriden-rice-toner', title:'CELLMAZING Vita C Toner Pad', price:'CHF 28.00'},
  {slug:'detail-torriden-dive-in-moisture-mask', title:'DIVE IN Moisture Mask', price:'CHF 30.00'},
  {slug:'detail-torriden-dive-in-serum2', title:'DIVE IN Serum II', price:'CHF 26.00'}
]

function renderContent(slug, title, price){
  const image = 'https://torriden.us/cdn/shop/files/DIVEINSerum1_631ac0e3-a77b-422a-a806-bf34477cac19.jpg?v=1753346213&w=500&q=80';
  const content = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Detail— Torriden ${title}</title><link rel="stylesheet" href="../style.css"/></head>
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
    <section class="section product-detail-twocol" style="display:flex;gap:32px;align-items:flex-start;">
      <div class="product-detail-media" style="flex:1;min-width:280px;">
        <img src="${image}" alt="${title}" style="max-width:100%;border-radius:6px;" />
      </div>
      <div class="product-detail-info" style="flex:1;min-width:280px;">
        <span class="product-brand">Torriden</span>
        <h1>${title}</h1>
        <p class="product-price-large">${price}</p>
        <p class="product-desc">Demo content for ${title}. This is a placeholder with a standard layout to ensure consistency across all Torriden detail pages.</p>
        <div class="product-ingredients">
          <h3>Schlüsselinhaltsstoffe</h3>
          <div class="ingredient-tags">
            <span class="ingredient-tag">Ingredient A</span>
            <span class="ingredient-tag">Ingredient B</span>
            <span class="ingredient-tag">Ingredient C</span>
          </div>
        </div>
        <form class="add-to-cart-form" action="/webshop_skincare/order-confirmation.html" method="get">
          <div class="form-row"><div class="form-group"><label for="qty-${slug}">Menge</label><input type="number" id="qty-${slug}" name="qty" min="1" max="10" value="1" /></div></div>
          <div class="form-row"><div class="form-group"><label for="name-${slug}">Name</label><input type="text" id="name-${slug}" name="name" required /></div>
            <div class="form-group"><label for="email-${slug}">E-Mail</label><input type="email" id="email-${slug}" name="email" required /></div></div>
          <div class="form-row"><div class="form-group"><label for="address-${slug}">Adresse</label><input type="text" id="address-${slug}" name="address" required /></div></div>
          <div class="form-row"><div class="form-group"><label for="plz-${slug}">PLZ</label><input type="text" id="plz-${slug}" name="plz" required /></div>
            <div class="form-group"><label for="city-${slug}">Ort</label><input type="text" id="city-${slug}" name="city" required /></div></div>
          <input type="hidden" name="product" value="${title}" />
          <input type="hidden" name="price" value="${price}" />
          <button type="submit" class="btn-primary">Jetzt bestellen</button>
        </form>
      </div>
    </section>

    <section class="section" aria-label="Empfohlene Produkte">
      <div class="section-header"><h2 class="section-title">Empfohlene Produkte</h2></div>
      <div class="products-grid" style="display:flex;flex-wrap:wrap;gap:16px;">
        <a class="rec-card" href="#"></a>
        </div>
      </section>
  </main>
  <footer class="site-footer"><div class="footer-inner"><span>© 2025 SUNA Korean Skincare</span></div></footer>
  </body>
  </html>`;
  return content;
}

let contentMap = {
};

// For each item, write page if not exists or overwrite (to be safe we overwrite with content)
items.forEach(it => {
  const fpath = path.join(outBase, 'detail-' + it.slug + '.html');
  // Build human-friendly title from slug
  const slugTitle = it.title;
  const htmlPage = renderContent(it.slug, slugTitle, it.price);
  fs.writeFileSync(fpath, htmlPage, 'utf8');
  console.log('Wrote/updated:', fpath);
});
