// Noticias: renderiza el catálogo, filtros por categoría y búsqueda textual.
(async function () {
  const { getAllNews } = window.NexoData;
  const { newsCard, wireFavoriteButtons, initGlobalUI, escapeHtml, imageMarkup } = window.NexoUI;
  initGlobalUI();

  const grid = document.querySelector('#news-grid');
  const qInput = document.querySelector('#catalog-search');
  const wrap = document.querySelector('#category-filters');
  const showcase = document.querySelector('#story-showcase');
  const showcaseSide = document.querySelector('#story-showcase-side');
  const all = await getAllNews();
  const categories = ['Todas', ...new Set(all.map(x => x.categoria))];
  const params = new URLSearchParams(location.search);
  let active = params.get('categoria') || 'Todas';
  let query = params.get('buscar') || '';
  const legacyQ = params.get('q') || '';

  if (!query && legacyQ && categories.includes(legacyQ)) active = legacyQ;
  else if (!query && legacyQ && !params.get('categoria')) query = legacyQ;
  if (!categories.includes(active)) active = 'Todas';
  qInput.value = query;

  function categoryUrl(category) {
    const pieces = [];
    if (category !== 'Todas') pieces.push(`categoria=${encodeURIComponent(category)}`);
    if (query) pieces.push(`buscar=${encodeURIComponent(query)}`);
    return `noticias.html${pieces.length ? `?${pieces.join('&')}` : ''}`;
  }

  wrap.innerHTML = categories.map(category =>
    `<a class="category-btn ${category === active ? 'active' : ''}" href="${categoryUrl(category)}">${escapeHtml(category)}</a>`
  ).join('');

  function updateShowcase(items) {
    if (!showcase) return [];
    const shouldShow = active === 'Todas' && !query.trim() && items.length >= 3;
    showcase.hidden = !shouldShow;
    if (!shouldShow) return [];

    const [lead, ...side] = items.slice(0,3);
    const leadImage = document.querySelector('#lead-story-image');
    leadImage.src = lead.imagen;
    leadImage.alt = `Imagen representativa de ${lead.categoria}`;
    leadImage.referrerPolicy = 'no-referrer';
    leadImage.onerror = function(){ this.onerror = null; this.src = lead.imagenFallback || 'assets/img/story-01.svg'; };
    document.querySelector('#lead-story-category').textContent = lead.categoriaCorta || lead.categoria;
    const leadLink = document.querySelector('#lead-story-link');
    leadLink.textContent = lead.titulo;
    leadLink.href = `detalle.html?id=${lead.id}`;
    document.querySelector('.lead-story-media').href = `detalle.html?id=${lead.id}`;
    document.querySelector('#lead-story-summary').textContent = lead.resumen;

    showcaseSide.innerHTML = side.map(item => `
      <article class="side-story">
        <a class="side-story-media" href="detalle.html?id=${item.id}">${imageMarkup(item)}</a>
        <div>
          <span class="eyebrow">${escapeHtml(item.categoriaCorta || item.categoria)}</span>
          <h3><a href="detalle.html?id=${item.id}">${escapeHtml(item.titulo)}</a></h3>
          <p>${escapeHtml(item.resumen)}</p>
        </div>
      </article>`).join('');
    return items.slice(0,3).map(item => item.id);
  }

  function render() {
    const q = query.toLowerCase().trim();
    const filtered = all.filter(item =>
      (active === 'Todas' || item.categoria === active) &&
      (!q || `${item.titulo} ${item.resumen} ${item.categoria}`.toLowerCase().includes(q))
    );
    const pinnedIds = new Set(updateShowcase(filtered));
    const catalog = pinnedIds.size ? filtered.filter(item => !pinnedIds.has(item.id)) : filtered;
    grid.innerHTML = catalog.length
      ? catalog.map(newsCard).join('')
      : `<div class="empty-state"><h3>No encontramos noticias</h3><p>Prueba otra categoría o palabra clave.</p></div>`;
    wireFavoriteButtons();
    document.querySelector('#result-count').textContent = `${filtered.length} resultado${filtered.length === 1 ? '' : 's'}`;
  }

  document.querySelector('#catalog-form').addEventListener('submit', event => {
    event.preventDefault();
    const value = qInput.value.trim();
    const pieces = [];
    if (active !== 'Todas') pieces.push(`categoria=${encodeURIComponent(active)}`);
    if (value) pieces.push(`buscar=${encodeURIComponent(value)}`);
    location.href = `noticias.html${pieces.length ? `?${pieces.join('&')}` : ''}`;
  });

  render();
})();
