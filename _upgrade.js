/**
 * TGVIS — Batch Page Upgrader v2 (Node.js)
 * Upgrades ALL HTML pages to use dynamic navbar/footer injection.
 * Handles multiple footer/nav patterns found across the site.
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, 'pages');

function findHtmlFiles(dir) {
  let results = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) results = results.concat(findHtmlFiles(fullPath));
      else if (item.name.endsWith('.html')) results.push(fullPath);
    }
  } catch(e) { /* skip inaccessible dirs */ }
  return results;
}

const files = findHtmlFiles(PAGES_DIR);
console.log('Found ' + files.length + ' HTML files\n');
let updated = 0;

for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  let mod = false;
  const name = path.basename(file);

  // 1. Replace ANY hardcoded navbar (multiple patterns)
  const navPatterns = [
    /<nav class="navbar" id="navbar"><div class="navbar__overlay[\s\S]*?<\/nav>/g,
    /<nav class="navbar" id="navbar">\s*<div class="navbar__overlay[\s\S]*?<\/nav>/g
  ];
  for (const pat of navPatterns) {
    if (pat.test(c)) {
      c = c.replace(pat, '<nav class="navbar" id="navbar"></nav>');
      mod = true;
      console.log('  [NAV] ' + name);
      break;
    }
  }

  // 2. Replace ANY hardcoded footer
  const ftrPat = /<footer class="footer"><div[\s\S]*?<\/footer>/g;
  if (ftrPat.test(c)) {
    c = c.replace(ftrPat, '<footer class="footer"></footer>');
    mod = true;
    console.log('  [FTR] ' + name);
  }

  // 3. Add navbar.js if missing
  if (!c.includes('navbar.js')) {
    const rel = path.relative(PAGES_DIR, file);
    const depth = rel.split(path.sep).length - 1;
    const prefix = '../'.repeat(depth + 1);
    const tag = '  <script src="' + prefix + 'assets/js/navbar.js" defer></script>';
    if (c.includes('utils.js')) {
      c = c.replace(/(<script src="[^"]*utils\.js"[^>]*><\/script>)/, '$1\n' + tag);
      mod = true;
      console.log('  [JS]  ' + name + ' (depth ' + depth + ')');
    }
  }

  // 4. Remove old WhatsApp button
  c = c.replace(/\s*<a href="https:\/\/wa\.me\/[^"]*"[^>]*>[\s\S]*?<\/a>/g, function(m) {
    if (m.includes('whatsapp-btn')) { mod = true; console.log('  [WA]  ' + name); return ''; }
    return m;
  });

  if (mod) {
    fs.writeFileSync(file, c, 'utf8');
    updated++;
    console.log('  OK: ' + name + '\n');
  } else {
    console.log('  SKIP: ' + name + '\n');
  }
}
console.log('\nDone! Updated ' + updated + '/' + files.length);
