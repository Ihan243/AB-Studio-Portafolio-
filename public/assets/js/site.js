/* Authoritative published starting rates. Every interactive estimate and pricing card reads from this object. */
const abPrices = Object.freeze({
  web: Object.freeze({basic:1100,professional:1500,premium:2500}),
  management: Object.freeze({
    base:{setup:750,monthly:49},
    catalog:{setup:250,monthly:10},
    inventory:{setup:400,monthly:20},
    orders:{setup:450,monthly:20},
    reports:{setup:250,monthly:10},
    booking:{setup:450,monthly:20},
    crm:{setup:300,monthly:15}
  }),
  crm: Object.freeze({
    starter:{min:900,max:1500,monthly:39},
    growth:{min:1500,max:3000,monthly:89},
    enterprise:{min:3000,max:null,monthly:199}
  }),
  seo:Object.freeze({setup:200,monthly:30}),
  nfc:Object.freeze({starting:49})
});
const abMoney = n => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const abCrmPrice = (tier,lang="en") => {
  const rate=abPrices.crm[tier];
  if(!rate)return "";
  return `${abMoney(rate.min)}${rate.max===null?"+":"–"+abMoney(rate.max)} + ${abMoney(rate.monthly)}${tier==="enterprise"?"+":""}/${lang==="es"?"mes":"mo"}`;
};

