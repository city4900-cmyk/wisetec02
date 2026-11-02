import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
export { routes, SITE_URL, pageSchema } from './seo';
export function render(path: string) { return renderToString(<App initialPath={path} />); }
