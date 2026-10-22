export type Language = 'en' | 'es' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  short: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    short: 'EN',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    short: 'ES',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    short: 'AR',
  },
];

export const translations = {
  en: {
    // Brand & Navigation
    'brand.name': 'A E R E O',
    'brand.subtitle': 'Haute Maison & Sanctuaries',
    'nav.collections': 'Collections & Sanctuaries',
    'nav.story': 'Artisanal Heritage',
    'nav.faq': 'Client Support & FAQ',
    'nav.contact': 'Private Relations',
    'nav.curator': 'Curator Portal',
    'nav.consultation': 'Private Consultation',
    'nav.request_consultation': 'Request Private Consultation',
    'nav.admin_access': 'Admin Curator Access',
    'nav.language': 'Language',
    'nav.select_language': 'Select Language',

    // Hero Section
    'hero.badge': 'Geneva · Paris · Tokyo Private Salons',
    'hero.title': 'The Apex of Craftsmanship & Refined Sanctuaries',
    'hero.subtitle':
      'Engineered for patrons of uncompromising taste. Bespoke horological complications, hand-saddled French calfskin trunks, and private aviation residencies.',
    'hero.explore': 'Explore Curated Offerings',
    'hero.heritage': 'Artisanal Heritage',
    'hero.provenance': 'Provenance',
    'hero.provenance_desc': 'Swiss Chronometric Cert.',
    'hero.craft': 'Artisanal Touch',
    'hero.craft_desc': 'Over 400 Hours / Piece',
    'hero.security': 'Security',
    'hero.security_desc': 'Discrete Vault Delivery',
    'hero.sanctuary': 'Sanctuary',
    'hero.sanctuary_desc': 'Private Island & Jet Escort',

    // Featured Creations Section
    'featured.badge': 'Curated Offerings',
    'featured.title': 'Featured Masterworks & Residencies',
    'featured.subtitle':
      'Each acquisition is an irreplaceable testament to human mastery, accompanied by physical provenance deeds and discrete diplomatic transit.',
    'featured.view_all': 'Examine Full Archive',
    'featured.piece_detail': 'Examine Piece',
    'featured.inquire': 'Inquire Privately',

    // Pillars of Excellence
    'pillars.badge': 'Pillars of Haute Excellence',
    'pillars.title': 'Three Disciplines of Uncompromising Mastercraft',
    'pillars.subtitle':
      'Every creation is individually commissioned, numbered, and recorded in our permanent Genevan archives.',
    'pillars.p1_title': 'Haute Horlogerie',
    'pillars.p1_desc':
      'Tourbillons, perpetual astronomical complications, and hand-chamfered bridges crafted in the Swiss Jura Vallée.',
    'pillars.p2_title': 'Bespoke Leather Craft',
    'pillars.p2_desc':
      'Traditional saddle-stitched trunks and travel vaults forged from vegetable-tanned French calfskin and aerospace-grade titanium.',
    'pillars.p3_title': 'Private Sanctuaries',
    'pillars.p3_desc':
      'Architecturally secluded alpine retreats, coastal havens, and discrete private airstrip estates engineered for undisturbed serenity.',

    // Testimonials
    'testimonials.badge': 'Patron Testimonials',
    'testimonials.title': 'Voices of the Haute Circle',
    'testimonials.subtitle':
      'Reflections from private collectors, distinguished diplomats, and families of legacy across continents.',

    // Consultation CTA Banner
    'cta.badge': 'Bespoke Private Client Office',
    'cta.title': 'Commission an Irreplaceable Masterwork',
    'cta.subtitle':
      'Whether seeking a personalized tourbillon commission, tailored leather luggage set, or discreet salon viewing, our senior curators await your inquiry.',
    'cta.button': 'Initiate Confidential Inquiry',
    'cta.hotline': 'Direct Salon Hotline',

    // Catalog & Archive
    'catalog.title': 'The Curated Archive',
    'catalog.subtitle':
      'Explore rare horological masterworks, bespoke leather luggage, and discreet private sanctum residences.',
    'catalog.search_placeholder': 'Search creations, materials, or specifications...',
    'catalog.filter_all': 'All Collections',
    'catalog.sort_featured': 'Curation (Featured First)',
    'catalog.sort_price_desc': 'Valuation (Highest First)',
    'catalog.sort_price_asc': 'Valuation (Lowest First)',
    'catalog.sort_name': 'Designation (A - Z)',
    'catalog.count_singular': 'Creation',
    'catalog.count_plural': 'Creations',
    'catalog.empty_title': 'No matching creations found',
    'catalog.empty_desc': 'Our curators can arrange bespoke acquisitions or commissions matching your exact specifications.',
    'catalog.empty_reset': 'Reset All Filters',
    'catalog.specifications': 'Artisanal Specifications',

    // Product Detail
    'product.back': 'Back to Collections',
    'product.haute_piece': 'Haute Creation',
    'product.in_stock': 'In Private Vault',
    'product.acquire_title': 'Private Acquisition & Inquiry',
    'product.consultation_cta': 'Schedule Private Consultation',
    'product.quick_inquire': 'Immediate Viewing Inquiry',
    'product.transport_title': 'Discrete Global Vault Delivery',
    'product.transport_desc': 'Armored diplomatic transport to your private residence, secure vault, or salon of choice.',
    'product.guarantee_title': 'Lifetime Horological & Material Warranty',
    'product.guarantee_desc': 'Includes annual atelier servicing, chronometric recalibration, and permanent provenance registration.',

    // Contact & Salons
    'contact.badge': 'Private Client Relations & Salons',
    'contact.title': 'Initiate a Confidential Consultation',
    'contact.subtitle':
      'We welcome inquiries regarding bespoke commissions, catalog acquisitions, private viewings, and sanctuary residency reservations.',
    'contact.salons_badge': 'Physical Salons & Private Suites',
    'contact.salons_title': 'Worldwide Private Salons',
    'contact.salons_subtitle': 'By confirmed appointment only. Accompanied by our resident master curators.',
    'contact.form_name': 'Full Legal Name',
    'contact.form_name_placeholder': 'e.g. Lord Alistair Vance',
    'contact.form_email': 'Confidential Client Email',
    'contact.form_email_placeholder': 'client@domain.com',
    'contact.form_phone': 'Direct Telephone / Encrypted Signal (Optional)',
    'contact.form_phone_placeholder': '+41 22 ...',
    'contact.form_service': 'Nature of Interest / Commission',
    'contact.form_service_default': 'Private Viewing & Bespoke Commission',
    'contact.form_service_horology': 'Haute Horlogerie Acquisition',
    'contact.form_service_leather': 'Bespoke Leather Craft Commission',
    'contact.form_service_sanctuary': 'Private Sanctuary Viewing & Lease',
    'contact.form_date': 'Preferred Consultation Date (Optional)',
    'contact.form_message': 'Confidential Dossier & Specifications',
    'contact.form_message_placeholder': 'Describe your bespoke specifications, preferred salon, or horological complications...',
    'contact.form_submit': 'Transmit Confidential Request',
    'contact.form_submitting': 'Securing & Transmitting...',
    'contact.form_discretion': 'Discretion Guaranteed. All communications protected under strict Swiss fiduciary privacy standards.',
    'contact.success_title': 'Transmission Confirmed',
    'contact.success_desc':
      'Your private dossier has been received by our senior client director. A response will be coordinated within 12 hours via discrete channel.',
    'contact.return_catalog': 'Return to Collections',

    // FAQ
    'faq.badge': 'Client Concierge & Advisory',
    'faq.title': 'Frequently Addressed Inquiries',
    'faq.subtitle':
      'Transparent guidance regarding bespoke commissions, secure delivery protocols, vault storage, and authentication guarantees.',
    'faq.search_placeholder': 'Search inquiries, warranties, or delivery terms...',
    'faq.no_results': 'No matching questions found',
    'faq.no_results_desc': 'Our concierge team is available to answer any bespoke questions directly.',
    'faq.contact_concierge': 'Contact Concierge',
    'faq.need_assistance': 'Require Dedicated Assistance?',
    'faq.direct_liaison': 'Direct Liaison Hotline',

    // Story Page
    'story.badge': 'Artisanal Heritage & Philosophy',
    'story.title': 'A Sanctuary Built on the Eternity of Craft',
    'story.subtitle':
      'In an era dominated by fleeting trends and mechanized mass production, AEREO was conceived as a sanctuary for uncompromising patience, tactile beauty, and timeless mechanical purity.',
    'story.quote':
      'True luxury does not clamor for attention. It speaks in whisper-quiet finishes, flawless hand-chamfered anglage, and the aroma of natural oak bark saddlery.',
    'story.ch1_label': 'Chapter I',
    'story.ch1_title': 'The Genevan Genesis',
    'story.ch1_text1':
      'Founded along the shores of Lake Geneva by a collective of independent master watchmakers and traditional leather artisans, AEREO began with a single radical principle: eliminate the compromise between aesthetic grace and mechanical fortitude.',
    'story.ch1_text2':
      'Every timepiece and handcrafted trunk that emerges from our workshops is intended to outlive generations, becoming an heirloom that binds family lineages through unyielding physical perfection.',
    'story.ch2_label': 'Chapter II',
    'story.ch2_title': 'The Purity of Matter',
    'story.ch2_text1':
      'We reject industrial alloys and mass-tanned hides. Our horological plates are carved from German silver and solid rose gold; our leathers are sourced exclusively from artisanal tanneries in the French Pyrenees, steeped in oak bark pits for fourteen months.',
    'story.ch2_text2':
      'Every surface that touches the human hand is polished with boxwood paste, diamond micro-lapping films, and natural beeswax.',
    'story.ch3_label': 'Chapter III',
    'story.ch3_title': 'The Sanctum of Seclusion',
    'story.ch3_text1':
      'Beyond tangible masterworks, true luxury is the sovereignty of time and space. AEREO curates private residential sanctums — secluded alpine lodges and private islands engineered with sovereign security and discreet bespoke services.',
    'story.values_title': 'Our Core Guiding Tenets',
    'story.v1_title': 'Uncompromising Patience',
    'story.v1_desc': 'We do not operate against deadlines. A creation is delivered only when the master artisan deems it flawless.',
    'story.v2_title': 'Absolute Discretion',
    'story.v2_desc': 'Patron identities, acquisitions, and vault locations are held in permanent confidentiality.',
    'story.v3_title': 'Permanent Stewardship',
    'story.v3_desc': 'Every AEREO creation carries lifetime care, provenance documentation, and restoration rights.',

    // Footer
    'footer.philosophy':
      'Engineering the apex of human craftsmanship, horological complications, bespoke leather saddlery, and secluded private residency sanctuaries.',
    'footer.cities': 'Geneva · Paris · Tokyo · Milan',
    'footer.curated_collections': 'Curated Collections',
    'footer.sanctuary_lore': 'Sanctuary & Lore',
    'footer.desk_title': 'Private Client Desk',
    'footer.desk_desc': 'Available 24/7 for bespoke commissions, viewing appointments, and discrete courier coordination.',
    'footer.hotline_label': 'Direct Liaison Hotline',
    'footer.copyright': 'AEREO Haute Maison. All Rights Reserved.',
    'footer.security_link': 'Security & Guarantee',
    'footer.provenance_link': 'Ethical Provenance',
    'footer.admin_link': 'Curator Desk',
    'footer.language': 'Language',
  },

  es: {
    // Brand & Navigation
    'brand.name': 'A E R E O',
    'brand.subtitle': 'Haute Maison y Santuarios',
    'nav.collections': 'Colecciones y Santuarios',
    'nav.story': 'Herencia Artesanal',
    'nav.faq': 'Atención al Cliente y FAQ',
    'nav.contact': 'Relaciones Privadas',
    'nav.curator': 'Portal de Curaduría',
    'nav.consultation': 'Consulta Privada',
    'nav.request_consultation': 'Solicitar Consulta Privada',
    'nav.admin_access': 'Acceso Curador / Admin',
    'nav.language': 'Idioma',
    'nav.select_language': 'Seleccionar Idioma',

    // Hero Section
    'hero.badge': 'Salones Privados en Ginebra · París · Tokio',
    'hero.title': 'La Cúspide de la Artesanía y Santuarios Exclusivos',
    'hero.subtitle':
      'Diseñado para conocedores de gusto inflexible. Complicaciones relojeras a medida, baúles de piel francesa cosidos a mano y residencias de aviación privada.',
    'hero.explore': 'Explorar Colecciones Curadas',
    'hero.heritage': 'Herencia Artesanal',
    'hero.provenance': 'Procedencia',
    'hero.provenance_desc': 'Certificado Cronimétrico Suizo',
    'hero.craft': 'Dedicación Artesanal',
    'hero.craft_desc': 'Más de 400 Horas / Pieza',
    'hero.security': 'Seguridad',
    'hero.security_desc': 'Entrega Discreta en Bóveda',
    'hero.sanctuary': 'Santuario',
    'hero.sanctuary_desc': 'Isla Privada y Escolta Aérea',

    // Featured Creations Section
    'featured.badge': 'Obras Curadas',
    'featured.title': 'Obras Maestras y Residencias Destacadas',
    'featured.subtitle':
      'Cada adquisición es un testimonio insustituible de la maestría humana, acompañada de títulos de procedencia física y tránsito diplomático discreto.',
    'featured.view_all': 'Examinar Archivo Completo',
    'featured.piece_detail': 'Examinar Pieza',
    'featured.inquire': 'Consultar en Privado',

    // Pillars of Excellence
    'pillars.badge': 'Pilares de Excelencia Exclusiva',
    'pillars.title': 'Tres Disciplinas de Maestría Sin Concesiones',
    'pillars.subtitle':
      'Cada creación es comisionada individualmente, numerada y registrada en nuestros archivos permanentes de Ginebra.',
    'pillars.p1_title': 'Alta Relojería',
    'pillars.p1_desc':
      'Torbellinos, calendarios astronómicos perpetuos y puentes biselados a mano en el valle suizo de Joux.',
    'pillars.p2_title': 'Marroquinería a Medida',
    'pillars.p2_desc':
      'Baúles tradicionales cosidos a mano y cofres de viaje forjados con piel de becerro francesa de curtido vegetal y titanio aeroespacial.',
    'pillars.p3_title': 'Santuarios Privados',
    'pillars.p3_desc':
      'Refugios alpinos aislados arquitectónicamente, oasis costeros y propiedades con pista privada diseñadas para una serenidad inalterable.',

    // Testimonials
    'testimonials.badge': 'Testimonios de Mecenas',
    'testimonials.title': 'Voces del Círculo Exclusivo',
    'testimonials.subtitle':
      'Reflexiones de coleccionistas privados, diplomáticos distinguidos y familias de abolengo en todos los continentes.',

    // Consultation CTA Banner
    'cta.badge': 'Oficina de Clientes Privados',
    'cta.title': 'Comisione una Obra Maestra Irremplazable',
    'cta.subtitle':
      'Ya sea que desee un tourbillon personalizado, un juego de maletas de piel a medida o una visita privada en salón, nuestros curadores esperan su contacto.',
    'cta.button': 'Iniciar Consulta Confidencial',
    'cta.hotline': 'Línea Directa del Salón',

    // Catalog & Archive
    'catalog.title': 'El Archivo Curado',
    'catalog.subtitle':
      'Explore obras maestras relojeras excepcionales, maletería artesanal y residencias privadas discretas.',
    'catalog.search_placeholder': 'Buscar creaciones, materiales o especificaciones...',
    'catalog.filter_all': 'Todas las Colecciones',
    'catalog.sort_featured': 'Curaduría (Destacados Primero)',
    'catalog.sort_price_desc': 'Valoración (Mayor a Menor)',
    'catalog.sort_price_asc': 'Valoración (Menor a Mayor)',
    'catalog.sort_name': 'Designación (A - Z)',
    'catalog.count_singular': 'Creación',
    'catalog.count_plural': 'Creaciones',
    'catalog.empty_title': 'No se encontraron creaciones coincidentes',
    'catalog.empty_desc': 'Nuestros curadores pueden organizar adquisiciones o encargos a medida según sus especificaciones exactas.',
    'catalog.empty_reset': 'Restablecer Filtros',
    'catalog.specifications': 'Especificaciones Artesanales',

    // Product Detail
    'product.back': 'Volver a Colecciones',
    'product.haute_piece': 'Creación Exclusiva',
    'product.in_stock': 'En Bóveda Privada',
    'product.acquire_title': 'Adquisición Privada y Consulta',
    'product.consultation_cta': 'Programar Consulta Privada',
    'product.quick_inquire': 'Consulta Inmediata de Exposición',
    'product.transport_title': 'Entrega Global Discreta en Bóveda',
    'product.transport_desc': 'Transporte blindado diplomático a su residencia privada, bóveda de seguridad o salón de preferencia.',
    'product.guarantee_title': 'Garantía Vitalicia Relojera y de Materiales',
    'product.guarantee_desc': 'Incluye mantenimiento anual en atelier, recalibración cronométrica y registro de procedencia permanente.',

    // Contact & Salons
    'contact.badge': 'Relaciones Privadas y Salones',
    'contact.title': 'Iniciar una Consulta Confidencial',
    'contact.subtitle':
      'Atendemos consultas sobre encargos a medida, adquisiciones del catálogo, visitas privadas y reservas de residencias santuario.',
    'contact.salons_badge': 'Salones Físicos y Suites Privadas',
    'contact.salons_title': 'Salones Privados en el Mundo',
    'contact.salons_subtitle': 'Únicamente mediante cita previa confirmada. Asistido por nuestros maestros curadores residentes.',
    'contact.form_name': 'Nombre Completo Legal',
    'contact.form_name_placeholder': 'ej. Don Fernando de la Vega',
    'contact.form_email': 'Correo Electrónico Privado',
    'contact.form_email_placeholder': 'cliente@dominio.com',
    'contact.form_phone': 'Teléfono Directo / Signal Cifrado (Opcional)',
    'contact.form_phone_placeholder': '+34 91 ...',
    'contact.form_service': 'Naturaleza del Interés / Comisión',
    'contact.form_service_default': 'Visita Privada y Comisión a Medida',
    'contact.form_service_horology': 'Adquisición de Alta Relojería',
    'contact.form_service_leather': 'Encargo de Marroquinería a Medida',
    'contact.form_service_sanctuary': 'Visita y Reserva de Santuario Privado',
    'contact.form_date': 'Fecha Preferida de Consulta (Opcional)',
    'contact.form_message': 'Expediente Confidencial y Requisitos',
    'contact.form_message_placeholder': 'Describa sus especificaciones personalizadas, salón preferido o complicaciones deseadas...',
    'contact.form_submit': 'Transmitir Solicitud Confidencial',
    'contact.form_submitting': 'Asegurando y Transmitiendo...',
    'contact.form_discretion': 'Discreción Garantizada. Todas las comunicaciones protegidas bajo estrictos estándares fiduciarios suizos.',
    'contact.success_title': 'Transmisión Confirmada',
    'contact.success_desc':
      'Su expediente privado ha sido recibido por nuestro director de clientes. Un enlace se coordinará dentro de 12 horas por canal discreto.',
    'contact.return_catalog': 'Volver a Colecciones',

    // FAQ
    'faq.badge': 'Conserjería y Asesoría',
    'faq.title': 'Preguntas Frecuentes y Consultas',
    'faq.subtitle':
      'Orientación transparente sobre encargos a medida, protocolos de entrega segura, custodia en bóveda y garantías de autenticidad.',
    'faq.search_placeholder': 'Buscar consultas, garantías o términos de entrega...',
    'faq.no_results': 'No se encontraron preguntas coincidentes',
    'faq.no_results_desc': 'Nuestro equipo de conserjería está a su disposición para atender cualquier duda directamente.',
    'faq.contact_concierge': 'Contactar a la Conserjería',
    'faq.need_assistance': '¿Requiere Asistencia Dedicada?',
    'faq.direct_liaison': 'Línea Directa de Enlace',

    // Story Page
    'story.badge': 'Herencia Artesanal y Filosofía',
    'story.title': 'Un Santuario Forjado en la Eternidad del Oficio',
    'story.subtitle':
      'En una era dominada por modas pasajeras y producción mecanizada, AEREO nació como un refugio para la paciencia inquebrantable, la belleza táctil y la pureza mecánica.',
    'story.quote':
      'El verdadero lujo no compite por atención. Se manifiesta en acabados silenciosos, achaflanados impecables a mano y el aroma a corteza de roble natural.',
    'story.ch1_label': 'Capítulo I',
    'story.ch1_title': 'El Génesis de Ginebra',
    'story.ch1_text1':
      'Fundada a orillas del lago de Ginebra por un colectivo de maestros relojeros independientes y artesanos del cuero tradicional, AEREO nació con un principio radical: eliminar el compromiso entre la gracia estética y la fortaleza mecánica.',
    'story.ch1_text2':
      'Cada reloj y baúl artesanal que sale de nuestros talleres está destinado a perdurar a través de generaciones, convirtiéndose en un legado familiar.',
    'story.ch2_label': 'Capítulo II',
    'story.ch2_title': 'La Pureza de la Materia',
    'story.ch2_text1':
      'Rechazamos aleaciones industriales y cueros tratados en masa. Nuestras platinas relojeras se tallan en plata alemana y oro rosa macizo; nuestros cueros proceden exclusivamente de tenerías tradicionales en los Pirineos franceses.',
    'story.ch2_text2':
      'Cada superficie que acaricia la mano humana se pule con pasta de boj, películas de micro-lapidado de diamante y cera de abeja natural.',
    'story.ch3_label': 'Capítulo III',
    'story.ch3_title': 'El Santuario de la Aislamiento',
    'story.ch3_text1':
      'Más allá de obras materiales, el mayor lujo es la soberanía del tiempo y el espacio. AEREO concibe santuarios residenciales privados: refugios alpinos e islas privadas con seguridad soberana.',
    'story.values_title': 'Nuestros Principios Rectores',
    'story.v1_title': 'Paciencia Inflexible',
    'story.v1_desc': 'No trabajamos contra plazos de entrega. Una creación se entrega únicamente cuando el maestro artesano la declara perfecta.',
    'story.v2_title': 'Discreción Absoluta',
    'story.v2_desc': 'La identidad de los mecenas, adquisiciones y ubicaciones de bóvedas se custodian bajo secreto permanente.',
    'story.v3_title': 'Custodia Perpetua',
    'story.v3_desc': 'Toda creación AEREO cuenta con mantenimiento de por vida, registro de procedencia y derechos de restauración.',

    // Footer
    'footer.philosophy':
      'Creando la cúspide de la artesanía humana, complicaciones relojeras, marroquinería a medida y santuarios de residencia privada.',
    'footer.cities': 'Ginebra · París · Tokio · Milán',
    'footer.curated_collections': 'Colecciones Curadas',
    'footer.sanctuary_lore': 'Santuario y Tradición',
    'footer.desk_title': 'Mesa de Clientes Privados',
    'footer.desk_desc': 'Disponible las 24 horas para encargos a medida, citas privadas y coordinación de mensajería discreta.',
    'footer.hotline_label': 'Línea Directa de Enlace',
    'footer.copyright': 'AEREO Haute Maison. Todos los derechos reservados.',
    'footer.security_link': 'Seguridad y Garantía',
    'footer.provenance_link': 'Procedencia Ética',
    'footer.admin_link': 'Mesa de Curaduría',
    'footer.language': 'Idioma',
  },

  ar: {
    // Brand & Navigation
    'brand.name': 'A E R E O',
    'brand.subtitle': 'دار الفخامة والملاذات الخاصة',
    'nav.collections': 'المجموعات والملاذات',
    'nav.story': 'الإرث الحرفي',
    'nav.faq': 'دعم العملاء والأسئلة الشائعة',
    'nav.contact': 'العلاقات الخاصة',
    'nav.curator': 'بوابة القيّم',
    'nav.consultation': 'استشارة خاصة',
    'nav.request_consultation': 'طلب استشارة خاصة',
    'nav.admin_access': 'دخول إدارة القيّم',
    'nav.language': 'اللغة',
    'nav.select_language': 'اختر اللغة',

    // Hero Section
    'hero.badge': 'صالات خاصة في جنيف · باريس · طوكيو',
    'hero.title': 'قمة الحِرفية الرفيعة والملاذات الفاخرة',
    'hero.subtitle':
      'صُممت لصفوة أصحاب الذوق الرفيع. تعقيدات ساعات استثنائية، حقائب جلد فرنسية محاكة يدوياً، وملاذات إقامة خاصة بالطيران.',
    'hero.explore': 'استكشف المقتنيات المختارة',
    'hero.heritage': 'الإرث الحرفي',
    'hero.provenance': 'الأصالة',
    'hero.provenance_desc': 'شهادة كرونومتر سويسرية',
    'hero.craft': 'اللمسة الحرفية',
    'hero.craft_desc': 'أكثر من 400 ساعة لكل قطعة',
    'hero.security': 'الأمان',
    'hero.security_desc': 'تسليم خزائن بسرية تامة',
    'hero.sanctuary': 'الملاذ',
    'hero.sanctuary_desc': 'جزيرة خاصة ومرافقة جوية',

    // Featured Creations Section
    'featured.badge': 'المقتنيات المختارة',
    'featured.title': 'روائع الإبداع والإقامات الخاصة',
    'featured.subtitle':
      'كل اقتناء هو شاهد فريد على الإتقان البشري الخالد، مصحوباً بوثائق ملكية أصيلة ونقل دبلوماسي سري وآمن.',
    'featured.view_all': 'استعراض الأرشيف الكامل',
    'featured.piece_detail': 'معاينة القطعة',
    'featured.inquire': 'استفسار خاص',

    // Pillars of Excellence
    'pillars.badge': 'أركان التميز الرفيع',
    'pillars.title': 'ثلاثة اختصاصات من الإتقان الحرفي الأصيل',
    'pillars.subtitle':
      'كل تحفة تُصنع بتكليف فردي، وتُرقم وتُوثق في أرشيفاتنا الدائمة في جنيف.',
    'pillars.p1_title': 'صناعة الساعات الراقية',
    'pillars.p1_desc':
      'توربيون وتقاويم فلكية دائمة وجسور مشطوفة يدوياً صُنعت في وادي فالي دو جو السويسري العريق.',
    'pillars.p2_title': 'حِرفة الجلود المصممة حسب الطلب',
    'pillars.p2_desc':
      'صناديق وخزائن سفر محاكة يدوياً من جلد العجل الفرنسي المدبوغ طبيعياً مع أقفال من التيتانيوم النقي.',
    'pillars.p3_title': 'الملاذات والإقامات الحصرية',
    'pillars.p3_desc':
      'ملاذات جبلية منعزلة معمارياً، وواحات ساحلية، وعقارات بمهابط خاصة صُممت لتوفير أقصى درجات السكينة والخصوصية.',

    // Testimonials
    'testimonials.badge': 'آراء النخبة والرواد',
    'testimonials.title': 'أصوات الدائرة الخاصة',
    'testimonials.subtitle':
      'انطباعات وتجارب نخبة جامعي التحف والدبلوماسيين والعائلات العريقة عبر القارات.',

    // Consultation CTA Banner
    'cta.badge': 'مكتب العلاقات والعملاء الخاص',
    'cta.title': 'اطلب تحفة فريدة صُنعت لأجلك',
    'cta.subtitle':
      'سواء كنت ترغب في ساعة توربيون مخصصة، أو مجموعة حقائب جلدية حصرية، أو زيارة خاصة لإحدى صالاتنا، فإن كبار القيمين بانتظار تواصلكم.',
    'cta.button': 'بدء استشارة سرية',
    'cta.hotline': 'الخط المباشر للصالات',

    // Catalog & Archive
    'catalog.title': 'الأرشيف الفاخر',
    'catalog.subtitle':
      'استكشف روائع الساعات النادرة، وحقائب السفر المصنوعة يدوياً، والملاذات السكنية الهادئة.',
    'catalog.search_placeholder': 'ابحث في التحف، أو المواد، أو المواصفات...',
    'catalog.filter_all': 'جميع المجموعات',
    'catalog.sort_featured': 'المختارات (المميز أولاً)',
    'catalog.sort_price_desc': 'القيمة (الأعلى أولاً)',
    'catalog.sort_price_asc': 'القيمة (الأقل أولاً)',
    'catalog.sort_name': 'التسمية (أ - ي)',
    'catalog.count_singular': 'إبداع',
    'catalog.count_plural': 'إبداعات',
    'catalog.empty_title': 'لم يتم العثور على تحف مطابقة',
    'catalog.empty_desc': 'يسعد فريق القيمين لدينا ترتيب اقتناء خاص أو تكليف حصري يلبي أدق متطلباتكم.',
    'catalog.empty_reset': 'إعادة ضبط الفلاتر',
    'catalog.specifications': 'المواصفات الحرفية',

    // Product Detail
    'product.back': 'العودة إلى المجموعات',
    'product.haute_piece': 'إبداع حصري',
    'product.in_stock': 'في الخزينة الخاصة',
    'product.acquire_title': 'الاقتناء الخاص والاستفسار',
    'product.consultation_cta': 'حجز استشارة خاصة',
    'product.quick_inquire': 'طلب معاينة عاجلة',
    'product.transport_title': 'تسليم خزائن دبلوماسي وسري حول العالم',
    'product.transport_desc': 'نقل مدرع ومحمي مباشرة إلى مقر إقامتكم الخاص أو الخزينة البنكية أو الصالون المختار.',
    'product.guarantee_title': 'ضمان مدى الحياة للساعة والمواد',
    'product.guarantee_desc': 'يشمل صيانة سنوية في الأتيليه، وإعادة ضبط الدقة الميكانيكية، وتوثيق دائم في سجلات الدار.',

    // Contact & Salons
    'contact.badge': 'العلاقات الخاصة والصالات',
    'contact.title': 'بدء استشارة سرية خاصة',
    'contact.subtitle':
      'نرحب باستفساراتكم بشأن التكليفات الخاصة، واقتناء المعروضات، والجلسات الخاصة، وحجوزات الملاذات.',
    'contact.salons_badge': 'الصالات الحقيقية والأجنحة الحصرية',
    'contact.salons_title': 'صالاتنا الخاصة حول العالم',
    'contact.salons_subtitle': 'بموجب موعد مسبق ومؤكد فقط. برفقة كبار القيمين الحرفيين لدينا.',
    'contact.form_name': 'الاسم الكامل الرسمي',
    'contact.form_name_placeholder': 'مثال: الشيخ راشد آل مكتوم',
    'contact.form_email': 'البريد الإلكتروني السري',
    'contact.form_email_placeholder': 'client@domain.com',
    'contact.form_phone': 'الهاتف المباشر / خط سيجنال الآمن (اختياري)',
    'contact.form_phone_placeholder': '+971 50 ...',
    'contact.form_service': 'طبيعة الاهتمام / التكليف الحرفي',
    'contact.form_service_default': 'معاينة خاصة وتكليف حصري',
    'contact.form_service_horology': 'اقتناء ساعات راقية معقدة',
    'contact.form_service_leather': 'طلب صناعة حقائب ومصنوعات جلدية',
    'contact.form_service_sanctuary': 'معاينة وحجز ملاذ سكني خاص',
    'contact.form_date': 'تاريخ الاستشارة المفضل (اختياري)',
    'contact.form_message': 'الملف السري والمتطلبات الخاصة',
    'contact.form_message_placeholder': 'وضح المواصفات المطلوبة، الصالون المفضل للزيارة، أو التعقيدات الساعاتية...',
    'contact.form_submit': 'إرسال الطلب السري',
    'contact.form_submitting': 'جارٍ التشفير والإرسال...',
    'contact.form_discretion': 'سرية تامة ومضمونة. جميع المحادثات والبيانات محمية بموجب معايير الخصوصية السويسرية الصارمة.',
    'contact.success_title': 'تم تأكيد الإرسال بنجاح',
    'contact.success_desc':
      'تم استلام ملفكم السري من قبل مدير العلاقات الخاصة. سيتم التنسيق معكم خلال 12 ساعة عبر قناة خاصة وآمنة.',
    'contact.return_catalog': 'العودة إلى المجموعات',

    // FAQ
    'faq.badge': 'الكونسيرج والاستشارات الخاصة',
    'faq.title': 'الأسئلة الأكثر تداولاً وتوضيحات العملاء',
    'faq.subtitle':
      'إرشادات واضحة بشأن التكليفات الحصرية، بروتوكولات التسليم الآمن، الحفظ في الخزائن، وضمانات الأصالة.',
    'faq.search_placeholder': 'ابحث في الاستفسارات، الضمانات، أو شروط الشحن والتسليم...',
    'faq.no_results': 'لم يتم العثور على نتائج مطابقة',
    'faq.no_results_desc': 'فريق الكونسيرج الخاص متاح دائماً للإجابة على جميع استفساراتكم بصورة مباشرة.',
    'faq.contact_concierge': 'تواصل مع الكونسيرج',
    'faq.need_assistance': 'هل تحتاج إلى مساعدة مخصصة؟',
    'faq.direct_liaison': 'الخط المباشر للمكتب',

    // Story Page
    'story.badge': 'الإرث الحرفي والفلسفة',
    'story.title': 'ملاذ أُسس على خلود الحِرفة',
    'story.subtitle':
      'في عصر تسوده الموضات العابرة والإنتاج الصناعي المكثف، ولدت دار AEREO كملاذ للصبر الحرفي، والجمال الملموس، والنقاء الميكانيكي الخالد.',
    'story.quote':
      'الفخامة الحقيقية لا تبحث عن الضجيج، بل تتحدث بهمس التشطيبات الفائقة، وزوايا الشطب اليدوي الخالية من الشوائب، وعبق جلود لحاء البلوط العتيقة.',
    'story.ch1_label': 'الفصل الأول',
    'story.ch1_title': 'ولادة جنيف',
    'story.ch1_text1':
      'تأسست الدار على ضفاف بحيرة جنيف على يد نخبة من كبار صانعي الساعات المستقلين وحرفيي الجلود التقليديين، متمسكين بمبدأ لا يتزعزع: عدم المساومة أبداً بين الرشاقة الجمالية والصلابة الميكانيكية.',
    'story.ch1_text2':
      'كل ساعة وحقيبة سفر تُصنع في مشاغلنا صُممت لتعيش أجيالاً طويلة، لتكون إرثاً يربط سلالات العائلات عبر كمال مادي متقن.',
    'story.ch2_label': 'الفصل الثاني',
    'story.ch2_title': 'نقاء المادة وجوهرها',
    'story.ch2_text1':
      'نحن نرفض السبائك الصناعية والجلود المدبوغة كيميائياً. صفائح ساعاتنا تُنحت من الفضة الألمانية والذهب الوردي المصمت؛ وجلودنا تُجلب حصرياً من مدابغ عريقة في جبال البرانس الفرنسية حيث تُنقع في أحواض لحاء البلوط لمدة 14 شهراً.',
    'story.ch2_text2':
      'كل سطح تلامسه يد الإنسان يُصقل يدوياً بمعجون خشب البقس وأغشية الماس وشمع العسل الطبيعي.',
    'story.ch3_label': 'الفصل الثالث',
    'story.ch3_title': 'ملاذ العزلة والسكينة',
    'story.ch3_text1':
      'أبعد من مجرد روائع مادية، الفخامة الحقيقية هي سيادة الوقت والمكان. تُهيئ AEREO ملاذات سكنية خاصة — شاليهات ألبية معزولة وجزر خاصة تخضع لأعلى معايير الحماية والأمان.',
    'story.values_title': 'المبادئ الأساسية التي تحكمنا',
    'story.v1_title': 'صبر حرفي بلا مساومة',
    'story.v1_desc': 'لا نخضع لمواعيد تسليم متسرعة. لا تُسلّم أي قطعة إلا عندما يراها الحرفي الأكبر كاملة وبلا عيب.',
    'story.v2_title': 'كتمان وسرية مطلقة',
    'story.v2_desc': 'هويات عملائنا، واقتناءاتهم، ومواقع خزائنهم تخضع للسرية التامة والمستدامة.',
    'story.v3_title': 'رعاية دائمة وحفظ للإرث',
    'story.v3_desc': 'تحظى كل تحفة من AEREO بعناية مدى الحياة، ووثائق أصالة دائمة، وحق استعادة ورعاية مستمرة.',

    // Footer
    'footer.philosophy':
      'هندسة أسمى درجات الحرفية البشرية، والتعقيدات الساعاتية الفاخرة، وحِرفة الجلود المصممة حسب الطلب، والملاذات السكنية الخاصة.',
    'footer.cities': 'جنيف · باريس · طوكيو · ميلانو',
    'footer.curated_collections': 'المجموعات المختارة',
    'footer.sanctuary_lore': 'الملاذ والتاريخ',
    'footer.desk_title': 'مكتب العملاء الخاص',
    'footer.desk_desc': 'متاح على مدار الساعة للطلبات الحصرية، والمواعيد الخاصة، والتنسيق الدبلوماسي الآمن.',
    'footer.hotline_label': 'الخط المباشر للمكتب',
    'footer.copyright': 'دار AEREO الفاخرة. جميع الحقوق محفوظة.',
    'footer.security_link': 'الأمان والضمان',
    'footer.provenance_link': 'الأصالة الموثقة',
    'footer.admin_link': 'مكتب القيّم',
    'footer.language': 'اللغة',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