const copy = {
      en: {
        "systems.detailsTitle":"What a custom booking system can include",
        "systems.detailsIntro":"The exact features depend on how your business handles appointments, staff availability and customer requests.",
        "systems.f1title":"Reservation requests",
        "systems.f1body":"Collect dates, services and important details in a structured flow.",
        "systems.f2title":"Operations dashboard",
        "systems.f2body":"Review incoming requests and organize follow-up tasks in one place.",
        "systems.f3title":"Custom workflows",
        "systems.f3body":"Plan confirmation, change and cancellation steps around your team's process.",
        "automation.detailsTitle":"Where automation helps",
        "automation.detailsIntro":"Start by identifying repeated steps. We map the process before deciding what should be automated and what should stay manual.",
        "automation.f1title":"Structured inquiries",
        "automation.f1body":"Route information from forms into a clear follow-up process.",
        "automation.f2title":"Notifications",
        "automation.f2body":"Connect messages and reminders when they fit the workflow.",
        "automation.f3title":"Human control",
        "automation.f3body":"Keep review and approval steps for decisions that need a person.",
        "nav.pricing":"Pricing","pricing.compareCta":"Compare all prices and build your estimate ↗","nav.work":"Work",
        "work.viewAll":"See all projects",
        "services.viewAll":"Explore all services",
        "admin.serviceTitle":"Business Management","admin.serviceBody":"Manage products, inventory, orders and daily operations from an optional private dashboard attached to ANY website plan. Setup and modules are quoted separately.","admin.serviceLink":"Explore Business Management",
        "crm.serviceTitle":"CRM · Customer Follow-up","crm.serviceBody":"Track contacts, customer inquiries, opportunities and sales follow-ups in a dedicated CRM. Three separately priced plans include setup and monthly support.","crm.serviceLink":"Compare CRM plans",
        "nav.cta":"Book a consultation",
        "footer.privacy":"Privacy",
        "footer.terms":"Project terms",
        "faq.kicker":"Before we begin",
        "faq.title":"Clear answers.<br><em>Fewer surprises.</em>",
        "faq.intro":"Scope and timelines depend on the project. We confirm the important details in writing before development begins.",
        "faq.q1":"How long does a website take?",
        "faq.a1":"Timing depends on the number of pages, content readiness and requested features. We confirm the delivery milestones in your proposal.",
        "faq.q2":"Are domain and hosting included?",
        "faq.a2":"Hosting, domain registration and third-party services are quoted separately, with costs confirmed before you approve your project.",
        "faq.q3":"What counts as a revision?",
        "faq.a3":"Basic and Professional include two rounds of minor revisions. Additional work or a change of scope is discussed and quoted before proceeding.",
        "faq.q4":"Who owns the website after launch?",
        "faq.a4":"Ownership, account access, files and handoff are defined in your written project agreement before work begins.",
        "faq.q5":"Do you offer maintenance?",
        "faq.a5":"We can discuss updates and ongoing support. What is included and any recurring fee are set out separately in your proposal.",
        "faq.q6":"Can I request a custom system?",
        "faq.a6":"Yes. Booking, catalog and administrative features are scoped based on your workflow and quoted separately from standard website plans.",
        "faq.cta":"Ask about your project ↗",
        "plans.handoff":"Every quote confirms scope, delivery milestones, hosting, ongoing support, content responsibilities and site handoff before work begins.",
        "work.demoNote":"Some projects are interactive concepts or previews. Their availability may vary; only verified outcomes are published.",
        "inquiry.extraPlan":"Interested in a website plan?","inquiry.planAny":"Not sure yet","inquiry.planBasic":"Basic · $1,100+","inquiry.planProfessional":"Professional · $1,500+","inquiry.planPremium":"Premium · $2,500+","inquiry.adminAddon":"I would also like a Business Management dashboard","inquiry.moduleLegend":"What would you manage? (optional)","inquiry.moduleCatalog":"Catalog / products","inquiry.moduleInventory":"Inventory","inquiry.moduleOrders":"Orders","inquiry.moduleReports":"Sales reports","inquiry.moduleBookings":"Bookings","inquiry.moduleCustomers":"Customer follow-up","inquiry.typeLabel":"What would you like to build?",
        "inquiry.optionDefault":"Choose a service (optional)",
        "inquiry.optionWebsite":"Business website",
        "inquiry.optionBooking":"Booking or admin system",
        "inquiry.optionCatalog":"Digital catalog",
        "inquiry.optionSeo":"SEO and local visibility",
        "inquiry.optionOther":"Something else",
        "homeInquiry.note":"This opens WhatsApp with a prepared message; nothing is sent until you choose to send it there.",
        "brand.sub":"Web · Systems · Automation",
        "homeInquiry.kicker":"Let’s get started","homeInquiry.title":"Tell us what your website needs.","homeInquiry.intro":"Describe your business and what you want the site to help with. We’ll review your note and reply within one business day with next steps.","homeInquiry.label":"Describe the website you need","homeInquiry.placeholder":"Example: I run a dental clinic and want patients to request appointments online.","homeInquiry.pick1":"A campaign landing page","homeInquiry.pick2":"My business website","homeInquiry.pick3":"A digital product catalog","homeInquiry.send":"Continue in WhatsApp","homeInquiry.sendEmail":"Continue by email","homeInquiry.note":"Choose WhatsApp or email to open a prefilled draft. You decide when to send it.","homeInquiry.emailIntro":"Prefer email? Send us a note and tell us what kind of site you have in mind.","homeInquiry.reply":"We normally reply to new inquiries within one business day.",
        "a11y.skip":"Skip to main content","nav.home":"Home","nav.services":"Services","nav.serviceOverview":"All services","nav.serviceWeb":"Websites","nav.serviceSystems":"Booking systems","nav.serviceSeo":"SEO & local search","nav.serviceAutomation":"Automation","nav.serviceAdmin":"Business Management","nav.serviceCrm":"Customer CRM","nav.company":"Company","nav.blog":"Blog","nav.faq":"FAQ","nav.work":"Selected work","nav.plans":"Plans","nav.about":"About","nav.cta":"Start a project",
        "hero.eyebrow":"Independent digital studio · Serving the U.S.",
        "hero.title":"A better web presence.<br><em>Built to move business forward.</em>",
        "hero.body":"We create professional websites and connected business tools for growing companies across the U.S. Add Business Management to take control of products, orders and day-to-day tasks from one private dashboard.",
        "hero.primary":"Tell us about your project","hero.secondary":"Explore Business Management","hero.proof1":"7 website demos + 1 booking system","hero.proof2":"English + Spanish",
        "hero.seal":"Designed with<br>your business<br>in mind","hero.mockBrand":"AB STUDIO · WEB CONCEPT","hero.mockTitle":"Make your first impression count.","hero.mockCaption":"A clear digital home for the work you do best.","hero.mockCta":"Explore","hero.noteTitle":"A useful site, not just a pretty one.","hero.noteBody":"Websites · booking flows · automation",
        "statement.one":"Made for small and growing businesses","statement.two":"Serving small businesses across the United States","statement.three":"Websites, systems & automation",
        "bmHome.kicker":"FEATURED SERVICE / OPTIONAL WEBSITE ADD-ON","bmHome.title":"Your website brings customers.<br><em>Business Management gives you control.</em>","bmHome.intro":"Update products, manage inventory, review orders and follow daily operations from a private dashboard connected to your website. Built around the modules your business needs.","bmHome.point1":"Update prices and products yourself","bmHome.point2":"Organize orders and inventory","bmHome.point3":"Keep business information in one place","bmHome.action":"Explore Business Management","bmHome.secondary":"Add it to a website plan","bmHome.note":"Available with Basic, Professional or Premium. The dashboard is optional and quoted separately by modules.","bmHome.previewLabel":"BUSINESS OVERVIEW","bmHome.previewTitle":"Your business, organized.","bmHome.metric1":"Products","bmHome.metric2":"Orders","bmHome.metric3":"Tasks","bmHome.activity":"RECENT ACTIVITY","bmHome.row1":"Product price updated","bmHome.row2":"New order received","bmHome.row3":"Inventory reviewed","bmHome.demo":"CONCEPT PREVIEW · ILLUSTRATIVE DATA","services.kicker":"What we do","services.title":"Digital tools that<br>make work <em>easier.</em>","services.intro":"Business Management organizes daily operations; CRM tracks customer relationships and sales follow-ups. Choose each service separately, alongside websites, booking and automation.",
        "services.numManagement":"01 / MANAGEMENT","services.numCrm":"02 / CRM","services.numWeb":"03 / WEB","services.numSystems":"04 / SYSTEMS","services.numAutomation":"05 / AUTOMATION","services.webTitle":"Business websites","services.webBody":"A custom, mobile-friendly site that explains what you do, builds trust and makes it easy to contact you.","services.webLink":"Explore website plans",
        "services.systemTitle":"Booking & reservation systems","services.systemBody":"Reservation flows and appointment tools designed around the way your business works.","services.systemLink":"Scope a system",
        "services.autoTitle":"Practical automation","services.autoBody":"Connect repetitive steps across forms, messages and business tools, with a human in control where it matters.","services.autoLink":"Talk through an idea",
        "work.kicker":"Selected projects",
        "work.title":"Seven web demos.<br><em>Made for different needs.</em>",
        "work.note":"Explore the project screenshots first. External interactive demos are optional previews and may have limited availability.",
        "work.type.web":"Reference demo · not official","work.type.system":"Reservation system · demo","work.type.concept":"Reference demo · not official","work.type.curiel":"Two demos · Basic + Premium",
        "work.label.need":"The need","work.label.built":"What we made","work.label.outcome":"What the demo shows",
        "work.demo.open":"Open demo ↗","work.demo.reservations":"View reservation demo ↗","work.demo.basic":"Basic version ↗","work.demo.premium":"Premium version ↗","work.demo.preview":"View project screenshot ↗","work.demo.basicPreview":"Basic — screenshot ↗","work.demo.external":"Open external demo ↗",
        "work.patarata.type":"Website · live preview",
        "work.patarata.title":"La Patarata · Website",
        "work.patarata.need":"Give visitors a direct way to discover La Patarata online.",
        "work.patarata.built":"A preview linked directly to La Patarata's published website.",
        "work.patarata.outcome":"Visitors can open and explore the live La Patarata website.",
        "work.cuervosWeb.title":"Cuervos Garden · Website","work.cuervosWeb.need":"The restaurant needed one place to introduce its outdoor setting, menu, location and reservation options.","work.cuervosWeb.built":"A mobile-friendly website concept with a visual homepage, menu, gallery, location and clear reservation links.","work.cuervosWeb.outcome":"Visitors can explore the restaurant and reach the reservation flow from its website.",
        "work.cuervosSystem.title":"Cuervos Garden · Reservations & admin","work.cuervosSystem.need":"Guests needed to check dates and times; staff needed a way to review tables and upcoming reservations.","work.cuervosSystem.built":"A separate reservation flow with availability by date and party size, plus a private admin panel for reservations, tables and statuses.","work.cuervosSystem.outcome":"Guests can choose an available time online, while staff manage reservations and tables in one panel.",
        "work.esquina.title":"La Esquina de Buenos Aires","work.esquina.need":"The restaurant wanted to refresh its online presence while keeping its porteño identity and making key information easy to find.","work.esquina.built":"A Spanish and English website concept with the story, menu, gallery, reviews, reservations, location and contact details.","work.esquina.outcome":"Visitors can switch languages, learn about the restaurant and find how to reserve or get there.",
        "work.curiel.title":"Refaccionaria Curiel","work.curiel.need":"The store needed a clearer way to present its wide selection of automotive parts.","work.curiel.built":"Two separate website demos, Basic and Premium, with product categories and direct contact options.","work.curiel.outcome":"The links let visitors compare two different website concepts for the same business.",
        "work.keetchen.title":"Home Keetchen","work.keetchen.need":"The kitchen and interior design studio needed to present its services and projects with the same care as its spaces.","work.keetchen.built":"An editorial website concept with sections for kitchens, closets, interior design, custom projects and accessories.","work.keetchen.outcome":"Potential clients can explore the services and projects, then request a consultation or quote.",
        "work.magnolia.title":"Florería Magnolia","work.magnolia.need":"The flower shop needed a warm digital showcase for custom arrangements and its local presence.","work.magnolia.built":"A visual website concept with arrangement photography, reviews, location and direct contact options.","work.magnolia.outcome":"Visitors can explore the shop’s style and contact it by WhatsApp or phone.",
        "work.muniz.title":"Florería Muñiz","work.muniz.need":"The flower shop needed a digital catalog that makes it easier to browse arrangements and request a quote.","work.muniz.built":"A responsive website with product categories, a custom quote flow, WhatsApp contact and an administrative panel for catalog management.","work.muniz.outcome":"Visitors can explore arrangements by category and send a tailored request, while the shop can manage its catalog through the admin panel.",
        "work.privacy":"These links are demos for reference, not official published client websites. Case summaries describe deliverables and do not claim unverified business results.",
        "plans.kicker":"Website plans","plans.title":"A clear place<br>to <em>start.</em>","plans.intro":"Every project starts with a conversation about your goals. These starting prices cover website work; hosting and domain are quoted separately.",
        "plans.addonTitle":"Optional: Business Management dashboard","plans.addonBody":"Add a private management panel to Basic, Professional or Premium. Website prices stay the same; dashboard modules, setup and ongoing costs are quoted separately.","plans.addonCta":"Explore optional add-on","plans.startingAt":"USD · starting at","plans.label1":"For a clear first presence","plans.basic":"Basic","plans.basicDesc":"A focused website that makes the essentials easy to find.","plans.basic1":"Responsive informational website","plans.basic2":"Core business sections and contact details","plans.basic3":"Location and direct contact links","plans.basic4":"Two rounds of minor revisions",
        "plans.label2":"Recommended for growing businesses","plans.pro":"Professional","plans.proDesc":"More room for your services, products and customer questions.","plans.pro1":"Everything in Basic","plans.pro2":"Expanded service or product catalog","plans.pro3":"Contact form and basic on-page SEO","plans.pro4":"Two rounds of minor revisions",
        "plans.label3":"For a more tailored experience","plans.premium":"Premium","plans.premiumDesc":"A more distinctive website with a broader, custom-scoped experience.","plans.premium1":"Custom visual direction and expanded pages","plans.premium2":"Interactive sections and tailored content structure","plans.premium3":"Integrations scoped to your goals","plans.premium4":"Systems and advanced automation quoted separately","plans.cta":"Discuss this plan","plans.note":"Prices are in USD for U.S. businesses. Final scope, hosting, domain, third-party subscriptions and taxes are confirmed in the proposal.",
        "seo.kicker":"Search visibility add-on","seo.title":"Be easier to find.<br><em>Keep growing.</em>","seo.intro":"A practical, lightweight SEO and local visibility service for AB Studio websites. The monthly plan covers basic checks and small updates; articles and major technical work are quoted separately. Rankings are never guaranteed.",
        "seo.name":"SEO + local visibility","seo.headline":"A steady rhythm for your search presence.","seo.body":"The one-time setup reviews your website and Google Business Profile. The $30 monthly plan includes essential checks, minor improvements and a brief progress summary. Articles and larger updates are additional.",
        "seo.setup":"One-time setup","seo.monthly":"Monthly service","seo.perMonth":" USD / mo","seo.cta":"Ask about SEO","seo.item1Title":"SEO + GEO setup","seo.item1":"Clear site structure and business information for search and AI crawlers.",
        "seo.item2Title":"Google Business Profile","seo.item2":"Initial local profile review and small, agreed updates.","seo.item3Title":"Content recommendations","seo.item3":"Article ideas and on-page suggestions; full article writing is quoted separately.",
        "seo.item4Title":"Light monthly monitoring","seo.item4":"Basic checks, minor adjustments and a concise progress summary.",        "nfc.eyebrow":"SMART REVIEW PLAQUES",
        "nfc.title":"Make leaving a review easy.",
        "nfc.description":"A countertop NFC and QR plaque that opens your business’s Google review page with a tap or scan. Customized for your brand and tested before delivery.",
        "nfc.feature1":"NFC tap + QR backup",
        "nfc.feature2":"Your business name or logo",
        "nfc.feature3":"Review link setup and testing",
        "nfc.from":"Starting at",
        "nfc.priceNote":"USD · one-time purchase",
        "nfc.shipping":"Shipping and special customization quoted separately. No mandatory subscription.",
        "nfc.cta":"Ask about an NFC plaque",
        "nfc.policy":"Designed for authentic, voluntary feedback. No incentives or guaranteed reviews.",
        "seo.item5Title":"NFC review plaque","seo.item5":"NFC + QR review plaque from $49, sold separately; shipping quoted by location.",
        "seo.item6Title":"No ranking promises","seo.item6":"We improve discoverability foundations without guaranteeing a position or AI mention.",
        "process.kicker":"How we work","process.title":"Straightforward from<br>first call to <em>launch.</em>","process.intro":"You see the scope, price and next step before work begins. We keep communication direct and make decisions together.",
        "process.step1Title":"Discover","process.step1":"We learn about your business, customers and the job the website needs to do.","process.step2Title":"Plan & design","process.step2":"We agree on the structure and visual direction before building the full experience.",
        "process.step3Title":"Build & review","process.step3":"We share a preview, collect your feedback and include two rounds of minor revisions.","process.step4Title":"Approve & launch","process.step4":"After your approval and final payment, we prepare the agreed site for launch.",
        "terms.paymentTitle":"Payment","terms.payment":"50% to begin and 50% after final approval, before publication.","terms.hostingTitle":"Hosting & domain","terms.hosting":"Quoted separately from the website build and required to keep a hosted site online.",
        "terms.ownershipTitle":"Ownership","terms.ownership":"Domain is registered to the client when possible; project files and transferable code are handed over after full payment, subject to platform and third-party terms.",
        "terms.responseTitle":"Response time","terms.response":"We usually reply to new inquiries within one business day.",
        "about.kicker":"A small studio with a practical point of view","about.title":"Good technology should make business <em>feel simpler.</em>","about.story":"We created AB Studio to help businesses show their full potential online. We turn our development skills into practical, professional digital solutions made for each client.",
        "about.team":"AB Studio is co-founded by Ihan Raúl Sandí García and José Antonio Ahumada Calderón. We share client care, planning and project development.","about.role":"Co-founder",
        "contact.kicker":"Start a conversation","contact.title":"Tell us what your business needs next.","contact.body":"Share a little about your business and the problem you want to solve. We’ll reply within one business day.",
        "contact.email":"Email AB Studio","contact.whatsapp":"Message on WhatsApp","contact.emailLabel":"Email","contact.phoneLabel":"Phone / WhatsApp","contact.locationLabel":"Service area","contact.location":"Serving businesses across the United States",
        "blog.kicker":"Notes from the studio","blog.title":"Ideas for a more useful <em>web.</em>","blog.intro":"Short, practical notes for business owners thinking about their website, digital tools and online visibility.",
        "blog.topic1":"Web strategy","blog.title1":"What should a small business website do?","blog.desc1":"Start with the customer’s next step, not a long list of features.","blog.read":"Read the note","blog.body1":"A useful site quickly explains what you offer, who it helps and how to take the next step. Put the most important service, location and contact option where visitors can find them easily on a phone.",
        "blog.topic2":"Booking systems","blog.title2":"When is it time to add online reservations?","blog.desc2":"A booking flow helps when requests are frequent and details get lost.","blog.body2":"If your team often repeats the same questions about dates, times or availability, a structured form can collect those details in one place. Decide who confirms each request and how changes or cancellations will be handled before automating the flow.",
        "blog.topic3":"Local visibility","blog.title3":"A first step toward showing up in local search","blog.desc3":"Consistent business details make it easier for customers to recognize you.","blog.body3":"Check that your business name, phone number, hours and service area are accurate on your website and Google Business Profile. Keep the same details wherever customers find you, then add useful answers to the questions they ask most.",
        "footer.copy":"Independent digital studio · Serving the U.S."
      },
      es: {
        "systems.detailsTitle":"Qué puede incluir un sistema de reservas",
        "systems.detailsIntro":"Las funciones se definen según cómo tu negocio gestione citas, disponibilidad del personal y solicitudes de clientes.",
        "systems.f1title":"Solicitudes de reserva",
        "systems.f1body":"Recopila fechas, servicios y detalles importantes con un formulario estructurado.",
        "systems.f2title":"Panel de gestión",
        "systems.f2body":"Revisa solicitudes y organiza seguimientos desde un mismo lugar.",
        "systems.f3title":"Procesos personalizados",
        "systems.f3body":"Planifica confirmaciones, cambios y cancelaciones según tu equipo.",
        "automation.detailsTitle":"Dónde ayuda la automatización",
        "automation.detailsIntro":"Primero identificamos tareas repetitivas y diseñamos el proceso antes de decidir qué automatizar y qué mantener manual.",
        "automation.f1title":"Consultas organizadas",
        "automation.f1body":"Conecta la información de formularios con un proceso de seguimiento.",
        "automation.f2title":"Notificaciones",
        "automation.f2body":"Conecta mensajes y recordatorios cuando encajen con tu operación.",
        "automation.f3title":"Control humano",
        "automation.f3body":"Conserva revisiones y aprobaciones para las decisiones que necesitan una persona.",
        "nav.work":"Proyectos",
        "work.viewAll":"Ver todos los proyectos",
        "services.viewAll":"Explorar todos los servicios",
        "admin.serviceTitle":"Business Management","admin.serviceBody":"Administra productos, inventario, pedidos y operaciones diarias con un panel privado opcional que puedes añadir a CUALQUIER plan web. Se cotiza por módulos.","admin.serviceLink":"Explorar Business Management",
        "crm.serviceTitle":"CRM · Gestión de clientes","crm.serviceBody":"Organiza contactos, consultas, oportunidades de venta y seguimientos comerciales. Tres planes independientes con implementación y mensualidad.","crm.serviceLink":"Comparar planes del CRM",
        "nav.cta":"Agendar una asesoría",
        "footer.privacy":"Privacidad",
        "footer.terms":"Condiciones",
        "faq.kicker":"Antes de comenzar",
        "faq.title":"Respuestas claras.<br><em>Sin sorpresas.</em>",
        "faq.intro":"El alcance y los plazos dependen del proyecto. Confirmamos los detalles importantes por escrito antes de comenzar.",
        "faq.q1":"¿Cuánto tarda una página web?",
        "faq.a1":"Depende del número de páginas, de si el contenido está listo y de las funciones solicitadas. Confirmamos los plazos en la propuesta.",
        "faq.q2":"¿Incluyen dominio y alojamiento?",
        "faq.a2":"El alojamiento, dominio y servicios de terceros se cotizan por separado. Confirmamos los costos antes de aprobar el proyecto.",
        "faq.q3":"¿Qué cuenta como revisión?",
        "faq.a3":"Los planes Básico y Profesional incluyen dos rondas de cambios menores. Los trabajos adicionales o cambios de alcance se cotizan primero.",
        "faq.q4":"¿De quién es la web al terminar?",
        "faq.a4":"La propiedad, acceso a cuentas, archivos y entrega se definen en el acuerdo escrito antes de comenzar.",
        "faq.q5":"¿Ofrecen mantenimiento?",
        "faq.a5":"Podemos conversar sobre actualizaciones y soporte continuo. El alcance y cualquier costo periódico se detallan en la propuesta.",
        "faq.q6":"¿Puedo pedir un sistema personalizado?",
        "faq.a6":"Sí. Reservas, catálogos y paneles administrativos se planifican según tu negocio y se cotizan por separado.",
        "faq.cta":"Consulta sobre tu proyecto ↗",
        "plans.handoff":"Cada cotización confirma alcance, plazos, alojamiento, soporte, responsabilidades de contenido y entrega del sitio antes de comenzar.",
        "work.demoNote":"Algunos proyectos son conceptos interactivos o vistas previas. Su disponibilidad puede variar; solo publicamos resultados verificados.",
        "inquiry.extraPlan":"¿Qué plan web te interesa?","inquiry.planAny":"Todavía no estoy seguro","inquiry.planBasic":"Básico · desde $1,100","inquiry.planProfessional":"Profesional · desde $1,500","inquiry.planPremium":"Premium · desde $2,500","inquiry.adminAddon":"También quiero un panel Business Management","inquiry.moduleLegend":"¿Qué necesitas administrar? (opcional)","inquiry.moduleCatalog":"Catálogo / productos","inquiry.moduleInventory":"Inventario","inquiry.moduleOrders":"Pedidos","inquiry.moduleReports":"Reportes de ventas","inquiry.moduleBookings":"Reservas","inquiry.moduleCustomers":"Seguimiento de clientes","inquiry.typeLabel":"¿Qué te gustaría crear?",
        "inquiry.optionDefault":"Elige un servicio (opcional)",
        "inquiry.optionWebsite":"Página web para negocio",
        "inquiry.optionBooking":"Sistema de reservas o administración",
        "inquiry.optionCatalog":"Catálogo digital",
        "inquiry.optionSeo":"SEO y visibilidad local",
        "inquiry.optionOther":"Otra idea",
        "homeInquiry.note":"Se abrirá WhatsApp con un mensaje preparado; nada se envía hasta que tú decidas enviarlo allí.",
        "brand.sub":"Web · Sistemas · Automatización",
        "homeInquiry.kicker":"Empecemos","homeInquiry.title":"Contanos qué necesita tu sitio web.","homeInquiry.intro":"Describí tu negocio y qué necesitás que resuelva el sitio. Revisaremos tu mensaje y te responderemos dentro de un día hábil con los próximos pasos.","homeInquiry.label":"Describí el sitio web que necesitás","homeInquiry.placeholder":"Ejemplo: Tengo una clínica dental y quiero que mis pacientes soliciten citas en línea.","homeInquiry.pick1":"Una página para una campaña","homeInquiry.pick2":"El sitio de mi negocio","homeInquiry.pick3":"Un catálogo digital de productos","homeInquiry.send":"Continuar en WhatsApp","homeInquiry.sendEmail":"Continuar por correo","homeInquiry.note":"Elige WhatsApp o correo para abrir un borrador preparado. Tú decides cuándo enviarlo.","homeInquiry.emailIntro":"¿Preferís escribirnos por correo? Contanos qué tipo de sitio tenés en mente.","homeInquiry.reply":"Normalmente respondemos las consultas nuevas dentro de un día hábil.",
        "a11y.skip":"Ir al contenido principal","nav.home":"Inicio","nav.pricing":"Precios","pricing.compareCta":"Compara todos los precios y configura tu presupuesto ↗","nav.services":"Servicios","nav.serviceOverview":"Todos los servicios","nav.serviceWeb":"Páginas web","nav.serviceSystems":"Sistemas de reservas","nav.serviceSeo":"SEO y búsqueda local","nav.serviceAutomation":"Automatización","nav.serviceAdmin":"Gestión del negocio","nav.serviceCrm":"CRM · Gestión de clientes","nav.company":"Empresa","nav.blog":"Blog","nav.faq":"FAQ","nav.work":"Proyectos","nav.plans":"Paquetes","nav.about":"Nosotros","nav.cta":"Empezar un proyecto",
        "hero.eyebrow":"Estudio digital independiente · Atención a negocios de EE. UU.",
        "hero.title":"Una mejor presencia digital.<br><em>Hecha para impulsar tu negocio.</em>",
        "hero.body":"Creamos páginas web profesionales y herramientas conectadas para negocios en Estados Unidos. Con Business Management puedes añadir un panel privado para gestionar productos, pedidos y tareas cotizadas según tus necesidades.",
        "hero.primary":"Contanos sobre tu proyecto","hero.secondary":"Conocer Business Management","hero.proof1":"7 demos web + 1 sistema de reservas","hero.proof2":"Inglés + español",
        "hero.seal":"Diseñado<br>pensando en<br>tu negocio","hero.mockBrand":"AB STUDIO · CONCEPTO WEB","hero.mockTitle":"Hacé que tu primera impresión cuente.","hero.mockCaption":"Un espacio digital claro para mostrar lo que hacés mejor.","hero.mockCta":"Explorar","hero.noteTitle":"Un sitio útil, además de atractivo.","hero.noteBody":"Webs · reservas · automatización",
        "statement.one":"Para negocios pequeños y en crecimiento","statement.two":"Atención a pequeños negocios en Estados Unidos","statement.three":"Sitios web, sistemas y automatización",
        "bmHome.kicker":"SERVICIO DESTACADO / COMPLEMENTO WEB OPCIONAL","bmHome.title":"Tu web atrae clientes.<br><em>Business Management te da el control.</em>","bmHome.intro":"Actualiza productos, controla inventario, revisa pedidos y administra las tareas de tu negocio desde un panel privado conectado a tu página web. Diseñado con los módulos que realmente necesitas.","bmHome.point1":"Modifica precios y productos por tu cuenta","bmHome.point2":"Organiza pedidos e inventario","bmHome.point3":"Consulta la información del negocio en un lugar","bmHome.action":"Conocer Business Management","bmHome.secondary":"Añadirlo a un plan web","bmHome.note":"Disponible con Básico, Profesional o Premium. El panel es opcional y se cotiza por módulos, por separado.","bmHome.previewLabel":"RESUMEN DEL NEGOCIO","bmHome.previewTitle":"Tu negocio, organizado.","bmHome.metric1":"Productos","bmHome.metric2":"Pedidos","bmHome.metric3":"Tareas","bmHome.activity":"ACTIVIDAD RECIENTE","bmHome.row1":"Precio de producto actualizado","bmHome.row2":"Nuevo pedido recibido","bmHome.row3":"Inventario revisado","bmHome.demo":"VISTA CONCEPTUAL · DATOS ILUSTRATIVOS","services.kicker":"Qué hacemos","services.title":"Herramientas digitales<br>para trabajar <em>mejor.</em>","services.intro":"Business Management organiza las operaciones diarias; CRM se enfoca en clientes y seguimiento comercial. Puedes elegir cada servicio por separado, además de páginas web, reservas y automatización.",
        "services.numManagement":"01 / GESTIÓN","services.numCrm":"02 / CRM","services.numWeb":"03 / WEB","services.numSystems":"04 / SISTEMAS","services.numAutomation":"05 / AUTOMATIZACIÓN","services.webTitle":"Sitios web para negocios","services.webBody":"Un sitio propio y adaptable a celulares que explica qué hacés, genera confianza y facilita el contacto.","services.webLink":"Ver paquetes web",
        "services.systemTitle":"Reservas y citas","services.systemBody":"Reservas y gestión de citas adaptadas al funcionamiento de tu negocio.","services.systemLink":"Cotizar un sistema",
        "services.autoTitle":"Automatización práctica","services.autoBody":"Conectamos pasos repetitivos entre formularios, mensajes y herramientas, con supervisión humana donde importa.","services.autoLink":"Conversar sobre una idea",
        "work.kicker":"Proyectos seleccionados",
        "work.title":"Siete demos web.<br><em>Para necesidades distintas.</em>",
        "work.note":"Primero revisa las capturas de los proyectos. Las demos interactivas externas son opcionales y pueden tener disponibilidad limitada.",
        "work.type.web":"Demo de referencia · no oficial","work.type.system":"Demo de sistema de reservas","work.type.concept":"Demo de referencia · no oficial","work.type.curiel":"Dos demos · Básica + Premium",
        "work.label.need":"La necesidad","work.label.built":"Qué construimos","work.label.outcome":"Qué muestra la demo",
        "work.demo.open":"Abrir demo ↗","work.demo.reservations":"Ver demo de reservas ↗","work.demo.basic":"Versión básica ↗","work.demo.premium":"Versión premium ↗","work.demo.preview":"Ver captura del proyecto ↗","work.demo.basicPreview":"Básico — captura ↗","work.demo.external":"Abrir demo externa ↗",
        "work.patarata.type":"Sitio web · vista en vivo",
        "work.patarata.title":"La Patarata · Sitio web",
        "work.patarata.need":"Facilitar que las personas descubran La Patarata en internet.",
        "work.patarata.built":"Una vista previa enlazada directamente al sitio publicado de La Patarata.",
        "work.patarata.outcome":"Las personas pueden abrir y explorar la página de La Patarata.",
        "work.cuervosWeb.title":"Cuervos Garden · Sitio web","work.cuervosWeb.need":"El restaurante necesitaba mostrar su ambiente al aire libre, menú, ubicación y opciones para reservar en un solo lugar.","work.cuervosWeb.built":"Un concepto adaptable a móviles, con portada visual, menú, galería, ubicación y accesos claros a las reservas.","work.cuervosWeb.outcome":"Las personas pueden conocer el restaurante y llegar al flujo de reservas desde el sitio.",
        "work.cuervosSystem.title":"Cuervos Garden · Reservas y administración","work.cuervosSystem.need":"Los clientes necesitaban consultar fechas y horarios disponibles; el equipo, revisar mesas y próximas reservas.","work.cuervosSystem.built":"Un flujo de reservas separado, con disponibilidad por fecha y cantidad de personas, más un panel privado para administrar reservas, mesas y estados.","work.cuervosSystem.outcome":"Los clientes eligen un horario disponible en línea y el equipo gestiona las reservas y mesas desde un mismo panel.",
        "work.esquina.title":"La Esquina de Buenos Aires","work.esquina.need":"El restaurante quería renovar su presencia digital sin perder su identidad porteña y facilitar el acceso a la información clave.","work.esquina.built":"Un concepto bilingüe con historia, menú, galería, opiniones, reservas, ubicación y datos de contacto.","work.esquina.outcome":"Las personas pueden cambiar de idioma, conocer el restaurante y consultar cómo reservar o llegar.",
        "work.curiel.title":"Refaccionaria Curiel","work.curiel.need":"El negocio necesitaba presentar de forma más clara su amplio surtido de refacciones automotrices.","work.curiel.built":"Dos demos web separadas, Básica y Premium, con categorías de productos y opciones de contacto directo.","work.curiel.outcome":"Los enlaces permiten comparar dos conceptos web distintos para el mismo negocio.",
        "work.keetchen.title":"Home Keetchen","work.keetchen.need":"El estudio de cocinas e interiorismo necesitaba presentar sus servicios y proyectos con el mismo cuidado que sus espacios.","work.keetchen.built":"Un concepto editorial con secciones para cocinas, clósets, interiorismo, proyectos a medida y accesorios.","work.keetchen.outcome":"Los posibles clientes pueden explorar los servicios y proyectos, y solicitar una cita o cotización.",
        "work.magnolia.title":"Florería Magnolia","work.magnolia.need":"La florería necesitaba una vitrina digital cálida para mostrar arreglos personalizados y su presencia local.","work.magnolia.built":"Un concepto visual con fotografías de arreglos, opiniones, ubicación y opciones de contacto directo.","work.magnolia.outcome":"Las personas pueden conocer el estilo de la florería y contactarla por WhatsApp o teléfono.",
        "work.muniz.title":"Florería Muñiz","work.muniz.need":"La florería necesitaba un catálogo digital que facilitara explorar sus arreglos y solicitar cotizaciones.","work.muniz.built":"Un sitio adaptable con productos por categorías, cotizador personalizado, contacto por WhatsApp y panel administrativo para gestionar el catálogo.","work.muniz.outcome":"Las visitas pueden explorar los arreglos por categoría y enviar solicitudes personalizadas, mientras la florería administra su catálogo desde el panel.",
        "work.privacy":"Estos enlaces son demos de referencia, no sitios oficiales publicados. Las fichas describen entregables y no afirman resultados comerciales sin verificar.",
        "plans.kicker":"Paquetes web","plans.title":"Un buen lugar<br>para <em>empezar.</em>","plans.intro":"Cada proyecto comienza con una conversación sobre tus objetivos. Estos precios iniciales cubren el sitio web; hosting y dominio se cotizan por separado.",
        "plans.addonTitle":"Opcional: panel Business Management","plans.addonBody":"Agrega un panel de gestión privado al plan Básico, Profesional o Premium. Los precios web no cambian; los módulos, la implementación y los costos recurrentes se cotizan por separado.","plans.addonCta":"Ver complemento opcional","plans.startingAt":"USD · desde","plans.label1":"Para una presencia clara","plans.basic":"Básico","plans.basicDesc":"Un sitio enfocado que facilita encontrar la información esencial.","plans.basic1":"Sitio informativo adaptable a celulares","plans.basic2":"Secciones principales y datos del negocio","plans.basic3":"Ubicación y enlaces de contacto directo","plans.basic4":"Dos rondas de cambios menores",
        "plans.label2":"Recomendado para negocios en crecimiento","plans.pro":"Profesional","plans.proDesc":"Más espacio para presentar servicios, productos y responder preguntas.","plans.pro1":"Todo lo incluido en Básico","plans.pro2":"Catálogo ampliado de servicios o productos","plans.pro3":"Formulario de contacto y SEO básico en la página","plans.pro4":"Dos rondas de cambios menores",
        "plans.label3":"Para una experiencia más personalizada","plans.premium":"Premium","plans.premiumDesc":"Un sitio más distintivo, con un alcance amplio y personalizado.","plans.premium1":"Dirección visual propia y más páginas","plans.premium2":"Secciones interactivas y estructura de contenido a medida","plans.premium3":"Integraciones definidas según tus objetivos","plans.premium4":"Sistemas y automatizaciones avanzadas se cotizan aparte","plans.cta":"Consultar este paquete","plans.note":"Precios en USD para negocios de Estados Unidos. El alcance final, hosting, dominio, servicios de terceros e impuestos se confirman en la propuesta.",
        "seo.kicker":"Servicio adicional de visibilidad","seo.title":"Que te encuentren.<br><em>Seguí creciendo.</em>","seo.intro":"Servicio de SEO y visibilidad local con mantenimiento ligero para sitios de AB Studio. El plan mensual incluye revisiones básicas y ajustes pequeños; los artículos y trabajos mayores se cotizan por separado. No garantizamos posiciones.",
        "seo.name":"SEO + visibilidad local","seo.headline":"Un ritmo constante para tu presencia en búsquedas.","seo.body":"La configuración inicial revisa tu sitio y tu perfil de Google Business. El plan de $30 al mes incluye comprobaciones básicas, ajustes pequeños y un resumen breve de avances. Los artículos y cambios mayores se cobran aparte.",
        "seo.setup":"Implementación única","seo.monthly":"Servicio mensual","seo.perMonth":" USD / mes","seo.cta":"Consultar SEO","seo.item1Title":"Configuración SEO + GEO","seo.item1":"Estructura del sitio e información clara para buscadores y rastreadores de IA.",
        "seo.item2Title":"Perfil de Google Business","seo.item2":"Revisión inicial del perfil y pequeños ajustes acordados.","seo.item3Title":"Recomendaciones de contenido","seo.item3":"Ideas de artículos y mejoras de contenido; la redacción completa se cotiza aparte.",
        "seo.item4Title":"Seguimiento mensual básico","seo.item4":"Revisión básica, ajustes pequeños y resumen breve de avances.",        "nfc.eyebrow":"PLACAS INTELIGENTES PARA RESEÑAS",
        "nfc.title":"Haz que dejar una reseña sea más fácil.",
        "nfc.description":"Una placa NFC con código QR para el mostrador que abre la página de reseñas de Google de tu negocio al acercar el teléfono o escanear. Personalizada y probada antes de la entrega.",
        "nfc.feature1":"NFC + código QR",
        "nfc.feature2":"Nombre o logo de tu negocio",
        "nfc.feature3":"Configuración y prueba del enlace",
        "nfc.from":"Desde",
        "nfc.priceNote":"USD · pago único",
        "nfc.shipping":"Envío y personalizaciones especiales se cotizan aparte. Sin suscripción obligatoria.",
        "nfc.cta":"Cotizar placa NFC",
        "nfc.policy":"Pensada para opiniones auténticas y voluntarias. Sin incentivos ni reseñas garantizadas.",
        "seo.item5Title":"Placa NFC para reseñas","seo.item5":"Placa NFC + QR desde $49, se vende por separado; envío según destino.","seo.item6Title":"Sin promesas de posiciones","seo.item6":"Mejoramos las bases de visibilidad sin garantizar un puesto ni menciones de IA.",
        "process.kicker":"Cómo trabajamos","process.title":"Un proceso claro desde<br>la primera llamada al <em>lanzamiento.</em>","process.intro":"Conocés el alcance, el precio y el siguiente paso antes de iniciar. Nos comunicamos directamente y tomamos las decisiones en conjunto.",
        "process.step1Title":"Conocer","process.step1":"Aprendemos sobre tu negocio, tus clientes y el objetivo que debe cumplir el sitio.","process.step2Title":"Planear y diseñar","process.step2":"Acordamos la estructura y la dirección visual antes de desarrollar la experiencia completa.",
        "process.step3Title":"Desarrollar y revisar","process.step3":"Compartimos una vista previa, recibimos tus comentarios e incluimos dos rondas de cambios menores.","process.step4Title":"Aprobar y publicar","process.step4":"Con tu aprobación y el pago final, preparamos el sitio acordado para publicarlo.",
        "terms.paymentTitle":"Pago","terms.payment":"50% para iniciar y 50% al aprobar la versión final, antes de publicarla.","terms.hostingTitle":"Hosting y dominio","terms.hosting":"Se cotizan por separado del desarrollo y son necesarios para mantener el sitio alojado en línea.",
        "terms.ownershipTitle":"Propiedad","terms.ownership":"El dominio se registra a nombre del cliente cuando sea posible. Al completar el pago, entregamos los archivos y el código transferible, sujeto a las condiciones de las plataformas y servicios de terceros.",
        "terms.responseTitle":"Tiempo de respuesta","terms.response":"Normalmente respondemos consultas nuevas dentro de un día hábil.",
        "about.kicker":"Un estudio pequeño con una mirada práctica","about.title":"La tecnología debería hacer que los negocios se sientan <em>más simples.</em>","about.story":"Creamos AB Studio para ayudar a los negocios a mostrar todo su potencial en internet. Queríamos convertir nuestras habilidades en desarrollo web en soluciones digitales prácticas, profesionales y hechas a la medida de cada cliente.",
        "about.team":"AB Studio fue cofundado por Ihan Raúl Sandí García y José Antonio Ahumada Calderón. Compartimos la atención al cliente, la planificación y el desarrollo de proyectos.","about.role":"Cofundador",
        "contact.kicker":"Empecemos a conversar","contact.title":"Contanos qué necesita tu negocio ahora.","contact.body":"Compartinos un poco sobre tu negocio y el problema que querés resolver. Respondemos dentro de un día hábil.",
        "contact.email":"Escribir a AB Studio","contact.whatsapp":"Escribir por WhatsApp","contact.emailLabel":"Correo","contact.phoneLabel":"Teléfono / WhatsApp","contact.locationLabel":"Área de servicio","contact.location":"Atendemos negocios de Estados Unidos",
        "blog.kicker":"Notas del estudio","blog.title":"Ideas para una web más <em>útil.</em>","blog.intro":"Notas breves y prácticas para negocios que están pensando en su sitio web, sus herramientas digitales y cómo ganar visibilidad.",
        "blog.topic1":"Estrategia web","blog.title1":"¿Qué debe lograr la web de un negocio pequeño?","blog.desc1":"Empezá por el siguiente paso del cliente, no por una lista larga de funciones.","blog.read":"Leer la nota","blog.body1":"Un sitio útil explica rápido qué ofrecés, a quién ayudás y cómo seguir. Mostrá el servicio principal, la ubicación y una forma de contacto que el cliente pueda encontrar fácilmente desde el celular.",
        "blog.topic2":"Sistemas de reservas","blog.title2":"¿Cuándo conviene agregar reservas en línea?","blog.desc2":"Un flujo de reservas ayuda cuando llegan solicitudes frecuentes y se pierden detalles.","blog.body2":"Si el equipo repite preguntas sobre fechas, horarios o disponibilidad, un formulario ordenado puede reunir esos datos en un solo lugar. Antes de automatizar, definí quién confirma cada solicitud y cómo se gestionan cambios o cancelaciones.",
        "blog.topic3":"Visibilidad local","blog.title3":"Un primer paso para aparecer en búsquedas locales","blog.desc3":"Los datos consistentes ayudan a que tus clientes reconozcan tu negocio.","blog.body3":"Revisá que el nombre del negocio, teléfono, horario y zona de servicio estén correctos en tu web y en Google Business Profile. Mantené esos datos iguales donde te encuentren y añadí respuestas útiles a las preguntas más frecuentes.",
        "footer.copy":"Estudio digital independiente · Atención en EE. UU."
      }
    };
    const pageIntroCopy = {"en":{"services":["WHAT WE DO","Explore our services.","Business Management and CRM each have their own page, functionality and pricing. Explore the right solution for your business."],"management":["BUSINESS MANAGEMENT / OPERATIONS","Run your business with more control.","Add a private dashboard to your website for products, inventory, orders and daily operations. Choose only the modules you need."],"crm":["CRM / CUSTOMER RELATIONSHIPS","Never lose track of a customer conversation.","Organize leads, inquiries, sales opportunities and follow-ups with a dedicated customer management system."],"projects":["SELECTED WORK","Explore our work.","Browse website concepts and projects, their features, and the problems they are designed to solve."],"systems":["BOOKING & ADMIN SYSTEMS","Less manual work. Better organization.","We plan reservation and management tools around how your team actually works—from customer inquiries to administration."],"seo":["SEARCH & LOCAL VISIBILITY","Help the right people discover you.","Technical foundations, business information and useful content to support visibility in search and local results."],"automation":["PRACTICAL AUTOMATION","Simplify repetitive tasks.","Connect forms, follow-ups and workflows so your business can spend less time repeating the same steps."],"company":["ABOUT AB STUDIO","Meet the team behind the work.","Learn about our approach, the people building your project and what collaboration with AB Studio looks like."],"blog":["IDEAS & GUIDES","Useful ideas for growing businesses.","Practical notes on websites, reservations and visibility, written with small-business owners in mind."],"pricing":["PRICING / AB STUDIO","Know the costs before you start.","Compare web development, Business Management, CRM and SEO, or build an estimate for your specific needs."]},"es":{"services":["NUESTROS SERVICIOS","Explora nuestros servicios.","Business Management y CRM tienen páginas, funciones y precios independientes. Conoce la solución que mejor se adapta a tu negocio."],"management":["BUSINESS MANAGEMENT / OPERACIONES","Más control para tu negocio.","Añade un panel privado a tu web para gestionar productos, inventario, pedidos y operaciones. Elige solo los módulos que necesitas."],"crm":["CRM / RELACIÓN CON CLIENTES","Organiza cada oportunidad de venta.","Centraliza contactos, consultas, oportunidades comerciales y seguimientos con un CRM dedicado."],"projects":["NUESTROS PROYECTOS","Conoce nuestros trabajos.","Explora conceptos y proyectos web, sus funciones y los problemas que ayudan a resolver."],"systems":["RESERVAS Y ADMINISTRACIÓN","Menos tareas manuales. Más organización.","Diseñamos herramientas de reservas y gestión según la forma en que trabaja tu equipo, desde las consultas hasta la administración."],"seo":["SEO Y VISIBILIDAD LOCAL","Haz que más personas puedan encontrarte.","Bases técnicas, información comercial y contenido útil para apoyar la visibilidad en buscadores y resultados locales."],"automation":["AUTOMATIZACIÓN PRÁCTICA","Simplifica tareas repetitivas.","Conecta formularios, seguimientos y procesos para dedicar menos tiempo a repetir los mismos pasos."],"company":["SOBRE AB STUDIO","Conoce al equipo detrás de cada proyecto.","Descubre cómo trabajamos, quién desarrolla tu proyecto y cómo es colaborar con AB Studio."],"blog":["IDEAS Y GUÍAS","Consejos útiles para tu negocio.","Notas prácticas sobre sitios web, reservas y visibilidad, pensadas para pequeños negocios."],"pricing":["PRECIOS / AB STUDIO","Precios claros para tomar mejores decisiones.","Compara desarrollo web, Business Management, CRM y SEO, o configura un presupuesto según lo que realmente necesitas."]}};
    let currentLang = "en";
    function setLanguage(lang) {
      currentLang = lang;
      try { localStorage.setItem("abstudio-lang", lang); } catch (_) {}
      document.documentElement.lang = lang;
      const intro = pageIntroCopy[lang]?.[document.body.dataset.page];
      if(intro) document.querySelectorAll('[data-subpage-field]').forEach(el => { const i = {kicker:0,title:1,body:2}[el.dataset.subpageField]; if(i!==undefined) el.textContent = intro[i]; });
      document.querySelectorAll("[data-copy]").forEach(el => {
        const value = copy[lang][el.dataset.copy];
        if (value) el.textContent = value;
      });
      // Derive portfolio totals from the actual cards so the proof stays accurate.
      const distinctCards = document.querySelectorAll('#work .case-card').length;
      const proof = document.querySelector('[data-copy="hero.proof1"]');
      if (proof && distinctCards) {
        proof.textContent = lang === 'es'
          ? distinctCards + ' proyectos y conceptos seleccionados'
          : distinctCards + ' selected projects & concepts';
      }
      document.querySelectorAll("[data-copy-html]").forEach(el => {
        const value = copy[lang][el.dataset.copyHtml];
        if (value) el.innerHTML = value;
      });
      document.querySelectorAll("[data-placeholder]").forEach(el => {
        const value = copy[lang][el.dataset.placeholder];
        if (value) el.placeholder = value;
      });
      document.querySelectorAll("[data-alt-en]").forEach(el => { el.alt = lang === "es" ? el.dataset.altEs : el.dataset.altEn; });
      document.querySelectorAll("[data-aria-en]").forEach(el => el.setAttribute("aria-label", lang === "es" ? el.dataset.ariaEs : el.dataset.ariaEn));
      const nfcButton = document.querySelector("[data-nfc-whatsapp]");
      if (nfcButton) nfcButton.href = "https://wa.me/15513129791?text=" + encodeURIComponent(lang === "es" ? "Hola AB Studio, me interesa una placa NFC + QR para las reseñas de mi negocio. ¿Me pueden dar una cotización?" : "Hi AB Studio, I'm interested in an NFC + QR review plaque for my business. Could you send me a quote?");
      const mobileContact = document.getElementById("mobileContact");
      if (mobileContact) mobileContact.href = lang === "es"
        ? "https://wa.me/15513129791?text=Hola%20AB%20Studio%2C%20quiero%20conversar%20sobre%20un%20proyecto."
        : "https://wa.me/15513129791?text=Hi%20AB%20Studio%2C%20I%27d%20like%20to%20start%20a%20project.";
      const consultationBooking = document.querySelector('.consultation-booking');
      if (consultationBooking) consultationBooking.textContent = lang === 'es' ? 'Agendar una consulta ↗' : 'Book a consultation ↗';
      const button = document.getElementById("langToggle");
      button.textContent = lang === "en" ? "ES" : "EN";
      button.setAttribute("aria-label", lang === "en" ? "Cambiar a español" : "Cambiar al inglés");
      document.getElementById("themeToggle").setAttribute("aria-label", lang === "en" ? "Toggle dark mode" : "Cambiar modo oscuro");
      const menuToggle = document.getElementById("menuToggle");
      const languageNav = document.getElementById("navlinks");
      document.querySelector(".service-nav .nav-dropdown summary")?.setAttribute("aria-label",lang==="es"?"Abrir opciones de servicios":"Open service options");
      languageNav?.setAttribute("aria-label",lang==="es"?"Navegación principal":"Main navigation");
      if (languageNav && !languageNav.classList.contains("open")) menuToggle.setAttribute("aria-label", lang === "en" ? "Open menu" : "Abrir menú");
      const whatsapp = document.querySelector('a[href^="https://wa.me/15513129791?"]');
      if (whatsapp) whatsapp.href = lang === "en"
        ? "https://wa.me/15513129791?text=Hi%20AB%20Studio%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
        : "https://wa.me/15513129791?text=Hola%20AB%20Studio%2C%20quisiera%20conversar%20sobre%20un%20proyecto.";
      const emailCta = document.querySelector('a[href^="mailto:sales.abstudio@gmail.com?subject="]');
      if (emailCta) emailCta.href = lang === "en"
        ? "mailto:sales.abstudio@gmail.com?subject=AB%20Studio%20project%20inquiry"
        : "mailto:sales.abstudio@gmail.com?subject=Consulta%20sobre%20un%20proyecto%20con%20AB%20Studio";
      document.title = lang === "en" ? "AB Studio — Websites, systems & automation" : "AB Studio — Sitios web, sistemas y automatización";
      document.querySelector('meta[name="description"]').content = lang === "en"
        ? "AB Studio builds business websites and optional Business Management dashboards for products, inventory and daily operations, plus CRM, booking and SEO."
        : "AB Studio crea páginas web y paneles Business Management opcionales para administrar productos, inventario y operaciones, además de CRM, reservas y SEO.";
    }
    document.getElementById("langToggle").addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "es" : "en");
      const path = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '') + '/';
      if (routeTargets[path]) showRoute(path, routeTargets[path], false);
      localizeSpecialOptions();
    });
    try {
      const storedLang = localStorage.getItem("abstudio-lang");
      const savedLang = storedLang === "en" || storedLang === "es" ? storedLang : ((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en");
      setLanguage(savedLang === "es" ? "es" : "en");
    } catch (_) { setLanguage((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en"); }
    // Keyboard users can bypass the header and reach the primary page content.
    const skipTarget=document.querySelector("main");
    if(skipTarget){
      if(!skipTarget.id)skipTarget.id="main-content";
      const skip=document.createElement("a");
      skip.className="ab-skip-link";
      skip.href="#"+skipTarget.id;
      skip.dataset.copy="a11y.skip";
      skip.textContent=copy[currentLang]["a11y.skip"];
      document.body.prepend(skip);
    }
    const themeToggle = document.getElementById("themeToggle");
    if ((() => {try{return localStorage.getItem("abstudio-theme")}catch(_){return null}})() === "dark") { document.body.classList.add("theme-dark"); themeToggle.textContent = "☀"; }
    themeToggle.addEventListener("click", () => {
      const dark = document.body.classList.toggle("theme-dark");
      themeToggle.textContent = dark ? "☀" : "☾";
      try{localStorage.setItem("abstudio-theme", dark ? "dark" : "light");}catch(_){}
    });
    const menuToggle = document.getElementById("menuToggle");
    const navlinks = document.getElementById("navlinks");
    menuToggle.addEventListener("click", () => {
      const open = navlinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? (currentLang === "en" ? "Close menu" : "Cerrar menú") : (currentLang === "en" ? "Open menu" : "Abrir menú"));
      menuToggle.textContent = open ? "×" : "☰";
    });
    navlinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navlinks.classList.remove("open");
      navlinks.querySelectorAll("details").forEach(details => { details.open = false; });
      menuToggle.setAttribute("aria-expanded","false");
      menuToggle.textContent="☰";
    }));

    // Each route gets a focused page view; internal links stay in the same tab.
    const routeAnchors = document.querySelectorAll('a[data-route][data-target]');
    const main = document.querySelector('main');
    const routePage = document.getElementById('route-page');
    const routeTargets = {
      "/": "top", "/servicios/": "services", "/pricing/": "pricing-overview", "/sitios-web/": "plans",
      "/sistemas/": "systems", "/business-management/": "bm-service-lead-title", "/crm/": "crm-overview", "/seo/": "seo", "/automatizacion/": "automation",
      "/empresa/": "company", "/blog/": "blog", "/proyectos/": "work", "/faq/": "faq-page"
    };
    const websitePageCopy = {
      en: {
        eyebrow:"WEBSITE DESIGN & DEVELOPMENT", title:"A website that makes it easy to choose you.",
        intro:"We plan and build custom, mobile-friendly websites that explain your offer, earn trust and turn visits into real inquiries. Clear scope, direct communication and a site shaped around your business.",
        audienceTitle:"Built for businesses ready to grow online.", audienceIntro:"A focused website helps people understand what you do, trust your business and take the next step.",
        audiences:[["Local businesses","Restaurants, shops and service providers that need a polished digital home and more direct inquiries."],["Professional services","Clinics, consultants and independent professionals who need to explain their offer and support their reputation."],["Growing companies","Businesses launching a service or replacing an outdated site with a faster, clearer experience."]],
        problemsTitle:"Solve the friction that costs you customers.", problems:[["Visitors do not understand what you offer","We organize your services, value proposition and contact options so people know what to do next."],["Your site is hard to use on a phone","Responsive layouts and optimized assets make key information easy to reach on mobile."],["Your business looks outdated online","A visual direction built for your brand gives customers a consistent, professional first impression."]],
        scopeTitle:"What your website can include.", scopeIntro:"We define the pages and features with you before development begins. The final scope is confirmed in your proposal.",
        deliverables:["Responsive design for mobile, tablet and desktop","Custom structure and visual direction for your business","Core pages for services, about, contact and location","Contact form, WhatsApp and social links as needed","SSL and launch configuration; hosting and domain quoted separately","Basic on-page SEO according to the selected plan","Two rounds of minor revisions, with larger changes scoped separately"],
        plansTitle:"Choose a starting point.", plans:[["Basic","$1,100","A focused informational website with essential business sections, contact details and direct links."],["Professional","$1,500","More room for services or products, a contact form and basic on-page SEO."],["Premium","$2,500","A custom visual direction, expanded pages and tailored interactive features."]],
        factorsTitle:"What shapes the final estimate?", factors:["Number of pages and depth of content","Level of visual customization and content preparation","Forms, booking tools, payment gateways or external integrations","Whether you need a blog, ongoing maintenance or third-party services"],
        faqTitle:"Before we begin", faqs:[["Does the package include hosting and a domain?","Hosting and domain are quoted separately so the plan matches your chosen provider and renewal terms."],["Will the website work on mobile?","Yes. Responsive behavior for phones, tablets and desktop is part of the build."],["Can you guarantee the first place on Google?","No. We can configure on-page SEO foundations, but search positions depend on competition, content and many external factors."],["Who owns the website?","After final payment, we hand over the agreed project files and transferable code, subject to third-party platform terms. The domain is registered to the client when possible."]],
        cta:"Tell us what your website needs", ctaText:"Share your business, goals and the pages you have in mind. We will reply with a suggested scope and price.",
        buttons:["Discuss your website","See packages"], details:"The starting prices are for website development. Hosting, domain, paid software, extensive copywriting, photography and advanced integrations are confirmed separately in the proposal."
      },
      es: {
        eyebrow:"DISEÑO Y DESARROLLO WEB", title:"Una web que ayuda a elegirte.",
        intro:"Planificamos y desarrollamos sitios web propios, adaptables a móviles, que explican tu oferta, generan confianza y convierten visitas en consultas reales. Alcance claro, comunicación directa y una web pensada para tu negocio.",
        audienceTitle:"Para negocios listos para crecer en internet.", audienceIntro:"Una web clara ayuda a que las personas entiendan qué hacés, confíen en tu negocio y den el siguiente paso.",
        audiences:[["Negocios locales","Restaurantes, comercios y proveedores de servicios que necesitan una presencia digital profesional y más consultas directas."],["Servicios profesionales","Clínicas, consultores y profesionales que necesitan explicar su oferta y respaldar su reputación."],["Empresas en crecimiento","Negocios que lanzan un servicio o reemplazan una web desactualizada por una experiencia más rápida y clara."]],
        problemsTitle:"Resolvemos lo que puede hacerte perder clientes.", problems:[["Las visitas no entienden qué ofrecés","Organizamos tus servicios, propuesta de valor y formas de contacto para que sepan cómo avanzar."],["Tu sitio es difícil de usar desde el celular","Diseño adaptable y recursos optimizados para que la información importante se encuentre fácilmente."],["Tu negocio se ve desactualizado en internet","Creamos una dirección visual alineada con tu marca para dar una primera impresión profesional y consistente."]],
        scopeTitle:"Qué puede incluir tu sitio web.", scopeIntro:"Definimos las páginas y funciones con vos antes de empezar. El alcance final queda detallado en la propuesta.",
        deliverables:["Diseño adaptable a celular, tablet y computadora","Estructura y estilo visual propios para tu negocio","Páginas principales de servicios, empresa, contacto y ubicación","Formulario, WhatsApp y enlaces a redes sociales según lo acordado","Configuración de publicación y SSL; hosting y dominio se cotizan aparte","SEO básico dentro de la página según el plan elegido","Dos rondas de cambios menores; cambios mayores se cotizan por separado"],
        plansTitle:"Elegí un punto de partida.", plans:[["Básico","$1,100","Sitio informativo enfocado, con secciones esenciales, datos de contacto y enlaces directos."],["Profesional","$1,500","Más espacio para servicios o productos, formulario de contacto y SEO básico en la página."],["Premium","$2,500","Dirección visual personalizada, más páginas y funciones interactivas a medida."]],
        factorsTitle:"Qué define el precio final", factors:["Cantidad de páginas y profundidad del contenido","Nivel de personalización visual y preparación del contenido","Formularios, reservas, pagos o integraciones externas","Necesidad de blog, mantenimiento continuo o servicios de terceros"],
        faqTitle:"Antes de empezar", faqs:[["¿El paquete incluye hosting y dominio?","Se cotizan por separado para ajustar el servicio al proveedor elegido y dejar claras las condiciones de renovación."],["¿La web funciona en celulares?","Sí. La adaptación a celulares, tablets y computadoras forma parte del desarrollo."],["¿Pueden garantizar el primer lugar en Google?","No. Podemos configurar las bases de SEO dentro del sitio, pero el posicionamiento depende de la competencia, el contenido y otros factores externos."],["¿Quién será dueño del sitio?","Al completar el pago entregamos los archivos y el código transferible acordados, sujetos a las condiciones de plataformas externas. El dominio se registra a nombre del cliente cuando sea posible."]],
        cta:"Contanos qué necesita tu web", ctaText:"Compartinos tu negocio, tus objetivos y las páginas que imaginás. Te respondemos con un alcance y un precio sugerido.",
        buttons:["Conversar sobre mi web","Ver paquetes"], details:"Los precios desde corresponden al desarrollo del sitio. Hosting, dominio, software de pago, redacción extensa, fotografía e integraciones avanzadas se confirman aparte en la propuesta."
      }
    };
    function portfolioCtaMarkup(lang){
 const es=lang==="es";
 return `<section class="portfolio-convert"><div class="wrap"><div><div class="eyebrow">${es?"PROYECTOS Y DEMOSTRACIONES":"PROJECTS & DEMONSTRATIONS"}</div><h2>${es?"¿Te gustaría una web así para tu negocio?":"Want a website like one of these?"}</h2><p>${es?"Cada proyecto tiene necesidades diferentes. Explora los planes, elige las funciones que necesitas y solicita una cotización. Las demos no representan resultados comerciales garantizados.":"Every business needs a different solution. Explore our plans, select the features you need and request a quote. Demos do not imply guaranteed business results."}</p></div><a class="button" href="/sitios-web/#quote-builder-web">${es?"Configurar mi proyecto":"Configure my website"} ↗</a></div></section>`;
}
        const bmServiceHero = {"en":{"kicker":"FEATURED SERVICE / THE NEXT STEP BEYOND A WEBSITE","title":"Business Management.<br><em>Built around your business.</em>","body":"Your website is what customers see. Business Management is what you use behind the scenes to update products, track inventory, manage orders and keep operations organized. It's a private, custom-built dashboard—not another generic template.","core":"A website + the tools to run it","moduleTitle":"CHOOSE THE MODULES YOU NEED","modules":["Products & pricing","Orders & inventory","Business insights"],"addon":"Works with Basic, Professional and Premium. Dashboard modules are quoted separately; hosting and ongoing support may cost extra.","primary":"See how Business Management works","secondary":"Build a website + dashboard","demo":"Illustrative example · no live business data"},"es":{"kicker":"SERVICIO DESTACADO / MÁS ALLÁ DE UNA PÁGINA WEB","title":"Business Management.<br><em>Adaptado a tu negocio.</em>","body":"Tu página es lo que ven tus clientes. Business Management es el espacio privado donde puedes actualizar productos, controlar inventario, administrar pedidos y organizar tus operaciones. Un panel personalizado, no una plantilla genérica.","core":"Una web + herramientas para administrarla","moduleTitle":"ELIGE LOS MÓDULOS QUE NECESITAS","modules":["Productos y precios","Pedidos e inventario","Métricas del negocio"],"addon":"Disponible con Básico, Profesional y Premium. El panel se cotiza por módulos; el hosting y el soporte pueden generar costos adicionales.","primary":"Descubrir cómo funciona","secondary":"Configurar web + panel","demo":"Ejemplo ilustrativo · sin datos reales"}};
    function bmServiceSpotlightMarkup(lang){
 const s=bmServiceHero[lang]||bmServiceHero.en;
 const chips=s.modules.map((x,i)=>`<div class="bm-route-module"><span>0${i+1}</span><strong>${x}</strong><span aria-hidden="true">↗</span></div>`).join("");
 return `<section class="bm-service-lead" aria-labelledby="bm-service-lead-title"><div class="wrap bm-service-lead-grid">
 <div class="bm-service-lead-copy"><div class="bm-service-lead-tag"><span class="bm-service-lead-dot" aria-hidden="true"></span>${s.kicker}</div><h2 id="bm-service-lead-title">${s.title}</h2><p class="bm-service-lead-intro">${s.body}</p><div class="bm-service-lead-actions"><a class="button" href="#admin-panel">${s.primary}<span aria-hidden="true">↗</span></a><a class="bm-service-lead-link" href="#quote-builder-services">${s.secondary}<span aria-hidden="true">↗</span></a></div><p class="bm-service-lead-note">${s.addon}</p></div>
 <div class="bm-service-lead-visual" aria-label="${s.demo}"><div class="bm-service-lead-mini-label"><span>AB STUDIO / MANAGEMENT</span><span class="bm-service-lead-mini-mark">▦</span></div><h2>${s.core}</h2><div class="bm-service-lead-flow"><span>${lang==="es"?"PÁGINA WEB":"WEBSITE"}</span><span aria-hidden="true">⇄</span><span>${lang==="es"?"PANEL PRIVADO":"PRIVATE DASHBOARD"}</span></div><div class="bm-service-lead-module-tag">${s.moduleTitle}</div><div class="bm-service-lead-modules">${chips}</div><p class="bm-service-lead-demo">${s.demo}</p></div>
 </div></section>`;
}
        const servicesChooserCopy = {"en":{"eyebrow":"FIND THE RIGHT SERVICE","title":"What would you like your business to do better?","intro":"Featured: Business Management, the optional dashboard add-on to any website plan. Compare this with websites, CRM, booking and SEO to find the right tools for your business.","cards":[["I need to update products myself","Business Management","A private add-on for product editing, inventory and daily operations.","/business-management/"],["I need a professional website","Website Development","Design and publish an inviting, mobile-friendly site.","/sitios-web/"],["I need to follow up with leads","Customer Follow-up (CRM)","Track inquiries, contacts and the next step in each sale.","/crm/"],["I need appointments online","Booking Systems","Give customers an organized way to request a booking.","/sistemas/"],["I want better search visibility","SEO & Local Visibility","Improve the foundations of how customers find you.","/seo/"]]},"es":{"eyebrow":"ENCUENTRA EL SERVICIO IDEAL","title":"¿Qué quieres mejorar en tu negocio?","intro":"Destacamos Business Management, el panel opcional que puedes sumar a cualquiera de los planes web. Compara esta solución con páginas, CRM, reservas y SEO según las necesidades de tu negocio.","cards":[["Quiero editar mis productos","Business Management","Complemento privado para productos, inventario y operación diaria.","/business-management/"],["Necesito una página profesional","Desarrollo web","Diseñamos y publicamos una web clara y adaptable a celulares.","/sitios-web/"],["Quiero dar seguimiento a clientes","CRM / Seguimiento comercial","Organiza solicitudes, contactos y oportunidades de venta.","/crm/"],["Necesito reservas en línea","Sistemas de reservas","Permite que tus clientes soliciten citas o reservas.","/sistemas/"],["Quiero aparecer en búsquedas","SEO y visibilidad local","Mejora las bases de tu presencia en los buscadores.","/seo/"]]}};
        function servicesChooserMarkup(lang){
 const s=servicesChooserCopy[lang]||servicesChooserCopy.en;
 return `<section class="service-chooser" id="choose-service"><div class="wrap"><div class="service-chooser-head"><div class="eyebrow">${s.eyebrow}</div><h2>${s.title}</h2><p>${s.intro}</p></div><div class="service-chooser-grid">${s.cards.map(([need,service,description,href],i)=>`<a class="service-chooser-card" href="${href}"><small>0${i+1} / ${service}</small><h3>${need}</h3><p>${description}</p><span aria-hidden="true">↗</span></a>`).join("")}</div><a class="ab-pricing-home-link" href="/pricing.html#build-estimate">${lang==="es"?"Comparar todos los precios y configurar un presupuesto ↗":"Compare all prices and build an estimate ↗"}</a></div></section>`;
}
        const quoteData = {"en":{"tag":"WEBSITE + OPTIONAL EXTRAS","title":"Build your website estimate.","intro":"Choose a web plan and the tools that matter to your business. This is an initial estimate, not a final quotation.","web":"01 / Choose your website plan","extra":"02 / Add optional tools","details":"03 / About your business","basic":"Basic","professional":"Professional","premium":"Premium","admin":"Business Management dashboard","adminHint":"Private dashboard from $750 setup + $49/mo, plus your chosen modules.","modTitle":"Choose modules · starting prices in USD","modules":[["catalog","Product catalog"],["inventory","Inventory"],["orders","Orders"],["reports","Sales reports"],["booking","Reservations"],["crm","Customer follow-up"]],"seo":"SEO + Local Visibility","seoHint":"$200 one-time setup, $30/month","crm":"Dedicated CRM plan (optional)","crmNone":"No separate CRM","starter":"Starter ($900–$1,500 + $39/mo)","growth":"Growth ($1,500–$3,000 + $89/mo)","enterprise":"Enterprise (from $3,000 + $199/mo)","crmHint":"A dedicated customer follow-up system, priced separately from custom dashboard modules. Overlapping needs will be reviewed before quoting.","name":"Business name (optional)","namePH":"Example: Sunrise Florist","notes":"What do you need?","notesPH":"Describe your business, goals and needed features.","summary":"Your initial estimate","initial":"Starting setup estimate","monthly":"Starting monthly estimate","custom":"Management & add-on breakdown","none":"No management dashboard selected","exclude":"Starting estimates for standard versions only. Final pricing depends on scope, requirements and integrations. Hosting, domains, third-party subscriptions, taxes and custom development are separate. Monthly fees cover agreed maintenance and limited support, not unlimited changes.","email":"Continue by email","wa":"Continue on WhatsApp","disclose":"We open a prepared message; nothing is sent until you confirm it in that app.","subject":"AB Studio: Website + add-on quote","hello":"Hello AB Studio, please quote this project.","crmLabel":"CRM tier","modulesLabel":"Dashboard modules","business":"Business","message":"Project details","seoSetup":"SEO setup","dash":"Business Management","yes":"Yes","no":"No"},"es":{"tag":"WEB + COMPLEMENTOS OPCIONALES","title":"Configura el presupuesto de tu web.","intro":"Elige un plan y las herramientas que necesita tu negocio. Este es un estimado inicial, no una cotización definitiva.","web":"01 / Elige tu plan web","extra":"02 / Agrega complementos","details":"03 / Cuéntanos de tu negocio","basic":"Básico","professional":"Profesional","premium":"Premium","admin":"Panel Business Management","adminHint":"Panel privado desde $750 de instalación + $49/mes, más los módulos que elijas.","modTitle":"Elige módulos · precios iniciales en USD","modules":[["catalog","Catálogo de productos"],["inventory","Inventario"],["orders","Pedidos"],["reports","Reportes de ventas"],["booking","Reservas"],["crm","Seguimiento de clientes"]],"seo":"SEO + visibilidad local","seoHint":"$200 de configuración única y $30/mes","crm":"Plan CRM independiente (opcional)","crmNone":"Sin CRM adicional","starter":"Starter ($900–$1,500 + $39/mes)","growth":"Growth ($1,500–$3,000 + $89/mes)","enterprise":"Enterprise (desde $3,000 + $199/mes)","crmHint":"Sistema para seguimiento comercial, diferente de los módulos personalizados. Revisaremos posibles funciones duplicadas antes de cotizar.","name":"Nombre del negocio (opcional)","namePH":"Ejemplo: Florería Primavera","notes":"¿Qué necesitas?","notesPH":"Describe tu negocio, tus objetivos y las funciones que deseas.","summary":"Inversión inicial estimada","initial":"Costo inicial estimado (desde)","monthly":"Mensualidad estimada (desde)","custom":"Desglose del panel y complementos","none":"No seleccionaste el panel administrativo","exclude":"Estimaciones desde para versiones estándar. El precio final depende del alcance, las necesidades y las integraciones. Hosting, dominio, servicios externos, impuestos y desarrollo personalizado van aparte. La mensualidad cubre mantenimiento acordado y soporte limitado, no cambios ilimitados.","email":"Continuar por correo","wa":"Continuar en WhatsApp","disclose":"Abrimos un mensaje preparado; nada se envía hasta que lo confirmes en esa aplicación.","subject":"AB Studio: Cotización web y complementos","hello":"Hola AB Studio, quisiera cotizar este proyecto.","crmLabel":"Versión CRM","modulesLabel":"Módulos del panel","business":"Negocio","message":"Detalles del proyecto","seoSetup":"Configuración SEO","dash":"Business Management","yes":"Sí","no":"No"}};

/* Starting prices for standard, reusable Business Management modules.
   Custom scope, hosting and third-party services are quoted separately. */
const bmModuleRates = abPrices.management;
const bmModuleHelp = {
 en:{
  catalog:["Includes: product descriptions, images and price editing in a basic catalog.","Excludes: POS synchronization or bulk product imports.","Example: update the price of flower arrangements."],
  inventory:["Includes: stock quantities and simple low-stock alerts.","Excludes: warehouse integrations, barcode devices and multiple locations.","Example: check the items left after a sale."],
  orders:["Includes: an order list and basic fulfillment status updates.","Excludes: payment provider fees, delivery integrations and complex fulfillment.","Example: mark an order as new, preparing or completed."],
  reports:["Includes: basic sales summaries when order data is available.","Excludes: accounting, tax reporting and finance system integrations.","Example: see your most popular products this month."],
  booking:["Includes: a simple appointment calendar and reservation management.","Excludes: payments, complex table assignments or multi-provider calendar sync.","Example: organize consultation requests in one schedule."],
  crm:["Includes: contact notes and simple follow-up statuses inside the dashboard.","Excludes: lead pipelines, sequences and advanced sales automation, available in the separate CRM service.","Example: mark which customers need a follow-up call."]
 },
 es:{
  catalog:["Incluye: editar descripciones, imágenes y precios de un catálogo básico.","No incluye: sincronización con puntos de venta ni importaciones masivas.","Ejemplo: actualizar precios de arreglos florales."],
  inventory:["Incluye: registrar existencias y alertas sencillas de inventario bajo.","No incluye: integraciones de almacén, lectores de códigos ni múltiples sucursales.","Ejemplo: consultar cuántos artículos quedan después de una venta."],
  orders:["Incluye: ver pedidos y actualizar sus estados básicos.","No incluye: comisiones de pago, integraciones de delivery ni logística compleja.","Ejemplo: marcar un pedido como recibido, en preparación o completado."],
  reports:["Incluye: resúmenes básicos de ventas cuando existan datos de pedidos.","No incluye: contabilidad, impuestos ni integraciones financieras.","Ejemplo: identificar los productos más vendidos del mes."],
  booking:["Incluye: agenda sencilla y administración básica de reservas.","No incluye: pagos, asignación compleja de mesas ni sincronización de múltiples calendarios.","Ejemplo: organizar las solicitudes de citas en una sola agenda."],
  crm:["Incluye: notas de contactos y estados simples para dar seguimiento dentro del panel.","No incluye: embudos de ventas, secuencias ni automatización comercial avanzada, que pertenecen al CRM independiente.","Ejemplo: anotar a quién debes llamar después."]
 }
};

function quoteMarkup(lang,scope="services"){
 const d=quoteData[lang]||quoteData.en,es=lang==="es";
 const t=s=>s.replace(/^\s*\d+\s*\/\s*/,"");
 const desc=es?["Una presencia digital profesional y clara.","Más contenido y formularios para clientes.","Diseño distintivo y funciones interactivas."]:["A focused, professional online presence.","More content and ways to connect.","Distinctive design and interactive sections."];
 const plans=[["basic",d.basic],["professional",d.professional],["premium",d.premium]].map(([id,name],i)=>`<label class="quote-plan quote-plan--${id}"><input type="radio" name="quote-${scope}" data-q-plan value="${id}" ${id==="professional"?"checked":""}><span class="quote-plan-card"><span class="quote-plan-top"><small>0${i+1} / WEB</small>${id==="professional"?`<small class="quote-plan-popular">${es?"MÁS ELEGIDO":"POPULAR"}</small>`:""}</span><strong class="quote-plan-name">${name}</strong><span class="quote-plan-description">${desc[i]}</span><span class="quote-plan-cost"><b>${abMoney(abPrices.web[id])}</b><small>USD · ${es?"desde":"starting at"}</small></span><span class="quote-radio-decoration" aria-hidden="true"></span></span></label>`).join("");
 const modules=d.modules.map(([id,text])=>{
   const rate=bmModuleRates[id],help=bmModuleHelp[lang]?.[id]||bmModuleHelp.en[id];
   return `<article class="quote-module" data-bm-module="${id}">
     <label class="quote-module-choice"><input type="checkbox" data-q-module value="${id}"><span>${text}</span></label>
     <div class="quote-module-price"><strong>${es?"Desde":"From"} \u0024${rate.setup}</strong><small>+ \u0024${rate.monthly}/${es?"mes":"mo"}</small></div>
     <details class="quote-module-details"><summary aria-label="${es?"Detalles del módulo":"Module details"}: ${text}"><span aria-hidden="true">ⓘ</span> ${es?"¿Qué incluye?":"What's included?"}</summary><p>${help[0]}</p><p>${help[1]}</p><p class="quote-module-example">${help[2]}</p></details>
   </article>`;
 }).join("");
 const managementQuote=scope==="services";
 const base=bmModuleRates.base;
 const panelBaseHtml=`<div class="quote-bm-base"><div><strong>${es?"Base del panel":"Dashboard base"}</strong><p>${es?"Acceso privado, estructura de datos, usuarios y configuración inicial. Mantenimiento técnico básico y soporte limitado.":"Private access, data structure, user accounts and initial setup. Basic technical maintenance and limited support."}</p></div><div class="quote-bm-base-price"><strong>${es?"Desde":"From"} \u0024${base.setup}</strong><small>+ \u0024${base.monthly}/${es?"mes":"mo"}</small></div></div>`;
 const crmChooserMarkup=managementQuote
   ? `<div class="quote-crm-choice"><div class="quote-crm-eyebrow">${es?"SERVICIO INDEPENDIENTE":"SEPARATE SERVICE"}</div><p class="quote-help">${es?"El CRM tiene su propia página, funciones y precios. Puedes contratarlo por separado.":"CRM has its own page, features and pricing. You can request it separately."}</p><a class="text-link" href="/crm/">${es?"Explorar los planes CRM":"Explore CRM plans"} <span aria-hidden="true">↗</span></a><select data-q-crm id="quote-crm-${scope}" hidden><option value="none">${d.crmNone}</option></select></div>`
   : `<div class="quote-crm-choice"><div class="quote-crm-eyebrow">${es?"SEGUIMIENTO COMERCIAL":"CUSTOMER FOLLOW-UP"}</div><label class="quote-label" for="quote-crm-${scope}">${d.crm}</label><p class="quote-help">${d.crmHint}</p><select data-q-crm id="quote-crm-${scope}"><option value="none">${d.crmNone}</option><option value="starter">Starter (${abCrmPrice("starter",lang)})</option><option value="growth">Growth (${abCrmPrice("growth",lang)})</option><option value="enterprise">Enterprise (${abCrmPrice("enterprise",lang)})</option></select></div>`;
 return `<section class="quote-section" id="quote-builder-${scope}" aria-labelledby="quote-title-${scope}"><div class="wrap">
   <div class="quote-heading"><div class="eyebrow">${managementQuote?(es?"WEB + BUSINESS MANAGEMENT":"WEBSITE + BUSINESS MANAGEMENT"):d.tag}</div><h2 id="quote-title-${scope}">${managementQuote?(es?"Estima tu proyecto web con panel administrativo.":"Estimate a website with your management dashboard."):d.title}</h2><p>${managementQuote?(es?"Esta calculadora incluye una nueva web. Si ya tienes una, puedes cotizar solo el panel.":"This calculator includes a new website. If you already have one, you can estimate the dashboard separately."):d.intro}</p>${managementQuote?`<a class="ab-pricing-text-link" href="/pricing.html#build-estimate">${es?"Ya tengo web: cotizar solo el panel ↗":"Already have a website? Estimate the dashboard alone ↗"}</a>`:""}</div>
   <div class="quote-layout" data-quote-root data-quote-lang="${lang}"><div class="quote-inputs">
    <div class="quote-step"><div class="quote-step-heading"><span class="quote-step-index">01</span><div><h3>${t(d.web)}</h3><p>${es?"Elige cualquier plan. Podrás añadir el panel administrativo como complemento.":"Choose any plan. A management dashboard can be added to all three."}</p></div></div><fieldset class="quote-fieldset"><legend class="quote-visually-hidden">${d.web}</legend><div class="quote-plan-grid">${plans}</div></fieldset></div>
    <div class="quote-step"><div class="quote-step-heading"><span class="quote-step-index">02</span><div><h3>${t(d.extra)}</h3><p>${es?"Añade solo las herramientas que tu negocio necesita.":"Add only the tools your business actually needs."}</p></div></div><fieldset class="quote-fieldset"><legend class="quote-visually-hidden">${d.extra}</legend>
      <div class="quote-extra-list"><label class="quote-toggle"><input type="checkbox" data-q-admin ${managementQuote?"checked":""}><span class="quote-toggle-copy"><strong>${d.admin}</strong><small>${d.adminHint}</small></span><small class="quote-extra-label">${es?"DESDE $750 + $49/MES":"FROM $750 + $49/MO"}</small></label>
      <div class="quote-modules" data-q-modules ${managementQuote?"":"hidden"}>${panelBaseHtml}<p class="quote-module-intro">${d.modTitle}</p><div class="quote-module-grid">${modules}</div><p class="quote-pricing-note">${es?"Precios mínimos para versiones estándar; funciones personalizadas e integraciones se cotizan aparte.":"Minimum prices for standard versions; custom features and integrations are quoted separately."}</p></div>
      <label class="quote-toggle"><input type="checkbox" data-q-seo><span class="quote-toggle-copy"><strong>${d.seo}</strong><small>${d.seoHint}</small></span><small class="quote-extra-label">${abMoney(abPrices.seo.setup)} + ${abMoney(abPrices.seo.monthly)}/${es?"MES":"MO"}</small></label></div>
      ${crmChooserMarkup}
     </fieldset></div>
    <div class="quote-step"><div class="quote-step-heading"><span class="quote-step-index">03</span><div><h3>${t(d.details)}</h3><p>${es?"Un poco de información nos ayuda a cotizar tu proyecto.":"A few details help us quote your project accurately."}</p></div></div><div class="quote-details"><label class="quote-label" for="quote-name-${scope}">${d.name}</label><input id="quote-name-${scope}" type="text" data-q-name maxlength="100" placeholder="${d.namePH}"><label class="quote-label" for="quote-notes-${scope}">${d.notes}</label><textarea id="quote-notes-${scope}" data-q-notes maxlength="1200" rows="4" placeholder="${d.notesPH}"></textarea></div></div>
   </div><aside class="quote-result" aria-label="${d.summary}"><div class="quote-result-top"><span class="quote-result-mark" aria-hidden="true">AB.</span><div class="eyebrow">AB STUDIO / USD</div><h3>${d.summary}</h3><p>${es?"Tu selección, resumida con claridad.":"Your selections, clearly summarized."}</p></div>
    <div class="quote-totals" aria-live="polite" aria-atomic="true"><div><span>${d.initial}</span><strong data-q-initial>$1,500</strong></div><div><span>${d.monthly}</span><strong data-q-monthly>$0 / ${es?"mes":"mo"}</strong></div><div class="quote-custom"><b>${d.custom}</b><p data-q-custom>${d.none}</p><ul class="quote-breakdown" data-q-breakdown aria-label="${es?"Desglose del presupuesto":"Estimate breakdown"}"></ul></div></div>
    <div class="quote-result-footer"><span class="quote-estimate-label">${es?"ESTIMADO · NO ES UNA COTIZACIÓN FINAL":"ESTIMATE · NOT A FINAL QUOTE"}</span><p class="quote-exclusions">${d.exclude}</p><a class="button" data-q-email href="mailto:sales.abstudio@gmail.com">${d.email} <span aria-hidden="true">↗</span></a><a class="button outline" data-q-wa target="_blank" rel="noopener noreferrer" href="https://wa.me/15513129791">${d.wa} <span aria-hidden="true">↗</span></a><small class="quote-send-note">${d.disclose}</small></div></aside>
   </div></div></section>`;
}
    function quoteUpdate(root){
 if(!root)return;
 const lang=root.dataset.quoteLang==="es"?"es":"en",d=quoteData[lang],es=lang==="es";
 const selected=root.querySelector("[data-q-plan]:checked")?.value||"professional";
 const price=abPrices.web[selected];
 const admin=root.querySelector("[data-q-admin]").checked,seo=root.querySelector("[data-q-seo]").checked,crm=root.querySelector("[data-q-crm]").value;
 const crmRates = crm === "none" ? [0,0,0] : [abPrices.crm[crm].min,abPrices.crm[crm].max,abPrices.crm[crm].monthly];
 const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
 const activeModules=admin?[...root.querySelectorAll("[data-q-module]:checked")].map(input=>({id:input.value,name:d.modules.find(x=>x[0]===input.value)?.[1],rate:bmModuleRates[input.value]})).filter(x=>x.name&&x.rate):[];
 const moduleSetup=activeModules.reduce((sum,x)=>sum+x.rate.setup,0);
 const moduleMonthly=activeModules.reduce((sum,x)=>sum+x.rate.monthly,0);
 const managementSetup=admin?bmModuleRates.base.setup+moduleSetup:0;
 const managementMonthly=admin?bmModuleRates.base.monthly+moduleMonthly:0;
 const low=price+(seo?abPrices.seo.setup:0)+crmRates[0]+managementSetup;
 const high=crmRates[1]===null?null:price+(seo?abPrices.seo.setup:0)+crmRates[1]+managementSetup;
 const total=high===null?money(low)+"+":low===high?money(low):money(low)+" – "+money(high);
 const month=(seo?abPrices.seo.monthly:0)+crmRates[2]+managementMonthly;
 const monthly=money(month)+(crm==="enterprise"?"+":"")+(es?" / mes":" / mo");
 root.querySelector("[data-q-initial]").textContent=total;
 root.querySelector("[data-q-monthly]").textContent=monthly;
 root.querySelector("[data-q-modules]").hidden=!admin;
 root.querySelector("[data-q-custom]").textContent=admin
   ? (es?`Panel activo · ${activeModules.length} módulo(s) seleccionado(s)`:`Dashboard active · ${activeModules.length} module(s) selected`)
   :d.none;
 const breakdown=root.querySelector("[data-q-breakdown]");
 const breakdownItems=[
   ...(admin?[[es?"Base del panel":"Dashboard base",bmModuleRates.base.setup,bmModuleRates.base.monthly]]:[]),
   ...activeModules.map(x=>[x.name,x.rate.setup,x.rate.monthly]),
   ...(seo?[[d.seo,abPrices.seo.setup,abPrices.seo.monthly]]:[]),
   ...(crm!=="none"?[[d.crmLabel+": "+{starter:"Starter",growth:"Growth",enterprise:"Enterprise"}[crm],crmRates[0],crmRates[2]]]:[])
 ];
 if(breakdown){
   breakdown.replaceChildren();
   for(const [name,setup,monthlyFee] of breakdownItems){
     const li=document.createElement("li");
     const label=document.createElement("span");label.textContent=name;
     const fee=document.createElement("span");
     fee.textContent=`${es?"Desde ":"From "}${money(setup)} + ${money(monthlyFee)}${es?"/mes":"/mo"}`;
     li.append(label,fee);breakdown.append(li);
   }
 }
 const business=root.querySelector("[data-q-name]").value.trim().slice(0,100),details=root.querySelector("[data-q-notes]").value.trim().slice(0,1200);
 const crmTitle=crm==="none"?d.crmNone:crm[0].toUpperCase()+crm.slice(1)+" ("+abCrmPrice(crm,lang)+")";
 const lines=[d.hello,"",d.web+": "+({basic:d.basic,professional:d.professional,premium:d.premium}[selected])+" ("+money(price)+")",
   d.dash+": "+(admin?d.yes:d.no),
   ...(admin?[(es?"Base del panel":"Dashboard base")+": "+money(bmModuleRates.base.setup)+" + "+money(bmModuleRates.base.monthly)+(es?"/mes":"/mo")]:[]),
   ...activeModules.map(x=>x.name+": "+money(x.rate.setup)+" + "+money(x.rate.monthly)+(es?"/mes":"/mo")),
   d.seo+": "+(seo?d.yes:d.no),
   ...(crm!=="none"?[d.crmLabel+": "+crmTitle]:[]),
   d.initial+": "+total,d.monthly+": "+monthly,
   ...(business?["",d.business+": "+business]:[]),...(details?["",d.message+": "+details]:[]),"",d.exclude];
 const message=lines.join("\n");
 root.querySelector("[data-q-email]").href="mailto:sales.abstudio@gmail.com?subject="+encodeURIComponent(d.subject)+"&body="+encodeURIComponent(message);
 root.querySelector("[data-q-wa]").href="https://wa.me/15513129791?text="+encodeURIComponent(message);
}
        const businessAddonData = {"en":{"eyebrow":"OPTIONAL ADD-ON · WORKS WITH ALL 3 PLANS","title":"Want to manage your website yourself?","text":"Add Business Management to Basic, Professional or Premium. Start with a private dashboard from $750 setup and $49/month, then select the modules you need at their published starting prices. Final pricing depends on your workflow and integrations.","plans":[["Basic","$1,100"],["Professional","$1,500"],["Premium","$2,500"]],"extra":"Optional dashboard","pricing":"From $750 + $49/mo","note":"Website, dashboard and selected modules have separate starting prices. Hosting, database services, third-party subscriptions and custom work are quoted separately.","cta":"Explore Business Management"},"es":{"eyebrow":"EXTRA OPCIONAL · EN LOS 3 PLANES","title":"¿Quieres administrar tu página por tu cuenta?","text":"Agrega Business Management a Básico, Profesional o Premium. Comienza con un panel privado desde $750 de instalación y $49/mes; después elige los módulos con sus precios iniciales publicados. El precio final depende de las funciones e integraciones.","plans":[["Básico","$1,100"],["Profesional","$1,500"],["Premium","$2,500"]],"extra":"Panel opcional","pricing":"Desde $750 + $49/mes","note":"La web, el panel y los módulos tienen precios iniciales independientes. Hosting, bases de datos, servicios externos y trabajo personalizado se cotizan por separado.","cta":"Conocer Business Management"}};
    function businessAddonMarkup(lang,mode="route"){
 const a=businessAddonData[lang]||businessAddonData.en;
 const cards=a.plans.map(([name],i)=>`<article class="addon-plan"><strong>${name}</strong><span>${abMoney(abPrices.web[["basic","professional","premium"][i]])}<small> USD</small></span><div class="addon-plan-plus" aria-hidden="true">+</div><div class="addon-plan-extra"><small>${a.extra}</small><b>${lang==="es"?"Desde":"From"} ${abMoney(abPrices.management.base.setup)} + ${abMoney(abPrices.management.base.monthly)}/${lang==="es"?"mes":"mo"}</b></div></article>`).join("");
 const inner=`<div class="addon-inner"><div class="addon-copy"><div class="eyebrow">${a.eyebrow}</div><h2>${a.title}</h2><p>${a.text}</p><a class="button" href="/business-management/">${a.cta} <span aria-hidden="true">↗</span></a></div><div class="addon-plan-group">${cards}</div></div><p class="addon-disclaimer">${a.note}</p>`;
 return mode==="inline"?`<div class="addon-compare addon-compare--inline" aria-label="${a.eyebrow}">${inner}</div>`:`<section class="route-content addon-route" id="web-dashboard-addon"><div class="wrap addon-compare">${inner}</div></section>`;
}
    function websitePageMarkup(lang) {
      const c = websitePageCopy[lang] || websitePageCopy.en;
      const cards = list => list.map(item => `<article class="route-card"><b>${item[0]}</b><p>${item[1]}</p></article>`).join('');
      const list = items => items.map(item => `<li>${item}</li>`).join('');
      const plans = c.plans.map((plan,i) => `<article class="route-plan"><small>${plan[0]}</small><div class="price">${abMoney(abPrices.web[["basic","professional","premium"][i]])} <small>USD ${lang === 'es' ? 'desde' : 'starting at'}</small></div><p>${plan[2]}</p><a class="route-plan-configure" href="#quote-builder-web" data-quote-pick="${["basic","professional","premium"][i]}">${lang === "es" ? "Configurar este plan" : "Configure this plan"} ↗</a></article>`).join('');
      const faqs = c.faqs.map(faq => `<details><summary>${faq[0]}</summary><p>${faq[1]}</p></details>`).join('');
      return `<section class="route-hero route-hero--visual"><div class="wrap route-hero-split"><div class="route-hero-copy"><div class="eyebrow">${c.eyebrow}</div><h1 class="serif">${c.title}</h1><p>${c.intro}</p><div class="hero-actions"><a class="button" href="#contact">${c.buttons[0]} <span class="arrow">↗</span></a><a class="button outline" href="#route-packages">${c.buttons[1]} <span class="arrow">↓</span></a></div></div><div class="route-hero-showcase" aria-label="AB Studio website portfolio preview">
  <div class="route-showcase-glow"></div><div class="route-showcase-frame">
    <div class="route-showcase-bar"><span class="route-showcase-dots"><i></i><i></i><i></i></span><small>AB STUDIO / WEB DESIGN</small><span>↗</span></div>
    <img src="/assets/portfolio/floreria-muniz.webp" alt="Florería Muñiz website example" width="1061" height="684" loading="eager" decoding="async">
    <div class="route-showcase-caption"><span>SELECTED PROJECT</span><strong>Florería Muñiz</strong></div>
  </div><span class="route-showcase-stamp">MADE TO<br>BE USEFUL ✳</span>
</div></div></section>
        <section class="route-content"><div class="wrap"><div class="eyebrow">${lang === 'es' ? 'PARA QUIÉN' : 'WHO IT IS FOR'}</div><h2>${c.audienceTitle}</h2><p>${c.audienceIntro}</p><div class="route-grid">${cards(c.audiences)}</div></div></section>
        <section class="route-content"><div class="wrap"><div class="eyebrow">${lang === 'es' ? 'LO QUE RESOLVEMOS' : 'WHAT WE SOLVE'}</div><h2>${c.problemsTitle}</h2><div class="route-grid">${cards(c.problems)}</div></div></section>
        <section class="route-content"><div class="wrap route-columns"><div><div class="eyebrow">${lang === 'es' ? 'ALCANCE DEL PROYECTO' : 'PROJECT SCOPE'}</div><h2>${c.scopeTitle}</h2><p>${c.scopeIntro}</p></div><ul class="route-list">${list(c.deliverables)}</ul></div></section>
        <section class="route-content" id="route-packages"><div class="wrap"><div class="eyebrow">${lang === 'es' ? 'INVERSIÓN' : 'INVESTMENT'}</div><h2>${c.plansTitle}</h2><div class="route-plans">${plans}</div><p class="fineprint">${c.details}</p></div></section>
        ${businessAddonMarkup(lang)}
        ${quoteMarkup(lang,"web")}
        <section class="route-content"><div class="wrap route-columns"><div><div class="eyebrow">${lang === 'es' ? 'COTIZACIÓN' : 'ESTIMATE'}</div><h2>${c.factorsTitle}</h2></div><ul class="route-list">${list(c.factors)}</ul></div></section>
        <section class="route-content"><div class="wrap"><div class="eyebrow">${lang === 'es' ? 'PREGUNTAS FRECUENTES' : 'FREQUENT QUESTIONS'}</div><h2>${c.faqTitle}</h2><div class="route-faq">${faqs}</div></div></section>
        <section class="route-content"><div class="wrap route-columns"><div><div class="eyebrow">AB STUDIO</div><h2>${c.cta}</h2><p>${c.ctaText}</p></div><div class="hero-actions"><a class="button" href="#contact">${c.buttons[0]} <span class="arrow">↗</span></a></div></div></section>`;
    }

    const adminPanelData = {"en":{"eyebrow":"OPTIONAL ADD-ON · ALL WEBSITE PLANS","title":"Business Management: a dashboard for your website.","tagline":"Add a private management dashboard to any AB Studio website plan.","description":"A private, secure management system designed to run daily operations quickly and intuitively from your phone, tablet or desktop.","intro":"Choose Basic, Professional or Premium for the public website. You can add the private dashboard to ANY of those plans. Catalog, inventory, orders, metrics and other features are separately quoted by module; no upgrade to Premium is required.","featureHeader":"What can your dashboard include?","features":[["Protected access","Secure sign-in using Google OAuth, plus administrator roles and permissions appropriate to your team.","shield-check"],["Catalog & inventory","Add, edit or remove products, prices, descriptions and photos directly from the dashboard.","package"],["Business insights","See product performance, activity and best sellers when sales data is available and connected.","chart-no-axes-combined"],["Cloud database","Keep your website and management panel connected so updates can appear in seconds, subject to the connection and hosting.","cloud"]],"mockLabel":"YOUR BUSINESS / PRIVATE MANAGEMENT","mockHeading":"Product management","columns":["Product","Stock","Status"],"items":[["Product A","24","Active"],["Product B","08","Active"],["Product C","00","Review"]],"mockNote":"Interface example · illustrative data","investmentTitle":"Your website price stays the same. Add only the dashboard tools you need.","investmentTag":"OPTIONAL ADD-ON · QUOTED BY MODULE","investmentValue":"Website plan + custom dashboard quote","investmentDescription":"First, select Basic ($1,100), Professional ($1,500) or Premium ($2,500) for your website. Business Management is an optional additional project cost, quoted by the modules you select. Any recurring hosting or maintenance is also quoted separately.","exampleTitle":"Common modules","modules":["Google sign-in and admin permissions","Catalog and cloud inventory","Analytics and sales reporting","Website synchronization and integrations"],"priceNote":"The dashboard is NOT included in the $1,100, $1,500 or $2,500 website starting prices. Its implementation and any ongoing hosting, support and third-party services are quoted separately. The panel can be added to any of the three plans. The specific modules and security requirements are confirmed in a written proposal.","cta":"Get an add-on quote","emailSubject":"Business Management add-on quote for website","emailBody":"Hello AB Studio, I would like to add Business Management to a website plan.\nWebsite plan (Basic / Professional / Premium):\nBusiness type:\nModules I need (catalog, inventory, orders, analytics, etc.):\nExisting website (if any):\n"},"es":{"eyebrow":"COMPLEMENTO OPCIONAL · TODOS LOS PLANES WEB","title":"Business Management: un panel para tu página web.","tagline":"Agrega un panel administrativo privado a cualquiera de los planes web de AB Studio.","description":"Sistema de gestión privado y seguro, diseñado para administrar tu operación de forma rápida e intuitiva desde cualquier dispositivo.","intro":"Elige Básico, Profesional o Premium para tu página pública. Puedes agregar el panel privado a CUALQUIERA de los tres, sin necesidad de pasar al plan Premium. Catálogo, inventario, pedidos, métricas y otras funciones se cotizan por módulos.","featureHeader":"¿Qué puede incluir?","features":[["Acceso seguro","Inicio de sesión protegido con autenticación de Google (OAuth) y roles de administrador.","shield-check"],["Gestión de catálogo e inventario","Agrega, edita o elimina productos, precios, descripciones e imágenes al instante.","package"],["Control de métricas","Visualiza productos más vendidos, actividad y rendimiento cuando exista una fuente de ventas conectada.","chart-no-axes-combined"],["Base de datos en la nube","Sincroniza los cambios con tu sitio web para reflejarlos en segundos, según la conexión e infraestructura.","cloud"]],"mockLabel":"TU NEGOCIO / PANEL PRIVADO","mockHeading":"Gestión de productos","columns":["Producto","Stock","Estado"],"items":[["Producto A","24","Activo"],["Producto B","08","Activo"],["Producto C","00","Revisar"]],"mockNote":"Ejemplo de interfaz · datos ilustrativos","investmentTitle":"El precio de tu web no cambia. Añade solo las herramientas que necesitas.","investmentTag":"COMPLEMENTO OPCIONAL · COTIZACIÓN POR MÓDULOS","investmentValue":"Plan web + cotización del panel","investmentDescription":"Primero eliges Básico ($1,100), Profesional ($1,500) o Premium ($2,500). Business Management tiene un costo adicional de implementación según los módulos elegidos. El hosting y mantenimiento recurrente se cotizan por separado.","exampleTitle":"Módulos disponibles","modules":["Acceso con Google y permisos administrativos","Catálogo e inventario en la nube","Métricas y reportes de ventas","Sincronización web e integraciones"],"priceNote":"El panel NO está incluido en los precios web desde $1,100, $1,500 o $2,500. Su implementación y los gastos de hosting, soporte y terceros se cotizan aparte. Puedes añadirlo a cualquiera de los tres planes, con funciones y seguridad definidas en una propuesta escrita.","cta":"Cotizar complemento","emailSubject":"Cotización de complemento Business Management","emailBody":"Hola AB Studio, quiero agregar Business Management a una página web.\nPlan web (Básico / Profesional / Premium):\nTipo de negocio:\nMódulos que necesito (catálogo, inventario, pedidos, estadísticas, etc.):\nPágina actual (si existe):\n"}};
    function adminPanelMarkup(lang){
  const c=adminPanelData[lang]||adminPanelData.en;
  const features=c.features.map(([title,description],index)=>`<article class="admin-feature"><span class="admin-feature-index">0${index+1}</span><h3>${title}</h3><p>${description}</p></article>`).join("");
  const message=`mailto:sales.abstudio@gmail.com?subject=${encodeURIComponent(c.emailSubject)}&body=${encodeURIComponent(c.emailBody)}`;
  const rows=c.items.map(([name,qty,status],i)=>`<div class="admin-preview-row"><span class="admin-thumb" aria-hidden="true">0${i+1}</span><strong>${name}</strong><span>${qty}</span><small>${status}</small></div>`).join("");
  return `<section class="admin-panel-section" id="admin-panel" aria-labelledby="admin-panel-heading"><div class="wrap">
    <div class="admin-panel-intro"><div class="admin-panel-copy"><div class="eyebrow">${c.eyebrow}</div><h2 id="admin-panel-heading">${c.title}</h2><p class="admin-panel-tagline">${c.tagline}</p><p class="admin-panel-description">${c.description}</p><p class="admin-panel-context">${c.intro}</p><a class="button" href="#admin-investment">${c.cta}<span class="arrow" aria-hidden="true">↘</span></a><a class="text-link admin-guide-jump" href="#business-management-guide">${lang === "es" ? "Cómo funciona + ejemplos prácticos" : "How it works + practical examples"} <span aria-hidden="true">↗</span></a></div>
    <div class="admin-preview" role="img" aria-label="${c.mockNote}"><div class="admin-preview-header"><span>◉ &nbsp; ${c.mockLabel}</span><span class="admin-preview-online" aria-hidden="true"></span></div><div class="admin-preview-content"><h3>${c.mockHeading}</h3><div class="admin-preview-labels"><span>${c.columns[0]}</span><span>${c.columns[1]}</span><span>${c.columns[2]}</span></div><div class="admin-preview-rows">${rows}</div><div class="admin-preview-footer"><span>AB STUDIO / DASHBOARD CONCEPT</span><span>▦</span></div></div><div class="admin-preview-caption">${c.mockNote}</div></div></div>
    ${businessAddonMarkup(lang,"inline")}
    <div class="admin-features-heading"><div class="eyebrow">AB STUDIO</div><h3>${c.featureHeader}</h3></div><div class="admin-features-grid">${features}</div>
    <div class="admin-investment" id="admin-investment"><div><div class="eyebrow">${c.investmentTag}</div><h3>${c.investmentTitle}</h3><p>${c.investmentDescription}</p><div class="admin-investment-price">${c.investmentValue}</div><a class="button" href="${message}">${c.cta}<span class="arrow" aria-hidden="true">↗</span></a></div><div class="admin-modules"><h4>${c.exampleTitle}</h4><ul>${c.modules.map(m=>`<li>${m}</li>`).join("")}</ul></div></div><p class="admin-panel-note">${c.priceNote}</p>
    </div></section>`;
}
    const adminGuideData = {"en":{"eyebrow":"HOW BUSINESS MANAGEMENT WORKS","heading":"Your website is the storefront. This is the control room.","intro":"Customers see your website. You and your authorized team use a separate, private dashboard to update business information and manage daily tasks. Both can work from the same connected data, without editing website code for every routine change.","front":"PUBLIC WEBSITE","frontTitle":"What customers see","frontBody":"Products, prices, services, availability and contact or ordering options.","back":"PRIVATE DASHBOARD","backTitle":"What your team controls","backBody":"Catalog, inventory, orders, bookings, access and reports—according to the modules you choose.","db":"CLOUD DATABASE","dbBody":"Stores approved changes and supplies the latest information to the website and dashboard.","howTag":"THE PROCESS","howTitle":"From an edit to a live update.","howIntro":"Here is what a properly connected setup can do. The exact experience depends on your website, selected modules and hosting.","steps":[["Sign in","The owner or employee signs in using an approved account, such as Google."],["Verify permissions","The system checks which actions this user may perform. Signing in is not the same as having admin rights."],["Make a change","A permitted user edits a price, product, order status or available appointment."],["Save securely","The application validates the information and writes the authorized change to the database."],["Update the website","The public site reads the new value on its next refresh or through a real-time update, depending on the setup."]],"examplesTag":"PRACTICAL EXAMPLES","examplesTitle":"How would this work in a real business?","examplesIntro":"Three illustrative scenarios, each requiring the corresponding module and integrations to be included in the project.","examples":[{"num":"01","type":"FLOWER SHOP","title":"Change a bouquet price without calling a developer","description":"The owner opens Products, selects the Spring Bouquet, changes the price from $65 to $75 and saves it.","result":"The public catalog displays $75 after it receives the updated product data. Stock and photos can be edited in the same place.","note":"Requires a database-connected catalog."},{"num":"02","type":"RESTAURANT","title":"Keep availability and orders organized","description":"A manager updates available reservation times, reviews a new booking request and marks a confirmed order as being prepared.","result":"The booking interface can use the updated availability, while staff see the correct order status in their private dashboard.","note":"Requires booking/order modules; third-party delivery systems may need separate integrations."},{"num":"03","type":"SERVICE BUSINESS","title":"Manage appointments across a team","description":"A salon or service provider changes an employee's schedule and assigns an incoming appointment request.","result":"Customers can see the available slots defined by the business, and staff know who is responsible for each appointment.","note":"Requires scheduling, staff permissions and an agreed confirmation workflow."}],"demoTag":"TRY A SIMULATED UPDATE","demoTitle":"Try changing a product price.","demoIntro":"This interactive illustration shows how a dashboard could update a public product listing. It is not connected to any real shop, database or payment system.","demoPanel":"PRIVATE ADMIN PANEL","demoPublic":"PUBLIC PRODUCT PAGE","demoProduct":"Spring Bouquet","demoLabel":"New price (USD)","demoCurrent":"Current public price","demoAfter":"Updated public price","demoSave":"Save change (demo)","demoReset":"Reset example","demoInitial":"The public listing still shows $65.","demoSaved":"Demo updated: the public listing now shows","demoResetStatus":"Demo reset to the original price.","demoError":"Enter a valid price between $1 and $99,999.","demoBadge":"SIMULATION ONLY","demoFoot":"In a real project, changes would go through permission checks and a cloud database before appearing on the website.","integrationTag":"HOW WE BUILD IT","integrationTitle":"How would AB Studio connect it to your website?","integrationIntro":"A management panel needs more than a visual interface. We connect private tools and public pages through a secure backend and a shared data source.","integration":[{"title":"You already have a website","body":"We first review how it currently stores products, requests and availability. If prices are written directly into HTML or React components, we move that information to a database and update the public pages to read it. We can often preserve the existing design.","points":["Audit the current website and business workflow","Create the required database tables and authorized actions","Connect only the modules you actually need"]},{"title":"You are starting a new website","body":"We design the public site and its administration system together. That makes it easier to decide which content should be editable, how staff access works and how inventory or reservations are synchronized from the beginning.","points":["Define customer-facing and private features","Build the website and dashboard around the same data model","Test the complete workflow before launch"]}],"techTag":"SECURITY & TECHNOLOGY","techTitle":"Private access, reliable information and clear permissions.","techLead":"A practical stack could combine a website hosted on Vercel with a secure application backend and a cloud database such as Supabase/PostgreSQL. The final architecture depends on the project.","protections":[["Google sign-in & user roles","Google OAuth verifies identity. We also check server-side permissions so only approved owners or employees can view and change the information assigned to them."],["Business data & reporting","The system can track products and orders stored or connected to it. Best-seller rankings and revenue reports require real sales records—not invented dashboard figures."],["Storage, backups & maintenance","Hosting, database limits, third-party tools, backup policies and ongoing support are reviewed in the quote. Daily backups or priority support are not assumed unless agreed."]],"costTag":"INVESTMENT & SCOPE","costTitle":"Build only the modules that create value.","costBody":"Business Management is an optional add-on to any AB Studio website plan—Basic, Professional or Premium. You keep the website's original starting price and receive a separate quote for the selected management modules. Development, hosting, third-party tools and optional maintenance are scoped separately.","differenceTitle":"Business Management vs. CRM","differenceBody":"Business Management focuses on operating the business—for example catalog, inventory, orders and availability. A CRM focuses on customer relationships, leads and sales follow-up. They can be connected, but they are not the same product.","faqTag":"COMMON QUESTIONS","faqTitle":"Questions business owners usually ask.","faq":[["Will I need AB Studio every time I change a product?","Not for changes supported by the modules you purchase. After training, authorized users can make routine edits themselves."],["Will changes appear immediately?","Database updates can be saved quickly. Public visibility depends on page refreshes, caching and whether real-time updates were included. We test this during implementation."],["Can I use it on my phone?","We design responsive dashboards for mobile, tablet and desktop, though advanced data tables may be easier to manage from a computer."],["Can every employee access everything?","No. We define roles and check permissions for each operation. Each person should receive only the access needed for their work."],["Is this already a fully functioning universal software product?","No. This page explains the service AB Studio can build. Each client's actual dashboard, integrations and security setup are developed and tested as a separate project."]],"ctaTag":"LET'S PLAN YOUR SYSTEM","ctaTitle":"Tell us what takes too much time today.","ctaBody":"Share your business type, whether you already have a website and the tasks you want to manage. We'll recommend an initial set of modules and a clear scope before quoting.","cta":"Request a module-based quote","subject":"Business Management - customized dashboard inquiry","mail":"Hello AB Studio, I would like to discuss a Business Management dashboard.\nBusiness type:\nExisting website:\nTasks I want to manage:\nModules I may need:\n","workDemo":{"tag":"ANOTHER INTERACTIVE EXAMPLE","title":"Watch one order update the business.","intro":"Place a fictional paid order for two bouquets. See how inventory, order status and example revenue change together. Nothing is saved or connected to a real store.","product":"Spring Bouquet · 2 units × $75","inventory":"Available inventory","orders":"Orders recorded","revenue":"Recorded example sales","status":"Latest order","none":"No order","paid":"Confirmed","prep":"Preparing","completed":"Completed","place":"Place sample paid order","next":"Move to next status","reset":"Reset example","ready":"Try a sample order.","created":"Sample order recorded. Inventory and the totals updated.","advanced":"Sample order status updated.","limit":"Complete the current example or reset it.","disclaimer":"Fictional inventory, order and sales data. A real business requires a connected checkout/order source, authorization and an inventory-safe database workflow."}},"es":{"eyebrow":"CÓMO FUNCIONA BUSINESS MANAGEMENT","heading":"Tu web es la vitrina. Este es el centro de control.","intro":"Tus clientes visitan la página pública. Tú y tu equipo autorizado utilizan un panel privado para actualizar información y organizar las tareas del negocio. Ambas partes pueden trabajar con los mismos datos sin editar el código cada vez que cambie algo.","front":"PÁGINA WEB PÚBLICA","frontTitle":"Lo que ven tus clientes","frontBody":"Productos, precios, servicios, disponibilidad y opciones para contactar o pedir.","back":"PANEL PRIVADO","backTitle":"Lo que administra tu equipo","backBody":"Catálogo, inventario, pedidos, reservas, usuarios y reportes, según los módulos contratados.","db":"BASE DE DATOS EN LA NUBE","dbBody":"Guarda los cambios autorizados y proporciona la información a la web y al panel.","howTag":"PASO A PASO","howTitle":"De un cambio en el panel a tu sitio web.","howIntro":"Esto es lo que puede hacer un sistema correctamente conectado. El resultado depende de la web, los módulos y el hosting contratado.","steps":[["Iniciar sesión","El dueño o empleado entra con una cuenta autorizada, por ejemplo mediante Google."],["Verificar permisos","El sistema comprueba qué puede hacer esa persona. Iniciar sesión no significa tener acceso administrativo automáticamente."],["Realizar un cambio","Un usuario autorizado modifica el precio, el producto, el estado de un pedido o un horario disponible."],["Guardar de forma segura","La aplicación valida la información y registra la modificación autorizada en la base de datos."],["Actualizar la página","La web pública consulta el nuevo valor al recargar o mediante una actualización en tiempo real, según la configuración."]],"examplesTag":"EJEMPLOS PRÁCTICOS","examplesTitle":"¿Cómo se utilizaría en un negocio real?","examplesIntro":"Tres escenarios ilustrativos. Cada uno requiere que los módulos e integraciones correspondientes estén incluidos en el proyecto.","examples":[{"num":"01","type":"FLORERÍA","title":"Cambiar el precio de un arreglo sin llamar al desarrollador","description":"La propietaria abre Productos, selecciona el Arreglo Primavera, cambia el precio de $65 a $75 y guarda.","result":"El catálogo público muestra $75 cuando recibe el dato actualizado. También se podrían editar existencias, fotografías y descripciones.","note":"Requiere conectar el catálogo a una base de datos."},{"num":"02","type":"RESTAURANTE","title":"Organizar disponibilidad, reservas y pedidos","description":"El encargado actualiza los horarios disponibles, revisa una nueva solicitud de reserva y marca un pedido como «En preparación».","result":"La página de reservas puede consultar la disponibilidad actual y el personal ve el estado correcto de cada pedido en su panel.","note":"Requiere módulos de reservas y pedidos; los servicios de delivery externos pueden necesitar integraciones adicionales."},{"num":"03","type":"NEGOCIO DE SERVICIOS","title":"Coordinar las citas de varios empleados","description":"Un salón o negocio de servicios modifica el horario de un empleado y le asigna una solicitud de cita.","result":"Los clientes pueden ver los horarios disponibles definidos por el negocio y el personal sabe quién atenderá cada cita.","note":"Requiere agenda, permisos del personal y un proceso de confirmación."}],"demoTag":"PRUEBA UNA SIMULACIÓN","demoTitle":"Prueba a cambiar el precio de un producto.","demoIntro":"Este ejemplo interactivo muestra cómo un panel podría actualizar un producto en la página pública. No está conectado a ninguna tienda, base de datos ni sistema de pagos real.","demoPanel":"PANEL PRIVADO","demoPublic":"PÁGINA PÚBLICA","demoProduct":"Arreglo Primavera","demoLabel":"Nuevo precio (USD)","demoCurrent":"Precio público actual","demoAfter":"Precio actualizado","demoSave":"Guardar cambio (demo)","demoReset":"Reiniciar ejemplo","demoInitial":"El producto público todavía muestra $65.","demoSaved":"Simulación actualizada: el producto público ahora muestra","demoResetStatus":"Se restableció el precio original del ejemplo.","demoError":"Introduce un precio válido entre $1 y $99,999.","demoBadge":"SOLO SIMULACIÓN","demoFoot":"En un proyecto real, el cambio pasaría por controles de permisos y una base de datos en la nube antes de aparecer en la web.","integrationTag":"CÓMO LO IMPLEMENTAMOS","integrationTitle":"¿Cómo conectaría AB Studio este sistema a tu página?","integrationIntro":"Un panel de gestión necesita más que una interfaz bonita. Conectamos las herramientas privadas y la web pública mediante un backend seguro y una fuente compartida de información.","integration":[{"title":"Tu negocio ya tiene una página web","body":"Primero revisamos cómo guarda los productos, las solicitudes y la disponibilidad. Si los precios están escritos directamente en HTML o React, los trasladamos a una base de datos y hacemos que la web los consulte. Normalmente podemos conservar el diseño existente.","points":["Revisar la web y el proceso actual del negocio","Crear las tablas y operaciones seguras necesarias","Conectar únicamente los módulos contratados"]},{"title":"Vas a contratar una página web nueva","body":"Diseñamos la web pública y el panel administrativo juntos. Así definimos desde el inicio qué se podrá editar, cómo funcionarán los permisos y de qué forma se sincronizarán inventarios o reservas.","points":["Definir funciones públicas y privadas","Desarrollar web y panel con el mismo modelo de datos","Probar el flujo completo antes de publicar"]}],"techTag":"TECNOLOGÍA Y SEGURIDAD","techTitle":"Acceso privado, información confiable y permisos claros.","techLead":"Una arquitectura posible combina la página alojada en Vercel con un backend seguro y una base de datos en la nube como Supabase/PostgreSQL. La elección final depende de cada proyecto.","protections":[["Google y roles administrativos","Google OAuth verifica la identidad. Además comprobamos los permisos desde el servidor para que solo los dueños o empleados aprobados vean o modifiquen la información autorizada."],["Datos del negocio y estadísticas","El sistema puede registrar o recibir productos, pedidos y ventas. Los reportes de ingresos y productos más vendidos necesitan datos de ventas reales, no cifras de ejemplo."],["Almacenamiento, respaldos y mantenimiento","La propuesta establece hosting, límites de base de datos, servicios externos, política de respaldos y soporte. No se prometen respaldos diarios ni soporte prioritario sin contratarlos."]],"costTag":"INVERSIÓN Y ALCANCE","costTitle":"Construimos los módulos que tu negocio realmente necesita.","costBody":"Business Management es un complemento opcional para cualquiera de los planes web de AB Studio: Básico, Profesional o Premium. El precio base de la web se mantiene, y los módulos administrativos se cotizan por separado. Desarrollo, hosting, herramientas externas y mantenimiento opcional se definen en la propuesta.","differenceTitle":"Diferencia entre Business Management y CRM","differenceBody":"Business Management se enfoca en la operación: catálogo, inventario, pedidos y disponibilidad. Un CRM se enfoca en contactos, clientes potenciales y seguimiento comercial. Se pueden conectar, pero no son exactamente el mismo producto.","faqTag":"PREGUNTAS FRECUENTES","faqTitle":"Lo que suele preguntar un dueño de negocio.","faq":[["¿Tendré que escribirle a AB Studio para cambiar cada producto?","No para los cambios admitidos por los módulos contratados. Después de una capacitación, los usuarios autorizados podrán realizar esas modificaciones."],["¿Los cambios aparecen inmediatamente?","Los datos pueden guardarse rápidamente. Lo que se ve en la web depende de recargas, caché y de si contratamos actualizaciones en tiempo real. Esto se comprueba durante el desarrollo."],["¿Puedo usarlo desde el teléfono?","El panel se diseña adaptable a celular, tableta y computadora, aunque las tablas de información grandes pueden ser más cómodas desde una computadora."],["¿Todos los empleados podrán modificarlo todo?","No. Definimos roles y comprobamos los permisos de cada operación. Cada persona debe tener acceso solo a lo que necesita."],["¿Este producto ya está construido para conectar cualquier web automáticamente?","No. Esta página explica el servicio que AB Studio puede desarrollar. Cada panel, integración y configuración de seguridad se construye y prueba según el proyecto."]],"ctaTag":"PLANIFIQUEMOS TU SISTEMA","ctaTitle":"Cuéntanos qué tareas te quitan tiempo cada día.","ctaBody":"Dinos qué tipo de negocio tienes, si ya cuentas con una web y qué procesos quieres gestionar. Te recomendaremos los módulos iniciales y un alcance claro antes de cotizar.","cta":"Solicitar cotización por módulos","subject":"Business Management - cotización de panel personalizado","mail":"Hola AB Studio, quiero conversar sobre un panel Business Management.\nTipo de negocio:\nPágina web actual:\nTareas que quiero gestionar:\nMódulos que me interesan:\n","workDemo":{"tag":"OTRO EJEMPLO INTERACTIVO","title":"Mira cómo un pedido cambia los datos del negocio.","intro":"Registra un pedido ficticio pagado de dos arreglos. Observa cómo cambian el inventario, el estado del pedido y las ventas ilustrativas. Nada se guarda ni se conecta con una tienda real.","product":"Arreglo Primavera · 2 unidades × $75","inventory":"Inventario disponible","orders":"Pedidos registrados","revenue":"Ventas registradas (ejemplo)","status":"Último pedido","none":"Sin pedidos","paid":"Confirmado","prep":"En preparación","completed":"Completado","place":"Registrar pedido de ejemplo","next":"Avanzar estado del pedido","reset":"Reiniciar ejemplo","ready":"Prueba un pedido ficticio.","created":"Pedido de ejemplo registrado. Se actualizaron el inventario y los totales.","advanced":"Se actualizó el estado del pedido ficticio.","limit":"Completa el pedido actual o reinicia el ejemplo.","disclaimer":"Los datos de inventario, pedidos y ventas son ficticios. Una implementación real requiere conexión a pedidos/pagos, permisos y controles para evitar errores de inventario."}}};
    function adminGuideMarkup(lang){
 const d=adminGuideData[lang]||adminGuideData.en;
 const compare=`<div class="bm-comparison"><article><span class="bm-kicker">${d.front}</span><span class="bm-icon" aria-hidden="true">↗</span><h3>${d.frontTitle}</h3><p>${d.frontBody}</p></article><article><span class="bm-kicker">${d.back}</span><span class="bm-icon" aria-hidden="true">▤</span><h3>${d.backTitle}</h3><p>${d.backBody}</p></article></div><div class="bm-data-link"><span class="bm-dot" aria-hidden="true"></span><div><strong>${d.db}</strong><p>${d.dbBody}</p></div></div>`;
 const steps=d.steps.map(([title,description],i)=>`<li><span>${String(i+1).padStart(2,"0")}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join("");
 const examples=d.examples.map(e=>`<article class="bm-example"><div class="bm-example-head"><span class="bm-example-number">${e.num}</span><small>${e.type}</small></div><h3>${e.title}</h3><p>${e.description}</p><p class="bm-example-result">${e.result}</p><small class="bm-example-note">${e.note}</small></article>`).join("");
 const implementation=d.integration.map((c,i)=>`<article class="bm-integration-card"><small>0${i+1}</small><h3>${c.title}</h3><p>${c.body}</p><ul>${c.points.map(s=>`<li>${s}</li>`).join("")}</ul></article>`).join("");
 const protections=d.protections.map(([title,description])=>`<article class="bm-protection"><h3>${title}</h3><p>${description}</p></article>`).join("");
 const faq=d.faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("");
 const email=`mailto:sales.abstudio@gmail.com?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.mail)}`;

 const demo=d.workDemo;
 const workflow=`<section class="bm-guide bm-workflow" aria-labelledby="bm-workflow-heading"><div class="wrap"><div class="bm-section-head"><div class="eyebrow">${demo.tag}</div><h2 id="bm-workflow-heading">${demo.title}</h2><p>${demo.intro}</p></div>
  <div class="bm-workflow-board" data-bm-workflow data-statuses="${demo.paid}|${demo.prep}|${demo.completed}" data-created="${demo.created}" data-advanced="${demo.advanced}" data-limit="${demo.limit}" data-ready="${demo.ready}" data-none="${demo.none}">
    <div class="bm-workflow-kpis"><div><small>${demo.inventory}</small><strong data-stock>15</strong></div><div><small>${demo.orders}</small><strong data-orders>0</strong></div><div><small>${demo.revenue}</small><strong data-revenue>$0</strong></div></div>
    <div class="bm-workflow-progress"><div><small>${demo.product}</small><h3>${demo.status}: <span data-order-status>${demo.none}</span></h3><p data-workflow-status role="status" aria-live="polite">${demo.ready}</p></div><div class="bm-workflow-actions"><button class="button" type="button" data-place-order>${demo.place}</button><button class="button outline" type="button" data-next-order disabled>${demo.next}</button><button class="button outline" type="button" data-reset-order>${demo.reset}</button></div></div>
  </div><p class="bm-clarification">${demo.disclaimer}</p></div></section>`;

 return `<section class="bm-guide" id="business-management-guide" aria-labelledby="bm-guide-heading"><div class="wrap">
   <div class="bm-lead"><div class="eyebrow">${d.eyebrow}</div><h2 id="bm-guide-heading">${d.heading}</h2><p>${d.intro}</p></div>${compare}
   </div></section>
   <section class="bm-guide bm-guide--deep" aria-labelledby="bm-flow-heading"><div class="wrap"><div class="bm-section-head"><div class="eyebrow">${d.howTag}</div><h2 id="bm-flow-heading">${d.howTitle}</h2><p>${d.howIntro}</p></div><ol class="bm-process">${steps}</ol></div></section>
   <section class="bm-guide" aria-labelledby="bm-examples-heading"><div class="wrap"><div class="bm-section-head"><div class="eyebrow">${d.examplesTag}</div><h2 id="bm-examples-heading">${d.examplesTitle}</h2><p>${d.examplesIntro}</p></div><div class="bm-examples">${examples}</div></div></section>
   <section class="bm-guide bm-guide--demo" aria-labelledby="bm-demo-heading"><div class="wrap"><div class="bm-demo-head"><div><div class="eyebrow">${d.demoTag}</div><h2 id="bm-demo-heading">${d.demoTitle}</h2><p>${d.demoIntro}</p></div><span class="bm-sim-tag">${d.demoBadge}</span></div>
     <div class="bm-demo" data-bm-demo data-bm-saved="${d.demoSaved}" data-bm-error="${d.demoError}" data-bm-reset-status="${d.demoResetStatus}">
       <div class="bm-demo-private"><div class="bm-demo-window">${d.demoPanel}</div><h3>${d.demoProduct}</h3><label for="bm-demo-input">${d.demoLabel}</label><input id="bm-demo-input" data-bm-price-input type="number" inputmode="decimal" min="1" max="99999" step=".01" value="75"><div class="bm-demo-actions"><button type="button" class="button" data-bm-save>${d.demoSave}</button><button type="button" class="button outline" data-bm-reset>${d.demoReset}</button></div></div>
       <div class="bm-demo-arrow" aria-hidden="true">→</div>
       <div class="bm-demo-public"><div class="bm-demo-window">${d.demoPublic}</div><div class="bm-demo-product-visual" aria-hidden="true">✿</div><h3>${d.demoProduct}</h3><small>${d.demoCurrent}</small><strong data-bm-current>$65</strong><p class="bm-demo-status" aria-live="polite" data-bm-status>${d.demoInitial}</p></div>
     </div><p class="bm-clarification">${d.demoFoot}</p></div></section>
   ${workflow}
   <section class="bm-guide" aria-labelledby="bm-integration-heading"><div class="wrap"><div class="bm-section-head"><div class="eyebrow">${d.integrationTag}</div><h2 id="bm-integration-heading">${d.integrationTitle}</h2><p>${d.integrationIntro}</p></div><div class="bm-integration-grid">${implementation}</div></div></section>
   <section class="bm-guide bm-guide--deep" aria-labelledby="bm-security-heading"><div class="wrap"><div class="bm-section-head"><div class="eyebrow">${d.techTag}</div><h2 id="bm-security-heading">${d.techTitle}</h2><p>${d.techLead}</p></div><div class="bm-protection-grid">${protections}</div></div></section>
   <section class="bm-guide" aria-labelledby="bm-cost-heading"><div class="wrap"><div class="bm-cost"><div><div class="eyebrow">${d.costTag}</div><h2 id="bm-cost-heading">${d.costTitle}</h2><p>${d.costBody}</p></div><aside><h3>${d.differenceTitle}</h3><p>${d.differenceBody}</p><a href="/crm/#crm-plans" class="text-link">${lang==="es"?"Ver planes de CRM":"View CRM plans"} <span aria-hidden="true">↗</span></a></aside></div></div></section>
   <section class="bm-guide bm-guide--deep" aria-labelledby="bm-faq-heading"><div class="wrap"><div class="bm-faq"><div><div class="eyebrow">${d.faqTag}</div><h2 id="bm-faq-heading">${d.faqTitle}</h2></div><div class="bm-faq-questions">${faq}</div></div></div></section>
   <section class="bm-guide bm-guide--cta" aria-labelledby="bm-cta-heading"><div class="wrap"><div><div class="eyebrow">${d.ctaTag}</div><h2 id="bm-cta-heading">${d.ctaTitle}</h2><p>${d.ctaBody}</p></div><a class="button" href="${email}">${d.cta} <span class="arrow" aria-hidden="true">↗</span></a></div></section>`;
}
        const crmText = {"en":{"tag":"CUSTOMER FOLLOW-UP / CRM","title":"Keep track of leads, customers and next steps.","intro":"A CRM is for customer relationships: inquiries, sales opportunities, reminders and follow-ups. It is different from Business Management, which handles inventory and daily operations. The two can be combined when useful.","demo":"ILLUSTRATIVE CRM / NOT REAL CUSTOMER DATA","workflow":"Your daily workflow","rows":[["New lead","To review"],["Sales opportunity","Following up"],["Customer request","Completed"]],"featuresTitle":"What does a CRM actually do?","features":[["One place for customer records","Store inquiry details, customer requests and follow-up notes in one place."],["A clearer sales process","Move opportunities through stages such as New, Contacted, Quote sent and Won."],["Less manual administration","Keep customer interactions, team tasks and next steps organized as your business grows."]],"pricingTag":"CRM PLANS & VERSIONS","pricingTitle":"A plan for every stage of your business.","pricingIntro":"Choose the level of customer management your team needs. Starter organizes contacts, Growth adds follow-up automation and reporting, and Enterprise supports custom multi-team workflows. Implementation is a separate one-time fee; monthly support starts after launch.","setupLabel":"ONE-TIME IMPLEMENTATION","monthlyLabel":"MONTHLY MAINTENANCE & SUPPORT","after":"After launch","idealLabel":"Ideal for","popular":"MOST POPULAR","plans":[{"name":"CRM Starter","label":"Basic","tag":"Start organized","setup":"$900–$1,500","month":"$39","ideal":"Entrepreneurs and small businesses that want their contacts and inquiries in one place.","desc":"The essentials to organize conversations and potential customers.","features":["Customer and lead management","Basic sales pipeline","Connection to website inquiry forms","WhatsApp contact link / click-to-chat","Basic support and maintenance plan"],"scenario":"A small cleaning business receives requests from its website and needs one place to keep names, phone numbers and quote statuses.","steps":["A contact arrives from the website inquiry form.","You mark it as New, Contacted or Quote sent.","You open the contact record and follow up manually."],"result":"Fewer requests get lost in messages or notebooks."},{"name":"CRM Growth","label":"Professional","tag":"Make follow-up easier","setup":"$1,500–$3,000","month":"$89","ideal":"Growing businesses that need better follow-up and more visibility over sales.","desc":"More automation, reporting and teamwork.","features":["Everything in Starter","Task and follow-up automation","Email notifications and workflows","Conversion reports and basic metrics","Multiple users and access roles"],"scenario":"A home-remodeling company receives many estimates each week and has multiple staff members handling follow-ups.","steps":["New leads are assigned to the right team member.","The team uses automated reminders or email flows configured for the project.","Reports show how many recorded inquiries became customers."],"result":"More consistent follow-up, clearer ownership and visibility into recorded conversions."},{"name":"CRM Enterprise","label":"Enterprise","tag":"Built for your operation","setup":"$3,000+","month":"$199+","ideal":"Established operations requiring tailored workflows and connected systems.","desc":"Flexible tools and advanced management tailored to your needs.","features":["Everything in Growth","Custom modules and API integrations","Advanced administration dashboard","Priority technical support","Daily automated backups where supported by hosting"],"scenario":"A business with several locations wants custom sales stages, staff permissions and a link with its existing systems.","steps":["We map the business's teams, locations and sales process.","The agreed modules and APIs share authorized information.","Management reviews consolidated records and custom reports."],"result":"One coordinated sales process adapted to a more complex organization."}],"action":"Get a quote","subject":"CRM plan inquiry","mailBody":"Hello AB Studio, I'm interested in","seePlans":"See CRM plans & pricing","note":"Indicative USD pricing, subject to a written scope and proposal. One-time implementation and monthly maintenance are separate charges. Monthly plans start after launch and cover the maintenance/support scope agreed in the contract; hosting, domain, third-party software or API usage, WhatsApp Business API fees, email providers, large feature changes and taxes are not automatically included. WhatsApp integration in Starter means a contact link, not a paid WhatsApp Business API connection.","questionsTitle":"Before you choose","faq":[["What is the difference between setup and monthly support?","Implementation pays for designing, configuring and launching your agreed CRM. The monthly amount covers the ongoing maintenance and support level defined for your chosen version."],["Is a CRM the same as a website?","No. Your website is public-facing; your CRM is the private management area. They can be connected but website design is priced separately."],["Do the plans include third-party fees?","No. Hosting, paid email tools, messaging APIs and other providers are quoted separately. Daily backups and priority support depend on the agreed technical setup and support terms."],["Will the CRM send WhatsApp messages automatically?","Starter includes a WhatsApp contact link, not access to private chats. Automated WhatsApp Business messaging needs separately scoped API access, provider approval and applicable fees."],["Do I have to purchase an AB Studio website?","Not necessarily. A CRM may be able to connect to an existing website or other eligible systems after a technical review. Building a new website is quoted separately."],["Does the CRM automatically know my sales?","Only sales or opportunity outcomes recorded in the CRM or imported through an approved integration can appear in its reports. We do not generate fictitious business results."]],"preview":"Illustration of an administrative CRM workspace","months":"/ month","whatTag":"CRM EXPLAINED","whatTitle":"What is a CRM, and why would my business need one?","whatIntro":"CRM stands for Customer Relationship Management. Think of it as a private place to organize every customer inquiry, remember who needs a reply, and track what happens before and after a sale. Instead of switching between emails, paper notes and spreadsheets, your team can follow one clear process.","whatKey":"A CRM helps you answer three everyday questions:","whatQuestions":["Who contacted us?","Who should we follow up with?","Which opportunities became customers?"],"journeyTag":"AN EXAMPLE FROM START TO FINISH","journeyTitle":"How a customer inquiry moves through your CRM","journeyIntro":"Imagine you run a local home-cleaning business. A potential customer requests a quote on your website. Here's how your team could handle it with the right CRM features.","journeySteps":[["01","A customer gets in touch","Someone completes your website contact form asking about a cleaning appointment."],["02","The inquiry becomes a lead","The CRM creates or updates a contact record, including their request and the status “New lead.”"],["03","You organize the next action","You move the lead into “Quote sent” and note who should contact them next."],["04","You follow up","You record the response, schedule a reminder, or use automated notifications if your plan includes them."],["05","You see the outcome","When the customer accepts, you mark the opportunity as won. Your reports can reflect real recorded results."]],"journeyNote":"Illustrative workflow. Capturing forms, automated notifications and reporting depend on the modules and integrations included in the proposal. WhatsApp click-to-chat does not automatically read or store conversations.","comparisonTag":"WHICH TOOL DO YOU ACTUALLY NEED?","comparisonTitle":"A CRM isn't the same as a website or inventory dashboard.","comparison":[["Website","Your public storefront: services, products, contact details and forms."],["Customer CRM","Your private customer workflow: leads, conversations, quotes and follow-ups."],["Business Management","Your operational dashboard: products, stock, orders and business tasks."]],"comparisonNote":"They can work together, but you do not need to buy every service. We recommend modules based on your actual workflow.","setupExplain":"One-time implementation builds and configures the agreed CRM, including its workflows, access, launch and approved connections.","monthlyExplain":"Monthly maintenance starts after launch and covers the support and upkeep defined for the selected plan. It is not unlimited feature development.","includedLabel":"WHAT'S INCLUDED","scenarioLabel":"REAL-WORLD EXAMPLE","stepsLabel":"WHAT A TYPICAL DAY LOOKS LIKE","outcomeLabel":"THE PRACTICAL BENEFIT","planExplainer":"The prices below separate building the system from supporting it after launch. Every example is illustrative, not a guaranteed business result."},"es":{"tag":"SEGUIMIENTO DE CLIENTES / CRM","title":"Organiza clientes, oportunidades y próximos pasos.","intro":"Un CRM sirve para gestionar relaciones comerciales: solicitudes, contactos, oportunidades y seguimientos. Es distinto de Business Management, que administra inventario y operaciones. Ambos pueden combinarse si lo necesitas.","demo":"CRM ILUSTRATIVO / SIN DATOS DE CLIENTES REALES","workflow":"Tu trabajo diario","rows":[["Cliente potencial","Por revisar"],["Oportunidad","En seguimiento"],["Solicitud","Completada"]],"featuresTitle":"¿Para qué sirve un CRM?","features":[["Toda la información de clientes","Guarda los datos de quienes consultan por tus servicios, sus solicitudes y notas de seguimiento."],["Un proceso de ventas más claro","Mueve cada oportunidad por etapas como Nuevo, Contactado, Cotización enviada y Confirmado."],["Menos tareas manuales","Organiza la comunicación, las responsabilidades del equipo y los siguientes pasos."]],"pricingTag":"PLANES Y VERSIONES DE CRM","pricingTitle":"Un plan para cada etapa de tu negocio.","pricingIntro":"Elige el nivel de gestión de clientes que necesite tu negocio. Starter organiza contactos, Growth añade automatización y reportes, y Enterprise permite procesos personalizados para varios equipos. La implementación es un pago único y el soporte mensual empieza después del lanzamiento.","setupLabel":"IMPLEMENTACIÓN · PAGO ÚNICO","monthlyLabel":"MANTENIMIENTO Y SOPORTE MENSUAL","after":"Después del lanzamiento","idealLabel":"Ideal para","popular":"MÁS ELEGIDO","plans":[{"name":"CRM Starter","label":"Básico","tag":"Empieza con orden","setup":"$900–$1,500","month":"$39","ideal":"Emprendedores y pequeños negocios que desean centralizar contactos y consultas.","desc":"Las herramientas esenciales para organizar clientes y conversaciones.","features":["Gestión de clientes y leads (contactos potenciales)","Embudo de ventas básico","Conexión con formularios de la página web","Enlace de contacto directo por WhatsApp","Plan de soporte y mantenimiento básico"],"scenario":"Una empresa pequeña de limpieza recibe solicitudes desde su sitio web y necesita organizar contactos y cotizaciones.","steps":["El formulario registra una nueva solicitud.","Marcas el contacto como Nuevo, Contactado o Cotización enviada.","Abres su ficha y haces el seguimiento manualmente."],"result":"Menos solicitudes perdidas entre mensajes y apuntes."},{"name":"CRM Growth","label":"Profesional","tag":"Mejora tus seguimientos","setup":"$1,500–$3,000","month":"$89","ideal":"Empresas en crecimiento que desean automatizar seguimientos y conocer sus resultados.","desc":"Más automatización, reportes y colaboración.","features":["Todo lo del CRM Starter","Automatización de tareas y seguimientos","Notificaciones y correos automatizados","Reportes y métricas de conversión","Varios usuarios y roles de acceso"],"scenario":"Una empresa de remodelaciones recibe muchas cotizaciones y varios empleados atienden a los interesados.","steps":["Asignas cada oportunidad al miembro del equipo correspondiente.","Configuras recordatorios o correos automatizados según el proyecto.","Revisas cuántas consultas registradas se convirtieron en clientes."],"result":"Seguimientos más constantes y claridad sobre el trabajo de cada empleado."},{"name":"CRM Enterprise","label":"Empresarial","tag":"Hecho a tu medida","setup":"$3,000+","month":"$199+","ideal":"Operaciones consolidadas que necesitan flujos, paneles e integraciones personalizadas.","desc":"Herramientas flexibles para una operación más compleja.","features":["Todo lo del CRM Growth","Módulos e integraciones personalizadas (API)","Panel administrativo avanzado","Soporte técnico prioritario","Respaldos automáticos diarios cuando el hosting lo permita"],"scenario":"Una empresa con varias sucursales necesita etapas de ventas personalizadas, permisos e integración con sistemas existentes.","steps":["Definimos los equipos, sucursales y etapas de ventas.","Conectamos los módulos y API incluidos en la propuesta.","La gerencia consulta registros consolidados y reportes a medida."],"result":"Un proceso comercial unificado y adaptado a una operación más compleja."}],"action":"Solicitar cotización","subject":"Cotización de CRM","mailBody":"Hola AB Studio, me interesa","seePlans":"Ver planes y precios del CRM","note":"Precios orientativos en USD, sujetos a una propuesta escrita. La implementación única y la mensualidad son cargos separados. El mantenimiento inicia después del lanzamiento y cubre el alcance de soporte acordado; hosting, dominio, software externo, consumo de API, tarifas de WhatsApp Business API, plataformas de correo, cambios mayores e impuestos no están incluidos automáticamente. En Starter la integración con WhatsApp consiste en un enlace de contacto, no una conexión de pago con WhatsApp Business API.","questionsTitle":"Antes de elegir","faq":[["¿Qué diferencia hay entre implementación y mensualidad?","La implementación cubre el diseño, configuración y lanzamiento del CRM contratado. La mensualidad corresponde al nivel de mantenimiento y soporte establecido en la propuesta."],["¿El CRM es lo mismo que una página web?","No. La web es pública y el CRM es el espacio privado de administración. Pueden conectarse, pero el desarrollo de páginas web se cotiza por separado."],["¿Incluye servicios de terceros?","No. Hosting, plataformas de correo, API de mensajes y otros proveedores se cotizan aparte. Los respaldos diarios y el soporte prioritario dependen de la infraestructura y las condiciones contratadas."],["¿El CRM envía mensajes de WhatsApp automáticamente?","Starter incluye un enlace de contacto por WhatsApp, pero no acceso a las conversaciones. La mensajería automática de WhatsApp Business requiere API, aprobación del proveedor y costos que se cotizan aparte."],["¿Tengo que contratar una página web nueva con AB Studio?","No necesariamente. Podemos revisar si el CRM se puede conectar a tu página actual u otros sistemas compatibles. El desarrollo de una web nueva se cotiza aparte."],["¿El CRM registra automáticamente todas mis ventas?","Los reportes muestran ventas u oportunidades que se registren en el CRM o que lleguen por una integración autorizada. No inventamos cifras de ventas."]],"preview":"Ejemplo ilustrativo de un panel administrativo CRM","months":"/ mes","whatTag":"ENTIENDE QUÉ ES UN CRM","whatTitle":"¿Qué es un CRM y para qué lo necesita mi negocio?","whatIntro":"CRM significa Gestión de Relaciones con Clientes. Es un espacio privado para organizar las consultas que recibes, recordar a quién debes responder y llevar el seguimiento antes y después de una venta. En vez de depender de correos, notas y hojas de cálculo separadas, tu equipo trabaja con un proceso claro.","whatKey":"Un CRM te ayuda a responder tres preguntas diarias:","whatQuestions":["¿Quién nos contactó?","¿A quién debemos darle seguimiento?","¿Qué oportunidades se convirtieron en clientes?"],"journeyTag":"EJEMPLO DE PRINCIPIO A FIN","journeyTitle":"Así pasa una solicitud de cliente por tu CRM","journeyIntro":"Imagina que tienes una empresa local de limpieza. Un posible cliente solicita una cotización en tu sitio web. Con los módulos adecuados, tu equipo podría gestionar la solicitud de esta manera.","journeySteps":[["01","Un cliente escribe","Alguien llena el formulario de tu web para consultar por un servicio de limpieza."],["02","Se registra el contacto","El CRM crea o actualiza una ficha con su información, solicitud y estado «Cliente nuevo»."],["03","Organizas el siguiente paso","Mueves la oportunidad a «Cotización enviada» y anotas quién debe responderle."],["04","Le das seguimiento","Registras su respuesta, agendas un recordatorio o usas notificaciones automáticas si el plan lo incluye."],["05","Conoces el resultado","Si acepta la propuesta, marcas la oportunidad como ganada. Los reportes reflejan los datos reales registrados."]],"journeyNote":"Flujo ilustrativo. La conexión con formularios, las notificaciones automáticas y los reportes dependen de los módulos e integraciones contratados. El enlace de WhatsApp no permite leer ni guardar conversaciones automáticamente.","comparisonTag":"¿QUÉ HERRAMIENTA NECESITA TU NEGOCIO?","comparisonTitle":"Un CRM no es lo mismo que una web o un panel de inventario.","comparison":[["Página web","Es la parte pública: servicios, productos, información y formularios."],["CRM de clientes","Es el seguimiento privado: contactos, cotizaciones y oportunidades comerciales."],["Business Management","Es la operación del negocio: productos, inventario, pedidos y tareas."]],"comparisonNote":"Se pueden conectar, pero no necesitas contratar todo. Recomendamos los módulos según el trabajo real de tu negocio.","setupExplain":"La implementación es un pago único para construir y configurar el CRM acordado: flujos de trabajo, accesos, lanzamiento y conexiones aprobadas.","monthlyExplain":"El mantenimiento comienza después del lanzamiento y cubre el soporte y cuidado definidos para cada plan. No incluye desarrollo ilimitado de funciones nuevas.","includedLabel":"QUÉ INCLUYE","scenarioLabel":"EJEMPLO PRÁCTICO","stepsLabel":"CÓMO SE UTILIZARÍA","outcomeLabel":"BENEFICIO PARA EL NEGOCIO","planExplainer":"Los precios separan el desarrollo del sistema y su mantenimiento después del lanzamiento. Los ejemplos son ilustrativos, no resultados comerciales garantizados."}};
    function crmPanelMarkup(lang){
  const c=crmText[lang]||crmText.en;
  const crmTiers=["starter","growth","enterprise"];
  c.plans.forEach((plan,i)=>{const rate=abPrices.crm[crmTiers[i]];plan.setup=abMoney(rate.min)+(rate.max===null?"+":"–"+abMoney(rate.max));plan.month=abMoney(rate.monthly)+(rate.max===null?"+":"");});
  const benefits=c.features.map(([name,desc],i)=>`<article class="crm-benefit"><small>0${i+1}</small><h3>${name}</h3><p>${desc}</p></article>`).join("");
  const offers=c.plans.map((p,i)=>{
    const query=`${c.mailBody} ${p.name} (${p.label}). ${c.setupLabel}: ${p.setup} USD. ${c.monthlyLabel}: ${p.month} USD ${c.months}. ${c.scenarioLabel}: ${p.scenario}`;
    const steps=p.steps.map((step,j)=>`<li><span>0${j+1}</span><p>${step}</p></li>`).join("");
    const href="mailto:sales.abstudio@gmail.com?subject="+encodeURIComponent(c.subject+" — "+p.name)+"&body="+encodeURIComponent(query);
    return `<article class="crm-plan ${i===1?"crm-plan--featured":""}"><div class="crm-plan-heading"><small class="crm-plan-tag">${p.tag}</small>${i===1?`<span class="crm-popular">${c.popular}</span>`:""}</div><h3>${p.name}</h3><div class="crm-plan-kind">${p.label}</div><p class="crm-plan-desc">${p.desc}</p><p class="crm-plan-ideal"><strong>${c.idealLabel}:</strong> ${p.ideal}</p><div class="crm-fees"><div class="crm-fee crm-fee--setup"><small>${c.setupLabel}</small><strong>${p.setup}<span> USD</span></strong></div><div class="crm-fee crm-fee--monthly"><small>${c.monthlyLabel}</small><strong>${p.month}<span> USD ${c.months}</span></strong><em>${c.after}</em></div></div><div class="crm-plan-example"><span class="crm-example-label">${c.scenarioLabel}</span><p>${p.scenario}</p><strong class="crm-example-steps-label">${c.stepsLabel}</strong><ol>${steps}</ol><p class="crm-example-outcome"><b>${c.outcomeLabel}:</b> ${p.result}</p></div><div class="crm-plan-inclusions"><span>${c.includedLabel}</span><ul>${p.features.map(f=>`<li>${f}</li>`).join("")}</ul></div><a class="button ${i===1?"":"outline"}" href="${href}">${c.action} <span class="arrow" aria-hidden="true">↗</span></a></article>`;
  }).join("");
  const journey=c.journeySteps.map(([num,title,description])=>`<li class="crm-journey-step"><span class="crm-journey-num">${num}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join("");
  const comparisons=c.comparison.map(([name,description],i)=>`<article class="crm-compare-card ${i===1?"crm-compare-card--focus":""}"><small>0${i+1}</small><h3>${name}</h3><p>${description}</p></article>`).join("");
  return `<section class="crm-section" id="crm-overview" aria-labelledby="crm-title"><div class="wrap">
    <div class="crm-hero"><div><div class="eyebrow">${c.tag}</div><h2 id="crm-title">${c.title}</h2><p>${c.intro}</p><a class="text-link" href="#crm-plans">${c.seePlans} <span aria-hidden="true">↘</span></a></div>
    <div class="crm-preview" role="img" aria-label="${c.preview}"><div class="crm-preview-bar">◉ &nbsp; ${c.demo}<span>●</span></div><div class="crm-preview-main"><h3>${c.workflow}</h3><div class="crm-preview-metrics"><span>${lang==="es"?"Clientes":"Customers"}</span><span>${lang==="es"?"Oportunidades":"Opportunities"}</span><span>${lang==="es"?"Seguimientos":"Follow-ups"}</span></div><div class="crm-preview-rows">${c.rows.map(([name,status],i)=>`<div><span>0${i+1}</span><b>${name}</b><small>${status}</small></div>`).join("")}</div></div><div class="crm-preview-caption">${c.preview}</div></div></div>
    <div class="crm-benefits-heading"><h3>${c.featuresTitle}</h3></div><div class="crm-benefits">${benefits}</div></div></section>
    <section class="crm-explanation" id="crm-how-it-works" aria-labelledby="crm-explainer-title"><div class="wrap">
      <div class="crm-definition"><div><div class="eyebrow">${c.whatTag}</div><h2 id="crm-explainer-title">${c.whatTitle}</h2></div><div class="crm-definition-copy"><p>${c.whatIntro}</p><strong>${c.whatKey}</strong><ul>${c.whatQuestions.map(q=>`<li>${q}</li>`).join("")}</ul></div></div>
      <div class="crm-journey"><div class="crm-journey-heading"><div class="eyebrow">${c.journeyTag}</div><h2>${c.journeyTitle}</h2><p>${c.journeyIntro}</p></div><ol class="crm-journey-steps">${journey}</ol><p class="crm-journey-note">${c.journeyNote}</p></div>
      <div class="crm-service-difference"><div class="crm-service-difference-heading"><div class="eyebrow">${c.comparisonTag}</div><h2>${c.comparisonTitle}</h2></div><div class="crm-compare-grid">${comparisons}</div><p>${c.comparisonNote}</p></div>
    </div></section>
    <section class="crm-pricing" id="crm-plans" aria-labelledby="crm-pricing-title"><div class="wrap"><div class="crm-pricing-heading"><div><div class="eyebrow">${c.pricingTag}</div><h2 id="crm-pricing-title">${c.pricingTitle}</h2></div><p>${c.pricingIntro}</p></div><div class="crm-payment-guide"><article><small>01</small><h3>${c.setupLabel}</h3><p>${c.setupExplain}</p></article><article><small>02</small><h3>${c.monthlyLabel}</h3><p>${c.monthlyExplain}</p></article></div><p class="crm-plan-intro-note">${c.planExplainer}</p><div class="crm-pricing-grid">${offers}</div><p class="crm-note">${c.note}</p><div class="crm-questions"><h3>${c.questionsTitle}</h3><div>${c.faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></div></section>`;
}
const priceCopy={"en":{"eyebrow":"CLEAR STARTING PRICES / NO UNEXPECTED ADD-ONS","heading":"Choose what your business needs. Know what it costs.","intro":"Start with a professional website, add business tools only when you need them, and request a tailored quote before committing. Every project is scoped in writing.","from":"From","per":"/mo","setup":"One-time setup","monthly":"Monthly maintenance","learn":"Explore service","details":"See what's included","labels":["Web Development","Business Management","Customer CRM","SEO & Visibility"],"blurbs":["Your public website: services, products and customer contact.","Private operations: catalog, stock, orders and daily tasks.","Customer relationships: leads, sales opportunities and follow-up.","Search visibility foundations and local profile checks."],"sectionWeb":"Website packages","sectionWebDesc":"One-time website build prices. Choose the scope that fits; hosting, domains and optional ongoing support are quoted separately.","webTags":["Start with confidence","Recommended for growing businesses","A distinctive online experience"],"webIdeal":["Local businesses that need a clear, trustworthy online presence.","Growing businesses ready to showcase more services and capture inquiries.","Businesses seeking a more tailored brand experience with interactive features."],"webFeatures":[["Responsive design","Essential business information","Contact links and location","Two minor revision rounds"],["Everything in Basic","Expanded services or product sections","Contact form","Basic on-page SEO"],["More personalized visual direction","Expanded pages and content","Scoped interactive features","Advanced systems quoted separately"]],"sectionManagement":"Business Management: build your own dashboard","sectionManagementDesc":"A private dashboard for daily operations. Start with the base platform, then add only the catalog, inventory, orders or other modules you need. Works with new websites or compatible existing ones.","base":"Dashboard base","baseDesc":"Secure team access, essential database setup, deployment and agreed technical maintenance. Operational modules and complex integrations are priced separately.","sectionCrm":"Dedicated CRM: three levels","sectionCrmDesc":"Manage inquiries and sales follow-ups without buying an inventory system. Includes one-time setup and clearly scoped ongoing support.","ideal":"Best for","sectionExtras":"SEO, add-ons and custom work","seoDesc":"Essential site and local-search review, setup and basic recurring checks. Search rankings are never guaranteed.","nfc":"NFC + QR review plaque","nfcDesc":"Sold separately; shipping depends on location.","custom":"Custom bookings and automation","customDesc":"Advanced systems, external integrations and special workflows require a written quote.","termsTitle":"Simple pricing, clear expectations","terms":[["One-time project fee","Agreed design, setup and launch. You approve the scope before development starts."],["Monthly support (when applicable)","Only for services that need ongoing care. The proposal states what is covered; new features cost extra."],["Extra services","Hosting, domains, paid tools, complex integrations and taxes are listed separately before you approve."]],"estimate":"Build your estimate","estimateDesc":"See a starting estimate for your website and optional tools. Business Management, CRM and SEO are never preselected.","existingQuestion":"Do you need a new website?","existing":"I already have a website / no new site","new":"I need a new website","chooseWeb":"Choose your website plan","addManagement":"Add Business Management","chooseModules":"Choose dashboard modules","addCrm":"Optional full CRM","noCrm":"No full CRM","crmHelp":"Choose either basic customer follow-up inside Business Management or a dedicated CRM. We will not charge for overlapping features twice.","seo":"Add SEO & local visibility","name":"Business name (optional)","notes":"What do you need? (optional)","summary":"Your starting estimate","oneTime":"One-time setup from","recurring":"Monthly from","breakdown":"Price breakdown","none":"No services selected","email":"Request quote by email","whatsapp":"Continue on WhatsApp","noSend":"Opens a prefilled message for your review. You choose whether to send it.","disclaimer":"Starting estimates, not final quotes. Hosting, domains, taxes, payment fees, third-party subscriptions, migration, and custom integrations are separate. Existing websites may need additional integration work. All recurring costs and deliverables are confirmed in writing.","followup":"Basic notes only; not a full CRM.","overlap":"Included in your selected full CRM; not charged twice.","managementExample":"Example: Dashboard base + product catalog starts at $1,000 setup + $59/mo. Add other modules only if they support your workflow."},"es":{"eyebrow":"PRECIOS CLAROS / SIN EXTRAS INESPERADOS","heading":"Elige lo que tu negocio necesita. Conoce su costo.","intro":"Comienza con una web profesional, agrega herramientas solo cuando las necesites y solicita una cotización personalizada sin compromiso. Cada proyecto se define por escrito.","from":"Desde","per":"/mes","setup":"Implementación inicial","monthly":"Mantenimiento mensual","learn":"Explorar servicio","details":"Ver qué incluye","labels":["Desarrollo web","Business Management","CRM de clientes","SEO y visibilidad"],"blurbs":["Tu sitio público: servicios, productos y contacto con clientes.","Operaciones privadas: catálogo, inventario, pedidos y tareas.","Relaciones comerciales: contactos, oportunidades y seguimiento.","Bases para buscadores y visibilidad local."],"sectionWeb":"Planes de páginas web","sectionWebDesc":"Precios de creación web pagados una sola vez. Elige el alcance adecuado; hosting, dominio y soporte continuo opcional se cotizan aparte.","webTags":["Una primera impresión profesional","Recomendado para negocios en crecimiento","Una presencia digital distintiva"],"webIdeal":["Negocios locales que necesitan una presencia clara y confiable.","Negocios en crecimiento con más servicios y formularios de contacto.","Marcas que necesitan un diseño personalizado y funciones interactivas."],"webFeatures":[["Diseño adaptable","Información esencial del negocio","Enlaces de contacto y ubicación","Dos rondas de cambios menores"],["Todo lo de Basic","Más secciones de servicios o productos","Formulario de contacto","SEO básico dentro de la página"],["Dirección visual más personalizada","Más páginas y contenido","Interacciones acordadas","Sistemas avanzados por separado"]],"sectionManagement":"Business Management: crea tu propio panel","sectionManagementDesc":"Un panel privado para administrar operaciones. Comienza con la base y agrega solamente catálogo, inventario, pedidos u otros módulos que necesites. Se integra con webs nuevas o existentes compatibles.","base":"Base del panel","baseDesc":"Acceso privado para el equipo, configuración inicial de datos, publicación y mantenimiento técnico acordado. Los módulos y las integraciones complejas se cobran por separado.","sectionCrm":"CRM independiente: tres niveles","sectionCrmDesc":"Gestiona solicitudes y seguimientos comerciales sin contratar un sistema de inventario. Incluye instalación y soporte continuo con alcance definido.","ideal":"Ideal para","sectionExtras":"SEO, complementos y proyectos personalizados","seoDesc":"Revisión esencial del sitio y búsqueda local, configuración inicial y comprobaciones básicas mensuales. No se garantizan posiciones en Google.","nfc":"Placa NFC + QR para reseñas","nfcDesc":"Se vende por separado; el envío depende del destino.","custom":"Reservas y automatización a medida","customDesc":"Sistemas avanzados, integraciones externas y procesos especiales requieren una cotización por escrito.","termsTitle":"Precios simples, expectativas claras","terms":[["Pago único del proyecto","Diseño, configuración y lanzamiento acordados. Apruebas el alcance antes de comenzar."],["Soporte mensual (cuando corresponda)","Solo para servicios que necesitan mantenimiento. La propuesta define lo incluido; las funciones nuevas se cotizan aparte."],["Servicios adicionales","Hosting, dominio, herramientas de pago, integraciones complejas e impuestos se detallan antes de aprobar."]],"estimate":"Configura tu presupuesto","estimateDesc":"Obtén un estimado inicial para tu web y los servicios opcionales. Business Management, CRM y SEO nunca se agregan automáticamente.","existingQuestion":"¿Necesitas una web nueva?","existing":"Ya tengo una web / no necesito otra","new":"Necesito una página web nueva","chooseWeb":"Elige tu plan web","addManagement":"Agregar Business Management","chooseModules":"Elige los módulos del panel","addCrm":"CRM completo opcional","noCrm":"Sin CRM completo","crmHelp":"Elige seguimiento básico dentro de Business Management o un CRM independiente. No cobramos dos veces por funciones duplicadas.","seo":"Agregar SEO y visibilidad local","name":"Nombre del negocio (opcional)","notes":"¿Qué necesitas? (opcional)","summary":"Tu inversión inicial estimada","oneTime":"Implementación desde","recurring":"Mensualidad desde","breakdown":"Desglose","none":"Ningún servicio seleccionado","email":"Solicitar por correo","whatsapp":"Continuar por WhatsApp","noSend":"Abre un mensaje preparado para que lo revises. Tú decides si enviarlo.","disclaimer":"Precios iniciales, no cotizaciones definitivas. Hosting, dominio, impuestos, comisiones de pago, suscripciones externas, migraciones e integraciones a medida son adicionales. Una web existente puede necesitar trabajo de conexión. Todos los costos recurrentes y entregables se confirman por escrito.","followup":"Solo notas básicas; no equivale a un CRM completo.","overlap":"Incluido en el CRM completo seleccionado; no se cobra dos veces.","managementExample":"Ejemplo: panel base + catálogo de productos desde $1,000 de instalación + $59/mes. Agrega otros módulos únicamente si los necesitas."}};
function pricingPageMarkup(lang){
 const d=priceCopy[lang]||priceCopy.en,es=lang==="es",money=abMoney;
 const monthly=n=>money(n)+d.per;
 const tiers=["basic","professional","premium"],crmTiers=["starter","growth","enterprise"];
 const data=[
  {route:"/sitios-web/",value:abPrices.web.basic,monthly:0},
  {route:"/business-management/",value:abPrices.management.base.setup,monthly:abPrices.management.base.monthly},
  {route:"/crm/",value:abPrices.crm.starter.min,monthly:abPrices.crm.starter.monthly},
  {route:"/seo/",value:abPrices.seo.setup,monthly:abPrices.seo.monthly}
 ];
 const cards=data.map((c,i)=>`<a href="${c.route}" class="ab-pricing-service"><span class="ab-pricing-kicker">0${i+1} / AB STUDIO <span aria-hidden="true">↗</span></span><h2>${d.labels[i]}</h2><p>${d.blurbs[i]}</p><div class="ab-pricing-price"><strong>${d.from} ${money(c.value)}</strong><small>${c.monthly?"+ "+monthly(c.monthly):d.setup}</small></div></a>`).join("");
 const webs=tiers.map((id,i)=>`<article class="ab-pricing-web-plan ${i===1?"featured":""}"><span class="ab-pricing-kicker">0${i+1} / WEB ${i===1?(es?"· RECOMENDADO":"· RECOMMENDED"):""}</span><h3>${id[0].toUpperCase()+id.slice(1)}</h3><span class="ab-pricing-plan-tag">${d.webTags[i]}</span><strong class="ab-pricing-large-price">${money(abPrices.web[id])}</strong><span class="ab-pricing-price-sub">${d.setup} · ${d.from.toLowerCase()}</span><p>${d.webIdeal[i]}</p><ul>${d.webFeatures[i].map(x=>`<li>${x}</li>`).join("")}</ul><a href="/sitios-web/" class="ab-pricing-text-link">${d.details} ↗</a></article>`).join("");
 const modules=quoteData[lang].modules.map(([id,name])=>{
  const r=abPrices.management[id],help=bmModuleHelp[lang][id];
  return `<article class="ab-pricing-module"><div class="ab-pricing-module-row"><h3>${name}</h3><div><b>${d.from} ${money(r.setup)}</b><small>+ ${monthly(r.monthly)}</small></div></div><details><summary>${d.details} <span aria-hidden="true">＋</span></summary><p>${help[0]}</p><p>${help[1]}</p><p><em>${help[2]}</em></p></details></article>`;
 }).join("");
 const crm=crmTiers.map((id,i)=>{
  const p=crmText[lang].plans[i],r=abPrices.crm[id],range=money(r.min)+(r.max===null?"+":"–"+money(r.max));
  return `<article class="ab-pricing-crm-plan ${i===1?"featured":""}"><span class="ab-pricing-kicker">0${i+1} / CRM</span><h3>${p.name}</h3><p>${p.desc}</p><strong class="ab-pricing-large-price">${range}</strong><small>${d.setup}</small><div class="ab-pricing-crm-month">+ ${money(r.monthly)}${id==="enterprise"?"+":""}${d.per}</div><p><b>${d.ideal}:</b> ${p.ideal}</p><ul>${p.features.slice(0,4).map(x=>`<li>${x}</li>`).join("")}</ul><a href="/crm/" class="ab-pricing-text-link">${d.details} ↗</a></article>`;
 }).join("");
 const modChoices=quoteData[lang].modules.map(([id,name])=>{
  const r=abPrices.management[id];
  return `<label class="ab-pricing-choice"><input type="checkbox" data-p-module="${id}"><span>${name}</span><small>${money(r.setup)} + ${monthly(r.monthly)}</small></label>`;
 }).join("");
 const selectCrm=crmTiers.map(id=>{
  const r=abPrices.crm[id],range=money(r.min)+(r.max===null?"+":"–"+money(r.max));
  return `<option value="${id}">CRM ${id[0].toUpperCase()+id.slice(1)} · ${range} + ${money(r.monthly)}${d.per}</option>`;
 }).join("");
 return `<div class="ab-pricing-content">
 <section class="ab-pricing-intro" id="pricing-overview"><div class="wrap"><div class="ab-pricing-header"><span class="ab-pricing-kicker">${d.eyebrow}</span><h2>${d.heading}</h2><p>${d.intro}</p></div><div class="ab-pricing-services">${cards}</div><a class="ab-pricing-hero-link" href="#build-estimate">${d.estimate} <span aria-hidden="true">↗</span></a></div></section>
 <section class="ab-pricing-principles"><div class="wrap"><h2>${d.termsTitle}</h2><div class="ab-pricing-principle-grid">${d.terms.map(([title,text])=>`<div><b>${title}</b><p>${text}</p></div>`).join("")}</div></div></section>
 <section class="ab-pricing-section" id="pricing-web"><div class="wrap"><header class="ab-pricing-section-header"><div><span class="ab-pricing-kicker">01 / WEB</span><h2>${d.sectionWeb}</h2><p>${d.sectionWebDesc}</p></div><a href="/sitios-web/" class="ab-pricing-text-link">${d.learn} ↗</a></header><div class="ab-pricing-web-grid">${webs}</div></div></section>
 <section class="ab-pricing-section ab-pricing-tint" id="pricing-management"><div class="wrap"><header class="ab-pricing-section-header"><div><span class="ab-pricing-kicker">02 / OPERATIONS</span><h2>${d.sectionManagement}</h2><p>${d.sectionManagementDesc}</p></div><a href="/business-management/" class="ab-pricing-text-link">${d.learn} ↗</a></header><div class="ab-pricing-base"><div><h3>${d.base}</h3><p>${d.baseDesc}</p></div><div><b>${d.from} ${money(abPrices.management.base.setup)}</b><small>+ ${monthly(abPrices.management.base.monthly)}</small></div></div><div class="ab-pricing-module-grid">${modules}</div><p class="ab-pricing-fine">${d.managementExample}</p><p class="ab-pricing-fine">${d.crmHelp}</p></div></section>
 <section class="ab-pricing-section" id="pricing-crm"><div class="wrap"><header class="ab-pricing-section-header"><div><span class="ab-pricing-kicker">03 / CRM</span><h2>${d.sectionCrm}</h2><p>${d.sectionCrmDesc}</p></div><a href="/crm/" class="ab-pricing-text-link">${d.learn} ↗</a></header><div class="ab-pricing-crm-grid">${crm}</div></div></section>
 <section class="ab-pricing-section ab-pricing-tint" id="pricing-extras"><div class="wrap"><header class="ab-pricing-section-header"><div><span class="ab-pricing-kicker">04 / EXTRA</span><h2>${d.sectionExtras}</h2></div></header><div class="ab-pricing-extras">
 <article><span>SEO</span><h3>SEO + ${es?"visibilidad local":"local visibility"}</h3><strong>${money(abPrices.seo.setup)} + ${monthly(abPrices.seo.monthly)}</strong><p>${d.seoDesc}</p><a href="/seo/" class="ab-pricing-text-link">${d.learn} ↗</a></article>
 <article><span>NFC / QR</span><h3>${d.nfc}</h3><strong>${d.from} ${money(abPrices.nfc.starting)}</strong><p>${d.nfcDesc}</p></article>
 <article><span>CUSTOM</span><h3>${d.custom}</h3><strong>${es?"COTIZACIÓN PERSONALIZADA":"CUSTOM QUOTE"}</strong><p>${d.customDesc}</p><a href="/sistemas/" class="ab-pricing-text-link">${d.learn} ↗</a></article>
 </div></div></section>
 <section class="ab-pricing-builder" id="build-estimate"><div class="wrap"><header class="ab-pricing-section-header"><div><span class="ab-pricing-kicker">05 / YOUR ESTIMATE</span><h2>${d.estimate}</h2><p>${d.estimateDesc}</p></div></header>
 <div class="ab-pricing-builder-grid" data-pricing-root data-lang="${lang}"><div class="ab-pricing-fields">
 <fieldset class="ab-pricing-fieldset"><legend><span>01</span> ${d.existingQuestion}</legend><label class="ab-pricing-choice"><input type="radio" name="ab-pricing-website" data-p-website value="existing"><span>${d.existing}</span></label><label class="ab-pricing-choice"><input type="radio" name="ab-pricing-website" data-p-website value="new" checked><span>${d.new}</span></label><div data-p-plans class="ab-pricing-conditional"><h4>${d.chooseWeb}</h4>${tiers.map(id=>`<label class="ab-pricing-choice"><input type="radio" name="ab-pricing-web-plan" data-p-plan value="${id}" ${id==="professional"?"checked":""}><span>${id[0].toUpperCase()+id.slice(1)}</span><small>${money(abPrices.web[id])}</small></label>`).join("")}</div></fieldset>
 <fieldset class="ab-pricing-fieldset"><legend><span>02</span> ${d.addManagement}</legend><label class="ab-pricing-choice ab-pricing-choice--main"><input type="checkbox" data-p-management><span>${d.base}</span><small>${money(abPrices.management.base.setup)} + ${monthly(abPrices.management.base.monthly)}</small></label><div data-p-modules-group class="ab-pricing-conditional"><h4>${d.chooseModules}</h4><div class="ab-pricing-module-choices">${modChoices}</div><p class="ab-pricing-hint" data-p-crm-note>${d.followup}</p></div></fieldset>
 <fieldset class="ab-pricing-fieldset"><legend><span>03</span> ${d.addCrm}</legend><label class="ab-pricing-select"><span>${d.addCrm}</span><select data-p-crm><option value="none">${d.noCrm}</option>${selectCrm}</select></label><p class="ab-pricing-hint">${d.crmHelp}</p></fieldset>
 <fieldset class="ab-pricing-fieldset"><legend><span>04</span> ${d.seo}</legend><label class="ab-pricing-choice"><input type="checkbox" data-p-seo><span>${d.seo}</span><small>${money(abPrices.seo.setup)} + ${monthly(abPrices.seo.monthly)}</small></label></fieldset>
 <div class="ab-pricing-fieldset ab-pricing-inputs"><label for="ab-pricing-name">${d.name}</label><input id="ab-pricing-name" data-p-name maxlength="100" placeholder="${es?"Ej.: Florería Muñiz":"E.g. Sunrise Florist"}"><label for="ab-pricing-notes">${d.notes}</label><textarea id="ab-pricing-notes" data-p-notes maxlength="1200" rows="4" placeholder="${es?"Describe tu negocio y lo que necesitas":"Tell us about your business and the features you need"}"></textarea></div>
 </div><aside class="ab-pricing-summary"><div class="ab-pricing-summary-heading"><span>AB STUDIO / USD</span><h3>${d.summary}</h3></div><div class="ab-pricing-totals" aria-live="polite" aria-atomic="true"><div><small>${d.oneTime}</small><strong data-p-initial>${money(abPrices.web.professional)}</strong></div><div><small>${d.recurring}</small><strong data-p-monthly>${monthly(0)}</strong></div></div><div class="ab-pricing-summary-breakdown"><h4>${d.breakdown}</h4><ul data-p-breakdown></ul></div><div class="ab-pricing-summary-actions"><a data-p-email class="button" href="mailto:sales.abstudio@gmail.com">${d.email} <span aria-hidden="true">↗</span></a><a data-p-wa class="button outline" href="https://wa.me/15513129791" target="_blank" rel="noopener noreferrer">${d.whatsapp} <span aria-hidden="true">↗</span></a><small>${d.noSend}</small></div></aside></div><p class="ab-pricing-disclaimer">${d.disclaimer}</p></div></section>
 </div>`;
}
function pricingReadState(root){
 if(!root)return null;
 return {
  website:root.querySelector('[data-p-website]:checked')?.value||"existing",
  plan:root.querySelector('[data-p-plan]:checked')?.value||"professional",
  management:!!root.querySelector('[data-p-management]')?.checked,
  modules:[...root.querySelectorAll('[data-p-module]:checked')].map(el=>el.dataset.pModule),
  crm:root.querySelector('[data-p-crm]')?.value||"none",
  seo:!!root.querySelector('[data-p-seo]')?.checked,
  name:root.querySelector('[data-p-name]')?.value||"",
  notes:root.querySelector('[data-p-notes]')?.value||""
 };
}

