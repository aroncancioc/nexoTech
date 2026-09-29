# NexoTech - Entrega 2: Prototipo funcional

Proyecto académico del módulo **Desarrollo de Front-end**. Esta versión implementa en HTML, CSS y JavaScript el diseño de NexoTech y corrige la navegación para que el catálogo, los filtros y cada noticia funcionen también al abrir los archivos directamente.

## Funcionalidades
- Home con noticia principal, últimas noticias, categorías y Radar NexoTech.
- Catálogo con **12 noticias tecnológicas** cargadas desde `data/noticias.json` cuando el proyecto se ejecuta por HTTP.
- Respaldo de datos embebido en JavaScript para que el prototipo también funcione si se abre con doble clic (`file://`).
- Filtros reales por categoría mediante `?categoria=`.
- Búsqueda por palabra clave mediante `?buscar=`.
- Vista de detalle mediante `?id=`: cada enlace abre la noticia correspondiente.
- Artículos ampliados con cuatro bloques de contenido y puntos clave.
- Favoritos persistidos con `localStorage`.
- Formulario de contacto con validaciones y mensaje de confirmación.
- Mini CRUD: creación y eliminación de noticias mediante almacenamiento local.
- Diseño responsive para escritorio, tablet y móvil.

## Imágenes editoriales
Cada una de las 12 noticias tiene una **imagen relacionada con su tema**. Las imágenes se cargan desde fuentes web y la vista de detalle muestra el crédito y enlace a la fuente original. Si una imagen externa no está disponible, el prototipo usa una ilustración local como respaldo.

Temas visuales incluidos:
- IA aplicada al desarrollo de software.
- Ciberseguridad y trabajo remoto.
- IA ejecutada en smartphones y dispositivos.
- Desarrollo Front End.
- Automatización de flujos de trabajo.
- Aprendizaje de programación.
- Copilotos de IA para productividad.
- Passkeys y autenticación biométrica.
- Redes Wi-Fi en el hogar.
- Progressive Web Apps.
- Gemelos digitales en industria.
- Portafolio de desarrollador.

## Cómo ejecutar
### Opción recomendada - VS Code
Instalar **Live Server**, abrir `index.html` y seleccionar **Open with Live Server**. De esta forma se verifica también el requisito de renderizado desde `data/noticias.json`.

### Opción con Python
Desde la raíz del proyecto:
```bash
python -m http.server 8000
```
Abrir `http://localhost:8000`.

### Opción rápida - doble clic
También puede abrirse `index.html` directamente. En ese caso NexoTech utiliza el respaldo de datos incluido en `data-service.js` para que filtros, detalle, favoritos y navegación sigan funcionando.

## Estructura
```text
NexoTech_Entrega2/
├── index.html
├── noticias.html
├── detalle.html
├── favoritos.html
├── gestion.html
├── contacto.html
├── assets/
│   ├── css/styles.css
│   ├── img/*.svg        # respaldos locales
│   └── js/*.js
├── data/noticias.json
└── README.md
```

## GitHub
Antes de entregar, publicar esta carpeta en un repositorio de GitHub y copiar su URL en el informe académico.

Ejemplo:
```bash
git remote add origin https://github.com/USUARIO/nexotech-front-end.git
git branch -M main
git push -u origin main
```

## Figma
Diseño de referencia: https://www.figma.com/design/B3h70s02ImsLMqULFcbwvj

## Nota académica
Los textos de NexoTech son contenidos explicativos originales creados para demostrar el funcionamiento del prototipo. No se presentan como publicaciones de un medio periodístico real. Las imágenes externas se utilizan como recursos visuales relacionados y cada artículo conserva el enlace de crédito a su fuente.
