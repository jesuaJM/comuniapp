import { describe, it, expect } from 'vitest'
import { filtrarServicios, ordenarServicios, SERVICIOS_INICIALES } from '../data/servicios'

describe('filtrarServicios — búsqueda por texto', () => {
  it('retorna todos los servicios si la query está vacía', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, '', 'Todas')
    expect(resultado).toHaveLength(SERVICIOS_INICIALES.length)
  })

  it('encuentra servicio por nombre del emprendedor (exacto)', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'Martha', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado[0].nombre).toContain('Martha')
  })

  it('encuentra servicio sin tilde — "plomeria" encuentra "Plomería"', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'plomeria', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
    expect(resultado.some(s => s.categoria === 'Plomería')).toBe(true)
  })

  it('encuentra servicio por raíz — "plomero" encuentra "Plomería"', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'plomero', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
  })

  it('encuentra servicio sin tilde — "electrico" encuentra "Eléctrico"', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'electrico', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
  })

  it('encuentra servicio sin tilde — "reposteria" encuentra "Repostería"', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'reposteria', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
  })

  it('encuentra por barrio sin tilde — "Belen" encuentra "Belén"', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'Belen', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
  })

  it('la búsqueda no es sensible a mayúsculas', () => {
    const r1 = filtrarServicios(SERVICIOS_INICIALES, 'martha', 'Todas')
    const r2 = filtrarServicios(SERVICIOS_INICIALES, 'MARTHA', 'Todas')
    expect(r1).toHaveLength(r2.length)
  })

  it('búsqueda multi-palabra — "torta belen" encuentra el servicio correcto', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'torta belen', 'Todas')
    expect(resultado.length).toBeGreaterThan(0)
  })

  it('retorna array vacío si no hay coincidencias', () => {
    const resultado = filtrarServicios(SERVICIOS_INICIALES, 'veterinario_xyz_123', 'Todas')
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