function pricingCalculate(state){
 const web=state.website==="new" && abPrices.web[state.plan]?state.plan:null;
 const crm=abPrices.crm[state.crm]||null;
 const management=!!state.management;
 const modules=management?[...new Set(state.modules.filter(id=>id!=="base"&&id in abPrices.management && !(crm&&id==="crm")))]:[];
 const items=[];
 if(web)items.push({id:"website",initial:abPrices.web[web],monthly:0});
 if(management){
  items.push({id:"base",initial:abPrices.management.base.setup,monthly:abPrices.management.base.monthly});
  modules.forEach(id=>items.push({id,initial:abPrices.management[id].setup,monthly:abPrices.management[id].monthly}));
 }
 if(crm)items.push({id:"fullcrm",initial:crm.min,monthly:crm.monthly});
 if(state.seo)items.push({id:"seo",initial:abPrices.seo.setup,monthly:abPrices.seo.monthly});
 const min=items.reduce((n,item)=>n+item.initial,0);
 const monthly=items.reduce((n,item)=>n+item.monthly,0);
 const max=crm?(crm.max===null?null:min+crm.max-crm.min):min;
 return {min,max,monthly,items,enterprise:!!crm&&crm.max===null,web,modules};
}

function pricingRestore(root,state){
 if(!root||!state)return;
 root.querySelectorAll('[data-p-website]').forEach(el=>{el.checked=el.value===state.website;});
 root.querySelectorAll('[data-p-plan]').forEach(el=>{el.checked=el.value===state.plan;});
 root.querySelector('[data-p-management]').checked=state.management;
 root.querySelectorAll('[data-p-module]').forEach(el=>{el.checked=state.modules.includes(el.dataset.pModule);});
 root.querySelector('[data-p-crm]').value=state.crm;
 root.querySelector('[data-p-seo]').checked=state.seo;
 root.querySelector('[data-p-name]').value=state.name;
 root.querySelector('[data-p-notes]').value=state.notes;
}

