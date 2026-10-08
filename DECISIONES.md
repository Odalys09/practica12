# Decisiones de diseño — Odalys Rendón Peláez

## Secciones
Hero, Sobre mí, Proyectos, Habilidades, Formación y Contacto, numeradas 01–05.

## Paleta (rosa, azul claro, amarillo y negro)
- Fondo `hsl(200, 80%, 96%)` azul claro y texto negro `hsl(0, 0%, 8%)`.
- Rosa `hsl(330, 95%, 78%)` para botones y relleno (con texto negro).
- Rosa oscuro `hsl(330, 80%, 33%)` para enlaces y texto de color.
- Amarillo `hsl(48, 100%, 60%)` solo para decoración, sombras y foco.
- Modo oscuro: solo se cambian las variables en `.dark`.

Verificar de nuevo en WebAIM Contrast Checker antes de publicar.

## Tipografía
- Inter: texto y títulos.
- JetBrains Mono: fechas, etiquetas y números de sección.

## Layout
- Mobile-first: una columna en móvil; hero en 2 columnas desde 768px; proyectos en 2 y luego 3 columnas con Grid.
- Flexbox en cabecera y botones.
- Estilo gráfico: bordes negros gruesos, sombras sólidas sin desenfoque, foto con forma de arco.

## Accesibilidad
Skip link, `:focus-visible`, `aria-expanded` en el menú, errores del formulario con `role="alert"`, `prefers-reduced-motion`.

## Proyectos
Cada tarjeta lleva a su demo dentro de `proyectos/` (Sobre mí, Grid y Flexbox, Lista de tareas).

## Pendiente
Cambiar `tu-usuario` y `tu-linkedin`, y agregar mi foto en `img/foto.jpg`.
