// Update: replace brand name SORA with SUNA and translate English terms to German in HTML files
// - Replacements are conservative: only replace subject strings, not within product names (assumed safe)
// - Translates: 
//   * SORA -> SUNA
//   * Moisturizer -> Feuchtigkeitscreme
// - Operates recursively from repo root
const fs = require('fs')
const path = require('path')

const rootDir = process.cwd()
let counts = {replacements: 0}

function walk(dir){
  const entries = fs.readdirSync(dir, {withFileTypes: true})
  for(const e of entries){
    const full = path.join(dir, e.name)
    if(e.isDirectory()){
      walk(full)
    } else if(e.isFile() && full.endsWith('.html')){
      let content = fs.readFileSync(full, 'utf8')
      // Replace brand name SORA -> SUNA (case-sensitive, all caps preserved)
      if(content.includes('SORA')){
        content = content.replace(/SORA/g, 'SUNA')
        counts.replacements = (counts.replacements || 0) + (content.match(/SUNA/g) ? content.match(/SUNA/g).length : 0)
      }
      // Replace English undertitle Moisturizer with German Feuchtigkeitscreme
      if(content.includes('Moisturizer')){
        content = content.replace(/Moisturizer/g, 'Feuchtigkeitscreme')
        counts.replacements = (counts.replacements || 0) + (content.match(/Feuchtigkeitscreme/g) ? content.match(/Feuchtigkeitscreme/g).length : 0)
      }
      // If changes occurred, write back
      if(content !== fs.readFileSync(full, 'utf8')){
        fs.writeFileSync(full, content, 'utf8')
      }
    }
  }
}

walk(rootDir)
console.log('Brand/L10n update completed. Replacements counted (approx):', counts.replacements || 0)
