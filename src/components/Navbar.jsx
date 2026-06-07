import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ sesion, onLogout }) {
  const navigate = useNavigate()
  function handleLogout() { onLogout(); navigate('/') }

  return (
    <nav className="navbar">
      <Link to={sesion ? '/home' : '/'} className="navbar-brand">
        Comuni<span>App</span>
      </Link>
      <div className="navbar-actions">
        {sesion ? (
          <>
            <span className="navbar-user">Hola, {sesion.nombre.split(' ')[0]}</span>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login"    className="btn btn-secondary btn-sm">Ingresar</Link>
            <Link to="/registro" className="btn btn-accent btn-sm">Registrarme</Link>
          </>
        )}
      </div>
    </nav>
  )
}
