// Interactivity: dark toggle, contact form, privacy modal, inject news, toasts
document.addEventListener('DOMContentLoaded', function(){
  // set year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // dark toggle (corrigido: cambia tema + ícono + guarda preferencia)
  const toggle = document.getElementById('darkToggle');
  if (toggle) {
    const html = document.documentElement;
    const icon = toggle.querySelector("i");

    // Cargar tema guardado
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      html.setAttribute("data-theme", savedTheme);
      updateIcon(savedTheme);
    }

    toggle.addEventListener('click', function(){
      const isDark = html.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
      showToast('Tema ' + (isDark ? 'claro' : 'oscuro') + ' activado');
    });

    function updateIcon(theme) {
      if (theme === 'dark') {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-stars-fill');
      } else {
        icon.classList.remove('bi-moon-stars-fill');
        icon.classList.add('bi-sun-fill');
      }
    }
  }

  // privacy modal openers
  const openPrivacy = document.getElementById('openPrivacy');
  const openPrivacyFooter = document.getElementById('openPrivacyFooter');
  const privacyModal = new bootstrap.Modal(document.getElementById('privacyModal'));
  openPrivacy && openPrivacy.addEventListener('click', ()=>privacyModal.show());
  openPrivacyFooter && openPrivacyFooter.addEventListener('click', (e)=>{ e.preventDefault(); privacyModal.show();
  });

  // contact form
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();
      if(!name || !email || !msg){
        showToast('Por favor completa todos los campos.');
        return;
      }
      alert('Gracias, ' + name + '! Su mensaje ha sido enviado (simulado).');
      form.reset();
    });
  }

  // inject news sample
  const list = document.getElementById('newsList');
  if(list){
    const news = [
      {title:'LFH lanza nuevo servicio de DevOps', body:'Pipelines, IaC y despliegues seguros.'},
      {title:'Checklist de seguridad 2025', body:'Principales medidas para proteger aplicaciones.'},
      {title:'Caso de éxito: migración a la nube', body:'Reducción de costos y alta disponibilidad.'},
      {title:'Automatización de pruebas', body:'Mejora la calidad con testing continuo.'}
    ];
    news.forEach(n=>{
      const col = document.createElement('div');
      col.className = 'col-md-6';
      col.innerHTML = `<article class="p-3 card-dark rounded"><h5>${n.title}</h5><p class="text-muted">${n.body}</p><a href="#" class="hover-link">Leer más</a></article>`;
      list.appendChild(col);
    });
  }
});

// toast helper
function showToast(message){
  const container = document.getElementById('toastContainer');
  if(!container){ console.log('Toast:', message); return; }
  const t = document.createElement('div');
  t.className = 'toast align-items-center mb-2';
  t.setAttribute('role','alert');
  t.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button class="btn-close btn-close-white me-2 m-auto" onclick="this.closest('.toast').remove()"></button></div>`;
  container.appendChild(t);
  setTimeout(()=>t.remove(), 3500);
}

// cart helpers (ensure available)
function updateCartCount(){
  const c = document.getElementById('cartCount');
  if(!c) return;
  const cart = JSON.parse(localStorage.getItem('lfh_cart')||'[]');
  c.textContent = cart.length;
}

// showToast helper if not defined
if(typeof showToast !== 'function'){
  function showToast(msg){
    const container = document.getElementById('toastContainer');
    if(!container){ console.log(msg); return; }
    const t = document.createElement('div');
    t.className = 'toast align-items-center mb-2';
    t.setAttribute('role','alert');
    t.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button class="btn-close btn-close-white me-2 m-auto" onclick="this.closest('.toast').remove()"></button></div>`;
    container.appendChild(t);
    setTimeout(()=>t.remove(),3000);
  }
}
document.addEventListener('DOMContentLoaded', updateCartCount);
