import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import { getTodosLosServicios, CATEGORIAS } from '../data/servicios'

export default function Home({ sesion }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) navigate('/busqueda?q=' + encodeURIComponent(query.trim()))
    else navigate('/busqueda')
  }

  function handlePublicar() {
    if (!sesion) {
      // No está logueado → va a registro con emprendedor
      navigate('/registro')
      return
    }
    if (sesion.tipo === 'emprendedor') {
      navigate('/crear-servicio')
    } else {
      // Es vecino → le avisamos
      alert('Tu cuenta es de Vecino. Para publicar un servicio necesitas una cuenta de Emprendedor.\n\nCrea una cuenta nueva seleccionando "Emprendedor" en el registro.')
    }
  }

  const destacados = getTodosLosServicios().slice(0, 4)

  return (
    <main style={{ flex: 1 }}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content fade-in">
          <h1>Encuentra Servicios en <span>tu Barrio</span></h1>
          <p>Conecta con emprendedores locales de confianza.<br />Plomeros, electricistas, repostería y más.</p>
          <form onSubmit={handleSearch}>
            <div className="search-bar" style={{ maxWidth: 560, margin: '0 auto' }}>
              <input className="search-input" type="text"
                placeholder="Buscar: Plomero, Electricista, Repostería..."
                value={query} onChange={e => setQuery(e.target.value)}
                aria-label="Buscar servicios" />
              <button type="submit" className="search-btn">Buscar</button>
            </div>
          </form>
        </div>
      </section>

      <div className="page-container">
        {/* Categorías */}
        <section style={{ marginBottom: '2rem' }}>
          <p className="section-title">Categorías Populares</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIAS.map(cat => (
              <button key={cat}
                className="badge badge-primary"
                style={{ cursor: 'pointer', fontSize: '0.875rem', padding: '0.4rem 1rem' }}
                onClick={() => navigate('/busqueda?cat=' + encodeURIComponent(cat))}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Destacados */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p className="section-title" style={{ margin: 0 }}>Emprendedores Destacados</p>
            <Link to="/busqueda" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
              Ver todos →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {destacados.map(s => <ServiceCard key={s.id} servicio={s} />)}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            ¿Tienes un servicio o negocio?
          </h2>
          <p style={{ fontSize: '0.9375rem', opacity: 0.85, marginBottom: '1.25rem' }}>
            Regístrate gratis y llega a clientes en tu barrio hoy mismo.
          </p>
          <button className="btn btn-accent btn-lg" onClick={handlePublicar}>
            Publicar mi Servicio
          </button>
        </section>
      </div>
    </main>
  )
}
