import { CATEGORIES, TOOLS, getCategoryBySlug, getToolBySlug, type Category, type ContentSection, type FAQPair, type Tool, type UsageStep } from "./tools";
import type { Lang } from "../i18n/ui";

export const PUBLISHED_LOCALES: Exclude<Lang, "en">[] = ["es", "hi"];

export const LOCALIZED_TOOL_SLUGS = [
  "image-compressor",
  "json-formatter",
  "pdf-compressor",
  "pdf-merger",
  "word-counter",
  "qr-code-generator",
  "jwt-decoder",
  "epoch-converter",
  "word-cloud-generator",
  "grammar-checker",
  "csv-to-json",
  "json-to-csv",
  "unit-converter",
  "color-contrast-checker",
  "character-counter",
  "image-resizer",
  "image-cropper",
  "markdown-to-html",
  "password-generator",
  "regex-tester",
] as const;

export type LocalizedToolSlug = (typeof LOCALIZED_TOOL_SLUGS)[number];

type LocalizedToolCopy = {
  name: string;
  description: string;
  longDescription: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
};

type LocalizedCategoryCopy = Pick<Category, "name" | "description" | "metaTitle" | "metaDescription" | "seoContent">;

const categoryTranslations: Record<Exclude<Lang, "en">, Record<string, LocalizedCategoryCopy>> = {
  es: {
    "text-tools": {
      name: "Herramientas de texto",
      description: "Cuenta, analiza, revisa y transforma texto directamente en tu navegador.",
      metaTitle: "Herramientas de texto gratis online",
      metaDescription: "Usa herramientas de texto gratis para contar palabras, revisar gramática, crear nubes de palabras y limpiar contenido en tu navegador.",
      seoContent: "Estas herramientas de texto en español están pensadas para escritores, estudiantes, marketers y equipos de contenido que necesitan revisar, contar y transformar texto sin subir borradores privados a un servidor.",
    },
    "developer-tools": {
      name: "Herramientas para desarrolladores",
      description: "Formatea, valida y depura datos técnicos como JSON, JWT, Regex y CSV.",
      metaTitle: "Herramientas para desarrolladores gratis",
      metaDescription: "Formatea JSON, prueba regex, decodifica JWT y convierte datos con herramientas para desarrolladores que funcionan en el navegador.",
      seoContent: "Las herramientas para desarrolladores localizadas ayudan a limpiar payloads, validar tokens, probar expresiones regulares y transformar datos sin pegar código sensible en servicios remotos.",
    },
    calculators: {
      name: "Calculadoras",
      description: "Calculadoras online para tareas rápidas de porcentajes, fechas, propinas y decisiones cotidianas.",
      metaTitle: "Calculadoras online gratis",
      metaDescription: "Explora calculadoras online gratis para matemáticas rápidas y decisiones cotidianas desde el navegador.",
      seoContent: "La categoría de calculadoras se está localizando por fases. Mientras tanto, puedes acceder a la colección completa en inglés desde la página principal de herramientas.",
    },
    converters: {
      name: "Convertidores",
      description: "Convierte datos, unidades, markdown, imágenes y formatos sin subir archivos.",
      metaTitle: "Convertidores online gratis",
      metaDescription: "Usa convertidores online gratis para CSV, JSON, markdown, unidades e imágenes con procesamiento en tu navegador.",
      seoContent: "Los convertidores localizados cubren flujos comunes como CSV a JSON, JSON a CSV, markdown a HTML, unidades e imágenes. Son útiles para trabajo técnico, contenido y tareas rápidas.",
    },
    "pdf-tools": {
      name: "Herramientas PDF",
      description: "Comprime, une y procesa PDF localmente en tu navegador.",
      metaTitle: "Herramientas PDF gratis online",
      metaDescription: "Comprime y une PDF online gratis con herramientas privadas que funcionan en el navegador.",
      seoContent: "Las herramientas PDF localizadas priorizan privacidad: los archivos se procesan en el navegador cuando la herramienta lo permite, evitando subidas innecesarias.",
    },
    "seo-tools": {
      name: "Herramientas SEO",
      description: "Utilidades SEO para revisar contenido, metadatos, SERP y estructura de páginas.",
      metaTitle: "Herramientas SEO gratis online",
      metaDescription: "Usa herramientas SEO gratis para revisar metadatos, contenido y páginas desde el navegador.",
      seoContent: "Estas herramientas SEO ayudan a comprobar longitud de contenido, estructura y señales básicas antes de publicar páginas o campañas.",
    },
    "design-tools": {
      name: "Herramientas de diseño",
      description: "Comprueba contraste, colores y detalles visuales para interfaces accesibles.",
      metaTitle: "Herramientas de diseño gratis online",
      metaDescription: "Usa herramientas de diseño gratis para contraste WCAG, color y CSS desde el navegador.",
      seoContent: "Las herramientas de diseño localizadas ayudan a revisar contraste, accesibilidad y decisiones visuales sin instalar software adicional.",
    },
  },
  hi: {
    "text-tools": {
      name: "टेक्स्ट टूल्स",
      description: "टेक्स्ट गिनें, जांचें, सुधारें और बदलें, सीधे अपने ब्राउज़र में.",
      metaTitle: "मुफ्त ऑनलाइन टेक्स्ट टूल्स",
      metaDescription: "Word count, grammar, word cloud और text cleanup के लिए मुफ्त online text tools इस्तेमाल करें.",
      seoContent: "हिंदी locale में उपलब्ध text tools writers, students और content teams के लिए हैं जिन्हें private drafts upload किए बिना quick checks चाहिए.",
    },
    "developer-tools": {
      name: "डेवलपर टूल्स",
      description: "JSON, JWT, Regex और CSV जैसे technical data को format, validate और debug करें.",
      metaTitle: "मुफ्त डेवलपर टूल्स ऑनलाइन",
      metaDescription: "JSON format करें, regex test करें, JWT decode करें और browser-based developer tools से data convert करें.",
      seoContent: "Localized developer tools API payloads, tokens, regex patterns और data files पर काम करने में मदद करते हैं, बिना sensitive snippets remote servers पर भेजे.",
    },
    calculators: {
      name: "कैलकुलेटर",
      description: "Percentages, dates, tips और daily math के लिए quick online calculators.",
      metaTitle: "मुफ्त ऑनलाइन कैलकुलेटर",
      metaDescription: "Daily math और quick decisions के लिए मुफ्त online calculators explore करें.",
      seoContent: "Calculator category चरणों में localize हो रही है. तब तक पूरी English collection tools directory में उपलब्ध है.",
    },
    converters: {
      name: "कन्वर्टर",
      description: "Data, units, markdown, images और formats को बिना upload convert करें.",
      metaTitle: "मुफ्त ऑनलाइन कन्वर्टर",
      metaDescription: "CSV, JSON, markdown, units और images के लिए browser-based converters इस्तेमाल करें.",
      seoContent: "Localized converters common data और content workflows के लिए बनाए गए हैं, जैसे CSV to JSON, JSON to CSV, markdown to HTML और image resize.",
    },
    "pdf-tools": {
      name: "PDF टूल्स",
      description: "PDF compress, merge और process करें, जहां संभव हो browser में.",
      metaTitle: "मुफ्त PDF टूल्स ऑनलाइन",
      metaDescription: "PDF compress और merge करने के लिए मुफ्त browser-based PDF tools इस्तेमाल करें.",
      seoContent: "PDF tools privacy-first workflows के लिए बनाए गए हैं ताकि files unnecessary server upload के बिना process हो सकें.",
    },
    "seo-tools": {
      name: "SEO टूल्स",
      description: "Content, metadata, SERP और page structure की quick SEO checks करें.",
      metaTitle: "मुफ्त SEO टूल्स ऑनलाइन",
      metaDescription: "Metadata, content और page checks के लिए मुफ्त online SEO tools इस्तेमाल करें.",
      seoContent: "Localized SEO tools publishing से पहले basic page signals, content length और search snippets check करने में मदद करते हैं.",
    },
    "design-tools": {
      name: "डिजाइन टूल्स",
      description: "Accessible interfaces के लिए contrast, colors और CSS details check करें.",
      metaTitle: "मुफ्त डिजाइन टूल्स ऑनलाइन",
      metaDescription: "WCAG contrast, color और CSS checks के लिए मुफ्त design tools इस्तेमाल करें.",
      seoContent: "Localized design tools contrast और visual decisions को जल्दी review करने में मदद करते हैं.",
    },
  },
};

