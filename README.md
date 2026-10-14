# NexoTech - Entrega 3 (Angular)

Versión final de la plataforma académica de noticias tecnológicas NexoTech para el módulo Desarrollo de Front-end.

## Funcionalidades

- Home con noticia destacada, últimas noticias y categorías.
- Catálogo dinámico desde `public/data/noticias.json`.
- Filtros por categoría y búsqueda textual.
- Vista de detalle independiente para cada noticia.
- Favoritos persistentes con `localStorage`.
- Formulario de contacto con validaciones Angular.
- Mini CRUD para crear y eliminar noticias con persistencia local.
- Enrutamiento Angular y hash routing para compatibilidad con GitHub Pages.
- Imágenes asociadas a cada noticia y fallback local si una imagen externa falla.

## Tecnologías

- Angular 21.2.x (componentes standalone)
- TypeScript
- HTML y CSS
- Angular Router
- Reactive Forms y template binding
- HttpClient para leer JSON local
- localStorage

## Requisitos locales

- Node.js 20.19+, 22.12+ o 24+
- npm

## Ejecución local

```bash
npm install
npm start
```

Abrir `http://localhost:4200`.

## Build de producción

```bash
npm run build
```

## Build para GitHub Pages

El repositorio previsto es `https://github.com/aroncancioc/nexoTech`, por eso el script usa `/nexoTech/` como base href.

```bash
npm run build:github
```

El workflow `.github/workflows/deploy-pages.yml` puede publicar automáticamente la carpeta `dist/nexotech/browser` al hacer push a `main`, después de habilitar GitHub Pages con fuente **GitHub Actions**.

## Repositorio

https://github.com/aroncancioc/nexoTech
