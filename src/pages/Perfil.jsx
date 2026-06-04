import { useParams, useNavigate } from 'react-router-dom'
import Stars from '../components/Stars'
import { SERVICIOS_INICIALES } from '../data/servicios'

function handleWhatsApp(nombre, servicio) {
  alert(`⚠️ Función no habilitada en el MVP\n\nEn la versión final, este botón abriría WhatsApp para contactar a ${nombre} sobre su servicio de ${servicio}.`)
}

export default function Perfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const s = SERVICIOS_INICIALES.find(x => x.id === Number(id))

  if (!s) return (
    <div className="page-container" style={{ flex: 1 }}>
      <div className="empty-state">
        <div className="empty-state-icon">😕</div>
        <p className="empty-state-title">Perfil no encontrado</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/busqueda')}>
          Volver a búsqueda
        </button>
      </div>
    </div>
  )

  return (
    <main style={{ flex: 1, maxWidth: 640, margin: '0 auto', width: '100%' }}>
      <div style={{ padding: '1rem 1.5rem 0' }}>
        <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>← Volver</button>
      </div>

      <div className="card" style={{ margin: '0.75rem 1rem 1.5rem', overflow: 'visible' }}>
        <div className="profile-header">
          <div className="avatar avatar-xl" style={{ background: s.color, margin: '0 auto' }}>{s.initials}</div>
          <h1 className="profile-header-name">{s.nombre}</h1>
          <p className="profile-header-service">{s.servicio}</p>
          <p className="profile-header-meta">📍 {s.barrio}, {s.ciudad} · Miembro desde {s.miembroDesde}</p>
          <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center' }}>
            <Stars calificacion={s.calificacion} reseñas={s.reseñas} />
          </div>
        </div>

        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          <button
            className="btn btn-whatsapp btn-full btn-lg"
            onClick={() => handleWhatsApp(s.nombre, s.servicio)}
          >
            💬 Contactar por WhatsApp
          </button>
        </div>

        <div className="profile-body">
          <div>
            <p className="profile-section-label">Sobre mis Servicios</p>
            <div className="profile-description">{s.descripcion}</div>
          </div>
          <div>
            <p className="profile-section-label">Categoría</p>
            <span className="badge badge-primary active" style={{ cursor: 'default' }}>{s.categoria}</span>
          </div>
          <div>
            <p className="profile-section-label">Reseñas Recientes</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {s.reseñasTexto.map((r, i) => (
                <div key={i} className="review-item">💬 {r}</div>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-light)' }}>
            📞 {s.telefono}
          </div>
        </div>
      </div>
    </main>
  )
}
