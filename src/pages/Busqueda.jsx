import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { getTodosLosServicios, CATEGORIAS, filtrarServicios, ordenarServicios } from '../data/servicios'

export default function Busqueda() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // URL es la fuente de verdad para query, cat y orden
  const urlQuery = searchParams.get('q') || ''
  const urlCat   = searchParams.get('cat') || 'Todas'
  const urlOrden = searchParams.get('ord') || 'calificacion'

  // Input local — sólo se aplica al presionar Buscar
  const [inputValue, setInputValue] = useState(urlQuery)

  // Resultados calculados directamente de los params — sin useEffect
  const resultados = useMemo(
    () => ordenarServicios(filtrarServicios(getTodosLosServicios(), urlQuery, urlCat), urlOrden),
    [urlQuery, urlCat, urlOrden]
  )

  function applySearch(q, cat, ord) {
    const params = {}
    if (q && q.trim())    params.q   = q.trim()
    if (cat && cat !== 'Todas') params.cat = cat
    if (ord && ord !== 'calificacion') params.ord = ord
    setSearchParams(params)
  }

  function handleSearch(e) {
    e.preventDefault()
    applySearch(inputValue, urlCat, urlOrden)
  }

  function handleCategoria(cat) {
    const nueva = cat === urlCat ? 'Todas' : cat
    applySearch(urlQuery, nueva, urlOrden)
  }

  function handleOrden(ord) {
    applySearch(urlQuery, urlCat, ord)
  }

  return (
    <main className="page-container" style={{ flex: 1 }}>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} style={{ marginBottom: '1.25rem' }}>
        <div className="search-bar">
          <input className="search-input" type="text"
            placeholder="Buscar: Plomero, Electricista, Repostería..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            aria-label="Buscar servicios" />
          <button type="submit" className="search-btn">Buscar</button>
        </div>
      </form>

      {/* Filtro categorías */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-gray)', fontWeight: 600 }}>Categoría:</span>
        {['Todas', ...CATEGORIAS].map(cat => (
          <button key={cat}
            className={`badge badge-primary${urlCat === cat ? ' active' : ''}`}
            onClick={() => handleCategoria(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Ordenar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-gray)', fontWeight: 600 }}>Ordenar:</span>
        {[
          { value: 'calificacion', label: '⭐ Mejor Calificado' },
          { value: 'reseñas',      label: '💬 Más Reseñas' },
          { value: 'reciente',     label: '🆕 Recién Unido' },
        ].map(op => (
          <button key={op.value}
            className={`badge badge-primary${urlOrden === op.value ? ' active' : ''}`}
            onClick={() => handleOrden(op.value)}>
            {op.label}
          </button>
        ))}
      </div>

      {/* Contador */}
      <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-gray)', fontWeight: 500 }}>
        {resultados.length} resultado{resultados.length !== 1 ? 's' : ''}
        {urlQuery && <> para "<strong>{urlQuery}</strong>"</>}
        {urlCat !== 'Todas' && <> en <strong>{urlCat}</strong></>}
      </div>

      {/* Resultados */}
      {resultados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p className="empty-state-title">No encontramos resultados</p>
          <p className="empty-state-msg">
            Aún no hay emprendedores registrados con ese nombre o servicio.<br />
            Prueba con otro término o{' '}
            <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => navigate('/registro')}>
              regístrate para ofrecer tu servicio
            </span>.
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