const toolTranslations: Record<Exclude<Lang, "en">, Record<LocalizedToolSlug, LocalizedToolCopy>> = {
  es: {
    "image-compressor": copy("Compresor de imágenes", "Comprime imágenes JPG, PNG y WebP en tu navegador sin subir archivos.", "Comprime imágenes online y reduce el peso de archivos para web, email o redes sociales. La vista previa y la descarga se generan localmente para mantener tus imágenes privadas.", "comprimir imagen online", "Comprimir imagen online gratis", "Comprime imágenes online gratis en tu navegador. Reduce JPG, PNG y WebP sin subir archivos ni crear una cuenta."),
    "json-formatter": copy("Formateador JSON", "Formatea, valida y limpia JSON para leer datos y APIs con más claridad.", "Pega JSON sin formato y obtén una versión legible con indentación, validación y errores claros. Ideal para APIs, logs y configuraciones privadas.", "formateador JSON online", "Formateador JSON online gratis", "Formatea y valida JSON online gratis. Limpia respuestas de API y datos técnicos directamente en tu navegador."),
    "pdf-compressor": copy("Compresor PDF", "Reduce el tamaño de archivos PDF directamente en tu navegador.", "Comprime PDF online para compartir documentos más livianos sin enviar tus archivos a un servidor. Funciona mejor con PDFs comunes y mantiene el flujo privado.", "comprimir PDF online", "Comprimir PDF online gratis", "Comprime PDF online gratis desde el navegador. Reduce el tamaño de documentos sin subirlos a un servidor."),
    "pdf-merger": copy("Unir PDF", "Une varios archivos PDF en un solo documento desde el navegador.", "Organiza PDFs, cambia el orden y crea un archivo combinado sin subir documentos privados. Útil para facturas, apuntes, formularios y entregas.", "unir PDF online", "Unir PDF online gratis", "Une PDFs online gratis en tu navegador. Combina documentos sin subir archivos ni registrarte."),
    "word-counter": copy("Contador de palabras", "Cuenta palabras, caracteres, frases y tiempo de lectura mientras escribes.", "Pega texto para medir longitud, densidad y lectura aproximada. Ideal para artículos, ensayos, posts y metadescripciones.", "contador de palabras online", "Contador de palabras online gratis", "Cuenta palabras y caracteres online gratis. Revisa texto en tiempo real sin subir contenido."),
    "qr-code-generator": copy("Generador de códigos QR", "Crea códigos QR para enlaces, texto y datos simples en segundos.", "Genera un código QR descargable para URLs, notas o información breve. Todo se crea en el navegador para un flujo rápido y privado.", "generador de QR online", "Generador de QR online gratis", "Crea códigos QR online gratis para URLs y texto. Descarga el resultado desde tu navegador."),
    "jwt-decoder": copy("Decodificador JWT", "Decodifica encabezado y payload de tokens JWT sin enviarlos a un servidor.", "Pega un JWT para inspeccionar claims, fechas y estructura. Es útil para depurar autenticación sin exponer tokens privados.", "decodificador JWT online", "Decodificador JWT online gratis", "Decodifica JWT online gratis en tu navegador. Inspecciona claims y payload sin subir tokens."),
    "epoch-converter": copy("Conversor Epoch", "Convierte timestamps Unix a fechas legibles y viceversa.", "Transforma segundos o milisegundos epoch en fechas claras para logs, APIs y eventos. También convierte fechas humanas a timestamp.", "conversor epoch online", "Conversor Epoch online gratis", "Convierte timestamps Unix y fechas online gratis. Trabaja con segundos y milisegundos desde el navegador."),
    "word-cloud-generator": copy("Generador de nube de palabras", "Crea una nube visual con las palabras más frecuentes de tu texto.", "Analiza texto y genera una nube de palabras para detectar temas, términos repetidos y patrones de contenido sin subir el documento.", "generador de nube de palabras", "Generador de nube de palabras gratis", "Crea una nube de palabras online gratis desde tu texto. Visualiza términos frecuentes en el navegador."),
    "grammar-checker": copy("Corrector gramatical", "Detecta problemas comunes de gramática, estilo y claridad en texto.", "Revisa texto para encontrar frases largas, repeticiones y mejoras básicas. Es una ayuda rápida para borradores privados antes de publicar.", "corrector gramatical online", "Corrector gramatical online gratis", "Revisa gramática y estilo online gratis. Mejora borradores en tu navegador sin subir texto."),
    "csv-to-json": copy("Convertidor CSV a JSON", "Convierte datos CSV en JSON limpio para APIs y desarrollo.", "Pega una tabla CSV y genera JSON estructurado para pruebas, integraciones o prototipos. El procesamiento ocurre localmente.", "convertidor CSV a JSON", "Convertidor CSV a JSON online", "Convierte CSV a JSON online gratis. Transforma tablas en datos estructurados desde tu navegador."),
    "json-to-csv": copy("Convertidor JSON a CSV", "Convierte arrays JSON en CSV descargable y fácil de abrir.", "Transforma datos JSON en una tabla CSV para hojas de cálculo, reportes o análisis rápido sin depender de un servidor.", "convertidor JSON a CSV", "Convertidor JSON a CSV online", "Convierte JSON a CSV online gratis. Exporta datos estructurados a tabla desde tu navegador."),
    "unit-converter": copy("Conversor de unidades", "Convierte unidades de longitud, peso, volumen y más al instante.", "Elige una unidad de origen y destino para obtener conversiones rápidas para trabajo, estudio o tareas cotidianas.", "conversor de unidades online", "Conversor de unidades online gratis", "Convierte unidades online gratis para medidas comunes. Obtén resultados rápidos en el navegador."),
    "color-contrast-checker": copy("Comprobador de contraste WCAG", "Comprueba si dos colores cumplen contraste WCAG para accesibilidad.", "Introduce colores de texto y fondo para revisar ratios AA y AAA. Útil para interfaces legibles y accesibles.", "comprobador contraste WCAG", "Comprobador de contraste WCAG gratis", "Revisa contraste WCAG online gratis. Comprueba colores AA y AAA para accesibilidad web."),
    "character-counter": copy("Contador de caracteres", "Cuenta caracteres, palabras y longitud de texto en tiempo real.", "Mide texto para títulos, mensajes, anuncios, snippets y formularios con límites estrictos de caracteres.", "contador de caracteres online", "Contador de caracteres online gratis", "Cuenta caracteres online gratis. Revisa longitud de texto en tiempo real desde tu navegador."),
    "image-resizer": copy("Redimensionar imagen", "Cambia el tamaño de imágenes por píxeles o porcentaje sin subir archivos.", "Ajusta ancho, alto y formato para publicar imágenes más ligeras en web, perfiles o documentación.", "redimensionar imagen online", "Redimensionar imagen online gratis", "Redimensiona imágenes online gratis en tu navegador. Cambia tamaño sin subir archivos."),
    "image-cropper": copy("Recortar imagen", "Recorta imágenes en el navegador con vista previa y descarga local.", "Selecciona el área que necesitas y exporta una imagen recortada para perfiles, miniaturas o documentos.", "recortar imagen online", "Recortar imagen online gratis", "Recorta imágenes online gratis. Ajusta el área y descarga el resultado desde tu navegador."),
    "markdown-to-html": copy("Markdown a HTML", "Convierte Markdown en HTML limpio con vista previa segura.", "Pega Markdown y genera HTML para blogs, documentación o correos. La vista previa se sanitiza para reducir riesgos de scripts.", "markdown a HTML online", "Markdown a HTML online gratis", "Convierte Markdown a HTML online gratis. Previsualiza y copia HTML desde tu navegador."),
    "password-generator": copy("Generador de contraseñas", "Crea contraseñas fuertes con longitud y caracteres configurables.", "Genera contraseñas aleatorias para cuentas, pruebas o credenciales temporales sin enviar nada a un servidor.", "generador de contraseñas online", "Generador de contraseñas online gratis", "Genera contraseñas seguras online gratis. Ajusta longitud y tipos de caracteres en el navegador."),
    "regex-tester": copy("Probador Regex", "Prueba expresiones regulares contra texto de ejemplo con coincidencias visibles.", "Escribe un patrón, ajusta flags y depura coincidencias sin salir del navegador. Ideal para validaciones, logs y limpieza de texto.", "probador regex online", "Probador Regex online gratis", "Prueba expresiones regulares online gratis. Depura patrones y coincidencias en tu navegador."),
  },
  hi: {
    "image-compressor": copy("इमेज कम्प्रेसर", "JPG, PNG और WebP images को browser में compress करें, बिना upload.", "Images को online compress करके web, email या social sharing के लिए हल्का बनाएं. Preview और download local बनते हैं ताकि files private रहें.", "image compress online", "Image Compress Online Free", "Images online free compress करें. JPG, PNG और WebP को browser में reduce करें, बिना upload."),
    "json-formatter": copy("JSON Formatter", "JSON को readable format में clean, validate और inspect करें.", "Raw JSON paste करें और indentation, validation और clear errors के साथ readable output पाएं. APIs, logs और configs के लिए उपयोगी.", "JSON formatter online", "JSON Formatter Online Free", "JSON online free format और validate करें. API responses और data browser में clean करें."),
    "pdf-compressor": copy("PDF Compressor", "PDF file size को directly browser में reduce करें.", "PDF online compress करें ताकि documents share करना आसान हो. Files server पर upload किए बिना private workflow रखें.", "compress PDF online", "Compress PDF Online Free", "PDF online free compress करें. Documents का size browser में reduce करें, बिना upload."),
    "pdf-merger": copy("PDF Merger", "कई PDF files को एक document में merge करें.", "PDFs को order करें और combined file बनाएं. Invoices, notes और forms के लिए private browser workflow.", "merge PDF online", "Merge PDF Online Free", "PDFs online free merge करें. Documents combine करें, बिना upload या signup."),
    "word-counter": copy("Word Counter", "Words, characters, sentences और reading time तुरंत count करें.", "Text paste करके length, count और approximate reading time देखें. Articles, essays और SEO copy के लिए useful.", "word counter online", "Word Counter Online Free", "Words और characters online free count करें. Text browser में real-time check करें."),
    "qr-code-generator": copy("QR Code Generator", "Links, text और simple data के लिए QR codes बनाएं.", "URLs या short text से downloadable QR code बनाएं. Result browser में generate होता है.", "QR code generator online", "QR Code Generator Online Free", "URLs और text के लिए QR codes online free बनाएं और download करें."),
    "jwt-decoder": copy("JWT Decoder", "JWT token का header और payload browser में decode करें.", "JWT paste करके claims, dates और structure inspect करें. Auth debugging के लिए useful, token upload किए बिना.", "JWT decoder online", "JWT Decoder Online Free", "JWT online free decode करें. Claims और payload browser में inspect करें."),
    "epoch-converter": copy("Epoch Converter", "Unix timestamps को readable dates में और वापस convert करें.", "Seconds या milliseconds epoch को clear dates में बदलें. Logs, APIs और events के लिए useful.", "epoch converter online", "Epoch Converter Online Free", "Unix timestamps और dates online free convert करें."),
    "word-cloud-generator": copy("Word Cloud Generator", "Text की frequent words से visual word cloud बनाएं.", "Text analyze करके common words और themes देखें. Drafts upload किए बिना patterns पहचानें.", "word cloud generator", "Word Cloud Generator Free", "Text से word cloud online free बनाएं और frequent terms देखें."),
    "grammar-checker": copy("Grammar Checker", "Text में common grammar, style और clarity issues खोजें.", "Draft text check करें, long sentences और repeated phrases पहचानें. Publishing से पहले quick cleanup के लिए useful.", "grammar checker online", "Grammar Checker Online Free", "Grammar और style online free check करें. Drafts browser में improve करें."),
    "csv-to-json": copy("CSV to JSON Converter", "CSV data को clean JSON में convert करें.", "CSV table paste करें और APIs, tests या prototypes के लिए structured JSON generate करें. Processing local होता है.", "csv to json converter", "CSV to JSON Converter Online", "CSV को JSON online free convert करें. Tables को structured data में बदलें."),
    "json-to-csv": copy("JSON to CSV Converter", "JSON arrays को downloadable CSV table में convert करें.", "JSON data को spreadsheet-friendly CSV में बदलें. Reports, analysis और exports के लिए useful.", "json to csv converter", "JSON to CSV Converter Online", "JSON को CSV online free convert करें और table export करें."),
    "unit-converter": copy("Unit Converter", "Length, weight, volume और common units instantly convert करें.", "Source और target unit चुनें और quick conversion पाएं. Study, work और daily tasks के लिए useful.", "unit converter online", "Unit Converter Online Free", "Common units online free convert करें. Browser में fast results पाएं."),
    "color-contrast-checker": copy("WCAG Contrast Checker", "दो colors का WCAG contrast ratio check करें.", "Text और background colors डालें और AA/AAA accessibility ratios देखें. Accessible UI के लिए useful.", "wcag color contrast checker", "WCAG Contrast Checker Free", "WCAG contrast online free check करें. AA और AAA accessibility colors verify करें."),
    "character-counter": copy("Character Counter", "Characters, words और text length real-time count करें.", "Titles, messages, ads और snippets के लिए strict character limits check करें.", "character counter online", "Character Counter Online Free", "Characters online free count करें. Text length browser में real-time देखें."),
    "image-resizer": copy("Image Resizer", "Images का size pixels या percentage से बदलें, बिना upload.", "Width, height और format adjust करके web, profiles या documents के लिए images तैयार करें.", "resize image online", "Resize Image Online Free", "Images online free resize करें. Size browser में बदलें, बिना upload."),
    "image-cropper": copy("Image Cropper", "Images को browser में crop करें और local download लें.", "Needed area select करें और profile, thumbnail या document के लिए cropped image export करें.", "crop image online", "Crop Image Online Free", "Images online free crop करें. Area select करके result download करें."),
    "markdown-to-html": copy("Markdown to HTML", "Markdown को clean HTML में convert करें with safe preview.", "Markdown paste करें और blogs, docs या emails के लिए HTML generate करें. Preview sanitized रहती है.", "markdown to html online", "Markdown to HTML Online Free", "Markdown को HTML online free convert करें और browser में preview करें."),
    "password-generator": copy("Password Generator", "Configurable length और characters से strong passwords बनाएं.", "Accounts, tests या temporary credentials के लिए random passwords generate करें, बिना server request.", "password generator online", "Password Generator Online Free", "Strong passwords online free generate करें. Length और character types चुनें."),
    "regex-tester": copy("Regex Tester", "Sample text पर regular expressions test करें.", "Pattern लिखें, flags adjust करें और matches debug करें. Validation, logs और text cleanup के लिए useful.", "regex tester online", "Regex Tester Online Free", "Regular expressions online free test करें. Matches browser में debug करें."),
  },
};

