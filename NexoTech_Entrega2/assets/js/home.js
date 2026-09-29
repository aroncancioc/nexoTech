// Home: carga la noticia principal y las tarjetas destacadas desde el catálogo.
(async function () {
  const { getAllNews } = window.NexoData;
  const { newsCard, wireFavoriteButtons, initGlobalUI } = window.NexoUI;
  initGlobalUI();

  const all = await getAllNews();
  const hero = all.find(x => x.destacada) || all[0];
  if (hero) {
    document.querySelector('#hero-title').textContent = hero.titulo;
    document.querySelector('#hero-summary').textContent = hero.resumen;
    document.querySelector('#hero-category').textContent = hero.categoria;
    document.querySelector('#hero-link').href = `detalle.html?id=${hero.id}`;
    const img = document.querySelector('#hero-image');
    img.src = hero.imagen;
    img.alt = `Imagen de ${hero.categoria}`;
    img.referrerPolicy = 'no-referrer';
    img.onerror = function () { this.onerror = null; this.src = hero.imagenFallback || 'assets/img/story-01.svg'; };
  }

  const featured = all.filter(x => x.id !== hero?.id).slice(0,3);
  document.querySelector('#latest-grid').innerHTML = featured.map(newsCard).join('') || '<div class="empty-state"><h3>No hay noticias disponibles</h3></div>';
  wireFavoriteButtons();
})();
