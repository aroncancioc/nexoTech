import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const news = JSON.parse(readFileSync(resolve('public/data/noticias.json'), 'utf8'));
const ids = new Set();
const errors = [];
for (const item of news) {
  if (ids.has(item.id)) errors.push(`ID duplicado: ${item.id}`);
  ids.add(item.id);
  for (const field of ['titulo', 'categoria', 'resumen', 'imagen', 'imagenFallback']) {
    if (!item[field]) errors.push(`Noticia ${item.id}: falta ${field}`);
  }
  if (!Array.isArray(item.contenido) || item.contenido.length < 4) errors.push(`Noticia ${item.id}: se esperan al menos 4 párrafos.`);
  if (!Array.isArray(item.puntosClave) || item.puntosClave.length < 3) errors.push(`Noticia ${item.id}: se esperan al menos 3 puntos clave.`);
  if (item.imagenFallback && !existsSync(resolve('public', item.imagenFallback))) errors.push(`Noticia ${item.id}: fallback inexistente ${item.imagenFallback}`);
}
for (const trendId of [1, 8, 9, 12]) if (!ids.has(trendId)) errors.push(`El enlace destacado requiere la noticia ${trendId}.`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${news.length} noticias, IDs únicos, contenido ampliado y fallbacks locales válidos.`);
