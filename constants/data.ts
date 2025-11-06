
import type { Category } from '../types';

export const TOTAL_ITEMS = 50;
export const REQUIRED_ITEMS = 41;

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Categoría 1: Aspectos Pedagógicos',
    icon: '📝',
    criteria: [
      {
        name: '1.1 Metodología didáctica',
        items: [
          { text: 'Promueve aprendizaje competencial con metodologías activas', description: 'El recurso promueve el aprendizaje competencial haciendo uso de metodologías activas.' },
          { text: 'Integra los saberes previos del alumnado', description: 'Los nuevos aprendizajes se integran de manera comprensiva y relevante con los saberes previos del alumnado.' },
          { text: 'Conecta con la realidad y motivación del alumnado', description: 'Conecta los intereses y motivación del alumnado con propuestas planteadas en un contexto, situación o experiencia del mundo real.' },
          { text: 'Desarrolla aprendizaje cooperativo y colaboración', description: 'Desarrolla el Aprendizaje Cooperativo y estimula dinámicas de colaboración entre el alumnado.' },
          { text: 'Participación activa del alumnado como protagonista', description: 'Promueve la participación creativa y activa del alumnado, de manera que este sea el protagonista de su proceso de enseñanza-aprendizaje.' },
          { text: 'Evaluación formativa con retroalimentación efectiva', description: 'Apuesta por una evaluación formativa en la que se incluyen opciones para una retroalimentación efectiva.' },
          { text: 'Motiva la reflexión sobre el proceso (metacognición)', description: 'Motiva al alumnado a reflexionar sobre su proceso de aprendizaje.' },
          { text: 'Integra herramientas digitales seguras', description: 'Integra herramientas digitales seguras y respetuosas con la protección de datos, favoreciendo el desarrollo de la competencia digital del alumnado y mejorando la calidad del resto de aprendizajes.' },
          { text: 'Ofrece recursos según Diseño Universal de Aprendizaje (DUA)', description: 'Ofrece recursos y enfoques que respetan diversos estilos y necesidades de aprendizaje según el DUA.' },
        ],
      },
      {
        name: '1.2 Contenido incluido',
        items: [
          { text: 'Contenidos bien organizados con secuenciación lógica', description: 'Los contenidos están bien organizados, con un hilo conductor lógico que facilita su comprensión.' },
          { text: 'Incluye todos los recursos necesarios', description: 'Incluye todos los recursos necesarios para el aprendizaje: instrucciones, plantillas, enlaces, instrumentos de evaluación.' },
          { text: 'Contenidos correctos, actualizados y de fuentes fiables', description: 'Los contenidos son correctos, objetivos, actualizados y de fuentes fiables.' },
          { text: 'Incluye ODS y educación en valores de forma transversal', description: 'Se incluyen dichos contenidos de forma transversal.' },
          { text: 'Promueve equidad y elimina estereotipos', description: 'Los textos, imágenes y el resto de los contenidos promueven la equidad y la eliminación de estereotipos y sesgos de cualquier tipo.' },
        ],
      },
      {
        name: '1.3 Tareas contenidas',
        items: [
          { text: 'Actividades variadas en agrupamiento, estilos y finalidad', description: 'Incluye actividades variadas en agrupamiento, estilos y finalidad.' },
          { text: 'Favorece el pensamiento crítico', description: 'Plantea actividades que favorecen el desarrollo del pensamiento crítico: reflexiones, debates, resolución de problemas, análisis de casos...' },
          { text: 'Establece claramente cómo, quiénes y cuándo se evalúa', description: 'Para cada tarea evaluable se establece de forma clara cómo, quiénes y cuándo se va a evaluar.' },
          { text: 'Actividad inicial para motivar y activar conocimientos previos', description: 'Incorpora una actividad inicial para motivar, reflexionar y activar conocimientos previos.' },
          { text: 'Coherencia entre competencias y actividades', description: 'Existe coherencia entre competencias y actividades y están orientadas a lograr el producto final(*) del proyecto.' },
          { text: 'Tareas avanzan en complejidad creciente', description: 'Las tareas avanzan en complejidad creciente desde la situación inicial del alumnado hacia el producto final(*).' },
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
          { text: 'Título callativo, representativo y contextualizado', description: 'El título es, en la medida de lo posible, llamativo y representativo del contenido del REA, contextualizado en una situación real y es el nombre completo del recurso.' },
          { text: 'Incluye imagen sugerente relacionada', description: 'Incluye una imagen sugerente y relacionada con el contenido del recurso.' },
          { text: 'Explica propósito, objetivos, materia, curso y producto final', description: 'Explica brevemente el propósito, los objetivos, la materia, el curso y el producto final esperado.' },
        ],
      },
      {
        name: '2.2 Formato y estilo',
        items: [
          { text: 'Diseño visual unificado en colores, tipografía y estilos', description: 'Presenta un diseño visual unificado en colores, tipografía y estilos.' },
          { text: 'Elementos gráficos relevantes con disposición limpia', description: 'Los elementos gráficos son relevantes y presentan una disposición limpia con coherencia gráfica.' },
          { text: 'Lenguaje claro, sencillo y adaptado', description: 'Se utiliza un lenguaje claro, con redacción sencilla, gramaticalmente correcta y adaptada al público objetivo.' },
        ],
      },
      {
        name: '2.3 Guía didáctica',
        items: [
          { text: 'Información básica (título, curso, materia, descripción)', description: 'Incluye título, curso, materia o área, breve descripción, tareas, agrupamientos y número de sesiones.' },
          { text: 'Especifica la metodología empleada', description: 'Incluye la metodología que se emplea en el recurso.' },
          { text: 'Identifica competencias, saberes y criterios de evaluación', description: 'Se identifican las competencias clave y específicas, los saberes y los criterios de evaluación asociados.' },
          { text: 'Incluye estrategia de evaluación y seguimiento', description: 'Se incluye la estrategia de evaluación y seguimiento al alumnado, así como los actores que participan en la misma.' },
        ],
      },
      {
        name: '2.4 Accesibilidad',
        items: [
          { text: 'Usa formato de encabezados para jerarquizar', description: 'Se usa el formato de encabezados de la herramienta de autor para jerarquizar el contenido.' },
          { text: 'Hiperenlaces con título claro', description: 'Los hiperenlaces tienen un título claro y se abren en ventana nueva.' },
          { text: 'Texto alternativo en las imágenes', description: 'Se incluye texto alternativo (título y descripción) en las imágenes.' },
          { text: 'Subtítulos en vídeos', description: 'Se añaden subtítulos al contenido en formato vídeo.' },
          { text: 'Suficiente contraste entre elementos', description: 'Existe suficiente contraste entre texto, imágenes y fondo para facilitar la lectura.' },
          { text: 'Fuentes sans serif legibles', description: 'Se utilizan fuentes “sans serif" legibles y tamaño e interlineado adecuados.' },
          { text: 'Navegación accesible', description: 'Presenta una navegación accesible.' },
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
          { text: 'Actividades interactivas que involucran al alumnado', description: 'Incorpora actividades interactivas diseñadas para involucrar activamente al alumnado.' },
          { text: 'Interfaz intuitiva que facilita la interacción', description: 'Presenta una interfaz intuitiva que facilita la interacción y el acceso al contenido.' },
          { text: 'Vídeos, gráficos y animaciones interactivas', description: 'Incorpora vídeos, gráficos y animaciones interactivas para enriquecer la experiencia.' },
        ],
      },
      {
        name: '3.2 Requisitos técnicos',
        items: [
          { text: 'Funcionamiento estable sin fallos técnicos', description: 'Presenta un funcionamiento estable sin fallos técnicos durante su uso.' },
          { text: 'Enlaces incluidos funcionan correctamente', description: 'Los enlaces incluidos funcionan correctamente.' },
          { text: 'Facilita la descarga del recurso y documentos', description: 'Facilita la descarga del recurso y de los documentos incluidos en él para su edición.' },
          { text: 'Es exportable a formatos estándar', description: 'Es fácilmente exportable a formatos estándar (incluido en eXeLearning).' },
          { text: 'Accesible desde dispositivos móviles, tabletas y ordenadores', description: 'Es posible acceder al recurso desde dispositivos móviles, tabletas y ordenadores (incluido en eXeLearning).' },
          { text: 'Permite añadir metadatos para catalogación', description: 'Permite añadir metadatos para facilitar la descripción y catalogación del recurso (incluido en eXeLearning).' },
        ],
      },
      {
        name: '3.3 Licencias y derechos',
        items: [
          { text: 'Usa licencias abiertas (CC-BY, CC BY-SA, CC BY-NC, CC BY-NC-SA)', description: 'El recurso y su contenido usan licencias CC-BY, CC BY-SA, CC BY-NC, CC BY-NC-SA, siendo más abiertas y recomendables las dos primeras.' },
          { text: 'Coherencia entre licencia del recurso y elementos contenidos', description: 'Existe coherencia entre la licencia del recurso y la de los elementos que contiene, en la medida de lo posible.' },
          { text: 'Materiales de terceros identificados con autoría, fuente y licencia', description: 'Los materiales de terceros se identifican y atribuyen convenientemente incluyendo autoría, fuente y licencia. Los materiales generados con herramientas de IA se identifican con la mayor transparencia posible de acuerdo con los términos de uso de la misma y la normativa vigente en el momento de uso.' },
          { text: 'Herramientas libres', description: 'Se utilizan preferentemente plataformas y software de código abierto para evitar restricciones.'}
        ],
      },
    ],
  },
];