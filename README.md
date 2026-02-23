# Andexport CMS - Guia de Uso

Panel de administracion de contenidos para Andexport, construido con Strapi v5.

---

## Inicio Rapido

### Requisitos
- Node.js v20 o v22
- npm

### Instalacion
```bash
npm install
npm rebuild better-sqlite3
```

### Iniciar el servidor
```bash
npm run develop
```
El panel se abre en: **http://localhost:1337/admin**

La primera vez se solicita crear un usuario administrador (nombre, email, contrasena).

### Otros comandos
```bash
npm run build    # Compilar el panel de admin
npm run start    # Iniciar en modo produccion (sin hot reload)
```

---

## Navegacion del Panel

El menu lateral izquierdo contiene:

| Icono | Seccion | Descripcion |
|---|---|---|
| Pluma | **Content Manager** | Gestion de todo el contenido del sitio |
| Monitor | Content-Type Builder | Estructura de los content types (solo admin tecnico) |
| Cuadricula | **Media Library** | Imagenes, PDFs y archivos |
| Engranaje | **Settings** | Roles, permisos y configuracion |

Las secciones principales para el uso diario son **Content Manager**, **Media Library** y **Settings**.

---

## Content Manager - Tipos de Contenido

### Colecciones (multiples entradas)

#### Soluciones
Catalogo de soluciones tecnicas de Andexport.

**Campos principales:**
- Nombre y slug (se genera automaticamente)
- Descripcion corta (para listados) y descripcion completa
- Linea de negocio: instrumentacion, automatizacion, control de procesos, seguridad industrial, energia, medioambiente
- Imagen principal y galeria de imagenes
- Ficha tecnica (PDF adjunto)
- Caracteristicas tecnicas y aplicaciones
- Destacado (si/no) y orden de aparicion
- Relacion con Industrias (muchas a muchas)
- SEO (titulo, descripcion, imagen para redes)

#### Industrias
Industrias a las que Andexport provee soluciones.

**Campos principales:**
- Nombre y slug
- Descripcion y extracto
- Icono e imagen principal
- Orden y estado activa/inactiva
- Relacion con Soluciones y Proyectos
- SEO

#### Proyectos
Casos de exito y proyectos realizados.

**Campos principales:**
- Titulo y slug
- Extracto y descripcion completa
- Cliente, ubicacion y anio
- Estructura narrativa: Desafio > Solucion Aplicada > Resultados
- Imagen principal y galeria
- Estadisticas destacadas (ej: "40% reduccion en paradas")
- Relacion con Industria y Solucion principal
- SEO

#### Contactos / Leads
Oportunidades comerciales capturadas desde los formularios del sitio. **No tiene sistema de borradores** — cada entrada se crea directamente.

**Campos principales:**
- Nombre completo, email, telefono
- Empresa y cargo
- Mensaje del formulario
- Origen: formulario-contacto, formulario-cotizacion, landing-solucion, landing-industria, descarga-ficha-tecnica, evento, referido, otro
- Estado del pipeline: nuevo > contactado > en-seguimiento > calificado > propuesta-enviada > ganado / perdido / descartado
- Prioridad: baja, media, alta, urgente
- Asignado a (nombre del responsable comercial)
- Notas internas de seguimiento
- Industria y solucion de interes (relaciones)
- Pagina de origen (desde donde envio el formulario)

**Flujo de trabajo:**
1. Un lead llega con estado "nuevo"
2. El equipo comercial lo revisa y cambia a "contactado"
3. Se asigna a un responsable y se agregan notas
4. Se va moviendo por el pipeline hasta "ganado" o "perdido"

#### Equipo
Miembros del equipo Andexport.

**Campos principales:**
- Nombre, cargo, departamento
- Departamentos: direccion, comercial, ingenieria, operaciones, marketing, administracion
- Bio, foto, email, LinkedIn
- Orden y visibilidad

#### Novedades
Blog y noticias de la empresa.

**Campos principales:**
- Titulo, slug, extracto, contenido
- Imagen principal
- Categoria: noticia, articulo-tecnico, caso-de-estudio, evento, comunicado
- Autor (relacion con Equipo)
- Fecha de publicacion
- Destacado
- Industrias y soluciones relacionadas
- SEO

---

### Paginas Unicas (una sola entrada)

#### Pagina de Inicio
Contenido de la homepage del sitio.

**Secciones editables:**
- Hero principal (titulo, subtitulo, imagen, boton CTA)
- Seccion de soluciones (titulo, subtitulo, soluciones destacadas)
- Seccion de industrias (titulo)
- Estadisticas (numeros destacados como "36+ anios", "500+ proyectos")
- Seccion de proyectos (titulo, proyectos destacados)
- CTA principal (titulo, descripcion, boton)
- Seccion de novedades (titulo)
- SEO

#### Pagina Nosotros
Seccion institucional de la empresa.

**Secciones editables:**
- Hero (titulo, subtitulo, imagen)
- Historia de la empresa (titulo, contenido, anio de fundacion)
- Estadisticas de la empresa (numeros destacados)
- Mision y vision
- Valores (lista)
- Certificaciones (imagenes con texto)
- CTA de contacto
- SEO

#### Configuracion Global
Datos globales que se usan en todo el sitio.

**Campos:**
- Nombre de la empresa y slogan
- Logos (principal y blanco) y favicon
- Contacto principal (telefono, email, direccion, horario)
- Redes sociales (LinkedIn, YouTube, etc.)
- Texto del footer
- Aviso legal y politica de privacidad
- SEO global

