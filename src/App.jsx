import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Busqueda from './pages/Busqueda'
import Perfil from './pages/Perfil'
import './index.css'

export default function App() {
  const [usuario, setUsuario] = useState(null)

  return (
    <BrowserRouter>
      <Navbar usuario={usuario} onLogout={() => setUsuario(null)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={setUsuario} />} />
        <Route path="/registro" element={<Registro onRegistro={setUsuario} />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
