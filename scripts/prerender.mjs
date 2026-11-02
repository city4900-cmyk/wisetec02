import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { render, routes, SITE_URL, pageSchema } from '../.ssr/entry-server.js';
const template = await readFile('dist/index.html','utf8');
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const route of routes) {
 let html=template.replaceAll('https://wisetec.co.kr', SITE_URL).replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(route.title)}</title>`);
 for(const [attribute,key,value] of [ ['name','description',route.description],['property','og:title',route.title],['property','og:description',route.description],['property','og:url',SITE_URL+route.path],['name','twitter:title',route.title],['name','twitter:description',route.description] ]) {
  html=html.replace(new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`),`<meta ${attribute}="${key}" content="${escape(value)}" />`);
 }
 html=html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/,`<link rel="canonical" href="${SITE_URL+route.path}" />`);
 html=html.replace(/<script id="page-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,`<script id="page-schema" type="application/ld+json">${JSON.stringify(pageSchema(route)).replaceAll('<','\\u003c')}</script>`);
 html=html.replace('<div id="root"></div>',`<div id="root">${render(route.path)}</div>`);
 const target=join('dist',route.path,'index.html');await mkdir(dirname(target),{recursive:true});await writeFile(target,html);
}
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r=>`  <url><loc>${SITE_URL+r.path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml',sitemap);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await writeFile('dist/404.html',template.replace('<meta name="robots" content="index, follow" />','<meta name="robots" content="noindex, follow" />').replace('<div id="root"></div>','<main style="padding:60px"><h1>페이지를 찾을 수 없습니다</h1><a href="/">홈으로 이동</a></main>').replace(/<script type="module"[^>]*><\/script>/g,''));
await rm('.ssr',{recursive:true,force:true});
console.log(`Prerendered ${routes.length} pages and sitemap.`);
