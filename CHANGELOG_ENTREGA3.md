# Cambios de la Entrega 3

- Migración de la versión multipágina HTML/CSS/JavaScript a Angular 21.2.x.
- Uso de componentes standalone para Header, Footer y tarjetas de noticias.
- Rutas Angular para Inicio, Noticias, Detalle, Favoritos, Gestión y Contacto.
- Interpolación, property binding, event binding y two-way binding (`ngModel`).
- Formularios reactivos con validaciones en Contacto y Gestión.
- Lectura del catálogo desde `public/data/noticias.json` mediante `HttpClient`.
- Persistencia de favoritos y mini CRUD con `localStorage`.
- Hash routing para reducir problemas de rutas al publicar en GitHub Pages.
- Workflow de GitHub Actions incluido para compilar y desplegar la aplicación.
- Script `npm run validate` para comprobar IDs, contenido mínimo y recursos fallback.

## Corrección de actualización al primer clic
- Se agregó `ChangeDetectorRef.detectChanges()` después de las cargas asíncronas de noticias en Inicio, Noticias, Detalle, Favoritos y Gestión.
- Se fuerza la actualización de la vista inmediatamente después de resolver `HttpClient/async-await`, evitando que el usuario tenga que generar un segundo evento de clic.