function pricingUpdate(root){
 if(!root)return;
 const lang=root.dataset.lang==="es"?"es":"en",d=priceCopy[lang];
 const advanced=root.querySelector('[data-p-crm]').value!=="none";
 const simple=root.querySelector('[data-p-module="crm"]');
 if(advanced&&simple)simple.checked=false;
 if(simple)simple.disabled=advanced;
 root.querySelector('[data-p-crm-note]').textContent=advanced?d.overlap:d.followup;
 const state=pricingReadState(root),estimate=pricingCalculate(state);
 root.querySelector('[data-p-plans]').hidden=state.website!=="new";
 root.querySelector('[data-p-modules-group]').hidden=!state.management;
 const total=estimate.max===null?abMoney(estimate.min)+"+":estimate.max===estimate.min?abMoney(estimate.min):abMoney(estimate.min)+"–"+abMoney(estimate.max);
 const monthly=abMoney(estimate.monthly)+(estimate.enterprise?"+":"")+d.per;
 root.querySelector('[data-p-initial]').textContent=total;
 root.querySelector('[data-p-monthly]').textContent=monthly;
 const itemName=id=>{
  if(id==="website")return "Web "+state.plan[0].toUpperCase()+state.plan.slice(1);
  if(id==="base")return d.base;
  if(id==="seo")return "SEO & local visibility";
  if(id==="fullcrm")return "CRM "+state.crm[0].toUpperCase()+state.crm.slice(1);
  return quoteData[lang].modules.find(x=>x[0]===id)?.[1]||id;
 };
 const lineItems=root.querySelector('[data-p-breakdown]');
 lineItems.replaceChildren();
 if(!estimate.items.length){
  const li=document.createElement("li");li.textContent=d.none;lineItems.append(li);
 }
 for(const item of estimate.items){
  const li=document.createElement("li"),name=document.createElement("span"),cost=document.createElement("span");
  name.textContent=itemName(item.id);
  const range=item.id==="fullcrm" && estimate.max!==estimate.min
    ? estimate.enterprise?"+":"–"+abMoney(abPrices.crm[state.crm].max)
    : "";
  cost.textContent=abMoney(item.initial)+range+" · "+abMoney(item.monthly)+(item.id==="fullcrm"&&estimate.enterprise?"+":"")+d.per;
  li.append(name,cost);lineItems.append(li);
 }
 const heading=lang==="es"?"Solicitud de presupuesto — AB Studio":"Project estimate — AB Studio";
 const message=[
  lang==="es"?"Hola AB Studio, quiero cotizar este proyecto.":"Hi AB Studio, please quote this project.",
  "",d.existingQuestion+": "+(state.website==="new"?state.plan:d.existing),
  d.addManagement+": "+(state.management?"Yes / Sí":"No"),
  d.chooseModules+": "+(estimate.modules.map(itemName).join(", ")||d.none),
  d.addCrm+": "+(state.crm==="none"?d.noCrm:state.crm),
  d.seo+": "+(state.seo?"Yes / Sí":"No"),
  ...estimate.items.map(item=>itemName(item.id)+": "+abMoney(item.initial)+" + "+abMoney(item.monthly)+d.per),
  "",d.oneTime+": "+total,d.recurring+": "+monthly,
  ...(state.name.trim()?["",d.name+": "+state.name.trim().slice(0,100)]:[]),
  ...(state.notes.trim()?["",d.notes+": "+state.notes.trim().slice(0,1200)]:[]),
  "",d.disclaimer
 ].join("\n");
 root.querySelector('[data-p-email]').href="mailto:sales.abstudio@gmail.com?subject="+encodeURIComponent(heading)+"&body="+encodeURIComponent(message);
 root.querySelector('[data-p-wa]').href="https://wa.me/15513129791?text="+encodeURIComponent(message);
}

