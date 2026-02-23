import type { Schema, Struct } from '@strapi/strapi';

export interface BloquesCta extends Struct.ComponentSchema {
  collectionName: 'components_bloques_cta';
  info: {
    description: 'Llamada a la accion reutilizable';
    displayName: 'Bloque CTA';
    icon: 'cursor';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    textoBoton: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Contactar'>;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
    urlBoton: Schema.Attribute.String & Schema.Attribute.Required;
    variante: Schema.Attribute.Enumeration<
      ['primario', 'secundario', 'outline']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primario'>;
  };
}

export interface BloquesEstadistica extends Struct.ComponentSchema {
  collectionName: 'components_bloques_estadistica';
  info: {
    description: 'Numero destacado con etiqueta';
    displayName: 'Estadistica';
    icon: 'chartBubble';
  };
  attributes: {
    etiqueta: Schema.Attribute.String & Schema.Attribute.Required;
    numero: Schema.Attribute.String & Schema.Attribute.Required;
    sufijo: Schema.Attribute.String;
  };
}

export interface BloquesHero extends Struct.ComponentSchema {
  collectionName: 'components_bloques_hero';
  info: {
    description: 'Seccion hero principal';
    displayName: 'Hero';
    icon: 'landscape';
  };
  attributes: {
    cta: Schema.Attribute.Component<'bloques.cta', false>;
    imagenFondo: Schema.Attribute.Media<'images'>;
    subtitulo: Schema.Attribute.Text;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BloquesPreguntaFrecuente extends Struct.ComponentSchema {
  collectionName: 'components_bloques_pregunta_frecuente';
  info: {
    description: 'Pregunta y respuesta';
    displayName: 'Pregunta Frecuente';
    icon: 'question';
  };
  attributes: {
    pregunta: Schema.Attribute.String & Schema.Attribute.Required;
    respuesta: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface CompartidoEnlaceSocial extends Struct.ComponentSchema {
  collectionName: 'components_compartido_enlace_social';
  info: {
    description: 'Red social con URL';
    displayName: 'Enlace Social';
    icon: 'earth';
  };
  attributes: {
    plataforma: Schema.Attribute.Enumeration<
      ['linkedin', 'facebook', 'instagram', 'twitter', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompartidoImagenConTexto extends Struct.ComponentSchema {
  collectionName: 'components_compartido_imagen_con_texto';
  info: {
    description: 'Imagen con titulo y descripcion opcional';
    displayName: 'Imagen con Texto';
    icon: 'picture';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    imagen: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    titulo: Schema.Attribute.String;
  };
}

export interface CompartidoInfoContacto extends Struct.ComponentSchema {
  collectionName: 'components_compartido_info_contacto';
  info: {
    description: 'Datos de contacto reutilizables';
    displayName: 'Info de Contacto';
    icon: 'phone';
  };
  attributes: {
    direccion: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    horario: Schema.Attribute.String;
    telefono: Schema.Attribute.String;
  };
}

export interface CompartidoSeo extends Struct.ComponentSchema {
  collectionName: 'components_compartido_seo';
  info: {
    description: 'Metadatos SEO para cualquier pagina';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescripcion: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImagen: Schema.Attribute.Media<'images'>;
    metaTitulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    palabrasClave: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'bloques.cta': BloquesCta;
      'bloques.estadistica': BloquesEstadistica;
      'bloques.hero': BloquesHero;
      'bloques.pregunta-frecuente': BloquesPreguntaFrecuente;
      'compartido.enlace-social': CompartidoEnlaceSocial;
      'compartido.imagen-con-texto': CompartidoImagenConTexto;
      'compartido.info-contacto': CompartidoInfoContacto;
      'compartido.seo': CompartidoSeo;
    }
  }
}
