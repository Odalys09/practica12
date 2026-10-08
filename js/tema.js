/* Aplica el tema guardado (claro/oscuro) en las páginas de proyectos */
let tema = null;
try { tema = localStorage.getItem('theme'); } catch { /* sin almacenamiento */ }
const oscuro = tema ? tema === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', oscuro);
