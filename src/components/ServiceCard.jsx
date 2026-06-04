import { useNavigate } from 'react-router-dom'
import Stars from './Stars'

function handleWhatsApp(nombre) {
  alert(`⚠️ Función no habilitada en el MVP\n\nEn la versión final, este botón abriría WhatsApp para contactar a ${nombre} directamente.`)
}

export default function ServiceCard({ servicio }) {
  const navigate = useNavigate()
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
        <button
          className="btn btn-whatsapp btn-sm"
          onClick={() => handleWhatsApp(servicio.nombre)}
        >
          💬 WhatsApp
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/perfil/' + servicio.id)}>
          Ver perfil
        </button>
      </div>
    </div>
  )
}
