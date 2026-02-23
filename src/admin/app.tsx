import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['es'],
    tutorials: false,
    notifications: {
      releases: false,
    },
    theme: {
      light: {
        colors: {
          primary100: '#E8EDF5',
          primary200: '#B8C8E0',
          primary500: '#1B3A5C',
          primary600: '#142D4A',
          primary700: '#0D2038',
          buttonPrimary500: '#1B3A5C',
          buttonPrimary600: '#142D4A',
          secondary100: '#EDF1F5',
          secondary200: '#C4D1DE',
          secondary500: '#4A6A8A',
          secondary600: '#3B5570',
          secondary700: '#2C4056',
          danger100: '#FCECEA',
          danger200: '#F5C0B8',
          danger500: '#D02B20',
          danger600: '#B72418',
          danger700: '#9E1D11',
          success100: '#EAFBE7',
          success200: '#C6F0C2',
          success500: '#328048',
          success600: '#2A6B3C',
          success700: '#226030',
        },
      },
    },
    translations: {
      es: {
        'app.components.LeftMenu.navbrand.title': 'Andexport CMS',
        'app.components.LeftMenu.navbrand.workplace': 'Panel de Administracion',
      },
    },
  },
  bootstrap(app: StrapiApp) {},
};
