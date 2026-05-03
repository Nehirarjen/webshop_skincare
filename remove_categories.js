const fs = require('fs');

const filePath = 'brands.html';
let html = fs.readFileSync(filePath, 'utf8');

// Remove the category sections at the bottom (SERUM, TONER, CLEANSER, CREME, SUNSCREEN)
// These start after the Skin1004 brand section
const startMarker = '    <!-- CATEGORY: SERUM (all brands) -->';
const endMarker = '    <!-- CATEGORY: SUNSCREEN (all brands) -->';

const startIndex = html.indexOf(startMarker);
if (startIndex === -1) {
    console.log('Start marker not found');
    process.exit(1);
}

// Find the end of the SUNSCREEN section
const sunscreenSectionStart = html.indexOf(endMarker, startIndex);
if (sunscreenSectionStart === -1) {
    console.log('Sunscreen section not found');
    process.exit(1);
}

// Find the closing </section> of the SUNSCREEN section
const sunscreenEnd = html.indexOf('    </section>', sunscreenSectionStart);
if (sunscreenEnd === -1) {
    console.log('Sunscreen section end not found');
    process.exit(1);
}

// Remove from startMarker to the end of SUNSCREEN section (inclusive)
const before = html.substring(0, startIndex);
const after = html.substring(sunscreenEnd + '    </section>'.length);

// Also remove the CTA BANNER section that comes after (we'll keep it)
// Actually, let me check what comes after...
// The CTA BANNER should be preserved

const newHtml = before + after;

// Now let's also remove the product modals that are at the bottom of the file
// These are the old modal overlays with ids like detail-1, detail-2, etc.
// But wait, those might be needed. Let me check if they're still used.

// Actually, looking at the file, the modals are used for the product cards in the category sections we just removed.
// So we should remove those modals too.

// Find and remove modals
const modalStart = newHtml.indexOf('<!-- PRODUCT MODALS FOR BRANDS PAGE -->');
if (modalStart !== -1) {
    const modalEnd = newHtml.indexOf('</main>', modalStart);
    if (modalEnd !== -1) {
        const beforeModals = newHtml.substring(0, modalStart);
        const afterModals = newHtml.substring(modalEnd);
        const finalHtml = beforeModals + '    <!-- PRODUCT MODALS REMOVED -->\n' + afterModals;
        fs.writeFileSync(filePath, finalHtml);
        console.log('Removed category sections and modals from brands.html');
    } else {
        fs.writeFileSync(filePath, newHtml);
        console.log('Removed category sections from brands.html (no modals found after)');
    }
} else {
    fs.writeFileSync(filePath, newHtml);
    console.log('Removed category sections from brands.html');
}