function copy(name: string, description: string, longDescription: string, primaryKeyword: string, metaTitle: string, metaDescription: string): LocalizedToolCopy {
  return { name, description, longDescription, primaryKeyword, metaTitle, metaDescription };
}

function localizedSteps(lang: Exclude<Lang, "en">, toolName: string, keyword: string): UsageStep[] {
  if (lang === "es") {
    return [
      { title: "Pega o carga tus datos", content: `Abre ${toolName} y añade el texto, archivo o valor que quieres procesar. La herramienta está pensada para ${keyword} con un flujo rápido.` },
      { title: "Ajusta las opciones", content: "Revisa los controles disponibles y elige la configuración que mejor encaje con tu tarea antes de generar el resultado." },
      { title: "Copia o descarga el resultado", content: "Cuando el resultado esté listo, cópialo o descárgalo desde el navegador. No necesitas crear una cuenta." },
    ];
  }
  return [
    { title: "डेटा जोड़ें", content: `${toolName} खोलें और text, file या value जोड़ें. यह ${keyword} workflow के लिए fast browser-based tool है.` },
    { title: "Options चुनें", content: "Available controls review करें और अपनी task के हिसाब से settings adjust करें." },
    { title: "Result copy या download करें", content: "Result ready होने पर उसे browser से copy या download करें. Account की जरूरत नहीं है." },
  ];
}

