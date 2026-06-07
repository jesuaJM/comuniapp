import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUsuario } from '../data/usuarios'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Completa todos los campos.'); return }
    setLoading(true)
    setTimeout(() => {
      const result = loginUsuario(form.email, form.password)
      setLoading(false)
      if (result.ok) {
        onLogin(result.usuario)
        // Emprendedor va a crear servicio si aún no tiene uno, vecino va al home
        navigate('/home')
      } else {
        setError(result.error)
      }
    }, 400)
  }

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-logo">🏘️</div>
        <h1 className="auth-title">ComuniApp</h1>
        <p className="auth-subtitle">Inicia sesión en tu cuenta</p>

        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>⚠️ {error}</div>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo Electrónico</label>
            <input id="email" name="email" type="email"
              className={`form-input${error ? ' error' : ''}`}
              placeholder="tucorreo@email.com"
              value={form.email} onChange={handleChange} autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password"
              className={`form-input${error ? ' error' : ''}`}
              placeholder="••••••••"
              value={form.password} onChange={handleChange} autoComplete="current-password" />
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg"
            disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="auth-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate gratis</Link>
        </p>
      </div>
    </div>
  )
}
