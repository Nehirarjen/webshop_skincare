const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'product-detail');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const correctImage = '01_c937125e-10f6-4a67-bc32-984a5391d389.jpg?v=1753417916&w=500&q=80';
const wrongPattern = /CELLMAZING_Pore_Tightening_Mask_10ea-04\.jpg\?v=1767591188&w=500&q=80" alt="Torriden CELLMAZING Hyaluronic Acid Serum"/g;

let count = 0;
for (const file of files) {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Fix corrupted images for CELLMAZING Hyaluronic Acid Serum
    // Pattern: has both correct and wrong URL concatenated
    const corruptedPattern = /01_c937125e-10f6-4a67-bc32-984a5391d389\.jpg\?v=1753417916CELLMAZING_Pore_Tightening_Mask_10ea-04\.jpg\?v=1767591188&w=500&q=80" alt="Torriden CELLMAZING Hyaluronic Acid Serum"[^>]*>/;
    
    if (corruptedPattern.test(content)) {
        content = content.replace(corruptedPattern, `01_c937125e-10f6-4a67-bc32-984a5391d389.jpg?v=1753417916&w=500&q=80" alt="Torriden CELLMAZING Hyaluronic Acid Serum" />`);
        fs.writeFileSync(filepath, content);
        count++;
        console.log('Fixed:', file);
    }
}
console.log('Total fixed:', count);