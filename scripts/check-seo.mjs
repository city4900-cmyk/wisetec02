import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const sitemap=await readFile('dist/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]));
const titles=new Set();
for(const url of urls) {
 assert.equal(url.hash,'');
 const html=await readFile(`dist${url.pathname}index.html`,'utf8');
 const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),`Duplicate title: ${title}`);titles.add(title);
 assert(html.includes(`rel="canonical" href="${url.href}"`),url.href);
 assert(html.includes('id="root"><'),`Missing rendered body: ${url.href}`);
 const schema=JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert(schema['@graph'].some(item=>item.url===url.href));
 assert(html.includes('href="/services/construction/"'));
 for(const match of html.matchAll(/(?:src|href)="(\/figma-assets\/[^"?]+)(?:\?[^\"]*)?"/g)) await access('dist'+match[1]);
}
const construction=await readFile('dist/services/construction/index.html','utf8');
assert(construction.includes('건설기계点検')===false);
for(const text of ['건설기계 안전성 검사','검사 상담 준비사항','검사는 어떻게 진행되나요?','크롤러 크레인']) assert(construction.includes(text),text);
assert((construction.match(/<h1[ >]/g)||[]).length===1);
assert(!construction.includes('RT, UT, MT, PT, LT'));
assert((await readFile('dist/404.html','utf8')).includes('noindex, follow'));
console.log(`SEO checks passed: ${urls.length} pages, unique titles/canonicals, JSON-LD, local assets and construction content.`);
