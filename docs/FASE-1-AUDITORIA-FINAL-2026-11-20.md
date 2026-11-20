# AB Studio — Fase 1: auditoría final de calidad

**Fecha:** 20 de noviembre de 2026.  
**Sitio:** https://ab-studio-portafolio.vercel.app/  
**Repositorio:** https://github.com/Ihan243/AB-Studio-Portafolio-  
**Rama exclusiva de QA:** \`qa/fase-1-auditoria-2026-11-20\` (sin merges a \`main\`).  
**Límite de alcance:** solo Fase 1. No se creó una base de datos, un CRM interno ni un panel de usuarios.

## Veredicto

**NO APROBADA PARA CIERRE / NO INICIAR FASE 2.** Se verificó un problema **Alto, abierto en producción**: las rutas \`/pricing/\` y \`/pricing.html\` devuelven HTTP 404 aunque ambos archivos y las redirecciones existen en el repositorio. No se debe afirmar que el sitio está libre de fallos altos hasta que Vercel publique correctamente el cambio y la comprobación HTTP termine en verde.

Las otras correcciones altas se prepararon **solo en la rama de QA** y se sometieron a pruebas de regresión.

## Cobertura y evidencia reproducible

| Área | Qué se verificó | Evidencia y limitación |
|---|---|---|
| Rutas y errores | 15 rutas locales, estado 404 para una ruta inexistente, respuesta 400 a URL mal codificada tras el parche | Chromium local; producción comprobada separadamente |
| Enlaces locales | 421 enlaces internos / 267 referencias a assets / 125 imágenes con atributo alt | Inspección estática de HTML; no implica que todo vínculo externo responda |
| Enlaces externos | Se identificaron cuatro demos de proveedores preview cuyo acceso no pudo verificarse | **No** se etiquetan como rotos sin respuesta HTTP confiable |
| Calculadoras | 7 casos de presupuesto básico (incluyen vacío, no-web, CRM Enterprise, plan inválido y módulos repetidos); cotizador web con planes inválidos y CRM; protección de doble cobro CRM | Pruebas de funciones JavaScript y flujo Chromium local |
| Contacto | Construcción y codificación de enlaces \`mailto:\` y \`wa.me\` con nombre, notas y selección; descripción vacía en el formulario clásico | No se envió correo real ni se simuló almacenamiento; esto corresponde a Fase 2 |
| Traducciones | Diccionarios EN/ES con 314 claves cada uno; cambio EN→ES de Pricing conserva el total en navegador | Una clave de la CTA móvil sigue sin estar en los diccionarios (Medio) |
| Móvil | 360, 390, 768 y 1024 px; prueba ampliada a 15 rutas × 4 tamaños en la rama QA | Chromium local. No es una certificación visual de dispositivos reales |
| Estados vacíos | Precio $0 en Pricing sin elementos; respuesta vacía en lista de desglose; inexistencia de listas persistidas | Futuras listas de solicitudes aún no existen; no se simula Fase 2 |
| Modo oscuro | Activación en navegador y fondo/etiquetas del formulario Business Management; contraste de Pricing con Lighthouse | Pruebas locales; auditoría de todos los estados interactivos requiere revisión manual adicional |
| Lighthouse / SEO | Home y Pricing en servidor local; título, descripción, canonical, Open Graph de las páginas principales | El informe Lighthouse **no** es una medición del dominio productivo |
| Producción | HTTP real con GitHub Actions, incluyendo rutas conocidas y 404 esperado | **Fallo reproducido**, detallado abajo |

**Ejecución de referencia final (código y reporte actualizados):** https://github.com/Ihan243/AB-Studio-Portafolio-/actions/runs/44708886284 — PASS en `static-checks`, `browser-checks` y `lighthouse-basics`; FAIL exclusivamente en `production-http-checks` (dos rutas de Pricing).

### Estados HTTP reales (20/11/2026, 09:13 UTC)

| URL | HTTP | Interpretación |
|---|---:|---|
| \`/\` | 200 | Correcto |
| \`/servicios/\` | 200 | Correcto |
| \`/pricing/\` | **404** | **Alto / abierto** |
| \`/pricing.html\` | **404** | **Alto / abierto** |
| \`/business-management/\` | 200 | Correcto |
| \`/crm/\` | 200 | Correcto |
| \`/definitely-unknown-qa-path/\` | 404 | Correcto: ruta desconocida |

### Lighthouse local

Resultados de la ejecución posterior a la corrección del contraste en Pricing (las puntuaciones de rendimiento pueden fluctuar):

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---:|---:|---:|---:|
| Home | 70 | 100 | 100 | 100 |
| Pricing | 86 | 98 | 100 | 100 |

Se confirmó que el aviso de contraste en Pricing desapareció. Quedan observaciones de Lighthouse de **orden de encabezados** y **nombre accesible frente a etiqueta visible** en Pricing (calificadas como Medio). Rendimiento local: imágenes sobredimensionadas, CSS bloqueante, árbol de dependencias y reflows.

## Hallazgos y acciones

| Elemento | Problema | Severidad | Cómo reproducirlo | Corrección propuesta / estado |
|---|---|---|---|---|
| **R01 · Pricing en Vercel** | \`/pricing/\` y \`/pricing.html\` dan HTTP 404 en producción. | **Alto** | Ejecutar \`curl -L -I https://ab-studio-portafolio.vercel.app/pricing.html\`, comparar con \`/servicios/\`. CI confirmó 404. | **ABIERTO EN PRODUCCIÓN.** Revisar despliegue activo, Output Directory=\`public\`, \`vercel.json\`, rama de producción, cuotas y Vercel Logs; publicar/validar un despliegue autorizado. No se toca \`main\` en esta fase. |
| **R02 · Precio duplicado** | El cotizador web podía sumar seguimiento básico de clientes y CRM completo, cobrando dos veces funciones relacionadas. | **Alto** | Activar Business Management + módulo seguimiento + CRM Starter/Growth/Enterprise en cotizador web. | **CORREGIDO EN RAMA.** La selección de CRM completo desactiva el módulo básico y lo excluye del total y el mensaje. Prueba de los tres niveles. |
| **R03 · Contraste en Pricing** | Características en tarjetas destacadas con contraste ~1.27:1; leyenda pequeña del logo ~4.19:1. | **Alto** | Ejecutar Lighthouse local sobre \`/pricing.html\` antes del parche. | **CORREGIDO EN RAMA Y VALIDADO EN CI.** Colores de texto directos con contraste suficiente; Lighthouse ya no marca \`color-contrast\`. |
| **R04 · Errores HTTP del servidor local** | Un \`%ZZ\` en URL podía lanzar \`URIError\` fuera del control de errores del servidor Node. | **Alto** | Solicitar \`/bad%ZZ\` al \`server.js\` original. | **CORREGIDO EN RAMA.** Respuesta HTTP 400; prueba de que servidor sigue atendiendo \`/\`. **No es la ruta de producción estática de Vercel.** |
| **R05 · CTA móvil EN/ES** | La clave \`mobileCta\` aparece en HTML pero no en los diccionarios; el botón puede conservar texto inglés al seleccionar español. | Medio | Buscar \`data-copy="mobileCta"\` y compararlo con \`copy.es\` y \`copy.en\`. | Añadir traducciones EN/ES a la misma clave, después de aprobación para corregir medios. |
| **R06 · Demos externas** | Cuatro URLs de preview externas no se pudieron comprobar; pueden requerir autorización, caducar o fallar. | Medio / no confirmado | Abrir las demos de Cuervos Garden, HK, Curiel y Magnolia en sesión anónima. | Verificación manual de HTTP, login y capturas; sustituir solo las realmente rotas por URL pública o captura local. |
| **R07 · Accesibilidad Pricing** | Un subtítulo H4 salta niveles; la marca y el botón de idioma usan nombres accesibles que no incluyen el texto visible. | Medio | Ejecutar Lighthouse accessibility en \`/pricing.html\`: \`heading-order\` y \`label-content-name-mismatch\`. | Ajustar jerarquía semántica y nombres accesibles, sin rediseño, si se autoriza arreglar medios. |
| **R08 · Rendimiento** | Imágenes sobredimensionadas (logo 1024×1024 mostrado a ~39×39), CSS bloqueante y reflows; el resultado local más reciente fue 70 Home / 86 Pricing. | Medio | Lighthouse local; revisar \`image-delivery-insight\`, \`render-blocking-insight\`, LCP y \`forced-reflow-insight\`. | Versiones de imagen responsivas, CSS crítico y revisión de carga; no se modifica por regla de alcance. |
| **R09 · SEO de páginas legales** | Privacidad y Condiciones cuentan con title/description/canonical, pero no con todos los Open Graph/Twitter metadata de las páginas principales. | Medio | Revisar HTML de \`/privacidad/\` y \`/condiciones/\`. | Completar metadatos sociales si se aprueba corrección de medios. El contenido legal necesita revisión humana. |
| **R10 · Página 404** | 404 responde como error correctamente en local, pero su HTML básico carece de descripción y metadatos sociales. | Bajo | Leer \`public/404.html\` y visitar ruta desconocida. | Mantener \`noindex\` y añadir texto descriptivo únicamente si se desea. |
| **R11 · Prueba externa no disponible** | Los recursos de proveedores preview no se pudieron inspeccionar mediante herramientas de consulta web, no hay prueba de funcionamiento real. | Medio / riesgo | Abrir desde navegador anónimo o CI con pruebas URL individualizadas. | Completar validación antes de considerar aprobados enlaces externos; no inventar estados. |

## Verificaciones pendientes / criterios de aceptación

1. **Bloqueante (Alto):** resolver los dos HTTP 404 de Pricing en producción y ejecutar nuevamente \`production-http-checks\` con resultado PASS. Requiere revisar **Vercel** y el despliegue asociado, sin cambiar \`main\` directamente.
2. **Comprobado:** la última ejecución de Chromium pasó las **15 rutas × 4 anchos (60 visitas)** y los casos 400/404 del servidor local. Esta cobertura automatizada no reemplaza una revisión visual manual.
3. Verificación visual manual con capturas en 360, 390, 768 y 1024 px en navegadores/dispositivos representativos. Los asserts de ancho no garantizan por sí solos un diseño correcto.
4. Probar las cuatro demos externas desde sesión anónima y registrar resultados; no declararlas rotas sin prueba.
5. El formulario actual **no registra solicitudes** por diseño. Base de datos, notificaciones, antifraude del formulario persistente y panel privado pertenecen expresamente a Fase 2.
6. Confirmar antes de Fase 2 el destinatario del correo: el sitio actual utiliza \`sales.abstudio@gmail.com\`, mientras el requisito nuevo indica \`ventas.abstudio@gmail.com\`. No se sustituyó uno por otro silenciosamente.

## Rama y reproducción

\`\`\`bash
git fetch origin
git switch qa/fase-1-auditoria-2026-11-20
node scripts/smoke-test.js
node scripts/qa-phase1.test.js
# Para pruebas de Chromium:
npm install --no-save --package-lock=false playwright@1.56.1
npx playwright install chromium
node scripts/qa-phase1.browser.test.cjs
\`\`\`

Para Lighthouse, usa el workflow de GitHub Actions en \`.github/workflows/qa-phase1.yml\`; los JSON de resultados se conservan como artefactos de cada ejecución. No se necesitan llaves, bases de datos ni variables de entorno reales para esta fase. El runner utiliza únicamente el contenido de esta rama.

### Limitación y decisión

Los parches y las pruebas en la rama no son equivalentes a un despliegue productivo. No se ha obtenido evidencia de que Pricing funcione en Vercel. **Por eso Fase 1 no se puede cerrar y Fase 2 permanece bloqueada**. No se ha seleccionado stack, creado backend, conectado correo ni implementado el panel privado.
