const fs = require('fs');

// Read product-detail.html
const detailHtml = fs.readFileSync('product-detail.html', 'utf8');

// Extract all product detail sections with id, brand, name, price, image
const productRegex = /<div class="product-detail-section" id="(detail-[^"]+)">[\s\S]*?<span class="product-brand">([^<]+)<\/span>[\s\S]*?<h1>([^<]+)<\/h1>[\s\S]*?<p class="product-price-large">([^<]+)<\/p>[\s\S]*?<img src="([^"]+)" alt="([^"]+)"/g;

let match;
const products = [];

while ((match = productRegex.exec(detailHtml)) !== null) {
    products.push({
        id: match[1],
        brand: match[2].trim(),
        name: match[3].trim(),
        price: match[4].trim(),
        imgSrc: match[5].trim(),
        imgAlt: match[6].trim()
    });
}

// Categorize products based on product type
const categoryRules = [
    { id: 'detail-skin-4', cat: 'cleanser' },
    { id: 'detail-med-1', cat: 'cleanser' },
    { id: 'detail-anua-2', cat: 'cleanser' },
    { id: 'detail-skin-5', cat: 'cleanser' },
    { id: 'detail-round-lab-2', cat: 'cleanser' },
    { id: 'detail-cosrx', cat: 'cleanser' },
    { id: 'detail-boj-4', cat: 'cleanser' },
    { id: 'detail-heimish', cat: 'cleanser' },
    { id: 'detail-mixsoon', cat: 'cleanser' },
    { id: 'detail-haruharu', cat: 'cleanser' },
    { id: 'detail-anua-6', cat: 'cleanser' },
    { id: 'detail-etude', cat: 'cleanser' },
    { id: 'detail-torriden-4', cat: 'cleanser' }, // Control Mask? No, mask.
    // Toners
    { id: 'detail-anua-1', cat: 'toner' },
    { id: 'detail-boj-5', cat: 'toner' },
    { id: 'detail-torriden-6', cat: 'toner' },
    { id: 'detail-scinic', cat: 'toner' },
    { id: 'detail-round-lab', cat: 'toner' },
    { id: 'detail-pyunkang', cat: 'toner' },
    { id: 'detail-benton', cat: 'toner' },
    { id: 'detail-boj-4', cat: 'toner' }, // Green Plum Toner
    // Serums
    { id: 'detail-torriden-1', cat: 'serum' },
    { id: 'detail-boj-3', cat: 'serum' },
    { id: 'detail-med-3', cat: 'serum' },
    { id: 'detail-med-4', cat: 'serum' },
    { id: 'detail-anua-4', cat: 'serum' },
    { id: 'detail-skin-1', cat: 'serum' },
    { id: 'detail-torriden-3', cat: 'serum' }, // Lip Essence
    // Masks
    { id: 'detail-torriden-4', cat: 'mask' },
    { id: 'detail-torriden-5', cat: 'mask' },
    { id: 'detail-med-5', cat: 'mask' },
    { id: 'detail-med-6', cat: 'mask' },
    { id: 'detail-skin-6', cat: 'mask' },
    // Moisturizers
    { id: 'detail-torriden-2', cat: 'moisturizer' },
    { id: 'detail-boj-2', cat: 'moisturizer' },
    { id: 'detail-med-2', cat: 'moisturizer' },
    { id: 'detail-anua-5', cat: 'moisturizer' },
    { id: 'detail-skin-2', cat: 'moisturizer' },
    // SPF
    { id: 'detail-boj-1', cat: 'spf' },
    { id: 'detail-boj-6', cat: 'spf' },
    { id: 'detail-skin-3', cat: 'spf' }
];

// Apply categories
products.forEach(p => {
    const rule = categoryRules.find(r => r.id === p.id);
    p.category = rule ? rule.cat : 'serum';
});

// Generate product card HTML
const generateCard = (p) => {
    return `
            <article class="product-card">
                <a href="product-detail.html#${p.id}" class="product-card__link">
                    <div class="product-card__img">
                        <img src="${p.imgSrc}" alt="${p.imgAlt}" />
                        <span class="product-badge">Bestseller</span>
                    </div>
                    <div class="product-card__body">
                        <span class="product-brand">${p.brand}</span>
                        <h3 class="product-name">${p.name}</h3>
                        <div class="product-footer">
                            <span class="product-price">${p.price}</span>
                        </div>
                    </div>
                </a>
            </article>`;
};

// Group by category
const categories = {
    cleanser: [],
    toner: [],
    serum: [],
    mask: [],
    moisturizer: [],
    spf: []
};

products.forEach(p => {
    if (categories[p.category]) {
        categories[p.category].push(p);
    }
});

// Read existing products.html to get current products
const productsHtml = fs.readFileSync('products.html', 'utf8');

// Remove existing product sections (from first section to end)
const splitAt = productsHtml.indexOf('<!-- PRODUCTS GRID - CLEANSER -->');
const headerPart = productsHtml.substring(0, splitAt);

// Generate new product sections
const catNames = {
    cleanser: 'Cleanser',
    toner: 'Toner',
    serum: 'Serum & Essenz',
    mask: 'Masken',
    moisturizer: 'Creme',
    spf: 'Sonnenschutz'
};

let newSections = '';
Object.keys(categories).forEach(cat => {
    const prods = categories[cat];
    if (prods.length === 0) return;
    
    newSections += `
    <!-- PRODUCTS GRID - ${cat.toUpperCase()} -->
    <section class="section products-section" id="${cat}">
        <div class="section-header">
            <h2 class="section-title">${catNames[cat]}</h2>
        </div>
        <div class="products-grid products-grid--full">${prods.map(p => generateCard(p)).join('')}
        </div>
    </section>`;
});

// Write new products.html
const newProductsHtml = headerPart + newSections + '\n</main>\n</body>\n</html>';
fs.writeFileSync('products.html', newProductsHtml);

console.log('Updated products.html successfully!');
console.log('Total products:', products.length);
console.log('By category:');
Object.keys(categories).forEach(c => {
    console.log(`  ${c}: ${categories[c].length}`);
});
