# AB Studio — Sitio Web Oficial

> **Sitios web, sistemas de reservas y automatización práctica**  
> Estudio digital independiente · Costa Rica · Estados Unidos & México.

Este proyecto contiene el sitio web oficial de **AB Studio**, construido a partir de los diseños y especificaciones de `AB_Studio_Propuesta (1)`.

---

## 🚀 Características Principales

- **Diseño Editorial & Minimalista**: Tipografía combinada (Georgia + Inter) con espaciados cuidados y paleta cálida (papel crema, tinta, salvia y taupe).
- **100% Bilingüe (Inglés & Español)**: Selector instantáneo con persistencia automática en `localStorage` y detección de idioma del navegador.
- **Modo Oscuro (Dark / Light)**: Conmutador de tema con persistencia en `localStorage`.
- **Rutas Limpias (SPA Navigation)**: Soporte de rutas (`/`, `/servicios/`, `/sitios-web/`, `/sistemas/`, `/seo/`, `/automatizacion/`, `/empresa/`, `/blog/`) con desplazamiento suave.
- **Portafolio de Demostraciones**: 6 conceptos interactivos (Restaurante, Sistema de reservas, Repuestos automotrices, Florería, Estudio de interiores, Negocio local).
- **Planes Claros & SEO**: Estructura de precios transparente (Básico, Profesional, Personalizado) y paquete de SEO Local.
- **Canales de Contacto Directos**: Enlaces directos a WhatsApp empresarial y correo electrónico con mensajes preconfigurados.
- **Rendimiento Optimizado**: Assets de identidad visual desacoplados (PNGs limpios en `assets/brand/`), reduciendo el peso de la página en más de un 87% y permitiendo carga ultra rápida.

---

## 📂 Estructura del Proyecto

```text
AB_Studio/
├── index.html          # Punto de entrada principal optimizado
├── code.html           # Archivo de diseño original entregado
├── server.js           # Servidor Node.js ligero con soporte SPA
├── package.json        # Configuración de scripts y metadatos
├── vercel.json         # Configuración para despliegue en Vercel
├── DESIGN.md           # Guía de diseño, paleta y tipografía
├── screen.png          # Captura del diseño original
└── assets/
    └── brand/          # Identidad corporativa, logos e isotipos
        ├── logo.jpg
        ├── favicon.png
        ├── isotipo.png
        ├── 01_Logotipo_Principal.png
        ├── 03_Oso_Perezoso_Mascota.png
        ├── 05_Isotipo_Perezoso.png
        ├── 06_Icono_Aplicacion.png
        └── AB_Studio_Icono_Perezoso_4K.png
```

---

## 🛠️ Ejecución Local

Para levantar el servidor de desarrollo local:

```bash
npm start
# o alternativamente:
node server.js
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 🌐 Despliegue en Vercel / Producción

El proyecto está configurado para desplegarse instantáneamente en **Vercel** o cualquier hosting estático (Netlify, Cloudflare Pages, GitHub Pages):

- Solo sube la carpeta o conecta el repositorio a Vercel.
- `vercel.json` ya incluye la reescritura de rutas para mantener la navegación SPA intacta.
