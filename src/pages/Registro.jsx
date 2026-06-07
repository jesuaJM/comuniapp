import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../data/usuarios'
import { CATEGORIAS } from '../data/servicios'

export default function Registro({ onRegistro }) {
  const navigate = useNavigate()
  const [tipo, setTipo]     = useState('vecino')
  const [form, setForm]     = useState({
    nombre: '', email: '', telefono: '', password: '',
    // campos extra para emprendedor
    nombreServicio: '', categoria: '', descripcion: '', barrio: ''
  })
  const [errores, setErrores]   = useState([])
  const [loading, setLoading]   = useState(false)
  const [exito, setExito]       = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrores([])
  }

  function validarEmprendedor() {
    const err = []
    if (!form.nombreServicio.trim()) err.push('El nombre del servicio es obligatorio.')
    if (!form.categoria)            err.push('Selecciona una categoría.')
    if (!form.descripcion.trim() || form.descripcion.trim().length < 10)
      err.push('La descripción debe tener al menos 10 caracteres.')
    if (!form.barrio.trim())        err.push('El barrio es obligatorio.')
    return err
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    // Validación extra si es emprendedor
    if (tipo === 'emprendedor') {
      const errEmp = validarEmprendedor()
      if (errEmp.length > 0) { setErrores(errEmp); setLoading(false); return }
    }

    setTimeout(() => {
      const result = registrarUsuario({ ...form, tipo })
      setLoading(false)
      if (result.ok) {
        // Si es emprendedor, guardamos los datos del servicio en el usuario
        if (tipo === 'emprendedor') {
          result.usuario.servicio = {
            nombreServicio: form.nombreServicio,
            categoria:      form.categoria,
            descripcion:    form.descripcion,
            barrio:         form.barrio,
          }
        }
        onRegistro(result.usuario)
        setExito(true)
        setTimeout(() => {
          navigate(tipo === 'emprendedor' ? '/crear-servicio' : '/home')
        }, 1200)
      } else {
        setErrores(result.errores)
      }
    }, 500)
  }

  if (exito) return (
    <div className="auth-page">
      <div className="auth-card fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>¡Cuenta creada!</h2>
        <p style={{ color: 'var(--text-gray)' }}>
          {tipo === 'emprendedor'
            ? 'Redirigiendo para publicar tu servicio...'
            : 'Redirigiendo a la página principal...'}
        </p>
      </div>
    </div>
  )

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">🏘️</div>
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Únete a la red comunitaria</p>

        {/* Toggle */}
        <div className="account-toggle" style={{ marginBottom: '1.25rem' }}>
          <button type="button"
            className={`account-toggle-btn${tipo === 'vecino' ? ' active' : ''}`}
            onClick={() => { setTipo('vecino'); setErrores([]) }}>
            🏠 Vecino
          </button>
          <button type="button"
            className={`account-toggle-btn${tipo === 'emprendedor' ? ' active' : ''}`}
            onClick={() => { setTipo('emprendedor'); setErrores([]) }}>
            💼 Emprendedor
          </button>
        </div>

        {errores.length > 0 && (
          <div className="alert alert-error" style={{ marginBottom: '1rem', flexDirection: 'column', gap: '0.25rem' }}>
            {errores.map((e, i) => <span key={i}>⚠️ {e}</span>)}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* ── Campos comunes ── */}
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input name="nombre" type="text" className="form-input"
              placeholder="Tu nombre completo" value={form.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input name="email" type="email" className="form-input"
              placeholder="tucorreo@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Teléfono / WhatsApp</label>
            <input name="telefono" type="tel" className="form-input"
              placeholder="+57 300 000 0000" value={form.telefono} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" className="form-input"
              placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} />
          </div>

          {/* ── Campos extra para Emprendedor ── */}
          {tipo === 'emprendedor' && (
            <>
              <div style={{
                margin: '0.5rem 0',
                padding: '0.75rem 1rem',
                background: 'var(--bg-light)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                fontSize: '0.8125rem',
                color: 'var(--text-gray)',
                fontWeight: 600
              }}>
                💼 Información de tu servicio
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
                  placeholder="Ej: Ofrezco tortas personalizadas para toda ocasión. Entrega a domicilio."
                  value={form.descripcion} onChange={handleChange} rows={3} />
              </div>
              <div className="form-group">
                <label className="form-label">Barrio *</label>
                <input name="barrio" type="text" className="form-input"
                  placeholder="Ej: Belén" value={form.barrio} onChange={handleChange} />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-full btn-lg"
            disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Creando cuenta...' : tipo === 'emprendedor' ? 'Crear Cuenta y Publicar Servicio' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}
