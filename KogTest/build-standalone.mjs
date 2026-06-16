// Build a dependency-free copy of instantaneous-speed.html by inlining JSXGraph.
// Run from repo root:  node public/embeds/build-standalone.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const dir = 'public/embeds';
const html = readFileSync(`${dir}/instantaneous-speed.html`, 'utf8');
const css  = readFileSync('node_modules/jsxgraph/distrib/jsxgraph.css', 'utf8');
// Only neutralize a literal "</script" so the library can't close our tag early.
// (Escaping all "</" would corrupt regex/string literals in the minified code.)
const js   = readFileSync('node_modules/jsxgraph/distrib/jsxgraphcore.js', 'utf8')
               .replace(/<\/script/gi, '<\\/script');

const out = html
  .replace(
    /<link rel="stylesheet" href="https:\/\/cdn[^>]*jsxgraph\.css[^>]*>/,
    `<style>\n${css}\n</style>`
  )
  .replace(
    /<script src="https:\/\/cdn[^>]*jsxgraphcore\.js[^>]*><\/script>/,
    `<script>\n${js}\n</script>`
  );

writeFileSync(`${dir}/instantaneous-speed.standalone.html`, out);
console.log('Wrote instantaneous-speed.standalone.html —', (out.length / 1024 | 0) + ' KB');
