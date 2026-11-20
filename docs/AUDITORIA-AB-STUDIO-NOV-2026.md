# Autopsia de AB Studio — revisión del 19 de noviembre de 2026

## Alcance y limitación

Revisión del código fuente de AB Studio en GitHub, enfocada en navegación, claridad comercial, formularios, bilingüismo, accesibilidad, páginas Business Management y CRM, demostraciones, metadatos y pruebas. La web desplegada en Vercel no pudo abrirse desde el entorno de revisión: **no se certificaron las capturas visuales, la apariencia final en dispositivos ni la publicación**.

## Hallazgos y cambios aplicados

| Prioridad | Hallazgo | Corrección |
| --- | --- | --- |
| Alta | Business Management y CRM tenían páginas propias, pero el estimador de Business Management seguía permitiendo seleccionar un CRM completo en la misma página. | En la cotización combinada de web + Business Management, sustituir la lista de planes CRM por un enlace a la página independiente de CRM. El CRM sigue conservando su propia tabla de precios. |
| Alta | Las páginas independientes incluían un formulario web genérico, oculto bajo la vista de contacto. | Mostrar un formulario dedicado en cada página; ocultar la sección de contacto redundante y dirigir a él los CTA. |
| Alta | El formulario de CRM incluía preguntas sobre contratar una web y un panel administrativo, no relacionadas con el servicio principal. | Ajustar el contenido al seguimiento de clientes, preseleccionar CRM y ocultar extras de web. El correo generado ya no añade información de panel administrativo en consultas CRM. |
| Alta | El formulario de Business Management mencionaba únicamente una web y no las operaciones que el cliente quiere gestionar. | Añadir textos específicos de inventario, pedidos, productos y módulos en español e inglés, con los módulos visibles de forma inicial en el formulario. |
| Alta | Las páginas nuevas solo tenían envío por WhatsApp en el formulario; el código de envío por correo ya existía. | Añadir botones separados **Correo** y **WhatsApp**, sin enviar datos automáticamente. |
| Alta | En varias páginas quedaban enlaces de demostración de Home Keetchen y Refaccionaria Curiel alojados en entornos de ChatGPT, que podían exigir inicio de sesión. | Sustituir esos enlaces por archivos de captura locales ya existentes en el portafolio. |
| Media | Los enlaces de demos externos en Home y Projects no siempre ofrecían una alternativa fiable. | Añadir botones para abrir la captura local de Cuervos Garden y Florería Magnolia; conservar las demostraciones externas como opción secundaria claramente identificada. |
| Media | Business Management usaba dos encabezados principales (H1), uno estático y otro generado. | Mantener el H1 de la portada y convertir el título de la demostración interna a H2, conservando su estilo. |
| Media | Los servicios nuevos dependían completamente de JavaScript para explicar sus características. | Añadir contenido alternativo en `<noscript>` con descripción y correo de contacto. |
| Media | El menú desplegable no indicaba programáticamente el destino activo. | Añadir `aria-current="page"` y estilo de estado activo para cada enlace de servicio. |
| Media | El título y la descripción de las etiquetas de Twitter no se actualizaban en la misma lógica que otras etiquetas dinámicas. | Sincronizar esos metadatos al cargar cada ruta. |

## Elementos preservados

- Business Management y CRM siguen en **páginas distintas**: `/business-management/` y `/crm/`.
- Se mantienen las tarifas web y los planes de CRM existentes.
- Business Management sigue siendo un complemento opcional con módulos cotizados por separado. El estimador web + panel es orientativo y **no representa el precio final de los módulos**.
- Se conservan las versiones en inglés y español, el estilo visual, las demostraciones internas, el portafolio y las opciones de contacto sin envío automático.
- Los botones de demostraciones externas se conservan donde había versiones interactivas; su disponibilidad no está garantizada.

## Verificaciones del código

- Sintaxis JavaScript validada para el archivo principal y el script de pruebas.
- Comprobación del estimador en inglés y español: CRM es una opción independiente en la vista Business Management; el estimador web general conserva las opciones CRM.
- Comprobación de estructura de las dos páginas nuevas, presencia de botones Correo / WhatsApp y contenido `noscript`.
- Se ampliaron las pruebas de regresión en `scripts/smoke-test.js` para enlaces de capturas, CTAs, rutas y contenido.
- **No se afirma que se hayan ejecutado pruebas de navegador ni que el despliegue esté confirmado.**

## Pendiente de validación manual o autorización adicional

1. Probar la publicación en Vercel con enlaces directos a Home, Services, Business Management y CRM, incluyendo alternancia de idioma y enlaces profundos.
2. Revisar escritorio, tablet y móvil (por ejemplo 1440, 768 y 375 px), modo claro/oscuro, menú, formulario, accesibilidad y posibles desbordamientos.
3. Ejecutar Lighthouse/Core Web Vitals en el sitio publicado y medir imágenes, CSS y JavaScript. No inventar métricas de rendimiento.
4. Comprobar una a una las demostraciones externas: algunas podrían ser privadas, requerir acceso o dejar de estar disponibles.
5. Considerar un formulario que envíe solicitudes directamente al correo desde un servicio autorizado. Hoy se abren borradores en el cliente de correo o WhatsApp; no existe un backend verificado para recepción directa.
6. Mantener un proceso de pruebas ejecutadas automáticamente en cada cambio; se añadieron aserciones, pero no se configuró ni verificó una pipeline CI.

## Criterio de aceptación

Un visitante debe poder descubrir cada servicio desde Home y Services; navegar a su URL independiente; entender qué ofrece, qué incluye y qué se cotiza por separado; pedir información en español o inglés por correo o WhatsApp; y consultar capturas de proyectos sin depender de una cuenta de ChatGPT.

---

Revisión de código y cambios elaborados sobre el repositorio `Ihan243/AB-Studio-Portafolio-`.
