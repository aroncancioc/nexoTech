// Contacto: valida campos obligatorios, formato de correo y longitud del mensaje.
(function () {
  window.NexoUI.initGlobalUI();
  const form = document.querySelector('#contact-form');
  const fields = ['nombre','correo','asunto','mensaje'];
  function setError(name,msg=''){ document.querySelector(`[data-error="${name}"]`).textContent=msg; }
  function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  form.addEventListener('submit',e=>{
    e.preventDefault(); let ok=true; fields.forEach(f=>setError(f));
    const data=Object.fromEntries(new FormData(form));
    if(!data.nombre.trim()){setError('nombre','El nombre es obligatorio.');ok=false;}
    if(!data.correo.trim()){setError('correo','El correo es obligatorio.');ok=false;}else if(!validEmail(data.correo)){setError('correo','Ingresa un correo válido.');ok=false;}
    if(!data.asunto){setError('asunto','Selecciona un asunto.');ok=false;}
    if(!data.mensaje.trim()){setError('mensaje','El mensaje es obligatorio.');ok=false;}else if(data.mensaje.trim().length<10){setError('mensaje','Escribe al menos 10 caracteres.');ok=false;}
    if(ok){form.reset();document.querySelector('#contact-success').classList.add('show');setTimeout(()=>document.querySelector('#contact-success').classList.remove('show'),5000);}
  });
})();
