const fs = require('fs');

const filePath = 'brands.html';
let html = fs.readFileSync(filePath, 'utf8');

// Remove from PRODUCT MODALS FOR BRANDS PAGE to just before FOOTER
const modalStart = '<!-- PRODUCT MODALS FOR BRANDS PAGE -->';
const footerStart = '<!-- FOOTER -->';

const startIdx = html.indexOf(modalStart);
const endIdx = html.indexOf(footerStart);

if (startIdx !== -1 && endIdx !== -1) {
    const before = html.substring(0, startIdx);
    const after = html.substring(endIdx);
    const newHtml = before + after;
    fs.writeFileSync(filePath, newHtml);
    console.log('Removed orphaned modals from brands.html');
    console.log('Removed', endIdx - startIdx, 'characters');
} else {
    console.log('Could not find markers. modalStart:', startIdx, 'footerStart:', endIdx);
}
