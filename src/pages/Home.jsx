import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import Stars from '../components/Stars'
import { SERVICIOS_INICIALES, CATEGORIAS } from '../data/servicios'

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    navigate('/busqueda' + (query.trim() ? '?q=' + encodeURIComponent(query.trim()) : ''))
  }

  const destacados = SERVICIOS_INICIALES.slice(0, 4)

  return (
    <main style={{ flex: 1 }}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="fade-in">Encuentra Servicios en <span>tu Barrio</span></h1>
          <p className="fade-in-delay-1">Conecta con emprendedores locales de confianza. Plomeros, electricistas, repostería y más — a un mensaje de distancia.</p>
          <form onSubmit={handleSearch} className="fade-in-delay-2">
            <div className="search-bar" style={{ maxWidth: 560, margin: '0 auto' }}>
              <input
                className="search-input"
                type="text"
                placeholder="Buscar: Plomero, Electricista, Repostería..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Buscar servicios"
              />
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
              <button
                key={cat}
                className="badge badge-primary"
                style={{ cursor: 'pointer', fontSize: '0.875rem', padding: '0.4rem 1rem' }}
                onClick={() => navigate('/busqueda?cat=' + encodeURIComponent(cat))}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Emprendedores destacados */}
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

        {/* CTA para emprendedores */}
        <section style={{
          marginTop: '2.5rem',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '0.5rem' }}>¿Tienes un servicio o negocio?</h2>
          <p style={{ fontSize: '0.9375rem', opacity: 0.85, marginBottom: '1.25rem' }}>Regístrate gratis y llega a clientes en tu barrio hoy mismo.</p>
          <Link to="/registro" className="btn btn-accent btn-lg">
            Publicar mi Servicio
          </Link>
        </section>
      </div>
    </main>
  )
}
