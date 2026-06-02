import { describe, it, expect, beforeEach } from 'vitest'
import { registrarUsuario, loginUsuario, validarRegistro, resetUsuarios } from '../data/usuarios'

const datosValidos = {
  nombre: 'María López',
  email: 'maria@email.com',
  telefono: '3001234567',
  password: 'abc123',
  tipo: 'vecino',
}

// ── PRUEBAS UNITARIAS ──────────────────────────────────────────────────────

describe('validarRegistro — validación de campos', () => {
  it('retorna array vacío si todos los datos son válidos', () => {
    expect(validarRegistro(datosValidos)).toHaveLength(0)
  })

  it('detecta nombre muy corto', () => {
    const errores = validarRegistro({ ...datosValidos, nombre: 'A' })
    expect(errores.length).toBeGreaterThan(0)
  })

  it('detecta email inválido', () => {
    const errores = validarRegistro({ ...datosValidos, email: 'no-es-email' })
    expect(errores.length).toBeGreaterThan(0)
  })

  it('detecta contraseña corta', () => {
    const errores = validarRegistro({ ...datosValidos, password: '123' })
    expect(errores.length).toBeGreaterThan(0)
  })

  it('detecta teléfono inválido', () => {
    const errores = validarRegistro({ ...datosValidos, telefono: '123' })
    expect(errores.length).toBeGreaterThan(0)
  })

  it('detecta tipo de cuenta faltante', () => {
    const errores = validarRegistro({ ...datosValidos, tipo: '' })
    expect(errores.length).toBeGreaterThan(0)
  })
})

// ── PRUEBAS DE INTEGRACIÓN ─────────────────────────────────────────────────

describe('registrarUsuario + loginUsuario — flujo completo', () => {
  beforeEach(() => resetUsuarios())

  it('registra un usuario correctamente', () => {
    const result = registrarUsuario(datosValidos)
    expect(result.ok).toBe(true)
    expect(result.usuario.nombre).toBe('María López')
    expect(result.usuario.tipo).toBe('vecino')
  })

  it('no permite registrar el mismo email dos veces', () => {
    registrarUsuario(datosValidos)
    const result2 = registrarUsuario(datosValidos)
    expect(result2.ok).toBe(false)
    expect(result2.errores[0]).toContain('registrado')
  })

  it('login exitoso con credenciales correctas', () => {
    registrarUsuario(datosValidos)
    const login = loginUsuario(datosValidos.email, datosValidos.password)
    expect(login.ok).toBe(true)
    expect(login.usuario.email).toBe(datosValidos.email)
  })

  it('login falla con contraseña incorrecta', () => {
    registrarUsuario(datosValidos)
    const login = loginUsuario(datosValidos.email, 'password_malo')
    expect(login.ok).toBe(false)
  })

  it('login falla con email no registrado', () => {
    const login = loginUsuario('noexiste@test.com', 'abc123')
    expect(login.ok).toBe(false)
  })

  it('el email se normaliza a minúsculas al registrar', () => {
    registrarUsuario({ ...datosValidos, email: 'MARIA@EMAIL.COM' })
    const login = loginUsuario('maria@email.com', datosValidos.password)
    expect(login.ok).toBe(true)
  })
})
