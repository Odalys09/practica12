const raiz = document.documentElement;
const prefiereMenos = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== 1. Dark mode ===== */
const toggle = document.querySelector('#dark-mode-toggle');

function aplicarTema(oscuro) {
  raiz.classList.toggle('dark', oscuro);
  toggle.setAttribute('aria-pressed', String(oscuro));
  toggle.setAttribute('aria-label', oscuro ? 'Activar modo claro' : 'Activar modo oscuro');
}

let guardado = null;
try { guardado = localStorage.getItem('theme'); } catch { /* almacenamiento no disponible */ }
aplicarTema(guardado ? guardado === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);

toggle.addEventListener('click', () => {
  const oscuro = !raiz.classList.contains('dark');
  aplicarTema(oscuro);
  try { localStorage.setItem('theme', oscuro ? 'dark' : 'light'); } catch { /* ignorar */ }
});

/* ===== 2. Menú hamburguesa ===== */
const btnMenu = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

function alternarMenu(abrir) {
  menu.classList.toggle('abierto', abrir);
  btnMenu.setAttribute('aria-expanded', String(abrir));
  btnMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
}

btnMenu.addEventListener('click', () => alternarMenu(!menu.classList.contains('abierto')));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('abierto')) {
    alternarMenu(false);
    btnMenu.focus();
  }
});

/* ===== 3. Smooth scroll en el nav ===== */
document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener('click', (e) => {
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (!destino) return;
    e.preventDefault();
    destino.scrollIntoView({ behavior: prefiereMenos ? 'auto' : 'smooth' });
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
    alternarMenu(false);
  });
});

/* ===== 4. Formulario con validación ===== */
const form = document.querySelector('#form-contacto');
const estado = document.querySelector('#estado-form');

const reglas = {
  nombre: (v) => (v.trim().length < 2 ? 'Escribe tu nombre (mínimo 2 caracteres).' : ''),
  correo: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.com.'),
  mensaje: (v) => (v.trim().length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : ''),
};

function validarCampo(campo) {
  const mensaje = reglas[campo.name](campo.value);
  document.querySelector(`#error-${campo.id}`).textContent = mensaje;
  campo.setAttribute('aria-invalid', String(Boolean(mensaje)));
  campo.classList.toggle('valido', !mensaje);
  return !mensaje;
}

form.querySelectorAll('input, textarea').forEach((campo) => {
  campo.addEventListener('blur', () => validarCampo(campo));
  campo.addEventListener('input', () => {
    if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  estado.textContent = '';
  const campos = [...form.querySelectorAll('input, textarea')];
  const resultados = campos.map(validarCampo);
  const primerError = campos[resultados.indexOf(false)];

  if (primerError) {
    primerError.focus();
    return;
  }
  // Aquí conectarías un servicio real (Netlify Forms, Formspree, tu API con fetch)
  estado.textContent = '¡Mensaje enviado! Te responderé pronto.';
  form.reset();
  campos.forEach((c) => { c.classList.remove('valido'); c.removeAttribute('aria-invalid'); });
});
