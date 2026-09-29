// Favoritos: obtiene y renderiza la selección persistida en localStorage.
(async function () {
  const { getFavoriteNews } = window.NexoData;
  const { newsCard, wireFavoriteButtons, initGlobalUI } = window.NexoUI;
  initGlobalUI();
  async function render(){
    const items = await getFavoriteNews();
    document.querySelector('#fav-count').textContent = `${items.length} guardada${items.length===1?'':'s'}`;
    document.querySelector('#favorites-grid').innerHTML = items.length
      ? items.map(newsCard).join('')
      : `<div class="empty-state"><h3>Aún no tienes favoritos</h3><p>Guarda noticias desde Inicio, Noticias o Detalle para verlas aquí.</p><a href="noticias.html" class="btn btn-primary">Explorar noticias</a></div>`;
    wireFavoriteButtons(render);
  }
  render();
})();
