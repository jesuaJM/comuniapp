import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Busqueda from './pages/Busqueda'
import Perfil from './pages/Perfil'
import CrearServicio from './pages/CrearServicio'
import './index.css'

export default function App() {
  const [sesion, setSesion] = useState(null)

  return (
    <BrowserRouter>
      <Navbar sesion={sesion} onLogout={() => setSesion(null)} />
      <Routes>
        <Route path="/"              element={<Login onLogin={setSesion} />} />
        <Route path="/home"          element={<Home sesion={sesion} />} />
        <Route path="/login"         element={<Login onLogin={setSesion} />} />
        <Route path="/registro"      element={<Registro onRegistro={setSesion} />} />
        <Route path="/busqueda"      element={<Busqueda />} />
        <Route path="/perfil/:id"    element={<Perfil />} />
        <Route path="/crear-servicio" element={<CrearServicio sesion={sesion} />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
