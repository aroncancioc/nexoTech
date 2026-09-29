// Gestión: implementa crear y eliminar noticias mediante localStorage.
(async function () {
  const { getAllNews, createNews, deleteNews, resetDemoData } = window.NexoData;
  const { formatDate, initGlobalUI, escapeHtml, toast } = window.NexoUI;
  initGlobalUI();
  const tbody = document.querySelector('#admin-body');
  const form = document.querySelector('#news-form');

  async function render(){
    const all = await getAllNews();
    tbody.innerHTML = all.map(item => {
      const fallback = escapeHtml(item.imagenFallback || 'assets/img/innovacion.svg');
      return `<tr>
        <td><div class="admin-title-cell"><img class="admin-thumb" src="${escapeHtml(item.imagen)}" alt="" onerror="this.onerror=null;this.src='${fallback}'"><strong>${escapeHtml(item.titulo)}</strong></div></td>
        <td><span class="eyebrow">${escapeHtml(item.categoria)}</span></td>
        <td>${formatDate(item.fecha)}</td>
        <td class="actions-cell"><a class="btn btn-secondary btn-sm" href="detalle.html?id=${item.id}">Ver</a><button class="btn btn-danger btn-sm" data-delete="${item.id}">Eliminar</button></td>
      </tr>`;
    }).join('');
    tbody.querySelectorAll('[data-delete]').forEach(b=>b.addEventListener('click',()=>{
      if(confirm('¿Eliminar esta noticia?')){ deleteNews(b.dataset.delete); toast('Noticia eliminada'); render(); }
    }));
    document.querySelector('#admin-count').textContent=`${all.length} noticias`;
  }

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form));
    await createNews(data);
    form.reset();
    toast('Noticia creada correctamente');
    render();
  });
  document.querySelector('#reset-data').addEventListener('click',()=>{
    if(confirm('¿Restablecer los datos de demostración?')){ resetDemoData(); location.reload(); }
  });
  render();
})();
