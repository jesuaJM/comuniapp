export default function Stars({ calificacion, reseñas }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      <div className="stars">
        {[1,2,3,4,5].map(i => (
          <span key={i} className={`star${i <= Math.round(calificacion) ? '' : ' empty'}`}>★</span>
        ))}
      </div>
      <span className="rating-text">{calificacion.toFixed(1)} ({reseñas} reseñas)</span>
    </div>
  )
}