---

## Sistema de Borradores (Draft & Publish)

La mayoria de los content types usan el sistema de borradores:

- **Draft (borrador):** El contenido se guarda pero no es visible en la API
- **Published (publicado):** El contenido esta activo y disponible en la API

**Flujo:**
1. Crear o editar una entrada
2. Click en **"Save"** → se guarda como borrador
3. Click en **"Publish"** → se publica
4. Se puede **"Unpublish"** en cualquier momento para retirar contenido sin eliminarlo

**Excepcion:** Contactos/Leads y Configuracion Global no usan borradores (se publican directamente).

---

## Media Library

Accesible desde el icono de cuadricula en el menu lateral.

- Subir imagenes (JPG, PNG, WebP, SVG)
- Subir documentos (PDF, fichas tecnicas)
- Organizar por carpetas
- Las imagenes se pueden reutilizar en cualquier content type
- Vista previa de imagenes directamente en el panel

---

## Roles y Permisos

Acceder desde **Settings > Administration panel > Roles**.

### Super Admin
Acceso completo a todo el sistema. Puede crear usuarios, modificar roles, editar cualquier contenido y publicar.

### Marketing
**Puede:**
- Crear, editar, eliminar y publicar Novedades
- Editar y publicar Pagina de Inicio y Pagina Nosotros
- Gestionar Equipo (crear, editar, publicar)
- Ver Soluciones e Industrias (solo lectura)
- Subir y editar archivos en Media Library

**No puede:**
- Acceder a Contactos/Leads
- Modificar Configuracion Global
- Crear/editar Soluciones o Industrias

### Comercial
**Puede:**
- Crear, ver, editar y eliminar Contactos/Leads
- Ver y editar Proyectos
- Ver Soluciones e Industrias (solo lectura)
- Ver archivos en Media Library

**No puede:**
- Modificar Novedades, Homepage, Nosotros
- Publicar contenido
- Gestionar Equipo

### Editor de Contenido
**Puede:**
- Crear y editar Soluciones, Industrias, Proyectos, Novedades, Equipo
- Editar Homepage y Nosotros
- Ver Configuracion Global
- Subir archivos en Media Library

**No puede:**
- Publicar contenido (requiere aprobacion de Marketing o Admin)
- Acceder a Contactos/Leads
- Eliminar contenido

---

## Crear un Nuevo Usuario

1. Ir a **Settings > Administration panel > Users**
2. Click en **"Invite new user"**
3. Ingresar nombre, apellido y email
4. Seleccionar el rol correspondiente (Marketing, Comercial, Editor de Contenido)
5. El usuario recibira un email para configurar su contrasena

---

## Componentes Reutilizables

Algunos campos se repiten en varios content types. Estos son "componentes" que se completan de la misma forma donde aparezcan:

### SEO
Aparece en: Soluciones, Industrias, Proyectos, Novedades, Homepage, Nosotros, Config Global

- **Meta titulo:** Titulo para Google (max 70 caracteres)
- **Meta descripcion:** Descripcion para Google (max 160 caracteres)
- **Meta imagen:** Imagen para cuando se comparte en redes sociales
- **Palabras clave:** Opcional
- **URL canonica:** Opcional

### Bloque CTA (Llamada a la Accion)
Aparece en: Homepage, Nosotros

- **Titulo y descripcion**
- **Texto del boton** y **URL del boton**
- **Variante:** primario, secundario, outline

### Estadistica
Aparece en: Proyectos, Homepage, Nosotros

- **Numero:** El valor destacado (ej: "40")
- **Etiqueta:** La descripcion (ej: "Reduccion en paradas")
- **Sufijo:** Opcional (ej: "%", "+")

---

## Estructura de la API REST

Cada content type genera endpoints automaticamente:

| Endpoint | Descripcion |
|---|---|
| `GET /api/soluciones` | Listar soluciones |
| `GET /api/soluciones/:id` | Detalle de una solucion |
| `GET /api/industrias` | Listar industrias |
| `GET /api/proyectos` | Listar proyectos |
| `GET /api/novedades` | Listar novedades |
| `GET /api/miembros-equipo` | Listar equipo |
| `GET /api/contactos` | Listar leads |
| `GET /api/homepage` | Datos de la homepage |
| `GET /api/pagina-nosotros` | Datos de la pagina nosotros |
| `GET /api/configuracion-global` | Datos globales |

**Para incluir relaciones en la respuesta:**
```
GET /api/soluciones?populate=*
GET /api/proyectos?populate=industria,solucionPrincipal,estadisticas
```

**Nota:** Los endpoints publicos solo funcionan si se habilitan los permisos en Settings > Users & Permissions > Roles > Public.

---

## Datos de Ejemplo Precargados

El demo incluye datos de ejemplo que se cargan automaticamente la primera vez:

- 5 Industrias (Mineria, Petroleo y Gas, Energia, Alimentos, Agua)
- 5 Soluciones (Instrumentacion, DCS, Automatizacion, Seguridad, Analisis de Gases)
- 3 Proyectos con estadisticas reales
- 5 Miembros de equipo
- 3 Novedades (noticia, articulo tecnico, caso de estudio)
- 5 Leads en distintos estados del pipeline
- Homepage y Pagina Nosotros con contenido completo
- Configuracion Global con datos de contacto

---

## Soporte Tecnico

**Documentacion oficial de Strapi:** https://docs.strapi.io
