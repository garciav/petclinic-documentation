import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PetClinic Docs',
  tagline: 'Documentación viva generada por IA',
  favicon: 'img/favicon.ico',

  // --- CONFIGURACIÓN DE DESPLIEGUE ---
  // Reemplaza 'tu-usuario' por tu nombre de GitHub
  url: 'https://garciav.github.io', 
  // El nombre exacto de tu REPO 2 (el de documentación)
  baseUrl: '/petclinic-documentation/', 

  // GitHub Pages usa estos campos para saber dónde desplegar
  organizationName: 'garciav', 
  projectName: 'petclinic-documentation', 
  deploymentBranch: 'gh-pages',
  trailingSlash: false, // Recomendado para GitHub Pages

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // --- INTEGRACIÓN CON MERMAID (Para diagramas de Copilot) ---
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Esta es la ruta donde tu Action de GitHub guardará los .md
          editUrl: 'https://github.com/garciav/petclinic-documentation/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Imagen para redes sociales
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'PetClinic IA Docs',
      logo: {
        alt: 'PetClinic Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Arquitectura',
        },
        {
          href: 'https://github.com/garciav/spring-petclinic',
          label: 'Ir al Código (Repo 1)',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Añade java aquí para que el código de Spring Boot se vea bien
      additionalLanguages: ['java', 'groovy'], 
    },
  } satisfies Preset.ThemeConfig,
};

export default config;