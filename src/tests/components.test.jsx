import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Stars from '../components/Stars'
import ServiceCard from '../components/ServiceCard'

const mockServicio = {
  id: 1,
  nombre: 'Martha Rodríguez',
  servicio: 'Repostería y Tortas',
  categoria: 'Comida',
  barrio: 'Belén',
  descripcion: 'Tortas personalizadas',
  telefono: '3001234567',
  calificacion: 5.0,
  reseñas: 63,
  initials: 'MR',
  color: '#2D6A4F',
  reseñasTexto: [],
  miembroDesde: '2026',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <ServiceCard servicio={mockServicio} />
    </MemoryRouter>
  )
}

describe('Stars — componente de calificación', () => {
  it('renderiza la calificación correctamente', () => {
    render(<Stars calificacion={4.5} reseñas={30} />)
    expect(screen.getByText(/4\.5/)).toBeInTheDocument()
    expect(screen.getByText(/30 reseñas/)).toBeInTheDocument()
  })

  it('muestra 5 estrellas en total', () => {
    render(<Stars calificacion={3} reseñas={10} />)
    const estrellas = document.querySelectorAll('.star')
    expect(estrellas).toHaveLength(5)
  })
})

describe('ServiceCard — tarjeta de servicio', () => {
  it('muestra el nombre del emprendedor', () => {
    renderCard()
    expect(screen.getByText('Martha Rodríguez')).toBeInTheDocument()
  })

  it('muestra el nombre del servicio', () => {
    renderCard()
    expect(screen.getByText('Repostería y Tortas')).toBeInTheDocument()
  })

  it('muestra el barrio', () => {
    renderCard()
    expect(screen.getByText(/Belén/)).toBeInTheDocument()
  })

  it('muestra el botón de WhatsApp', () => {
    renderCard()
    const waBtn = screen.getByText(/WhatsApp/)
    expect(waBtn).toBeInTheDocument()
  })

  it('el botón de WhatsApp es un button (función deshabilitada en MVP)', () => {
    renderCard()
    const waBtn = screen.getByText(/WhatsApp/)
    // En MVP es un botón que muestra alerta, no un enlace externo
    expect(waBtn.tagName.toLowerCase()).toBe('button')
  })

  it('muestra el botón de ver perfil', () => {
    renderCard()
    expect(screen.getByText('Ver perfil')).toBeInTheDocument()
  })
})
