import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIAS, agregarServicio } from '../data/servicios'

export default function CrearServicio({ sesion }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombreServicio: sesion?.servicio?.nombreServicio || '',
    categoria:      sesion?.servicio?.categoria      || '',
    descripcion:    sesion?.servicio?.descripcion    || '',
    barrio:         sesion?.servicio?.barrio         || '',
  })
  const [errores, setErrores]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [publicado, setPublicado] = useState(false)

  // Si no está logueado o no es emprendedor, redirige
  if (!sesion) {
    return (
      <div className="auth-page">
        <div className="auth-card fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Necesitas una cuenta de Emprendedor
          </h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
            Inicia sesión o regístrate como Emprendedor para publicar tu servicio.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={() => navigate('/login')}>Iniciar Sesión</button>
            <button className="btn btn-primary" onClick={() => navigate('/registro')}>Registrarme</button>
          </div>
        </div>
      </div>
    )
  }

  if (sesion.tipo === 'vecino') {
    return (
      <div className="auth-page">
        <div className="auth-card fade-in" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Tu cuenta es de Vecino
          </h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
            Para publicar un servicio necesitas una cuenta de Emprendedor.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/home')}>
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrores([])
  }

  function validar() {
    const err = []
    if (!form.nombreServicio.trim())   err.push('El nombre del servicio es obligatorio.')
    if (!form.categoria)               err.push('Selecciona una categoría.')
    if (form.descripcion.trim().length < 10) err.push('La descripción debe tener al menos 10 caracteres.')
    if (!form.barrio.trim())           err.push('El barrio es obligatorio.')
    return err
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = validar()
    if (err.length > 0) { setErrores(err); return }
    setLoading(true)
    setTimeout(() => {
      agregarServicio({
        nombre:    sesion.nombre,
        servicio:  form.nombreServicio,
        categoria: form.categoria,
        barrio:    form.barrio,
        ciudad:    'Medellín',
        descripcion: form.descripcion,
        telefono:  sesion.telefono,
        calificacion: 0,
        reseñas:   0,
        initials:  sesion.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        color:     '#2D6A4F',
        reseñasTexto: [],
        miembroDesde: '2026',
      })
      setLoading(false)
      setPublicado(true)
    }, 600)
  }

  if (publicado) return (
    <div className="auth-page">
      <div className="auth-card fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          ¡Servicio publicado!
        </h2>
        <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
          Tu servicio ya está visible para los vecinos de tu barrio.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button className="btn btn-outline"   onClick={() => navigate('/home')}>Ir al inicio</button>
          <button className="btn btn-primary"   onClick={() => navigate('/busqueda')}>Ver emprendedores</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '2rem' }}>
      <div className="auth-card fade-in" style={{ maxWidth: 520 }}>
        <div className="auth-logo">💼</div>
        <h1 className="auth-title">Publicar mi Servicio</h1>
        <p className="auth-subtitle">Hola {sesion.nombre.split(' ')[0]}, completa los datos de tu servicio</p>

        {errores.length > 0 && (
          <div className="alert alert-error" style={{ marginBottom: '1rem', flexDirection: 'column', gap: '0.25rem' }}>
            {errores.map((e, i) => <span key={i}>⚠️ {e}</span>)}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div style={{
            padding: '0.75rem 1rem',
            background: 'var(--bg-light)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            fontSize: '0.8rem',
            color: 'var(--text-gray)'
          }}>
            📋 Subir foto de perfil o servicio — <em>función disponible en versión completa</em>
          </div>

          <div className="form-group">
            <label className="form-label">Nombre del Servicio *</label>
            <input name="nombreServicio" type="text" className="form-input"
              placeholder="Ej: Repostería de la abuela"
              value={form.nombreServicio} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Categoría *</label>
            <select name="categoria" className="form-select"
              value={form.categoria} onChange={handleChange}>
              <option value="">Selecciona una categoría...</option>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción del Servicio *</label>
            <textarea name="descripcion" className="form-input form-textarea"
              placeholder="Ej: Ofrezco tortas personalizadas para toda ocasión. Hago pedidos desde 3 días de anticipación."
              value={form.descripcion} onChange={handleChange} rows={4} />
          </div>

          <div className="form-group">
            <label className="form-label">Barrio *</label>
            <input name="barrio" type="text" className="form-input"
              placeholder="Ej: Belén" value={form.barrio} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Teléfono / WhatsApp</label>
            <input type="text" className="form-input"
              value={sesion.telefono} disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
              Tomado de tu cuenta registrada
            </span>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg"
            disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Publicando...' : 'Publicar mi Servicio'}
          </button>

          <button type="button" className="btn btn-outline btn-full"
            onClick={() => navigate('/home')}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  )
}
