// Update product overview links to point to separate per-product detail pages
// Strategy:
// - Read products.html and extract each product card's brand and name
// - Build slug from brand + name
// - Replace href in the product card to point to product-detail/detail-<slug>.html

const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'products.html')
let html = fs.readFileSync(file, 'utf8')

function slugify(s){ return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,''); }

// Regex to find each card block with brand and name
const cardRegex = /<a class="product-card__link"[^>]*>[\s\S]*?<span class="product-brand">([^<]+)<\/span>[\s\S]*?<h3 class=\"product-name\">([^<]+)<\/h3>/g
let m
let idx = 0
while ((m = cardRegex.exec(html)) !== null){
  const brand = m[1].trim()
  const name = m[2].trim()
  const slug = slugify(brand + ' ' + name)
  const oldHref = 'href="product-detail.html#detail-'
  const newHref = 'href="product-detail/detail-' + slug + '.html"'
  // replace the first occurrence after this point within the same match range
  const segmentEnd = cardRegex.lastIndex
  // naive: perform global replace for this specific pattern within the whole file (idempotent for 1:1 replacements)
  html = html.split(oldHref).join('href="product-detail/detail-' + slug + '.html"')
  idx++
}

fs.writeFileSync(file, html, 'utf8')
console.log('Updated product links to per-product detail pages for', idx, 'cards')
