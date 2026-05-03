import os
import re
import sys

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has the problem (recommendations inside the section)
    if 'Weitere Produkte' not in content:
        return False
    
    # Pattern: recommendations followed by closing </div></div></section>
    # We need to move them outside the section
    pattern = r'(<button type="submit" class="btn-primary">Jetzt bestellen</button>\s*</form>)\s*(<div class="product-detail-recs">.*?</div>\s*</div>\s*</div>\s*</section>)'
    
    # Check if this pattern exists
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return False
    
    # Fix: move recommendations after the </section>
    fixed = re.sub(pattern, r'\1\n        </div>\n      </div>\n    </section>\n    \2', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed)
    return True

# Get all HTML files in product-detail directory
dir_path = os.path.join(os.path.dirname(__file__), '..', 'product-detail')
count = 0
for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        if fix_file(filepath):
            count += 1
            print(f"Fixed: {filename}")

print(f"Total files fixed: {count}")