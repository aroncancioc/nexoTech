// Utilidades de interfaz compartidas por todas las páginas de NexoTech.
(function () {
  function formatDate(value) {
    const d = new Date(value + 'T12:00:00');
    return new Intl.DateTimeFormat('es-CO', { day:'2-digit', month:'short', year:'numeric' }).format(d);
  }

  function escapeHtml(value='') {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function safeAttr(value='') { return escapeHtml(value); }

  function imageMarkup(item, className='', altPrefix='Imagen representativa de') {
    const src = safeAttr(item.imagen || item.imagenFallback || 'assets/img/innovacion.svg');
    const fallback = safeAttr(item.imagenFallback || 'assets/img/innovacion.svg');
    return `<img ${className ? `class="${className}"` : ''} src="${src}" alt="${safeAttr(altPrefix)} ${safeAttr(item.categoria || '')}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fallback}'">`;
  }

  function newsCard(item) {
    const active = window.NexoData.isFavorite(item.id);
    return `<article class="news-card">
      <a class="news-card-image" href="detalle.html?id=${item.id}" aria-label="Abrir ${escapeHtml(item.titulo)}">
        ${imageMarkup(item)}
      </a>
      <div class="news-card-body">
        <span class="eyebrow">${escapeHtml(item.categoriaCorta || item.categoria)}</span>
        <h3><a href="detalle.html?id=${item.id}">${escapeHtml(item.titulo)}</a></h3>
        <p>${escapeHtml(item.resumen)}</p>
        <div class="card-details"><span>${formatDate(item.fecha)}</span><span>${item.lectura || 4} min</span></div>
        <div class="news-meta">
          <a class="text-link" href="detalle.html?id=${item.id}">Leer noticia →</a>
          <button class="fav-btn ${active ? 'active' : ''}" data-favorite-id="${item.id}" aria-label="${active?'Quitar de':'Agregar a'} favoritos" title="Favorito">${active ? '♥' : '♡'}</button>
        </div>
      </div>
    </article>`;
  }

  function wireFavoriteButtons(onChange) {
    document.querySelectorAll('[data-favorite-id]').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const active = window.NexoData.toggleFavorite(btn.dataset.favoriteId);
        btn.classList.toggle('active', active);
        btn.textContent = active ? '♥' : '♡';
        btn.setAttribute('aria-label', active ? 'Quitar de favoritos' : 'Agregar a favoritos');
        toast(active ? 'Noticia guardada en favoritos' : 'Noticia eliminada de favoritos');
        if (onChange) onChange();
      });
    });
  }

  function toast(message) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className='toast';
      document.body.appendChild(t);
    }
    t.textContent=message;
    t.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer=setTimeout(()=>t.classList.remove('show'),2300);
  }

  function initGlobalUI() {
    const menu = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    menu?.addEventListener('click', () => nav?.classList.toggle('open'));
    document.querySelectorAll('[data-global-search]').forEach(form => form.addEventListener('submit', e => {
      e.preventDefault();
      const q = form.querySelector('input')?.value.trim();
      location.href = `noticias.html${q ? `?buscar=${encodeURIComponent(q)}` : ''}`;
    }));
  }

  window.NexoUI = { formatDate, escapeHtml, imageMarkup, newsCard, wireFavoriteButtons, toast, initGlobalUI };
})();
