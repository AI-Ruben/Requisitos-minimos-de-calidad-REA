
import type { Category } from '../types';

export const TOTAL_ITEMS = 49;
export const REQUIRED_ITEMS = 40;

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Categoría 1: Aspectos Pedagógicos',
    icon: '📝',
    criteria: [
      {
        name: '1.1 Metodología didáctica',
        items: [
          'Promueve aprendizaje competencial con metodologías activas',
          'Integra los saberes previos del alumnado',
          'Conecta con la realidad y motivación del alumnado',
          'Desarrolla aprendizaje cooperativo y colaboración',
          'Participación activa del alumnado como protagonista',
          'Evaluación formativa con retroalimentación efectiva',
          'Motiva la reflexión sobre el proceso (metacognición)',
          'Integra herramientas digitales seguras',
          'Ofrece recursos según Diseño Universal de Aprendizaje (DUA)',
        ],
      },
      {
        name: '1.2 Contenido incluido',
        items: [
          'Contenidos bien organizados con secuenciación lógica',
          'Incluye todos los recursos necesarios',
          'Contenidos correctos, actualizados y de fuentes fiables',
          'Incluye ODS y educación en valores de forma transversal',
          'Promueve equidad y elimina estereotipos',
        ],
      },
      {
        name: '1.3 Tareas contenidas',
        items: [
          'Actividades variadas en agrupamiento, estilos y finalidad',
          'Favorece el pensamiento crítico',
          'Establece claramente cómo, quiénes y cuándo se evalúa',
          'Actividad inicial para motivar y activar conocimientos previos',
          'Coherencia entre competencias y actividades',
          'Tareas avanzan en complejidad creciente',
        ],
      },
    ],
  },
  {
    id: 'cat2',
    name: 'Categoría 2: Aspectos de Diseño',
    icon: '🎨',
    criteria: [
      {
        name: '2.1 Presentación inicial',
        items: [
          'Título callativo, representativo y contextualizado',
          'Incluye imagen sugerente relacionada',
          'Explica propósito, objetivos, materia, curso y producto final',
        ],
      },
      {
        name: '2.2 Formato y estilo',
        items: [
          'Diseño visual unificado en colores, tipografía y estilos',
          'Elementos gráficos relevantes con disposición limpia',
          'Lenguaje claro, sencillo y adaptado',
        ],
      },
      {
        name: '2.3 Guía didáctica',
        items: [
          'Información básica (título, curso, materia, descripción)',
          'Especifica la metodología empleada',
          'Identifica competencias, saberes y criterios de evaluación',
          'Incluye estrategia de evaluación y seguimiento',
        ],
      },
      {
        name: '2.4 Accesibilidad',
        items: [
          'Usa formato de encabezados para jerarquizar',
          'Hiperenlaces con título claro',
          'Texto alternativo en las imágenes',
          'Subtítulos en vídeos',
          'Suficiente contraste entre elementos',
          'Fuentes sans serif legibles',
          'Navegación accesible',
        ],
      },
    ],
  },
  {
    id: 'cat3',
    name: 'Categoría 3: Aspectos Técnicos',
    icon: '⚙️',
    criteria: [
      {
        name: '3.1 Interactividad',
        items: [
          'Actividades interactivas que involucran al alumnado',
          'Interfaz intuitiva que facilita la interacción',
          'Vídeos, gráficos y animaciones interactivas',
        ],
      },
      {
        name: '3.2 Requisitos técnicos',
        items: [
          'Funcionamiento estable sin fallos técnicos',
          'Enlaces incluidos funcionan correctamente',
          'Facilita la descarga del recurso y documentos',
          'Es exportable a formatos estándar',
          'Accesible desde dispositivos móviles, tabletas y ordenadores',
          'Permite añadir metadatos para catalogación',
        ],
      },
      {
        name: '3.3 Licencias y derechos',
        items: [
          'Usa licencias abiertas (CC-BY, CC BY-SA, CC BY-NC, CC BY-NC-SA)',
          'Coherencia entre licencia del recurso y elementos contenidos',
          'Materiales de terceros identificados con autoría, fuente y licencia',
        ],
      },
    ],
  },
];
