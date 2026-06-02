import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../data/usuarios'

export default function Registro({ onRegistro }) {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState('vecino')
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: '' })
  const [errores, setErrores] = useState([])
  const [loading, setLoading] = useState(false)
  const [exito, setExito] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrores([])
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const result = registrarUsuario({ ...form, tipo })
      setLoading(false)
      if (result.ok) {
        setExito(true)
        onRegistro(result.usuario)
        setTimeout(() => navigate('/'), 1500)
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
        <p style={{ color: 'var(--text-gray)' }}>Redirigiendo a la página principal...</p>
      </div>
    </div>
  )

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">🏘️</div>
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Únete a la red comunitaria</p>

        {/* Toggle Vecino / Emprendedor */}
        <div className="account-toggle" style={{ marginBottom: '1.25rem' }}>
          <button type="button" className={`account-toggle-btn${tipo === 'vecino' ? ' active' : ''}`} onClick={() => setTipo('vecino')}>
            🏠 Vecino
          </button>
          <button type="button" className={`account-toggle-btn${tipo === 'emprendedor' ? ' active' : ''}`} onClick={() => setTipo('emprendedor')}>
            💼 Emprendedor
          </button>
        </div>

        {errores.length > 0 && (
          <div className="alert alert-error" style={{ marginBottom: '1rem', flexDirection: 'column', gap: '0.25rem' }}>
            {errores.map((e, i) => <span key={i}>⚠️ {e}</span>)}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="nombre">Nombre Completo</label>
            <input id="nombre" name="nombre" type="text" className="form-input"
              placeholder="Tu nombre completo" value={form.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo Electrónico</label>
            <input id="email" name="email" type="email" className="form-input"
              placeholder="tucorreo@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="telefono">Teléfono / WhatsApp</label>
            <input id="telefono" name="telefono" type="tel" className="form-input"
              placeholder="+57 300 000 0000" value={form.telefono} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" className="form-input"
              placeholder="Mínimo 6 caracteres" value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="auth-link">¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
      </div>
    </div>
  )
}
