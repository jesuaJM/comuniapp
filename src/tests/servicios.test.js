import { describe, it, expect } from 'vitest'
import { filtrarServicios, ordenarServicios, SERVICIOS_INICIALES } from '../data/servicios'

// ── PRUEBAS UNITARIAS ──────────────────────────────────────────────────────

describe('filtrarServicios — búsqueda por texto', () => {
  it('retorna todos los servicios si la query está vacía', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, '', 'Todas')
    expect(resultado).toHaveLength(SERVICIOS_INICIALES.length)
  })

  it('encuentra servicio por nombre del emprendedor', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'Martha', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado[0].nombre).toContain('Martha')
  })

  it('encuentra servicio por nombre del servicio (plomería)', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'plomería', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado[0].categoria).toBe('Plomería')
  })

  it('encuentra servicio por nombre del barrio', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'Belén', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
  })

  it('la búsqueda no es sensible a mayúsculas', () => {
    const r1 = filtrarServicios(SERVICIOS_INICIALES, 'martha', 'Todas')
    const r2 = filtrarServicios(SERVICIOS_INICIALES, 'MARTHA', 'Todas')
    expect(r1).toHaveLength(r2.length)
  })

  it('retorna array vacío si no hay coincidencias', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'veterinario_que_no_existe_xyz', 'Todas')
    expect(resultado).toHaveLength(0)
  })
})

describe('filtrarServicios — filtro por categoría', () => {
  it('filtra correctamente por categoría Comida', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, '', 'Comida')
    expect(resultado.every(s => s.categoria === 'Comida')).toBe(true)
  })

  it('no filtra cuando la categoría es Todas', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, '', 'Todas')
    expect(resultado).toHaveLength(SERVICIOS_INICIALES.length)
  })

  it('combina texto y categoría correctamente', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'Martha', 'Comida')
    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado.every(s => s.categoria === 'Comida')).toBe(true)
  })
})

describe('ordenarServicios', () => {
  it('ordena por calificación de mayor a menor', () => {
    const ordenados = ordenarServicios(SERVICIOS_INICIALES, 'calificacion')
    for (let i = 0; i < ordenados.length - 1; i++) {
      expect(ordenados[i].calificacion).toBeGreaterThanOrEqual(ordenados[i + 1].calificacion)
    }
  })

  it('ordena por cantidad de reseñas de mayor a menor', () => {
    const ordenados = ordenarServicios(SERVICIOS_INICIALES, 'reseñas')
    for (let i = 0; i < ordenados.length - 1; i++) {
      expect(ordenados[i].reseñas).toBeGreaterThanOrEqual(ordenados[i + 1].reseñas)
    }
  })

  it('no muta el array original', () => {
    const original = [...SERVICIOS_INICIALES]
    ordenarServicios(SERVICIOS_INICIALES, 'calificacion')
    expect(SERVICIOS_INICIALES).toEqual(original)
  })
})