function localizedFaq(lang: Exclude<Lang, "en">, toolName: string, keyword: string): FAQPair[] {
  if (lang === "es") {
    return [
      { question: `¿${toolName} es gratis?`, answer: `Sí. Puedes usar ${toolName} gratis para ${keyword}, sin registro y sin instalar software.` },
      { question: `¿${toolName} sube mis datos?`, answer: "La herramienta está diseñada para ejecutarse en tu navegador cuando el flujo lo permite. Evita subir datos privados a servicios externos innecesarios." },
    ];
  }
  return [
    { question: `क्या ${toolName} मुफ्त है?`, answer: `हाँ. ${toolName} को ${keyword} के लिए मुफ्त इस्तेमाल किया जा सकता है, बिना signup या installation.` },
    { question: `क्या ${toolName} मेरा data upload करता है?`, answer: "Tool browser-first workflow के लिए बना है जहां संभव हो. Private data को unnecessary external services पर भेजने से बचाता है." },
  ];
}

function localizedContent(lang: Exclude<Lang, "en">, toolName: string): ContentSection[] {
  if (lang === "es") {
    return [
      { heading: "Privacidad y uso local", content: `${toolName} forma parte de una colección de herramientas pensadas para trabajar rápido sin fricción. Cuando el navegador puede hacer el procesamiento, tus entradas se quedan en tu dispositivo.` },
      { heading: "Cuándo usar esta herramienta", content: "Úsala para tareas rápidas de trabajo, estudio, desarrollo, contenido o publicación. Está optimizada para resultados inmediatos y una interfaz simple." },
    ];
  }
  return [
    { heading: "Privacy और local use", content: `${toolName} fast utility workflows के लिए बनाया गया है. जहां browser processing possible है, input आपके device पर रहता है.` },
    { heading: "कब इस्तेमाल करें", content: "Work, study, development, content और publishing tasks में quick results के लिए यह tool उपयोगी है." },
  ];
}

