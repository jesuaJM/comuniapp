import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { SERVICIOS_INICIALES, CATEGORIAS, filtrarServicios, ordenarServicios } from '../data/servicios'

export default function Busqueda() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')
  const [categoria, setCategoria] = useState(searchParams.get('cat') || 'Todas')
  const [orden, setOrden] = useState('calificacion')
  const [resultados, setResultados] = useState([])

  const actualizar = useCallback((q, cat, ord) => {
    const filtrados = filtrarServicios(SERVICIOS_INICIALES, q, cat)
    const ordenados = ordenarServicios(filtrados, ord)
    setResultados(ordenados)
  }, [])

  useEffect(() => {
    actualizar(query, categoria, orden)
  }, [query, categoria, orden, actualizar])

  // Sync from URL on mount
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const cat = searchParams.get('cat') || 'Todas'
    setQuery(q); setInputValue(q); setCategoria(cat)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    setQuery(inputValue)
    const params = {}
    if (inputValue.trim()) params.q = inputValue.trim()
    if (categoria !== 'Todas') params.cat = categoria
    setSearchParams(params)
  }

  function handleCategoria(cat) {
    const nueva = cat === categoria ? 'Todas' : cat
    setCategoria(nueva)
    const params = {}
    if (query.trim()) params.q = query.trim()
    if (nueva !== 'Todas') params.cat = nueva
    setSearchParams(params)
  }

  return (
    <main className="page-container" style={{ flex: 1 }}>
      {/* Search bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1.25rem' }}>
        <div className="search-bar">
          <input className="search-input" type="text" placeholder="Buscar: Plomero, Electricista, Repostería..."
            value={inputValue} onChange={e => setInputValue(e.target.value)} aria-label="Buscar servicios" />
          <button type="submit" className="search-btn">Buscar</button>
        </div>
      </form>

      {/* Categorías */}
      <div className="filters-row">
        <span className="sort-label">Categoría:</span>
        <button className={`badge badge-primary${categoria === 'Todas' ? ' active' : ''}`}
          onClick={() => handleCategoria('Todas')}>Todas</button>
        {CATEGORIAS.map(cat => (
          <button key={cat} className={`badge badge-primary${categoria === cat ? ' active' : ''}`}
            onClick={() => handleCategoria(cat)}>{cat}</button>
        ))}
      </div>

      {/* Ordenar */}
      <div className="filters-row" style={{ marginBottom: '1.5rem' }}>
        <span className="sort-label">Ordenar:</span>
        {[
          { value: 'calificacion', label: '⭐ Mejor Calificado' },
          { value: 'reseñas', label: '💬 Más Reseñas' },
          { value: 'reciente', label: '🆕 Recién Unido' },
        ].map(op => (
          <button key={op.value} className={`badge badge-primary${orden === op.value ? ' active' : ''}`}
            onClick={() => setOrden(op.value)}>{op.label}</button>
        ))}
      </div>

      {/* Resultados */}
      <div style={{ marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-gray)', fontWeight: 500 }}>
          {resultados.length} resultado{resultados.length !== 1 ? 's' : ''}
          {query && <> para "<strong>{query}</strong>"</>}
          {categoria !== 'Todas' && <> en <strong>{categoria}</strong></>}
        </span>
      </div>

      {resultados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p className="empty-state-title">No encontramos resultados</p>
          <p className="empty-state-msg">
            Aún no hay emprendedores registrados con ese nombre o servicio. <br />
            Prueba con otro término o{' '}
            <a href="/registro" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              regístrate para ofrecer tu servicio
            </a>.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {resultados.map(s => <ServiceCard key={s.id} servicio={s} />)}
        </div>
      )}
    </main>
  )
}
