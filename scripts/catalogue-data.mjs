import { products, categoryBySlug } from '../src/data/products.js';
import fs from 'node:fs';
fs.mkdirSync('tmp/pdfs', { recursive: true });
fs.writeFileSync('tmp/pdfs/products.json', JSON.stringify(products.map(p => ({ ...p, category: categoryBySlug[p.slug] })), null, 2));