export function getLocalizedCategory(lang: Lang, slug: string): Category | undefined {
  const category = getCategoryBySlug(slug);
  if (!category) return undefined;
  if (lang === "en") return category;
  const translation = categoryTranslations[lang]?.[slug];
  if (!translation) return category;
  return { ...category, ...translation };
}

export function getLocalizedCategories(lang: Lang): Category[] {
  return CATEGORIES.map((category) => getLocalizedCategory(lang, category.slug) ?? category);
}

export function getLocalizedTool(lang: Lang, slug: string): Tool | undefined {
  const tool = getToolBySlug(slug);
  if (!tool) return undefined;
  if (lang === "en") return tool;
  const translation = toolTranslations[lang]?.[slug as LocalizedToolSlug];
  if (!translation) return undefined;
  return {
    ...tool,
    ...translation,
    keywords: [translation.primaryKeyword, ...tool.keywords.filter((keyword) => keyword !== translation.primaryKeyword).slice(0, 5)],
    usageSteps: localizedSteps(lang, translation.name, translation.primaryKeyword),
    faq: localizedFaq(lang, translation.name, translation.primaryKeyword),
    additionalContent: localizedContent(lang, translation.name),
  };
}

export function getLocalizedTools(lang: Lang): Tool[] {
  if (lang === "en") return TOOLS;
  return LOCALIZED_TOOL_SLUGS.map((slug) => getLocalizedTool(lang, slug)).filter((tool): tool is Tool => Boolean(tool));
}

export function getLocalizedToolsByCategory(lang: Lang, categorySlug: string): Tool[] {
  return getLocalizedTools(lang).filter((tool) => tool.categorySlug === categorySlug);
}

export function getLocalizedRelatedTools(lang: Lang, currentSlug: string, limit = 4): Tool[] {
  const current = getLocalizedTool(lang, currentSlug);
  if (!current) return [];
  return getLocalizedToolsByCategory(lang, current.categorySlug).filter((tool) => tool.slug !== currentSlug).slice(0, limit);
}

export function hasLocalizedTool(lang: Lang, slug: string): boolean {
  return lang === "en" ? Boolean(getToolBySlug(slug)) : Boolean(toolTranslations[lang]?.[slug as LocalizedToolSlug]);
}
