import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Idempotency check: only seed if no data exists
    const existingIndustrias = await strapi.documents('api::industria.industria').findMany({
      limit: 1,
    });

    if (existingIndustrias && existingIndustrias.length > 0) {
      strapi.log.info('Seed data already exists, skipping bootstrap seeding.');
      return;
    }

    strapi.log.info('Seeding demo data for Andexport...');

    // =============================================
    // 1. SEED INDUSTRIAS
    // =============================================
    const industriasData = [
      {
        nombre: 'Mineria',
        slug: 'mineria',
        extracto: 'Soluciones de instrumentacion y control para operaciones mineras de gran escala.',
        orden: 1,
        activa: true,
      },
      {
        nombre: 'Petroleo y Gas',
        slug: 'petroleo-y-gas',
        extracto: 'Tecnologia de automatizacion y seguridad para la industria de hidrocarburos.',
        orden: 2,
        activa: true,
      },
      {
        nombre: 'Energia Electrica',
        slug: 'energia-electrica',
        extracto: 'Sistemas de control y monitoreo para generacion y distribucion de energia.',
        orden: 3,
        activa: true,
      },
      {
        nombre: 'Alimentos y Bebidas',
        slug: 'alimentos-y-bebidas',
        extracto: 'Instrumentacion de procesos para la industria alimentaria con estandares de higiene.',
        orden: 4,
        activa: true,
      },
      {
        nombre: 'Agua y Medioambiente',
        slug: 'agua-y-medioambiente',
        extracto: 'Soluciones de medicion y control para tratamiento de aguas y monitoreo ambiental.',
        orden: 5,
        activa: true,
      },
    ];

    const createdIndustrias: any[] = [];
    for (const ind of industriasData) {
      const created = await strapi.documents('api::industria.industria').create({
        data: ind,
        status: 'published',
      });
      createdIndustrias.push(created);
    }

    // =============================================
    // 2. SEED SOLUCIONES
    // =============================================
    const solucionesData = [
      {
        nombre: 'Instrumentacion de Procesos',
        slug: 'instrumentacion-de-procesos',
        descripcionCorta: 'Medicion de presion, temperatura, caudal y nivel con tecnologia de ultima generacion.',
        lineaNegocio: 'instrumentacion' as const,
        destacado: true,
        orden: 1,
      },
      {
        nombre: 'Sistemas de Control Distribuido (DCS)',
        slug: 'sistemas-de-control-distribuido',
        descripcionCorta: 'Plataformas DCS para el control integral de plantas industriales complejas.',
        lineaNegocio: 'control-de-procesos' as const,
        destacado: true,
        orden: 2,
      },
      {
        nombre: 'Automatizacion Industrial',
        slug: 'automatizacion-industrial',
        descripcionCorta: 'PLCs, SCADA y soluciones de automatizacion para optimizar la produccion.',
        lineaNegocio: 'automatizacion' as const,
        destacado: true,
        orden: 3,
      },
      {
        nombre: 'Seguridad Funcional (SIS)',
        slug: 'seguridad-funcional-sis',
        descripcionCorta: 'Sistemas instrumentados de seguridad certificados SIL para proteccion de plantas.',
        lineaNegocio: 'seguridad-industrial' as const,
        destacado: false,
        orden: 4,
      },
      {
        nombre: 'Analisis de Gases y Emisiones',
        slug: 'analisis-de-gases-y-emisiones',
        descripcionCorta: 'Analizadores continuos de gases para monitoreo ambiental y control de procesos.',
        lineaNegocio: 'medioambiente' as const,
        destacado: false,
        orden: 5,
      },
    ];

    const createdSoluciones: any[] = [];
    for (const sol of solucionesData) {
      const created = await strapi.documents('api::solucion.solucion').create({
        data: sol,
        status: 'published',
      });
      createdSoluciones.push(created);
    }

    // Link soluciones to industrias (many-to-many)
    if (createdSoluciones[0] && createdIndustrias[0]) {
      await strapi.documents('api::solucion.solucion').update({
        documentId: createdSoluciones[0].documentId,
        data: {
          industrias: [
            createdIndustrias[0].documentId,
            createdIndustrias[1].documentId,
            createdIndustrias[2].documentId,
          ],
        },
      });
    }
    if (createdSoluciones[1] && createdIndustrias[1]) {
      await strapi.documents('api::solucion.solucion').update({
        documentId: createdSoluciones[1].documentId,
        data: {
          industrias: [
            createdIndustrias[1].documentId,
            createdIndustrias[2].documentId,
          ],
        },
      });
    }
    if (createdSoluciones[2] && createdIndustrias[0]) {
      await strapi.documents('api::solucion.solucion').update({
        documentId: createdSoluciones[2].documentId,
        data: {
          industrias: [
            createdIndustrias[0].documentId,
            createdIndustrias[3].documentId,
          ],
        },
      });
    }

    // =============================================
    // 3. SEED PROYECTOS
    // =============================================
    const proyectosData = [
      {
        titulo: 'Modernizacion de Instrumentacion - Minera Los Andes',
        slug: 'modernizacion-instrumentacion-minera-los-andes',
        extracto: 'Actualizacion completa del sistema de instrumentacion en planta concentradora.',
        cliente: 'Minera Los Andes S.A.',
        ubicacion: 'Region de Antofagasta, Chile',
        anio: 2024,
        desafio: 'La planta operaba con instrumentacion obsoleta de mas de 15 anios, generando paradas no programadas frecuentes y lecturas imprecisas que afectaban la eficiencia del proceso.',
        solucionAplicada: 'Se implemento un sistema completo de instrumentacion de nueva generacion con transmisores inteligentes HART, incluyendo medicion de presion, temperatura, caudal y nivel en toda la planta concentradora.',
        resultados: 'Reduccion del 40% en paradas no programadas. Mejora del 15% en la eficiencia del proceso. ROI alcanzado en 18 meses.',
        destacado: true,
        industria: createdIndustrias[0]?.documentId,
        solucionPrincipal: createdSoluciones[0]?.documentId,
        estadisticas: [
          { numero: '40', etiqueta: 'Reduccion paradas no programadas', sufijo: '%' },
          { numero: '15', etiqueta: 'Mejora en eficiencia', sufijo: '%' },
          { numero: '18', etiqueta: 'Meses para ROI', sufijo: '' },
        ],
      },
      {
        titulo: 'Sistema DCS para Refineria TechPetrol',
        slug: 'sistema-dcs-refineria-techpetrol',
        extracto: 'Implementacion de sistema de control distribuido para nueva unidad de destilacion.',
        cliente: 'TechPetrol SpA',
        ubicacion: 'Region del Biobio, Chile',
        anio: 2023,
        desafio: 'La refineria necesitaba integrar una nueva unidad de destilacion al sistema de control existente, manteniendo la operacion continua sin interrupciones.',
        solucionAplicada: 'Diseno e implementacion de sistema DCS con migracion en caliente, integrando la nueva unidad con el sistema de control existente y agregando capacidades de optimizacion avanzada.',
        resultados: 'Cero horas de detencion durante la migracion. Incremento de 20% en capacidad de procesamiento. Sistema operativo 24/7 con 99.99% de disponibilidad.',
        destacado: true,
        industria: createdIndustrias[1]?.documentId,
        solucionPrincipal: createdSoluciones[1]?.documentId,
        estadisticas: [
          { numero: '0', etiqueta: 'Horas de detencion', sufijo: '' },
          { numero: '20', etiqueta: 'Incremento capacidad', sufijo: '%' },
          { numero: '99.99', etiqueta: 'Disponibilidad', sufijo: '%' },
        ],
      },
      {
        titulo: 'Automatizacion Planta Lacteos del Sur',
        slug: 'automatizacion-planta-lacteos-del-sur',
        extracto: 'Sistema SCADA y automatizacion para linea de produccion de lacteos.',
        cliente: 'Lacteos del Sur Ltda.',
        ubicacion: 'Region de Los Lagos, Chile',
        anio: 2024,
        desafio: 'Procesos manuales generaban inconsistencias en la calidad del producto y altos costos operativos en la linea de produccion de yogurt y leche cultivada.',
        solucionAplicada: 'Automatizacion completa de la linea de produccion con PLCs redundantes, sistema SCADA con HMI tactil, y trazabilidad completa del proceso acorde a normas de inocuidad alimentaria.',
        resultados: 'Reduccion del 60% en reprocesos. Trazabilidad completa de produccion. Certificacion HACCP facilitada.',
        destacado: false,
        industria: createdIndustrias[3]?.documentId,
        solucionPrincipal: createdSoluciones[2]?.documentId,
        estadisticas: [
          { numero: '60', etiqueta: 'Reduccion en reprocesos', sufijo: '%' },
          { numero: '100', etiqueta: 'Trazabilidad', sufijo: '%' },
        ],
      },
    ];

    for (const proy of proyectosData) {
      await strapi.documents('api::proyecto.proyecto').create({
        data: {
          titulo: proy.titulo,
          slug: proy.slug,
          extracto: proy.extracto,
          cliente: proy.cliente,
          ubicacion: proy.ubicacion,
          anio: proy.anio,
          desafio: proy.desafio,
          solucionAplicada: proy.solucionAplicada,
          resultados: proy.resultados,
          destacado: proy.destacado,
          industria: proy.industria,
          solucionPrincipal: proy.solucionPrincipal,
          estadisticas: proy.estadisticas,
        },
        status: 'published',
      });
    }

    // =============================================
    // 4. SEED EQUIPO
    // =============================================
    const equipoData = [
      {
        nombre: 'Roberto Mendez',
        cargo: 'Gerente General',
        departamento: 'direccion' as const,
        bio: 'Ingeniero Civil Industrial con mas de 25 anios de experiencia en soluciones tecnologicas para la industria. Lidero la expansion de Andexport hacia nuevos mercados.',
        orden: 1,
        visible: true,
      },
      {
        nombre: 'Carolina Vega',
        cargo: 'Directora Comercial',
        departamento: 'comercial' as const,
        bio: 'Ingeniera Comercial especializada en ventas consultivas B2B. 15 anios desarrollando relaciones comerciales de largo plazo con clientes industriales.',
        orden: 2,
        visible: true,
      },
      {
        nombre: 'Francisco Torres',
        cargo: 'Jefe de Ingenieria',
        departamento: 'ingenieria' as const,
        bio: 'Ingeniero en Automatizacion y Control. Experto en diseno e implementacion de sistemas de control distribuido y seguridad funcional.',
        orden: 3,
        visible: true,
      },
      {
        nombre: 'Maria Elena Rojas',
        cargo: 'Coordinadora de Marketing',
        departamento: 'marketing' as const,
        bio: 'Periodista con especializacion en marketing digital B2B. Responsable de la estrategia de contenido y generacion de demanda.',
        orden: 4,
        visible: true,
      },
      {
        nombre: 'Andres Silva',
        cargo: 'Ingeniero de Proyectos Senior',
        departamento: 'ingenieria' as const,
        bio: 'Ingeniero Electrico con certificacion en seguridad funcional SIL. Lidera los proyectos mas complejos de la empresa.',
        orden: 5,
        visible: true,
      },
    ];

    for (const miembro of equipoData) {
      await strapi.documents('api::miembro-equipo.miembro-equipo').create({
        data: miembro,
        status: 'published',
      });
    }

    // =============================================
    // 5. SEED NOVEDADES
    // =============================================
    const novedadesData = [
      {
        titulo: 'Andexport obtiene certificacion como integrador autorizado',
        slug: 'andexport-certificacion-integrador-autorizado',
        extracto: 'Reforzamos nuestra capacidad tecnica con la certificacion oficial como integrador de sistemas de control distribuido.',
        contenido: 'Nos complace anunciar que Andexport ha obtenido la certificacion como integrador autorizado de sistemas de control distribuido (DCS), reforzando nuestro compromiso con la excelencia tecnica y el servicio de primer nivel para nuestros clientes.\n\nEsta certificacion valida nuestra experiencia de mas de 36 anios en la implementacion de soluciones de automatizacion y control para la industria, y nos posiciona como uno de los pocos integradores certificados en la region.',
        categoria: 'noticia' as const,
        fechaPublicacion: '2024-11-15',
        destacado: true,
      },
      {
        titulo: 'Tendencias en Automatizacion Industrial para 2025',
        slug: 'tendencias-automatizacion-industrial-2025',
        extracto: 'Analizamos las principales tendencias tecnologicas que estan transformando la industria: IIoT, gemelos digitales y ciberseguridad OT.',
        contenido: 'La industria 4.0 continua evolucionando y las empresas que no se adapten quedaran rezagadas. En este articulo analizamos las tendencias mas relevantes para el proximo anio.\n\nInternet Industrial de las Cosas (IIoT): La conectividad de dispositivos en planta permite recopilar datos en tiempo real para tomar mejores decisiones.\n\nGemelos Digitales: La creacion de replicas digitales de procesos industriales permite simular escenarios, optimizar operaciones y predecir fallas antes de que ocurran.\n\nCiberseguridad OT: Con la convergencia IT/OT, la seguridad de los sistemas de control industrial es critica.',
        categoria: 'articulo-tecnico' as const,
        fechaPublicacion: '2024-12-01',
        destacado: true,
      },
      {
        titulo: 'Caso de Exito: Reduccion de emisiones en planta termoelectrica',
        slug: 'caso-exito-reduccion-emisiones-planta-termoelectrica',
        extracto: 'Como nuestro sistema de monitoreo continuo de emisiones ayudo a cumplir con la normativa ambiental vigente.',
        contenido: 'Presentamos un caso de exito donde la implementacion de nuestro sistema CEMS (Continuous Emission Monitoring System) permitio a una planta termoelectrica cumplir con la normativa ambiental vigente y reducir sus emisiones en un 25%.\n\nEl proyecto incluyo la instalacion de analizadores de gases en tres chimeneas, un sistema de adquisicion de datos con transmision automatica al organismo regulador, y un dashboard de monitoreo en tiempo real.',
        categoria: 'caso-de-estudio' as const,
        fechaPublicacion: '2024-10-20',
        destacado: false,
      },
    ];

    for (const nov of novedadesData) {
      await strapi.documents('api::novedad.novedad').create({
        data: nov,
        status: 'published',
      });
    }

    // =============================================
    // 6. SEED CONTACTOS (LEADS)
    // =============================================
    const contactosData = [
      {
        nombreCompleto: 'Juan Pablo Ramirez',
        email: 'jp.ramirez@minerasanluis.cl',
        telefono: '+56 9 8765 4321',
        empresa: 'Minera San Luis',
        cargo: 'Jefe de Mantenimiento',
        mensaje: 'Necesitamos cotizacion para actualizacion de instrumentacion en planta de chancado. Tenemos alrededor de 120 instrumentos que necesitan recambio.',
        origen: 'formulario-cotizacion' as const,
        estado: 'nuevo' as const,
        prioridad: 'alta' as const,
        fechaContacto: '2024-12-15T10:30:00.000Z',
        paginaOrigen: '/soluciones/instrumentacion-de-procesos',
      },
      {
        nombreCompleto: 'Andrea Fuentes',
        email: 'afuentes@energiasur.cl',
        telefono: '+56 2 2345 6789',
        empresa: 'Energia Sur S.A.',
        cargo: 'Gerente de Operaciones',
        mensaje: 'Estamos evaluando proveedores para implementar un sistema DCS en nuestra nueva planta de generacion. Solicitamos una reunion tecnico-comercial.',
        origen: 'formulario-contacto' as const,
        estado: 'contactado' as const,
        prioridad: 'urgente' as const,
        fechaContacto: '2024-12-10T14:15:00.000Z',
        asignadoA: 'Carolina Vega',
        paginaOrigen: '/soluciones/sistemas-de-control-distribuido',
      },
      {
        nombreCompleto: 'Miguel Herrera',
        email: 'mherrera@agroalimentos.cl',
        empresa: 'AgroAlimentos SpA',
        cargo: 'Director de Planta',
        mensaje: 'Descargue la ficha tecnica de automatizacion industrial. Me gustaria saber mas sobre las opciones para nuestra linea de envasado.',
        origen: 'descarga-ficha-tecnica' as const,
        estado: 'en-seguimiento' as const,
        prioridad: 'media' as const,
        fechaContacto: '2024-12-08T09:00:00.000Z',
        asignadoA: 'Francisco Torres',
        paginaOrigen: '/soluciones/automatizacion-industrial',
      },
      {
        nombreCompleto: 'Lorena Gutierrez',
        email: 'lgutierrez@aguaslimpia.cl',
        telefono: '+56 9 1234 5678',
        empresa: 'Aguas Limpia Ltda.',
        cargo: 'Ingeniera de Procesos',
        mensaje: 'Necesitamos un sistema de monitoreo de calidad de agua en linea para nuestra planta de tratamiento. Capacidad: 500 L/s.',
        origen: 'formulario-cotizacion' as const,
        estado: 'calificado' as const,
        prioridad: 'alta' as const,
        fechaContacto: '2024-11-28T11:45:00.000Z',
        asignadoA: 'Andres Silva',
        notas: 'Cliente con presupuesto aprobado. Requiere visita tecnica a planta en enero.',
        paginaOrigen: '/industrias/agua-y-medioambiente',
      },
      {
        nombreCompleto: 'Pedro Navarro',
        email: 'pnavarro@petroquimicaandina.cl',
        empresa: 'Petroquimica Andina',
        cargo: 'Superintendente de Instrumentacion',
        mensaje: 'Consulta sobre sistemas de seguridad funcional SIS para nuestra unidad de cracking. Necesitamos cumplir con SIL 3.',
        origen: 'formulario-contacto' as const,
        estado: 'propuesta-enviada' as const,
        prioridad: 'urgente' as const,
        fechaContacto: '2024-11-15T16:30:00.000Z',
        asignadoA: 'Carolina Vega',
        notas: 'Propuesta enviada el 25/11. Monto estimado: USD 850,000. Espera decision de directorio en enero.',
        paginaOrigen: '/soluciones/seguridad-funcional-sis',
      },
    ];

    for (const contacto of contactosData) {
      await strapi.documents('api::contacto.contacto').create({
        data: contacto,
      });
    }

    // =============================================
    // 7. SEED CONFIGURACION GLOBAL
    // =============================================
    await strapi.documents('api::configuracion-global.configuracion-global').create({
      data: {
        nombreEmpresa: 'Andexport',
        slogan: 'Soluciones tecnologicas para la industria',
        contactoPrincipal: {
          telefono: '+56 2 2345 6700',
          email: 'contacto@andexport.cl',
          direccion: 'Av. Industrial 1234, Pudahuel, Santiago, Chile',
          horario: 'Lunes a Viernes, 08:30 - 18:00',
        },
        redesSociales: [
          { plataforma: 'linkedin', url: 'https://linkedin.com/company/andexport' },
          { plataforma: 'youtube', url: 'https://youtube.com/@andexport' },
        ],
        textoFooter: 'Andexport - Mas de 36 anios entregando soluciones tecnologicas para la industria. Todos los derechos reservados.',
        seoGlobal: {
          metaTitulo: 'Andexport - Soluciones Tecnologicas Industriales',
          metaDescripcion: 'Andexport es lider en soluciones de instrumentacion, automatizacion y control de procesos para la industria en Chile. Mas de 36 anios de experiencia.',
        },
      },
    });

    // =============================================
    // 8. SEED PAGINA NOSOTROS
    // =============================================
    await strapi.documents('api::pagina-nosotros.pagina-nosotros').create({
      data: {
        tituloHero: 'Sobre Andexport',
        subtituloHero: 'Mas de 36 anios impulsando la industria con tecnologia de clase mundial',
        tituloHistoria: 'Nuestra Historia',
        contenidoHistoria: 'Fundada en 1988, Andexport nacio con la vision de acercar la mejor tecnologia industrial a las empresas chilenas. Lo que comenzo como una pequena oficina de representaciones se ha convertido en un referente en soluciones de instrumentacion, automatizacion y control de procesos.\n\nA lo largo de mas de tres decadas, hemos acompanado a nuestros clientes en sus desafios mas complejos, desde la modernizacion de plantas mineras hasta la automatizacion de lineas de produccion alimentaria.\n\nHoy, con un equipo de mas de 80 profesionales y presencia en todo Chile, seguimos comprometidos con nuestra mision original: entregar soluciones que generan valor real para la industria.',
        anioFundacion: 1988,
        estadisticasEmpresa: [
          { numero: '36', etiqueta: 'Anios de experiencia', sufijo: '+' },
          { numero: '500', etiqueta: 'Proyectos completados', sufijo: '+' },
          { numero: '80', etiqueta: 'Profesionales', sufijo: '+' },
          { numero: '150', etiqueta: 'Clientes activos', sufijo: '+' },
        ],
        mision: 'Proveer soluciones tecnologicas integrales que optimicen los procesos industriales de nuestros clientes, generando valor sostenible a traves de la innovacion, el conocimiento tecnico y el compromiso con la excelencia.',
        vision: 'Ser el socio tecnologico preferido de la industria en Latinoamerica, reconocidos por nuestra capacidad de resolver los desafios mas complejos con soluciones de clase mundial.',
        valores: ['Excelencia Tecnica', 'Compromiso con el Cliente', 'Innovacion', 'Integridad', 'Trabajo en Equipo', 'Seguridad'],
        ctaContacto: {
          titulo: 'Conversemos sobre su proximo proyecto',
          descripcion: 'Nuestro equipo de especialistas esta listo para entender sus desafios y disenar la solucion ideal.',
          textoBoton: 'Contactar a un Especialista',
          urlBoton: '/contacto',
          variante: 'primario',
        },
        seo: {
          metaTitulo: 'Sobre Andexport - Mas de 36 anios de experiencia industrial',
          metaDescripcion: 'Conozca la historia, mision y equipo de Andexport. Somos lideres en soluciones de instrumentacion y automatizacion industrial en Chile.',
        },
      },
      status: 'published',
    });

    // =============================================
    // 9. SEED HOMEPAGE
    // =============================================
    await strapi.documents('api::homepage.homepage').create({
      data: {
        hero: {
          titulo: 'Soluciones Tecnologicas para la Industria',
          subtitulo: 'Mas de 36 anios disenando e implementando soluciones de instrumentacion, automatizacion y control que transforman la operacion industrial.',
          cta: {
            titulo: 'CTA Hero',
            descripcion: '',
            textoBoton: 'Conocer Soluciones',
            urlBoton: '/soluciones',
            variante: 'primario',
          },
        },
        tituloSoluciones: 'Nuestras Soluciones',
        subtituloSoluciones: 'Ofrecemos un catalogo completo de soluciones tecnologicas adaptadas a las necesidades de cada industria.',
        tituloIndustrias: 'Industrias que Atendemos',
        estadisticas: [
          { numero: '36', etiqueta: 'Anios de experiencia', sufijo: '+' },
          { numero: '500', etiqueta: 'Proyectos realizados', sufijo: '+' },
          { numero: '98', etiqueta: 'Satisfaccion de clientes', sufijo: '%' },
          { numero: '24/7', etiqueta: 'Soporte tecnico', sufijo: '' },
        ],
        tituloProyectos: 'Proyectos Destacados',
        ctaPrincipal: {
          titulo: 'Tiene un desafio industrial?',
          descripcion: 'Nuestro equipo de ingenieros esta listo para disenar la solucion que su operacion necesita.',
          textoBoton: 'Solicitar Cotizacion',
          urlBoton: '/contacto',
          variante: 'primario',
        },
        tituloNovedades: 'Ultimas Novedades',
        seo: {
          metaTitulo: 'Andexport - Soluciones de Instrumentacion y Automatizacion Industrial',
          metaDescripcion: 'Andexport es lider en soluciones de instrumentacion, automatizacion y control de procesos industriales en Chile. Mas de 36 anios de experiencia.',
        },
      },
      status: 'published',
    });

    // =============================================
    // 10. CREATE ADMIN ROLES
    // =============================================
    try {
      const roleService = strapi.service('admin::role');

      // Create Marketing role
      const marketingRole = await (roleService as any).create({
        name: 'Marketing',
        code: 'strapi-marketing',
        description: 'Puede gestionar blog, novedades, homepage y SEO. No tiene acceso a leads ni configuracion del sistema.',
      });

      // Create Comercial role
      const comercialRole = await (roleService as any).create({
        name: 'Comercial',
        code: 'strapi-comercial',
        description: 'Puede ver y gestionar leads/contactos y proyectos. No puede modificar contenido de paginas.',
      });

      // Create Editor de Contenido role
      const editorRole = await (roleService as any).create({
        name: 'Editor de Contenido',
        code: 'strapi-editor-contenido',
        description: 'Puede crear y editar contenido pero no puede publicar ni gestionar leads.',
      });

      // Assign permissions to Marketing role
      if (marketingRole) {
        await (roleService as any).assignPermissions(marketingRole.id, [
          { action: 'plugin::content-manager.explorer.create', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.delete', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.publish', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::homepage.homepage' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::homepage.homepage' },
          { action: 'plugin::content-manager.explorer.publish', subject: 'api::homepage.homepage' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::pagina-nosotros.pagina-nosotros' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::pagina-nosotros.pagina-nosotros' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::solucion.solucion' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::industria.industria' },
          { action: 'plugin::content-manager.explorer.create', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::content-manager.explorer.publish', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::upload.read' },
          { action: 'plugin::upload.assets.create' },
          { action: 'plugin::upload.assets.update' },
        ]);
      }

      // Assign permissions to Comercial role
      if (comercialRole) {
        await (roleService as any).assignPermissions(comercialRole.id, [
          { action: 'plugin::content-manager.explorer.create', subject: 'api::contacto.contacto' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::contacto.contacto' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::contacto.contacto' },
          { action: 'plugin::content-manager.explorer.delete', subject: 'api::contacto.contacto' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::proyecto.proyecto' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::proyecto.proyecto' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::solucion.solucion' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::industria.industria' },
          { action: 'plugin::upload.read' },
        ]);
      }

      // Assign permissions to Editor role
      if (editorRole) {
        await (roleService as any).assignPermissions(editorRole.id, [
          { action: 'plugin::content-manager.explorer.create', subject: 'api::solucion.solucion' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::solucion.solucion' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::solucion.solucion' },
          { action: 'plugin::content-manager.explorer.create', subject: 'api::industria.industria' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::industria.industria' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::industria.industria' },
          { action: 'plugin::content-manager.explorer.create', subject: 'api::proyecto.proyecto' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::proyecto.proyecto' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::proyecto.proyecto' },
          { action: 'plugin::content-manager.explorer.create', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::novedad.novedad' },
          { action: 'plugin::content-manager.explorer.create', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::miembro-equipo.miembro-equipo' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::homepage.homepage' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::homepage.homepage' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::pagina-nosotros.pagina-nosotros' },
          { action: 'plugin::content-manager.explorer.update', subject: 'api::pagina-nosotros.pagina-nosotros' },
          { action: 'plugin::content-manager.explorer.read', subject: 'api::configuracion-global.configuracion-global' },
          { action: 'plugin::upload.read' },
          { action: 'plugin::upload.assets.create' },
          { action: 'plugin::upload.assets.update' },
        ]);
      }

      strapi.log.info('Admin roles created: Marketing, Comercial, Editor');
    } catch (error: any) {
      strapi.log.warn('Could not create admin roles (may already exist): ' + error.message);
    }

    strapi.log.info('Andexport demo data seeding complete!');
  },
};
