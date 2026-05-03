const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'product-detail');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if file has "Weitere Produkte" but not "Empfohlene Produkte"
    if (content.includes('Weitere Produkte') && !content.includes('Empfohlene Produkte')) {
        // Check if recommendations are inside the section (before </section></main>)
        // Find pattern: </section> comes after recommendations
        const pattern = /(<button type="submit" class="btn-primary">Jetzt bestellen<\/button>\s*<\/form>)\s*(<div class="product-detail-recs">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;
        
        if (pattern.test(content)) {
            content = content.replace(pattern, '$1\n        </div>\n      </div>\n    </section>\n    $2');
            fs.writeFileSync(filepath, content);
            count++;
            console.log('Fixed:', file);
        }
    }
}
console.log('Total fixed:', count);