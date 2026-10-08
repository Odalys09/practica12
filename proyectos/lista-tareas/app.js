const CLAVE = 'tareas-odalys';
const form = document.querySelector('#form-tarea');
const entrada = document.querySelector('#texto');
const lista = document.querySelector('#lista');
const resumen = document.querySelector('#resumen');
const vacio = document.querySelector('#vacio');

let tareas = [];
try { tareas = JSON.parse(localStorage.getItem(CLAVE)) || []; } catch { tareas = []; }

function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(tareas)); } catch { /* sin almacenamiento */ }
}

function pintar() {
  lista.replaceChildren();
  tareas.forEach((t) => {
    const li = document.createElement('li');
    li.className = 'tarea' + (t.hecha ? ' hecha' : '');

    const caja = document.createElement('input');
    caja.type = 'checkbox';
    caja.id = `t-${t.id}`;
    caja.checked = t.hecha;
    caja.addEventListener('change', () => { t.hecha = caja.checked; guardar(); pintar(); });

    const etiqueta = document.createElement('label');
    etiqueta.htmlFor = caja.id;
    etiqueta.textContent = t.texto;

    const borrar = document.createElement('button');
    borrar.type = 'button';
    borrar.className = 'borrar';
    borrar.textContent = 'Borrar';
    borrar.setAttribute('aria-label', `Borrar tarea: ${t.texto}`);
    borrar.addEventListener('click', () => {
      tareas = tareas.filter((x) => x.id !== t.id);
      guardar(); pintar(); entrada.focus();
    });

    li.append(caja, etiqueta, borrar);
    lista.append(li);
  });
  const pendientes = tareas.filter((t) => !t.hecha).length;
  resumen.textContent = tareas.length ? `${pendientes} pendiente(s) de ${tareas.length}.` : '';
  vacio.hidden = tareas.length > 0;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = entrada.value.trim();
  if (!texto) { entrada.focus(); return; }
  tareas.push({ id: Date.now(), texto, hecha: false });
  entrada.value = '';
  guardar(); pintar(); entrada.focus();
});

pintar();