function syncPublishedPrices(){
  // Published rates are authoritative in abPrices, not repeated in page templates.
  document.querySelectorAll("#plans .pricing-grid .plan").forEach((el,i)=>{
    const value=abPrices.web[["basic","professional","premium"][i]];
    const target=el.querySelector(".price");
    if(target&&value&&target.firstChild)target.firstChild.textContent=abMoney(value)+" ";
  });
  const seo=document.querySelectorAll("#seo .seo-prices .seo-price b");
  if(seo[0])seo[0].textContent=abMoney(abPrices.seo.setup);
  if(seo[1])seo[1].textContent=abMoney(abPrices.seo.monthly);
  const inquiry=document.getElementById("inquiryPlan");
  if(inquiry){
    for(const id of ["Basic","Professional","Premium"]){
      const option=[...inquiry.options].find(x=>x.value===id);
      if(option)option.textContent=id+" · "+abMoney(abPrices.web[id.toLowerCase()])+"+";
    }
  }
}
        function showRoute(path, targetId, addHistory = true) {
      if (addHistory && location.pathname !== path) history.pushState({ abStudioRoute: path }, "", path);
      main.querySelectorAll(':scope > *').forEach(element => element.style.removeProperty('display'));
      const isHome = path === '/';
      document.body.classList.toggle('route-mode', !isHome);
      document.body.classList.toggle('home-mode', isHome);
      document.body.classList.toggle('service-form-enabled', path === '/business-management/' || path === '/crm/');
      // Preserve the estimate while switching between English and Spanish.
      const savedPricing=pricingReadState(document.querySelector("[data-pricing-root]"));
      const savedQuotes=[...document.querySelectorAll("[data-quote-root]")].map(root=>({
        id:root.closest(".quote-section")?.id,
        plan:root.querySelector("[data-q-plan]:checked")?.value,
        admin:root.querySelector("[data-q-admin]").checked,
        seo:root.querySelector("[data-q-seo]").checked,
        crm:root.querySelector("[data-q-crm]").value,
        modules:[...root.querySelectorAll("[data-q-module]:checked")].map(x=>x.value),
        name:root.querySelector("[data-q-name]").value,
        notes:root.querySelector("[data-q-notes]").value
      }));
      // Pricing ships with real HTML. Keep it visible even when route hydration is delayed.
      // Only replace the static content when switching language or changing routes.
      const hasStaticPricing = path === '/pricing/' &&
        routePage.dataset.pricingStatic === currentLang &&
        !!routePage.querySelector('.ab-pricing-content');
      if (!hasStaticPricing) routePage.innerHTML = '';
      if (isHome) {
        const homePlans=document.querySelector("main #plans .wrap");
        if (homePlans) {homePlans.querySelector(".quote-section")?.remove();homePlans.insertAdjacentHTML("beforeend",quoteMarkup(currentLang,"home"));}
      }
      document.querySelectorAll('#services .service').forEach(card => card.hidden = false);
      if (path === '/proyectos/') routePage.innerHTML = portfolioCtaMarkup(currentLang);
      if (path === '/servicios/') routePage.innerHTML = servicesChooserMarkup(currentLang);
      if (path === '/pricing/') {
        if (!hasStaticPricing) routePage.innerHTML = pricingPageMarkup(currentLang);
        routePage.dataset.pricingStatic = currentLang;
      } else {
        delete routePage.dataset.pricingStatic;
      }
      if (path === '/business-management/') routePage.innerHTML = bmServiceSpotlightMarkup(currentLang) + adminPanelMarkup(currentLang) + quoteMarkup(currentLang,"services") + adminGuideMarkup(currentLang);
      if (path === '/crm/') routePage.innerHTML = crmPanelMarkup(currentLang);
      if (path === '/sitios-web/') routePage.innerHTML = websitePageMarkup(currentLang);
      else if (path === '/empresa/') {
        document.getElementById('company').style.display = 'block';
        document.getElementById('about').style.display = 'block';
      } else if (path === '/sistemas/' || path === '/automatizacion/') {
        const keepId = path === '/sistemas/' ? 'systems' : 'automation';
        document.querySelectorAll('#services .service').forEach(card => { card.hidden = card.id !== keepId; });
        document.querySelector('#services').style.display = 'block';
        /* Dedicated pages begin at their own introduction. */
      } else if (!isHome && targetId) {
        const section = document.getElementById(targetId)?.closest('section') || document.getElementById(targetId);
        if (section) { section.style.display = 'block'; }
      } else if (isHome) window.scrollTo({ top:0, behavior:'smooth' });
      if (path === '/sitios-web/') window.scrollTo({ top:0, behavior:'instant' });
      const titles = {
        '/':'AB Studio — Websites, systems & automation',
        '/servicios/': currentLang === 'es' ? 'Servicios digitales — AB Studio' : 'Digital services — AB Studio',
        '/pricing/': currentLang === 'es' ? 'Precios y cotizaciones — AB Studio' : 'Pricing & estimates — AB Studio',
        '/business-management/': 'Business Management — AB Studio',
        '/crm/': currentLang === 'es' ? 'CRM y gestión de clientes — AB Studio' : 'Customer CRM — AB Studio',
        '/sitios-web/': currentLang === 'es' ? 'Diseño de páginas web — AB Studio' : 'Website design — AB Studio',
        '/sistemas/': currentLang === 'es' ? 'Sistemas de reservas — AB Studio' : 'Booking systems — AB Studio',
        '/seo/':'SEO & local search — AB Studio','/automatizacion/':'Automation — AB Studio',
        '/empresa/': currentLang === 'es' ? 'Empresa — AB Studio' : 'Company — AB Studio','/blog/':'Blog — AB Studio',
        '/proyectos/': currentLang === 'es' ? 'Proyectos — AB Studio' : 'Our work — AB Studio',
        '/faq/': currentLang === 'es' ? 'Preguntas frecuentes — AB Studio' : 'Frequently Asked Questions — AB Studio'
      };
      document.title = titles[path] || titles['/'];
      const metaDescriptions = {
        '/': currentLang === 'es' ? 'AB Studio crea páginas web, sistemas de reservas y soluciones digitales para pequeños negocios en Estados Unidos.' : 'AB Studio builds websites, booking systems, and practical automation for small businesses across the United States.',
        '/servicios/': currentLang === 'es' ? 'Explora los servicios de AB Studio, incluidos Business Management y CRM, cada uno con su propia página.' : 'Explore AB Studio digital services. Business Management and CRM each have their own dedicated page.',
        '/pricing/': currentLang === 'es' ? 'Consulta los precios de páginas web, Business Management, CRM y SEO. Configura una estimación con costos iniciales y mensuales.' : 'Compare AB Studio website, Business Management, CRM and SEO pricing. Build an estimate with setup and monthly fees.',
        '/business-management/': currentLang === 'es' ? 'Conoce Business Management de AB Studio: panel administrativo opcional para productos, inventario, pedidos y operaciones.' : 'Business Management by AB Studio: an optional custom dashboard for products, inventory, orders and operations.',
        '/crm/': currentLang === 'es' ? 'Conoce el CRM de AB Studio: gestiona contactos, oportunidades, ventas y seguimientos. Planes y precios independientes.' : 'AB Studio CRM: manage leads, contacts, sales opportunities and follow-ups. Compare dedicated CRM plans.',
        '/sitios-web/': currentLang === 'es' ? 'Páginas web desde $1,100 y panel Business Management opcional. Compara planes y configura tu cotización con AB Studio.' : 'Business websites starting at $1,100. Compare plans and optional Business Management add-ons in AB Studio’s quote builder.',
        '/sistemas/': currentLang === 'es' ? 'Sistemas de reservas y herramientas de administración adaptadas a tu negocio.' : 'Custom booking and administration systems tailored to your business workflow.',
        '/seo/': currentLang === 'es' ? 'SEO técnico y visibilidad local para que más clientes encuentren tu negocio.' : 'SEO and local search visibility services for small businesses.',
        '/automatizacion/': currentLang === 'es' ? 'Automatizaciones prácticas para formularios, mensajes y procesos de negocios.' : 'Practical automation for forms, messages and small business workflows.',
        '/empresa/': currentLang === 'es' ? 'Conoce al equipo y proceso de trabajo de AB Studio.' : 'Meet the team and learn how AB Studio approaches web and software projects.',
        '/blog/': currentLang === 'es' ? 'Consejos prácticos sobre páginas web, reservas y visibilidad online.' : 'Practical articles on websites, booking tools and local visibility for business owners.',
        '/proyectos/': currentLang === 'es' ? 'Explora los proyectos, conceptos web y sistemas desarrollados por AB Studio.' : 'See the websites, concepts and digital systems showcased in the AB Studio portfolio.',
        '/faq/': currentLang === 'es' ? 'Respuestas sobre precios, tiempos, dominio, hosting, revisiones y soporte de proyectos en AB Studio.' : 'Questions and answers about AB Studio website pricing, timelines, domains, revisions and support.'
      };
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) descriptionTag.setAttribute('content',metaDescriptions[path] || metaDescriptions['/']);
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      const currentUrl = `https://ab-studio-portafolio.vercel.app${path === '/pricing/' ? '/pricing.html' : path}`;
      if (canonicalTag) canonicalTag.href = currentUrl;
      const ogUrlTag = document.querySelector('meta[property="og:url"]');
      if (ogUrlTag) ogUrlTag.content = currentUrl;
      const ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) ogTitleTag.content = document.title;
      const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
      if (ogDescriptionTag) ogDescriptionTag.content = metaDescriptions[path] || metaDescriptions['/'];
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterTitle) twitterTitle.content = document.title;
      if (twitterDescription) twitterDescription.content = metaDescriptions[path] || metaDescriptions['/'];
      // Mark the active destination for keyboard and screen-reader navigation.
      document.querySelectorAll('.nav-menu a, .navlinks > a').forEach(link=>{
        if (new URL(link.href, location.href).pathname === path) link.setAttribute('aria-current','page');
        else link.removeAttribute('aria-current');
      });
      const contact = document.getElementById('contact');
      if (!isHome && path !== '/sitios-web/' && path !== '/sistemas/' && path !== '/automatizacion/') {
        const section = document.getElementById(targetId)?.closest('section') || document.getElementById(targetId);
        if (section) section.style.display = 'block';
      }
      if (!isHome) contact.style.display = 'block';
      // Dedicated service pages use a real bilingual contact form, rather than a generic contact-only block.
      if (path === '/business-management/' || path === '/crm/' || path === '/pricing/') {
        contact.style.display = 'none';
        const serviceInquiry = document.getElementById('home-inquiry');
        if (serviceInquiry) serviceInquiry.style.display = 'block';
      }
      document.querySelectorAll("[data-quote-root]").forEach(root=>{
        const saved=savedQuotes.find(x=>x.id===root.closest(".quote-section")?.id);
        if(saved){
          const plan=root.querySelector('[data-q-plan][value="'+saved.plan+'"]');
          if(plan)plan.checked=true;
          root.querySelector("[data-q-admin]").checked=saved.admin;
          root.querySelector("[data-q-seo]").checked=saved.seo;
          root.querySelector("[data-q-crm]").value=saved.crm;
          root.querySelectorAll("[data-q-module]").forEach(input=>{input.checked=saved.modules.includes(input.value);});
          root.querySelector("[data-q-name]").value=saved.name;
          root.querySelector("[data-q-notes]").value=saved.notes;
        }
        quoteUpdate(root);
      });
      const pricingRoot=document.querySelector("[data-pricing-root]");
      if(pricingRoot){pricingRestore(pricingRoot,savedPricing);pricingUpdate(pricingRoot);}
      syncPublishedPrices();
      // Keep the featured Business Management offering visible near the top of every Services menu.
    document.querySelectorAll(".nav-menu").forEach(menu => {
      const feature = menu.querySelector('[data-copy="nav.serviceAdmin"]');
      const crm = menu.querySelector('[data-copy="nav.serviceCrm"]');
      const overview = menu.querySelector('[data-copy="nav.serviceOverview"]');
      if (feature && overview && overview.nextElementSibling !== feature) overview.after(feature);
      // Both are independent services and each link opens the matching section.
      if (feature && crm && feature.nextElementSibling !== crm) feature.after(crm);
    });
    const navCta = document.querySelector('.nav-actions a.button.small');
      if (navCta) { navCta.href = 'https://calendar.app.google/DKwYiEnNF2YFDXtq7'; navCta.target = '_blank'; navCta.rel = 'noopener noreferrer'; }
      // Sections inside Services are rendered dynamically; resolve deep links after the DOM is updated.
      if (['/business-management/','/crm/','/sitios-web/','/','/pricing/'].includes(path) && ['#admin-panel','#crm-plans','#crm-overview','#quote-builder-services','#quote-builder-web','#quote-builder-home','#business-management-guide','#web-dashboard-addon','#build-estimate','#pricing-web','#pricing-management','#pricing-crm','#pricing-extras'].includes(location.hash)) {
        const sectionId = location.hash.slice(1);
        requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView({behavior:'instant',block:'start'}));
      }
    }
    // AB Studio Instagram: one consistent social profile across all portfolio routes.
    (() => {
      const instagramUrl = 'https://www.instagram.com/abstudio.builds/';
      const instagramSvg = '<svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.8" cy="6.3" r="1" fill="currentColor" stroke="none"/></svg>';
      function socialLink(className, label, icon) {
        const link = document.createElement('a');
        link.className = className;
        link.href = instagramUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'AB Studio on Instagram — @abstudio.builds');
        if (icon) link.innerHTML = instagramSvg;
        const text = document.createElement('span');
        text.textContent = label;
        link.appendChild(text);
        return link;
      }

      const navActions = document.querySelector('.nav-actions');
      if (navActions && !navActions.querySelector('.social-nav-instagram')) {
        const link = socialLink('social-nav-instagram', 'Instagram', true);
        navActions.insertBefore(link, navActions.querySelector('a.button.small'));
      }
      const mobileNav = document.querySelector('.navlinks');
      if (mobileNav && !mobileNav.querySelector('.social-nav-mobile')) {
        mobileNav.appendChild(socialLink('social-nav-mobile', 'Instagram · @abstudio.builds', true));
      }
      document.querySelectorAll('.footer-links').forEach(footer => {
        if (!footer.querySelector('.social-footer-instagram')) {
          footer.appendChild(socialLink('social-footer-instagram', '@abstudio.builds', true));
        }
      });
      document.querySelectorAll('.contact-detail').forEach(details => {
        if (!details.querySelector('.social-contact-instagram')) {
          const term = document.createElement('div');
          term.className = 'term social-contact-instagram';
          const heading = document.createElement('h4');
          heading.textContent = 'Instagram';
          const paragraph = document.createElement('p');
          paragraph.appendChild(socialLink('social-contact-link', '@abstudio.builds ↗', false));
          term.append(heading, paragraph);
          details.appendChild(term);
        }
      });
    })();

    // Consultation booking is a direct, verified owner-provided Google Calendar link.
    const bookingAside = document.querySelector('.home-inquiry-aside');
    if (bookingAside && !bookingAside.querySelector('.consultation-booking')) {
      const bookingLink = document.createElement('a');
      bookingLink.className = 'button consultation-booking';
      bookingLink.href = 'https://calendar.app.google/DKwYiEnNF2YFDXtq7';
      bookingLink.target = '_blank';
      bookingLink.rel = 'noopener noreferrer';
      bookingLink.textContent = currentLang === 'es' ? 'Agendar una consulta ↗' : 'Book a consultation ↗';
      const intro = bookingAside.querySelector('p');
      if (intro) intro.insertAdjacentElement('afterend', bookingLink);
      else bookingAside.prepend(bookingLink);
    }
    // Normal links navigate to real, independent HTML pages. No client-side URL rewriting.
    const initialPath = location.pathname === '/pricing.html' ? '/pricing/' : location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '') + '/';
    // Bookmarked links from the old combined Services page continue to work.
    const oldManagementHashes = ['#admin-panel','#business-management-guide','#quote-builder-services'];
    const oldCrmHashes = ['#crm-plans','#crm-overview','#crm-how-it-works'];
    if (initialPath === '/servicios/' && oldManagementHashes.includes(location.hash)) {
      window.location.replace('/business-management/' + location.hash);
    } else if (initialPath === '/servicios/' && oldCrmHashes.includes(location.hash)) {
      window.location.replace('/crm/' + location.hash);
    } else {
      showRoute(routeTargets[initialPath] ? initialPath : '/', routeTargets[initialPath], false);
    }


    // Browser-side estimate and draft links. No message is automatically sent.
    document.addEventListener("change",event=>{
      const root=event.target.closest("[data-quote-root]");
      if(!root)return;
      if(event.target.matches("[data-q-module]") && event.target.checked) root.querySelector("[data-q-admin]").checked=true;
      if(event.target.matches("[data-q-admin]") && !event.target.checked) root.querySelectorAll("[data-q-module]").forEach(input=>{input.checked=false;});
      quoteUpdate(root);
    });
    document.addEventListener("input",event=>{const root=event.target.closest("[data-quote-root]");if(root && event.target.matches("[data-q-name],[data-q-notes]"))quoteUpdate(root);});
    document.addEventListener("click",event=>{const link=event.target.closest("[data-quote-pick]");if(!link)return;const root=document.querySelector("#quote-builder-web [data-quote-root],#quote-builder-home [data-quote-root],#quote-builder-services [data-quote-root]");if(!root)return;const radio=root.querySelector('[data-q-plan][value="'+link.dataset.quotePick+'"]');if(radio){radio.checked=true;quoteUpdate(root);}});
    document.querySelectorAll("[data-quote-root]").forEach(quoteUpdate);
    // New pricing guide uses delegated events, so it survives route changes and language switches.
    document.addEventListener("change",event=>{
      const root=event.target.closest("[data-pricing-root]");
      if(!root)return;
      if(event.target.matches('[data-p-module="crm"]')&&event.target.checked)root.querySelector('[data-p-crm]').value="none";
      if(event.target.matches("[data-p-crm]")&&event.target.value!=="none"){
        const simple=root.querySelector('[data-p-module="crm"]');
        if(simple)simple.checked=false;
      }
      pricingUpdate(root);
    });
    document.addEventListener("input",event=>{
      const root=event.target.closest("[data-pricing-root]");
      if(root&&event.target.matches("[data-p-name],[data-p-notes]"))pricingUpdate(root);
    });
    // Interactive illustration only. Changes remain local to this rendered demo.
    routePage.addEventListener("click", event => {
      const save = event.target.closest("[data-bm-save]");
      const reset = event.target.closest("[data-bm-reset]");
      if (!save && !reset) return;
      const demo = event.target.closest("[data-bm-demo]");
      if (!demo) return;
      const field = demo.querySelector("[data-bm-price-input]");
      const price = demo.querySelector("[data-bm-current]");
      const status = demo.querySelector("[data-bm-status]");
      if (reset) {
        field.value = "75";
        price.textContent = "$65";
        status.textContent = demo.dataset.bmResetStatus;
        return;
      }
      const value = Number(field.value);
      if (!Number.isFinite(value) || value < 1 || value > 99999 || field.value.trim() === "") {
        status.textContent = demo.dataset.bmError;
        field.focus();
        return;
      }
      const formatted = new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:2}).format(value);
      price.textContent = formatted;
      status.textContent = demo.dataset.bmSaved + " " + formatted + ".";
    });

    // Isolated fictional workflow illustration: never uses client or payment records.
    routePage.addEventListener("click",event=>{
      const action=event.target.closest("[data-place-order],[data-next-order],[data-reset-order]");
      const demo=action?.closest("[data-bm-workflow]");
      if(!demo)return;
      const stock=demo.querySelector("[data-stock]"),orders=demo.querySelector("[data-orders]"),revenue=demo.querySelector("[data-revenue]");
      const status=demo.querySelector("[data-order-status]"),feedback=demo.querySelector("[data-workflow-status]"),next=demo.querySelector("[data-next-order]");
      const statuses=demo.dataset.statuses.split("|");
      let step=Number(demo.dataset.step ?? -1);
      if(action.matches("[data-reset-order]")) {
        demo.dataset.step="-1";stock.textContent="15";orders.textContent="0";revenue.textContent="$0";status.textContent=demo.dataset.none;feedback.textContent=demo.dataset.ready;next.disabled=true;return;
      }
      if(action.matches("[data-place-order]")) {
        if(step!==-1){feedback.textContent=demo.dataset.limit;return;}
        demo.dataset.step="0";stock.textContent="13";orders.textContent="1";revenue.textContent="$150";status.textContent=statuses[0];feedback.textContent=demo.dataset.created;next.disabled=false;return;
      }
      if(step<0 || step>=2){next.disabled=true;return;}
      step+=1;demo.dataset.step=String(step);status.textContent=statuses[step];feedback.textContent=demo.dataset.advanced;
      if(step===2)next.disabled=true;
    });
    const projectLightbox = document.getElementById("projectLightbox");
    const projectLightboxImage = document.getElementById("projectLightboxImage");
    const projectLightboxCaption = document.getElementById("projectLightboxCaption");
    document.querySelectorAll(".case-image[data-lightbox-src]").forEach(button => button.addEventListener("click", () => {
      const image = button.querySelector("img");
      projectLightboxImage.src = button.dataset.lightboxSrc;
      projectLightboxImage.alt = image.alt;
      projectLightboxCaption.textContent = image.alt;
      projectLightbox.showModal();
    }));
    document.getElementById("projectLightboxClose").addEventListener("click", () => projectLightbox.close());
    // Avoid sending visitors to ChatGPT-authenticated concept previews.
    document.querySelectorAll('[data-preview-project]').forEach(button => button.addEventListener('click', () => {
      button.closest('.case-card')?.querySelector('.case-image[data-lightbox-src]')?.click();
    }));
    projectLightbox.addEventListener("click", event => { if (event.target === projectLightbox) projectLightbox.close(); });

    const homeInquiryForm = document.getElementById('homeInquiryForm');
    const homeInquiryMessage = document.getElementById('homeInquiryMessage');
    document.querySelectorAll('.home-inquiry-picks button').forEach(button => button.addEventListener('click', () => {
      homeInquiryMessage.value = currentLang === 'es' ? button.dataset.promptEs : button.dataset.promptEn;
      homeInquiryMessage.focus();
    }));

    // An optional, transparent lead brief on every page; no credentials or hidden network calls.
    const inquiryExtras = `<div class="inquiry-extra-block">
      <label for="inquiryPlan" data-copy="inquiry.extraPlan">Interested in a website plan?</label>
      <select id="inquiryPlan" name="plan"><option value="" data-copy="inquiry.planAny">Not sure yet</option><option value="Basic" data-copy="inquiry.planBasic">Basic · $1,100+</option><option value="Professional" data-copy="inquiry.planProfessional">Professional · $1,500+</option><option value="Premium" data-copy="inquiry.planPremium">Premium · $2,500+</option></select>
      <label class="inquiry-addon-check"><input type="checkbox" id="inquiryAdmin" name="dashboard"><span data-copy="inquiry.adminAddon">I would also like a Business Management dashboard</span></label>
      <div class="inquiry-module-fieldset" id="inquiryModules" role="group" aria-labelledby="inquiryModulesHeading" hidden><p class="inquiry-module-heading" id="inquiryModulesHeading" data-copy="inquiry.moduleLegend">What would you manage? (optional)</p>
        <label><input type="checkbox" value="catalog" data-inquiry-module><span data-copy="inquiry.moduleCatalog">Catalog / products</span></label>
        <label><input type="checkbox" value="inventory" data-inquiry-module><span data-copy="inquiry.moduleInventory">Inventory</span></label>
        <label><input type="checkbox" value="orders" data-inquiry-module><span data-copy="inquiry.moduleOrders">Orders</span></label>
        <label><input type="checkbox" value="reports" data-inquiry-module><span data-copy="inquiry.moduleReports">Sales reports</span></label>
        <label><input type="checkbox" value="bookings" data-inquiry-module><span data-copy="inquiry.moduleBookings">Bookings</span></label>
        <label><input type="checkbox" value="customers" data-inquiry-module><span data-copy="inquiry.moduleCustomers">Customer follow-up</span></label>
      </div>
    </div>`;
    const inquiryFields = homeInquiryForm.querySelector(".inquiry-fields");
    inquiryFields.insertAdjacentHTML("afterbegin", `<div class="crm-contact-fields">
      <label for="crmLeadName">Name / Nombre</label><input id="crmLeadName" name="crmName" autocomplete="name" maxlength="120" required placeholder="Your name / Tu nombre">
      <label for="crmLeadEmail">Email / Correo electrónico</label><input id="crmLeadEmail" name="crmEmail" type="email" autocomplete="email" maxlength="254" required placeholder="name@example.com">
      <label class="crm-consent"><input id="crmLeadConsent" type="checkbox" required><span>I agree to AB Studio storing my inquiry to respond to me. / Acepto que AB Studio guarde mi solicitud para responderme. <a href="/privacidad/">Privacy / Privacidad</a></span></label>
      <div style="display:none" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
      <p id="crmLeadStatus" role="status" aria-live="polite"></p>
    </div>`);
    inquiryFields.insertAdjacentHTML("beforeend", inquiryExtras);
    // Keep the public contact experience working when CRM is not explicitly active.
    // Preview reads the configuration from the same deployment; Production is fail-closed.
    let crmCaptureEnabled = false;
    const crmContactSection = homeInquiryForm.querySelector('.crm-contact-fields');
    const crmNameField = homeInquiryForm.querySelector('#crmLeadName');
    const crmEmailField = homeInquiryForm.querySelector('#crmLeadEmail');
    const crmConsentField = homeInquiryForm.querySelector('#crmLeadConsent');
    function setCrmCaptureMode(enabled) {
      crmCaptureEnabled = Boolean(enabled);
      crmContactSection.style.display = crmCaptureEnabled ? '' : 'none';
      [crmNameField, crmEmailField, crmConsentField].forEach(field => { field.required = crmCaptureEnabled; });
    }
    setCrmCaptureMode(false);
    fetch('/api/inquiries', {cache:'no-store'})
      .then(response => response.ok ? response.json() : null)
      .then(result => setCrmCaptureMode(result?.ok === true && result?.configured === true))
      .catch(() => setCrmCaptureMode(false));

    const inquiryPlan = document.getElementById("inquiryPlan");
    syncPublishedPrices();
    const inquiryAdmin = document.getElementById("inquiryAdmin");
    const inquiryModules = document.getElementById("inquiryModules");
    const inquiryPlanLabel = inquiryFields.querySelector('label[for="inquiryPlan"]');
    const inquiryNoWebOption = inquiryPlan.querySelector('option[value=""]');
    inquiryAdmin.addEventListener("change",()=>{inquiryModules.hidden=!inquiryAdmin.checked;});
    // Translate only the newly inserted controls. Do not overwrite page-specific SEO metadata.
    homeInquiryForm.querySelectorAll(".inquiry-extra-block [data-copy]").forEach(element=>{
      const value=copy[currentLang]?.[element.dataset.copy];
      if(typeof value==="string")element.textContent=value;
    });
    const inquiryType = document.getElementById('inquiryType');
    const inquiryLabels = {
      website: { en: 'Business website', es: 'Página web para negocio' },
      booking: { en: 'Booking or admin system', es: 'Sistema de reservas o administración' },
      catalog: { en: 'Digital catalog', es: 'Catálogo digital' },
      management: { en: 'Business Management dashboard', es: 'Panel Business Management' },
      crm: { en: 'CRM / Customer follow-up', es: 'CRM / Seguimiento de clientes' },
      seo: { en: 'SEO and local visibility', es: 'SEO y visibilidad local' },
      other: { en: 'Other', es: 'Otro' }
    };

    const managementOption = document.createElement("option");
    managementOption.value="management";
    managementOption.textContent=currentLang==="es"?"Panel Business Management":"Business Management dashboard";
    const crmOption = document.createElement("option");
    crmOption.value="crm";
    crmOption.textContent=currentLang==="es"?"CRM / Seguimiento de clientes":"CRM / Customer follow-up";
    inquiryType.add(managementOption);
    inquiryType.add(crmOption);
    // Adapt the inquiry to the service instead of showing generic website-only questions.
    function updateServiceInquiryContext() {
      const page = document.body.dataset.page;
      if (page !== 'management' && page !== 'crm') return;
      const es = currentLang === 'es';
      const content = {
        management: {
          en: ['Tell us what you need to manage.', 'Describe how your business handles products, orders, inventory or daily operations. We will help scope the modules.', 'What would you like to manage?', 'Example: I have a florist and need to update product prices and keep track of orders.'],
          es: ['Cuéntanos qué necesitas administrar.', 'Describe cómo manejas productos, pedidos, inventario u operaciones. Te ayudaremos a definir los módulos necesarios.', '¿Qué necesitas administrar?', 'Ejemplo: Tengo una florería y quiero actualizar precios y organizar pedidos.']
        },
        crm: {
          en: ['Tell us about your customer workflow.', 'Explain how you receive leads and follow up on inquiries. We can recommend a CRM plan based on your process.', 'What would you like your CRM to solve?', 'Example: I receive inquiries from my website and need to track each lead and follow-up.'],
          es: ['Cuéntanos cómo gestionas a tus clientes.', 'Explica cómo recibes consultas y haces seguimiento. Podemos recomendarte un plan CRM según tu proceso.', '¿Qué quieres resolver con el CRM?', 'Ejemplo: Recibo consultas desde mi web y quiero organizar los contactos y seguimientos.']
        }
      }[page][currentLang];
      const keys = ['title', 'intro', 'label'];
      for (let i=0;i<keys.length;i++) {
        const field = document.querySelector('[data-copy="homeInquiry.'+keys[i]+'"]');
        if (field) field.textContent = content[i];
      }
      homeInquiryMessage.placeholder = content[3];
      const asideText = document.querySelector('.home-inquiry-aside [data-copy="homeInquiry.emailIntro"]');
      if (asideText) asideText.textContent = es
        ? 'También puedes escribirnos por correo o solicitar una consulta para este servicio.'
        : 'You can also email us or book a consultation about this service.';
      if (!inquiryType.value) inquiryType.value = page;
      if (page === 'management') {
        // Management is already selected on this dedicated page.
        // Only ask whether the client ALSO needs a new website.
        inquiryAdmin.checked = true;
        inquiryModules.hidden = false;
        if (inquiryPlanLabel) {
          inquiryPlanLabel.textContent = es
            ? '¿También necesitas una página web? (opcional)'
            : 'Do you also need a website? (optional)';
        }
        if (inquiryNoWebOption) {
          inquiryNoWebOption.textContent = es
            ? 'No necesito una web nueva'
            : "I don't need a new website";
        }
      }
    }
    const localizeSpecialOptions = () => {
      managementOption.textContent=currentLang==="es"?"Panel Business Management":"Business Management dashboard";
      crmOption.textContent=currentLang==="es"?"CRM / Seguimiento de clientes":"CRM / Customer follow-up";
      updateServiceInquiryContext();
    };
    updateServiceInquiryContext();
    function jumpToInquiry(event) {
      const isHome = document.body.classList.contains('home-mode');
      const isServiceInquiry = ['management','crm'].includes(document.body.dataset.page);
      const target = document.getElementById(isHome || isServiceInquiry ? 'home-inquiry' : 'contact');
      if (!target) return;
      event.preventDefault();
      const service = event.currentTarget.dataset.inquiryService;
      const plan = event.currentTarget.dataset.inquiryPlan;
      if (service && isHome) {
        const option = {systems:"booking",automation:"other",seo:"seo",management:"management"}[service];
        if (option) inquiryType.value = option;
      }
      if (plan && isHome && !homeInquiryMessage.value.trim()) {
        homeInquiryMessage.value = currentLang === 'es' ? `Me interesa el plan ${plan}. Mi negocio es: ` : `I am interested in the ${plan} plan. My business is: `;
      }
      target.scrollIntoView({behavior:'smooth',block:'start'});
      if (isHome || isServiceInquiry) homeInquiryMessage.focus({preventScroll:true});
    }
    document.querySelectorAll('a[href="#contact"],a[data-inquiry-service],a[data-inquiry-plan]').forEach(link => link.addEventListener('click', jumpToInquiry));
    let lastInquiryDraft = '';
    let lastInquirySubmissionId = null;
    homeInquiryForm.addEventListener('submit', async event => {
      event.preventDefault();
      const page = document.body.dataset.page;
      const opening = page === 'crm'
        ? (currentLang === 'es' ? 'Hola AB Studio, quiero información sobre su CRM:' : 'Hi AB Studio, I would like to discuss your CRM service:')
        : page === 'management'
        ? (currentLang === 'es' ? 'Hola AB Studio, quiero información sobre Business Management:' : 'Hi AB Studio, I would like to discuss Business Management:')
        : (currentLang === 'es' ? 'Hola AB Studio, quiero conversar sobre un proyecto web:' : 'Hi AB Studio, I would like to discuss a website project:');
      const service = inquiryLabels[inquiryType.value]?.[currentLang];
      const description = homeInquiryMessage.value.trim();
      if (!description) { homeInquiryMessage.focus(); return; }
      const selectedPlan=inquiryPlan.value;
      const modulesSelected=[...inquiryModules.querySelectorAll('[data-inquiry-module]:checked')].map(input=>input.closest('label')?.querySelector('span')?.textContent.trim()).filter(Boolean);
      const lineItems=[
        opening,
        `Name / Nombre: ${String(homeInquiryForm.querySelector('#crmLeadName')?.value || '').trim()}`,
        `Email / Correo: ${String(homeInquiryForm.querySelector('#crmLeadEmail')?.value || '').trim()}`,
        service ? `${currentLang === 'es' ? 'Servicio' : 'Service'}: ${service}` : '',
        selectedPlan ? `${currentLang === 'es' ? 'Plan web' : 'Website plan'}: ${selectedPlan}` : '',
        ...(page === 'crm' ? [] : [`${currentLang === 'es' ? 'Panel administrativo opcional' : 'Optional management dashboard'}: ${inquiryAdmin.checked ? (currentLang === 'es' ? 'Sí, cotizar por separado' : 'Yes, quote separately') : (currentLang === 'es' ? 'No' : 'No')}`]),
        page !== 'crm' && inquiryAdmin.checked && modulesSelected.length ? `${currentLang === 'es' ? 'Módulos deseados' : 'Requested modules'}: ${modulesSelected.join(', ')}` : '',
        description
      ];
      const message = lineItems.filter(Boolean).join('\n\n');
      const channel = event.submitter?.dataset.inquiryChannel === 'email' ? 'email' : 'whatsapp';
      const details = new FormData(homeInquiryForm);
      const name = String(details.get('crmName') || '').trim();
      const email = String(details.get('crmEmail') || '').trim();
      // Keep the same ID when retrying an uncertain save or switching contact channel.
      // Duplicate HTTP requests for the same draft must not create duplicate leads.
      const draft = JSON.stringify([name,email,description,inquiryType.value,selectedPlan,modulesSelected]);
      if (draft !== lastInquiryDraft || !lastInquirySubmissionId) {
        lastInquiryDraft = draft;
        lastInquirySubmissionId = crypto.randomUUID();
      }
      const leadPayload = {
        submission_id: lastInquirySubmissionId,
        name,
        email,
        description, service: inquiryType.value || page, plan: selectedPlan,
        channel, modules: [...inquiryModules.querySelectorAll('[data-inquiry-module]:checked')].map(x => x.value),
        consent: document.getElementById('crmLeadConsent').checked,
        website: String(details.get('website') || '')
      };
      const status = document.getElementById('crmLeadStatus');
      const submitButtons = [...homeInquiryForm.querySelectorAll('button[type="submit"]')];
      submitButtons.forEach(button => button.disabled = true);
      if (crmCaptureEnabled) {
      let stored = false;
      let failureCode = 'network_error';
      try {
        status.textContent = currentLang === 'es' ? 'Registrando solicitud...' : 'Saving inquiry...';
        const response = await fetch('/api/inquiries', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(leadPayload)});
        const result = await response.json().catch(() => null);
        stored = response.ok && result?.ok === true;
        if (!stored) failureCode = result?.error || ('http_' + response.status);
      } catch (error) { failureCode = 'network_error'; }
      finally { submitButtons.forEach(button => button.disabled = false); }
      if (!stored) {
        if(failureCode === 'rate_limited') {
          status.textContent = currentLang === 'es'
            ? 'Demasiadas solicitudes recientes. Intenta de nuevo más tarde.'
            : 'Too many recent requests. Please try again later.';
          return;
        }
        status.textContent = (currentLang === 'es' ? 'No pudimos confirmar que la solicitud se haya guardado en el CRM.' : 'We could not confirm that your inquiry was saved in our CRM.') + ' [' + failureCode + ']';
        const proceed = window.confirm(currentLang === 'es'
          ? 'No pudimos confirmar el registro en el CRM. ¿Deseas continuar por WhatsApp o correo?'
          : 'We could not confirm CRM storage. Continue to WhatsApp or email?');
        if (!proceed) return;
      } else {
        status.textContent = currentLang === 'es' ? 'Solicitud registrada. Abriendo el canal elegido...' : 'Inquiry recorded. Opening your selected channel...';
      }
      }
      if (channel === 'email') {
        const subject = page === 'crm' ? (currentLang === 'es' ? 'Consulta sobre CRM — AB Studio' : 'CRM inquiry — AB Studio')
          : page === 'management' ? (currentLang === 'es' ? 'Consulta sobre Business Management — AB Studio' : 'Business Management inquiry — AB Studio')
          : (currentLang === 'es' ? 'Solicitud de proyecto web — AB Studio' : 'Website project inquiry — AB Studio');
        window.location.href = `mailto:sales.abstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      } else {
        const url = `https://wa.me/15513129791?text=${encodeURIComponent(message)}`;
        window.location.assign(url);
      }
    });
