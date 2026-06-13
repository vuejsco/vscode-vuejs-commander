const fs = require('node:fs');
const path = require('node:path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const nlsPath = path.join(__dirname, '..', 'package.nls.json');
const nlsEsPath = path.join(__dirname, '..', 'package.nls.es.json');

const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
const nls = JSON.parse(fs.readFileSync(nlsPath, 'utf8'));
const nlsEs = JSON.parse(fs.readFileSync(nlsEsPath, 'utf8'));

const referencedKeys = new Set(
  [...packageJson.matchAll(/%([^%]+)%/g)].map((match) => match[1]),
);

const nlsKeys = new Set(Object.keys(nls));
const nlsEsKeys = new Set(Object.keys(nlsEs));

const missingInNls = [...referencedKeys].filter((key) => !nlsKeys.has(key));
const missingInNlsEs = [...referencedKeys].filter((key) => !nlsEsKeys.has(key));
const extraInNls = [...nlsKeys].filter((key) => !referencedKeys.has(key));
const extraInNlsEs = [...nlsEsKeys].filter((key) => !referencedKeys.has(key));
const mismatchedEsKeys = [...nlsKeys].filter((key) => !nlsEsKeys.has(key));

let hasErrors = false;

function report(title, keys) {
  if (keys.length === 0) {
    return;
  }

  hasErrors = true;
  console.error(title);
  for (const key of keys.sort()) {
    console.error(`  - ${key}`);
  }
}

report('Missing package.nls.json keys:', missingInNls);
report('Missing package.nls.es.json keys:', missingInNlsEs);
report('Extra package.nls.json keys:', extraInNls);
report('Extra package.nls.es.json keys:', extraInNlsEs);
report('Keys missing from package.nls.es.json:', mismatchedEsKeys);

if (hasErrors) {
  process.exit(1);
}

console.log(`nls check passed (${referencedKeys.size} keys).`);
