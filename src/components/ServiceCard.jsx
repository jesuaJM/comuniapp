import { useNavigate } from 'react-router-dom'
import Stars from './Stars'

export default function ServiceCard({ servicio }) {
  const navigate = useNavigate()
  const waUrl = `https://wa.me/57${servicio.telefono}?text=${encodeURIComponent('Hola ' + servicio.nombre + ', te contacto desde ComuniApp.')}`
  return (
    <div className="service-card fade-in" onClick={() => navigate('/perfil/' + servicio.id)}>
      <div className="avatar avatar-md" style={{ background: servicio.color }}>{servicio.initials}</div>
      <div className="service-card-info">
        <div className="service-card-name">{servicio.nombre}</div>
        <div className="service-card-service">{servicio.servicio}</div>
        <div className="service-card-meta">
          <Stars calificacion={servicio.calificacion} reseñas={servicio.reseñas} />
          <span className="badge badge-primary" style={{ cursor: 'default' }}>{servicio.categoria}</span>
          <span className="service-card-barrio">📍 {servicio.barrio}</span>
        </div>
      </div>
      <div className="service-card-actions" onClick={e => e.stopPropagation()}>
        <a className="btn btn-whatsapp btn-sm" href={waUrl} target="_blank" rel="noopener noreferrer">
          💬 WhatsApp
        </a>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/perfil/' + servicio.id)}>
          Ver perfil
        </button>
      </div>
    </div>
  )
}
