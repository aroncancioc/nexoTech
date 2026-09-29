// Detalle: resuelve una noticia por id, muestra contenido ampliado y permite marcar favoritos.
(async function () {
  const { getNewsById, isFavorite, toggleFavorite } = window.NexoData;
  const { formatDate, initGlobalUI, toast, escapeHtml } = window.NexoUI;
  initGlobalUI();

  const id = new URLSearchParams(location.search).get('id') || 1;
  const item = await getNewsById(id);
  const target = document.querySelector('#article-root');

  if (!item) {
    target.innerHTML = '<div class="empty-state"><h3>Noticia no encontrada</h3><p>La noticia pudo haber sido eliminada desde el módulo de gestión.</p><a class="btn btn-primary" href="noticias.html">Volver a noticias</a></div>';
    return;
  }

  document.title = `${item.titulo} | NexoTech`;
  const paragraphs = Array.isArray(item.contenido) ? item.contenido : [item.resumen];
  const firstHalf = paragraphs.slice(0,2).map(p => `<p>${escapeHtml(p)}</p>`).join('');
  const secondHalf = paragraphs.slice(2).map(p => `<p>${escapeHtml(p)}</p>`).join('');
  const keyPoints = (item.puntosClave || []).map(point => `<li>${escapeHtml(point)}</li>`).join('');
  const fallback = escapeHtml(item.imagenFallback || 'assets/img/innovacion.svg');
  const credit = item.fuenteImagen
    ? `<p class="image-credit">Imagen relacionada: <a href="${escapeHtml(item.fuenteImagen)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.creditoImagen || 'fuente externa')}</a></p>`
    : '';

  target.innerHTML = `<article class="article">
    <div class="breadcrumbs"><a href="noticias.html">Noticias</a> / <a href="noticias.html?categoria=${encodeURIComponent(item.categoria)}">${escapeHtml(item.categoria)}</a></div>
    <span class="eyebrow">${escapeHtml(item.categoria)}</span>
    <h1>${escapeHtml(item.titulo)}</h1>
    <p class="article-deck">${escapeHtml(item.resumen)}</p>
    <div class="article-topline">
      <span class="muted">${formatDate(item.fecha)} · ${item.lectura || 5} min de lectura</span>
      <button id="detail-fav" class="btn btn-secondary">${isFavorite(item.id) ? '♥ Quitar de favoritos' : '♡ Guardar en favoritos'}</button>
    </div>
    <img class="article-cover" src="${escapeHtml(item.imagen)}" alt="Imagen relacionada con ${escapeHtml(item.titulo)}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fallback}'">
    ${credit}
    <div class="article-body">
      <h2>Qué está pasando</h2>
      ${firstHalf}
      ${keyPoints ? `<aside class="key-points"><h3>Claves para entenderlo</h3><ul>${keyPoints}</ul></aside>` : ''}
      <h2>Qué significa en la práctica</h2>
      ${secondHalf || `<p>${escapeHtml(item.resumen)}</p>`}
      <div class="article-actions">
        <a class="btn btn-secondary" href="noticias.html?categoria=${encodeURIComponent(item.categoria)}">Ver más de ${escapeHtml(item.categoria)}</a>
        <a class="btn btn-primary" href="noticias.html">Volver a noticias</a>
      </div>
    </div>
  </article>`;

  document.querySelector('#detail-fav').addEventListener('click', e => {
    const active = toggleFavorite(item.id);
    e.currentTarget.textContent = active ? '♥ Quitar de favoritos' : '♡ Guardar en favoritos';
    toast(active ? 'Noticia guardada en favoritos' : 'Noticia eliminada de favoritos');
  });
})();
