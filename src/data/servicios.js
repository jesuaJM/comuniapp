export const CATEGORIAS = [
  'Plomería',
  'Eléctrico',
  'Comida',
  'Clases',
  'Belleza',
  'Carpintería',
  'Mecánica',
  'Jardinería',
]

export const SERVICIOS_INICIALES = [
  {
    id: 1,
    nombre: 'Martha Rodríguez',
    servicio: 'Repostería y Tortas Artesanales',
    categoria: 'Comida',
    barrio: 'Belén',
    ciudad: 'Medellín',
    descripcion: 'Ofrezco tortas personalizadas para toda ocasión. Hago pedidos desde 3 días de anticipación. Entrega a domicilio por el sector de Belén.',
    telefono: '3001234567',
    calificacion: 5.0,
    reseñas: 63,
    initials: 'MR',
    color: '#2D6A4F',
    reseñasTexto: ['Muy deliciosas, a mi hijo le encantaron ❤️', 'Puntual y deliciosa la comida', 'La mejor repostería del barrio'],
    miembroDesde: '2026',
  },
  {
    id: 2,
    nombre: 'Carlos Mejía',
    servicio: 'Plomería General y Reparaciones',
    categoria: 'Plomería',
    barrio: 'Laureles',
    ciudad: 'Medellín',
    descripcion: 'Reparación de tuberías, instalación de sanitarios y duchas. Atención de emergencias 24/7. Más de 10 años de experiencia.',
    telefono: '3109876543',
    calificacion: 4.8,
    reseñas: 41,
    initials: 'CM',
    color: '#1a5276',
    reseñasTexto: ['Muy rápido y eficiente', 'Solucionó el problema en minutos'],
    miembroDesde: '2026',
  },
  {
    id: 3,
    nombre: 'Ana Gómez',
    servicio: 'Clases de Matemáticas y Física',
    categoria: 'Clases',
    barrio: 'El Poblado',
    ciudad: 'Medellín',
    descripcion: 'Clases particulares para bachillerato y universidad. Metodología visual y práctica. Horarios flexibles mañana y tarde.',
    telefono: '3157894561',
    calificacion: 4.9,
    reseñas: 28,
    initials: 'AG',
    color: '#6c3483',
    reseñasTexto: ['Excelente metodología, muy clara', 'Mi hijo mejoró mucho en matemáticas'],
    miembroDesde: '2026',
  },
  {
    id: 4,
    nombre: 'Pedro Vargas',
    servicio: 'Electricista Certificado',
    categoria: 'Eléctrico',
    barrio: 'Robledo',
    ciudad: 'Medellín',
    descripcion: 'Instalaciones eléctricas residenciales y comerciales. Certificado RETIE. Revisión de tableros, tomas y luminarias.',
    telefono: '3204567891',
    calificacion: 4.7,
    reseñas: 35,
    initials: 'PV',
    color: '#d4ac0d',
    reseñasTexto: ['Muy profesional', 'Trabajo limpio y garantizado'],
    miembroDesde: '2026',
  },
  {
    id: 5,
    nombre: 'Lucía Herrera',
    servicio: 'Peluquería y Estética a Domicilio',
    categoria: 'Belleza',
    barrio: 'Aranjuez',
    ciudad: 'Medellín',
    descripcion: 'Corte, tintura, manicure y pedicure a domicilio. Productos de calidad profesional. Citas disponibles toda la semana.',
    telefono: '3012345678',
    calificacion: 4.6,
    reseñas: 52,
    initials: 'LH',
    color: '#c0392b',
    reseñasTexto: ['Excelente servicio a domicilio', 'Muy hábil con los colores'],
    miembroDesde: '2026',
  },
  {
    id: 6,
    nombre: 'Roberto Silva',
    servicio: 'Carpintería y Muebles a Medida',
    categoria: 'Carpintería',
    barrio: 'Castilla',
    ciudad: 'Medellín',
    descripcion: 'Fabricación y reparación de muebles en madera. Cocinas integrales, closets y estanterías. Materiales de primera calidad.',
    telefono: '3185678901',
    calificacion: 4.5,
    reseñas: 19,
    initials: 'RS',
    color: '#784212',
    reseñasTexto: ['Muebles de excelente calidad', 'Cumplió con los tiempos'],
    miembroDesde: '2026',
  },
]

// Quita tildes: "Plomería" → "Plomeria", "Eléctrico" → "Electrico"
function normalizar(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Verifica si una palabra de búsqueda coincide con un texto
// Maneja tildes y raíces: "plomero" encuentra "Plomería", "electrico" encuentra "Eléctrico"
function palabraCoincide(palabra, texto) {
  const p = normalizar(palabra)
  const t = normalizar(texto)

  // Coincidencia directa (subcadena)
  if (t.includes(p)) return true

  // Coincidencia por raíz: quita la última letra y busca si alguna palabra del texto empieza con esa raíz
  // "plomero" → raíz "plomer" → "plomeria".startsWith("plomer") ✓
  // "carpintero" → raíz "carpinter" → "carpinteria".startsWith("carpinter") ✓
  if (p.length >= 4) {
    const raiz = p.slice(0, -1)
    return t.split(/\s+/).some(pt => pt.length >= 3 && pt.startsWith(raiz))
  }

  return false
}

export function filtrarServicios(servicios, query, categoria) {
  let resultado = [...servicios]

  if (query && query.trim() !== '') {
    // Divide la búsqueda en palabras individuales
    const palabras = query.trim().split(/\s+/).filter(p => p.length >= 2)

    resultado = resultado.filter(s => {
      // Texto completo del servicio para buscar
      const texto = `${s.nombre} ${s.servicio} ${s.categoria} ${s.barrio} ${s.descripcion}`
      // Todas las palabras deben coincidir (AND)
      return palabras.every(palabra => palabraCoincide(palabra, texto))
    })
  }

  if (categoria && categoria !== 'Todas') {
    resultado = resultado.filter((s) => s.categoria === categoria)
  }

  return resultado
}


export function ordenarServicios(servicios, criterio) {
  const copia = [...servicios]
  switch (criterio) {
    case 'calificacion': return copia.sort((a, b) => b.calificacion - a.calificacion)
    case 'reseñas': return copia.sort((a, b) => b.reseñas - a.reseñas)
    case 'reciente': return copia.sort((a, b) => b.id - a.id)
    default: return copia
  }
}

// Permite agregar servicios creados por emprendedores en runtime
let serviciosExtra = []

export function agregarServicio(datos) {
  const nuevo = {
    id: Date.now(),
    ...datos,
  }
  serviciosExtra.push(nuevo)
  return nuevo
}

export function getTodosLosServicios() {
  return [...SERVICIOS_INICIALES, ...serviciosExtra]
}
